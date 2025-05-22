'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGitBranch } from 'react-icons/fi';

interface AppCardProps {
  id: string;
  name: string;
  type: string;
  description?: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
  technologies?: string[];
  onMoreClick?: (e: React.MouseEvent) => void;
}

const AppCard: React.FC<AppCardProps> = ({
  id,
  name,
  type,
  description,
  color,
  isActive,
  onClick,
  technologies = [],
  onMoreClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a lighter shade of the color for the gradient
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1)}`;
  };

  const secondaryColor = lightenColor(color, 10);

  // SVG pattern based on app id
  const getPattern = () => {
    switch (id) {
      case 'abacus':
        return (
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
        );
      case 'homz':
      case 'inncontrol':
        return (
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
        );
      case 'kanify':
      case 'zenwrench':
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 L30,30 L20,40 L30,50 L20,60 L30,70 L20,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
            <path d="M50,20 L60,30 L50,40 L60,50 L50,60 L60,70 L50,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
            <path d="M80,20 L90,30 L80,40 L90,50 L80,60 L90,70 L80,80" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'lenkit':
      case 'kyeyo':
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,10 L90,30 L10,30 Z" fill="white" fillOpacity="0.1" />
            <path d="M10,40 L90,40 L90,60 L10,60 Z" fill="white" fillOpacity="0.1" />
            <path d="M10,70 L90,70 L90,90 L10,90 Z" fill="white" fillOpacity="0.1" />
          </svg>
        );
      case 'smart':
      case 'evia':
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="white" fillOpacity="0.1" />
            <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="white" fillOpacity="0.05" />
          </svg>
        );
      case 'prosy':
      case 'mission-control':
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="white" strokeOpacity="0.1" strokeWidth="2" fill="none" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="5" fill="white" fillOpacity="0.05" />
          </svg>
        );
    }
  };

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
        background: `linear-gradient(135deg, ${color}, ${secondaryColor})`,
      }}
    >
      <div className="relative h-full p-6 flex flex-col">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {getPattern()}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Category badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full font-code mb-4">
            {type}
          </div>

          {/* Icon and name */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4 overflow-hidden">
              <div className="relative w-10 h-10">
                <Image
                  src={`/images/app-icons/${id}.png`}
                  alt={`${name} icon`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <h3 className="text-xl font-display font-bold text-white">{name}</h3>
          </div>

          {/* Description */}
          {description && (
            <div
              className="text-white/80 mb-6"
              dangerouslySetInnerHTML={{
                __html: description
              }}
            ></div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mt-auto">
              <div className="flex items-center justify-between">
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
                {onMoreClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      onMoreClick(e);
                    }}
                    className="ml-2 text-xs bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm px-3 py-1 rounded font-code text-white font-medium"
                  >
                    More
                  </button>
                )}
              </div>
            </div>
          )}
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

export default AppCard;
