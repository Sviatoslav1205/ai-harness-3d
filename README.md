# Interactive 3D Geometry & Material Studio

[![CI](https://github.com/Sviatoslav1205/ai-harness-3d/actions/workflows/ci.yml/badge.svg)](https://github.com/Sviatoslav1205/ai-harness-3d/actions/workflows/ci.yml)

**[Live Demo](https://sviatoslav1205.github.io/ai-harness-3d/)**

A browser-based interactive 3D studio built with React, TypeScript, and Three.js (via `@react-three/fiber` and `@react-three/drei`). Users can rotate, zoom, and re-skin a 3D object by switching geometry, material, color, and environment presets in real time.

## AI Harness Architecture

This repository is built entirely by AI agents operating under a strict constitution defined in [`AGENTS.md`](./AGENTS.md). The harness is organized around a small set of governing documents:

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — technical design and module/interface contracts.
- [`docs/SPECS.md`](./docs/SPECS.md) — the product specification (functional requirements, accessibility contract).
- [`docs/STANDARDS.md`](./docs/STANDARDS.md) — engineering standards, file structure, and code style/lint rules.
- [`docs/TASKS.md`](./docs/TASKS.md) — an atomic implementation checklist, executed strictly one `[ ]` task at a time.

Tasks are executed one at a time via the `/next-task` slash command, which picks the next incomplete task from `docs/TASKS.md`, implements it, validates it, and commits it before halting for a context reset.

## Subagent Orchestration

`/next-task` delegates work to two subagents:

- **`task-implementer`** — runs on the Sonnet model. Implements the application code, tests, and configuration for a single atomic task, scoped strictly to the task definition.
- **`qa-validator`** — runs on the Haiku model. Runs the `npm run validate` pipeline to verify the implementation independently, preserving the main agent's context tokens.

If validation fails, the orchestrator loops through a fix → reverify cycle, capped at **3 automated attempts**. If the task is still failing after the third attempt, the loop stops and reports the blocker to the human operator instead of retrying indefinitely.

## Native Hooks Feedback Loops

`.claude/settings.json` wires two deterministic hooks that run outside the agent's control, so they cannot be bypassed by instruction alone:

- **`PostToolUse`** — runs `tsc --noEmit` after every `.ts`/`.tsx` file edit, surfacing type errors immediately.
- **`PreToolUse`** — enforces the full `npm run validate` suite before any `git commit` invocation, including flagged variants (e.g. `git --no-pager commit`). A non-zero exit blocks the commit until the root cause is fixed.

## Local Setup

```bash
npm install        # install dependencies
npm run dev         # start the Vite dev server
npm run validate    # run the full quality gate: typecheck, lint, test, build
npm run build        # production build (vite build)
```

Individual scripts, as defined in `package.json` (per `AGENTS.md` §3):

- `npm run typecheck` — `tsc --noEmit`, verifies strict TypeScript compiles with no errors.
- `npm run lint` — `eslint src --max-warnings 0`, zero-warning lint gate over `src/`.
- `npm run test` — `vitest run --passWithNoTests`, runs the unit/component test suite headlessly.
- `npm run build` — `vite build`, produces the production bundle in `./dist`.
- `npm run validate` — runs all of the above in sequence; the mandatory quality gate before any commit.

## CI/CD

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) defines two jobs:

- **`validate`** — runs on every push and pull request, installing dependencies and running `npm run validate` (typecheck, lint, test, build) on `ubuntu-latest`.
- **`deploy`** — runs only on a push to `main`, after `validate` passes. It rebuilds the production bundle and deploys `./dist` to GitHub Pages using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
