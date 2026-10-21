import type { ShapeType } from '@/types/studio';
import { SHAPE_OPTIONS } from '@/constants/studio';
import styles from './ShapeSelector.module.css';

interface ShapeSelectorProps {
  shape: ShapeType;
  onShapeChange: (shape: ShapeType) => void;
}

interface ShapeOptionConfig {
  value: ShapeType;
  testId: string;
  label: string;
}

const SHAPE_CONFIG: Record<ShapeType, Omit<ShapeOptionConfig, 'value'>> = {
  box: { testId: 'shape-selector-box', label: 'Box' },
  torusKnot: { testId: 'shape-selector-torus-knot', label: 'Torus Knot' },
  icosahedron: { testId: 'shape-selector-icosahedron', label: 'Icosahedron' },
};

export const ShapeSelector = ({ shape, onShapeChange }: ShapeSelectorProps) => {
  return (
    <div className={styles.container} data-testid="shape-selector">
      {SHAPE_OPTIONS.map((option) => {
        const config = SHAPE_CONFIG[option];
        const isActive = option === shape;

        return (
          <button
            key={option}
            type="button"
            className={isActive ? `${styles.button} ${styles.active}` : styles.button}
            data-testid={config.testId}
            aria-label={config.label}
            aria-pressed={isActive}
            onClick={() => onShapeChange(option)}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
};
