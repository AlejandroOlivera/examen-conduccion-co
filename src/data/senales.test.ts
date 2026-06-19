import { describe, it, expect } from 'vitest';
import { SENALES } from './senales';
import { senalBankSchema } from './schema';

describe('catalogo de senales', () => {
  it('cumple el esquema: slugs unicos, categoria valida, campos requeridos', () => {
    expect(() => senalBankSchema.parse(SENALES)).not.toThrow();
  });

  it('slugs son unicos', () => {
    const slugs = SENALES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('cada imagen sigue el patron /senales/<slug>.svg', () => {
    for (const s of SENALES) {
      expect(s.imagen).toBe(`/senales/${s.slug}.svg`);
    }
  });
});
