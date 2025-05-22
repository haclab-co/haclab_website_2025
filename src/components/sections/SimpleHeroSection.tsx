'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiDatabase, FiGlobe, FiSmartphone } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import AnimatedTerminal from '../ui/AnimatedTerminal';

const SimpleHeroSection: React.FC = () => {
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

  // Floating icons animation
  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section className="relative min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute inset-0 bg-circuit-pattern bg-no-repeat bg-cover opacity-5"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-[10%] text-haclab-red text-4xl opacity-20"
          variants={floatingIconVariants}
          animate="animate"
          custom={0}
        >
          <FiCode />
        </motion.div>
        <motion.div 
          className="absolute top-[30%] right-[15%] text-haclab-red text-5xl opacity-30"
          variants={floatingIconVariants}
          animate="animate"
          custom={1}
          transition={{ delay: 0.5 }}
        >
          <FiDatabase />
        </motion.div>
        <motion.div 
          className="absolute bottom-[25%] left-[20%] text-haclab-red text-4xl opacity-25"
          variants={floatingIconVariants}
          animate="animate"
          custom={2}
          transition={{ delay: 1 }}
        >
          <FiGlobe />
        </motion.div>
        <motion.div 
          className="absolute bottom-[15%] right-[25%] text-haclab-red text-3xl opacity-20"
          variants={floatingIconVariants}
          animate="animate"
          custom={3}
          transition={{ delay: 1.5 }}
        >
          <FiSmartphone />
        </motion.div>
        
        {/* Code symbols */}
        <motion.div 
          className="absolute top-[15%] left-[30%] font-code text-haclab-red text-2xl opacity-30"
          variants={floatingIconVariants}
          animate="animate"
          custom={4}
          transition={{ delay: 0.7 }}
        >
          {"</>"}
        </motion.div>
        <motion.div 
          className="absolute top-[40%] right-[30%] font-code text-haclab-red text-3xl opacity-25"
          variants={floatingIconVariants}
          animate="animate"
          custom={5}
          transition={{ delay: 1.2 }}
        >
          {"{}"}
        </motion.div>
        <motion.div 
          className="absolute bottom-[35%] left-[40%] font-code text-haclab-red text-2xl opacity-20"
          variants={floatingIconVariants}
          animate="animate"
          custom={6}
          transition={{ delay: 0.3 }}
        >
          {"()"}
        </motion.div>
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

export default SimpleHeroSection;
