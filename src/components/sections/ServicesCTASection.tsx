'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiCode } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import ParallaxSection from '../ui/ParallaxSection';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

const ServicesCTASection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        staggerChildren: 0.1,
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
    <ParallaxSection
      className="py-20 text-white"
      bgColor="#0A0A0A"
      direction="up"
      speed={0.3}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto bg-dark-surface p-8 md:p-12 rounded-lg border border-dark-border shadow-glow"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <motion.div
                className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-haclab-red/10 text-haclab-red font-code text-sm"
                variants={itemVariants}
              >
                <FiCode className="mr-2" />
                <span>Let's Build Together</span>
              </motion.div>

              <motion.h2
                className="text-2xl md:text-3xl font-display font-bold mb-4"
                variants={itemVariants}
              >
                Not Sure Which Service You Need?
              </motion.h2>

              <motion.p
                className="text-gray-300 mb-6"
                variants={itemVariants}
              >
                Our team of experts can help you identify the right solution for your business needs.
                Schedule a free consultation and let's discuss how we can help you achieve your goals.
              </motion.p>

              <motion.div variants={itemVariants}>
                <GlowingButton
                  href="/contact"
                  icon={<FiArrowRight />}
                  iconPosition="right"
                  glowIntensity="high"
                >
                  Get Free Consultation
                </GlowingButton>
              </motion.div>
            </div>

            <div className="md:w-1/3">
              <motion.div
                variants={itemVariants}
              >
                {isClient ? (
                  <AnimatedCodeBlock
                    code={`async function getConsultation() {
  const needs = await identifyNeeds();
  const solution = designSolution(needs);
  return solution;
}`}
                    title="consultation.js"
                    language="javascript"
                    animate={false}
                    showLineNumbers={true}
                    className="shadow-lg"
                  />
                ) : (
                  <div className="rounded-lg p-4 text-sm font-code text-gray-400 shadow-lg border border-dark-border">
                    Loading code example...
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  );
};

export default ServicesCTASection;
