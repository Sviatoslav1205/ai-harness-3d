import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Scene } from '@/components/canvas/Scene';
import { DEFAULT_STUDIO_STATE } from '@/constants/studio';

describe('Scene', () => {
  it('renders the mocked r3f canvas', () => {
    render(<Scene state={DEFAULT_STUDIO_STATE} />);

    expect(screen.getByTestId('r3f-canvas-mock')).toBeInTheDocument();
  });
});
