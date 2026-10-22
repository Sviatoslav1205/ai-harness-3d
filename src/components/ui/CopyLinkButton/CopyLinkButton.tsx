import { useState } from 'react';
import type { StudioState } from '@/types/studio';
import { copyLink } from '@/hooks/useShareableLink';
import styles from './CopyLinkButton.module.css';

interface CopyLinkButtonProps {
  state: StudioState;
}

const FEEDBACK_DISMISS_DELAY_MS = 2000;

export const CopyLinkButton = ({ state }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await copyLink(state);
    setCopied(true);
    setTimeout(() => setCopied(false), FEEDBACK_DISMISS_DELAY_MS);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        data-testid="copy-link-button"
        aria-label="Copy Link"
        onClick={handleClick}
      >
        Copy Link
      </button>
      {copied && (
        <span className={styles.feedback} data-testid="copy-link-feedback" aria-live="polite">
          Copied!
        </span>
      )}
    </div>
  );
};
