import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DEFAULT_STUDIO_STATE } from '@/constants/studio';
import { App } from '@/App';

describe('App', () => {
  it('mounts the Scene canvas and the control panel', () => {
    // Arrange
    render(<App />);

    // Act
    const canvas = screen.getByTestId('r3f-canvas-mock');
    const panel = screen.getByTestId('control-panel');

    // Assert
    expect(canvas).toBeInTheDocument();
    expect(panel).toBeInTheDocument();
  });

  it('synchronizes control interactions down through shared studio state', () => {
    // Arrange
    render(<App />);

    // Act
    fireEvent.click(screen.getByTestId('shape-selector-torus-knot'));
    fireEvent.click(screen.getByTestId('material-selector-metallic'));
    fireEvent.click(screen.getByTestId('color-swatch-emerald'));
    fireEvent.click(screen.getByTestId('auto-rotate-toggle'));
    fireEvent.change(screen.getByTestId('rotation-speed-slider'), {
      target: { value: '5' },
    });

    // Assert
    expect(screen.getByTestId('shape-selector-torus-knot')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('material-selector-metallic')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('color-swatch-emerald')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('auto-rotate-toggle')).toHaveTextContent('Pause');
    expect(screen.getByTestId('rotation-speed-slider')).toHaveValue('5');
  });

  it('restores all controls to their defaults when Reset Studio is clicked', () => {
    // Arrange
    render(<App />);
    fireEvent.click(screen.getByTestId('shape-selector-icosahedron'));
    fireEvent.click(screen.getByTestId('material-selector-wireframe'));
    fireEvent.click(screen.getByTestId('color-swatch-crimson'));
    fireEvent.click(screen.getByTestId('auto-rotate-toggle'));
    fireEvent.change(screen.getByTestId('rotation-speed-slider'), {
      target: { value: '4' },
    });

    // Act
    fireEvent.click(screen.getByTestId('reset-studio-button'));

    // Assert
    expect(screen.getByTestId('shape-selector-box')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('material-selector-standard')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('color-swatch-cyber-blue')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('auto-rotate-toggle')).toHaveTextContent('Auto-Rotate');
    expect(screen.getByTestId('rotation-speed-slider')).toHaveValue(
      String(DEFAULT_STUDIO_STATE.speed),
    );
  });
});
