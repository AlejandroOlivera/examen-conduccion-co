import { defineConfig } from 'vitest/config';

// Las pruebas cubren logica pura (quiz-core) y validacion de datos (.ts),
// sin componentes Astro, asi que no se necesita la config de Vite de Astro.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/scripts/quiz-core.ts', 'src/data/**/*.ts'],
    },
  },
});
