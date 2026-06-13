// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Sitio estático (SSG). No requiere servidor de Node en produccion:
  // el resultado de `npm run build` es HTML/CSS/JS listo para cualquier hosting.
  // `site` debe ser la URL publica real: la usan el canonical, los metadatos
  // Open Graph y el sitemap generado.
  site: 'https://examen-conduccion-co.netlify.app',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
