import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { StudioState } from '@/types/studio';
import { CopyLinkButton } from '@/components/ui/CopyLinkButton';

const fixtureState: StudioState = {
  shape: 'box',
  material: 'standard',
  color: '#3b82f6',
  environment: 'studio',
  autoRotate: false,
  speed: 1,
};

describe('CopyLinkButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('copies the encoded shareable URL to the clipboard when clicked', async () => {
    // Arrange
    render(<CopyLinkButton state={fixtureState} />);

    // Act
    fireEvent.click(screen.getByTestId('copy-link-button'));

    // Assert
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('shape=box'),
      );
    });
  });

  it('shows the Copied! confirmation after a successful copy', async () => {
    // Arrange
    render(<CopyLinkButton state={fixtureState} />);

    // Act
    fireEvent.click(screen.getByTestId('copy-link-button'));

    // Assert
    const feedback = await screen.findByTestId('copy-link-feedback');
    expect(feedback).toHaveTextContent('Copied!');
  });
});
