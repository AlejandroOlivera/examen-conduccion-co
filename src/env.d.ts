// Las interfaces globales de Astro (.astro/types.d.ts) ya estan incluidas via
// tsconfig "include"; aqui solo se augmentan con las variables del proyecto.
interface ImportMetaEnv {
  /** URL del proyecto Supabase. Publica. */
  readonly PUBLIC_SUPABASE_URL: string;
  /** Publishable key de Supabase. Publica por diseno; la seguridad la da RLS. */
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
