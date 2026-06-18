/* ============================================================
   Motor del dashboard (isla de cliente, sin dependencias estaticas del SDK).
   Espeja el patron de quiz.ts: AbortController teardown, mount en
   astro:page-load, unmount en astro:before-swap.
   Supabase-js se carga SOLO via import dinamico para mantener el chunk
   aislado del bundle de paginas publicas.
   ============================================================ */

import type { VehicleCategory } from '../data/types';
import { computeStats } from './dashboard-core';
import type { AttemptRow, DashboardStats } from './dashboard-core';

// ---------------------------------------------------------------------------
// Minimal el() helper (copiado local de quiz.ts; NO se importa desde alli
// para mantener la frontera de chunks limpia).
// ---------------------------------------------------------------------------
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  return node;
}

// ---------------------------------------------------------------------------
// Estado (union discriminada)
// ---------------------------------------------------------------------------
type View =
  | { kind: 'loading' }
  | { kind: 'empty' }
  | { kind: 'not-configured' }
  | { kind: 'error'; reason: 'auth' | 'network' }
  | { kind: 'data'; attempts: AttemptRow[]; active: VehicleCategory };

// ---------------------------------------------------------------------------
// Sub-renderers
// ---------------------------------------------------------------------------

function renderLoading(root: HTMLElement): void {
  root.replaceChildren();
  const grid = el('div', { class: 'panel__kpi-grid', 'aria-hidden': 'true' });
  for (let i = 0; i < 5; i++) {
    const card = el('div', { class: 'panel__kpi-card card' });
    card.append(
      el('div', { class: 'panel__kpi-value skeleton' }),
      el('div', { class: 'panel__kpi-label skeleton' }),
    );
    grid.append(card);
  }
  root.append(grid);
}

function renderEmpty(root: HTMLElement): void {
  root.replaceChildren();
  const wrap = el('div', { class: 'empty' });
  wrap.append(
    el('p', {}, ['Aun no tienes intentos guardados.']),
    el('a', { class: 'btn', href: '/' }, ['Hacer un examen']),
  );
  root.append(wrap);
}

function renderNotConfigured(root: HTMLElement): void {
  root.replaceChildren();
  const alert = el('div', { class: 'alert alert--info', role: 'alert' });
  alert.append(el('span', {}, ['El panel no esta disponible en este entorno.']));
  root.append(alert);
}

function renderError(root: HTMLElement, reason: 'auth' | 'network'): void {
  root.replaceChildren();
  const alert = el('div', { class: 'alert alert--error', role: 'alert' });
  if (reason === 'auth') {
    alert.append(
      el('p', {}, ['La sesion ha expirado. Vuelve a entrar para ver tu progreso.']),
      el('a', { class: 'btn', href: '/cuenta' }, ['Volver a entrar']),
    );
  } else {
    alert.append(el('p', {}, ['No se pudo cargar tu progreso. Revisa tu conexion.']));
  }
  root.append(alert);
}

function renderKpiCard(value: string, label: string): HTMLElement {
  const card = el('div', { class: 'panel__kpi-card card' });
  card.append(
    el('span', { class: 'panel__kpi-value' }, [value]),
    el('span', { class: 'panel__kpi-label' }, [label]),
  );
  return card;
}

function renderDataView(root: HTMLElement, attempts: AttemptRow[], active: VehicleCategory): void {
  root.replaceChildren();

  const filtered = attempts.filter((r) => r.category === active);
  const stats: DashboardStats = computeStats(filtered);

  // KPI grid
  const grid = el('div', { class: 'panel__kpi-grid' });
  grid.append(
    renderKpiCard(String(stats.totalAttempts), 'Intentos'),
    renderKpiCard(`${stats.avgPercent}%`, 'Promedio'),
    renderKpiCard(`${stats.bestPercent}%`, 'Mejor'),
    renderKpiCard(stats.passRate !== null ? `${stats.passRate}%` : '—', 'Aprobacion simulacro'),
    renderKpiCard(String(stats.streak), 'Racha (dias)'),
  );
  root.append(grid);

  // Move focus to panel heading on data load
  const panelTitle = document.getElementById('panel-title');
  if (panelTitle) {
    panelTitle.focus();
  }
}

// ---------------------------------------------------------------------------
// render — dispatch principal (usa el tipo View)
// ---------------------------------------------------------------------------
function render(
  root: HTMLElement,
  view: View,
  attempts: AttemptRow[],
  active: VehicleCategory,
): void {
  switch (view.kind) {
    case 'loading':
      renderLoading(root);
      break;
    case 'empty':
      renderEmpty(root);
      break;
    case 'not-configured':
      renderNotConfigured(root);
      break;
    case 'error':
      renderError(root, view.reason);
      break;
    case 'data':
      renderDataView(root, attempts, active);
      break;
  }
}

// ---------------------------------------------------------------------------
// initDashboard — punto de entrada publico
// ---------------------------------------------------------------------------

/**
 * Monta el motor del dashboard dentro de `root` y devuelve una funcion
 * de limpieza (AbortController). panel.astro llama a esta funcion en
 * astro:page-load y al resultado en astro:before-swap.
 */
export function initDashboard(root: HTMLElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  // Region aria-live persistente (fuera del area re-renderizada).
  // Se crea una sola vez al montar, igual que live en quiz.ts.
  const live = el('p', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  root.parentElement?.insertBefore(live, root);

  let lastAnnounce = '';
  function announce(msg: string): void {
    // Alterna un espacio no separable para forzar re-anuncio de mensajes identicos.
    lastAnnounce = msg === lastAnnounce ? `${msg}\u00A0` : msg;
    live.textContent = lastAnnounce;
  }

  // Estado reactivo local
  let currentAttempts: AttemptRow[] = [];
  let currentActive: VehicleCategory = 'carro';

  // Switch carro/moto (ya existe en el markup de panel.astro como [data-panel-switch]).
  const switchEl = document.querySelector<HTMLElement>('[data-panel-switch]');

  function updateToggle(active: VehicleCategory): void {
    if (!switchEl) return;
    switchEl.querySelectorAll<HTMLButtonElement>('[data-panel-cat]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.panelCat === active));
    });
    if (switchEl.hasAttribute('hidden')) switchEl.removeAttribute('hidden');
  }

  // Click delegado en el switch, scoped al signal.
  function onSwitchClick(ev: MouseEvent): void {
    if (signal.aborted) return;
    const btn = (ev.target as HTMLElement).closest<HTMLButtonElement>('[data-panel-cat]');
    if (!btn) return;
    const cat = btn.dataset.panelCat as VehicleCategory | undefined;
    if (!cat || cat === currentActive) return;
    currentActive = cat;
    updateToggle(currentActive);
    render(
      root,
      { kind: 'data', attempts: currentAttempts, active: currentActive },
      currentAttempts,
      currentActive,
    );
    announce(`Mostrando datos para ${currentActive === 'carro' ? 'Carro' : 'Moto'}.`);
  }

  if (switchEl) {
    switchEl.addEventListener('click', onSwitchClick, { signal });
  }

  // Render inicial: skeleton
  render(root, { kind: 'loading' }, [], 'carro');
  announce('Cargando tu progreso...');

  // Flujo asincrono principal
  void (async () => {
    // 1. Comprobacion sincrona de presencia de sesion.
    const rawSession = localStorage.getItem('tallerb1-auth');
    if (!rawSession) {
      if (signal.aborted) return;
      render(root, { kind: 'error', reason: 'auth' }, [], 'carro');
      announce('Sesion no encontrada. Vuelve a entrar.');
      return;
    }

    // 2. Import dinamico del SDK (chunk aislado, nunca estatico).
    const { supabase, isSupabaseConfigured } = await import('../lib/supabase');
    if (signal.aborted) return;

    if (!isSupabaseConfigured) {
      render(root, { kind: 'not-configured' }, [], 'carro');
      announce('El panel no esta disponible en este entorno.');
      return;
    }

    // 3. Leer sesion (lectura de localStorage, sin red).
    const { data: sessData } = await supabase.auth.getSession();
    if (signal.aborted) return;

    const userId = sessData.session?.user?.id;
    if (!userId) {
      render(root, { kind: 'error', reason: 'auth' }, [], 'carro');
      announce('La sesion ha expirado. Vuelve a entrar.');
      return;
    }

    // 4. Query de intentos (RLS impone user_id; eq explicito por legibilidad e indice).
    const { data, error } = await supabase
      .from('attempts')
      .select('category,mode_slug,score,total,percent,passed,duration_s,wrong_qids,created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (signal.aborted) return;

    if (error) {
      const isAuth =
        (error as { status?: number }).status === 401 || /jwt|token/i.test(error.message ?? '');
      render(root, { kind: 'error', reason: isAuth ? 'auth' : 'network' }, [], 'carro');
      announce(isAuth ? 'La sesion ha expirado.' : 'Error de red al cargar el progreso.');
      return;
    }

    const rows = (data ?? []) as AttemptRow[];

    // 5. Estado vacio.
    if (rows.length === 0) {
      render(root, { kind: 'empty' }, [], 'carro');
      announce('Aun no tienes intentos guardados.');
      return;
    }

    // 6. Categoria inicial: la de mas intentos; empate o ninguna -> 'carro'.
    const counts: Record<string, number> = {};
    for (const r of rows) {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    }
    const defaultCat: VehicleCategory =
      (counts['moto'] ?? 0) > (counts['carro'] ?? 0) ? 'moto' : 'carro';

    currentAttempts = rows;
    currentActive = defaultCat;

    updateToggle(currentActive);
    render(
      root,
      { kind: 'data', attempts: currentAttempts, active: currentActive },
      currentAttempts,
      currentActive,
    );
    announce(`${rows.length} intentos cargados.`);
  })();

  // Teardown: corta listeners y renders pendientes, limpia region live.
  return () => {
    controller.abort();
    live.remove();
    if (switchEl) switchEl.setAttribute('hidden', '');
  };
}
