import type { StudioActions, StudioState } from '@/types/studio';
import { ShapeSelector } from '@/components/ui/ShapeSelector';
import { MaterialSelector } from '@/components/ui/MaterialSelector';
import { ColorSwatches } from '@/components/ui/ColorSwatches';
import { EnvironmentSelector } from '@/components/ui/EnvironmentSelector';
import { RotationControls } from '@/components/ui/RotationControls';
import { SurpriseButton } from '@/components/ui/SurpriseButton';
import { ResetButton } from '@/components/ui/ResetButton';
import styles from './ControlPanel.module.css';

interface ControlPanelProps extends StudioActions {
  state: StudioState;
}

export const ControlPanel = ({
  state,
  setShape,
  setMaterial,
  setColor,
  setEnvironment,
  setAutoRotate,
  setSpeed,
  randomize,
  reset,
}: ControlPanelProps) => {
  return (
    <div className={styles.container} data-testid="control-panel">
      <ShapeSelector shape={state.shape} onShapeChange={setShape} />
      <MaterialSelector material={state.material} onMaterialChange={setMaterial} />
      <ColorSwatches color={state.color} setColor={setColor} />
      <EnvironmentSelector environment={state.environment} onEnvironmentChange={setEnvironment} />
      <RotationControls
        autoRotate={state.autoRotate}
        setAutoRotate={setAutoRotate}
        speed={state.speed}
        setSpeed={setSpeed}
      />
      <SurpriseButton randomize={randomize} />
      <ResetButton reset={reset} />
    </div>
  );
};
