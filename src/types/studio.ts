export type ShapeType = 'box' | 'torusKnot' | 'icosahedron';
export type MaterialType = 'standard' | 'metallic' | 'wireframe';
export type EnvironmentPreset = 'studio' | 'sunset' | 'warehouse' | 'night';

export interface StudioState {
  shape: ShapeType;
  material: MaterialType;
  color: string;
  environment: EnvironmentPreset;
  autoRotate: boolean;
  speed: number;
}

export interface StudioActions {
  setShape: (shape: ShapeType) => void;
  setMaterial: (material: MaterialType) => void;
  setColor: (color: string) => void;
  setEnvironment: (environment: EnvironmentPreset) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export type UseStudioStateReturn = { state: StudioState } & StudioActions;

export interface LightformerConfig {
  position: readonly [number, number, number];
  color: string;
  intensity: number;
  scale: number | readonly [number, number];
  form: 'rect' | 'circle' | 'ring';
}
