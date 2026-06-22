import React from 'react';
import { Terminal, Eye, Code, Compass, Sparkles, Server, MapPin, Sun, Moon, Laptop } from 'lucide-react';
import { ViewMode } from '../types';
import { companyProfile } from '../data/haclabData';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  serverOk: boolean;
  activeTime: string;
  theme: 'dark' | 'light' | 'adaptive';
  setTheme: (theme: 'dark' | 'light' | 'adaptive') => void;
  onLogoClick?: () => void;
}

export default function Header({ viewMode, setViewMode, serverOk, activeTime, theme, setTheme, onLogoClick }: HeaderProps) {
  return (
    <header className="bg-slate-950/90 border-b border-slate-900 px-3 sm:px-6 py-2 sm:py-3 shrink-0 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2">
        
        {/* Left Side: Brand Indicator with True Haclab Logo */}
        <button 
          onClick={onLogoClick}
          className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer text-left bg-transparent border-none p-1 -m-1 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-red/35 hover:opacity-90 transition-opacity"
        >
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-red/10 border border-brand-red/30 shrink-0">
            <img 
              src="/assets/images/logo/light-logo.webp" 
              alt="Haclab Logo" 
              width="20" height="20" loading="eager"
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If logo fails to load for any reason, show an elegant H.
                (e.target as HTMLElement).style.display = 'none';
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  const span = document.createElement('span');
                  span.className = "font-mono font-bold text-sm sm:text-sm text-brand-red tracking-tighter";
                  span.innerText = "H.";
                  parent.appendChild(span);
                }
              }}
            />
            <span className="absolute -top-0.5 -right-0.5 flex w-1.5 h-1.5 sm:w-2 sm:h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-brand-red"></span>
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans font-semibold text-white tracking-tight leading-none text-sm sm:text-sm md:text-base whitespace-nowrap">{companyProfile.name}</span>
              <span className="px-1 py-0.5 sm:px-1.5 sm:py-0.5 text-[13px] sm:text-[13.5px] font-mono tracking-tight bg-slate-905 border border-slate-800 text-slate-400 rounded shrink-0">v3</span>
            </div>
            <p className="text-[12.5px] font-mono text-slate-500 tracking-tight leading-none mt-1 sm:block hidden">
              {companyProfile.fullName}
            </p>
          </div>
        </button>

        {/* Center Side: Active Systems Stats Card focusing on Brand Red */}
        <div className="hidden md:flex items-center gap-4 text-[13px] font-mono text-slate-400 bg-slate-900/30 border border-slate-900/60 rounded-full px-4 py-1">
          <div className="flex items-center gap-1.5">
            <Server className={`w-3.5 h-3.5 ${serverOk ? 'text-brand-red' : 'text-slate-500'}`} />
            <span>sys_node: <span className="text-white font-medium">online</span></span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-red/75" />
            <span>region: <span className="text-white font-medium">KLA-UG</span></span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-brand-red animate-pulse">●</span>
            <span>time: <span className="text-white font-medium">{activeTime}</span></span>
          </div>
        </div>

        {/* Right Side: Toolbar Containers */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Theme switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-900/80 border border-slate-800 p-0.5 sm:p-1 rounded-lg select-none min-h-[44px]">
            <button
              onClick={() => setTheme('light')}
              aria-label="Light mode"
              className={`p-1 sm:p-1.5 rounded-md transition cursor-pointer ${
                theme === 'light'
                  ? 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
              title="Light Mode (Swiss modern)"
            >
              <Sun className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              aria-label="Dark mode"
              className={`p-1 sm:p-1.5 rounded-md transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
              title="Dark Mode (Kampala Cyber)"
            >
              <Moon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
            <button
              onClick={() => setTheme('adaptive')}
              aria-label="Adaptive theme"
              className={`p-1 sm:p-1.5 rounded-md transition cursor-pointer ${
                theme === 'adaptive'
                  ? 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
              title="Adoptive (Matches system)"
            >
              <Laptop className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            </button>
          </div>

          {/* View switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-900/80 border border-slate-800 p-0.5 sm:p-1 rounded-lg min-h-[44px]">
            <button
              id="toggle-ide-mode"
              onClick={() => setViewMode('ide')}
              aria-label="Developer IDE view"
              className={`flex items-center gap-1 px-1.5 py-1 sm:px-3 sm:py-1.5 text-sm font-mono rounded-md transition-all duration-205 cursor-pointer ${
                viewMode === 'ide'
                  ? 'bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
              title="Switch to Interactive Code/Developer Environment"
            >
              <Code className="w-3 sm:w-3.5 h-3 sm:h-3.5 pb-0.5" />
              <span className="hidden sm:inline">Developer IDE</span>
            </button>
            
            <button
              id="toggle-preview-mode"
              onClick={() => setViewMode('preview')}
              aria-label="Web preview view"
              className={`flex items-center gap-1 px-1.5 py-1 sm:px-3 sm:py-1.5 text-sm font-mono rounded-md transition-all duration-205 cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
              title="Switch to Polished Agency Live Website Preview"
            >
              <Eye className="w-3 sm:w-3.5 h-3 sm:h-3.5 pb-0.5" />
              <span className="hidden sm:inline">Web Preview</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
