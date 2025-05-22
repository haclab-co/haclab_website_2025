'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiCopy, FiCheck, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import TerminalText from './TerminalText';

interface TerminalOutput {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

interface EnhancedTerminalProps {
  history?: TerminalOutput[];
  initialCommands?: string[];
  prompt?: string;
  title?: string;
  typingSpeed?: number;
  autoStart?: boolean;
  className?: string;
  showTimestamps?: boolean;
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light' | 'transparent';
  maxHeight?: string;
  onCommandSubmit?: (command: string) => void;
}

const EnhancedTerminal: React.FC<EnhancedTerminalProps> = ({
  history = [],
  initialCommands = [],
  prompt = "haclab@dev:~$",
  title = "haclab-terminal",
  typingSpeed = 50,
  autoStart = true,
  className = '',
  showTimestamps = false,
  showLineNumbers = false,
  theme = 'dark',
  maxHeight = '400px',
  onCommandSubmit,
}) => {
  // Add client-side only rendering to prevent hydration errors
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [terminalHistory, setTerminalHistory] = useState<TerminalOutput[]>(history);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(autoStart && initialCommands.length > 0);
  const [commandQueue, setCommandQueue] = useState<string[]>(initialCommands);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Use a fixed timestamp for all new commands to avoid hydration errors
  const fixedTimestamp = useRef(new Date(2023, 0, 1, 12, 0, 0));

  // Get theme-specific classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white text-gray-800 border-gray-200';
      case 'transparent':
        return 'bg-opacity-50 bg-dark-bg text-white border-dark-border';
      case 'dark':
      default:
        return 'bg-code-bg text-code-text border-dark-border';
    }
  };

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory, currentCommand]);

  // Handle typing animation for queued commands
  useEffect(() => {
    if (!isTyping || commandQueue.length === 0 || currentQueueIndex >= commandQueue.length) {
      setIsTyping(false);
      return;
    }

    const currentQueuedCommand = commandQueue[currentQueueIndex];

    if (charIndex < currentQueuedCommand.length) {
      // Still typing current command
      const timer = setTimeout(() => {
        setCurrentCommand(prev => prev + currentQueuedCommand[charIndex]);
        setCharIndex(charIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Finished typing current command
      const timer = setTimeout(() => {
        // Add the command to history
        setTerminalHistory(prev => [
          ...prev,
          {
            type: 'command',
            content: currentCommand,
            timestamp: fixedTimestamp.current
          }
        ]);

        // Reset for next command
        setCurrentCommand("");
        setCharIndex(0);
        setCurrentQueueIndex(currentQueueIndex + 1);
      }, typingSpeed * 10);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentQueueIndex, charIndex, commandQueue, currentCommand, typingSpeed]);

  // Copy terminal content to clipboard
  const handleCopy = () => {
    const content = terminalHistory
      .map(item => {
        if (item.type === 'command') {
          return `${prompt} ${item.content}`;
        }
        return item.content;
      })
      .join('\n');

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Format timestamp with a stable format that won't cause hydration errors
  const formatTimestamp = (date: Date) => {
    // Use a fixed format that will be consistent between server and client
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Return a simple placeholder during server-side rendering
  if (!isClient) {
    return (
      <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
        <div className="flex items-center justify-between bg-dark-surface px-4 py-2 border-b border-dark-border">
          <div className="flex items-center">
            <div className="flex space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 font-code text-sm text-gray-300 flex items-center">
              <FiTerminal className="mr-2" />
              {title}
            </span>
          </div>
        </div>
        <div className={`p-4 font-code text-sm overflow-auto ${getThemeClasses()}`} style={{ maxHeight }}>
          <div className="h-20 flex items-center justify-center">
            <span className="text-gray-500">Loading terminal...</span>
          </div>
        </div>
      </div>
    );
  }

  // Client-side rendering
  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-lg ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: isFullscreen ? 1 : 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between bg-dark-surface px-4 py-2 border-b border-dark-border">
        <div className="flex items-center">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 font-code text-sm text-gray-300 flex items-center">
            <FiTerminal className="mr-2" />
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Copy terminal content"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <FiMinimize2 className="h-4 w-4" /> : <FiMaximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        ref={terminalRef}
        className={`p-4 font-code text-sm overflow-auto ${getThemeClasses()}`}
        style={{ maxHeight: isFullscreen ? 'calc(100vh - 40px)' : maxHeight }}
      >
        {terminalHistory.map((item, index) => (
          <div key={index} className={`mb-1 ${item.type === 'error' ? 'text-red-400' : ''}`}>
            {showLineNumbers && (
              <span className="inline-block w-8 text-right mr-2 text-gray-500">{index + 1}</span>
            )}
            {showTimestamps && item.timestamp && (
              <span className="text-gray-500 mr-2">[{formatTimestamp(item.timestamp)}]</span>
            )}
            {item.type === 'command' && (
              <>
                <span className="text-haclab-red mr-2 font-semibold">{prompt}</span>
                <TerminalText command={item.content} />
              </>
            )}
            {item.type !== 'command' && (
              <span className="pl-0">{item.content}</span>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex">
            {showLineNumbers && (
              <span className="inline-block w-8 text-right mr-2 text-gray-500">
                {terminalHistory.length + 1}
              </span>
            )}
            {showTimestamps && (
              <span className="text-gray-500 mr-2">[{formatTimestamp(fixedTimestamp.current)}]</span>
            )}
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

export default EnhancedTerminal;
