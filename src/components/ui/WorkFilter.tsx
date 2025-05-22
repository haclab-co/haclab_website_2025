'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX } from 'react-icons/fi';

interface Category {
  id: string;
  name: string;
}

interface WorkFilterProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const WorkFilter: React.FC<WorkFilterProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
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
    visible: (i: number) => ({
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
    <motion.div 
      className="mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center px-4 py-2 bg-dark-surface rounded-full">
          <FiFilter className="text-haclab-red mr-2" />
          <span className="font-code text-sm">Filter Projects</span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            custom={index}
            variants={itemVariants}
            className={`px-4 py-2 rounded-full font-code text-sm transition-all ${
              activeCategory === category.id 
                ? 'bg-haclab-red text-white' 
                : 'bg-dark-surface text-gray-300 hover:bg-dark-surface/80'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </motion.button>
        ))}
        
        {activeCategory !== 'all' && (
          <motion.button
            variants={itemVariants}
            custom={categories.length}
            className="px-4 py-2 rounded-full font-code text-sm bg-dark-surface/50 text-gray-300 hover:bg-dark-surface/80 flex items-center"
            onClick={() => setActiveCategory('all')}
          >
            <FiX className="mr-1" /> Clear Filter
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default WorkFilter;
