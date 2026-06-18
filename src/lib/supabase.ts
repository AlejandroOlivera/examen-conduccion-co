import { createClient } from '@supabase/supabase-js';
import { STORAGE_KEY } from './auth-constants';

// Cliente Supabase para el navegador (Modelo A: estatico + cliente + RLS).
// Las claves son publicas; la seguridad la imponen las policies RLS en Postgres.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** true si las env vars estan presentes. Las islas degradan si es false. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // No se lanza error: el sitio (quiz, contenido) debe seguir funcionando sin
  // auth. Las islas comprueban isSupabaseConfigured antes de usar el cliente.
  console.warn(
    '[supabase] Faltan PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY. La autenticacion queda deshabilitada.',
  );
}

// storageKey fijo: el header lee la sesion de localStorage de forma sincrona con
// esta clave, sin cargar supabase-js en cada pagina (solo /cuenta y al salir).
export const supabase = createClient(
  supabaseUrl ?? 'http://localhost',
  supabaseAnonKey ?? 'public-anon-key',
  {
    auth: {
      storageKey: STORAGE_KEY,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
