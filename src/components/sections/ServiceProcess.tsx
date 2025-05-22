'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';
import ParallaxSection from '../ui/ParallaxSection';

interface ProcessStep {
  title: string;
  description: string;
  code: string;
}

interface ServiceProcessProps {
  title: string;
  description: string;
  steps: ProcessStep[];
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({
  title,
  description,
  steps
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };

  const codeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ParallaxSection
      className="py-20 text-white"
      bgColor="#0A0A0A"
      direction="up"
      speed={0.3}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            variants={titleVariants}
          >
            Our <span className="text-haclab-red glow-text">Process</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={stepVariants}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-haclab-red/20 border-l-4 border-haclab-red' 
                      : 'bg-dark-surface hover:bg-dark-surface/70'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      activeStep === index ? 'bg-haclab-red text-white' : 'bg-dark-bg text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className="font-display font-semibold text-lg">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm pl-11">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:w-2/3"
            variants={codeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            key={activeStep} // Re-render when active step changes
          >
            <AnimatedCodeBlock
              code={steps[activeStep].code}
              title={`step-${activeStep + 1}-${steps[activeStep].title.toLowerCase().replace(/\s+/g, '-')}.js`}
              typingEffect={true}
              typingSpeed={20}
              className="shadow-glow"
            />
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default ServiceProcess;
