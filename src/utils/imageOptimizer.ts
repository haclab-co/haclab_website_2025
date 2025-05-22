/**
 * Utility functions for optimizing images
 * This helps improve page load speeds and SEO ranking
 */

/**
 * Generates appropriate alt text for an image based on context
 * @param filename The filename of the image
 * @param context Additional context about the image (e.g., product name, page name)
 * @param location Where in Uganda the image is related to (optional)
 * @returns Optimized alt text for SEO
 */
export function generateAltText(filename: string, context: string, location?: string): string {
  // Remove file extension and convert hyphens to spaces
  const baseFilename = filename.split('.')[0].replace(/-/g, ' ');
  
  // Capitalize words
  const capitalizedFilename = baseFilename
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Add location context if provided
  const locationText = location ? ` in ${location}, Uganda` : '';
  
  // Combine all parts
  return `${capitalizedFilename} - ${context}${locationText}`;
}

/**
 * Generates a list of image sizes for responsive images
 * @param originalWidth The original width of the image
 * @returns Array of image sizes for srcset
 */
export function generateResponsiveSizes(originalWidth: number): number[] {
  // Default sizes if original width is unknown
  if (!originalWidth) {
    return [640, 750, 828, 1080, 1200, 1920];
  }
  
  // Generate sizes based on original width
  const sizes: number[] = [];
  const breakpoints = [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048];
  
  for (const breakpoint of breakpoints) {
    if (breakpoint <= originalWidth) {
      sizes.push(breakpoint);
    }
  }
  
  // Always include the original size
  if (!sizes.includes(originalWidth)) {
    sizes.push(originalWidth);
  }
  
  return sizes.sort((a, b) => a - b);
}

/**
 * Generates a srcset string for responsive images
 * @param src The base image source
 * @param sizes Array of image sizes
 * @returns srcset string for use in img or source elements
 */
export function generateSrcSet(src: string, sizes: number[]): string {
  // Extract the base path and extension
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  const extension = src.substring(lastDotIndex);
  
  // Generate the srcset string
  return sizes
    .map(size => `${basePath}-${size}w${extension} ${size}w`)
    .join(', ');
}

/**
 * Generates a sizes attribute for responsive images
 * @param defaultSize The default size of the image (e.g., 100vw)
 * @param breakpoints Object mapping breakpoints to sizes
 * @returns sizes attribute string
 */
export function generateSizesAttribute(
  defaultSize: string = '100vw',
  breakpoints?: Record<string, string>
): string {
  if (!breakpoints || Object.keys(breakpoints).length === 0) {
    return defaultSize;
  }
  
  const breakpointStrings = Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
  
  return `${breakpointStrings}, ${defaultSize}`;
}

/**
 * Optimizes image attributes for SEO
 * @param props Image properties
 * @returns Optimized image properties
 */
export function optimizeImageProps(props: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  context?: string;
  location?: string;
}): {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
} {
  // Generate alt text if not provided or empty
  const alt = props.alt && props.alt.trim() !== '' 
    ? props.alt 
    : generateAltText(
        props.src.split('/').pop() || 'image',
        props.context || 'Haclab Company Limited',
        props.location
      );
  
  return {
    src: props.src,
    alt,
    width: props.width,
    height: props.height,
    loading: 'lazy', // Lazy load images by default
    decoding: 'async', // Use async decoding for better performance
  };
}
