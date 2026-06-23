import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import type { GeneratedAppDefinition } from '../../data/appCatalog';
import { AppLogo } from './helpers';

interface AppIndexProps {
  onOpenApp: (slug: string) => void;
  appCatalog: GeneratedAppDefinition[];
}

export default function AppIndex({ onOpenApp, appCatalog }: AppIndexProps) {
  const [query, setQuery] = useState('');
  const filteredApps = appCatalog.filter((app) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;
    return [app.name, app.type, app.summary, ...app.highlights].join(' ').toLowerCase().includes(needle);
  });

  return (
    <motion.div
      key="apps"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col gap-4 md:overflow-hidden min-h-0"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 shrink-0">
        <div className="space-y-1.5 select-none">
          <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// PRODUCT INVENTORY</span>
          <h1 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Haclab Apps</h1>
          <p className="text-sm text-slate-300 max-w-2xl">Dedicated product pages generated from live module definitions, module properties, actions, custom views, and universal platform integrations.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-slate-950 border border-slate-850 focus:border-brand-red/35 rounded-lg pl-9 pr-3 py-2 text-sm text-white outline-none"
            placeholder="Search apps, modules, integrations..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:overflow-y-auto pr-1 pb-2">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.slug)}
            className="text-left rounded-xl border border-slate-900 bg-slate-900/15 hover:border-brand-red/25 hover:bg-slate-900/30 transition p-4 space-y-3 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <AppLogo app={app} className="w-10 h-10" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-white truncate">{app.name}</h3>
                    <p className="text-[12.5px] font-mono text-slate-450 truncate mt-1">{app.type}</p>
                  </div>
                </div>
              </div>
              <span className="text-[12px] font-mono rounded bg-slate-950 border border-slate-850 text-slate-400 px-2 py-0.5 shrink-0">
                v{app.version}
              </span>
            </div>

            <p className="text-[13px] text-slate-300 leading-relaxed line-clamp-3">{app.summary}</p>

            <div className="grid grid-cols-3 gap-2 text-center select-none">
              <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-2">
                <span className="block text-sm font-bold text-white">{app.modules.length}</span>
                <span className="text-[12px] font-mono text-slate-500">modules</span>
              </div>
              <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-2">
                <span className="block text-sm font-bold text-white">{app.actions.length}</span>
                <span className="text-[12px] font-mono text-slate-500">actions</span>
              </div>
              <div className="rounded-lg border border-slate-900 bg-slate-950/50 p-2">
                <span className="block text-sm font-bold text-white">{app.customViews.length}</span>
                <span className="text-[12px] font-mono text-slate-500">views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {app.highlights.slice(0, 6).map((highlight) => (
                <span key={highlight} className="text-[12px] font-mono rounded border border-slate-850 bg-slate-950 text-slate-400 px-2 py-0.5">
                  {highlight}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
