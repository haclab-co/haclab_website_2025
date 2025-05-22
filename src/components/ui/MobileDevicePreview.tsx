'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiBatteryCharging, FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';

interface MobileDevicePreviewProps {
  children: ReactNode;
  title?: string;
  className?: string;
  animate?: boolean;
  deviceColor?: 'black' | 'white' | 'gray';
  showStatusBar?: boolean;
  showNavigationBar?: boolean;
}

const MobileDevicePreview: React.FC<MobileDevicePreviewProps> = ({
  children,
  title = 'Haclab App',
  className = '',
  animate = true,
  deviceColor = 'black',
  showStatusBar = true,
  showNavigationBar = true,
}) => {
  const deviceColorClasses = {
    black: 'bg-black border-gray-800',
    white: 'bg-white border-gray-300',
    gray: 'bg-gray-800 border-gray-700',
  };

  const textColorClasses = {
    black: 'text-white',
    white: 'text-black',
    gray: 'text-white',
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      className={`relative ${className}`}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Device frame */}
      <div className={`rounded-[40px] overflow-hidden border-[10px] shadow-xl ${deviceColorClasses[deviceColor]}`}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-20"></div>
        
        {/* Status bar */}
        {showStatusBar && (
          <div className={`h-10 px-6 flex items-center justify-between ${deviceColor === 'white' ? 'bg-gray-100' : 'bg-gray-900'} ${textColorClasses[deviceColor]}`}>
            <div className="text-sm font-medium">{currentTime}</div>
            <div className="flex items-center space-x-2">
              <FiWifi size={14} />
              <div className="text-sm font-medium">100%</div>
              <FiBatteryCharging size={14} />
            </div>
          </div>
        )}
        
        {/* App header */}
        <div className={`px-4 py-3 ${deviceColor === 'white' ? 'bg-white' : 'bg-gray-900'} border-b ${deviceColor === 'white' ? 'border-gray-200' : 'border-gray-800'} ${textColorClasses[deviceColor]}`}>
          <div className="text-center font-medium">{title}</div>
        </div>
        
        {/* Content area */}
        <div className={`h-[500px] overflow-y-auto ${deviceColor === 'white' ? 'bg-gray-50' : 'bg-gray-900'} ${textColorClasses[deviceColor]}`}>
          {children}
        </div>
        
        {/* Navigation bar */}
        {showNavigationBar && (
          <div className={`h-16 px-6 flex items-center justify-between ${deviceColor === 'white' ? 'bg-white' : 'bg-gray-900'} border-t ${deviceColor === 'white' ? 'border-gray-200' : 'border-gray-800'} ${textColorClasses[deviceColor]}`}>
            <button className="p-2 rounded-full hover:bg-gray-800/10">
              <FiArrowLeft size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800/10">
              <FiHome size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800/10">
              <FiArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Device shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full"></div>
    </motion.div>
  );
};

export default MobileDevicePreview;
