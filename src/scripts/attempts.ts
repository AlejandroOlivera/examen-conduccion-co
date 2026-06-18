// Persistencia de intentos en Supabase (Modelo A).
//
// Privacidad + rendimiento: si el usuario es anonimo (el demo), NO se carga
// supabase-js ni se guarda nada. Solo se persiste para usuarios logueados.

import type { VehicleCategory } from '../data/types';

// Debe coincidir con storageKey en src/lib/supabase.ts.
const STORAGE_KEY = 'tallerb1-auth';

export interface AttemptInput {
  category: VehicleCategory;
  modeSlug: string;
  score: number;
  total: number;
  percent: number;
  passed: boolean | null;
  durationS: number;
  wrongQids: string[];
}

/** true si hay una sesion guardada (chequeo sincrono, sin cargar supabase-js). */
function hasSession(): boolean {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

/**
 * Guarda un intento solo si el usuario esta logueado. Para anonimos no hace
 * nada (el demo no requiere cuenta). Pensada para fire-and-forget: nunca lanza.
 */
export async function saveAttempt(input: AttemptInput): Promise<void> {
  if (!hasSession()) return; // anonimo: el demo no guarda nada

  try {
    const { supabase, isSupabaseConfigured } = await import('../lib/supabase');
    if (!isSupabaseConfigured) return;

    // getSession lee de localStorage (sin red); su JWT es lo que valida RLS.
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return; // sesion invalida o expirada

    const { error } = await supabase.from('attempts').insert({
      user_id: userId,
      category: input.category,
      mode_slug: input.modeSlug,
      score: input.score,
      total: input.total,
      percent: input.percent,
      passed: input.passed,
      duration_s: input.durationS,
      wrong_qids: input.wrongQids,
    });
    if (error) console.error('[attempts] No se pudo guardar el intento:', error.message);
  } catch (err) {
    console.error('[attempts] Error guardando el intento:', err);
  }
}
