import { useStudioState } from '@/hooks/useStudioState';
import { Scene } from '@/components/canvas/Scene';
import { ControlPanel } from '@/components/ui/ControlPanel';
import styles from './App.module.css';

export const App = () => {
  const { state, ...actions } = useStudioState();

  return (
    <div className={styles.appContainer}>
      <div className={styles.sceneLayer}>
        <Scene state={state} />
      </div>
      <div className={styles.panelLayer}>
        <ControlPanel state={state} {...actions} />
      </div>
    </div>
  );
};
