import { useState } from 'react';
import {
  COLOR_SWATCHES,
  DEFAULT_STUDIO_STATE,
  ENVIRONMENT_OPTIONS,
  MATERIAL_OPTIONS,
  SHAPE_OPTIONS,
} from '@/constants/studio';
import type {
  EnvironmentPreset,
  MaterialType,
  ShapeType,
  StudioState,
  UseStudioStateReturn,
} from '@/types/studio';

export const useStudioState = (): UseStudioStateReturn => {
  const [state, setState] = useState<StudioState>(DEFAULT_STUDIO_STATE);

  const setShape = (shape: ShapeType): void => {
    setState((previous) => ({ ...previous, shape }));
  };

  const setMaterial = (material: MaterialType): void => {
    setState((previous) => ({ ...previous, material }));
  };

  const setColor = (color: string): void => {
    setState((previous) => ({ ...previous, color }));
  };

  const setEnvironment = (environment: EnvironmentPreset): void => {
    setState((previous) => ({ ...previous, environment }));
  };

  const setAutoRotate = (autoRotate: boolean): void => {
    setState((previous) => ({ ...previous, autoRotate }));
  };

  const setSpeed = (speed: number): void => {
    setState((previous) => ({ ...previous, speed }));
  };

  const randomize = (): void => {
    const shape = SHAPE_OPTIONS[Math.floor(Math.random() * SHAPE_OPTIONS.length)];
    const material = MATERIAL_OPTIONS[Math.floor(Math.random() * MATERIAL_OPTIONS.length)];
    const color = COLOR_SWATCHES[Math.floor(Math.random() * COLOR_SWATCHES.length)].hex;
    const environment =
      ENVIRONMENT_OPTIONS[Math.floor(Math.random() * ENVIRONMENT_OPTIONS.length)];
    setState((previous) => ({ ...previous, shape, material, color, environment }));
  };

  const reset = (): void => {
    setState({ ...DEFAULT_STUDIO_STATE });
  };

  return {
    state,
    setShape,
    setMaterial,
    setColor,
    setEnvironment,
    setAutoRotate,
    setSpeed,
    randomize,
    reset,
  };
};
