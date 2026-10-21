import { COLOR_SWATCHES } from '@/constants/studio';
import styles from './ColorSwatches.module.css';

interface ColorSwatchesProps {
  color: string;
  setColor: (color: string) => void;
}

export const ColorSwatches = ({ color, setColor }: ColorSwatchesProps) => {
  return (
    <div className={styles.container} data-testid="color-swatches">
      {COLOR_SWATCHES.map((swatch) => {
        const isActive = swatch.hex === color;

        return (
          <button
            key={swatch.id}
            type="button"
            className={isActive ? `${styles.swatch} ${styles.active}` : styles.swatch}
            style={{ backgroundColor: swatch.hex }}
            data-testid={`color-swatch-${swatch.id}`}
            aria-label={swatch.label}
            aria-pressed={isActive}
            onClick={() => setColor(swatch.hex)}
          >
            <span className={styles.visuallyHidden}>{swatch.label}</span>
          </button>
        );
      })}
    </div>
  );
};
