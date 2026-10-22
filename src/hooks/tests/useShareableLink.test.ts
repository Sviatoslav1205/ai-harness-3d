import { describe, expect, it } from 'vitest';
import { DEFAULT_STUDIO_STATE } from '@/constants/studio';
import { decodeStudioState, encodeStudioState } from '@/hooks/useShareableLink';
import type { StudioState } from '@/types/studio';

describe('useShareableLink', () => {
  describe('encodeStudioState', () => {
    it('does not include autoRotate in the resulting URLSearchParams', () => {
      // Arrange
      const state: StudioState = { ...DEFAULT_STUDIO_STATE, autoRotate: true };

      // Act
      const params = encodeStudioState(state);

      // Assert
      expect(params.has('autoRotate')).toBe(false);
    });
  });

  describe('round-trip', () => {
    it('decodes an encoded full StudioState back to its encodable fields', () => {
      // Arrange
      const state: StudioState = {
        shape: 'torusKnot',
        material: 'metallic',
        color: '#10b981',
        environment: 'sunset',
        autoRotate: true,
        speed: 3,
      };

      // Act
      const params = encodeStudioState(state);
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded).toEqual({
        shape: 'torusKnot',
        material: 'metallic',
        color: '#10b981',
        environment: 'sunset',
        speed: 3,
      });
    });
  });

  describe('decodeStudioState', () => {
    it('returns an empty object for an empty URLSearchParams', () => {
      // Arrange
      const params = new URLSearchParams();

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded).toEqual({});
    });

    it('silently drops an invalid shape', () => {
      // Arrange
      const params = new URLSearchParams({ shape: 'sphere' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.shape).toBeUndefined();
    });

    it('silently drops an invalid material', () => {
      // Arrange
      const params = new URLSearchParams({ material: 'glass' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.material).toBeUndefined();
    });

    it('silently drops a color not present in COLOR_SWATCHES', () => {
      // Arrange
      const params = new URLSearchParams({ color: '#000000' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.color).toBeUndefined();
    });

    it('silently drops an invalid environment', () => {
      // Arrange
      const params = new URLSearchParams({ environment: 'jungle' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.environment).toBeUndefined();
    });

    it('silently drops a non-numeric speed', () => {
      // Arrange
      const params = new URLSearchParams({ speed: 'fast' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.speed).toBeUndefined();
    });

    it('silently drops an out-of-range speed', () => {
      // Arrange
      const params = new URLSearchParams({ speed: '999' });

      // Act
      const decoded = decodeStudioState(params);

      // Assert
      expect(decoded.speed).toBeUndefined();
    });
  });
});
