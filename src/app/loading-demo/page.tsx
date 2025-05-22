'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiTerminal, FiCircle, FiRefreshCw } from 'react-icons/fi';
import LoadingUI from '@/components/ui/LoadingUI';
import LoadingButton from '@/components/ui/LoadingButton';
import LoadingWrapper from '@/components/ui/LoadingWrapper';
import { useLoading } from '@/context/LoadingContext';
import GlowingCard from '@/components/ui/GlowingCard';

export default function LoadingDemoPage() {
  const { startLoading, stopLoading } = useLoading();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  
  // Handle global loading demo
  const handleGlobalLoading = () => {
    startLoading({ text: 'Loading application...', theme: 'code' });
    setTimeout(() => {
      stopLoading();
    }, 3000);
  };
  
  // Handle button loading demo
  const handleButtonLoading = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };
  
  // Handle card loading demo
  const handleCardLoading = () => {
    setCardLoading(true);
    setTimeout(() => {
      setCardLoading(false);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl md:text-5xl font-display font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading UI Components
      </motion.h1>
      
      <motion.p 
        className="text-lg text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        A showcase of different loading UI components for the Haclab website, featuring code-themed loading animations.
      </motion.p>
      
      {/* Loading Variants Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-6">Loading Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Default Loading */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Default</h3>
            <div className="h-24 w-24 flex items-center justify-center">
              <LoadingUI variant="inline" size="lg" />
            </div>
          </GlowingCard>
          
          {/* Code Theme Loading */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Code Theme</h3>
            <div className="h-24 w-24 flex items-center justify-center">
              <LoadingUI variant="inline" size="lg" theme="code" />
            </div>
          </GlowingCard>
          
          {/* Terminal Theme Loading */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Terminal Theme</h3>
            <div className="h-24 w-24 flex items-center justify-center">
              <LoadingUI variant="inline" size="lg" theme="terminal" />
            </div>
          </GlowingCard>
          
          {/* Circuit Theme Loading */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Circuit Theme</h3>
            <div className="h-24 w-24 flex items-center justify-center">
              <LoadingUI variant="inline" size="lg" theme="circuit" />
            </div>
          </GlowingCard>
          
          {/* Size Variants */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Size Variants</h3>
            <div className="flex items-center justify-center space-x-4">
              <LoadingUI variant="inline" size="xs" theme="code" />
              <LoadingUI variant="inline" size="sm" theme="code" />
              <LoadingUI variant="inline" size="md" theme="code" />
              <LoadingUI variant="inline" size="lg" theme="code" />
            </div>
          </GlowingCard>
          
          {/* Button Loading */}
          <GlowingCard className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl font-display mb-6">Button Loading</h3>
            <LoadingButton 
              isLoading={buttonLoading}
              onClick={handleButtonLoading}
              loadingText="Processing..."
            >
              Click to Load
            </LoadingButton>
          </GlowingCard>
        </div>
      </section>
      
      {/* Interactive Demos Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-6">Interactive Demos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Global Loading Demo */}
          <GlowingCard className="p-8">
            <h3 className="text-xl font-display mb-4">Global Loading Overlay</h3>
            <p className="mb-6 text-gray-300">
              Demonstrates a full-screen loading overlay that blocks the entire UI while loading.
            </p>
            <LoadingButton 
              onClick={handleGlobalLoading}
              icon={<FiRefreshCw />}
            >
              Show Global Loading
            </LoadingButton>
          </GlowingCard>
          
          {/* Content Loading Demo */}
          <GlowingCard className="p-8">
            <h3 className="text-xl font-display mb-4">Content Loading</h3>
            <p className="mb-6 text-gray-300">
              Demonstrates loading state for a specific content area.
            </p>
            <LoadingButton 
              onClick={handleCardLoading}
              icon={<FiRefreshCw />}
            >
              Load Content
            </LoadingButton>
            
            <div className="mt-6">
              <LoadingWrapper isLoading={cardLoading} theme="code" loadingText="Fetching data...">
                <div className="bg-dark-surface p-4 rounded-lg">
                  <h4 className="font-code text-haclab-red mb-2">// Content loaded successfully</h4>
                  <p className="font-code text-sm">
                    This content appears after the loading state is complete.
                  </p>
                </div>
              </LoadingWrapper>
            </div>
          </GlowingCard>
        </div>
      </section>
      
      {/* Usage Examples Section */}
      <section>
        <h2 className="text-2xl font-display font-bold mb-6">Usage Examples</h2>
        <div className="grid grid-cols-1 gap-8">
          <GlowingCard className="p-8">
            <h3 className="text-xl font-display mb-4">Implementation Examples</h3>
            <div className="font-code text-sm bg-dark-surface p-4 rounded-lg overflow-x-auto">
              <pre>{`// Global loading
import { useLoading } from '@/context/LoadingContext';

const { startLoading, stopLoading } = useLoading();

// Start loading
startLoading({ text: 'Loading data...', theme: 'code' });

// Stop loading when done
stopLoading();

// Component with loading state
<LoadingWrapper isLoading={isLoading} theme="terminal">
  <YourContent />
</LoadingWrapper>

// Button with loading state
<LoadingButton 
  isLoading={isSubmitting}
  onClick={handleSubmit}
  loadingText="Submitting..."
>
  Submit Form
</LoadingButton>`}</pre>
            </div>
          </GlowingCard>
        </div>
      </section>
    </div>
  );
}
