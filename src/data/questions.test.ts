import { describe, it, expect } from 'vitest';
import { QUESTIONS, questionsForGroups } from './questions';
import { EXAM_MODES } from './modes';
import { questionBankSchema, examModeSchema } from './schema';

describe('banco de preguntas', () => {
  it('cumple el esquema: ids unicos, answer en rango, opciones unicas', () => {
    expect(() => questionBankSchema.parse(QUESTIONS)).not.toThrow();
  });

  it('no tiene enunciados duplicados', () => {
    const prompts = QUESTIONS.map((q) => q.prompt.trim().toLowerCase());
    expect(new Set(prompts).size).toBe(prompts.length);
  });
});

describe('modos de examen', () => {
  it('cada modo cumple el esquema', () => {
    for (const mode of EXAM_MODES) {
      expect(() => examModeSchema.parse(mode)).not.toThrow();
    }
  });

  it('tienen slugs unicos', () => {
    const slugs = EXAM_MODES.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('cada modo tiene preguntas y el pool cubre la muestra', () => {
    for (const mode of EXAM_MODES) {
      const pool = questionsForGroups(mode.groups);
      expect(pool.length).toBeGreaterThan(0);
      if (mode.sample) {
        expect(pool.length).toBeGreaterThanOrEqual(mode.sample);
      }
    }
  });
});
