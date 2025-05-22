'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SimplifiedLogo3DProps {
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A simplified version of the Logo3D component that doesn't use Three.js
 * This is used as a fallback when the 3D components can't be loaded
 */
const SimplifiedLogo3D: React.FC<SimplifiedLogo3DProps> = ({ 
  interactive = true, 
  size = 'md',
  className = '' 
}) => {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
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
        <div className="animate-pulse text-haclab-red">Loading Logo...</div>
      </div>
    );
  }
  
  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background particles */}
      {[...Array(30)].map((_, i) => {
        const size = 4 + Math.random() * 8;
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const duration = 3 + Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-haclab-red/30"
            style={{
              width: size,
              height: size,
              x,
              y,
            }}
            animate={{
              x: [x, x + 20 * Math.random() - 10, x],
              y: [y, y + 20 * Math.random() - 10, y],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        );
      })}
      
      {/* Logo */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: clicked ? 1.1 : hovered ? 1.05 : 1,
          rotateZ: clicked ? 360 : 0,
        }}
        transition={{
          duration: clicked ? 1.5 : 0.3,
          ease: "easeInOut",
        }}
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={() => interactive && setHovered(false)}
        onClick={() => interactive && setClicked(!clicked)}
      >
        <Image
          src="/assets/images/logo/logo-dark.webp"
          alt="Haclab Logo"
          width={300}
          height={100}
          className={`${hovered ? 'drop-shadow-glow' : ''} transition-all duration-300`}
        />
      </motion.div>
      
      {/* Code snippets */}
      {interactive && (
        <>
          {[
            "import { Haclab } from '@haclab/core';",
            "const app = new Haclab();",
            "app.createSoftware();",
            "app.deploy();",
            "// Custom software development",
            "function innovate() { return true; }"
          ].map((text, i) => {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const duration = 5 + Math.random() * 5;
            
            return (
              <motion.div
                key={i}
                className="absolute text-xs md:text-sm font-code text-haclab-red/70"
                style={{ x, y }}
                animate={{
                  x: [x, x + 30 * Math.random() - 15, x],
                  y: [y, y + 30 * Math.random() - 15, y],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                {text}
              </motion.div>
            );
          })}
        </>
      )}
    </motion.div>
  );
};

export default SimplifiedLogo3D;
