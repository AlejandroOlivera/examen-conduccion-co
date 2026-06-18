/* Guard de acceso a /panel. Carga render-blocking en el <head> de panel.astro
   (src=""/panel-guard.js"" con is:inline). Lee localStorage sincrono antes del
   primer paint; si no hay sesion valida redirige a /cuenta. Idempotente bajo
   View Transitions. Sin tildes en strings ni comentarios. */
(function () {
  if (window.__panelGuardInit) return;
  window.__panelGuardInit = true;

  function hasValidSession() {
    try {
      var raw = localStorage.getItem('tallerb1-auth'); // Debe coincidir con STORAGE_KEY en src/lib/auth-constants.ts
      if (!raw) return false;
      var s = JSON.parse(raw);
      return !!(s && (s.access_token || s.user));
    } catch (e) {
      return false;
    }
  }

  function check() {
    if (!hasValidSession()) window.location.replace('/cuenta');
  }

  check();
  document.addEventListener('astro:after-swap', check);
})();
