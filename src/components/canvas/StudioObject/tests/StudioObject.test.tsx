import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { StudioObject } from '@/components/canvas/StudioObject';
import type { ShapeType, MaterialType } from '@/types/studio';

describe('StudioObject', () => {
  it('is a defined component export', () => {
    expect(typeof StudioObject).toBe('function');
  });

  const shapes: ShapeType[] = ['box', 'torusKnot', 'icosahedron'];
  const materials: MaterialType[] = ['standard', 'metallic', 'wireframe'];

  shapes.forEach((shape) => {
    materials.forEach((material) => {
      it(`can be instantiated for shape="${shape}" material="${material}"`, () => {
        const create = () =>
          createElement(StudioObject, {
            shape,
            material,
            color: '#3b82f6',
            autoRotate: false,
            speed: 2,
          });

        expect(create).not.toThrow();
      });
    });
  });
});
