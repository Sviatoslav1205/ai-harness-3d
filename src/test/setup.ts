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
