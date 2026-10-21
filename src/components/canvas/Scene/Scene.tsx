import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { StudioState } from '@/types/studio';
import { StudioLights } from '@/components/canvas/StudioLights';
import { StageFloor } from '@/components/canvas/StageFloor';
import { StudioObject } from '@/components/canvas/StudioObject';
import styles from './Scene.module.css';

interface SceneProps {
  state: StudioState;
}

export const Scene = ({ state }: SceneProps) => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas camera={{ position: [4, 3, 5], fov: 50 }}>
        <StudioLights />
        <StageFloor />
        <StudioObject
          shape={state.shape}
          material={state.material}
          color={state.color}
          autoRotate={state.autoRotate}
          speed={state.speed}
        />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};
