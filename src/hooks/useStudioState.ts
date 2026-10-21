import { useState } from 'react';
import { DEFAULT_STUDIO_STATE } from '@/constants/studio';
import type {
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

  const setAutoRotate = (autoRotate: boolean): void => {
    setState((previous) => ({ ...previous, autoRotate }));
  };

  const setSpeed = (speed: number): void => {
    setState((previous) => ({ ...previous, speed }));
  };

  const reset = (): void => {
    setState({ ...DEFAULT_STUDIO_STATE });
  };

  return {
    state,
    setShape,
    setMaterial,
    setColor,
    setAutoRotate,
    setSpeed,
    reset,
  };
};
