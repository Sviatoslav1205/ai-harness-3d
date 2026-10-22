# Product Specification: Interactive 3D Geometry & Material Studio

## 1. Overview
A browser-based interactive 3D studio built with React, TypeScript, and Three.js (`@react-three/fiber` and `@react-three/drei`). Users can inspect an interactive 3D object in real-time, rotate and zoom it using mouse or touch gestures, and customize its geometry, material rendering mode, and color theme via an accessible UI control panel.

## 2. Core Functional Requirements

### 2.1. Interactive 3D Viewport
- Renders a responsive 3D canvas occupying the main viewport.
- Interactive camera manipulation via `OrbitControls` (drag to rotate in 3D space, scroll to zoom, smooth damping enabled).
- Studio lighting setup (ambient light + directional lights) to highlight 3D depth and surface materials.
- Subtle background grid or stage floor for spatial orientation.

### 2.2. Customizable 3D Object State
Users dynamically control the 3D object through a UI sidebar/overlay with the following state parameters:
1. **Geometry Shape Selector:**
   - `box` (3D Cube / Box)
   - `torusKnot` (3D Torus Knot)
   - `icosahedron` (3D Faceted Polyhedron)
2. **Material Preset Selector:**
   - `standard` (Balanced matte roughness and metalness)
   - `metallic` (High metalness, low roughness reflective finish)
   - `wireframe` (Technical wireframe mesh view)
3. **Color Swatch Palette:**
   - At least 4 distinct high-contrast accent colors (e.g., Cyber Blue `#3b82f6`, Emerald `#10b981`, Sunset Orange `#f59e0b`, Crimson `#ef4444`).
4. **Environment Backdrop Selector:**
   - `studio` / `sunset` / `warehouse` / `night` — changes the scene's ambient lighting/reflection mood (generated procedurally, no external assets) without changing the object's own material color.
5. **Auto-Rotation Controls:**
   - Toggle button (`Pause` / `Auto-Rotate`).
   - Rotation speed slider (`0` to `5`).
6. **Surprise Me (Randomizer):**
   - A single action that randomizes shape, material, color, and environment together in one click.
7. **Reset Action:**
   - A `Reset Studio` button that restores all state parameters (shape, material, color, environment, auto-rotation, speed) to their initial default values.

### 2.3. Shareable State Links
- The address bar shows a plain URL at rest; no state is ever encoded into it automatically.
- A `Copy Link` action builds a URL encoding the current shape/material/color/environment/speed, copies it to the clipboard, and shows a transient on-screen confirmation of the link — the address bar itself is not rewritten by this action.
- When that URL is opened, the app applies the encoded state on load and then replaces the address bar with the plain URL (via `history.replaceState`, no page reload) — the parameters take effect but are not left visible in the bar.
- Malformed or unrecognized parameters are ignored; the app falls back to default values for anything invalid rather than failing to load.

## 3. Accessibility & UI Standards
- All interactive controls (buttons, sliders) must include explicit `aria-label` and `data-testid` attributes for automated testing, using the exact strings in §3.1.
- `aria-label` always equals the control's visible text (WCAG 2.5.3 Label in Name) — it is not a separate paraphrase.
- High-contrast dark UI overlay theme ensuring WCAG AA text contrast readability.

### 3.1 Control Contract

| Component | Element | `data-testid` | Visible text / `aria-label` |
|---|---|---|---|
| ControlPanel | container | `control-panel` | — |
| ShapeSelector | container | `shape-selector` | — |
| ShapeSelector | box button | `shape-selector-box` | `Box` |
| ShapeSelector | torusKnot button | `shape-selector-torus-knot` | `Torus Knot` |
| ShapeSelector | icosahedron button | `shape-selector-icosahedron` | `Icosahedron` |
| MaterialSelector | container | `material-selector` | — |
| MaterialSelector | standard button | `material-selector-standard` | `Standard` |
| MaterialSelector | metallic button | `material-selector-metallic` | `Metallic` |
| MaterialSelector | wireframe button | `material-selector-wireframe` | `Wireframe` |
| ColorSwatches | container | `color-swatches` | — |
| ColorSwatches | Cyber Blue swatch | `color-swatch-cyber-blue` | `Cyber Blue` |
| ColorSwatches | Emerald swatch | `color-swatch-emerald` | `Emerald` |
| ColorSwatches | Sunset Orange swatch | `color-swatch-sunset-orange` | `Sunset Orange` |
| ColorSwatches | Crimson swatch | `color-swatch-crimson` | `Crimson` |
| EnvironmentSelector | container | `environment-selector` | — |
| EnvironmentSelector | studio button | `environment-selector-studio` | `Studio` |
| EnvironmentSelector | sunset button | `environment-selector-sunset` | `Sunset` |
| EnvironmentSelector | warehouse button | `environment-selector-warehouse` | `Warehouse` |
| EnvironmentSelector | night button | `environment-selector-night` | `Night` |
| RotationControls | container | `rotation-controls` | — |
| RotationControls | toggle button (`autoRotate` = `false`) | `auto-rotate-toggle` | `Auto-Rotate` |
| RotationControls | toggle button (`autoRotate` = `true`) | `auto-rotate-toggle` (unchanged) | `Pause` |
| RotationControls | speed slider | `rotation-speed-slider` | `Rotation Speed` |
| SurpriseButton | button | `surprise-me-button` | `Surprise Me` |
| CopyLinkButton | button | `copy-link-button` | `Copy Link` |
| CopyLinkButton | confirmation (transient, `aria-live="polite"`) | `copy-link-feedback` | `Copied!` |
| ResetButton | button | `reset-studio-button` | `Reset Studio` |

Notes:
- The toggle button keeps one stable `data-testid` across both states; tests assert on the alternating visible text / `aria-label`, never on the testid changing.
- Swatch `data-testid`s/labels derive from `COLOR_SWATCHES[].id`/`.label` in `src/constants/studio.ts` (`docs/ARCHITECTURE.md` §3.2) — do not hardcode a second copy of these strings in components.
- `EnvironmentSelector`'s `data-testid`s/labels derive from `ENVIRONMENT_OPTIONS` in `src/constants/studio.ts` the same way — do not hardcode a second copy.
- `copy-link-feedback`'s auto-dismiss is a UI nicety, not a contract: tests assert it appears after a click, not its exact dismissal timing.

## 4. Testing & Quality Assurance Requirements
- Automated unit and component tests (`Vitest` + `@testing-library/react`) verifying:
  - Default studio state initialization in `useStudioState`.
  - Switching shapes, materials, colors, and environment presets updates the active UI state properly.
  - Toggling auto-rotation, adjusting speed, and clicking `Reset Studio` restores default parameters.
  - The `Surprise Me` randomizer always lands on values from the existing valid option sets.
  - Shareable-link URL parameters encode/decode round-trip correctly, invalid parameters are ignored, and the address bar is cleaned after state is applied on load.
  - Clean execution in headless JSDOM via WebGL/Canvas mocks.
