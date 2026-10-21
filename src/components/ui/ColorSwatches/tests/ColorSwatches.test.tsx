import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ColorSwatches } from '@/components/ui/ColorSwatches';

describe('ColorSwatches', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(<ColorSwatches color="#3b82f6" setColor={vi.fn()} />);

    // Act
    const container = screen.getByTestId('color-swatches');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('renders all four color swatch buttons with exact testid and aria-label', () => {
    // Arrange
    render(<ColorSwatches color="#3b82f6" setColor={vi.fn()} />);

    // Act
    const cyberBlue = screen.getByTestId('color-swatch-cyber-blue');
    const emerald = screen.getByTestId('color-swatch-emerald');
    const sunsetOrange = screen.getByTestId('color-swatch-sunset-orange');
    const crimson = screen.getByTestId('color-swatch-crimson');

    // Assert
    expect(cyberBlue).toHaveAccessibleName('Cyber Blue');
    expect(emerald).toHaveAccessibleName('Emerald');
    expect(sunsetOrange).toHaveAccessibleName('Sunset Orange');
    expect(crimson).toHaveAccessibleName('Crimson');
  });

  it('calls setColor with the correct hex value when a non-active swatch is clicked', () => {
    // Arrange
    const setColor = vi.fn();
    render(<ColorSwatches color="#3b82f6" setColor={setColor} />);

    // Act
    fireEvent.click(screen.getByTestId('color-swatch-emerald'));

    // Assert
    expect(setColor).toHaveBeenCalledWith('#10b981');
  });

  it('reflects the active color via aria-pressed, while others are not pressed', () => {
    // Arrange
    render(<ColorSwatches color="#ef4444" setColor={vi.fn()} />);

    // Act
    const crimson = screen.getByTestId('color-swatch-crimson');
    const emerald = screen.getByTestId('color-swatch-emerald');

    // Assert
    expect(crimson).toHaveAttribute('aria-pressed', 'true');
    expect(emerald).toHaveAttribute('aria-pressed', 'false');
  });
});
