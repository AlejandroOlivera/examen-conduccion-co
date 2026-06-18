import { describe, it, expect } from 'vitest';
import {
  type AttemptRow,
  type ModeStats,
  computeStats,
  computeStreak,
  computeTopWrong,
  groupByMode,
} from './dashboard-core';

// ---------------------------------------------------------------------------
// Factory helpers
// ---------------------------------------------------------------------------

function makeAttempt(over: Partial<AttemptRow> = {}): AttemptRow {
  return {
    category: 'carro',
    mode_slug: 'grupo-1',
    score: 8,
    total: 10,
    percent: 80,
    passed: null,
    duration_s: 120,
    wrong_qids: [],
    created_at: '2024-01-15T12:00:00.000Z',
    ...over,
  };
}

/** Returns an ISO string for a given UTC-5 calendar date and time-of-day. */
function bogotaDate(year: number, month: number, day: number, hour = 12, minute = 0): string {
  // month is 1-based
  // Convert Bogota local time to UTC: add 5 hours
  const utcHour = hour + 5;
  const d = new Date(Date.UTC(year, month - 1, day, utcHour, minute, 0));
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// computeStreak
// ---------------------------------------------------------------------------

describe('computeStreak', () => {
  it('retorna 0 con array vacio', () => {
    const now = new Date('2024-01-15T17:00:00.000Z'); // noon Bogota
    expect(computeStreak([], now)).toBe(0);
  });

  it('retorna 1 con un solo intento hoy (Bogota)', () => {
    // nowDate = Jan 15 noon Bogota = Jan 15 17:00 UTC
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [makeAttempt({ created_at: bogotaDate(2024, 1, 15, 10) })];
    expect(computeStreak(attempts, now)).toBe(1);
  });

  it('retorna 3 con 3 dias consecutivos terminando hoy', () => {
    const now = new Date('2024-01-15T17:00:00.000Z'); // Jan 15 noon Bogota
    const attempts = [
      makeAttempt({ created_at: bogotaDate(2024, 1, 13, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 14, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 15, 10) }),
    ];
    expect(computeStreak(attempts, now)).toBe(3);
  });

  it('cuenta la racha terminando ayer si no hay intento hoy', () => {
    // now = Jan 15 noon Bogota; last attempt = Jan 14
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [
      makeAttempt({ created_at: bogotaDate(2024, 1, 12, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 13, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 14, 10) }),
    ];
    expect(computeStreak(attempts, now)).toBe(3);
  });

  it('dia salteado corta la racha: cuenta solo el tramo mas reciente', () => {
    // Days: Jan 10, Jan 11, (gap Jan 12), Jan 13
    // nowDate = Jan 13; expected streak = 1
    const now = new Date('2024-01-13T17:00:00.000Z');
    const attempts = [
      makeAttempt({ created_at: bogotaDate(2024, 1, 10, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 11, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 13, 10) }),
    ];
    expect(computeStreak(attempts, now)).toBe(1);
  });

  it('MEDIANOCHE UTC-5: 23:58 y 00:01 Bogota son dias distintos -> racha=2', () => {
    // Day D = Jan 14 in Bogota
    // 23:58 Bogota Jan 14 = 04:58 UTC Jan 15
    // 00:01 Bogota Jan 15 = 05:01 UTC Jan 15  <- still same UTC day!
    // nowDate = Jan 15 noon Bogota = 17:00 UTC Jan 15
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [
      makeAttempt({ created_at: '2024-01-15T04:58:00.000Z' }), // 23:58 Bogota Jan 14
      makeAttempt({ created_at: '2024-01-15T05:01:00.000Z' }), // 00:01 Bogota Jan 15
    ];
    expect(computeStreak(attempts, now)).toBe(2);
  });

  it('atribucion UTC vs Bogota: 02:00 UTC es el dia anterior en Bogota (21:00 UTC-5)', () => {
    // 02:00 UTC Jan 15 = 21:00 Bogota Jan 14
    // nowDate = noon Bogota Jan 15 = 17:00 UTC Jan 15
    // So the attempt is on Jan 14 Bogota, and today is Jan 15 Bogota
    // With no Jan 15 attempt, anchor = yesterday (Jan 14), streak = 1
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [makeAttempt({ created_at: '2024-01-15T02:00:00.000Z' })];
    expect(computeStreak(attempts, now)).toBe(1);
  });

  it('multiples intentos el mismo dia cuentan solo una vez', () => {
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [
      makeAttempt({ created_at: bogotaDate(2024, 1, 15, 8) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 15, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 15, 14) }),
    ];
    expect(computeStreak(attempts, now)).toBe(1);
  });

  it('ni hoy ni ayer tienen intento -> retorna 0', () => {
    // last attempt was Jan 13; now = Jan 15
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [makeAttempt({ created_at: bogotaDate(2024, 1, 13, 10) })];
    expect(computeStreak(attempts, now)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// computeTopWrong
// ---------------------------------------------------------------------------

describe('computeTopWrong', () => {
  it('retorna [] con intentos vacios', () => {
    expect(computeTopWrong([])).toEqual([]);
  });

  it('retorna [] cuando todos los wrong_qids estan vacios', () => {
    const attempts = [makeAttempt({ wrong_qids: [] }), makeAttempt({ wrong_qids: [] })];
    expect(computeTopWrong(attempts)).toEqual([]);
  });

  it('ordena por frecuencia descendente', () => {
    const attempts = [
      makeAttempt({ wrong_qids: ['q-001', 'q-002', 'q-001'] }),
      makeAttempt({ wrong_qids: ['q-001', 'q-003'] }),
    ];
    const result = computeTopWrong(attempts);
    expect(result[0]?.id).toBe('q-001'); // count 3
    expect(result[1]?.id).toBe('q-002'); // count 1 (before q-003 by alpha)
    expect(result[2]?.id).toBe('q-003'); // count 1
  });

  it('desempate estable por id ascendente (determinista)', () => {
    // q-abc and q-def both appear 4 times
    // feed in two orderings to verify determinism
    const attemptsA = [
      makeAttempt({ wrong_qids: ['q-abc', 'q-def'] }),
      makeAttempt({ wrong_qids: ['q-abc', 'q-def'] }),
      makeAttempt({ wrong_qids: ['q-abc', 'q-def'] }),
      makeAttempt({ wrong_qids: ['q-abc', 'q-def'] }),
    ];
    const attemptsB = [
      makeAttempt({ wrong_qids: ['q-def', 'q-abc'] }),
      makeAttempt({ wrong_qids: ['q-def', 'q-abc'] }),
      makeAttempt({ wrong_qids: ['q-def', 'q-abc'] }),
      makeAttempt({ wrong_qids: ['q-def', 'q-abc'] }),
    ];
    const resultA = computeTopWrong(attemptsA);
    const resultB = computeTopWrong(attemptsB);
    // Both must return q-abc before q-def
    expect(resultA[0]?.id).toBe('q-abc');
    expect(resultA[1]?.id).toBe('q-def');
    expect(resultB[0]?.id).toBe('q-abc');
    expect(resultB[1]?.id).toBe('q-def');
  });

  it('slicing topN: devuelve exactamente topN cuando hay mas ids', () => {
    const attempts = [
      makeAttempt({ wrong_qids: ['q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7'] }),
    ];
    expect(computeTopWrong(attempts, 3)).toHaveLength(3);
  });

  it('topN por defecto es 5', () => {
    const ids = ['q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6', 'q-7', 'q-8'];
    const attempts = [makeAttempt({ wrong_qids: ids })];
    expect(computeTopWrong(attempts)).toHaveLength(5);
  });
});

// ---------------------------------------------------------------------------
// groupByMode
// ---------------------------------------------------------------------------

describe('groupByMode', () => {
  it('retorna [] con intentos vacios', () => {
    expect(groupByMode([])).toEqual([]);
  });

  it('modo unico: calcula intentos, avg y best correctamente', () => {
    const attempts = [
      makeAttempt({ mode_slug: 'grupo-1', percent: 60 }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 80 }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 100 }),
    ];
    const result = groupByMode(attempts);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual<ModeStats>({
      modeSlug: 'grupo-1',
      attempts: 3,
      avgPercent: 80, // (60+80+100)/3 = 80 exactly
      bestPercent: 100,
    });
  });

  it('multiples modos: ordenados por intentos DESC, desempate por modeSlug ASC', () => {
    const attempts = [
      makeAttempt({ mode_slug: 'simulacro', percent: 70 }),
      makeAttempt({ mode_slug: 'simulacro', percent: 90 }),
      makeAttempt({ mode_slug: 'simulacro', percent: 80 }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 50 }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 60 }),
      makeAttempt({ mode_slug: 'mecanico', percent: 40 }), // 1 attempt — tie-break last by slug
    ];
    // simulacro: 3 attempts, avg=(70+90+80)/3=80, best=90
    // grupo-1: 2 attempts
    // mecanico: 1 attempt
    const result = groupByMode(attempts);
    expect(result[0]?.modeSlug).toBe('simulacro');
    expect(result[1]?.modeSlug).toBe('grupo-1');
    expect(result[2]?.modeSlug).toBe('mecanico');
  });

  it('redondeo correcto de avgPercent', () => {
    // (33 + 33 + 34) / 3 = 33.333... -> Math.round -> 33
    const attempts = [
      makeAttempt({ mode_slug: 'grupo-2', percent: 33 }),
      makeAttempt({ mode_slug: 'grupo-2', percent: 33 }),
      makeAttempt({ mode_slug: 'grupo-2', percent: 34 }),
    ];
    const result = groupByMode(attempts);
    expect(result[0]?.avgPercent).toBe(33);
  });

  it('desempate modeSlug ASC cuando dos modos tienen iguales intentos', () => {
    const attempts = [
      makeAttempt({ mode_slug: 'simulacro', percent: 80 }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 70 }),
    ];
    const result = groupByMode(attempts);
    // Both have 1 attempt; tie-break alphabetical: 'grupo-1' < 'simulacro'
    expect(result[0]?.modeSlug).toBe('grupo-1');
    expect(result[1]?.modeSlug).toBe('simulacro');
  });
});

// ---------------------------------------------------------------------------
// computeStats (passRate + integration)
// ---------------------------------------------------------------------------

describe('computeStats — passRate', () => {
  it('passRate es null sin intentos', () => {
    const result = computeStats([]);
    expect(result.passRate).toBeNull();
    expect(result.simulacroAttempts).toBe(0);
  });

  it('passRate es null cuando no hay simulacros (todos passed===null)', () => {
    const attempts = [makeAttempt({ passed: null }), makeAttempt({ passed: null })];
    const result = computeStats(attempts);
    expect(result.passRate).toBeNull();
    expect(result.simulacroAttempts).toBe(0);
  });

  it('3 simulacros, 2 aprobados -> passRate 67', () => {
    const attempts = [
      makeAttempt({ passed: true }),
      makeAttempt({ passed: true }),
      makeAttempt({ passed: false }),
    ];
    const result = computeStats(attempts);
    expect(result.passRate).toBe(67);
    expect(result.simulacroAttempts).toBe(3);
  });
});

describe('computeStats — integracion', () => {
  it('array vacio -> todos en cero/nulo', () => {
    const result = computeStats([]);
    expect(result.totalAttempts).toBe(0);
    expect(result.avgPercent).toBe(0);
    expect(result.bestPercent).toBe(0);
    expect(result.passRate).toBeNull();
    expect(result.simulacroAttempts).toBe(0);
    expect(result.streak).toBe(0);
    expect(result.topWrong).toEqual([]);
    expect(result.byMode).toEqual([]);
  });

  it('fixture completo: totalAttempts, avg, best, passRate, byMode', () => {
    const attempts = [
      makeAttempt({ mode_slug: 'grupo-1', percent: 60, passed: null, wrong_qids: ['q-1'] }),
      makeAttempt({ mode_slug: 'grupo-1', percent: 80, passed: null, wrong_qids: ['q-1', 'q-2'] }),
      makeAttempt({ mode_slug: 'simulacro', percent: 90, passed: true, wrong_qids: [] }),
      makeAttempt({ mode_slug: 'simulacro', percent: 70, passed: false, wrong_qids: ['q-1'] }),
    ];
    const now = new Date('2024-01-15T17:00:00.000Z');
    const result = computeStats(attempts, { nowDate: now });

    expect(result.totalAttempts).toBe(4);
    expect(result.avgPercent).toBe(75); // (60+80+90+70)/4 = 75
    expect(result.bestPercent).toBe(90);
    expect(result.passRate).toBe(50); // 1/2 simulacros pasados
    expect(result.simulacroAttempts).toBe(2);
    expect(result.byMode).toHaveLength(2); // grupo-1 + simulacro
    // topWrong: q-1 appears 3x, q-2 appears 1x
    expect(result.topWrong[0]?.id).toBe('q-1');
    expect(result.topWrong[0]?.count).toBe(3);
    expect(result.topWrong[1]?.id).toBe('q-2');
  });

  it('topN via opts.topN limita el resultado de topWrong', () => {
    const attempts = [makeAttempt({ wrong_qids: ['q-1', 'q-2', 'q-3', 'q-4', 'q-5', 'q-6'] })];
    const result = computeStats(attempts, { topN: 2 });
    expect(result.topWrong).toHaveLength(2);
  });

  it('nowDate se reenvía a computeStreak (racha correcta con fixture conocido)', () => {
    // attempts on Jan 14 and Jan 15 (Bogota), nowDate = Jan 15
    const now = new Date('2024-01-15T17:00:00.000Z');
    const attempts = [
      makeAttempt({ created_at: bogotaDate(2024, 1, 14, 10) }),
      makeAttempt({ created_at: bogotaDate(2024, 1, 15, 10) }),
    ];
    const result = computeStats(attempts, { nowDate: now });
    expect(result.streak).toBe(2);
  });

  it('passRate null cuando hay solo intentos de practica', () => {
    const attempts = [
      makeAttempt({ mode_slug: 'grupo-2', passed: null, percent: 70 }),
      makeAttempt({ mode_slug: 'mecanico', passed: null, percent: 50 }),
    ];
    const result = computeStats(attempts);
    expect(result.passRate).toBeNull();
  });
});
