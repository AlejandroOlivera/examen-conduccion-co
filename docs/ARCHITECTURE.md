# Arquitectura

Sitio estatico (Astro SSG, sin framework de UI) para practicar el examen teorico
de la licencia B1 de Colombia. Todo el contenido y la UI estan en espanol.

## Flujo de datos (una sola direccion)

```
src/data (tipado) ──► pagina prerenderizada ──► JSON embebido en HTML ──► isla de cliente
```

1. **`src/data/`** — fuente unica de verdad.
   - `types.ts`: `Question`, `ExamMode`, `QuizConfig`.
   - `questions.ts`: banco de preguntas (~96).
   - `modes.ts`: los 7 modos (4 grupos CALE + mecanico + casos + simulacro).
   - `schema.ts`: esquemas **Zod** que validan el banco en los tests/CI.
2. **`src/pages/examen/[modo].astro`** — una ruta dinamica prerenderiza una
   pagina por modo (`getStaticPaths`). Serializa un `QuizConfig` en `data-config`
   y el payload de preguntas en un `<script type="application/json">`.
3. **`src/scripts/`** — la isla de cliente del quiz.
   - `quiz-core.ts`: **logica pura sin DOM** (baraja, preparacion de preguntas,
     muestreo, puntaje, umbral). Aceptan un `rng` inyectable y estan cubiertas
     por tests.
   - `quiz.ts`: el motor con DOM (render imperativo, timer de reloj de pared,
     foco, `aria-live`, atajos de teclado). Usa `quiz-core.ts` para la logica.

## Estilos

El CSS del quiz vive en el bloque `<style is:global>` de `[modo].astro` porque
la isla crea el DOM en runtime (los estilos con scope de Astro no aplicarian).
Los tokens de diseno (colores, tipografias, `--accent` por modo, tema claro/
oscuro) son variables CSS en `src/styles/global.css`.

## Calidad y tooling

- **TypeScript** estricto (`astro/tsconfigs/strict` + `noUncheckedIndexedAccess`).
- **ESLint** (flat config) + **Prettier** (con `prettier-plugin-astro`).
- **Vitest** para la logica pura y la validacion del banco (Zod).
- **Husky + lint-staged + commitlint** para hooks y Conventional Commits.
- **GitHub Actions** (`.github/workflows/ci.yml`): typecheck, lint, format,
  test y build en cada PR y push a `main`.

## Despliegue

`pnpm run build` produce HTML/CSS/JS 100% estatico en `/dist`. Netlify lo publica
(`netlify.toml`: Node 22, cabeceras de seguridad + CSP, cache inmutable de
`/_astro`). No requiere servidor de Node en produccion.
