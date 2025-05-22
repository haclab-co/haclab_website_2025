'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiLayers } from 'react-icons/fi';

export type LoadingVariant = 'fullscreen' | 'inline' | 'overlay' | 'button' | 'card' | 'minimal';
export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoadingTheme = 'default' | 'code' | 'terminal' | 'circuit';

interface LoadingUIProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  theme?: LoadingTheme;
  text?: string;
  showText?: boolean;
  className?: string;
  fixed?: boolean;
}

const LoadingUI: React.FC<LoadingUIProps> = ({
  variant = 'inline',
  size = 'md',
  theme = 'default',
  text = 'Loading...',
  showText = true,
  className = '',
  fixed = false,
}) => {
  // Size classes for the container
  const containerSizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  // Size classes for text
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  // Variant classes
  const variantClasses = {
    fullscreen: 'fixed inset-0 flex flex-col items-center justify-center bg-dark-bg/90 backdrop-blur-sm z-50',
    overlay: 'absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/80 backdrop-blur-sm z-10',
    inline: 'inline-flex items-center justify-center',
    button: 'inline-flex items-center justify-center',
    card: 'flex flex-col items-center justify-center p-6',
    minimal: 'inline-flex items-center justify-center',
  };

  // Theme-specific elements
  const renderThemeElement = () => {
    switch (theme) {
      case 'code':
        return <CodeThemeLoader size={size} />;
      case 'terminal':
        return <TerminalThemeLoader size={size} />;
      case 'circuit':
        return <CircuitThemeLoader size={size} />;
      default:
        return <DefaultLoader size={size} />;
    }
  };

  // Position class
  const positionClass = fixed ? 'fixed' : '';

  return (
    <div className={`${variantClasses[variant]} ${positionClass} ${className}`}>
      <div className={containerSizeClasses[size]}>
        {renderThemeElement()}
      </div>
      
      {showText && variant !== 'button' && variant !== 'minimal' && (
        <motion.p 
          className={`mt-4 font-code ${textSizeClasses[size]} text-white`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Default spinner with Haclab red color
const DefaultLoader: React.FC<{ size: LoadingSize }> = ({ size }) => {
  const circleSizes = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className="relative w-full h-full">
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-haclab-red/20`}
      />
      <motion.div
        className={`absolute inset-0 rounded-full border-t-2 border-haclab-red`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Code-themed loader with syntax elements
const CodeThemeLoader: React.FC<{ size: LoadingSize }> = ({ size }) => {
  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const icons = [<FiCode key="code" />, <FiServer key="server" />, <FiDatabase key="database" />, <FiLayers key="layers" />];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-dark-surface border border-dark-border"
        animate={{ boxShadow: ['0 0 0px rgba(228, 30, 38, 0)', '0 0 15px rgba(228, 30, 38, 0.5)', '0 0 0px rgba(228, 30, 38, 0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="relative z-10 flex items-center justify-center">
        {icons.map((icon, index) => (
          <motion.div
            key={index}
            className={`absolute ${iconSizes[size]} text-haclab-red`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.8, 1, 0.8],
              rotate: [0, 10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Terminal-themed loader
const TerminalThemeLoader: React.FC<{ size: LoadingSize }> = ({ size }) => {
  return (
    <div className="relative w-full h-full bg-code-bg rounded-md border border-dark-border overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-dark-surface flex items-center px-1">
        <div className="h-1 w-1 rounded-full bg-haclab-red mr-0.5"></div>
        <div className="h-1 w-1 rounded-full bg-yellow-500 mr-0.5"></div>
        <div className="h-1 w-1 rounded-full bg-green-500"></div>
      </div>
      
      <div className="absolute top-2 bottom-0 left-0 right-0 p-1 font-code text-[0.5rem]">
        <motion.div
          className="text-haclab-red"
          initial={{ opacity: 1 }}
        >
          $
          <motion.span
            className="text-white ml-1"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

// Circuit-themed loader
const CircuitThemeLoader: React.FC<{ size: LoadingSize }> = ({ size }) => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-full bg-dark-bg grid-bg"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute inset-2 rounded-full bg-haclab-red/20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-haclab-red/50"
        style={{ borderRadius: '50%', borderRightColor: 'transparent', borderBottomColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-haclab-red/30"
        style={{ borderRadius: '50%', borderLeftColor: 'transparent', borderTopColor: 'transparent' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingUI;
