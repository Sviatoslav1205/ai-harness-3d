import type {
  StudioState,
  ShapeType,
  MaterialType,
  EnvironmentPreset,
  LightformerConfig,
} from '@/types/studio';

export const DEFAULT_ENVIRONMENT_PRESET: EnvironmentPreset = 'studio';

export const DEFAULT_STUDIO_STATE: StudioState = {
  shape: 'box',
  material: 'standard',
  color: '#3b82f6',
  environment: DEFAULT_ENVIRONMENT_PRESET,
  autoRotate: false,
  speed: 2,
};

export const SHAPE_OPTIONS: readonly ShapeType[] = ['box', 'torusKnot', 'icosahedron'];
export const MATERIAL_OPTIONS: readonly MaterialType[] = ['standard', 'metallic', 'wireframe'];
export const ENVIRONMENT_OPTIONS: readonly EnvironmentPreset[] = [
  'studio',
  'sunset',
  'warehouse',
  'night',
];

export const COLOR_SWATCHES = [
  { id: 'cyber-blue', hex: '#3b82f6', label: 'Cyber Blue' },
  { id: 'emerald', hex: '#10b981', label: 'Emerald' },
  { id: 'sunset-orange', hex: '#f59e0b', label: 'Sunset Orange' },
  { id: 'crimson', hex: '#ef4444', label: 'Crimson' },
] as const;

export const SPEED_BOUNDS = { min: 0, max: 5, step: 1 } as const;

export const ENVIRONMENT_PRESETS: Record<EnvironmentPreset, readonly LightformerConfig[]> = {
  studio: [
    { position: [0, 4, 0], color: '#ffffff', intensity: 2, scale: 6, form: 'rect' },
    { position: [-4, 1, 2], color: '#e2e8f0', intensity: 1, scale: 3, form: 'rect' },
  ],
  sunset: [
    { position: [0, 3, -4], color: '#f97316', intensity: 3, scale: 8, form: 'rect' },
    { position: [4, 1, 2], color: '#fde68a', intensity: 1.2, scale: 4, form: 'rect' },
  ],
  warehouse: [
    { position: [0, 5, 0], color: '#cbd5e1', intensity: 1.5, scale: [8, 2], form: 'rect' },
    { position: [-3, 2, -3], color: '#94a3b8', intensity: 0.8, scale: 4, form: 'rect' },
    { position: [3, 2, 3], color: '#94a3b8', intensity: 0.8, scale: 4, form: 'rect' },
  ],
  night: [
    { position: [0, 4, -2], color: '#1e3a8a', intensity: 1, scale: 6, form: 'circle' },
    { position: [-3, 1, 3], color: '#818cf8', intensity: 0.6, scale: 3, form: 'ring' },
  ],
};
