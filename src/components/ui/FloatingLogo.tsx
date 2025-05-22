'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { FiCode } from 'react-icons/fi';

interface FloatingLogoProps {
  variant?: 'default' | 'code' | 'particles' | '3d';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'light' | 'dark';
  className?: string;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({
  variant = 'default',
  size = 'md',
  color = 'light',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });
  const controls = useAnimation();

  // Size mapping
  const sizeMap = {
    sm: { width: 100, height: 30 },
    md: { width: 150, height: 45 },
    lg: { width: 200, height: 60 },
    xl: { width: 300, height: 90 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Default floating animation
  if (variant === 'default') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
          className="relative"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            <Image
              src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
              alt="Haclab Logo"
              width={sizeMap[size].width}
              height={sizeMap[size].height}
              className="relative z-10"
            />
          </motion.div>
          
          {/* Shadow effect */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-haclab-red/20 rounded-full filter blur-md"
            style={{ width: sizeMap[size].width * 0.8, height: 5 }}
            animate={{ 
              width: [sizeMap[size].width * 0.7, sizeMap[size].width * 0.9, sizeMap[size].width * 0.7],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    );
  }

  // Code-themed floating logo
  if (variant === 'code') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
          className="relative"
        >
          <div className="bg-dark-surface p-4 rounded-lg border border-dark-border shadow-lg">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-400 font-code">haclab.tsx</span>
            </div>
            
            <div className="font-code text-sm mb-3">
              <div className="text-code-keyword">import</div>
              <div className="pl-4 text-code-variable">Logo</div>
              <div className="text-code-keyword">from</div>
              <div className="text-code-string">'@haclab/ui';</div>
            </div>
            
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                x: [0, 3, 0, -3, 0],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="flex justify-center my-3"
            >
              <Image
                src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
                alt="Haclab Logo"
                width={sizeMap[size].width * 0.8}
                height={sizeMap[size].height * 0.8}
              />
            </motion.div>
            
            <div className="font-code text-sm">
              <div className="text-code-comment">// Custom software development</div>
              <div className="text-code-keyword">export default</div>
              <div className="text-code-function">Logo;</div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Particles effect
  if (variant === 'particles') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
          className="relative"
        >
          {/* Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-haclab-red"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                opacity: [0.7, 0.2, 0.7],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Logo */}
          <motion.div
            animate={{ 
              rotate: [0, 1, 0, -1, 0],
              scale: [1, 1.03, 1, 0.97, 1],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <Image
              src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
              alt="Haclab Logo"
              width={sizeMap[size].width}
              height={sizeMap[size].height}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // 3D-like effect
  if (variant === '3d') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, rotateX: 45 },
            visible: { 
              opacity: 1, 
              rotateX: 0,
              transition: { 
                duration: 1.2,
                ease: "easeOut"
              }
            }
          }}
          className="relative perspective-500"
        >
          {/* 3D effect with multiple layers */}
          <div className="relative">
            {/* Shadow layer */}
            <motion.div
              className="absolute top-0 left-0 opacity-20 blur-sm"
              animate={{ 
                x: [4, 6, 4],
                y: [4, 6, 4],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Image
                src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
                alt="Haclab Logo Shadow"
                width={sizeMap[size].width}
                height={sizeMap[size].height}
                className="filter brightness-0"
              />
            </motion.div>
            
            {/* Main logo */}
            <motion.div
              animate={{ 
                rotateY: [0, 2, 0, -2, 0],
                rotateX: [0, -1, 0, 1, 0],
                z: [0, 5, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative z-10"
            >
              <Image
                src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
                alt="Haclab Logo"
                width={sizeMap[size].width}
                height={sizeMap[size].height}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default FloatingLogo;
