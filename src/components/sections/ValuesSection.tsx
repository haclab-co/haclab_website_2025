'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiTrendingUp, FiShield, FiHeart } from 'react-icons/fi';
import GlowingCard from '../ui/GlowingCard';
import AnimatedCodeBlock from '../ui/AnimatedCodeBlock';

const ValuesSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isClient, setIsClient] = useState(false);

  // This ensures we only render complex components on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const values = [
    {
      icon: <FiCode size={24} />,
      title: 'Technical Excellence',
      description: 'We strive for excellence in every line of code we write, ensuring high-quality, maintainable solutions.',
      code: `function maintainExcellence() {
  return {
    codeReviews: true,
    testDrivenDevelopment: true,
    continuousLearning: true
  };
}`
    },
    {
      icon: <FiUsers size={24} />,
      title: 'Client Partnership',
      description: 'We build lasting partnerships with our clients, understanding their needs and delivering beyond expectations.',
      code: `class ClientRelationship {
  constructor(client) {
    this.client = client;
    this.communication = "open";
    this.focus = "long-term";
  }

  deliverValue() {
    return this.client.success;
  }
}`
    },
    {
      icon: <FiTarget size={24} />,
      title: 'Innovation',
      description: 'We embrace new technologies and approaches to solve complex problems with creative solutions.',
      code: `// Innovation is our core value
const innovation = {
  researchNewTech: true,
  experimentWithSolutions: true,
  challengeAssumptions: true,
  embraceChange: true
};`
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: 'Continuous Improvement',
      description: 'We constantly seek to improve our processes, skills, and the solutions we deliver.',
      code: `function improveConstantly() {
  while(true) {
    learnNewSkills();
    refinePractices();
    seekFeedback();
    implement(betterSolutions);
  }
}`
    },
    {
      icon: <FiShield size={24} />,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical practices in all our business dealings.',
      code: `// Integrity in everything we do
const ourPromise = {
  honesty: true,
  transparency: true,
  accountability: true,
  ethicalPractices: true
};`
    },
    {
      icon: <FiHeart size={24} />,
      title: 'Passion',
      description: 'We are passionate about technology and the positive impact it can have on businesses and society.',
      code: `class Developer {
  constructor() {
    this.passion = 100;
    this.lovesCode = true;
  }

  solveProblems() {
    return this.passion *
      creativity *
      determination;
  }
}`
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

  return (
    <section className="relative py-20 bg-dark-bg text-white overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>

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
            Our <span className="text-haclab-red glow-text">Values</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            The core principles that guide our work and define who we are as a company.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <GlowingCard
              key={index}
              className="h-full"
              glowIntensity="low"
              delay={index}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-haclab-red/20 flex items-center justify-center text-haclab-red mr-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold">{value.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{value.description}</p>

                {/* Code snippet */}
                <div className="mt-auto">
                  {isClient ? (
                    <AnimatedCodeBlock
                      code={value.code}
                      title={`${value.title.toLowerCase().replace(/\s+/g, '-')}.js`}
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
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
