'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  bgImage,
  bgColor = '#121212',
  overlayColor = 'rgba(0, 0, 0, 0.7)',
  overlayOpacity = 0.7,
  speed = 0.5,
  direction = 'up',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  // Calculate transform values based on direction
  const getTransformValue = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-10 * speed}%`]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${10 * speed}%`]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-10 * speed}%`]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${10 * speed}%`]);
      default:
        return useTransform(scrollYProgress, [0, 1], ['0%', `${-10 * speed}%`]);
    }
  };
  
  const transformValue = getTransformValue();
  
  // Determine which CSS property to animate
  const getTransformProperty = () => {
    if (direction === 'up' || direction === 'down') {
      return { y: transformValue };
    } else {
      return { x: transformValue };
    }
  };
  
  const transformProperty = getTransformProperty();
  
  return (
    <section 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Background image with parallax effect */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...transformProperty,
          }}
        />
      )}
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
