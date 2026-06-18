/* ============================================================
   Motor del quiz (isla de cliente, sin dependencias).
   - Baraja preguntas y opciones en cada intento.
   - Modo practica: retroalimentacion inmediata + explicacion.
   - Modo simulacro: cronometro, sin feedback hasta el final, umbral 80%.
   ============================================================ */

import type { Question, QuizConfig } from '../data/types';
import {
  type PreparedQuestion,
  formatTime,
  isPassing,
  prepareQuestion,
  sampleQuestions,
  scoreAnswers,
} from './quiz-core';
import { saveAttempt } from './attempts';

interface QuizState {
  questions: PreparedQuestion[];
  answers: (number | null)[];
  index: number;
  finished: boolean;
  remaining: number | null;
}

/** A donde mover el foco tras un re-render (el DOM anterior se destruye). */
type FocusTarget = 'none' | 'prompt' | 'nav' | { option: number };

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const WARN_SECONDS = 300; // primer aviso de tiempo
const LOW_SECONDS = 60; // aviso final + estado visual

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

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

/**
 * Monta el quiz dentro de `root` y devuelve una funcion de limpieza.
 * Con ViewTransitions la pagina no se descarga al navegar, asi que los
 * listeners globales (teclado, beforeunload) y el cronometro deben poder
 * desmontarse para no apilarse entre visitas: por eso el AbortController.
 */
export function initQuiz(root: HTMLElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  const dataNode = root.querySelector<HTMLScriptElement>('script[type="application/json"]');
  const configRaw = root.dataset.config;
  if (!dataNode || !configRaw) {
    root.textContent = 'No se pudieron cargar las preguntas.';
    return () => controller.abort();
  }

  const config: QuizConfig = JSON.parse(configRaw);
  const pool: Question[] = JSON.parse(dataNode.textContent ?? '[]');

  if (pool.length === 0) {
    root.textContent = 'No hay preguntas disponibles para este modo.';
    return () => controller.abort();
  }

  const selected = sampleQuestions(pool, config.sample);

  const state: QuizState = {
    questions: selected.map((q) => prepareQuestion(q)),
    answers: new Array<number | null>(selected.length).fill(null),
    index: 0,
    finished: false,
    remaining: config.timerSeconds,
  };

  let startedAt = Date.now();
  let timerId: number | null = null;
  let deadline: number | null = null;
  let warnedSoon = false;
  let warnedLow = false;
  let endedByTimeout = false;

  // --- Estructura del DOM (se construye una vez) ---
  const stage = el('div', { class: 'quiz' });
  // Region viva persistente, fuera de `stage`: si se recreara en cada
  // render, los lectores de pantalla no anunciarian nada.
  const live = el('p', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  root.append(stage, live);

  let lastAnnounce = '';
  function announce(msg: string): void {
    // Alterna un espacio final para forzar el re-anuncio de mensajes identicos.
    lastAnnounce = msg === lastAnnounce ? `${msg}\u00A0` : msg;
    live.textContent = lastAnnounce;
  }

  function scrollToTop(): void {
    stage.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  function clearTimer(): void {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
    deadline = null;
  }

  function startTimer(): void {
    if (state.remaining === null) return;
    // Contra reloj de pared: los navegadores estrangulan setInterval en
    // pestanas en segundo plano, asi que decrementar por tick alargaria
    // el examen mas alla del limite real.
    deadline = Date.now() + state.remaining * 1000;
    warnedSoon = false;
    warnedLow = false;
    timerId = window.setInterval(tick, 500);
  }

  function tick(): void {
    if (deadline === null) return;
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    state.remaining = remaining;
    const t = stage.querySelector<HTMLElement>('.quiz__timer');
    if (t) {
      t.textContent = formatTime(remaining);
      t.classList.toggle('is-low', remaining <= LOW_SECONDS);
    }
    if (!warnedSoon && remaining <= WARN_SECONDS && remaining > LOW_SECONDS) {
      warnedSoon = true;
      announce(`Quedan ${Math.round(WARN_SECONDS / 60)} minutos.`);
    }
    if (!warnedLow && remaining <= LOW_SECONDS && remaining > 0) {
      warnedLow = true;
      announce('Queda 1 minuto.');
    }
    if (remaining <= 0) {
      clearTimer();
      endedByTimeout = true;
      finish();
    }
  }

  function score(): number {
    return scoreAnswers(state.questions, state.answers);
  }

  function renderQuestion(focus: FocusTarget): void {
    stage.replaceChildren();
    const q = state.questions[state.index];
    if (!q) return;
    const total = state.questions.length;
    const answered = state.answers[state.index];
    // Solo se anima la entrada al cambiar de pregunta (focus 'prompt'/'none'),
    // no en los re-render de la misma pregunta para mostrar feedback.
    const enter = focus === 'none' || focus === 'prompt';

    // Barra superior: progreso + (cronometro)
    const top = el('div', { class: 'quiz__top' });
    const counter = el('span', { class: 'quiz__counter' }, [
      `Pregunta ${state.index + 1} de ${total}`,
    ]);
    top.append(counter);
    if (state.remaining !== null) {
      const timer = el(
        'span',
        { class: 'quiz__timer', role: 'timer', 'aria-label': 'Tiempo restante' },
        [formatTime(state.remaining)],
      );
      if (state.remaining <= LOW_SECONDS) timer.classList.add('is-low');
      top.append(timer);
    }
    stage.append(top);

    const progress = el('div', { class: 'quiz__progress', role: 'presentation' });
    const fill = el('div', { class: 'quiz__progress-fill' });
    const done = state.answers.filter((a) => a !== null).length;
    fill.style.width = `${(done / total) * 100}%`;
    progress.append(fill);
    stage.append(progress);

    // Enunciado: encabezado real (navegable por SR) y destino de foco.
    // tabIndex -1: enfocable solo por script, nunca entra al orden de Tab.
    const prompt = el('h2', { class: enter ? 'quiz__prompt is-enter' : 'quiz__prompt' }, [
      q.prompt,
    ]);
    prompt.tabIndex = -1;
    stage.append(prompt);

    // Opciones (grupo de botones)
    const list = el('div', {
      class: enter ? 'quiz__options is-enter' : 'quiz__options',
      role: 'group',
      'aria-label': 'Opciones',
    });
    const showFeedback = config.immediateFeedback && answered !== null;

    q.options.forEach((opt, i) => {
      const btn = el('button', {
        type: 'button',
        class: 'opt',
        'data-i': String(i),
        'aria-pressed': String(answered === i),
      });
      const key = el('span', { class: 'opt__key' }, [LETTERS[i] ?? '·']);
      const txt = el('span', { class: 'opt__text' }, [opt]);
      btn.append(key, txt);

      if (answered === i) btn.classList.add('is-selected');

      if (showFeedback) {
        btn.disabled = true;
        if (i === q.correctIndex) {
          btn.classList.add('is-correct');
          btn.append(
            el('span', { class: 'opt__mark', 'aria-hidden': 'true' }, ['✓']),
            el('span', { class: 'visually-hidden' }, ['Respuesta correcta']),
          );
        } else if (answered === i) {
          btn.classList.add('is-wrong');
          btn.append(
            el('span', { class: 'opt__mark', 'aria-hidden': 'true' }, ['✗']),
            el('span', { class: 'visually-hidden' }, ['Tu respuesta, incorrecta']),
          );
        }
      }

      btn.addEventListener('click', () => onSelect(i));
      list.append(btn);
    });
    stage.append(list);

    // Retroalimentacion visible (el anuncio para SR sale por la region `live`).
    const feedback = el('div', { class: 'quiz__feedback' });
    if (showFeedback) {
      const ok = answered === q.correctIndex;
      feedback.classList.add(ok ? 'is-ok' : 'is-no');
      const head = el('strong', {}, [
        ok ? '✓ Correcto' : `✗ Incorrecto — la respuesta es ${LETTERS[q.correctIndex] ?? ''}`,
      ]);
      feedback.append(head, el('span', {}, [q.explanation]));
    }
    stage.append(feedback);

    // Controles de navegacion
    const nav = el('div', { class: 'quiz__nav' });
    const isLast = state.index === total - 1;

    if (!config.immediateFeedback) {
      const prev = el('button', { type: 'button', class: 'btn btn--ghost' }, ['← Anterior']);
      prev.disabled = state.index === 0;
      prev.addEventListener('click', () => {
        state.index = Math.max(0, state.index - 1);
        renderQuestion('prompt');
      });
      nav.append(prev);
    } else {
      nav.append(el('span', {}, [''])); // espaciador
    }

    const right = el('div', { class: 'quiz__nav-right' });

    if (config.immediateFeedback) {
      const next = el('button', { type: 'button', class: 'btn' }, [
        isLast ? 'Ver resultados' : 'Siguiente →',
      ]);
      next.disabled = answered === null;
      next.addEventListener('click', () => {
        if (isLast) finish();
        else {
          state.index += 1;
          renderQuestion('prompt');
        }
      });
      right.append(next);
    } else {
      const next = el('button', { type: 'button', class: 'btn btn--ghost' }, ['Siguiente →']);
      next.disabled = isLast;
      next.addEventListener('click', () => {
        state.index = Math.min(total - 1, state.index + 1);
        renderQuestion('prompt');
      });
      const finishBtn = el('button', { type: 'button', class: 'btn btn--dark' }, ['Finalizar']);
      finishBtn.addEventListener('click', confirmFinish);
      right.append(next, finishBtn);
    }

    nav.append(right);
    stage.append(nav);

    // En simulacro, indicador de cuantas respondidas
    if (!config.immediateFeedback) {
      stage.append(el('p', { class: 'quiz__answered' }, [`Respondidas: ${done} / ${total}`]));
    }

    // El re-render destruye el elemento enfocado; sin esto, el foco cae a
    // <body> y el usuario de teclado pierde su posicion en cada interaccion.
    if (focus === 'prompt') {
      prompt.focus();
    } else if (focus === 'nav') {
      stage.querySelector<HTMLButtonElement>('.quiz__nav-right .btn:not(:disabled)')?.focus();
    } else if (typeof focus === 'object') {
      list.querySelectorAll<HTMLButtonElement>('.opt')[focus.option]?.focus();
    }
  }

  function onSelect(i: number): void {
    if (state.finished) return;
    const q = state.questions[state.index];
    if (!q) return;
    const already = state.answers[state.index];
    // En modo practica no se permite cambiar tras responder.
    if (config.immediateFeedback && already !== null) return;
    state.answers[state.index] = i;

    if (config.immediateFeedback) {
      // La opcion queda deshabilitada: el foco pasa al siguiente paso logico.
      renderQuestion('nav');
      const ok = i === q.correctIndex;
      const letter = LETTERS[q.correctIndex] ?? '';
      const text = q.options[q.correctIndex] ?? '';
      announce(
        ok
          ? `Correcto. ${q.explanation}`
          : `Incorrecto. La respuesta correcta es ${letter}: ${text}. ${q.explanation}`,
      );
    } else {
      renderQuestion({ option: i });
      announce(`Opcion ${LETTERS[i] ?? ''} seleccionada.`);
    }
  }

  function confirmFinish(): void {
    const total = state.questions.length;
    const pending = state.answers.filter((a) => a === null).length;
    const msg =
      pending > 0
        ? `Tienes ${pending} pregunta(s) sin responder de ${total}. ¿Finalizar de todas formas?`
        : '¿Finalizar y ver tus resultados?';
    if (window.confirm(msg)) finish();
  }

  function finish(): void {
    if (state.finished) return;
    state.finished = true;
    clearTimer();
    renderResults();
    scrollToTop();
  }

  function renderResults(): void {
    stage.replaceChildren();
    const total = state.questions.length;
    const correct = score();
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    // Umbral sobre la fraccion exacta, no sobre el porcentaje redondeado.
    const passed = isPassing(correct, total, config.passPercent);

    // Persiste el intento si hay sesion (fire-and-forget; los anonimos no guardan).
    void saveAttempt({
      category: config.category,
      modeSlug: config.mode,
      score: correct,
      total,
      percent: pct,
      passed,
      durationS: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      wrongQids: state.questions
        .filter((q, i) => state.answers[i] !== null && state.answers[i] !== q.correctIndex)
        .map((q) => q.id),
    });

    if (endedByTimeout) {
      stage.append(
        el('p', { class: 'result__timeup' }, [
          '⏱ Se agoto el tiempo: el examen se cerro automaticamente.',
        ]),
      );
    }

    const head = el('div', { class: 'result' });
    const ring = el('div', {
      class: `result__ring ${passed === null ? '' : passed ? 'is-pass' : 'is-fail'}`,
    });
    const pctLabel = el('span', { class: 'result__pct' }, [`${pct}%`]);
    ring.append(pctLabel);
    head.append(ring);

    // Anima el relleno del anillo (var --pct, transicionable via @property) y
    // la cuenta del numero. Bajo reduced-motion se fija el valor final.
    if (reducedMotion()) {
      ring.style.setProperty('--pct', String(pct));
    } else {
      ring.style.setProperty('--pct', '0');
      pctLabel.textContent = '0%';
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ring.style.setProperty('--pct', String(pct))),
      );
      const start = performance.now();
      const dur = 850;
      const step = (now: number): void => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        pctLabel.textContent = `${Math.round(eased * pct)}%`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const info = el('div', { class: 'result__info' });
    const title = el('h2', {}, ['Resultado']);
    title.tabIndex = -1;
    info.append(title);
    info.append(el('p', { class: 'result__score' }, [`${correct} de ${total} correctas`]));
    if (passed !== null) {
      const verdict = el('p', { class: `result__verdict ${passed ? 'ok' : 'no'}` }, [
        passed
          ? `✓ Aprobado (umbral ${config.passPercent}%)`
          : `✗ No aprobado (necesitas ${config.passPercent}%)`,
      ]);
      info.append(verdict);
    }
    head.append(info);
    stage.append(head);

    // Acciones
    const actions = el('div', { class: 'result__actions' });
    const retry = el('button', { type: 'button', class: 'btn' }, ['Reintentar']);
    retry.addEventListener('click', restart);
    const home = el('a', { class: 'btn btn--ghost', href: '/' }, ['Otros temas']);
    actions.append(retry, home);
    stage.append(actions);

    // Revision
    stage.append(el('h3', { class: 'review__title' }, ['Revision']));
    const review = el('div', { class: 'review' });
    state.questions.forEach((q, i) => {
      const userPick = state.answers[i];
      const ok = userPick === q.correctIndex;
      const item = el('details', { class: `review__item ${ok ? 'ok' : 'no'}` });
      const summary = el('summary', {}, [
        el('span', { class: 'review__badge', 'aria-hidden': 'true' }, [ok ? '✓' : '✗']),
        el('span', { class: 'visually-hidden' }, [ok ? 'Correcta.' : 'Incorrecta.']),
        el('span', { class: 'review__q' }, [`${i + 1}. ${q.prompt}`]),
      ]);
      item.append(summary);

      const body = el('div', { class: 'review__body' });
      q.options.forEach((opt, oi) => {
        const row = el('div', { class: 'review__opt' });
        if (oi === q.correctIndex) row.classList.add('is-correct');
        if (oi === userPick && !ok) row.classList.add('is-wrong');
        row.append(
          el('span', { class: 'review__optkey' }, [LETTERS[oi] ?? '·']),
          el('span', {}, [opt]),
        );
        body.append(row);
      });
      if (userPick === null) {
        body.append(el('p', { class: 'review__note' }, ['Sin responder.']));
      }
      body.append(el('p', { class: 'review__exp' }, [q.explanation]));
      item.append(body);
      review.append(item);
    });
    stage.append(review);

    title.focus();
    announce(
      `${endedByTimeout ? 'Se agoto el tiempo. ' : ''}Examen finalizado: ${correct} de ${total} correctas.`,
    );
  }

  function restart(): void {
    startedAt = Date.now();
    const again = sampleQuestions(pool, config.sample);
    state.questions = again.map((q) => prepareQuestion(q));
    state.answers = new Array<number | null>(again.length).fill(null);
    state.index = 0;
    state.finished = false;
    state.remaining = config.timerSeconds;
    endedByTimeout = false;
    clearTimer();
    renderQuestion('prompt');
    if (state.remaining !== null) startTimer();
    scrollToTop();
    announce('Nuevo intento iniciado.');
  }

  // Atajos de teclado: 1-6 / A-F para seleccionar, Enter para avanzar.
  // Activos solo sin foco concreto (body) o con el foco dentro del quiz,
  // para no interferir con el resto de la pagina ni con tecnologias de apoyo.
  document.addEventListener(
    'keydown',
    (ev) => {
      if (state.finished) return;
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const active = document.activeElement;
      if (active && active !== document.body && !root.contains(active)) return;
      const q = state.questions[state.index];
      if (!q) return;
      const key = ev.key.toLowerCase();
      const numIdx = '123456'.indexOf(key);
      const letIdx = 'abcdef'.indexOf(key);
      const idx = numIdx >= 0 ? numIdx : letIdx;
      if (idx >= 0 && idx < q.options.length) {
        ev.preventDefault();
        onSelect(idx);
      } else if (ev.key === 'Enter') {
        // Con el foco sobre un control, Enter ya lo activa de forma nativa;
        // duplicarlo causaria doble accion (p. ej. responder Y avanzar).
        if (active instanceof HTMLElement && active.closest('button, a, summary')) return;
        ev.preventDefault();
        const next = stage.querySelector<HTMLButtonElement>('.quiz__nav-right .btn:not(:disabled)');
        if (next) next.click();
      }
    },
    { signal },
  );

  // Evita perder un intento en curso al recargar o cerrar por accidente.
  window.addEventListener(
    'beforeunload',
    (ev) => {
      const started = state.answers.some((a) => a !== null);
      if (!started || state.finished) return;
      ev.preventDefault();
    },
    { signal },
  );

  // Arranque
  renderQuestion('none');
  if (state.remaining !== null) startTimer();

  // Limpieza: corta los listeners globales y detiene el cronometro. La invoca
  // [modo].astro en astro:before-swap antes de navegar a otra pagina.
  return () => {
    controller.abort();
    clearTimer();
  };
}
