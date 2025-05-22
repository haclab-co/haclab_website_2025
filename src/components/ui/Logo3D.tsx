'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { motion as motion2d } from 'framer-motion';
import * as THREE from 'three';

interface Logo3DProps {
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Logo mesh component
const LogoMesh = ({ interactive = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Load texture
  const texture = useTexture('/assets/images/logo/logo-dark.webp');
  
  // Animation
  useFrame((state) => {
    if (!interactive && meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <motion.mesh
      ref={meshRef}
      scale={clicked ? 1.1 : hovered ? 1.05 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => interactive && setHovered(true)}
      onPointerOut={() => interactive && setHovered(false)}
      whileHover={interactive ? { rotateY: 0.2, z: 0.5 } : {}}
      animate={clicked ? { rotateZ: Math.PI * 2 } : {}}
      transition={clicked ? { duration: 1.5, ease: "easeInOut" } : {}}
    >
      <planeGeometry args={[3, 1]} />
      <meshStandardMaterial 
        map={texture} 
        transparent={true}
        emissive="#E41E26"
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </motion.mesh>
  );
};

// Particles around the logo
const Particles = ({ count = 50 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const [positions] = useState(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.01 + 0.002,
        offset: Math.random() * Math.PI * 2
      });
    }
    return positions;
  });

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    
    positions.forEach((particle, i) => {
      const { position, scale, speed, offset } = particle;
      
      // Update matrix for each instance
      const matrix = new THREE.Matrix4();
      
      // Calculate new position with circular motion
      const x = position[0] + Math.sin(time * speed + offset) * 0.5;
      const y = position[1] + Math.cos(time * speed + offset) * 0.5;
      const z = position[2];
      
      matrix.setPosition(x, y, z);
      matrix.scale(new THREE.Vector3(scale, scale, scale));
      
      mesh.current.setMatrixAt(i, matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#E41E26" emissive="#E41E26" emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

// Code lines floating around
const CodeLines = () => {
  const lines = [
    "import { Haclab } from '@haclab/core';",
    "const app = new Haclab();",
    "app.createSoftware();",
    "app.deploy();",
    "// Custom software development",
    "function innovate() { return true; }"
  ];
  
  return (
    <group>
      {lines.map((line, i) => (
        <Float
          key={i}
          speed={2} 
          rotationIntensity={0.2} 
          floatIntensity={0.5}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
        >
          <Text
            color="#E41E26"
            fontSize={0.2}
            maxWidth={5}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="left"
            font="/assets/fonts/JetBrainsMono-Regular.woff"
            anchorX="center"
            anchorY="middle"
          >
            {line}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// Main component
const Logo3D: React.FC<Logo3DProps> = ({ 
  interactive = true, 
  size = 'md',
  className = '' 
}) => {
  const [mounted, setMounted] = useState(false);
  
  // Size mapping
  const sizeClasses = {
    sm: 'h-[200px]',
    md: 'h-[300px]',
    lg: 'h-[400px]',
  };
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center ${className}`}>
        <div className="animate-pulse text-haclab-red">Loading 3D Logo...</div>
      </div>
    );
  }
  
  return (
    <motion2d.div
      className={`${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#E41E26" intensity={0.5} />
        
        <LogoMesh interactive={interactive} />
        <Particles count={30} />
        {interactive && <CodeLines />}
        
        {interactive && <OrbitControls enableZoom={false} />}
        
        <fog attach="fog" args={['#000', 5, 15]} />
      </Canvas>
    </motion2d.div>
  );
};

export default Logo3D;
