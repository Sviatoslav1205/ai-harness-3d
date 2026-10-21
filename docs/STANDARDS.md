# Engineering Standards, Code Style & Quality Gates

## 0. Tech Stack
- Framework: React 18 + TypeScript, bundled with Vite (strictly use React 18 for `@react-three/fiber` v8 compatibility; do NOT use React 19).
- 3D Rendering: `three`, `@react-three/fiber` v8, `@react-three/drei` v9
- Styling: CSS Modules
- Testing: `vitest`, `@testing-library/react`, `jsdom`
- Linting: `eslint`, `typescript-eslint`

## 1. Directory & File Structure
All application source code inside `src/` follows a strict modular separation of concerns:
```text
src/
├── components/       # Pure UI and 3D scene components (PascalCase.tsx)
│   ├── canvas/       # Three.js / React Three Fiber scene components
│   └── ui/           # 2D HTML overlay controls and panels
├── hooks/            # Custom React state & logic hooks (useCamelCase.ts)
├── types/            # Shared TypeScript interfaces & domain types (camelCase.ts)
├── constants/        # Immutable configuration, presets, color palettes (camelCase.ts)
├── styles/           # Global CSS styles / global theme variables
└── test/             # Test setup, WebGL/Canvas mocks, and shared test utilities
``` 
**Path Aliasing:**
- Absolute imports must use the `@/` alias mapped to the `src/` directory (e.g., `import { useExample } from '@/hooks/useExample'`).
- Never use deep relative paths (`../../` or `../../../`). Relative paths (`./` or `../`) are strictly reserved for local imports within the same component directory (e.g., importing a `.module.css` or a local sibling component).
- `src/App.tsx` and `src/main.tsx` are the application's composition root, not components — they are exempt from the §2 barrel pattern below and live as flat files directly in `src/`.

## 2. Component File Structure
Every component is isolated in its own PascalCase directory, but the exact barrel contents depend on whether the component renders DOM:

**DOM-rendering components** — every component in `src/components/ui/`, plus the single top-level `Scene` container in `src/components/canvas/` (the one that mounts `<Canvas>` and its responsive wrapper) — use the full 3-file barrel:
```text
components/ui/ExampleComponent/
├── index.ts                     # Barrel file for clean imports (export { ExampleComponent } from './ExampleComponent')
├── ExampleComponent.tsx         # Main component logic, strict TypeScript interfaces, and JSX
└── ExampleComponent.module.css  # Component-specific styles
```

**Pure Three.js scene-graph components** — components mounted *inside* `Scene`'s `<Canvas>` that render only `three.js` primitives and no HTML (`StudioLights`, `StageFloor`, `StudioObject`) — have no DOM to style, so they drop the stylesheet and use a 2-file barrel:
```text
components/canvas/ExampleObject/
├── index.ts               # Barrel file for clean imports (export { ExampleObject } from './ExampleObject')
└── ExampleObject.tsx       # Main component logic, strict TypeScript interfaces, and JSX
```
Creating an empty/meaningless `.module.css` for a non-DOM component is a STANDARDS violation under this rule, not an allowed default. If a canvas component later needs an actual CSS Module (e.g. a future DOM overlay it renders itself), promote it to the 3-file barrel at that time.

Both barrel shapes may additionally contain a `tests/` subfolder (see §5); test files are never counted toward "2-file" vs "3-file".

**Props Typing:** Every component exports a destructured arrow-function const typed against a named `ComponentNameProps` interface declared in the same `.tsx` file:
```ts
interface ComponentNameProps {
  example: string;
}

export const ComponentName = ({ example }: ComponentNameProps) => {
  // ...
};
```
Never type a component with `React.FC<Props>` or `React.FunctionComponent<Props>` — both implicitly add a `children` prop no component here needs, and weaken type inference on generics. Destructure props directly in the function signature rather than accessing a `props` object.

## 3. Granularity & Modularity Limits
- **Single Responsibility:** One component or hook per file.
- **File Size Soft Limit (150 lines):** Keep source files under 150 lines (excluding blanks and comments). If splitting a file would harm cohesion, exceeding 150 lines is permitted ONLY by adding an explicit top-of-file justification:
  `/* eslint-disable max-lines -- <clear architectural reason> */`
- **Test Files Exemption:** Automated test files (`*.test.ts`, `*.test.tsx`) are exempt from the 150-line limit to allow thorough test coverage.
- **Logic Separation:** UI components stay declarative; state transitions and reset logic live in a dedicated custom hook (e.g., `useStudioState`).
- **No Magic Values:** Default parameters, speed bounds, color hex codes, and geometry names are defined once in `src/constants/` and imported everywhere else.

## 4. TypeScript & Linting Strictness (Deterministic Gates)
- **TypeScript (`tsconfig.json`):**
  - `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`, `"noImplicitReturns": true`, `"noFallthroughCasesInSwitch": true`.
  - Configure path alias: `"baseUrl": "."`, `"paths": { "@/*": ["src/*"] }` (and matching alias in `vite.config.ts` / `vitest.config.ts`).
- **ESLint (`eslint.config.js`):**
  - Ban `any` explicitly: `"@typescript-eslint/no-explicit-any": "error"`.
  - Enforce modularity with escape hatch: `"max-lines": ["error", { "max": 150, "skipBlankLines": true, "skipComments": true }]` for `src/**/*.{ts,tsx}`, and explicitly disable `max-lines` in an override block for `**/*.test.{ts,tsx}` and `src/test/**`.
  - Ban deep relative imports: `"no-restricted-imports": ["error", { "patterns": ["../../*"] }]`. Always use `@/` for cross-module imports.
  - Disallow debug logs: `"no-console": ["error", { "allow": ["warn", "error"] }]`.
  - Zero warnings policy: `lint` always runs with `--max-warnings 0`.

## 5. Testing Standards
- Co-locate unit tests next to source files (in subfolder `tests` with `*.test.ts` / `*.test.tsx`) or inside `src/test/`.
- Structure every test using the AAA pattern (Arrange, Act, Assert).
- **WebGL Mocking:** `src/test/setup.ts` mocks the `@react-three/fiber` Canvas/WebGL context, since headless JSDOM has no native WebGL, so component and state tests run deterministically in CI.
