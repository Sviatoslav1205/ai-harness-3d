import type { EnvironmentPreset } from '@/types/studio';
import { ENVIRONMENT_OPTIONS } from '@/constants/studio';
import styles from './EnvironmentSelector.module.css';

interface EnvironmentSelectorProps {
  environment: EnvironmentPreset;
  onEnvironmentChange: (environment: EnvironmentPreset) => void;
}

interface EnvironmentOptionConfig {
  value: EnvironmentPreset;
  testId: string;
  label: string;
}

const ENVIRONMENT_CONFIG: Record<EnvironmentPreset, Omit<EnvironmentOptionConfig, 'value'>> = {
  studio: { testId: 'environment-selector-studio', label: 'Studio' },
  sunset: { testId: 'environment-selector-sunset', label: 'Sunset' },
  warehouse: { testId: 'environment-selector-warehouse', label: 'Warehouse' },
  night: { testId: 'environment-selector-night', label: 'Night' },
};

export const EnvironmentSelector = ({
  environment,
  onEnvironmentChange,
}: EnvironmentSelectorProps) => {
  return (
    <div className={styles.container} data-testid="environment-selector">
      {ENVIRONMENT_OPTIONS.map((option) => {
        const config = ENVIRONMENT_CONFIG[option];
        const isActive = option === environment;

        return (
          <button
            key={option}
            type="button"
            className={isActive ? `${styles.button} ${styles.active}` : styles.button}
            data-testid={config.testId}
            aria-label={config.label}
            aria-pressed={isActive}
            onClick={() => onEnvironmentChange(option)}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
};
