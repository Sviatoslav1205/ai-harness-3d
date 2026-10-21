import type { StudioActions, StudioState } from '@/types/studio';
import { ShapeSelector } from '@/components/ui/ShapeSelector';
import { MaterialSelector } from '@/components/ui/MaterialSelector';
import { ColorSwatches } from '@/components/ui/ColorSwatches';
import { RotationControls } from '@/components/ui/RotationControls';
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
  setAutoRotate,
  setSpeed,
  reset,
}: ControlPanelProps) => {
  return (
    <div className={styles.container} data-testid="control-panel">
      <ShapeSelector shape={state.shape} onShapeChange={setShape} />
      <MaterialSelector material={state.material} onMaterialChange={setMaterial} />
      <ColorSwatches color={state.color} setColor={setColor} />
      <RotationControls
        autoRotate={state.autoRotate}
        setAutoRotate={setAutoRotate}
        speed={state.speed}
        setSpeed={setSpeed}
      />
      <ResetButton reset={reset} />
    </div>
  );
};
