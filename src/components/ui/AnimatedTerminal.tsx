'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TerminalText from './TerminalText';

interface AnimatedTerminalProps {
  commands: string[];
  typingSpeed?: number;
  prompt?: string;
  autoStart?: boolean;
  loop?: boolean;
  className?: string;
}

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({
  commands,
  typingSpeed = 50,
  prompt = "haclab@dev:~$",
  autoStart = true,
  loop = false,
  className = '',
}) => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(autoStart);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    if (commandIndex >= commands.length) {
      if (loop) {
        // Reset for loop
        setCommandIndex(0);
        setCharIndex(0);
        setCurrentCommand("");
        return;
      }
      setShowCursor(false);
      return;
    }

    const command = commands[commandIndex];

    if (charIndex < command.length) {
      // Still typing current command
      const timer = setTimeout(() => {
        setCurrentCommand(prev => prev + command[charIndex]);
        setCharIndex(charIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Finished typing current command
      const timer = setTimeout(() => {
        setDisplayedCommands([...displayedCommands, currentCommand]);
        setCurrentCommand("");
        setCharIndex(0);
        setCommandIndex(commandIndex + 1);
      }, typingSpeed * 10);

      return () => clearTimeout(timer);
    }
  }, [isTyping, commandIndex, charIndex, commands, currentCommand, displayedCommands, loop, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-lg ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center bg-dark-surface px-4 py-2 border-b border-dark-border">
        <div className="flex space-x-1.5">
          <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-2 font-code text-sm text-gray-300">haclab-terminal</span>
      </div>
      <div className="p-4 font-code text-sm text-code-text border border-dark-border rounded-b-lg bg-opacity-50 bg-dark-bg">
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="mb-1">
            <span className="text-haclab-red mr-2 font-semibold">{prompt}</span>
            <TerminalText command={cmd} />
          </div>
        ))}
        {isTyping && (
          <div className="flex">
            <span className="text-haclab-red mr-2 font-semibold">{prompt}</span>
            <TerminalText command={currentCommand} />
            {showCursor && (
              <motion.span
                className="inline-block w-2 h-4 bg-code-text ml-0.5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedTerminal;
