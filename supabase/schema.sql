-- Esquema de la app de practica de examen de conduccion.
-- Modelo A: el navegador accede con la publishable key; la seguridad la dan
-- las policies RLS (cada usuario solo lee/escribe sus propias filas).
--
-- Como aplicarlo: Dashboard de Supabase -> SQL Editor -> pegar y "Run".
-- Es idempotente: se puede correr mas de una vez sin error.

-- ─────────────────────────── Tablas ───────────────────────────

-- profiles: 1:1 con auth.users. El email lo maneja Supabase Auth.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- attempts: un intento de quiz completado.
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  category text not null check (category in ('carro', 'moto')),
  mode_slug text not null,
  score int not null check (score >= 0),
  total int not null check (total > 0),
  percent int not null check (percent between 0 and 100),
  passed boolean, -- null en practica libre (sin umbral de aprobacion)
  duration_s int not null check (duration_s >= 0),
  wrong_qids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Indice para listar el historial de un usuario, mas reciente primero.
create index if not exists attempts_user_created_idx
  on public.attempts (user_id, created_at desc);

-- ─────────────────────────── RLS ───────────────────────────

alter table public.profiles enable row level security;
alter table public.attempts enable row level security;

-- profiles: cada quien solo su propia fila.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- attempts: cada quien solo sus propios intentos.
drop policy if exists attempts_select_own on public.attempts;
create policy attempts_select_own on public.attempts
  for select using (auth.uid() = user_id);

drop policy if exists attempts_insert_own on public.attempts;
create policy attempts_insert_own on public.attempts
  for insert with check (auth.uid() = user_id);

drop policy if exists attempts_delete_own on public.attempts;
create policy attempts_delete_own on public.attempts
  for delete using (auth.uid() = user_id);

-- ───────────────── Trigger: crear profile al registrarse ─────────────────

-- Al insertarse un usuario en auth.users se crea su fila en profiles.
-- security definer + search_path vacio = patron seguro recomendado por Supabase.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
