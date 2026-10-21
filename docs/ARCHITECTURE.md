# Technical Architecture: Interactive 3D Geometry & Material Studio

## 1. Component Tree
```text
App                                          (src/App.tsx)
├── Scene                                    (src/components/canvas/Scene/Scene.tsx)
│   ├── StudioLights                         (src/components/canvas/StudioLights/StudioLights.tsx)
│   ├── StageFloor                           (src/components/canvas/StageFloor/StageFloor.tsx)
│   ├── StudioObject                         (src/components/canvas/StudioObject/StudioObject.tsx)
│   └── OrbitControls                        (@react-three/drei, not authored)
└── ControlPanel                             (src/components/ui/ControlPanel/ControlPanel.tsx)
    ├── ShapeSelector                        (src/components/ui/ShapeSelector/ShapeSelector.tsx)
    ├── MaterialSelector                     (src/components/ui/MaterialSelector/MaterialSelector.tsx)
    ├── ColorSwatches                        (src/components/ui/ColorSwatches/ColorSwatches.tsx)
    ├── RotationControls                     (src/components/ui/RotationControls/RotationControls.tsx)
    └── ResetButton                          (src/components/ui/ResetButton/ResetButton.tsx)
```
Every path above is a component *folder*, not a bare file — see `docs/STANDARDS.md` §2 for the exact barrel contents per component. `Scene` and every `ui/` component get the full 3-file barrel (`.tsx` + `.module.css` + `index.ts`) because each renders real DOM (`Scene` mounts the `<canvas>` element and its responsive wrapper `div`; the `ui/` components render HTML controls). `StudioLights`, `StageFloor`, and `StudioObject` render **no DOM** — they are pure Three.js scene-graph nodes mounted *inside* `Scene`'s `<Canvas>` — so they use the reduced 2-file barrel (`.tsx` + `index.ts`, no `.module.css`) per `docs/STANDARDS.md` §2.

## 2. State Ownership
- `useStudioState` (`src/hooks/useStudioState.ts`) is the single source of truth for shape, material, color, auto-rotate flag, and speed.
- It returns `{ state: StudioState } & StudioActions` (see §3 below) — one state object plus discrete setters (`setShape`, `setMaterial`, `setColor`, `setAutoRotate`, `setSpeed`, `reset`) — no raw `setState` escapes the hook.
- `App` owns the one hook instance and passes `state` + the setters down as props to `Scene` and `ControlPanel`. No React Context: the tree is two siblings deep, so Context would add indirection without solving a real prop-drilling problem.

## 3. Concrete Contracts

### 3.1 Domain Types (`src/types/studio.ts`)
```ts
export type ShapeType = 'box' | 'torusKnot' | 'icosahedron';
export type MaterialType = 'standard' | 'metallic' | 'wireframe';

export interface StudioState {
  shape: ShapeType;
  material: MaterialType;
  color: string;        // hex string, must be one of COLOR_SWATCHES in src/constants/studio.ts
  autoRotate: boolean;
  speed: number;         // 0–5 inclusive, see SPEED_BOUNDS
}

export interface StudioActions {
  setShape: (shape: ShapeType) => void;
  setMaterial: (material: MaterialType) => void;
  setColor: (color: string) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export type UseStudioStateReturn = { state: StudioState } & StudioActions;
```

### 3.2 Default State & Bounds (`src/constants/studio.ts`)
```ts
import type { StudioState, ShapeType, MaterialType } from '@/types/studio';

export const DEFAULT_STUDIO_STATE: StudioState = {
  shape: 'box',
  material: 'standard',
  color: '#3b82f6', // Cyber Blue
  autoRotate: false,
  speed: 2,
};

export const SHAPE_OPTIONS: readonly ShapeType[] = ['box', 'torusKnot', 'icosahedron'];
export const MATERIAL_OPTIONS: readonly MaterialType[] = ['standard', 'metallic', 'wireframe'];

export const COLOR_SWATCHES = [
  { id: 'cyber-blue', hex: '#3b82f6', label: 'Cyber Blue' },
  { id: 'emerald', hex: '#10b981', label: 'Emerald' },
  { id: 'sunset-orange', hex: '#f59e0b', label: 'Sunset Orange' },
  { id: 'crimson', hex: '#ef4444', label: 'Crimson' },
] as const;

export const SPEED_BOUNDS = { min: 0, max: 5, step: 1 } as const;
```

**Default rationale (non-obvious choices only):**
- `shape: 'box'`, `material: 'standard'`, `color: '#3b82f6'` — each is the first option in its `docs/SPECS.md` §2.2 enumeration. Using "first-in-list" uniformly keeps the defaults deterministic and traceable to the spec, rather than an arbitrary pick.
- `autoRotate: false` — WCAG 2.2 SC 2.2.2 (Pause, Stop, Hide) and SC 2.3.3 (Animation from Interactions) disfavor content that moves automatically without a user-initiated start. Defaulting to off means the auto-rotate toggle is the sole, explicit mechanism that starts motion, and keeps the toggle's own default label ("Auto-Rotate", not "Pause") self-consistent.
- `speed: 2` — a non-zero, non-boundary value. `0` would make the toggle inert the instant a user turns it on; `5` (max) is a jarring first impression. `2` gives a moderate, comfortable default if/when auto-rotate is enabled, without ever auto-playing on load (`autoRotate` is `false`).

### 3.3 Reset Scope (clarifies `docs/SPECS.md` §2.2.5)
`reset()` restores only the five values in `StudioState`. It does **not** reach into the `useFrame` ref-mutated `Object3D` rotation on `StudioObject` (§4) — that live orientation is a transient render-loop artifact, not application state, and is intentionally out of `useStudioState`'s authority per §2's "no raw setState escapes the hook" rule. `StudioObject` is responsible for re-zeroing its own ref when `shape` changes (new mesh instance) but is **not** required to re-zero on `reset()` of unrelated fields (color/material/autoRotate/speed). This is a deliberate non-goal (§6), not an oversight.

### 3.4 JSDOM Test Harness (`src/test/setup.ts`)
```ts
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// 1. ResizeObserver — <Canvas> observes its container to size the WebGL
// viewport; jsdom has no implementation.
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// 2. HTMLCanvasElement.getContext — safety net for any direct WebGL
// feature-detection that runs before the Canvas mock below takes over.
// Returns null (never throws) so callers treat it as "no GL available".
HTMLCanvasElement.prototype.getContext = vi.fn(
  () => null,
) as typeof HTMLCanvasElement.prototype.getContext;

// 3. @react-three/fiber — replace <Canvas> with a DOM-safe stand-in.
// It renders one testid'd div and deliberately does NOT mount its
// three.js children (mesh/group/etc. are not valid DOM tags and would
// throw under jsdom's ReactDOM renderer). useFrame/useThree become
// no-ops so any hook invoked outside the mocked Canvas cannot crash
// a test. This caps test scope to a Scene smoke test, per §5 below —
// deep 3D scene-graph assertions are explicitly out of scope.
vi.mock('@react-three/fiber', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-three/fiber')>();
  const React = await import('react');
  return {
    ...actual,
    Canvas: () => React.createElement('div', { 'data-testid': 'r3f-canvas-mock' }),
    useFrame: vi.fn(),
    useThree: vi.fn(() => ({}) as unknown),
  };
});
```

## 4. Render-Loop Performance
- The per-frame rotation increment is applied inside a `useFrame` callback that mutates a `THREE.Object3D` ref directly — never by writing to React state every frame.
- `speed` and `autoRotate` are read from state only to decide *whether and how fast* to mutate the ref, not as a render trigger.
- Shape, material, and color changes are the only state updates expected to trigger a re-render of `StudioObject`.

## 5. Testing Strategy
- `useStudioState` is tested in isolation with `renderHook` — no Canvas involved.
- `ControlPanel` (and each of its five children) is tested with `@testing-library/react` against the exact `aria-label` / `data-testid` contract in `docs/SPECS.md` §3.
- `Scene` is exercised only through the mocked `Canvas` in `src/test/setup.ts` — asserting the `r3f-canvas-mock` testid renders and receives the expected props. `StudioLights`/`StageFloor`/`StudioObject` are not mounted in jsdom at all (the mock swallows `Canvas` children); their tests are limited to verifying the exported function/constants wiring (see `docs/TASKS.md`). Actual WebGL pixel output is out of scope for unit tests.

## 6. Non-Goals
- No backend, persistence, routing, or multi-page navigation.
- No support for user-uploaded 3D models — the geometry set is fixed to `box` / `torusKnot` / `icosahedron` per `docs/SPECS.md`.
- No requirement that `reset()` snap the live mesh orientation back to zero (§3.3).
