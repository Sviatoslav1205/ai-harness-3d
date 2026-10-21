import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MaterialSelector } from '@/components/ui/MaterialSelector';

describe('MaterialSelector', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(<MaterialSelector material="standard" onMaterialChange={vi.fn()} />);

    // Act
    const container = screen.getByTestId('material-selector');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('renders all three material option buttons with exact testid and aria-label', () => {
    // Arrange
    render(<MaterialSelector material="standard" onMaterialChange={vi.fn()} />);

    // Act
    const standardButton = screen.getByTestId('material-selector-standard');
    const metallicButton = screen.getByTestId('material-selector-metallic');
    const wireframeButton = screen.getByTestId('material-selector-wireframe');

    // Assert
    expect(standardButton).toHaveAccessibleName('Standard');
    expect(standardButton).toHaveTextContent('Standard');
    expect(metallicButton).toHaveAccessibleName('Metallic');
    expect(metallicButton).toHaveTextContent('Metallic');
    expect(wireframeButton).toHaveAccessibleName('Wireframe');
    expect(wireframeButton).toHaveTextContent('Wireframe');
  });

  it('calls onMaterialChange with the correct value when a non-active button is clicked', () => {
    // Arrange
    const onMaterialChange = vi.fn();
    render(<MaterialSelector material="standard" onMaterialChange={onMaterialChange} />);

    // Act
    fireEvent.click(screen.getByTestId('material-selector-metallic'));

    // Assert
    expect(onMaterialChange).toHaveBeenCalledWith('metallic');
  });

  it('reflects the active material via aria-pressed, while others are not pressed', () => {
    // Arrange
    render(<MaterialSelector material="wireframe" onMaterialChange={vi.fn()} />);

    // Act
    const standardButton = screen.getByTestId('material-selector-standard');
    const metallicButton = screen.getByTestId('material-selector-metallic');
    const wireframeButton = screen.getByTestId('material-selector-wireframe');

    // Assert
    expect(wireframeButton).toHaveAttribute('aria-pressed', 'true');
    expect(standardButton).toHaveAttribute('aria-pressed', 'false');
    expect(metallicButton).toHaveAttribute('aria-pressed', 'false');
  });
});
