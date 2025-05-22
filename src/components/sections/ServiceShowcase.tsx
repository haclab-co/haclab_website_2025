'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import GlowingButton from '../ui/GlowingButton';
import Link from 'next/link';

interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ServiceShowcaseProps {
  title: string;
  description: string;
  items: ShowcaseItem[];
}

const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({
  title,
  description,
  items
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeItem, setActiveItem] = useState(0);

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

  const itemVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative py-20 bg-dark-bg text-white overflow-hidden" ref={ref}>
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
            Our <span className="text-haclab-red glow-text">Work</span>
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
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeItem === index 
                      ? 'bg-dark-surface border-l-4 border-haclab-red shadow-glow-sm' 
                      : 'bg-dark-surface/50 hover:bg-dark-surface'
                  }`}
                  onClick={() => setActiveItem(index)}
                >
                  <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-dark-bg text-gray-300 rounded text-xs font-code"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {item.link && (
                    <Link 
                      href={item.link}
                      className="inline-flex items-center text-haclab-red hover:text-haclab-light-red font-code text-sm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <FiExternalLink className="ml-1" />
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              variants={titleVariants}
            >
              <GlowingButton
                href="/projects"
                variant="outline"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                View All Projects
              </GlowingButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            key={activeItem} // Re-render when active item changes
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-dark-surface shadow-glow">
              {/* Replace with actual image when available */}
              <div className="absolute inset-0 flex items-center justify-center bg-dark-bg">
                <span className="text-gray-500 font-code">Project Image</span>
              </div>
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-70"></div>
              
              {/* Project title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display font-semibold text-xl mb-2">{items[activeItem].title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items[activeItem].tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-dark-bg/80 text-gray-300 rounded text-xs font-code"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
