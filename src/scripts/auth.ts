// Logica de autenticacion del cliente (Modelo A: estatico + Supabase + RLS).
//
// Clave de rendimiento: el header NO importa supabase-js. Lee la sesion guardada
// en localStorage de forma sincrona, asi las paginas publicas (home, quiz) no
// cargan el SDK solo para mostrar "Entrar". supabase-js se carga de forma
// diferida unicamente en /cuenta y al cerrar sesion.

import { STORAGE_KEY } from '../lib/auth-constants';

type AuthMode = 'signin' | 'signup';

interface StoredUser {
  name: string;
}

/** Lee de forma sincrona el usuario de la sesion guardada (sin cargar supabase). */
function readStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as {
      user?: { email?: string; user_metadata?: { display_name?: string } };
    };
    const user = session.user;
    if (!user) return null;
    const name = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Tu cuenta';
    return { name };
  } catch {
    return null;
  }
}

/** Refleja el estado de sesion en el header. Idempotente; corre en cada navegacion. */
function syncHeader(): void {
  const login = document.querySelector<HTMLElement>('[data-auth-login]');
  const userBox = document.querySelector<HTMLElement>('[data-auth-user]');
  if (!login || !userBox) return;

  const stored = readStoredUser();
  if (stored) {
    const nameEl = userBox.querySelector<HTMLElement>('[data-auth-name]');
    if (nameEl) nameEl.textContent = stored.name;
    login.hidden = true;
    userBox.hidden = false;
  } else {
    login.hidden = false;
    userBox.hidden = true;
  }
}

async function logout(event: Event): Promise<void> {
  const target = event.target as HTMLElement | null;
  if (!target?.closest('[data-auth-logout]')) return;
  event.preventDefault();
  try {
    const { supabase, isSupabaseConfigured } = await import('../lib/supabase');
    if (isSupabaseConfigured) await supabase.auth.signOut();
  } catch (err) {
    console.error('[auth] Error al cerrar sesion:', err);
  }
  window.location.href = '/';
}

/** Inicializa el header una vez. Sobrevive a View Transitions (listeners en document). */
export function initHeaderAuth(): void {
  document.addEventListener('astro:page-load', syncHeader);
  document.addEventListener('click', (event) => void logout(event));
  syncHeader();
}

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email o contrasena incorrectos.',
  'User already registered': 'Ese email ya tiene una cuenta. Inicia sesion.',
  'Email not confirmed': 'Tu email aun no esta confirmado.',
  'Password should be at least 6 characters': 'La contrasena debe tener al menos 6 caracteres.',
};

function translateError(message: string): string {
  return ERROR_MESSAGES[message] ?? message;
}

/** Wirea el formulario de /cuenta. Idempotente por elemento (resiste View Transitions). */
export function setupAccountForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-auth-form]');
  if (!form || form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  // Precarga supabase-js apenas el usuario llega a /cuenta (listo al enviar).
  const clientPromise = import('../lib/supabase');

  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-auth-tab]'));
  const nameField = form.querySelector<HTMLElement>('[data-field="name"]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const spinner = form.querySelector<HTMLElement>('[data-submit-spinner]');
  const submit = form.querySelector<HTMLButtonElement>('[data-auth-submit]');
  const errorBox = form.querySelector<HTMLElement>('[data-auth-error]');
  const passwordInput = form.querySelector<HTMLInputElement>('#auth-password');

  let mode: AuthMode = 'signin';

  function hideError(): void {
    if (!errorBox) return;
    errorBox.hidden = true;
    errorBox.textContent = '';
  }

  function showError(message: string): void {
    if (!errorBox) return;
    errorBox.textContent = translateError(message);
    errorBox.hidden = false;
  }

  function setMode(next: AuthMode): void {
    mode = next;
    for (const tab of tabs) {
      tab.setAttribute('aria-selected', String(tab.dataset.authTab === next));
    }
    if (nameField) nameField.hidden = next === 'signin';
    if (submitLabel) submitLabel.textContent = next === 'signin' ? 'Entrar' : 'Crear cuenta';
    if (passwordInput) {
      passwordInput.autocomplete = next === 'signin' ? 'current-password' : 'new-password';
    }
    hideError();
  }

  function setLoading(loading: boolean): void {
    if (submit) submit.disabled = loading;
    if (spinner) spinner.hidden = !loading;
  }

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    hideError();

    if (!form) return;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const name = String(data.get('name') ?? '').trim();

    if (!email || !password) {
      showError('Completa email y contrasena.');
      return;
    }

    setLoading(true);
    try {
      const { supabase, isSupabaseConfigured } = await clientPromise;
      if (!isSupabaseConfigured) {
        showError('La autenticacion no esta configurada todavia.');
        return;
      }

      const { data: result, error } =
        mode === 'signin'
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: { data: name ? { display_name: name } : undefined },
            });

      if (error) {
        showError(error.message);
        return;
      }

      // Con la confirmacion de email apagada, signUp ya deja la sesion activa.
      // Si no hay sesion (confirmacion aun activa), se avisa y se vuelve a Entrar.
      if (!result.session) {
        if (mode === 'signup') {
          showError('Cuenta creada. Revisa tu email para confirmarla y luego inicia sesion.');
          setMode('signin');
        } else {
          showError('No se pudo iniciar sesion. Revisa tus datos e intenta de nuevo.');
        }
        return;
      }

      window.location.href = '/';
    } catch {
      showError('Algo salio mal. Reintenta en un momento.');
    } finally {
      setLoading(false);
    }
  }

  for (const tab of tabs) {
    tab.addEventListener('click', () => setMode((tab.dataset.authTab as AuthMode) ?? 'signin'));
  }
  form.addEventListener('submit', (event) => void handleSubmit(event));

  setMode('signin');
}
