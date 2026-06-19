import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { QUESTIONS, questionsForGroups } from './questions';
import { EXAM_MODES } from './modes';
import { questionBankSchema, examModeSchema } from './schema';

describe('banco de preguntas', () => {
  it('cumple el esquema: ids unicos, answer en rango, opciones unicas', () => {
    expect(() => questionBankSchema.parse(QUESTIONS)).not.toThrow();
  });

  it('no tiene enunciados duplicados', () => {
    // Las preguntas con imagen de senal pueden compartir el enunciado generico
    // "Que indica esta senal?" porque se diferencian visualmente por la imagen.
    const textOnly = QUESTIONS.filter((q) => !q.image);
    const prompts = textOnly.map((q) => q.prompt.trim().toLowerCase());
    expect(new Set(prompts).size).toBe(prompts.length);
  });

  it('toda pregunta con imagen apunta a un SVG que existe en public/', () => {
    // Integridad referencial: una ruta `image` rota (typo o senal inexistente)
    // renderiza un cuadro vacio en el examen. Se valida contra el disco en CI.
    const withImage = QUESTIONS.filter((q) => q.image);
    expect(withImage.length).toBeGreaterThan(0);
    for (const q of withImage) {
      const file = join(process.cwd(), 'public', q.image!);
      expect(existsSync(file), `Falta el asset de ${q.id}: ${q.image}`).toBe(true);
    }
  });
});

describe('modos de examen', () => {
  it('cada modo cumple el esquema', () => {
    for (const mode of EXAM_MODES) {
      expect(() => examModeSchema.parse(mode)).not.toThrow();
    }
  });

  it('tienen slugs unicos por categoria', () => {
    const keys = EXAM_MODES.map((m) => `${m.category}/${m.slug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('cada modo tiene al menos una pregunta en su categoria', () => {
    // El invariante es que ningun modo quede vacio.
    for (const mode of EXAM_MODES) {
      const pool = questionsForGroups(mode.category, mode.groups);
      expect(pool.length).toBeGreaterThan(0);
    }
  });

  it('el pool cubre la muestra fija de cada modo que la define', () => {
    // Un modo con `sample` fijo (p. ej. el simulacro de carro: 40) debe tener
    // al menos esas preguntas; si el banco cae por debajo, el examen serviria
    // menos de las prometidas y este test falla antes de produccion. Los modos
    // sin `sample` usan todo su pool y no entran en esta comprobacion.
    for (const mode of EXAM_MODES) {
      if (mode.sample) {
        const pool = questionsForGroups(mode.category, mode.groups);
        expect(pool.length).toBeGreaterThanOrEqual(mode.sample);
      }
    }
  });

  it('hay modos para carro y para moto', () => {
    const cats = new Set(EXAM_MODES.map((m) => m.category));
    expect(cats.has('carro')).toBe(true);
    expect(cats.has('moto')).toBe(true);
  });
});
