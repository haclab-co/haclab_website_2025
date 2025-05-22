'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingUI from './LoadingUI';

interface LoadingImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  loadingTheme?: 'default' | 'code' | 'terminal' | 'circuit';
  showLoadingIndicator?: boolean;
  aspectRatio?: string;
  className?: string;
  containerClassName?: string;
  loadingText?: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  loadingTheme = 'default',
  showLoadingIndicator = true,
  aspectRatio = 'aspect-video',
  className = '',
  containerClassName = '',
  loadingText = 'Loading image...',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && showLoadingIndicator && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-dark-surface/80 backdrop-blur-sm z-10"
          >
            <LoadingUI 
              variant="overlay" 
              theme={loadingTheme} 
              text={loadingText}
              size="sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <Image
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoadingComplete}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />

      {/* Error fallback */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-surface text-gray-400 font-code text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-haclab-red mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default LoadingImage;
