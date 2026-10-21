# AI Harness Constitution (AGENTS.md)

## 0. Project
An Interactive 3D Geometry & Material Studio — a browser-based React/Three.js app where a user rotates, zooms, and re-skins a 3D object. Full product requirements: `docs/SPECS.md`.

## 1. Core Mandate
This repository operates strictly under an AI Harness Engineering workflow.
- 100% of application source code, tests, and tooling configurations must be authored and maintained by AI agents.
- Follow all architectural, structural, and code style constraints defined in `docs/STANDARDS.md`.
- Implement all product requirements defined in `docs/SPECS.md`.

## 2. Dev Environment
- Install: `npm install`
- Run locally: `npm run dev`
- These assume the scaffold task in `docs/TASKS.md` has already run; no `package.json` exists until then.

## 3. Unified Validation Pipeline (Quality Gate)
The project `package.json` must define and maintain these exact verification scripts:
- `"typecheck": "tsc --noEmit"`
- `"lint": "eslint src --max-warnings 0"`
- `"test": "vitest run --passWithNoTests"`
- `"build": "vite build"`
- `"validate": "npm run typecheck && npm run lint && npm run test && npm run build"`

## 4. Mandatory Validation Feedback Loop
Before marking any task in `docs/TASKS.md` as `[x]` or creating a Git commit, the agent MUST run `npm run validate`.
- If any check fails (TypeScript, ESLint, Vitest, or Vite build), analyze the terminal output, fix the root cause in the code, and re-run `npm run validate` until 100% green.
- Never bypass quality gates or git hooks.

## 5. Task & Context Management
- Technical design lives in `docs/ARCHITECTURE.md`.
- Atomic implementation checklist lives in `docs/TASKS.md`.
- Execute strictly ONE incomplete `[ ]` task at a time, validate it, mark it `[x]`, and create an atomic Conventional Commit (`feat:`, `fix:`, `test:`, `chore:`, `docs:`).