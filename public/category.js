/* Selector de categoria de vehiculo (carro/moto) de la home. Script clasico
   (var, IIFE) servido tal cual desde /public y cargado render-blocking en el
   <head> (igual que theme.js): fija data-categoria en <html> antes del primer
   paint para que el CSS muestre la grilla correcta sin parpadeo. Sin JS, <html>
   no lleva el atributo y ambas grillas quedan visibles (toda la home navegable).
   El guard de idempotencia evita doble registro de listeners si el script se
   reevalua durante una transicion de vista. */
(function () {
  if (window.__catInit) return;
  window.__catInit = true;

  var KEY = 'categoria';
  var root = document.documentElement;

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === 'carro' || v === 'moto') return v;
    } catch (e) {}
    return 'carro';
  }

  // Fija la categoria activa en <html>: el CSS oculta la grilla de la categoria
  // no activa. No depende del DOM del body, asi que corre antes del paint.
  function setRoot(cat) {
    root.dataset.categoria = cat;
  }

  // Sincroniza los controles de la home (necesita el DOM del body): estado de
  // los botones y enlace del simulacro del hero. No-op fuera de la home.
  function syncControls(cat) {
    var btns = document.querySelectorAll('[data-cat-btn]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(btns[i].getAttribute('data-cat-btn') === cat));
    }
    var cta = document.getElementById('cta-simulacro');
    if (cta) cta.setAttribute('href', '/examen/' + cat + '/simulacro');
  }

  setRoot(read());

  // <html> persiste entre navegaciones con ViewTransitions; re-aplicar en
  // astro:after-swap (antes del paint) evita el parpadeo al volver a la home, y
  // astro:page-load sincroniza los controles una vez existe el DOM del body.
  document.addEventListener('astro:after-swap', function () {
    setRoot(read());
  });
  document.addEventListener('astro:page-load', function () {
    syncControls(read());
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-cat-btn]');
    if (!btn) return;
    var cat = btn.getAttribute('data-cat-btn');
    try {
      localStorage.setItem(KEY, cat);
    } catch (e2) {}
    setRoot(cat);
    syncControls(cat);
  });
})();
