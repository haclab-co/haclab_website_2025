'use client';

import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import GlowingButton from '../ui/GlowingButton';
import AnimatedTerminal from '../ui/AnimatedTerminal';

// Error boundary for 3D components
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when 3D rendering fails
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-haclab-red/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-haclab-red animate-pulse"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Import the simplified scene component
import SimplifiedCodeScene from '../3d/SimplifiedCodeScene';

// Dynamically import the 3D scene to avoid SSR issues
// Using a more robust approach with explicit loading and error states
const CodeScene = dynamic(
  () => import('../3d/CodeScene').catch(() => {
    // Return the simplified scene component if the import fails
    return SimplifiedCodeScene;
  }),
  {
    ssr: false,
    loading: () => <SimplifiedCodeScene />,
  }
);

const HeroSection: React.FC = () => {
  const terminalCommands = [
    "npm create haclab-project",
    "cd haclab-project",
    "npm install",
    "npm run dev",
    "Building custom software solutions...",
    "Deployment successful! Your business is now empowered with custom software."
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute inset-0 bg-circuit-pattern bg-no-repeat bg-cover opacity-5"></div>

      {/* 3D Scene with simplified rendering */}
      <div className="absolute inset-0 opacity-70">
        <ErrorBoundary>
          <CodeScene />
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Custom <span className="text-haclab-red glow-text">Software</span> Development for Your Business
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Haclab Company Limited delivers high-quality, cost-effective, reliable result-oriented web, apps, e-commerce and many other modern IT solutions.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <GlowingButton
                href="/contact"
                size="lg"
                glowIntensity="high"
              >
                Free Consultation
              </GlowingButton>
              <GlowingButton
                href="/services"
                variant="outline"
                size="lg"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Our Services
              </GlowingButton>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="w-12 h-1 bg-haclab-red"></div>
              <p className="text-gray-400 text-sm">Trusted by businesses across Uganda and beyond</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <AnimatedTerminal
              commands={terminalCommands}
              typingSpeed={70}
              className="w-full max-w-xl mx-auto shadow-glow"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm mb-2 font-code">Scroll to explore</p>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-haclab-red rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
