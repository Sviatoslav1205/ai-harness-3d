import {
  COLOR_SWATCHES,
  ENVIRONMENT_OPTIONS,
  MATERIAL_OPTIONS,
  SHAPE_OPTIONS,
  SPEED_BOUNDS,
} from '@/constants/studio';
import type { StudioState } from '@/types/studio';

export const encodeStudioState = (state: StudioState): URLSearchParams => {
  const params = new URLSearchParams();
  params.set('shape', state.shape);
  params.set('material', state.material);
  params.set('color', state.color);
  params.set('environment', state.environment);
  params.set('speed', String(state.speed));
  return params;
};

export const decodeStudioState = (params: URLSearchParams): Partial<StudioState> => {
  const decoded: Partial<StudioState> = {};

  const shape = params.get('shape');
  if (shape !== null && (SHAPE_OPTIONS as readonly string[]).includes(shape)) {
    decoded.shape = shape as StudioState['shape'];
  }

  const material = params.get('material');
  if (material !== null && (MATERIAL_OPTIONS as readonly string[]).includes(material)) {
    decoded.material = material as StudioState['material'];
  }

  const color = params.get('color');
  if (color !== null && COLOR_SWATCHES.some((swatch) => swatch.hex === color)) {
    decoded.color = color;
  }

  const environment = params.get('environment');
  if (environment !== null && (ENVIRONMENT_OPTIONS as readonly string[]).includes(environment)) {
    decoded.environment = environment as StudioState['environment'];
  }

  const speedParam = params.get('speed');
  if (speedParam !== null) {
    const speed = Number(speedParam);
    if (Number.isFinite(speed) && speed >= SPEED_BOUNDS.min && speed <= SPEED_BOUNDS.max) {
      decoded.speed = speed;
    }
  }

  return decoded;
};
