'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import CodeSphere from './CodeSphere';

// Simplified version without Text3D that requires font files
const CodeScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E41E26" />

          {/* Main sphere */}
          <CodeSphere position={[0, 0, 0]} scale={1.5} color="#E41E26" />

          {/* Multiple smaller spheres */}
          <CodeSphere position={[-3, 2, -2]} scale={0.5} color="#E41E26" distort={0.3} speed={1.2} />
          <CodeSphere position={[3, -1, -1]} scale={0.4} color="#E41E26" distort={0.5} speed={0.8} />
          <CodeSphere position={[-2, -2, -3]} scale={0.6} color="#E41E26" distort={0.2} speed={1.5} />
          <CodeSphere position={[2.5, 1.5, -2]} scale={0.3} color="#E41E26" distort={0.4} speed={1.0} />
          <CodeSphere position={[-1.5, 1, -1]} scale={0.35} color="#E41E26" distort={0.6} speed={0.7} />

          {/* Background elements */}
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CodeScene;
