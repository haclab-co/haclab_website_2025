'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Color } from 'three';
import gsap from 'gsap';

interface CodeSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  distort?: number;
  speed?: number;
}

const CodeSphere: React.FC<CodeSphereProps> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#E41E26',
  distort = 0.4,
  speed = 1.5,
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Animation for distortion
  useEffect(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        distort: distort * 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, [distort]);
  
  // Rotation animation
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1 * speed;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 * speed;
    }
  });
  
  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} position={position} scale={scale}>
      <MeshDistortMaterial
        ref={materialRef}
        color={new Color(color)}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.5}
        metalness={0.8}
      />
    </Sphere>
  );
};

export default CodeSphere;
