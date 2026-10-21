import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SPEED_BOUNDS } from '@/constants/studio';
import { RotationControls } from '@/components/ui/RotationControls';

describe('RotationControls', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(
      <RotationControls
        autoRotate={false}
        setAutoRotate={vi.fn()}
        speed={2}
        setSpeed={vi.fn()}
      />,
    );

    // Act
    const container = screen.getByTestId('rotation-controls');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('shows "Auto-Rotate" as the label and accessible name when autoRotate is false', () => {
    // Arrange
    render(
      <RotationControls
        autoRotate={false}
        setAutoRotate={vi.fn()}
        speed={2}
        setSpeed={vi.fn()}
      />,
    );

    // Act
    const toggle = screen.getByTestId('auto-rotate-toggle');

    // Assert
    expect(toggle).toHaveTextContent('Auto-Rotate');
    expect(toggle).toHaveAccessibleName('Auto-Rotate');
  });

  it('shows "Pause" as the label and accessible name when autoRotate is true', () => {
    // Arrange
    render(
      <RotationControls
        autoRotate={true}
        setAutoRotate={vi.fn()}
        speed={2}
        setSpeed={vi.fn()}
      />,
    );

    // Act
    const toggle = screen.getByTestId('auto-rotate-toggle');

    // Assert
    expect(toggle).toHaveTextContent('Pause');
    expect(toggle).toHaveAccessibleName('Pause');
  });

  it('calls setAutoRotate with the inverted value when the toggle is clicked', () => {
    // Arrange
    const setAutoRotate = vi.fn();
    render(
      <RotationControls
        autoRotate={false}
        setAutoRotate={setAutoRotate}
        speed={2}
        setSpeed={vi.fn()}
      />,
    );

    // Act
    fireEvent.click(screen.getByTestId('auto-rotate-toggle'));

    // Assert
    expect(setAutoRotate).toHaveBeenCalledWith(true);
  });

  it('renders the speed slider with bounds and value from SPEED_BOUNDS', () => {
    // Arrange
    render(
      <RotationControls
        autoRotate={false}
        setAutoRotate={vi.fn()}
        speed={3}
        setSpeed={vi.fn()}
      />,
    );

    // Act
    const slider = screen.getByTestId('rotation-speed-slider');

    // Assert
    expect(slider).toHaveAttribute('min', String(SPEED_BOUNDS.min));
    expect(slider).toHaveAttribute('max', String(SPEED_BOUNDS.max));
    expect(slider).toHaveAttribute('step', String(SPEED_BOUNDS.step));
    expect(slider).toHaveValue('3');
  });

  it('calls setSpeed with a number when the slider value changes', () => {
    // Arrange
    const setSpeed = vi.fn();
    render(
      <RotationControls
        autoRotate={false}
        setAutoRotate={vi.fn()}
        speed={2}
        setSpeed={setSpeed}
      />,
    );

    // Act
    fireEvent.change(screen.getByTestId('rotation-speed-slider'), {
      target: { value: '4' },
    });

    // Assert
    expect(setSpeed).toHaveBeenCalledWith(4);
  });
});
