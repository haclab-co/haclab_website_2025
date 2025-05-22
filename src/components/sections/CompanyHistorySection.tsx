'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiCheckCircle, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';
import ParallaxSection from '../ui/ParallaxSection';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

const CompanyHistorySection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const historyCode = `// Haclab Company History
const haclab = {
  founded: 2018,
  location: 'Kampala, Uganda',
  founders: ['Passionate developers with a vision'],
  mission: 'To empower businesses with innovative software solutions',
  
  timeline: [
    {
      year: 2018,
      milestone: 'Company founded',
      achievement: 'Started with a small team of 3 developers'
    },
    {
      year: 2019,
      milestone: 'First major client project',
      achievement: 'Successfully delivered custom software for a local business'
    },
    {
      year: 2020,
      milestone: 'Expanded service offerings',
      achievement: 'Added mobile app development and e-commerce solutions'
    },
    {
      year: 2021,
      milestone: 'Team growth',
      achievement: 'Doubled team size and moved to a larger office'
    },
    {
      year: 2022,
      milestone: 'International clients',
      achievement: 'Started working with clients from across Africa and beyond'
    },
    {
      year: 2023,
      milestone: 'Product development',
      achievement: 'Launched our first SaaS product'
    }
  ],
  
  // The journey continues...
};`;

  const milestones = [
    {
      year: 2018,
      title: 'Company Founded',
      description: 'Haclab was established with a vision to provide innovative software solutions to businesses in Uganda.',
      icon: <FiCode />
    },
    {
      year: 2019,
      title: 'First Major Projects',
      description: 'Successfully delivered our first set of custom software solutions for local businesses.',
      icon: <FiCheckCircle />
    },
    {
      year: 2020,
      title: 'Service Expansion',
      description: 'Expanded our service offerings to include mobile app development and e-commerce solutions.',
      icon: <FiStar />
    },
    {
      year: 2021,
      title: 'Team Growth',
      description: 'Doubled our team size and moved to a larger office to accommodate our growing operations.',
      icon: <FiUsers />
    },
    {
      year: 2022,
      title: 'International Reach',
      description: 'Started working with clients from across Africa and beyond, expanding our international presence.',
      icon: <FiTrendingUp />
    }
  ];

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

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const milestoneVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <ParallaxSection
      className="py-20 text-white"
      bgColor="#121212"
      direction="up"
      speed={0.3}
      id="history"
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
            Our <span className="text-haclab-red glow-text">Journey</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            From a small startup to a growing software development company, our journey has been defined by innovation and dedication.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatedCodeBlock
              code={historyCode}
              language="javascript"
              title="company-history.js"
              className="shadow-glow"
              typingEffect={true}
              typingSpeed={10}
            />
          </motion.div>

          <motion.div
            className="relative pl-8 border-l-2 border-dark-border"
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="mb-12 relative"
                variants={milestoneVariants}
              >
                <div className="absolute -left-[41px] w-20 h-20 rounded-full bg-dark-surface flex items-center justify-center border-2 border-haclab-red">
                  <div className="text-haclab-red text-xl">{milestone.icon}</div>
                </div>
                <div className="ml-8">
                  <div className="text-haclab-red font-code text-lg mb-1">{milestone.year}</div>
                  <h3 className="text-xl font-display font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default CompanyHistorySection;
