import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const Mascot = () => {
  const { scene } = useGLTF('/Hitem3d-1773915097722.glb');
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Gentle rotation
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/Hitem3d-1773915097722.glb');