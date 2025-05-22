'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene to avoid SSR issues
const CodeScene = dynamic(() => import('../3d/CodeScene'), { ssr: false });

interface ServiceHeroSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  code: string;
  codeTitle?: string;
}

const ServiceHeroSection: React.FC<ServiceHeroSectionProps> = ({
  title,
  description,
  icon,
  code,
  codeTitle = 'example.js',
}) => {
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
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-haclab-red/10 text-haclab-red font-code text-sm"
              variants={itemVariants}
            >
              <div className="mr-2">{icon}</div>
              <span>Our Service</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <GlowingButton 
                href="#features" 
                size="lg"
              >
                Explore Features
              </GlowingButton>
              <GlowingButton 
                href="/contact" 
                variant="outline" 
                size="lg"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Get Started
              </GlowingButton>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="lg:w-1/2"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <AnimatedCodeBlock
              code={code}
              title={codeTitle}
              typingEffect={true}
              typingSpeed={30}
              className="shadow-glow"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;
