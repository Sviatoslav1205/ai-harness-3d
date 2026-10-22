import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { EnvironmentSelector } from '@/components/ui/EnvironmentSelector';

describe('EnvironmentSelector', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(<EnvironmentSelector environment="studio" onEnvironmentChange={vi.fn()} />);

    // Act
    const container = screen.getByTestId('environment-selector');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('renders all four environment option buttons with exact testid and aria-label', () => {
    // Arrange
    render(<EnvironmentSelector environment="studio" onEnvironmentChange={vi.fn()} />);

    // Act
    const studioButton = screen.getByTestId('environment-selector-studio');
    const sunsetButton = screen.getByTestId('environment-selector-sunset');
    const warehouseButton = screen.getByTestId('environment-selector-warehouse');
    const nightButton = screen.getByTestId('environment-selector-night');

    // Assert
    expect(studioButton).toHaveAccessibleName('Studio');
    expect(studioButton).toHaveTextContent('Studio');
    expect(sunsetButton).toHaveAccessibleName('Sunset');
    expect(sunsetButton).toHaveTextContent('Sunset');
    expect(warehouseButton).toHaveAccessibleName('Warehouse');
    expect(warehouseButton).toHaveTextContent('Warehouse');
    expect(nightButton).toHaveAccessibleName('Night');
    expect(nightButton).toHaveTextContent('Night');
  });

  it('calls onEnvironmentChange with the correct value when a non-active button is clicked', () => {
    // Arrange
    const onEnvironmentChange = vi.fn();
    render(<EnvironmentSelector environment="studio" onEnvironmentChange={onEnvironmentChange} />);

    // Act
    fireEvent.click(screen.getByTestId('environment-selector-sunset'));

    // Assert
    expect(onEnvironmentChange).toHaveBeenCalledWith('sunset');
  });

  it('reflects the active environment via aria-pressed, while others are not pressed', () => {
    // Arrange
    render(<EnvironmentSelector environment="warehouse" onEnvironmentChange={vi.fn()} />);

    // Act
    const studioButton = screen.getByTestId('environment-selector-studio');
    const warehouseButton = screen.getByTestId('environment-selector-warehouse');
    const nightButton = screen.getByTestId('environment-selector-night');

    // Assert
    expect(warehouseButton).toHaveAttribute('aria-pressed', 'true');
    expect(studioButton).toHaveAttribute('aria-pressed', 'false');
    expect(nightButton).toHaveAttribute('aria-pressed', 'false');
  });
});
