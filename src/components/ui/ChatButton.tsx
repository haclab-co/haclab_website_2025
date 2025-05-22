'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';
import useTawkTo from '@/hooks/useTawkTo';

interface ChatButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showIcon?: boolean;
}

/**
 * A button component that opens the Tawk.to chat widget
 */
const ChatButton: React.FC<ChatButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  text = 'Chat with us',
  showIcon = true
}) => {
  const { maximizeWidget } = useTawkTo();

  // Determine button styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-haclab-red hover:bg-haclab-dark-red text-white';
      case 'secondary':
        return 'bg-dark-surface hover:bg-dark-surface/80 text-white border border-haclab-red';
      case 'outline':
        return 'bg-transparent hover:bg-haclab-red/10 text-haclab-red border border-haclab-red';
      default:
        return 'bg-haclab-red hover:bg-haclab-dark-red text-white';
    }
  };

  // Determine button size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs py-1 px-3';
      case 'md':
        return 'text-sm py-2 px-4';
      case 'lg':
        return 'text-base py-3 px-6';
      default:
        return 'text-sm py-2 px-4';
    }
  };

  return (
    <motion.button
      className={`rounded-md font-code transition-colors flex items-center justify-center ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      onClick={maximizeWidget}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showIcon && <FiMessageSquare className="mr-2" />}
      {text}
    </motion.button>
  );
};

export default ChatButton;
