'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiCode, FiDatabase, FiServer, FiLayers, FiPackage, FiShoppingCart, FiCpu, FiTruck, FiCalendar, FiUsers } from 'react-icons/fi';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  technologies: string[];
}

const CreativeProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  description,
  isActive,
  onClick,
  technologies
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define product-specific colors and icons
  const productThemes = {
    abacus: {
      primaryColor: '#0718c4',
      secondaryColor: '#0a1fa3',
      icon: <FiLayers size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="50" cy="20" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="80" cy="20" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="20" cy="50" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="50" cy="50" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="80" cy="50" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="20" cy="80" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="50" cy="80" r="5" fill="white" fillOpacity="0.1" />
          <circle cx="80" cy="80" r="5" fill="white" fillOpacity="0.1" />
        </svg>
      )
    },
    homz: {
      primaryColor: '#e91e63',
      secondaryColor: '#c2185b',
      icon: <FiUsers size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="40" y="10" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="70" y="10" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="10" y="40" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="40" y="40" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="70" y="40" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="10" y="70" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="40" y="70" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
          <rect x="70" y="70" width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
        </svg>
      )
    },
    kanify: {
      primaryColor: '#FF4500',
      secondaryColor: '#e63e00',
      icon: <FiTruck size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 L30,30 L20,40 L30,50 L20,60 L30,70 L20,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <path d="M50,20 L60,30 L50,40 L60,50 L50,60 L60,70 L50,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <path d="M80,20 L90,30 L80,40 L90,50 L80,60 L90,70 L80,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
        </svg>
      )
    },
    lenkit: {
      primaryColor: '#31c48d',
      secondaryColor: '#2ba97a',
      icon: <FiDatabase size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 L90,10 L90,30 L10,30 Z" fill="white" fillOpacity="0.1" />
          <path d="M10,40 L90,40 L90,60 L10,60 Z" fill="white" fillOpacity="0.1" />
          <path d="M10,70 L90,70 L90,90 L10,90 Z" fill="white" fillOpacity="0.1" />
        </svg>
      )
    },
    smart: {
      primaryColor: '#673ab7',
      secondaryColor: '#5e35b1',
      icon: <FiCalendar size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="white" fillOpacity="0.1" />
          <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="white" fillOpacity="0.05" />
        </svg>
      )
    },
    ecommerce: {
      primaryColor: '#9c27b0',
      secondaryColor: '#7b1fa2',
      icon: <FiShoppingCart size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="10" fill="white" fillOpacity="0.1" />
          <circle cx="75" cy="25" r="10" fill="white" fillOpacity="0.1" />
          <circle cx="25" cy="75" r="10" fill="white" fillOpacity="0.1" />
          <circle cx="75" cy="75" r="10" fill="white" fillOpacity="0.1" />
          <rect x="40" y="40" width="20" height="20" fill="white" fillOpacity="0.1" />
        </svg>
      )
    },
    crm: {
      primaryColor: '#2196f3',
      secondaryColor: '#1976d2',
      icon: <FiUsers size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,10 C50,30 50,70 10,90" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <path d="M30,10 C70,30 70,70 30,90" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <path d="M50,10 C90,30 90,70 50,90" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
        </svg>
      )
    },
    iot: {
      primaryColor: '#ff9800',
      secondaryColor: '#f57c00',
      icon: <FiCpu size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="10" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
        </svg>
      )
    },
    analytics: {
      primaryColor: '#4caf50',
      secondaryColor: '#388e3c',
      icon: <FiServer size={40} />,
      pattern: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="70" width="15" height="20" fill="white" fillOpacity="0.1" />
          <rect x="30" y="50" width="15" height="40" fill="white" fillOpacity="0.1" />
          <rect x="50" y="30" width="15" height="60" fill="white" fillOpacity="0.1" />
          <rect x="70" y="10" width="15" height="80" fill="white" fillOpacity="0.1" />
        </svg>
      )
    }
  };

  // Default theme if product not found
  const defaultTheme = {
    primaryColor: '#FF0000',
    secondaryColor: '#CC0000',
    icon: <FiGitBranch size={40} />,
    pattern: null
  };

  // Get theme for this product
  const theme = productThemes[id as keyof typeof productThemes] || defaultTheme;

  return (
    <motion.div
      className={`h-full rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-haclab-red' : ''
      }`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      style={{
        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
      }}
    >
      <div className="relative h-full p-6 flex flex-col">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {theme.pattern}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Category badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full font-code mb-4">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>

          {/* Icon and name */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4 text-[#333]">
              {theme.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-white">{name}</h3>
          </div>

          {/* Description */}
          <div
            className="text-white/80 mb-6"
            dangerouslySetInnerHTML={{
              __html: description
            }}
          ></div>

          {/* Technologies */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded font-code text-white/80"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded font-code text-white/80">
                  +{technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered || isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
};

export default CreativeProductCard;
