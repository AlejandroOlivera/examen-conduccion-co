/* ============================================================
   Logica pura del quiz (sin DOM). Separada de quiz.ts para poder
   probarla de forma aislada y reutilizarla. Toda funcion que use
   aleatoriedad acepta un generador inyectable (rng) para tests
   deterministas.
   ============================================================ */

import type { Question } from '../data/types';

/** Pregunta lista para render: opciones ya barajadas y el indice correcto recalculado. */
export interface PreparedQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Generador de aleatoriedad en [0, 1). Por defecto Math.random; inyectable en tests. */
export type Rng = () => number;

/** Fisher-Yates inmutable. */
export function shuffle<T>(input: readonly T[], rng: Rng = Math.random): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = arr[i] as T;
    const b = arr[j] as T;
    arr[i] = b;
    arr[j] = a;
  }
  return arr;
}

/** Baraja las opciones de una pregunta y recalcula el indice de la correcta. */
export function prepareQuestion(raw: Question, rng: Rng = Math.random): PreparedQuestion {
  const tagged = raw.options.map((text, i) => ({ text, correct: i === raw.answer }));
  const mixed = shuffle(tagged, rng);
  return {
    id: raw.id,
    prompt: raw.prompt,
    options: mixed.map((o) => o.text),
    correctIndex: mixed.findIndex((o) => o.correct),
    explanation: raw.explanation,
  };
}

/** Selecciona el conjunto de preguntas de un intento (baraja y, si aplica, muestrea N). */
export function sampleQuestions(
  pool: readonly Question[],
  sample: number | null,
  rng: Rng = Math.random,
): Question[] {
  const shuffled = shuffle(pool, rng);
  if (sample !== null && sample < shuffled.length) return shuffled.slice(0, sample);
  return shuffled;
}

/** Formatea segundos como mm:ss (nunca negativo). */
export function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Cuenta respuestas correctas comparando con el indice correcto de cada pregunta. */
export function scoreAnswers(
  questions: readonly PreparedQuestion[],
  answers: readonly (number | null)[],
): number {
  return questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
}

/** Decide si se aprueba segun el umbral (sobre la fraccion exacta, no el % redondeado). */
export function isPassing(
  correct: number,
  total: number,
  passPercent: number | null,
): boolean | null {
  if (passPercent === null) return null;
  return total > 0 && (correct / total) * 100 >= passPercent;
}
