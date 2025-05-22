'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import { Color, MathUtils } from 'three';

interface FloatingCodeProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  text?: string;
  floatIntensity?: number;
}

const codeSnippets = [
  '</>',
  '{}',
  '()',
  '[]',
  '=>',
  '&&',
  '||',
  '++',
  '==',
  '!=',
  '>=',
  '<=',
  '**',
  '??',
  '::',
];

const FloatingCode: React.FC<FloatingCodeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  color = '#E41E26',
  text,
  floatIntensity = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const displayText = text || codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  
  // Random rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        Math.sin(state.clock.getElapsedTime() / 2) * 0.1,
        0.1
      );
      meshRef.current.rotation.y = MathUtils.lerp(
        meshRef.current.rotation.y,
        Math.sin(state.clock.getElapsedTime() / 4) * 0.1,
        0.1
      );
    }
  });
  
  return (
    <Float
      position={position}
      scale={scale}
      rotationIntensity={0.5 * floatIntensity}
      floatIntensity={2 * floatIntensity}
      speed={2}
    >
      <Text3D
        ref={meshRef}
        font="/fonts/JetBrains_Mono_Regular.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        {displayText}
        <meshStandardMaterial
          color={new Color(color)}
          emissive={new Color(color)}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </Float>
  );
};

export default FloatingCode;
