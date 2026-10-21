import { describe, expect, it } from 'vitest';
import { StageFloor } from '@/components/canvas/StageFloor';

describe('StageFloor', () => {
  it('exports a valid component function', () => {
    expect(typeof StageFloor).toBe('function');
    expect(StageFloor.name).toBe('StageFloor');
  });
});
