'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import '@/styles/prism-haclab.css';
import { getDefaultFilename, formatCode } from '@/utils/codeUtils';

interface AnimatedCodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  animate?: boolean;
  className?: string;
  typingEffect?: boolean;
  typingSpeed?: number;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

const AnimatedCodeBlock: React.FC<AnimatedCodeBlockProps> = ({
  code,
  language = 'javascript',
  title,
  animate = true,
  className = '',
  typingEffect = false,
  typingSpeed = 30,
  showLineNumbers = true,
  highlightLines = [],
}) => {
  // Generate default title if not provided
  const displayTitle = title || getDefaultFilename(language);

  // Format the code
  const formattedCode = formatCode(code, language);
  const [copied, setCopied] = useState(false);
  const [displayedCode, setDisplayedCode] = useState(typingEffect ? '' : formattedCode);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lines = formattedCode.split('\n');

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Typing effect
  useEffect(() => {
    if (!typingEffect) return;

    if (currentLine < lines.length) {
      const line = lines[currentLine];

      if (currentChar < line.length) {
        const timer = setTimeout(() => {
          setDisplayedCode(prev => prev + line[currentChar]);
          setCurrentChar(currentChar + 1);
        }, typingSpeed);

        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayedCode(prev => prev + '\n');
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, typingSpeed * 2);

        return () => clearTimeout(timer);
      }
    }
  }, [typingEffect, currentLine, currentChar, lines, typingSpeed]);

  // Initialize Prism.js on the client side
  useEffect(() => {
    if (isClient) {
      Prism.highlightAll();
    }
  }, [isClient, displayedCode]);

  // Syntax highlighting function using Prism.js
  const highlightSyntax = (text: string) => {
    if (!text) return '';

    // Map the language prop to Prism's language format
    const prismLanguage = language === 'js' ? 'javascript' : language;

    try {
      // Use Prism to highlight the code
      const highlighted = Prism.highlight(
        text,
        Prism.languages[prismLanguage] || Prism.languages.javascript,
        prismLanguage
      );
      return highlighted;
    } catch (error) {
      console.error('Error highlighting syntax:', error);
      return text;
    }
  };

  const displayLines = typingEffect
    ? displayedCode.split('\n')
    : lines;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Don't render anything on the server side to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`overflow-hidden rounded-lg shadow-lg ${className} bg-dark-surface`} style={{ minHeight: '200px' }}>
        <div className="flex items-center justify-between bg-dark-surface px-4 py-2 border-b border-dark-border">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 font-code text-sm text-gray-300">{displayTitle}</span>
          </div>
        </div>
        <div className="p-4 font-code text-sm leading-relaxed overflow-x-auto bg-transparent">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-dark-bg rounded w-3/4"></div>
              <div className="h-4 bg-dark-bg rounded w-1/2"></div>
              <div className="h-4 bg-dark-bg rounded w-5/6"></div>
              <div className="h-4 bg-dark-bg rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden rounded-lg shadow-lg ${className}`}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between bg-dark-surface px-4 py-2 border-b border-dark-border">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-haclab-red"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 font-code text-sm text-gray-300">{displayTitle}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 rounded bg-dark-bg px-2 py-0.5 text-xs text-gray-400">{language}</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy code"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="p-4 font-code text-sm leading-relaxed overflow-x-auto bg-transparent">
        {/* If using typing effect, render line by line */}
        {typingEffect ? (
          displayLines.map((line, index) => (
            <motion.div
              key={index}
              className="flex"
              variants={animate ? lineVariants : undefined}
            >
              <span className="select-none mr-4 text-gray-500 w-8 text-right">{index + 1}</span>
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html: highlightSyntax(line) || '&nbsp;'
                }}
              />
            </motion.div>
          ))
        ) : (
          // If not using typing effect, render the entire code block with Prism
          <pre className={`language-${language} ${showLineNumbers ? 'line-numbers' : ''} m-0 p-0 bg-transparent`}
               data-line={highlightLines.join(',')}
          >
            <code className={`language-${language} m-0 p-0 bg-transparent`}>
              {formattedCode}
            </code>
          </pre>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedCodeBlock;
