/* Tema claro/oscuro. Script clasico y render-blocking en el <head>: fija
   data-theme en <html> antes del primer paint (anti-FOUC). El guard de
   idempotencia evita doble registro de listeners si el script se reevaluara
   durante una transicion de vista. */
(function () {
  if (window.__themeInit) return;
  window.__themeInit = true;

  var root = document.documentElement;

  function resolve() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'dark' || t === 'light') return t;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function sync() {
    var dark = root.dataset.theme === 'dark';
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(dark));
    }
  }

  function apply() {
    root.dataset.theme = resolve();
    sync();
  }

  apply();

  // documentElement persiste entre navegaciones con ViewTransitions, asi que
  // basta registrar estos listeners una sola vez.
  document.addEventListener('astro:after-swap', apply);
  document.addEventListener('astro:page-load', sync); // refleja el estado en el toggle ya renderizado
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e2) {}
    sync();
  });
})();
