import { SPEED_BOUNDS } from '@/constants/studio';
import styles from './RotationControls.module.css';

interface RotationControlsProps {
  autoRotate: boolean;
  setAutoRotate: (autoRotate: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

export const RotationControls = ({
  autoRotate,
  setAutoRotate,
  speed,
  setSpeed,
}: RotationControlsProps) => {
  const toggleLabel = autoRotate ? 'Pause' : 'Auto-Rotate';

  return (
    <div className={styles.container} data-testid="rotation-controls">
      <button
        type="button"
        className={styles.toggleButton}
        data-testid="auto-rotate-toggle"
        aria-label={toggleLabel}
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {toggleLabel}
      </button>
      <input
        type="range"
        className={styles.slider}
        data-testid="rotation-speed-slider"
        aria-label="Rotation Speed"
        min={SPEED_BOUNDS.min}
        max={SPEED_BOUNDS.max}
        step={SPEED_BOUNDS.step}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>
  );
};
