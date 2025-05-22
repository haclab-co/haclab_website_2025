'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiArrowRight, FiCode, FiGitBranch } from 'react-icons/fi';
import GlowingCard from '@/components/ui/GlowingCard';
import GlowingButton from '@/components/ui/GlowingButton';
import EnhancedTerminal from '@/components/ui/EnhancedTerminal';
import Link from 'next/link';
import WorkFilter from '@/components/ui/WorkFilter';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  image: string;
  link?: string;
  codeSnippet: string;
}

interface Category {
  id: string;
  name: string;
}

interface WorkShowcaseProps {
  title: string;
  description: string;
  projects: Project[];
  categories: Category[];
}

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ 
  title, 
  description, 
  projects, 
  categories 
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Filter projects by category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Get active project details
  const selectedProject = activeProject 
    ? projects.find(p => p.id === activeProject) 
    : null;

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
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-20 bg-dark-bg text-white overflow-hidden" ref={sectionRef}>
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
            variants={itemVariants}
            custom={0}
          >
            {title || "Our <span className='text-haclab-red glow-text'>Work</span>"}
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
            custom={1}
          >
            {description || "Explore our portfolio of successful projects that have helped businesses solve complex problems."}
          </motion.p>
        </motion.div>

        <WorkFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Projects List */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                        activeProject === project.id 
                          ? 'bg-dark-surface border-l-4 border-haclab-red shadow-glow-sm' 
                          : 'bg-dark-surface/50 hover:bg-dark-surface'
                      }`}
                      onClick={() => setActiveProject(project.id)}
                    >
                      <h3 className="font-display font-semibold text-xl mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-dark-bg text-gray-300 rounded text-xs font-code"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-dark-bg text-gray-300 rounded text-xs font-code">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <Link 
                        href={`/work/${project.id}`}
                        className="inline-flex items-center text-haclab-red hover:text-haclab-light-red font-code text-sm transition-colors"
                      >
                        View Project <FiArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
              custom={filteredProjects.length + 1}
            >
              <GlowingButton
                href="/work"
                variant="outline"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                View All Projects
              </GlowingButton>
            </motion.div>
          </motion.div>
          
          {/* Project Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView && selectedProject ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-dark-surface p-8 rounded-lg"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold mb-4">{selectedProject.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-display font-semibold mb-2">The Challenge</h4>
                        <p className="text-gray-300">{selectedProject.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-display font-semibold mb-2">Our Solution</h4>
                        <p className="text-gray-300">{selectedProject.solution}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-display font-semibold mb-2">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <FiGitBranch className="text-haclab-red mt-1 mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-dark-bg rounded-full text-sm font-code"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <GlowingButton
                        href={`/work/${selectedProject.id}`}
                        variant="primary"
                        size="sm"
                        icon={<FiCode />}
                        iconPosition="left"
                      >
                        Project Details
                      </GlowingButton>
                      
                      {selectedProject.link && (
                        <GlowingButton
                          href={selectedProject.link}
                          variant="outline"
                          size="sm"
                          icon={<FiExternalLink />}
                          iconPosition="right"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Live
                        </GlowingButton>
                      )}
                    </div>
                  </div>
                  
                  <EnhancedTerminal
                    title={`${selectedProject.title} - Code Snippet`}
                    initialCommands={[selectedProject.codeSnippet]}
                    showLineNumbers={true}
                    theme="dark"
                    maxHeight="300px"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {!selectedProject && (
              <div className="h-full flex items-center justify-center bg-dark-surface/50 rounded-lg p-8">
                <div className="text-center">
                  <FiCode className="text-4xl text-haclab-red mx-auto mb-4" />
                  <p className="text-gray-300 font-code">Select a project to view details</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
