# Guia de contribucion

Gracias por contribuir al Taller B1. Esta guia resume el flujo de trabajo, las
convenciones y los comandos de verificacion.

## Requisitos

- **Node.js 22** (ver `.nvmrc`).
- **pnpm** (definido en `package.json` via `packageManager`). Con Corepack:
  `corepack enable`.

```bash
pnpm install      # instala dependencias y activa los hooks de git (husky)
pnpm run dev      # servidor de desarrollo en http://localhost:4321
```

## Flujo de ramas (Git Flow)

`main` es la rama estable y desplegable (Netlify publica desde ahi). Todo cambio
se hace en una rama con nomenclatura por tipo y un PR hacia `main`:

| Prefijo     | Uso                                           |
| ----------- | --------------------------------------------- |
| `feature/`  | funcionalidad nueva                           |
| `fix/`      | correccion de un bug                          |
| `hotfix/`   | correccion urgente de algo ya en produccion   |
| `refactor/` | reestructuracion sin cambio de comportamiento |
| `chore/`    | tooling, dependencias, mantenimiento          |
| `docs/`     | documentacion                                 |

Ejemplo: `fix/scroll-rebote-ios`, `feature/modo-repaso`.

## Convencion de commits (Conventional Commits)

Los mensajes se validan con commitlint (hook `commit-msg`). Formato:

```
<tipo>(<ambito opcional>): <descripcion en minuscula>
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `chore`, `revert`. Ejemplos:

```
feat(quiz): agrega modo repaso por fallos
fix(mobile): corrige rebote de scroll en iOS
docs: documenta el flujo de ramas
```

## Verificacion (lo que corre el CI)

Antes de abrir el PR, todo esto debe pasar (tambien lo ejecuta el hook
`pre-commit` sobre los archivos modificados):

```bash
pnpm run check         # type-check de Astro/TS
pnpm run lint          # ESLint
pnpm run format:check  # Prettier
pnpm run test          # Vitest (logica + validacion del banco con Zod)
pnpm run build         # build estatico
# atajo:
pnpm run validate      # check + lint + format:check + test
```

Para autoformatear y autoreparar:

```bash
pnpm run format
pnpm run lint:fix
```

## Agregar o editar preguntas

Edita solo `src/data/questions.ts` (ver convenciones de `id` en `CLAUDE.md`).
El esquema Zod (`src/data/schema.ts`) valida en los tests que cada `answer`
este en rango, que no haya `id` ni opciones duplicadas, etc.: un dato invalido
rompe el CI antes de llegar a produccion.

## Arquitectura

Ver [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
