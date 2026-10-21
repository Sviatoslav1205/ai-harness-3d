import type { StudioState, ShapeType, MaterialType } from '@/types/studio';

export const DEFAULT_STUDIO_STATE: StudioState = {
  shape: 'box',
  material: 'standard',
  color: '#3b82f6',
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
