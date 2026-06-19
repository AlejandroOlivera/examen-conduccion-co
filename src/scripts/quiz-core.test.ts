import { describe, it, expect } from 'vitest';
import {
  type PreparedQuestion,
  formatTime,
  isPassing,
  prepareQuestion,
  sampleQuestions,
  scoreAnswers,
  shuffle,
} from './quiz-core';
import type { Question } from '../data/types';

/** rng determinista que recorre una secuencia de valores en [0,1). */
function rngSeq(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length]!;
}

const makeQuestion = (over: Partial<Question> = {}): Question => ({
  id: 'g1-01',
  category: 'carro',
  group: 'I',
  prompt: 'Enunciado',
  options: ['a', 'b', 'c', 'd'],
  answer: 1,
  explanation: 'Justificacion suficiente.',
  ...over,
});

describe('shuffle', () => {
  it('es una permutacion (mismos elementos)', () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input, rngSeq([0.1, 0.5, 0.9, 0.3, 0.7]));
    expect([...out].sort((a, b) => a - b)).toEqual(input);
    expect(out).toHaveLength(input.length);
  });

  it('no muta la entrada', () => {
    const input = [1, 2, 3];
    const copy = [...input];
    shuffle(input, () => 0);
    expect(input).toEqual(copy);
  });

  it('es determinista con un rng fijo', () => {
    const a = shuffle([1, 2, 3, 4], rngSeq([0.2, 0.7, 0.4]));
    const b = shuffle([1, 2, 3, 4], rngSeq([0.2, 0.7, 0.4]));
    expect(a).toEqual(b);
  });
});

describe('prepareQuestion', () => {
  it('recalcula correctIndex tras barajar las opciones', () => {
    const prepared = prepareQuestion(
      makeQuestion({ options: ['a', 'b', 'c', 'd'], answer: 2 }),
      () => 0,
    );
    expect(prepared.options[prepared.correctIndex]).toBe('c');
  });

  it('conserva todas las opciones', () => {
    const prepared = prepareQuestion(makeQuestion(), rngSeq([0.3, 0.6, 0.1]));
    expect([...prepared.options].sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('preserva image e imageAlt al barajar', () => {
    const prepared = prepareQuestion(
      makeQuestion({ image: '/senales/pare.svg', imageAlt: 'Octogono rojo' }),
      () => 0,
    );
    expect(prepared.image).toBe('/senales/pare.svg');
    expect(prepared.imageAlt).toBe('Octogono rojo');
  });
});

describe('sampleQuestions', () => {
  it('muestrea N cuando sample < pool', () => {
    const pool = Array.from({ length: 10 }, (_, i) => makeQuestion({ id: `q${i}` }));
    expect(sampleQuestions(pool, 4, () => 0)).toHaveLength(4);
  });

  it('devuelve todo cuando sample es null o mayor al pool', () => {
    const pool = [makeQuestion({ id: 'a' }), makeQuestion({ id: 'b' })];
    expect(sampleQuestions(pool, null, () => 0)).toHaveLength(2);
    expect(sampleQuestions(pool, 5, () => 0)).toHaveLength(2);
  });
});

describe('formatTime', () => {
  it('formatea mm:ss con ceros', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(600)).toBe('10:00');
  });

  it('nunca produce negativos', () => {
    expect(formatTime(-5)).toBe('00:00');
  });
});

describe('scoreAnswers', () => {
  const prepared: PreparedQuestion[] = [
    { id: '1', prompt: '', options: ['a'], correctIndex: 0, explanation: '' },
    { id: '2', prompt: '', options: ['a', 'b'], correctIndex: 1, explanation: '' },
  ];

  it('cuenta aciertos y trata null como fallo', () => {
    expect(scoreAnswers(prepared, [0, 1])).toBe(2);
    expect(scoreAnswers(prepared, [0, 0])).toBe(1);
    expect(scoreAnswers(prepared, [null, null])).toBe(0);
  });
});

describe('isPassing', () => {
  it('devuelve null si no hay umbral', () => {
    expect(isPassing(5, 10, null)).toBeNull();
  });

  it('usa la fraccion exacta, no el porcentaje redondeado', () => {
    expect(isPassing(32, 40, 80)).toBe(true); // 80.0%
    expect(isPassing(31, 40, 80)).toBe(false); // 77.5%
  });
});
