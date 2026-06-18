/* ============================================================
   Motor del dashboard (isla de cliente, sin dependencias estaticas del SDK).
   Espeja el patron de quiz.ts: AbortController teardown, mount en
   astro:page-load, unmount en astro:before-swap.
   Supabase-js se carga SOLO via import dinamico para mantener el chunk
   aislado del bundle de paginas publicas.
   ============================================================ */

import type { Question, VehicleCategory } from '../data/types';
import { QUESTIONS } from '../data/questions';
import { EXAM_MODES } from '../data/modes';
import { computeStats } from './dashboard-core';
import type { AttemptRow, DashboardStats } from './dashboard-core';

// ---------------------------------------------------------------------------
// Mapa de preguntas por id — construido UNA vez al nivel de modulo.
// QUESTIONS es datos estaticos ya embarcados; NO es el SDK. Seguro aqui.
// ---------------------------------------------------------------------------
const byId = new Map<string, Question>(QUESTIONS.map((q) => [q.id, q]));

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

// ---------------------------------------------------------------------------
// Formato de fecha en hora Colombia (UTC-5, sin DST)
// ---------------------------------------------------------------------------
function formatBogotaDate(iso: string): string {
  const utcMs = Date.parse(iso);
  // Desplaza -5h para obtener la hora Bogota, luego formatea como fecha local.
  const local = new Date(utcMs - 5 * 60 * 60 * 1000);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, '0');
  const d = String(local.getUTCDate()).padStart(2, '0');
  const hh = String(local.getUTCHours()).padStart(2, '0');
  const mm = String(local.getUTCMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${hh}:${mm}`;
}

// ---------------------------------------------------------------------------
// renderTopWrong — lista de preguntas mas falladas
// ---------------------------------------------------------------------------
function renderTopWrong(container: HTMLElement, topWrong: DashboardStats['topWrong']): void {
  container.replaceChildren();

  const heading = el('h2', { class: 'panel__review-heading' }, ['Repasa lo que fallaste']);
  container.append(heading);

  if (topWrong.length === 0) {
    const empty = el('p', { class: 'panel__review-empty' }, [
      'No hay preguntas falladas todavia. Haz un examen para ver tu repaso aqui.',
    ]);
    container.append(empty);
    return;
  }

  const list = el('div', { class: 'panel__review-list' });

  for (const { id, count } of topWrong) {
    const question = byId.get(id);
    // Si el id es obsoleto (pregunta eliminada del banco) lo omitimos.
    if (!question) continue;

    const details = el('details', { class: 'panel__review-item card' });
    const badge = el('span', { class: 'tag panel__review-badge' }, [
      `fallada ${count} ${count === 1 ? 'vez' : 'veces'}`,
    ]);
    const summary = el('summary', { class: 'panel__review-summary' });
    summary.append(el('span', { class: 'panel__review-prompt' }, [question.prompt]), badge);
    const body = el('div', { class: 'panel__review-body' });
    body.append(el('p', { class: 'panel__review-explanation' }, [question.explanation]));
    details.append(summary, body);
    list.append(details);
  }

  container.append(list);
}

// ---------------------------------------------------------------------------
// renderHistory — tabla de historial de intentos
// ---------------------------------------------------------------------------
function renderHistory(container: HTMLElement, attempts: AttemptRow[]): void {
  container.replaceChildren();

  const heading = el('h2', { class: 'panel__hist-heading' }, ['Historial de intentos']);
  container.append(heading);

  if (attempts.length === 0) {
    const empty = el('p', { class: 'panel__hist-empty' }, [
      'No hay intentos para esta categoria todavia.',
    ]);
    container.append(empty);
    return;
  }

  const wrapper = el('div', { class: 'panel__hist-wrapper' });
  const table = el('table', { class: 'panel__hist-table', 'aria-label': 'Historial de intentos' });

  const thead = el('thead');
  const headerRow = el('tr');
  for (const label of ['Fecha', 'Modo', '%', 'Estado']) {
    headerRow.append(el('th', { scope: 'col' }, [label]));
  }
  thead.append(headerRow);
  table.append(thead);

  const tbody = el('tbody');

  for (const attempt of attempts) {
    const row = el('tr');

    // Columna: Fecha (Colombia UTC-5)
    row.append(el('td', {}, [formatBogotaDate(attempt.created_at)]));

    // Columna: Modo (label desde EXAM_MODES, fallback al slug crudo)
    const modeEntry = EXAM_MODES.find(
      (m) => m.category === attempt.category && m.slug === attempt.mode_slug,
    );
    const modeLabel = modeEntry ? modeEntry.short : attempt.mode_slug;
    row.append(el('td', {}, [modeLabel]));

    // Columna: %
    row.append(el('td', {}, [`${attempt.percent}%`]));

    // Columna: Estado — simulacro (passed !== null) muestra Aprobado/No aprobado; resto muestra —
    let estadoText: string;
    let estadoClass: string;
    if (attempt.passed === null) {
      estadoText = '—';
      estadoClass = 'tag panel__hist-badge panel__hist-badge--neutral';
    } else if (attempt.passed) {
      estadoText = 'Aprobado';
      estadoClass = 'tag panel__hist-badge panel__hist-badge--pass';
    } else {
      estadoText = 'No aprobado';
      estadoClass = 'tag panel__hist-badge panel__hist-badge--fail';
    }
    row.append(el('td', {}, [el('span', { class: estadoClass }, [estadoText])]));

    tbody.append(row);
  }

  table.append(tbody);
  wrapper.append(table);
  container.append(wrapper);
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

  // Top wrong review section
  const reviewSection = el('section', {
    class: 'panel__review',
    'aria-label': 'Repaso de preguntas falladas',
  });
  renderTopWrong(reviewSection, stats.topWrong);
  root.append(reviewSection);

  // History table section
  const histSection = el('section', { class: 'panel__hist', 'aria-label': 'Historial' });
  renderHistory(histSection, filtered);
  root.append(histSection);

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
