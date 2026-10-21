export type ShapeType = 'box' | 'torusKnot' | 'icosahedron';
export type MaterialType = 'standard' | 'metallic' | 'wireframe';

export interface StudioState {
  shape: ShapeType;
  material: MaterialType;
  color: string;
  autoRotate: boolean;
  speed: number;
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
