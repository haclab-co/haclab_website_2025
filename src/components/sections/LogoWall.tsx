'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FiCode } from 'react-icons/fi';
import Logo from '../ui/Logo';

interface LogoWallProps {
  className?: string;
}

const LogoWall: React.FC<LogoWallProps> = ({ className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10]);

  // Create a grid of logos with different variants
  const logoVariants = [
    { variant: 'default', color: 'light' },
    { variant: 'animated', color: 'light' },
    { variant: 'glitch', color: 'light' },
    { variant: 'terminal', color: 'light' },
    { variant: 'code', color: 'light' },
    { variant: 'default', color: 'dark' },
    { variant: 'animated', color: 'dark' },
    { variant: 'glitch', color: 'dark' },
    { variant: 'terminal', color: 'dark' },
    { variant: 'code', color: 'dark' },
  ];

  // Create a grid of floating logos
  const floatingLogos = [
    { x: '10%', y: '20%', delay: 0, size: 'sm' },
    { x: '30%', y: '60%', delay: 0.5, size: 'md' },
    { x: '70%', y: '30%', delay: 1, size: 'sm' },
    { x: '85%', y: '70%', delay: 1.5, size: 'md' },
    { x: '50%', y: '40%', delay: 2, size: 'lg' },
  ];

  return (
    <div ref={ref} className={`relative min-h-[50vh] overflow-hidden ${className}`}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Floating logos in the background */}
      {floatingLogos.map((logo, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ 
            left: logo.x, 
            top: logo.y,
            opacity: 0.2,
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ 
            duration: 8,
            delay: logo.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Image
            src="/assets/images/logo/light-logo.webp"
            alt="Haclab Logo"
            width={logo.size === 'sm' ? 80 : logo.size === 'md' ? 120 : 180}
            height={logo.size === 'sm' ? 24 : logo.size === 'md' ? 36 : 54}
            className="opacity-20"
          />
        </motion.div>
      ))}
      
      {/* Main content */}
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        style={{ opacity, scale, rotateX }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-haclab-red">Brand</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The Haclab logo represents our commitment to innovative software development
            and modern technology solutions. Here are different ways we showcase our brand.
          </p>
        </div>
        
        {/* Logo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logoVariants.map((logoProps, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface p-6 rounded-lg border border-dark-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(228, 30, 38, 0.3)",
                borderColor: "#E41E26",
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <Logo 
                    variant={logoProps.variant as any} 
                    color={logoProps.color as any} 
                    size="md" 
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-code text-sm text-gray-400">
                    {logoProps.variant} / {logoProps.color}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Code snippet */}
        <motion.div 
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-dark-surface p-4 rounded-lg border border-dark-border">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-400 font-code">Logo.tsx</span>
            </div>
            <pre className="font-code text-sm overflow-x-auto">
              <code>
                <span className="text-code-keyword">import</span> <span className="text-code-variable">Logo</span> <span className="text-code-keyword">from</span> <span className="text-code-string">'@/components/ui/Logo'</span>;
                <br /><br />
                <span className="text-code-comment">// Use the Logo component in your page</span>
                <br />
                <span className="text-code-keyword">export default function</span> <span className="text-code-function">Page</span>() {'{'}
                <br />
                {'  '}<span className="text-code-keyword">return</span> (
                <br />
                {'    '}&lt;<span className="text-code-variable">div</span>&gt;
                <br />
                {'      '}&lt;<span className="text-code-variable">Logo</span> <span className="text-code-keyword">variant</span>=<span className="text-code-string">"animated"</span> <span className="text-code-keyword">color</span>=<span className="text-code-string">"light"</span> /&gt;
                <br />
                {'    '}&lt;/<span className="text-code-variable">div</span>&gt;
                <br />
                {'  '});
                <br />
                {'}'}
              </code>
            </pre>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LogoWall;
