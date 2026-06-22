import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, RefreshCw, Send, Sparkles } from 'lucide-react';
import { companyProfile, servicesData, projectsData } from '../data/haclabData';

interface TerminalLog {
  type: 'input' | 'output' | 'system' | 'success';
  text: string;
}

interface TerminalPaneProps {
  onShowContactDetails: () => void;
  runTriggerCount: number;
}

export default function TerminalPane({ onShowContactDetails, runTriggerCount }: TerminalPaneProps) {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    { type: 'system', text: 'Haclab Computational Terminal Shell v3.0' },
    { type: 'system', text: 'Type "help" to display list of system commands.' },
    { type: 'output', text: `Loaded environment: ${companyProfile.fullName}` }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle external execution requests
  useEffect(() => {
    if (runTriggerCount > 0) {
      executeCommand('run Contact_Config.sh');
    }
  }, [runTriggerCount]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...logs, { type: 'input' as const, text: `$ ${cmd}` }];

    if (trimmed === 'help') {
      newLogs.push(
        { type: 'output', text: 'Available Command Utilities:' },
        { type: 'output', text: '  about                  - Print overview of Haclab' },
        { type: 'output', text: '  services               - List core products & technical capabilities' },
        { type: 'output', text: '  projects / portfolio   - Overview of high-throughput client systems' },
        { type: 'output', text: '  clear                  - Clear terminal logs' },
        { type: 'output', text: '  run Contact_Config.sh  - Export Haclab communication lines & active channels' }
      );
    } else if (trimmed === 'about') {
      newLogs.push(
        { type: 'output', text: '--- COMPANY IDENTITY OVERVIEW ---' },
        { type: 'output', text: companyProfile.summary },
        { type: 'output', text: `Founded: ${companyProfile.foundedYear} by ${companyProfile.founder}` },
        { type: 'output', text: `Headquarters: ${companyProfile.location}` }
      );
    } else if (trimmed === 'services') {
      newLogs.push({ type: 'output', text: '--- HACLAB SERVICE PILLARS ---' });
      servicesData.forEach((s) => {
        newLogs.push(
          { type: 'success', text: `* ${s.title}` },
          { type: 'output', text: `   Stack: [ ${s.technologies.join(', ')} ]` },
          { type: 'output', text: `   Definition: ${s.shortDescription}` }
        );
      });
    } else if (trimmed === 'projects' || trimmed === 'portfolio') {
      newLogs.push({ type: 'output', text: '--- SEISMIC DEPLOYMENT HISTORY ---' });
      projectsData.forEach((p) => {
        newLogs.push(
          { type: 'success', text: `[${p.year}] ${p.title} (${p.category})` },
          { type: 'output', text: `   Impact: ${p.description}` },
          { type: 'output', text: `   Technologies: ${p.techStack.join(', ')}` }
        );
      });
    } else if (trimmed === 'clear') {
      setLogs([
        { type: 'system', text: 'Terminal logs cleared.' },
        { type: 'system', text: 'Type "help" to list available commands.' }
      ]);
      setInputVal('');
      return;
    } else if (trimmed === 'run contact_config.sh' || trimmed.includes('contact_config.sh') || trimmed === 'contact') {
      newLogs.push(
        { type: 'system', text: 'Executing Contact_Config.sh...' },
        { type: 'output', text: `Email: ${companyProfile.email}` },
        { type: 'output', text: `Phone: ${companyProfile.phone}` },
        { type: 'output', text: `Location: ${companyProfile.location}` },
        { type: 'success', text: '» Registration line initiated! Please check "Get in Touch" or use Web Preview to send correspondence.' }
      );
      // Trigger side callback if exists
      onShowContactDetails();
    } else {
      newLogs.push(
        { type: 'output', text: `bash: command not found: ${cmd}` },
        { type: 'output', text: 'Type "help" to output valid CLI scripts.' }
      );
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="bg-slate-950 border-t border-slate-900 h-64 shrink-0 flex flex-col font-mono text-sm select-none">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900 bg-slate-1000/60 font-semibold select-none">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4 text-brand-red-bright animate-pulse" />
          <span>Interactive Shell Console</span>
        </div>
        <button
          onClick={() => executeCommand('clear')}
          aria-label="Clear terminal logs"
          className="text-slate-605 text-[12.5px] hover:text-white transition flex items-center gap-1 cursor-pointer"
          title="Reset shell session logs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset logs</span>
        </button>
      </div>

      {/* Terminal logs list stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text leading-relaxed">
        {logs.map((log, idx) => {
          let logColor = 'text-slate-300';
          if (log.type === 'input') logColor = 'text-sky-400 font-medium';
          if (log.type === 'system') logColor = 'text-slate-500 italic';
          if (log.type === 'success') logColor = 'text-brand-red-bright font-semibold';

          return (
            <div key={idx} className={`${logColor} whitespace-pre-wrap leading-relaxed`}>
              {log.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Input form */}
      <form onSubmit={handleCommandSubmit} className="flex border-t border-slate-900 bg-slate-950/50">
        <div className="flex items-center px-4 text-slate-500 select-none font-medium">
          <span>haclab@core:~$</span>
        </div>
        <input
          id="terminal-input-field"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type commands... (e.g. 'help', 'services', 'about', 'contact')"
          className="flex-1 py-2.5 bg-transparent border-none text-slate-200 outline-none placeholder-slate-650 tracking-wide font-medium"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Execute command"
          className="px-4 py-2 text-slate-400 hover:text-white flex items-center gap-1.5 transition border-l border-slate-900 cursor-pointer"
        >
          <span className="hidden sm:inline">Exec</span>
          <Send className="w-3.5 h-3.5 text-brand-red-bright" />
        </button>
      </form>

    </div>
  );
}
