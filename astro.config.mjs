// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL publica real: la usan el canonical, los metadatos Open Graph y el sitemap.
const SITE = 'https://examen-conduccion-co.netlify.app';

// https://astro.build/config
export default defineConfig({
  // Sitio estático (SSG). No requiere servidor de Node en produccion:
  // el resultado de `npm run build` es HTML/CSS/JS listo para cualquier hosting.
  site: SITE,
  integrations: [
    sitemap({
      // El 404 no debe indexarse ni listarse en el sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      priority: 0.8,
      serialize(item) {
        // La home es la pagina mas importante del sitio.
        if (item.url === `${SITE}/`) item.priority = 1.0;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
