import React from 'react';
import { 
  Folder, 
  ChevronRight, 
  ChevronDown, 
  FileCode, 
  FileJson, 
  FileText, 
  FileEdit, 
  Terminal, 
  Cpu, 
  Mail, 
  Workflow
} from 'lucide-react';
import { FileItem, FileExtension } from '../types';
import { filesList } from '../data/haclabData';

interface FileTreeProps {
  activeFile: FileItem;
  setActiveFile: (file: FileItem) => void;
  onRunTerminalScript: () => void;
}

export default function FileTree({ activeFile, setActiveFile, onRunTerminalScript }: FileTreeProps) {
  
  // Icon selector based on file configurations
  const getFileIcon = (ext: FileExtension) => {
    switch (ext) {
      case 'tsx':
        return <FileCode className="w-4 h-4 text-sky-400 shrink-0" />;
      case 'json':
        return <FileJson className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'yaml':
        return <FileText className="w-4 h-4 text-purple-400 shrink-0" />;
      case 'md':
        return <FileEdit className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'sh':
        return <Terminal className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />;
      default:
        return <FileCode className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  return (
    <div className="w-full h-full bg-slate-950/70 border-r border-slate-900 border-b md:border-b-0 flex flex-col font-mono text-sm select-none">
      
      {/* Sidebar Label Section */}
      <div className="px-4 py-3 border-b border-slate-900/80 flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider text-[12.5px]">
        <span>Workspace Files Explorer</span>
        <Cpu className="w-3.5 h-3.5 text-slate-600" />
      </div>

      {/* Directory Folder Layout */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        
        {/* Core project block */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 px-1 py-0.5 font-medium">
            <ChevronDown className="w-3.5 h-3.5 text-slate-650 shrink-0" />
            <Folder className="w-4 h-4 text-amber-500/80 shrink-0" />
            <span className="tracking-tight">src (haclab-portal-core)</span>
          </div>

          <div className="pl-6 border-l border-slate-900 ml-3.5 space-y-1">
            {filesList.map((file) => {
              const isActive = activeFile.id === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file)}
                  className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-md transition-all duration-150 group text-left cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 border border-slate-800 text-white' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {getFileIcon(file.extension)}
                    <span className="truncate tracking-tight">{file.name}</span>
                  </div>
                  {file.extension === 'sh' && (
                    <span className="text-[13.5px] px-1 py-0.2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded shrink-0 group-hover:bg-rose-500/20">
                      Exec
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shortcuts / System Actions block */}
        <div className="space-y-2 pt-2 border-t border-slate-900">
          <div className="text-slate-500 px-1 font-semibold uppercase tracking-wider text-[13.5px]">
            Scripts Shortcuts
          </div>
          <div className="space-y-1 Pl-1">
            <button
              onClick={onRunTerminalScript}
              className="w-full flex items-center gap-2 py-1.5 px-2 text-left text-slate-400 hover:bg-slate-900/30 hover:text-rose-400 rounded-md cursor-pointer transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-rose-500" />
              <span>sh.run Contact_Config.sh</span>
            </button>
          </div>
        </div>

      </div>

      {/* Workspace Footer Specs */}
      <div className="p-3 border-t border-slate-1000 bg-slate-950/90 text-[12.5px] text-slate-500 space-y-1 bg-slate-950/80">
        <div className="flex items-center justify-between">
          <span>Active project:</span>
          <span className="text-slate-300 font-medium">haclab-next-v3</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Target platform:</span>
          <span className="text-brand-red font-semibold animate-pulse">production</span>
        </div>
      </div>

    </div>
  );
}
