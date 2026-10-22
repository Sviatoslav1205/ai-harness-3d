import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import type { StudioState } from '@/types/studio';
import { StudioLights } from '@/components/canvas/StudioLights';
import { StageFloor } from '@/components/canvas/StageFloor';
import { StudioObject } from '@/components/canvas/StudioObject';
import { ENVIRONMENT_PRESETS } from '@/constants/studio';
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
        <Environment resolution={256}>
          {ENVIRONMENT_PRESETS[state.environment].map((lf, i) => (
            <Lightformer
              key={i}
              form={lf.form}
              color={lf.color}
              intensity={lf.intensity}
              scale={lf.scale as unknown as number}
              position={lf.position}
            />
          ))}
        </Environment>
      </Canvas>
    </div>
  );
};
