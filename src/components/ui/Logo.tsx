'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

interface LogoProps {
  variant?: 'default' | 'animated' | 'glitch' | 'terminal' | 'code';
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
  href?: string;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  color = 'light',
  href = '/',
  className = '',
  onClick,
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  // Base component to wrap with Link if href is provided
  const LogoContent = () => {
    // Default logo
    if (variant === 'default') {
      return (
        <div className={`flex items-center ${className}`}>
          <Image
            src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
            alt="Haclab Logo"
            width={color === 'light' ? 120 : 120}
            height={color === 'light' ? 36 : 36}
            className={sizeClasses[size]}
          />
        </div>
      );
    }

    // Animated logo with code icon
    if (variant === 'animated') {
      return (
        <div className={`flex items-center ${className}`}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="mr-2"
          >
            <FiCode className="text-haclab-red text-3xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 1 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <Image
              src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
              alt="Haclab Logo"
              width={color === 'light' ? 100 : 100}
              height={color === 'light' ? 30 : 30}
              className={sizeClasses[size]}
            />
          </motion.div>
        </div>
      );
    }

    // Glitch effect logo
    if (variant === 'glitch') {
      return (
        <div className={`relative ${className}`}>
          <div className="relative">
            <Image
              src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
              alt="Haclab Logo"
              width={color === 'light' ? 120 : 120}
              height={color === 'light' ? 36 : 36}
              className={`${sizeClasses[size]} relative z-10`}
            />
            <div className="absolute top-0 left-0 w-full h-full z-0 glitch-effect">
              <div className="glitch-red"></div>
              <div className="glitch-blue"></div>
            </div>
          </div>
          <style jsx>{`
            .glitch-effect {
              pointer-events: none;
            }
            .glitch-red, .glitch-blue {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url(${color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'});
              background-repeat: no-repeat;
              background-size: contain;
              opacity: 0;
            }
            .glitch-red {
              animation: glitch-anim-1 2.5s infinite linear alternate;
              transform: translate3d(-3px, 0, 0);
              filter: drop-shadow(0 0 1px rgba(228, 30, 38, 0.5));
            }
            .glitch-blue {
              animation: glitch-anim-2 3.5s infinite linear alternate;
              transform: translate3d(3px, 0, 0);
              filter: drop-shadow(0 0 1px rgba(30, 144, 255, 0.5));
            }
            @keyframes glitch-anim-1 {
              0%, 80%, 100% { opacity: 0; }
              40%, 60% { opacity: 0.3; }
            }
            @keyframes glitch-anim-2 {
              0%, 70%, 100% { opacity: 0; }
              30%, 50% { opacity: 0.3; }
            }
          `}</style>
        </div>
      );
    }

    // Terminal-style logo
    if (variant === 'terminal') {
      return (
        <div className={`font-code ${className}`}>
          <div className="bg-dark-surface p-2 rounded border border-dark-border">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-haclab-red">
              <span className="text-green-400">$</span> <span className="text-white">echo</span> <span className="text-yellow-300">"</span>
              <Image
                src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
                alt="Haclab Logo"
                width={color === 'light' ? 80 : 80}
                height={color === 'light' ? 24 : 24}
                className="inline-block mx-1"
              />
              <span className="text-yellow-300">"</span>
            </div>
          </div>
        </div>
      );
    }

    // Code-style logo
    if (variant === 'code') {
      return (
        <div className={`font-code ${className}`}>
          <pre className="bg-dark-surface p-2 rounded border border-dark-border text-sm">
            <code>
              <span className="text-code-keyword">import</span> <span className="text-code-variable">Logo</span> <span className="text-code-keyword">from</span> <span className="text-code-string">'haclab'</span>;
              <br />
              <span className="text-code-keyword">const</span> <span className="text-code-variable">company</span> = <span className="text-code-function">Logo</span>();
              <br />
              <span className="text-code-comment">// Haclab - Custom Software Development</span>
              <br />
              <div className="mt-1">
                <Image
                  src={color === 'light' ? '/assets/images/logo/light-logo.webp' : '/assets/images/logo/logo-dark.webp'}
                  alt="Haclab Logo"
                  width={color === 'light' ? 100 : 100}
                  height={color === 'light' ? 30 : 30}
                  className="inline-block"
                />
              </div>
            </code>
          </pre>
        </div>
      );
    }

    return null;
  };

  // Wrap with Link if href is provided
  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <LogoContent />
      </Link>
    );
  }

  return <div onClick={onClick}><LogoContent /></div>;
};

export default Logo;
