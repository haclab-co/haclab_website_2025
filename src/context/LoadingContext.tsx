'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import LoadingUI, { LoadingVariant, LoadingTheme } from '@/components/ui/LoadingUI';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (options?: LoadingOptions) => void;
  stopLoading: () => void;
}

interface LoadingOptions {
  text?: string;
  variant?: LoadingVariant;
  theme?: LoadingTheme;
}

interface LoadingProviderProps {
  children: ReactNode;
}

// Create the context with default values
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

// Provider component
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState<LoadingOptions>({
    text: 'Loading...',
    variant: 'fullscreen',
    theme: 'code',
  });

  const startLoading = useCallback((options?: LoadingOptions) => {
    if (options) {
      setLoadingOptions({ ...loadingOptions, ...options });
    }
    setIsLoading(true);
  }, [loadingOptions]);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      
      {/* Render the loading UI when isLoading is true */}
      {isLoading && (
        <LoadingUI
          variant={loadingOptions.variant}
          text={loadingOptions.text}
          theme={loadingOptions.theme}
          fixed={true}
        />
      )}
    </LoadingContext.Provider>
  );
};

// Higher-order component to wrap components that need loading functionality
export function withLoading<P extends object>(
  Component: React.ComponentType<P & { loading: LoadingContextType }>
): React.FC<P> {
  return (props: P) => {
    const loading = useLoading();
    return <Component {...props} loading={loading} />;
  };
}

// Custom hook for handling async operations with loading state
export const useLoadingAsync = () => {
  const { startLoading, stopLoading } = useLoading();

  const withLoading = useCallback(
    async <T,>(
      asyncFn: () => Promise<T>,
      options?: LoadingOptions
    ): Promise<T> => {
      try {
        startLoading(options);
        return await asyncFn();
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return { withLoading };
};

export default LoadingProvider;
