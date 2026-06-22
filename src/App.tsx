import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import FileTree from './components/FileTree';
import CodeWorkspace from './components/CodeWorkspace';
import TerminalPane from './components/TerminalPane';
import LoadingFallback from './components/LoadingFallback';

const PreviewWorkspace = lazy(() => import('./components/PreviewWorkspace'));
import { ViewMode, FileItem } from './types';
import { filesList } from './data/haclabData';
import LocalBusinessSchema from './components/seo/LocalBusinessSchema';
import OrganizationSchema from './components/seo/OrganizationSchema';
import WebsiteSchema from './components/seo/WebsiteSchema';
import SitelinksSearchBoxSchema from './components/seo/SitelinksSearchBoxSchema';
import GoogleAnalytics from './components/seo/GoogleAnalytics';
import { ANALYTICS_CONFIG } from './config/analytics';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [activeFile, setActiveFile] = useState<FileItem>(filesList[0]);
  const [terminalTriggerCount, setTerminalTriggerCount] = useState(0);
  const [serverOk, setServerOk] = useState(true);
  const [activeTime, setActiveTime] = useState('00:00:00 UTC');
  const [theme, setTheme] = useState<'dark' | 'light' | 'adaptive'>(() => {
    return (localStorage.getItem('haclab-theme') as 'dark' | 'light' | 'adaptive') || 'dark';
  });

  // Dynamic theme subscription
  useEffect(() => {
    localStorage.setItem('haclab-theme', theme);
    const updateThemeClass = () => {
      const rootElement = document.documentElement;
      rootElement.classList.remove('theme-dark', 'theme-light');
      
      let activeClass = theme;
      if (theme === 'adaptive') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        activeClass = systemIsDark ? 'dark' : 'light';
      }
      rootElement.classList.add(`theme-${activeClass}`);
    };

    updateThemeClass();

    if (theme === 'adaptive') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateThemeClass();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  // Real-time clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as HH:MM:SS UTC
      const timeStr = now.toLocaleTimeString('en-US', { 
        timeZone: 'UTC', 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setActiveTime(`${timeStr} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectFile = (file: FileItem) => {
    setActiveFile(file);
    if (file.extension === 'sh') {
      setTerminalTriggerCount((p) => p + 1);
    }
  };

  const handleRunTerminalScript = () => {
    // Select the shell config directly
    const terminalConfig = filesList.find(f => f.extension === 'sh');
    if (terminalConfig) {
      setActiveFile(terminalConfig);
      // Increment trigger to notify TerminalPane
      setTerminalTriggerCount((p) => p + 1);
    }
  };

  const handleSelectContactFileOnly = () => {
    const terminalConfig = filesList.find(f => f.extension === 'sh');
    if (terminalConfig) {
      setActiveFile(terminalConfig);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* SEO Structured Data */}
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <SitelinksSearchBoxSchema />

      {/* Google Analytics (production only) */}
      {import.meta.env.PROD && ANALYTICS_CONFIG.enabled && (
        <GoogleAnalytics id={ANALYTICS_CONFIG.trackingId} />
      )}

      {/* Universal branding and command header */}
      <Header 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        serverOk={serverOk} 
        activeTime={activeTime} 
        theme={theme}
        setTheme={setTheme}
        onLogoClick={() => {
          setViewMode('preview');
          window.dispatchEvent(new CustomEvent('haclab-nav-home'));
        }}
      />

      {viewMode === 'preview' ? (
        <Suspense fallback={<LoadingFallback />}>
          <PreviewWorkspace />
        </Suspense>
      ) : (
        /* SOFTWARE DEVELOPMENT WORKSPACE VIEW - Clean IDE representation */
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Filetree layout - 1/4 width on desktop, top stacked on mobile */}
          <div className="w-full md:w-64 shrink-0 h-auto md:h-full border-b border-slate-900 md:border-b-0">
            <FileTree 
              activeFile={activeFile} 
              setActiveFile={handleSelectFile} 
              onRunTerminalScript={handleRunTerminalScript} 
            />
          </div>

          {/* Code workspace area + Bottom panel workspace split */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
            
            {/* Active script window */}
            <div className="flex-1 min-h-0">
              <CodeWorkspace 
                activeFile={activeFile} 
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>

            {/* Simulated active CLI terminal interface */}
            <TerminalPane 
              onShowContactDetails={handleSelectContactFileOnly}
              runTriggerCount={terminalTriggerCount}
            />

          </div>

        </main>
      )}

    </div>
  );
}
