// ESLint flat config. Capas: JS recomendado -> TypeScript -> Astro.
// Mantiene el toolchain alineado con el ecosistema de Astro.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/',
      '.astro/',
      'coverage/',
      'node_modules/',
      // Scripts clasicos (var, IIFE) servidos tal cual desde /public.
      'public/theme.js',
      'public/category.js',
      'public/panel-guard.js',
      // PWA scripts: service worker (ServiceWorkerGlobalScope) y registro.
      'public/sw.js',
      'public/sw-register.js',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,

  // Codigo de navegador (islas y TS del cliente).
  {
    files: ['src/**/*.{ts,astro}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },

  // Scripts de Node (generadores, utilidades).
  {
    files: ['scripts/**/*.{js,mjs}', '*.config.{js,mjs,ts}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
