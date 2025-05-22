'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import FloatingLogo from '@/components/ui/FloatingLogo';
import dynamic from 'next/dynamic';
import LogoWall from '@/components/sections/LogoWall';
import { FiDownload, FiCopy } from 'react-icons/fi';
import SimplifiedLogo3D from '@/components/ui/SimplifiedLogo3D';

// Dynamically import the 3D logo with fallback to simplified version
const Logo3D = dynamic(
  () => import('@/components/ui/Logo3D').catch(() => {
    // Return the simplified logo component if the import fails
    return SimplifiedLogo3D;
  }),
  {
    ssr: false,
    loading: () => <SimplifiedLogo3D />
  }
);

export default function BrandPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Function to copy code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Haclab <span className="text-haclab-red">Brand</span> Assets
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explore our brand identity and logo variations for different use cases.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Logo3D size="lg" />
          </motion.div>
        </div>
      </section>

      {/* Logo variants section */}
      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Logo <span className="text-haclab-red">Variants</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our logo comes in different styles and variants to fit various contexts and applications.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Default logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4">
                  <Logo variant="default" size="md" color="light" />
                </div>
                <h3 className="font-display font-bold mb-2">Default Logo</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Our standard logo for general use across platforms.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo variant="default" size="md" color="light" />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                  <a
                    href="/assets/images/logo/logo-dark.webp"
                    download
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                  >
                    <FiDownload className="mr-1" />
                    Download
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Animated logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4">
                  <Logo variant="animated" size="md" color="light" />
                </div>
                <h3 className="font-display font-bold mb-2">Animated Logo</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Interactive logo with hover animations for web interfaces.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo variant="animated" size="md" color="light" />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Glitch logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4">
                  <Logo variant="glitch" size="md" color="light" />
                </div>
                <h3 className="font-display font-bold mb-2">Glitch Effect</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Tech-inspired glitch effect for creative applications.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo variant="glitch" size="md" color="light" />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Terminal logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4">
                  <Logo variant="terminal" size="md" color="light" />
                </div>
                <h3 className="font-display font-bold mb-2">Terminal Style</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Command-line inspired logo for developer-focused contexts.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo variant="terminal" size="md" color="light" />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Code logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4">
                  <Logo variant="code" size="md" color="light" />
                </div>
                <h3 className="font-display font-bold mb-2">Code Block</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Code editor style logo for technical documentation.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo variant="code" size="md" color="light" />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 3D logo */}
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 p-4 h-[150px] w-full flex items-center justify-center">
                  <Logo3D size="sm" interactive={false} />
                </div>
                <h3 className="font-display font-bold mb-2">3D Logo</h3>
                <p className="text-gray-400 text-center text-sm mb-4">
                  Interactive 3D logo for immersive web experiences.
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-3 py-1 rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                    onClick={() => copyToClipboard('<Logo3D size="md" interactive={true} />')}
                  >
                    <FiCopy className="mr-1" />
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating logos section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Animated <span className="text-haclab-red">Logos</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dynamic logo animations to bring life to your interfaces and presentations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <FloatingLogo variant="default" size="md" />
              <div className="text-center mt-4">
                <h3 className="font-display font-bold mb-2">Floating Animation</h3>
                <button
                  className="flex items-center px-3 py-1 mx-auto rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                  onClick={() => copyToClipboard('<FloatingLogo variant="default" size="md" />')}
                >
                  <FiCopy className="mr-1" />
                  Copy Code
                </button>
              </div>
            </motion.div>

            <motion.div
              className="bg-dark-bg p-6 rounded-lg border border-dark-border"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <FloatingLogo variant="particles" size="md" />
              <div className="text-center mt-4">
                <h3 className="font-display font-bold mb-2">Particles Effect</h3>
                <button
                  className="flex items-center px-3 py-1 mx-auto rounded bg-dark-surface text-gray-400 hover:text-haclab-red hover:bg-dark-surface/80 transition-colors text-xs"
                  onClick={() => copyToClipboard('<FloatingLogo variant="particles" size="md" />')}
                >
                  <FiCopy className="mr-1" />
                  Copy Code
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo wall */}
      <LogoWall className="py-16 bg-dark-surface" />
    </div>
  );
}
