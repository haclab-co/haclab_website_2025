import React, { useMemo } from 'react';
import { Play, Copy, Check, Eye, ChevronRight, CornerDownRight } from 'lucide-react';
import { FileItem } from '../types';
import { getCodeTemplate } from '../utils/codeTemplates';

interface CodeWorkspaceProps {
  activeFile: FileItem;
  viewMode: 'ide' | 'preview';
  setViewMode: (mode: 'ide' | 'preview') => void;
}

export default function CodeWorkspace({ activeFile, viewMode, setViewMode }: CodeWorkspaceProps) {
  const [copied, setCopied] = React.useState(false);

  const fileContent = useMemo(() => {
    return getCodeTemplate(activeFile.name);
  }, [activeFile.name]);

  const splittedLines = useMemo(() => {
    return fileContent.split('\n');
  }, [fileContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe minimal syntax highlighter for visual fidelity
  const formatCodeLine = (line: string, ext: string) => {
    if (!line.trim()) return <span className="text-slate-650">&nbsp;</span>;

    // Comments checker
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic font-normal">{line}</span>;
    }

    if (ext === 'sh') {
      if (line.trim().startsWith('echo')) {
        return (
          <span>
            <span className="text-emerald-400 font-medium">echo</span>
            <span className="text-slate-300">{line.substring(line.indexOf('echo') + 4)}</span>
          </span>
        );
      }
      if (line.trim().startsWith('export')) {
        return (
          <span>
            <span className="text-pink-400">export</span>
            <span className="text-sky-300">{line.substring(line.indexOf('export') + 6)}</span>
          </span>
        );
      }
    }

    if (ext === 'json' || ext === 'yaml') {
      // Key-value colorers
      const matchKey = line.match(/^(\s*)(["']?[a-zA-Z0-9_\-]+["']?)(\s*:\s*|-?\s*)/);
      if (matchKey) {
        const indent = matchKey[1];
        const key = matchKey[2];
        const separator = matchKey[3];
        const value = line.substring(matchKey[0].length);
        return (
          <span>
            <span className="text-slate-350">{indent}</span>
            <span className="text-purple-400 font-medium">{key}</span>
            <span className="text-slate-400">{separator}</span>
            <span className="text-emerald-400">{value}</span>
          </span>
        );
      }
    }

    // Standard JavaScript/TypeScript color highlighting logic
    // Highlight imports, keywords, and returns
    let coloredLine = line;
    const keywords = ['import', 'from', 'export', 'default', 'function', 'const', 'return', 'let', 'var', 'class', 'extends', 'interface', 'type'];
    
    // Simple substitution for visual color rendering
    const tokens = line.split(/(\s+|\(|\)|\{|\}|\[|\]|;|,|=|\.|<|>)/);
    const parsedNodes = tokens.map((token, idx) => {
      if (keywords.includes(token)) {
        return <span key={idx} className="text-pink-400 font-medium">{token}</span>;
      }
      if (token.startsWith('"') && token.endsWith('"')) {
        return <span key={idx} className="text-emerald-400">{token}</span>;
      }
      if (token.startsWith("'") && token.endsWith("'")) {
        return <span key={idx} className="text-emerald-400">{token}</span>;
      }
      if (token.match(/^[0-9]+$/)) {
        return <span key={idx} className="text-amber-400">{token}</span>;
      }
      if (['className', 'id', 'onClick', 'initial', 'animate', 'title', 'category', 'description'].includes(token)) {
        return <span key={idx} className="text-sky-400 italic">{token}</span>;
      }
      if (['div', 'section', 'h1', 'p', 'span', 'button', 'header', 'footer'].includes(token)) {
        return <span key={idx} className="text-rose-400">{token}</span>;
      }
      return <span key={idx} className="text-slate-300">{token}</span>;
    });

    return <>{parsedNodes}</>;
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-slate-950 font-mono text-sm overflow-hidden border-b border-slate-900 md:border-b-0">
      
      {/* Tab bar header */}
      <div className="flex items-center justify-between border-b border-slate-900 px-4 py-2 shrink-0 bg-slate-950/70">
        
        {/* Left Side Tab title */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border-t border-r border-l border-slate-800 rounded-t-md text-slate-200 text-sm font-semibold leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span>{activeFile.name}</span>
          </div>
          <span className="text-[12.5px] text-slate-600 pl-3 hidden sm:inline">
            src/haclab/components/{activeFile.name}
          </span>
        </div>

        {/* Right Side Control Toolbar */}
        <div className="flex items-center gap-2">
          {/* View Render Option inside Editor */}
          <button
            onClick={() => setViewMode('preview')}
            className="flex items-center gap-1 px-2.5 py-1 text-sm text-slate-400 hover:text-brand-red hover:bg-slate-900/50 rounded transition-all cursor-pointer"
            title="Compile and View Preview"
          >
            <Play className="w-3.5 h-3.5 text-brand-red" />
            <span className="hidden sm:inline">Compile & Preview</span>
          </button>

          {/* Copy Script Button */}
          <button
            onClick={handleCopy}
            className="p-1 text-slate-500 hover:text-white hover:bg-slate-900/30 rounded transition cursor-pointer"
            title="Copy Source Code of active file"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-red" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Editor Content Area with line numbers */}
      <div className="flex-1 overflow-auto p-4 flex gap-4 select-text leading-relaxed">
        
        {/* Line Numbers Layout */}
        <div className="text-right text-slate-700 select-none text-sm leading-6 pr-2 border-r border-slate-900/50 font-normal w-8">
          {splittedLines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Highlighted Script Code Block */}
        <div className="flex-1 text-slate-350 text-sm font-mono leading-6 overflow-x-auto whitespace-pre">
          {splittedLines.map((line, idx) => (
            <div key={idx} className="hover:bg-slate-900/20 px-1 rounded transition-colors duration-100">
              {formatCodeLine(line, activeFile.extension)}
            </div>
          ))}
        </div>

      </div>

      {/* Compiler Action Overlay banner if in .sh code */}
      {activeFile.extension === 'sh' && (
        <div className="p-3 bg-rose-500/5 border-t border-rose-500/10 text-[13px] flex justify-between items-center px-4 font-mono">
          <div className="flex items-center gap-1.5 text-rose-400">
            <CornerDownRight className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive script is ready to run and harvest feedback cards in Terminal!</span>
          </div>
          <button
            onClick={() => {
              const terminalElement = document.getElementById('terminal-input-field');
              if (terminalElement) {
                terminalElement.focus();
              }
            }}
            className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 rounded transition cursor-pointer"
          >
            Open Terminal
          </button>
        </div>
      )}

    </div>
  );
}
