'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LoadingUI from './LoadingUI';
import { FiArrowRight } from 'react-icons/fi';

interface LoadingButtonProps {
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
  isLoading?: boolean;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon = <FiArrowRight />,
  iconPosition = 'right',
  glowIntensity = 'medium',
  disabled = false,
  isLoading = false,
  loadingText,
}) => {
  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-medium rounded-md transition-all duration-300';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
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
  
  // Disabled or loading classes
  const disabledClasses = (disabled || isLoading) ? 'opacity-80 cursor-not-allowed pointer-events-none' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${glowClasses[glowIntensity]} 
    ${disabledClasses} 
    ${className}
    before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-haclab-red before:-z-10
    hover:before:scale-110 hover:-translate-y-1
  `;
  
  // Loading size mapping
  const loadingSizeMap = {
    sm: 'xs',
    md: 'xs',
    lg: 'sm',
  } as const;
  
  // Button content
  const content = isLoading ? (
    <>
      <span className="mr-2">
        <LoadingUI 
          variant="minimal" 
          size={loadingSizeMap[size]} 
          showText={false} 
        />
      </span>
      {loadingText || children}
    </>
  ) : (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  // Render as link if href is provided
  if (href && !isLoading) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href={href} className={buttonClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }
  
  // Render as button
  return (
    <motion.button
      className={buttonClasses}
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      whileHover={isLoading ? {} : { scale: 1.05 }}
      whileTap={isLoading ? {} : { scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
};

export default LoadingButton;
