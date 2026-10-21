import type { MaterialType } from '@/types/studio';
import { MATERIAL_OPTIONS } from '@/constants/studio';
import styles from './MaterialSelector.module.css';

interface MaterialSelectorProps {
  material: MaterialType;
  onMaterialChange: (material: MaterialType) => void;
}

interface MaterialOptionConfig {
  value: MaterialType;
  testId: string;
  label: string;
}

const MATERIAL_CONFIG: Record<MaterialType, Omit<MaterialOptionConfig, 'value'>> = {
  standard: { testId: 'material-selector-standard', label: 'Standard' },
  metallic: { testId: 'material-selector-metallic', label: 'Metallic' },
  wireframe: { testId: 'material-selector-wireframe', label: 'Wireframe' },
};

export const MaterialSelector = ({ material, onMaterialChange }: MaterialSelectorProps) => {
  return (
    <div className={styles.container} data-testid="material-selector">
      {MATERIAL_OPTIONS.map((option) => {
        const config = MATERIAL_CONFIG[option];
        const isActive = option === material;

        return (
          <button
            key={option}
            type="button"
            className={isActive ? `${styles.button} ${styles.active}` : styles.button}
            data-testid={config.testId}
            aria-label={config.label}
            aria-pressed={isActive}
            onClick={() => onMaterialChange(option)}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
};
