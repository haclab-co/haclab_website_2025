'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
}

interface ServiceFeaturesProps {
  title: string;
  description: string;
  features: Feature[];
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  title,
  description,
  features
}) => {
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

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };

  return (
    <section id="features" className="relative py-20 bg-dark-bg text-white overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-code-pattern bg-no-repeat bg-cover opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            <span className="text-haclab-red glow-text">Features</span> & Benefits
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <GlowingCard className="h-full" glowIntensity="low">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-haclab-red/20 flex items-center justify-center text-haclab-red mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold">{feature.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-6">{feature.description}</p>

                  {feature.code && (
                    <div className="mt-auto">
                      {isClient ? (
                        <AnimatedCodeBlock
                          code={feature.code}
                          title={`${feature.title.toLowerCase().replace(/\s+/g, '-')}.js`}
                          language="javascript"
                          className="text-xs"
                          animate={false}
                          showLineNumbers={true}
                        />
                      ) : (
                        <div className="rounded-lg p-4 text-xs font-code text-gray-400 border border-dark-border">
                          Loading code example...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
