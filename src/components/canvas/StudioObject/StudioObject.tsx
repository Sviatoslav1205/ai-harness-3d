import { useRef } from 'react';
import type { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import type { ShapeType, MaterialType } from '@/types/studio';

interface StudioObjectProps {
  shape: ShapeType;
  material: MaterialType;
  color: string;
  autoRotate: boolean;
  speed: number;
}

export const StudioObject = ({ shape, material, color, autoRotate, speed }: StudioObjectProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += speed * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {shape === 'torusKnot' && <torusKnotGeometry args={[1, 0.3, 128, 16]} />}
      {shape === 'icosahedron' && <icosahedronGeometry args={[1.2, 0]} />}
      {material === 'standard' && (
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      )}
      {material === 'metallic' && (
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      )}
      {material === 'wireframe' && <meshStandardMaterial color={color} wireframe />}
    </mesh>
  );
};
