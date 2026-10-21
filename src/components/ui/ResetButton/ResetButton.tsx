import styles from './ResetButton.module.css';

interface ResetButtonProps {
  reset: () => void;
}

export const ResetButton = ({ reset }: ResetButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      data-testid="reset-studio-button"
      aria-label="Reset Studio"
      onClick={reset}
    >
      Reset Studio
    </button>
  );
};
