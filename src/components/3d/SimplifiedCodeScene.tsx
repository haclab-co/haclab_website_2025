'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A simplified fallback version of the CodeScene component
 * This is used when the Three.js components can't be loaded
 * It provides a visually similar experience without 3D rendering
 */
const SimplifiedCodeScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Main sphere */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-haclab-red/20 flex items-center justify-center"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-48 h-48 rounded-full bg-haclab-red/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Smaller spheres */}
      {[...Array(5)].map((_, i) => {
        const size = 10 + Math.random() * 20;
        const distance = 100 + Math.random() * 150;
        const angle = (Math.PI * 2 * i) / 5;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const duration = 3 + Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-haclab-red/40"
            style={{
              width: size,
              height: size,
              x,
              y,
            }}
            animate={{
              x: [x, x + 20, x],
              y: [y, y - 20, y],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* Particles */}
      {[...Array(30)].map((_, i) => {
        const size = 1 + Math.random() * 3;
        const distance = 50 + Math.random() * 200;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const duration = 10 + Math.random() * 20;

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/30"
            style={{
              width: size,
              height: size,
              x,
              y,
            }}
            animate={{
              x: [x, x + 50 * Math.random() - 25, x],
              y: [y, y + 50 * Math.random() - 25, y],
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
    </div>
  );
};

export default SimplifiedCodeScene;
