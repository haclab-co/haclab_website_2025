/**
 * Utility functions for code-related components
 */

/**
 * Maps language names to file extensions
 */
export const getFileExtension = (language: string): string => {
  const extensionMap: Record<string, string> = {
    javascript: 'js',
    js: 'js',
    typescript: 'ts',
    ts: 'ts',
    jsx: 'jsx',
    tsx: 'tsx',
    html: 'html',
    css: 'css',
    scss: 'scss',
    json: 'json',
    python: 'py',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    csharp: 'cs',
    ruby: 'rb',
    php: 'php',
    go: 'go',
    rust: 'rs',
    swift: 'swift',
    kotlin: 'kt',
    bash: 'sh',
    shell: 'sh',
    sql: 'sql',
    yaml: 'yml',
    markdown: 'md',
    xml: 'xml',
  };

  return extensionMap[language.toLowerCase()] || language;
};

/**
 * Gets a default filename based on language
 */
export const getDefaultFilename = (language: string, title?: string): string => {
  const extension = getFileExtension(language);

  if (title) {
    // Convert title to kebab-case and add extension
    const kebabTitle = title.toLowerCase().replace(/\s+/g, '-');
    return `${kebabTitle}.${extension}`;
  }

  // Default filenames by language
  const defaultNames: Record<string, string> = {
    javascript: 'script.js',
    typescript: 'script.ts',
    jsx: 'component.jsx',
    tsx: 'component.tsx',
    html: 'index.html',
    css: 'styles.css',
    scss: 'styles.scss',
    json: 'data.json',
    python: 'script.py',
    java: 'Main.java',
    c: 'main.c',
    cpp: 'main.cpp',
    bash: 'script.sh',
    sql: 'query.sql',
  };

  return defaultNames[language.toLowerCase()] || `code.${extension}`;
};

/**
 * Formats code based on language
 */
export const formatCode = (code: string, language: string): string => {
  // Simple formatting for demonstration
  // In a real app, you might want to use a proper formatter like prettier

  // Remove extra blank lines at start and end
  let formatted = code.trim();

  // Ensure code ends with a newline
  if (!formatted.endsWith('\n')) {
    formatted += '\n';
  }

  return formatted;
};

/**
 * Parses a terminal command into colored segments
 */
export interface CommandSegment {
  text: string;
  type: 'command' | 'option' | 'path' | 'url' | 'string' | 'number' | 'operator' | 'env' | 'plain';
}

export const parseTerminalCommand = (command: string): CommandSegment[] => {
  if (!command) return [];

  const segments: CommandSegment[] = [];
  let remainingText = command;
  let lastIndex = 0;

  // Helper function to add a plain text segment
  const addPlainSegment = (end: number) => {
    if (end > lastIndex) {
      const text = remainingText.substring(lastIndex, end);
      if (text) {
        segments.push({ text, type: 'plain' });
      }
    }
  };

  // Process the command to identify different parts
  const patterns = [
    // Commands (first word in the line)
    { regex: /^(\w+)/, type: 'command' },

    // Options and flags (e.g., --help, -v)
    { regex: /\s(--?\w+(-\w+)*)/, type: 'option' },

    // Paths and filenames
    { regex: /\s([\w.-]+\.\w+)/, type: 'path' },
    { regex: /(\/[\w.-]+)+/, type: 'path' },

    // URLs
    { regex: /(https?:\/\/[^\s]+)/, type: 'url' },

    // Quoted strings
    { regex: /("([^"\\]|\\.)*")/, type: 'string' },
    { regex: /('([^'\\]|\\.)*')/, type: 'string' },

    // Numbers
    { regex: /\s(\d+)/, type: 'number' },

    // Pipe and redirection operators
    { regex: /(\||>|>>|<|<<|&|\|\||\&\&)/, type: 'operator' },

    // Environment variables
    { regex: /(\$\w+|\$\{\w+\})/, type: 'env' },
  ];

  // Find all matches for all patterns
  const matches: { index: number, length: number, text: string, type: string }[] = [];

  patterns.forEach(pattern => {
    const regex = new RegExp(pattern.regex, 'g');
    let match;

    while ((match = regex.exec(remainingText)) !== null) {
      // If the pattern has a capture group, use that
      const matchText = match[1] || match[0];
      const startIndex = match.index + (match[0].indexOf(matchText));

      matches.push({
        index: startIndex,
        length: matchText.length,
        text: matchText,
        type: pattern.type
      });
    }
  });

  // Sort matches by their position in the string
  matches.sort((a, b) => a.index - b.index);

  // Process matches in order, adding plain text segments between matches
  for (const match of matches) {
    // Add plain text before this match
    addPlainSegment(match.index);

    // Add the matched segment
    segments.push({
      text: match.text,
      type: match.type as CommandSegment['type']
    });

    // Update lastIndex to after this match
    lastIndex = match.index + match.length;
  }

  // Add any remaining text
  if (lastIndex < remainingText.length) {
    segments.push({
      text: remainingText.substring(lastIndex),
      type: 'plain'
    });
  }

  return segments;
};
