'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
  delay?: number;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  href,
  onClick,
  glowColor = 'rgba(228, 30, 38, 0.5)',
  glowIntensity = 'medium',
  hoverEffect = true,
  delay = 0,
}) => {
  // Glow intensity classes
  const glowClasses = {
    low: 'before:opacity-30 before:blur-md',
    medium: 'before:opacity-50 before:blur-lg',
    high: 'before:opacity-70 before:blur-xl',
  };
  
  // Base classes
  const baseClasses = `
    relative rounded-lg bg-dark-surface p-6 overflow-hidden
    before:content-[''] before:absolute before:inset-0 before:rounded-lg before:-z-10
    ${glowClasses[glowIntensity]}
  `;
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay * 0.2,
      }
    }
  };
  
  // Hover animation
  const hoverAnimation = hoverEffect ? {
    whileHover: { 
      scale: 1.03,
      transition: { duration: 0.3 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  } : {};
  
  // Card content
  const cardContent = (
    <motion.div
      className={`${baseClasses} ${className}`}
      style={{ 
        '--card-glow-color': glowColor 
      } as React.CSSProperties}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...hoverAnimation}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div 
        className="absolute inset-0 -z-10 opacity-50"
        style={{ 
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }
  
  // Render with onClick if provided
  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {cardContent}
      </div>
    );
  }
  
  // Default render
  return cardContent;
};

export default GlowingCard;
