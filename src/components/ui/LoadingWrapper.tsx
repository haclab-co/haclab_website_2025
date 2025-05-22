'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingUI from './LoadingUI';

interface LoadingWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  theme?: 'default' | 'code' | 'terminal' | 'circuit';
  minHeight?: string;
  className?: string;
  delay?: number;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading: externalLoading,
  loadingText = 'Loading content...',
  theme = 'code',
  minHeight = '200px',
  className = '',
  delay = 0,
}) => {
  const [internalLoading, setInternalLoading] = useState(delay > 0 || externalLoading);

  // Handle delay if specified
  useEffect(() => {
    if (delay > 0 && externalLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay, externalLoading]);

  // Use external loading state if provided
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <div 
      className={`relative ${className}`} 
      style={{ minHeight }}
    >
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoadingUI 
            variant="overlay" 
            theme={theme} 
            text={loadingText}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingWrapper;
