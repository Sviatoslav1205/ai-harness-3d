import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  COLOR_SWATCHES,
  DEFAULT_STUDIO_STATE,
  ENVIRONMENT_OPTIONS,
  MATERIAL_OPTIONS,
  SHAPE_OPTIONS,
} from '@/constants/studio';
import { useStudioState } from '@/hooks/useStudioState';

describe('useStudioState', () => {
  it('initializes with the default studio state', () => {
    // Arrange & Act
    const { result } = renderHook(() => useStudioState());

    // Assert
    expect(result.current.state).toEqual(DEFAULT_STUDIO_STATE);
  });

  it('updates only the shape field when setShape is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setShape('torusKnot');
    });

    // Assert
    expect(result.current.state.shape).toBe('torusKnot');
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      shape: 'torusKnot',
    });
  });

  it('updates only the material field when setMaterial is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setMaterial('metallic');
    });

    // Assert
    expect(result.current.state.material).toBe('metallic');
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      material: 'metallic',
    });
  });

  it('updates only the color field when setColor is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setColor('#10b981');
    });

    // Assert
    expect(result.current.state.color).toBe('#10b981');
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      color: '#10b981',
    });
  });

  it('updates only the environment field when setEnvironment is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setEnvironment('sunset');
    });

    // Assert
    expect(result.current.state.environment).toBe('sunset');
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      environment: 'sunset',
    });
  });

  it('updates only the autoRotate field when setAutoRotate is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setAutoRotate(true);
    });

    // Assert
    expect(result.current.state.autoRotate).toBe(true);
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      autoRotate: true,
    });
  });

  it('updates only the speed field when setSpeed is called', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setSpeed(5);
    });

    // Assert
    expect(result.current.state.speed).toBe(5);
    expect(result.current.state).toEqual({
      ...DEFAULT_STUDIO_STATE,
      speed: 5,
    });
  });

  describe('randomize', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('lands on values from the existing valid option sets', () => {
      // Arrange
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      const { result } = renderHook(() => useStudioState());

      // Act
      act(() => {
        result.current.randomize();
      });

      // Assert
      expect(SHAPE_OPTIONS).toContain(result.current.state.shape);
      expect(MATERIAL_OPTIONS).toContain(result.current.state.material);
      expect(COLOR_SWATCHES.map((swatch) => swatch.hex)).toContain(result.current.state.color);
      expect(ENVIRONMENT_OPTIONS).toContain(result.current.state.environment);
    });
  });

  it('restores all fields to defaults when reset is called after multiple changes', () => {
    // Arrange
    const { result } = renderHook(() => useStudioState());

    // Act
    act(() => {
      result.current.setShape('icosahedron');
      result.current.setMaterial('wireframe');
      result.current.setColor('#ef4444');
      result.current.setEnvironment('night');
      result.current.setAutoRotate(true);
      result.current.setSpeed(4);
    });
    act(() => {
      result.current.reset();
    });

    // Assert
    expect(result.current.state).toEqual(DEFAULT_STUDIO_STATE);
  });
});
