import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DEFAULT_STUDIO_STATE } from '@/constants/studio';
import { useStudioState } from '@/hooks/useStudioState';
import { ControlPanel } from '@/components/ui/ControlPanel';

const ControlPanelHarness = () => {
  const { state, ...actions } = useStudioState();

  return <ControlPanel state={state} {...actions} />;
};

describe('ControlPanel', () => {
  it('renders the container with the correct data-testid', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    const container = screen.getByTestId('control-panel');

    // Assert
    expect(container).toBeInTheDocument();
  });

  it('updates the active shape when a shape button is clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.click(screen.getByTestId('shape-selector-torus-knot'));

    // Assert
    expect(screen.getByTestId('shape-selector-torus-knot')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('updates the active material when a material button is clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.click(screen.getByTestId('material-selector-metallic'));

    // Assert
    expect(screen.getByTestId('material-selector-metallic')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('updates the active color when a color swatch is clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.click(screen.getByTestId('color-swatch-emerald'));

    // Assert
    expect(screen.getByTestId('color-swatch-emerald')).toHaveAttribute('aria-pressed', 'true');
  });

  it('updates the active environment when an environment button is clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.click(screen.getByTestId('environment-selector-sunset'));

    // Assert
    expect(screen.getByTestId('environment-selector-sunset')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('flips the auto-rotate toggle label when clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.click(screen.getByTestId('auto-rotate-toggle'));

    // Assert
    expect(screen.getByTestId('auto-rotate-toggle')).toHaveTextContent('Pause');
  });

  it('updates the speed when the slider changes', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    fireEvent.change(screen.getByTestId('rotation-speed-slider'), {
      target: { value: '5' },
    });

    // Assert
    expect(screen.getByTestId('rotation-speed-slider')).toHaveValue('5');
  });

  it('renders the Copy Link button', () => {
    // Arrange
    render(<ControlPanelHarness />);

    // Act
    const copyLinkButton = screen.getByTestId('copy-link-button');

    // Assert
    expect(copyLinkButton).toBeInTheDocument();
  });

  it('restores all fields to defaults when Reset Studio is clicked', () => {
    // Arrange
    render(<ControlPanelHarness />);
    fireEvent.click(screen.getByTestId('shape-selector-icosahedron'));
    fireEvent.click(screen.getByTestId('material-selector-wireframe'));
    fireEvent.click(screen.getByTestId('color-swatch-crimson'));
    fireEvent.click(screen.getByTestId('environment-selector-sunset'));
    fireEvent.click(screen.getByTestId('auto-rotate-toggle'));
    fireEvent.change(screen.getByTestId('rotation-speed-slider'), {
      target: { value: '4' },
    });

    // Act
    fireEvent.click(screen.getByTestId('reset-studio-button'));

    // Assert
    expect(screen.getByTestId(`shape-selector-box`)).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('material-selector-standard')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('color-swatch-cyber-blue')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('environment-selector-studio')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('auto-rotate-toggle')).toHaveTextContent('Auto-Rotate');
    expect(screen.getByTestId('rotation-speed-slider')).toHaveValue(
      String(DEFAULT_STUDIO_STATE.speed),
    );
  });
});
