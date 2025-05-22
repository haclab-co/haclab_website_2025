'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlowingButton from '../ui/GlowingButton';
import GlowingCard from '../ui/GlowingCard';

const ProjectsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      image: '/images/placeholder-project.jpg',
      category: 'Company Website',
      title: 'Wion Motors Limited',
      description: 'A professional website for a leading motor company in Uganda.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      href: '/work/wion-motors'
    },
    {
      image: '/images/placeholder-project.jpg',
      category: 'Garage Management System',
      title: 'Kanify',
      description: 'A comprehensive system for managing vehicles, jobs, inspections, and more.',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      href: '/work/kanify'
    },
    {
      image: '/images/placeholder-project.jpg',
      category: 'Property Management System',
      title: 'Realesta PMS',
      description: 'A solution designed for property managers to solve daily challenges.',
      technologies: ['React', 'Express', 'PostgreSQL'],
      href: '/work/realesta-pms'
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
            Our <span className="text-haclab-red glow-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Take a look at some of our successful projects that have helped businesses grow.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <GlowingCard
              key={index}
              href={project.href}
              className="h-full"
              glowIntensity="low"
              delay={index}
            >
              <div className="flex flex-col h-full">
                {/* Project Image Placeholder */}
                <div className="h-48 rounded-md bg-dark-surface mb-6 overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-code">
                    {/* Replace with actual image when available */}
                    <span>Project Image</span>
                  </div>

                  {/* Overlay with code pattern */}
                  <div className="absolute inset-0 bg-code-pattern bg-cover opacity-10 group-hover:opacity-20 transition-opacity"></div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-haclab-red/90 text-white text-xs py-1 px-2 rounded font-code">
                    {project.category}
                  </div>
                </div>

                <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-dark-surface px-2 py-1 rounded font-code text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <button
                    className="relative inline-flex items-center justify-center font-display font-medium rounded-md transition-all duration-300 px-3 py-1.5 text-sm bg-transparent border-2 border-haclab-red text-haclab-red hover:bg-haclab-red/10 before:opacity-30 before:blur-md before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-haclab-red before:-z-10 hover:before:scale-110 hover:-translate-y-1"
                  >
                    View Project
                  </button>
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
