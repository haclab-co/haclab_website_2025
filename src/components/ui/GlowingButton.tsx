'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowIntensity?: 'low' | 'medium' | 'high';
  disabled?: boolean;
  target?: string;
  rel?: string;
  adaptToBackground?: boolean; // New prop to adapt button styling to different backgrounds
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  glowIntensity = 'medium',
  disabled = false,
  target,
  rel,
  adaptToBackground = false,
}) => {
  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-medium rounded-md transition-all duration-300';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  // Variant classes - with adaptToBackground handling
  const variantClasses = adaptToBackground
    ? {
        // Adapted variants for different backgrounds
        primary: 'bg-haclab-red text-white hover:bg-haclab-dark-red shadow-lg',
        secondary: 'bg-white text-dark-bg hover:bg-white/90 shadow-lg border border-white/20',
        outline: 'bg-transparent border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm shadow-lg',
      }
    : {
        // Default variants
        primary: 'bg-haclab-red text-white hover:bg-haclab-dark-red',
        secondary: 'bg-dark-surface text-white hover:bg-dark-bg',
        outline: 'bg-transparent border-2 border-haclab-red text-haclab-red hover:bg-haclab-red/10',
      };

  // Glow classes
  const glowClasses = {
    low: 'before:opacity-30 before:blur-md',
    medium: 'before:opacity-50 before:blur-lg',
    high: 'before:opacity-70 before:blur-xl',
  };

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  // Determine glow color based on variant and adaptToBackground
  const glowColor = adaptToBackground
    ? variant === 'secondary'
      ? 'before:bg-white/80'
      : variant === 'outline'
        ? 'before:bg-white/50'
        : 'before:bg-haclab-red'
    : 'before:bg-haclab-red';

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${glowClasses[glowIntensity]}
    ${disabledClasses}
    ${className}
    before:content-[''] before:absolute before:inset-0 before:rounded-md ${glowColor} before:-z-10
    hover:before:scale-110 hover:-translate-y-1
    ${adaptToBackground ? 'backdrop-blur-sm shadow-xl' : ''}
    ${variant === 'secondary' && adaptToBackground ? 'text-gray-900 font-bold' : ''}
  `;

  // Button content
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={href}
          className={buttonClasses}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  // Render as button
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
};

export default GlowingButton;
