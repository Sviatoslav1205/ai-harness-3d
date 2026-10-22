import styles from './SurpriseButton.module.css';

interface SurpriseButtonProps {
  randomize: () => void;
}

export const SurpriseButton = ({ randomize }: SurpriseButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      data-testid="surprise-me-button"
      aria-label="Surprise Me"
      onClick={randomize}
    >
      Surprise Me
    </button>
  );
};
