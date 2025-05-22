'use client';

import React from 'react';
import { CommandSegment, parseTerminalCommand } from '@/utils/codeUtils';

interface TerminalTextProps {
  command: string;
  className?: string;
}

const TerminalText: React.FC<TerminalTextProps> = ({ command, className = '' }) => {
  const segments = parseTerminalCommand(command);

  // Get the appropriate class for each segment type
  const getSegmentClass = (type: CommandSegment['type']): string => {
    switch (type) {
      case 'command':
        return 'text-green-400 font-semibold';
      case 'option':
        return 'text-blue-400';
      case 'path':
        return 'text-yellow-300';
      case 'url':
        return 'text-blue-300 underline';
      case 'string':
        return 'text-haclab-light-red';
      case 'number':
        return 'text-purple-400';
      case 'operator':
        return 'text-haclab-red font-bold';
      case 'env':
        return 'text-cyan-300';
      case 'plain':
      default:
        return '';
    }
  };

  return (
    <span className={className}>
      {segments.map((segment, index) => (
        <span key={index} className={getSegmentClass(segment.type)}>
          {segment.text}
        </span>
      ))}
    </span>
  );
};

export default TerminalText;
