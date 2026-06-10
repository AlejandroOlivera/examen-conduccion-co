# Taller B1 — Examen teórico de conducción (Colombia)

Aplicación web interactiva construida con **Astro** para preparar el examen teórico de conducción de la **licencia B1** (carro particular / mecánico) en Colombia, según la normativa vigente.

Incluye los **4 grupos temáticos oficiales del CALE**, una sección especial de **carro mecánico** (transmisión manual), **casos prácticos** y un **simulacro cronometrado** (40 preguntas / 40 minutos / aprobación 80 %), con retroalimentación y justificación normativa de cada respuesta.

---

## Requisitos

- **Node.js 18.20.8, 20.3.0 o ≥ 22.0.0** (recomendado Node 22 LTS)
- **npm** (o pnpm / yarn)

> Nota: este proyecto se entrega como código fuente. La instalación de dependencias (`npm install`) requiere conexión a internet hacia el registro de npm.

## Puesta en marcha

```bash
# 1) Instalar dependencias
npm install

# 2) Servidor de desarrollo (http://localhost:4321)
npm run dev

# 3) Compilar para producción (genera /dist, HTML estático)
npm run build

# 4) Previsualizar el build de producción
npm run preview

# 5) Verificar tipos y diagnósticos de Astro
npm run check
```

La salida de `npm run build` es **100 % estática** (HTML, CSS y JS), así que puedes desplegarla en cualquier hosting estático (Netlify, Vercel, GitHub Pages, Cloudflare Pages, un bucket, etc.) sin servidor de Node.

---

## Arquitectura

```
examen-conduccion-co/
├── astro.config.mjs          Configuración de Astro (SSG)
├── tsconfig.json             TypeScript estricto
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── data/
    │   ├── types.ts          Tipos: Question, ExamMode, QuizConfig
    │   ├── questions.ts       Banco de 96 preguntas con explicación
    │   └── modes.ts           Definición de los 7 modos (grupos, mecánico, casos, simulacro)
    ├── layouts/
    │   └── BaseLayout.astro   <head>, fuentes, skip-link, slots de header/footer
    ├── components/
    │   ├── SiteHeader.astro
    │   ├── SiteFooter.astro
    │   └── ModeCard.astro
    ├── pages/
    │   ├── index.astro        Home: hero + rejilla de modos + referencia rápida
    │   ├── 404.astro
    │   └── examen/
    │       └── [modo].astro   Ruta dinámica (getStaticPaths) por modo
    ├── scripts/
    │   └── quiz.ts            Motor del quiz (isla de cliente en TypeScript)
    └── styles/
        └── global.css         Sistema de diseño (variables, tipografía, utilidades)
```

### Decisiones de diseño

- **Astro + SSG**: cada modo se prerenderiza con `getStaticPaths`. Sitio rápido y sin backend.
- **Sin framework de UI**: la interactividad vive en una sola **isla en TypeScript** (`quiz.ts`). Menos dependencias, bundle mínimo, fácil de mantener.
- **Datos tipados y separados de la vista**: las preguntas y los modos viven en `src/data` con tipos estrictos. Agregar preguntas es editar un solo archivo.
- **Las opciones se barajan en cada intento** (Fisher-Yates) y se recalcula el índice correcto, para que la posición de la respuesta nunca sea predecible.
- **Accesibilidad**: HTML semántico, `skip-link`, foco visible, región `aria-live` para la retroalimentación, atajos de teclado (`A`–`D` / `1`–`4` y `Enter`), y respeto a `prefers-reduced-motion`.
- **Estado en memoria**: no se usa `localStorage`; cada sesión es independiente.

### Cómo agregar o editar preguntas

Edita `src/data/questions.ts`. Cada pregunta tiene esta forma:

```ts
{
  id: 'g1-21',
  group: 'I',                 // 'I' | 'II' | 'III' | 'IV' | 'mecanico' | 'casos'
  prompt: 'Tu pregunta...',
  options: ['A', 'B', 'C', 'D'],
  answer: 1,                   // índice (base 0) de la opción correcta en `options`
  explanation: 'Por qué es correcta, con base normativa.',
}
```

No hace falta tocar nada más: el conteo, los grupos y el simulacro se recalculan solos.

---

## Fuentes normativas

- Ley 769 de 2002 — Código Nacional de Tránsito Terrestre (y reformas: Ley 1383/2010, Ley 1696/2013, Ley 2161/2021).
- Ley 2251 de 2022 — "Ley Julián Esteban" (límites de velocidad, enfoque de Sistema Seguro).
- Resolución 20253040037125 de 2025 — Centros de Apoyo Logístico de Evaluación (CALE).

> Material de estudio. No está afiliado a ninguna entidad oficial ni reemplaza el examen del CALE. Verifica siempre la normativa vigente en mintransporte.gov.co.
