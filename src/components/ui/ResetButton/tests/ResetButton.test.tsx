import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ResetButton } from '@/components/ui/ResetButton';

describe('ResetButton', () => {
  it('renders the button with the correct data-testid and aria-label', () => {
    // Arrange
    render(<ResetButton reset={vi.fn()} />);

    // Act
    const button = screen.getByTestId('reset-studio-button');

    // Assert
    expect(button).toHaveAccessibleName('Reset Studio');
    expect(button).toHaveTextContent('Reset Studio');
  });

  it('calls reset when clicked', () => {
    // Arrange
    const reset = vi.fn();
    render(<ResetButton reset={reset} />);

    // Act
    fireEvent.click(screen.getByTestId('reset-studio-button'));

    // Assert
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
