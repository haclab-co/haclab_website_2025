'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import AnimatedTerminal from '../ui/AnimatedTerminal';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene to avoid SSR issues
const CodeScene = dynamic(() => import('../3d/CodeScene'), { ssr: false });

const AboutHeroSection: React.FC = () => {
  const terminalCommands = [
    "class HaclabCompany {",
    "  constructor() {",
    "    this.name = 'Haclab Company Limited';",
    "    this.founded = 2018;",
    "    this.location = 'Kampala, Uganda';",
    "    this.mission = 'Empower businesses with custom software solutions';",
    "  }",
    "",
    "  getTeam() {",
    "    return [",
    "      'Passionate developers',",
    "      'Creative designers',",
    "      'Innovative thinkers'",
    "    ];",
    "  }",
    "}",
    "",
    "const haclab = new HaclabCompany();",
    "console.log('Welcome to', haclab.name);"
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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-bg"></div>
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <CodeScene />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                About <span className="text-haclab-red glow-text">Haclab</span> Company
              </h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                We are a team of passionate developers and designers dedicated to creating innovative software solutions that empower businesses to thrive in the digital age.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <GlowingButton 
                href="#history" 
                size="lg"
                glowIntensity="medium"
              >
                Our Journey
              </GlowingButton>
              <GlowingButton 
                href="#team" 
                variant="outline" 
                size="lg"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Meet Our Team
              </GlowingButton>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="w-12 h-1 bg-haclab-red"></div>
              <p className="text-gray-400 text-sm">Established in 2018 in Kampala, Uganda</p>
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
              typingSpeed={50}
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

export default AboutHeroSection;
