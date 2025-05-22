'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { optimizeImageProps } from '@/utils/imageOptimizer';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  context?: string;
  location?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Optimized Image component that enhances SEO with proper alt text and loading attributes
 * This component wraps Next.js Image component with additional SEO optimizations
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  context,
  location,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  // Optimize image properties for SEO
  const optimizedProps = optimizeImageProps({
    src: typeof src === 'string' ? src : '',
    alt,
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
    context,
    location,
  });

  return (
    <Image
      src={src}
      alt={optimizedProps.alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      {...props}
    />
  );
}
