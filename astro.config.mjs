// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Sitio estático (SSG). No requiere servidor de Node en produccion:
  // el resultado de `npm run build` es HTML/CSS/JS listo para cualquier hosting.
  site: 'https://examen-conduccion.example',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
