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

  // Tinta la barra del navegador (iOS Safari/Android) segun el tema: el header
  // y el footer son asfalto en ambos temas, asi que se usa ese tono.
  function setMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e1114' : '#1c2024');
  }

  function syncToggles(theme) {
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  function set(theme) {
    root.dataset.theme = theme;
    setMeta(theme);
    syncToggles(theme);
  }

  set(resolve());

  // documentElement persiste entre navegaciones con ViewTransitions, asi que
  // basta registrar estos listeners una sola vez.
  document.addEventListener('astro:after-swap', function () {
    set(resolve());
  });
  document.addEventListener('astro:page-load', function () {
    syncToggles(root.dataset.theme === 'dark' ? 'dark' : 'light');
  });
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch (e2) {}
    set(next);
  });
})();
