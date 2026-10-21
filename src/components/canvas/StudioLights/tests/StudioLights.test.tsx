import { describe, expect, it } from 'vitest';
import { StudioLights } from '@/components/canvas/StudioLights';

describe('StudioLights', () => {
  it('exports a valid component function', () => {
    expect(typeof StudioLights).toBe('function');
    expect(StudioLights.name).toBe('StudioLights');
  });
});
