/* ============================================================
   Logica pura del dashboard (sin DOM, sin SDK, sin globals del
   navegador). Toda funcion con dependencia de tiempo acepta un
   nowDate inyectable para tests deterministas.
   ============================================================ */

import type { VehicleCategory } from '../data/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Una fila de la tabla attempts tal como la devuelve la query de Supabase. */
export interface AttemptRow {
  readonly category: VehicleCategory;
  readonly mode_slug: string;
  readonly score: number;
  readonly total: number;
  readonly percent: number;
  readonly passed: boolean | null;
  readonly duration_s: number;
  readonly wrong_qids: readonly string[];
  readonly created_at: string; // ISO8601 UTC
}

/** Rollup por modo para la seccion de desglose. */
export interface ModeStats {
  readonly modeSlug: string;
  readonly attempts: number;
  readonly avgPercent: number;
  readonly bestPercent: number;
}

/** Agregado completo para la categoria activa del dashboard. */
export interface DashboardStats {
  readonly totalAttempts: number;
  readonly avgPercent: number;
  readonly bestPercent: number;
  readonly passRate: number | null;
  readonly simulacroAttempts: number;
  readonly streak: number;
  readonly topWrong: readonly { id: string; count: number }[];
  readonly byMode: readonly ModeStats[];
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Converts an ISO UTC timestamp (or Date) to an integer day index in Bogota
 * time (UTC-5, no DST). Day 0 = Jan 1 1970 Bogota time.
 */
function toBogotaDayIndex(iso: string | Date): number {
  const ms = typeof iso === 'string' ? Date.parse(iso) : iso.getTime();
  const shifted = ms - 5 * 60 * 60 * 1000; // subtract 5 hours to align UTC-5 midnight
  return Math.floor(shifted / 86400000);
}

/** Discriminates simulacro attempts: those where passed is a boolean (not null). */
function isSimulacro(row: AttemptRow): boolean {
  return row.passed !== null;
}

// ---------------------------------------------------------------------------
// Public functions
// ---------------------------------------------------------------------------

/**
 * computeStreak: counts the maximum consecutive calendar days (UTC-5) ending
 * on or before nowDate on which at least one attempt was recorded.
 *
 * Anchor rule: the streak counts back from today if today has an attempt;
 * otherwise from yesterday (so a streak is not broken simply because the user
 * has not practiced yet today). If neither today nor yesterday has an attempt,
 * the streak is 0.
 */
export function computeStreak(attempts: readonly AttemptRow[], nowDate: Date = new Date()): number {
  if (attempts.length === 0) return 0;

  const daySet = new Set<number>(attempts.map((a) => toBogotaDayIndex(a.created_at)));
  const todayIndex = toBogotaDayIndex(nowDate);

  let cursor: number;
  if (daySet.has(todayIndex)) {
    cursor = todayIndex;
  } else if (daySet.has(todayIndex - 1)) {
    cursor = todayIndex - 1;
  } else {
    return 0;
  }

  let count = 0;
  while (daySet.has(cursor)) {
    count++;
    cursor--;
  }
  return count;
}

/**
 * computeTopWrong: aggregates wrong_qids across all attempts, sorts by
 * frequency descending, breaks ties alphabetically by id ascending.
 */
export function computeTopWrong(
  attempts: readonly AttemptRow[],
  topN = 5,
): { id: string; count: number }[] {
  const freq = new Map<string, number>();
  for (const attempt of attempts) {
    for (const qid of attempt.wrong_qids) {
      freq.set(qid, (freq.get(qid) ?? 0) + 1);
    }
  }
  return [...freq.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    })
    .slice(0, topN);
}

/**
 * groupByMode: groups attempts by mode_slug and returns ModeStats sorted by
 * attempts descending, then modeSlug ascending as tie-break.
 */
export function groupByMode(attempts: readonly AttemptRow[]): ModeStats[] {
  const groups = new Map<string, number[]>();
  for (const a of attempts) {
    const arr = groups.get(a.mode_slug);
    if (arr !== undefined) {
      arr.push(a.percent);
    } else {
      groups.set(a.mode_slug, [a.percent]);
    }
  }
  return [...groups.entries()]
    .map(([modeSlug, percents]) => ({
      modeSlug,
      attempts: percents.length,
      avgPercent: Math.round(percents.reduce((s, p) => s + p, 0) / percents.length),
      bestPercent: Math.max(...percents),
    }))
    .sort((a, b) => {
      if (b.attempts !== a.attempts) return b.attempts - a.attempts;
      return a.modeSlug < b.modeSlug ? -1 : a.modeSlug > b.modeSlug ? 1 : 0;
    });
}

/**
 * computeStats: public aggregation entry point. The caller passes attempts
 * already filtered to the active category — this function does not filter.
 */
export function computeStats(
  attempts: readonly AttemptRow[],
  opts?: { topN?: number; nowDate?: Date },
): DashboardStats {
  const topN = opts?.topN ?? 5;
  const nowDate = opts?.nowDate ?? new Date();

  const totalAttempts = attempts.length;

  if (totalAttempts === 0) {
    return {
      totalAttempts: 0,
      avgPercent: 0,
      bestPercent: 0,
      passRate: null,
      simulacroAttempts: 0,
      streak: 0,
      topWrong: [],
      byMode: [],
    };
  }

  const sum = attempts.reduce((s, a) => s + a.percent, 0);
  const avgPercent = Math.round(sum / totalAttempts);
  const bestPercent = Math.max(...attempts.map((a) => a.percent));

  const simulacros = attempts.filter(isSimulacro);
  const simulacroAttempts = simulacros.length;
  const passRate =
    simulacroAttempts === 0
      ? null
      : Math.round((simulacros.filter((a) => a.passed === true).length / simulacroAttempts) * 100);

  const streak = computeStreak(attempts, nowDate);
  const topWrong = computeTopWrong(attempts, topN);
  const byMode = groupByMode(attempts);

  return {
    totalAttempts,
    avgPercent,
    bestPercent,
    passRate,
    simulacroAttempts,
    streak,
    topWrong,
    byMode,
  };
}
