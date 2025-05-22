'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiArrowRight } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import dynamic from 'next/dynamic';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

// Dynamically import the 3D scene to avoid SSR issues
const CodeScene = dynamic(() => import('../3d/CodeScene'), { ssr: false });

const ServicesHeroSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  // This ensures we only render complex components on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <section className="relative min-h-[70vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-bg"></div>
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <CodeScene />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-haclab-red/10 text-haclab-red font-code text-sm"
            variants={itemVariants}
          >
            <FiCode className="mr-2" />
            <span>Our Expertise</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white"
            variants={itemVariants}
          >
            Innovative <span className="text-haclab-red">Software Solutions</span> for Modern Businesses
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 mb-8"
            variants={itemVariants}
          >
            We deliver cutting-edge software development services tailored to your unique business needs.
            Our team of experts combines technical excellence with creative problem-solving to build
            solutions that drive your business forward.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            <GlowingButton
              href="#services"
              size="lg"
              icon={<FiArrowRight />}
              iconPosition="right"
            >
              Explore Our Services
            </GlowingButton>
            <GlowingButton
              href="/contact"
              variant="outline"
              size="lg"
            >
              Get in Touch
            </GlowingButton>
          </motion.div>

          {/* Code snippet animation */}
          <motion.div
            className="mt-16 max-w-md mx-auto"
            variants={itemVariants}
          >
            {isClient ? (
              <AnimatedCodeBlock
                code={`const haclab = new SoftwareCompany({
  expertise: ['Web', 'Mobile', 'Database', 'E-commerce'],
  focus: 'Custom Solutions',
  quality: 'Enterprise Grade'
});`}
                title="services.js"
                language="javascript"
                animate={false}
                showLineNumbers={true}
                className="shadow-glow"
                typingEffect={true}
                typingSpeed={40}
              />
            ) : (
              <div className="rounded-lg p-4 font-code text-sm text-gray-400 shadow-glow border border-dark-border">
                Loading code example...
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHeroSection;
