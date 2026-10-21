import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShapeSelector } from '@/components/ui/ShapeSelector';

describe('ShapeSelector', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(<ShapeSelector shape="box" onShapeChange={vi.fn()} />);

    // Act
    const container = screen.getByTestId('shape-selector');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('renders all three shape option buttons with exact testid and aria-label', () => {
    // Arrange
    render(<ShapeSelector shape="box" onShapeChange={vi.fn()} />);

    // Act
    const boxButton = screen.getByTestId('shape-selector-box');
    const torusKnotButton = screen.getByTestId('shape-selector-torus-knot');
    const icosahedronButton = screen.getByTestId('shape-selector-icosahedron');

    // Assert
    expect(boxButton).toHaveAccessibleName('Box');
    expect(boxButton).toHaveTextContent('Box');
    expect(torusKnotButton).toHaveAccessibleName('Torus Knot');
    expect(torusKnotButton).toHaveTextContent('Torus Knot');
    expect(icosahedronButton).toHaveAccessibleName('Icosahedron');
    expect(icosahedronButton).toHaveTextContent('Icosahedron');
  });

  it('calls onShapeChange with the correct value when a non-active button is clicked', () => {
    // Arrange
    const onShapeChange = vi.fn();
    render(<ShapeSelector shape="box" onShapeChange={onShapeChange} />);

    // Act
    fireEvent.click(screen.getByTestId('shape-selector-torus-knot'));

    // Assert
    expect(onShapeChange).toHaveBeenCalledWith('torusKnot');
  });

  it('reflects the active shape via aria-pressed, while others are not pressed', () => {
    // Arrange
    render(<ShapeSelector shape="icosahedron" onShapeChange={vi.fn()} />);

    // Act
    const boxButton = screen.getByTestId('shape-selector-box');
    const torusKnotButton = screen.getByTestId('shape-selector-torus-knot');
    const icosahedronButton = screen.getByTestId('shape-selector-icosahedron');

    // Assert
    expect(icosahedronButton).toHaveAttribute('aria-pressed', 'true');
    expect(boxButton).toHaveAttribute('aria-pressed', 'false');
    expect(torusKnotButton).toHaveAttribute('aria-pressed', 'false');
  });
});
