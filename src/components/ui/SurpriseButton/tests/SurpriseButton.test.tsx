import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SurpriseButton } from '@/components/ui/SurpriseButton';

describe('SurpriseButton', () => {
  it('renders the button with the correct data-testid and aria-label', () => {
    // Arrange
    render(<SurpriseButton randomize={vi.fn()} />);

    // Act
    const button = screen.getByTestId('surprise-me-button');

    // Assert
    expect(button).toHaveAccessibleName('Surprise Me');
    expect(button).toHaveTextContent('Surprise Me');
  });

  it('calls randomize when clicked', () => {
    // Arrange
    const randomize = vi.fn();
    render(<SurpriseButton randomize={randomize} />);

    // Act
    fireEvent.click(screen.getByTestId('surprise-me-button'));

    // Assert
    expect(randomize).toHaveBeenCalledTimes(1);
  });
});
