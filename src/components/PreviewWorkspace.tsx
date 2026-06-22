import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  ShieldCheck, 
  CodeXml, 
  Activity, 
  LayoutGrid, 
  Github, 
  Linkedin, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Cpu, 
  Workflow, 
  Award,
  Terminal,
  Database,
  Globe,
  Layers,
  Laptop,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Boxes,
  ExternalLink,
  FileText,
  GitBranch,
  ListChecks,
  Package,
  Search,
  Settings,
  ShoppingCart,
  MessageCircle
} from 'lucide-react';
import { companyProfile, servicesData, projectsData, teamData, blogPostsData } from '../data/haclabData';
import { appCatalog, appCatalogBySlug, GeneratedAppDefinition } from '../data/appCatalog';
import AppProductSchema from './seo/AppProductSchema';
import { ModuleDefinition } from '../types';
import { updateSEO } from '../utils/seo';

// Regions mapping database for interactive node selector
interface Telemetry {
  status: string;
  latency: string;
  load: string;
  security: string;
  ip: string;
  activeDevelopers: number;
}

const REGIONS_TELEMETRY: Record<string, Telemetry> = {
  Kampala: { status: 'Primary Master Node', latency: '4ms', load: '18%', security: '99.99%', ip: '197.231.14.88', activeDevelopers: 4 },
  Entebbe: { status: 'Secondary Backup Node', latency: '7ms', load: '12%', security: '100%', ip: '197.231.14.90', activeDevelopers: 2 },
  Jinja: { status: 'Industrial Edge Client', latency: '12ms', load: '24%', security: '99.98%', ip: '197.231.15.5', activeDevelopers: 1 },
  Mbarara: { status: 'Western Regional Gateway', latency: '15ms', load: '8%', security: '99.99%', ip: '197.231.16.21', activeDevelopers: 2 },
  Gulu: { status: 'Northern Operations Mesh', latency: '19ms', load: '5%', security: '99.97%', ip: '197.231.18.4', activeDevelopers: 1 }
};

const getAppRoute = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/apps') return { section: 'apps' as const };
  const match = path.match(/^\/apps\/([^/]+)$/);
  if (match) return { section: 'app-detail' as const, slug: decodeURIComponent(match[1]) };
  return { section: 'site' as const };
};

const formatCount = (value: number, label: string) => `${value} ${label}${value === 1 ? '' : 's'}`;

const IntegrationBadge: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; tone?: string }> = ({ icon, label, active = true, tone = '#ff0000' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[12.5px] font-mono ${
      active ? '' : 'bg-slate-950 border-slate-850 text-slate-500'
    }`}
    style={
      active
        ? {
            color: tone,
            backgroundColor: hexToRgba(tone, 0.08),
            borderColor: hexToRgba(tone, 0.18),
          }
        : undefined
    }
  >
    {icon}
    {label}
  </span>
);

const AppLogo = ({ app, className = 'w-9 h-9' }: { app: Pick<GeneratedAppDefinition, 'name' | 'color' | 'logoPath'>; className?: string }) => (
  <span
    className={`${className} rounded-lg border border-slate-850 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0`}
    style={{ boxShadow: `inset 0 0 0 1px ${app.color}22` }}
  >
    {app.logoPath ? (
      <img src={app.logoPath} alt={`${app.name} logo`} className="w-full h-full object-contain p-1" />
    ) : (
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: app.color }} />
    )}
  </span>
);

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const isShort = normalized.length === 3;
  const full = isShort ? normalized.split('').map((char) => char + char).join('') : normalized;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ModuleCard: React.FC<{ module: ModuleDefinition }> = ({ module }) => (
  <div className="bg-slate-950/65 border border-slate-900 rounded-xl p-3.5 space-y-3 min-w-0">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-white leading-tight truncate" title={module.name}>{module.name}</h4>
        <p className="text-[12.5px] text-slate-450 font-mono truncate" title={module.collection || module.path || module.id}>
          {module.collection || module.path || module.id}
        </p>
      </div>
      {module.parent && (
        <span className="text-[12px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-400 shrink-0">
          {module.parent}
        </span>
      )}
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center select-none">
      <div className="rounded-lg border border-slate-900 bg-slate-900/20 p-2">
        <span className="block text-sm font-bold text-white">{module.fieldCount || 0}</span>
        <span className="block text-[12px] font-mono text-slate-500">fields</span>
      </div>
      <div className="rounded-lg border border-slate-900 bg-slate-900/20 p-2">
        <span className="block text-sm font-bold text-white">{module.requiredFieldCount || 0}</span>
        <span className="block text-[12px] font-mono text-slate-500">required</span>
      </div>
      <div className="rounded-lg border border-slate-900 bg-slate-900/20 p-2">
        <span className="block text-sm font-bold text-white">{module.linkedFieldCount || 0}</span>
        <span className="block text-[12px] font-mono text-slate-500">linked</span>
      </div>
      <div className="rounded-lg border border-slate-900 bg-slate-900/20 p-2">
        <span className="block text-sm font-bold text-white">{(module.actions || []).length}</span>
        <span className="block text-[12px] font-mono text-slate-500">actions</span>
      </div>
    </div>

    {((module.capabilities || []).length > 0 || (module.valueTypes || []).length > 0) && (
      <div className="flex flex-wrap gap-1.5">
        {[...(module.capabilities || []), ...(module.valueTypes || []).slice(0, 5).map((type) => `${type} fields`)].slice(0, 8).map((item) => (
          <span key={item} className="text-[12px] font-mono rounded border border-slate-850 bg-slate-900/25 text-slate-350 px-2 py-0.5">
            {item}
          </span>
        ))}
      </div>
    )}

    {(module.fields || []).length > 0 && (
      <div className="space-y-1">
        <span className="text-[12px] font-mono uppercase text-slate-500 font-bold">Representative Fields</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {(module.fields || []).slice(0, 8).map((field) => (
            <div key={`${module.id}-${field.dataIndex}`} className="flex items-center justify-between gap-2 rounded border border-slate-900 bg-slate-900/15 px-2 py-1 text-[12.5px]">
              <span className="truncate text-slate-300" title={field.title}>{field.title}</span>
              <span className="font-mono text-slate-500 shrink-0">{field.valueType}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {(module.actions || []).length > 0 && (
      <div className="space-y-1">
        <span className="text-[12px] font-mono uppercase text-slate-500 font-bold">More Actions</span>
        <div className="flex flex-wrap gap-1.5">
          {(module.actions || []).slice(0, 8).map((action) => (
            <span key={action} className="text-[12px] font-mono rounded border border-brand-red/10 bg-brand-red/5 text-brand-red px-2 py-0.5">
              {action}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const AppIndex = ({ onOpenApp }: { onOpenApp: (slug: string) => void }) => {
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
          <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red font-bold">// PRODUCT INVENTORY</span>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Haclab Apps</h2>
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
};

const AppDetail = ({ app, onBack, onRequestDemo }: { app?: GeneratedAppDefinition; onBack: () => void; onRequestDemo: () => void }) => {
  const accent = app?.color || '#ff0000';
  const accentSoft = hexToRgba(accent, 0.08);
  const accentSoftStrong = hexToRgba(accent, 0.14);
  const accentBorder = hexToRgba(accent, 0.22);
  const accentBorderSoft = hexToRgba(accent, 0.12);
  const accentText = accent;

  if (!app) {
    return (
      <motion.div
        key="app-missing"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full flex flex-col items-center justify-center text-center gap-4"
      >
        <AlertCircle className="w-10 h-10" style={{ color: accentText }} />
        <div>
          <h2 className="text-xl font-bold text-white">App page not found</h2>
          <p className="text-sm text-slate-400">The requested app slug is not in the generated catalog.</p>
        </div>
        <button onClick={onBack} className="px-4 py-2 rounded-md text-white font-mono text-sm font-bold cursor-pointer" style={{ backgroundColor: accent }}>
          Back to apps
        </button>
      </motion.div>
    );
  }

  const integrationItems = [
    { active: app.integrations.hasDashboard, label: 'Dashboard', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { active: app.integrations.hasReports, label: 'Reports', icon: <FileText className="w-3.5 h-3.5" /> },
    { active: app.integrations.hasPOS, label: 'POS', icon: <ShoppingCart className="w-3.5 h-3.5" /> },
    { active: app.integrations.enforceBranches, label: 'Branch Controls', icon: <GitBranch className="w-3.5 h-3.5" /> },
    { active: app.integrations.hasSettings, label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
    { active: app.integrations.hasCustomModuleConfigs, label: 'Custom Configs', icon: <ListChecks className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.div
      key={`app-${app.slug}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col gap-4 md:overflow-hidden min-h-0"
    >
      <AppProductSchema app={app} slug={app.slug || app.id} />
      <div className="shrink-0 rounded-2xl border border-slate-900 bg-slate-900/15 p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-3 min-w-0">
            <button onClick={onBack} className="inline-flex items-center gap-1.5 text-[12.5px] font-mono text-slate-400 hover:text-white cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              APP INDEX
            </button>
            <div className="flex items-center gap-3">
              <AppLogo app={app} className="w-12 h-12" />
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-none truncate">{app.name}</h1>
                <p className="text-sm font-mono text-slate-400 mt-1">{app.type} / v{app.version}</p>
              </div>
            </div>
            <p className="text-sm text-slate-250 leading-relaxed max-w-4xl">{app.summary}</p>
          </div>

          <a
            href={app.repository}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-850 bg-slate-950 px-3 py-2 text-[12.5px] font-mono text-slate-300 hover:text-white shrink-0"
            style={{ borderColor: accentBorder }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            RELEASE REPO
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 select-none">
          <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-2.5">
            <span className="block text-lg font-bold text-white">{app.modules.length}</span>
            <span className="text-[12px] font-mono text-slate-500">app modules</span>
          </div>
          <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-2.5">
            <span className="block text-lg font-bold text-white">{app.moduleGroups.length}</span>
            <span className="text-[12px] font-mono text-slate-500">groups</span>
          </div>
          <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-2.5">
            <span className="block text-lg font-bold text-white">{app.universalFeatures.length}</span>
            <span className="text-[12px] font-mono text-slate-500">universal</span>
          </div>
          <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-2.5">
            <span className="block text-lg font-bold text-white">{app.actions.length}</span>
            <span className="text-[12px] font-mono text-slate-500">actions</span>
          </div>
          <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-2.5 col-span-2 md:col-span-1">
            <span className="block text-lg font-bold text-white">{app.statistics.length}</span>
            <span className="text-[12px] font-mono text-slate-500">stat modules</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {integrationItems.map((item) => (
            <IntegrationBadge key={item.label} active={item.active} icon={item.icon} label={item.label} tone={accent} />
          ))}
        </div>
      </div>

      <div className="flex-1 md:overflow-y-auto pr-1 space-y-4 pb-2">
        {app.marketing && (
          <section className="grid grid-cols-1 xl:grid-cols-[1.05fr_1.35fr] gap-3">
            <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: accentBorder, backgroundColor: accentSoft }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: accentText }} />
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">Runs Offline, Syncs Online</h2>
              </div>
              <p className="text-sm text-slate-250 leading-relaxed">{app.marketing.pitchHook}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 select-none">
                {[
                  ['Zero Downtime', 'Core operations keep running when internet drops.'],
                  ['Low Setup Cost', 'Desktop-first installs work without heavy cloud spend.'],
                  ['Data Privacy', 'Sensitive records stay local and sync when needed.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-lg border bg-slate-950/55 p-2.5" style={{ borderColor: accentBorderSoft }}>
                    <span className="block text-[12.5px] font-mono font-bold" style={{ color: accentText }}>{title}</span>
                    <span className="block text-[12px] text-slate-400 leading-snug mt-1">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/15 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4" style={{ color: accentText }} />
                <h2 className="text-sm font-bold text-white uppercase tracking-wide">Go-To-Market Fit</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-3">
                  <span className="text-[12px] font-mono text-slate-500 uppercase font-bold">Target Buyers</span>
                  <p className="text-[13px] text-slate-250 mt-1 leading-relaxed">{app.marketing.targetAudience}</p>
                </div>
                <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-3">
                  <span className="text-[12px] font-mono text-slate-500 uppercase font-bold">Best Channel</span>
                  <p className="text-[13px] text-slate-250 mt-1 leading-relaxed">{app.marketing.acquisitionChannel}</p>
                </div>
                <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-3">
                  <span className="text-[12px] font-mono text-slate-500 uppercase font-bold">Low-Cost Tactic</span>
                  <p className="text-[13px] text-slate-250 mt-1 leading-relaxed">{app.marketing.lowCostTactic}</p>
                </div>
                <div className="rounded-lg border border-slate-900 bg-slate-950/55 p-3">
                  <span className="text-[12px] font-mono text-slate-500 uppercase font-bold">Referral Loop</span>
                  <p className="text-[13px] text-slate-250 mt-1 leading-relaxed">{app.marketing.referralAngle}</p>
                </div>
              </div>
                <div className="rounded-lg border p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2" style={{ borderColor: accentBorder, backgroundColor: accentSoft }}>
                  <div>
                  <span className="text-[12px] font-mono uppercase font-bold" style={{ color: accentText }}>Pilot Offer</span>
                  <p className="text-[13px] text-slate-250 mt-1">{app.marketing.pilotOffer}</p>
                </div>
                <button onClick={onRequestDemo} className="px-3 py-2 rounded-md text-white font-mono text-[12.5px] font-bold cursor-pointer shrink-0" style={{ backgroundColor: accent }}>
                  REQUEST FREE DEMO
                </button>
              </div>
            </div>
          </section>
        )}

        {app.moduleGroups.length > 0 && (
            <section className="space-y-2">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4" style={{ color: accentText }} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">Module Groups</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {app.moduleGroups.map((module) => (
                <span key={module.id} className="text-[12.5px] font-mono rounded border border-slate-850 bg-slate-950 text-slate-300 px-2.5 py-1">
                  {module.name}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
              <Package className="w-4 h-4" style={{ color: accentText }} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">App Feature Modules</h2>
            </div>
            <span className="text-[12.5px] font-mono text-slate-500">{formatCount(app.modules.length, 'module')}</span>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {app.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" style={{ color: accentText }} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wide">Universal Platform Features</h2>
            </div>
            <span className="text-[12.5px] font-mono text-slate-500">{formatCount(app.universalFeatures.length, 'feature')}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {app.universalFeatures.map((feature) => (
              <div key={feature.id} className="rounded-lg border border-slate-900 bg-slate-950/50 p-3">
                <h4 className="text-sm font-bold text-white">{feature.name}</h4>
                <p className="text-[12.5px] text-slate-450 mt-1">
                  {[...(feature.capabilities || []), feature.fieldCount ? `${feature.fieldCount} configured fields` : 'Core platform module'].slice(0, 2).join(' / ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {(app.actions.length > 0 || app.statistics.length > 0 || app.customViews.length > 0) && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-900 bg-slate-900/15 p-3 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><ListChecks className="w-4 h-4" style={{ color: accentText }} /> More Actions</h3>
              <div className="flex flex-wrap gap-1.5">
                {(app.actions.length ? app.actions : ['Standard create, update, search, and export actions']).slice(0, 18).map((item) => (
                  <span key={item} className="text-[12px] font-mono rounded border px-2 py-0.5" style={{ borderColor: accentBorderSoft, backgroundColor: accentSoftStrong, color: accentText }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-900 bg-slate-900/15 p-3 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><BarChart3 className="w-4 h-4" style={{ color: accentText }} /> Statistics</h3>
              <div className="flex flex-wrap gap-1.5">
                {(app.statistics.length ? app.statistics : ['Dashboard-level operational summaries']).slice(0, 18).map((item) => (
                  <span key={item} className="text-[12px] font-mono rounded border border-slate-850 bg-slate-950 text-slate-350 px-2 py-0.5">{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-900 bg-slate-900/15 p-3 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><LayoutGrid className="w-4 h-4" style={{ color: accentText }} /> Custom Views</h3>
              <div className="flex flex-wrap gap-1.5">
                {(app.customViews.length ? app.customViews : ['Standard module tables and forms']).slice(0, 18).map((item) => (
                  <span key={item} className="text-[12px] font-mono rounded border border-slate-850 bg-slate-950 text-slate-350 px-2 py-0.5">{item}</span>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default function PreviewWorkspace() {
  const [route, setRoute] = useState(getAppRoute);
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'portfolio' | 'apps' | 'team' | 'blog' | 'contact'>(() => {
    const currentRoute = getAppRoute();
    return currentRoute.section === 'site' ? 'home' : 'apps';
  });
  
  // Custom interactive dashboard states
  const [selectedRegion, setSelectedRegion] = useState<string>('Kampala');
  const [homeRightTab, setHomeRightTab] = useState<'workflow' | 'awards'>('workflow');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('software-dev');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('wion-motors');
  const [selectedPostId, setSelectedPostId] = useState<string>('clean-codebase');
  
  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getAppRoute();
      setRoute(nextRoute);
      if (nextRoute.section !== 'site') setActiveTab('apps');
    };

    const handleNavHome = () => {
      setActiveTab('home');
      window.history.pushState({}, '', '/');
      setRoute({ section: 'site' });
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('haclab-nav-home', handleNavHome);
    syncRoute();
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('haclab-nav-home', handleNavHome);
    };
  }, []);

  // Update document title and meta tags on navigation
  useEffect(() => {
    let title = 'Haclab Portal';
    let description = 'Haclab is a premier software development studio building robust enterprise solutions, web apps, and data systems.';
    let url = window.location.href;
    let schemaData: any = undefined;

    if (route.section === 'app-detail' && 'slug' in route && route.slug) {
      const app = appCatalogBySlug[route.slug as keyof typeof appCatalogBySlug];
      if (app) {
        title = `${app.name} - Haclab App Catalog`;
        description = app.summary || description;
        schemaData = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": app.name,
          "operatingSystem": "Web",
          "applicationCategory": "BusinessApplication",
          "description": app.summary,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        };
      } else {
        title = 'App Not Found - Haclab Portal';
      }
    } else {
      switch (activeTab) {
        case 'home':
          title = 'Overview - Haclab Portal';
          description = 'Discover Haclab: Software Synthesis & Design Core building enterprise-grade applications and web solutions.';
          break;
        case 'services':
          title = 'Services & Solutions - Haclab Portal';
          description = 'Explore our engineering services including Software Dev, Web Dev, Mobile Apps, Database Design, and SEO optimizations.';
          schemaData = {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Software Development",
            "provider": {
              "@type": "Organization",
              "name": "Haclab Company Limited"
            },
            "areaServed": "Uganda"
          };
          break;
        case 'portfolio':
          title = 'Deployments & Portfolio - Haclab Portal';
          description = 'View our successful deployments and projects, demonstrating our expertise across various domains and scales.';
          break;
        case 'apps':
          title = 'App Catalog - Haclab Portal';
          description = 'Browse the Haclab product inventory of ready-to-deploy enterprise modules and unified workspace tools.';
          break;
        case 'team':
          title = 'The Squad - Haclab Portal';
          description = 'Meet the elite team of engineers and designers at Haclab committed to building high-performance systems.';
          break;
        case 'blog':
          title = 'Tech Log - Haclab Portal';
          description = 'Read our technical articles, insights, and engineering logs about modern software architecture and development.';
          break;
        case 'contact':
          title = 'Contact Us - Haclab Portal';
          description = 'Get in touch with Haclab for consultations, project inquiries, and enterprise solutions.';
          break;
      }
    }

    updateSEO({ title, description, url, schemaData });
  }, [activeTab, route]);

  const pushRoute = (path: string) => {
    window.history.pushState({}, '', path);
    const nextRoute = getAppRoute();
    setRoute(nextRoute);
    if (nextRoute.section !== 'site') setActiveTab('apps');
  };

  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId === 'apps') {
      pushRoute('/apps');
      return;
    }
    if (route.section !== 'site') {
      window.history.pushState({}, '', '/');
      setRoute({ section: 'site' });
    }
  };

  const handleOpenApp = (slug: string) => {
    setActiveTab('apps');
    pushRoute(`/apps/${slug}`);
  };

  // Awards collection
  const awardsList = [
    { name: 'Top Web Developer', provider: 'AppFutura Cert #1', image: '/assets/images/awards/appfutura1.png', rating: '5.0/5.0' },
    { name: 'Top App Developer', provider: 'AppFutura Cert #2', image: '/assets/images/awards/appfutura2.png', rating: 'Top 10 East Africa' },
    { name: 'Certified Software Partner', provider: 'GoodFirms Authority', image: '/assets/images/awards/goodfirm1.png', rating: 'Validated Vendor' },
    { name: 'Top Web Agency', provider: 'GoodFirms Showcase', image: '/assets/images/awards/goodfirm2.png', rating: 'Best Delivery Track' },
    { name: 'Leading System Builder', provider: 'DesignRush Partner', image: '/assets/images/awards/designrush1.png', rating: '98% Client Score' }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1200);
  };

  const renderServiceIcon = (iconName: string, className = "w-5 h-5 text-brand-red") => {
    switch (iconName) {
      case 'CodeXml':
        return <CodeXml className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'LayoutGrid':
        return <LayoutGrid className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Workflow':
        return <Workflow className={className} />;
      default:
        return <CodeXml className={className} />;
    }
  };

  // Live Schematic Nodes builder for each service
  const renderServiceSchematic = (serviceId: string) => {
    switch (serviceId) {
      case 'software-dev':
        return [
          { name: 'CLIENT REQUIREMENT', desc: 'Enterprise Specification Dossier', active: true },
          { name: 'REST & GRAPHQL GATEWAY', desc: 'Custom Structured Interfaces & Models', active: true },
          { name: 'GOLANG SERVER ENGINE', desc: 'Multi-threaded, light CPU, zero garbage delay', active: true },
          { name: 'DOCKER CLUSTER', desc: 'Continuous isolated deployment frames', active: false }
        ];
      case 'web-dev':
        return [
          { name: 'POLISHED UI/UX WIREFRAME', desc: 'Minimal CSS & Swiss Grid architecture', active: true },
          { name: 'VITE & REACT RUNTIME', desc: 'Fast, clean module bundle & high-speed SPA', active: true },
          { name: 'TAILWIND UTILITY PARSER', desc: 'Highly performant responsive display rules', active: true },
          { name: 'FAST CDN EDGE NET', desc: 'Caching resources closest to visitors globally', active: false }
        ];
      case 'mobile-app':
        return [
          { name: 'NATIVE VIEW PORT SIZING', desc: 'Ergonomic screen spacing guidelines', active: true },
          { name: 'CROSS PLATFORM COMPILER', desc: 'Flutter & React Native modular codebases', active: true },
          { name: 'OFFLINE STATE STORE', desc: 'Automated data caching on network failures', active: true },
          { name: 'PUSH NOTIFICATIONS SYSTEM', desc: 'Real-time client synchronization loops', active: false }
        ];
      case 'database-design':
        return [
          { name: 'RELATIONAL SCHEMA PLAN', desc: 'Durable primary keys & strict indexing rules', active: true },
          { name: 'TRANSACTION LOCKS MATRIX', desc: 'Eliminate partial entries & race hazards', active: true },
          { name: 'REDIS CACHING GATE', desc: 'Sub-millisecond common retrieval buffers', active: true },
          { name: 'AUTOMATED MIRROR BACKUPS', desc: 'Secondary storage failover mechanisms', active: false }
        ];
      case 'ecommerce-solutions':
        return [
          { name: 'DYNAMIC SHELF CATALOG', desc: 'Rapid imagery load & smooth group filters', active: true },
          { name: 'BASKET CORRESPONDENCE', desc: 'Instant item reservation & calculation state', active: true },
          { name: 'MOBILE MONEY SECURE API', desc: 'Idempotent carrier channels (MTN/Airtel)', active: true },
          { name: 'INVOICING STREAM SYSTEM', desc: 'Auto-compiled email and PDF confirmations', active: false }
        ];
      case 'seo-performance':
        return [
          { name: 'PERFORMANCE BENCHMARKS', desc: 'In-depth audit & speed telemetry reviews', active: true },
          { name: 'SERVER-SIDE OPTIMIZATIONS', desc: 'Pre-rendered templates & payload reduction', active: true },
          { name: 'SEMANTIC GRAPH STRUTS', desc: 'Rich search engine indexing metadata layers', active: true },
          { name: 'PEAK RANK SEARCH INDEX', desc: 'Top exposure & high organic viewer conversion', active: false }
        ];
      default:
        return [];
    }
  };

  const selectedService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];
  const selectedProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];
  const selectedPost = blogPostsData.find(b => b.id === selectedPostId) || blogPostsData[0];
  const telemetry = REGIONS_TELEMETRY[selectedRegion];

  return (
    <div className="w-full h-full flex-1 bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-text font-sans relative">
      
      {/* Sub Navigation Bar - Restructured to fit exact grid with sliding neon pill */}
      <div className="bg-slate-950/90 border-b border-slate-900/80 sticky top-0 z-30 shrink-0 select-none backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto gap-2 sm:gap-3 h-14 scrollbar-none scrollbar-hide">
          {[
            { id: 'home', label: 'OVERVIEW', num: '01' },
            { id: 'services', label: 'SERVICES', num: '02' },
            { id: 'portfolio', label: 'DEPLOYMENTS', num: '03' },
            { id: 'apps', label: 'APPS', num: '04' },
            { id: 'team', label: 'SQUAD', num: '05' },
            { id: 'blog', label: 'TECH LOG', num: '06' },
            { id: 'contact', label: 'CONTACT', num: '07' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id as typeof activeTab)}
                className={`relative px-4 py-2 text-[12.5px] font-mono tracking-wider font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 rounded-md flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-brand-red'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                {/* Visual prefix code */}
                <span className={`text-[12px] ${isSelected ? 'text-brand-red/60 font-bold' : 'text-slate-600 font-normal'}`}>
                  {tab.num}.
                </span>
                
                <span>{tab.label}</span>

                {/* Smooth Animated Sliding Pill Background */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-brand-red/5 border border-brand-red/20 shadow-[0_0_12px_rgba(255,0,0,0.05)] rounded-md -z-10 animate-fade"
                  />
                )}
                
                {/* Tiny selected micro-indicator dot */}
                {isSelected && (
                  <motion.span
                    layoutId="activeTabDot"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-red absolute bottom-1 left-1/2 -translate-x-1/2 shadow-lg"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Page Canvas - Restructured to fit screen real estate without scrollbars! */}
      <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden p-3 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-start">
        <div className="max-w-7xl mx-auto w-full h-auto md:h-full flex flex-col min-h-0">
          
          <AnimatePresence mode="wait">
            
            {/* ====== 1. REDESIGNED HOME VIEW (SIDE-BY-SIDE INTEGRATED DASHBOARD) ====== */}
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
              >
                
                {/* LEFT DASH COLUMN: Brand Hero & Live Region Telemetry */}
                <div className="w-full md:w-[45%] flex flex-col justify-between gap-6 md:overflow-hidden min-w-[320px]">
                  
                  {/* Hero Information Block */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/15 text-brand-red text-[12.5px] font-mono rounded-full tracking-wider uppercase">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      <span>Software Synthesis & Design Core</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-white tracking-tight leading-none">
                      We craft critical <br />
                      <span className="bg-gradient-to-r from-brand-red to-rose-500 bg-clip-text text-transparent font-extrabold">
                        software assets
                      </span>.
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-lg">
                      {companyProfile.fullName} builds systems optimized for stability, high uptime, and premium interfaces. Based in {companyProfile.location}, we turn engineering complexity into beautiful interactive realities.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 select-none">
                      <button
                        onClick={() => setActiveTab('portfolio')}
                        className="px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-semibold font-mono text-[12.5px] tracking-wider rounded-md flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-lg shadow-brand-red/10 border border-transparent"
                      >
                        <span>EXPLORE WORK</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveTab('contact')}
                        className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold font-mono text-[12.5px] tracking-wider rounded-md flex items-center justify-center gap-2 hover:bg-slate-850 transition duration-150 cursor-pointer"
                      >
                        <span>SCHEDULE CONSULT</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Region Telemetry Widget - FUN & ACCESSIBLE! */}
                  <div className="p-4 bg-slate-900/35 border border-slate-900 rounded-xl space-y-3.5 backdrop-blur-sm shadow-xl select-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-red" />
                        <span className="text-[12.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">Uganda Service Hubs</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-[13.5px] font-mono text-emerald-500 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                        SYSTEMS LIVE
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(REGIONS_TELEMETRY).map((reg) => (
                        <button
                          key={reg}
                          onClick={() => setSelectedRegion(reg)}
                          className={`px-2.5 py-1 text-[13.5px] font-mono rounded tracking-tight border transition cursor-pointer ${
                            selectedRegion === reg
                              ? 'bg-brand-red/10 border-brand-red text-brand-red font-bold shadow-md shadow-brand-red/5'
                              : 'bg-slate-905 border-slate-850 hover:border-slate-700 text-slate-400'
                          }`}
                        >
                          {reg.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Telemetry output block */}
                    <div className="p-3 bg-slate-950/80 border border-slate-850 rounded font-mono text-[12.5px] text-slate-400 grid grid-cols-2 gap-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-red/2 rounded-full blur-xl pointer-events-none" />
                      <div>
                        <span className="text-[13px] text-slate-500 block">IP ADDR:</span>
                        <span className="text-slate-205 select-all">{telemetry.ip}</span>
                      </div>
                      <div>
                        <span className="text-[13px] text-slate-500 block">PING RESPONSE:</span>
                        <span className="text-emerald-400 font-semibold">{telemetry.latency}</span>
                      </div>
                      <div>
                        <span className="text-[13px] text-slate-500 block">SERVER LOAD:</span>
                        <span className="text-slate-300">{telemetry.load}</span>
                      </div>
                      <div>
                        <span className="text-[13px] text-slate-500 block">GATE ROLE:</span>
                        <span className="text-brand-red/80 font-bold truncate block" title={telemetry.status}>
                          {telemetry.status.split(' ')[0]} {telemetry.status.split(' ')[1] || ''}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT DASH COLUMN: Interactive Bento Box Widget (Tabs switcher) */}
                <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-2xl md:h-full flex flex-col overflow-hidden min-h-[300px] md:min-h-0 shadow-2xl relative">
                  
                  {/* Bento Header switch controls */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900/30 border-b border-slate-900/80 select-none shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[12.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">WORKSPACE MATRIX</span>
                    </div>
                    
                    <div className="flex border border-slate-800 bg-slate-950 p-1.5 rounded-lg">
                      <button
                        onClick={() => setHomeRightTab('workflow')}
                        className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
                          homeRightTab === 'workflow'
                            ? 'bg-slate-900 text-brand-red'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        WORKFLOW LOOP
                      </button>
                      <button
                        onClick={() => setHomeRightTab('awards')}
                        className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
                          homeRightTab === 'awards'
                            ? 'bg-slate-900 text-brand-red'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        PARTNER BADGES
                      </button>
                    </div>
                  </div>

                  {/* Bento Tab Body scrollable container inside fixed component */}
                  <div className="flex-1 p-4 md:overflow-y-auto pr-2 scrollbar-thin">
                    <AnimatePresence mode="wait">
                      
                      {/* Subtab A: 4-Stage Workflow */}
                      {homeRightTab === 'workflow' && (
                        <motion.div
                          key="workflow"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {[
                            { step: '01', scope: 'Inception', name: 'Idea Discussion', desc: 'We meet clients and deeply analyze business constraints, specifications, and scale needs before drafting solid pathways.' },
                            { step: '02', scope: 'Strategy', name: 'Concepts & Initiatives', desc: 'Our architects draft relational schema graphs, wireframe responsive ergonomics, and propose a deterministic scope code plan.' },
                            { step: '03', scope: 'Development', name: 'Coding & Testing', desc: 'We construct low-dependency, transaction-safe modular codebases compiled using isolated test-pipes and validation blocks.' },
                            { step: '04', scope: 'Deployment', name: 'Production & Support', desc: 'We launch systems to fast server environments and secure them with automated backup scripts, logs, and preventative care.' }
                          ].map((item, idx) => (
                            <div 
                              key={idx}
                              className="p-4 bg-slate-900/20 border border-slate-900/60 rounded-xl space-y-2 group hover:border-brand-red/25 hover:bg-slate-900/35 transition duration-150 relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-10 h-10 bg-brand-red/1 opacity-0 group-hover:opacity-100 rounded-full blur-lg pointer-events-none transition" />
                              <div className="flex items-center justify-between select-none">
                                <span className="text-[12.5px] font-mono text-brand-red font-bold bg-brand-red/5 border border-brand-red/10 px-1.5 py-0.5 rounded">{item.step}. {item.scope}</span>
                                <span className="text-[13.5px] font-mono text-slate-600 group-hover:text-slate-400">ok_status</span>
                              </div>
                              <h4 className="text-white text-sm font-semibold tracking-tight font-sans">{item.name}</h4>
                              <p className="text-[13px] text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      {/* Subtab B: Top Partner Accreditations and Badges */}
                      {homeRightTab === 'awards' && (
                        <motion.div
                          key="awards"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="space-y-4"
                        >
                          <p className="text-[13px] text-slate-400 leading-normal font-normal">
                            Haclab works with independent verification networks to secure standard client satisfaction reviews. We are audited and accredited under international development tiers:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {awardsList.map((award, aIdx) => (
                              <div 
                                key={aIdx} 
                                className="p-3 bg-slate-900/20 border border-slate-900/85 rounded-xl hover:border-brand-red/20 transition-all flex items-center gap-4 group"
                              >
                                <div className="w-12 h-12 rounded bg-slate-950 border border-slate-850 flex items-center justify-center p-1.5 shrink-0 select-none group-hover:border-brand-red/30 transition overflow-hidden">
                                  <img 
                                    src={award.image} 
                                    alt={award.name} 
                                    className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-white text-sm font-bold leading-tight truncate font-sans">{award.name}</h4>
                                  <span className="text-[12.5px] font-mono text-slate-450 block truncate">{award.provider}</span>
                                  <span className="text-[13.5px] font-mono text-brand-red font-medium block truncate mt-0.5">{award.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                  
                  {/* Subtle live node banner */}
                  <div className="bg-slate-950 px-4 py-2 text-[13.5px] font-mono text-slate-500 border-t border-slate-900/80 flex items-center justify-between select-none">
                    <span>HOST CLUSTER: ACCREDITED_COMPUTATION</span>
                    <span className="text-brand-red select-none">v3.0.1 ALPHA</span>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ====== 2. REDESIGNED SERVICES VIEW (DOUBLE PANE CONSOLE WORKSPACE) ====== */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
              >
                
                {/* LEFT CONSOLE LIST: Slim selectors */}
                <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
                  <div className="space-y-1.5 select-none shrink-0">
                    <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red font-bold">// SYSTEM PILLARS</span>
                    <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Capabilities</h2>
                    <p className="text-[13px] text-slate-300 font-normal leading-snug">Click a specific service sphere to view its custom structural blueprint flowchart.</p>
                  </div>

                  <div className="flex-1 space-y-2 md:overflow-y-auto pr-1">
                    {servicesData.map((s) => {
                      const isSelected = s.id === selectedServiceId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-brand-red/35 shadow-lg shadow-brand-red/2 shadow-[0_0_12px_rgba(255,0,0,0.03)]'
                              : 'bg-slate-900/10 border-slate-900 text-slate-400 hover:bg-slate-900/20 hover:border-slate-800'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 border transition ${
                            isSelected ? 'bg-brand-red/10 border-brand-red/20 text-brand-red' : 'bg-slate-950 border-slate-900 text-slate-400'
                          }`}>
                            {renderServiceIcon(s.iconName, "w-4 h-4")}
                          </div>
                          <div className="min-w-0 pr-1 select-none">
                            <h4 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{s.title}</h4>
                            <p className="text-[12px] text-slate-400 truncate leading-snug mt-1 font-normal">{s.shortDescription}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SYSTEM ARCHITECTURE LIVE PLOT VIEW */}
                <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
                  
                  {/* Subtle wiregrid schematic layer */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#090d16_1px,transparent_1px),linear-gradient(to_bottom,#090d16_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_25%_25%_at_50%_50%,#000_100%,transparent_100%)] opacity-35 pointer-events-none" />

                  {/* Info Header */}
                  <div className="relative z-10 space-y-3 shrink-0">
                    <div className="flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-red/5 border border-brand-red/15 rounded text-[13.5px] font-mono text-brand-red">
                        <Cpu className="w-3 h-3 animate-ping" />
                        <span>BLUEPRINT MATRIX</span>
                      </div>
                      <span className="text-[12.5px] font-mono text-slate-400 font-bold select-all">service_class: {selectedService.id}</span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-white tracking-tight">{selectedService.title}</h3>
                      <p className="text-sm text-slate-200 font-normal leading-relaxed max-w-2xl">{selectedService.longDescription}</p>
                    </div>

                    {/* Stack labels with glow effect */}
                    <div className="flex flex-wrap gap-1.5 select-none pt-1">
                      {selectedService.technologies.map((t, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-0.5 bg-slate-950 border border-slate-850/80 text-slate-400 text-[12.5px] font-mono rounded-md hover:border-brand-red/10 transition"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flow chart diagram drawing - EXTREMELY FUN! */}
                  <div className="relative z-10 my-4 p-4 bg-slate-950/60 border border-slate-850/60 rounded-xl flex-1 flex flex-col justify-center min-h-[160px] max-h-[220px] select-none overflow-y-auto scrollbar-none">
                    <span className="absolute top-2.5 right-2.5 text-[13px] font-mono text-slate-650 tracking-widest">// COMPILATION FLOW</span>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 md:gap-3 px-1 sm:px-4">
                      {renderServiceSchematic(selectedService.id).map((node, nIdx, arr) => (
                        <React.Fragment key={nIdx}>
                          
                          {/* Node container */}
                          <div className="w-full sm:w-[22%] p-2 rounded border bg-slate-900/40 text-center space-y-0.5 relative hover:border-brand-red/10 transition group">
                            <span className="text-[13px] font-mono text-slate-500">STAGE 0{nIdx + 1}</span>
                            <div className="text-[12.5px] text-white font-bold tracking-tight uppercase truncate block font-sans" title={node.name}>
                              {node.name}
                            </div>
                            <p className="text-[13px] text-slate-420 line-clamp-1 leading-normal font-normal" title={node.desc}>
                              {node.desc}
                            </p>
                          </div>

                          {/* Connecting arrow/line */}
                          {nIdx < arr.length - 1 && (
                            <div className="text-slate-700 font-mono text-sm hidden sm:block shrink-0 animate-pulse">
                              ➔
                            </div>
                          )}

                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Action Deployment Target footer */}
                  <div className="relative z-10 p-3 bg-brand-red/5 border border-brand-red/15 rounded-lg text-[12.5px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 select-none">
                    <div className="flex items-center gap-1.5 text-slate-350">
                      <span className="font-bold text-brand-red uppercase">DEPLOY ENVIRONMENT:</span>
                      <span className="text-slate-300 font-bold">{selectedService.useCase}</span>
                    </div>
                    <span className="text-slate-500 text-[13.5px]">Uptime guarantee: 99.999%</span>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ====== 3. REDESIGNED PORTFOLIO VIEW (STUDY CENTER SPLIT MODULE) ====== */}
            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
              >
                
                {/* LEFT LIST LEDGER */}
                <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
                  <div className="space-y-1.5 select-none shrink-0">
                    <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red font-bold">// STABLE CODE DEPLOYMENTS</span>
                    <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">Engineering Ledger</h2>
                    <p className="text-[13px] text-slate-300 font-normal leading-snug">Review active client architectures currently serving operations across Uganda.</p>
                  </div>

                  <div className="flex-1 space-y-2 md:overflow-y-auto pr-1">
                    {projectsData.map((project) => {
                      const isSelected = project.id === selectedProjectId;
                      return (
                        <button
                          key={project.id}
                          onClick={() => setSelectedProjectId(project.id)}
                          className={`w-full p-4 rounded-xl border text-left flex flex-col gap-2.5 transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-brand-red/35 shadow-lg shadow-brand-red/2 shadow-[0_0_12px_rgba(255,0,0,0.03)]'
                              : 'bg-slate-900/10 border-slate-900 text-slate-400 hover:bg-slate-900/20 hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between select-none w-full gap-2">
                             <span className="text-[13.5px] font-mono text-brand-red font-semibold bg-brand-red/5 border border-brand-red/10 px-2 py-0.5 rounded">
                              {project.category}
                            </span>
                            <span className="text-[12.5px] font-mono text-slate-400">{project.year}</span>
                          </div>
                          
                          <div className="min-w-0 pr-1 select-none">
                            <h4 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{project.title}</h4>
                            <p className="text-[12px] text-slate-450 truncate leading-snug mt-1 font-normal">{project.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SYSTEM BLUEPRINT BOARD */}
                <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
                  
                  {/* Subtle design blueprint details */}
                  <div className="space-y-4 shrink-0 relative z-10">
                    <div className="flex items-center justify-between select-none border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse" />
                        <span className="text-[12.5px] font-mono tracking-widest text-slate-350 font-bold uppercase">CASE ARCHITECTURE</span>
                      </div>
                      <span className="text-[12.5px] font-mono text-[#ff0000] px-2 py-0.5 bg-brand-red/5 border border-brand-red/10 rounded">
                        DEPLOYED: {selectedProject.year}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{selectedProject.title}</h3>
                      <p className="text-sm text-slate-250 leading-relaxed font-normal">{selectedProject.fullDetails}</p>
                    </div>

                    {/* Tech Stack list */}
                    <div className="space-y-1.5 select-none">
                      <span className="text-[13.5px] font-mono text-slate-500 block uppercase font-bold tracking-widest">Stack Inventory</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.techStack.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-[12px] font-mono text-slate-400 bg-slate-950 border border-slate-855 px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Interface Snapshot */}
                  {selectedProject.imageUrl && (
                    <div className="my-4 relative z-10 flex-1 overflow-hidden rounded-xl border border-slate-800 shadow-xl group">
                      <img 
                        src={selectedProject.imageUrl} 
                        alt={`${selectedProject.title} Interface Snapshot`} 
                        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-xl"></div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent h-12 pointer-events-none"></div>
                    </div>
                  )}

                  {/* Production URLs */}
                  <div className="relative z-10 p-3 bg-slate-950 border border-slate-900 rounded-lg text-sm font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 select-none">
                    <div className="flex items-center gap-2 min-w-0">
                      {selectedProject.liveUrl ? (
                        <>
                          <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-slate-500 uppercase text-[13px] shrink-0 font-bold">LIVE PRODUCTION:</span>
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-emerald-400 hover:text-emerald-300 truncate text-[13px] font-mono leading-none underline flex items-center gap-1 transition-colors"
                          >
                            {selectedProject.liveUrl.replace('https://', '').replace('www.', '')}
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </>
                      ) : (
                        <>
                          <Github className="w-4 h-4 text-slate-500 shrink-0" />
                          <span className="text-slate-500 uppercase text-[13px] shrink-0 font-bold">MIRROR HASH:</span>
                          <span className="text-slate-300 truncate text-[13px] font-mono leading-none">
                            {selectedProject.githubUrl || 'private_repo'}
                          </span>
                        </>
                      )}
                    </div>
                    <span className="text-[12.5px] font-mono text-emerald-500 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded uppercase tracking-wider font-bold w-max">
                      {selectedProject.liveUrl ? 'online' : 'stable'}
                    </span>
                  </div>

                </div>

              </motion.div>
            )}

            {/* ====== 4. GENERATED APPS INDEX AND DETAIL PAGES ====== */}
            {activeTab === 'apps' && (
              route.section === 'app-detail' ? (
                <AppDetail app={appCatalogBySlug[route.slug]} onBack={() => pushRoute('/apps')} onRequestDemo={() => handleSelectTab('contact')} />
              ) : (
                <AppIndex onOpenApp={handleOpenApp} />
              )
            )}

            {/* ====== 4. REDESIGNED SQUAD VIEW (DUAL PROFILES NO-SCROLL LAYOUT) ====== */}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col gap-5 md:overflow-hidden min-h-0 justify-between"
              >
                
                {/* Intro Title */}
                <div className="space-y-1 select-none shrink-0 text-center md:text-left">
                  <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red font-bold">// CORE ENGINEERS</span>
                  <h1 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Kampala Systems Squad</h1>
                  <p className="text-sm text-slate-300 font-normal max-w-xl">Our multidisciplinary developers operate locally to construct fast secure systems.</p>
                </div>

                {/* Profiles side-by-side split */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0 md:overflow-hidden">
                  {teamData.map((member, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-brand-red/20 transition-all group h-auto md:h-full relative md:overflow-y-auto"
                    >
                      {/* Avatar container */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0 select-none relative group sm:mx-0 mx-auto">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 border border-brand-red/0 group-hover:border-brand-red/30 transition-all" />
                      </div>

                      {/* Info & Core stack */}
                      <div className="space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-bold text-white tracking-tight">{member.name}</h3>
                            <span className="text-[13px] font-mono text-emerald-450 bg-emerald-950/10 border border-emerald-900/20 px-1.5 py-0.5 rounded leading-none select-none">
                              ACTIVE
                            </span>
                          </div>
                          
                          <p className="text-[13px] font-mono text-[#ff0000] font-bold leading-none">{member.role.toUpperCase()}</p>
                          <p className="text-[13.5px] text-slate-300 leading-relaxed font-normal pt-1">
                            {member.bio}
                          </p>
                        </div>

                        {/* Custom visual terminals of skill tags */}
                        <div className="space-y-1.5 select-none pt-2 border-t border-slate-900">
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, sIdx) => (
                              <span 
                                key={sIdx}
                                className="text-[13.5px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-850"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social profiles code lines */}
                        <div className="flex items-center gap-3 pt-1 select-none text-slate-500">
                          {member.github && (
                            <a 
                              href={member.github} 
                              target="_blank" 
                              rel="noreferrer"
                              className="hover:text-white transition flex items-center gap-1 text-[12.5px] font-mono"
                              title="GitHub Profile"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span className="hover:underline">git</span>
                            </a>
                          )}
                          {member.linkedin && (
                            <a 
                              href={member.linkedin} 
                              target="_blank" 
                              rel="noreferrer"
                              className="hover:text-white transition flex items-center gap-1 text-[12.5px] font-mono"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                              <span className="hover:underline">lnk</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secure warning text */}
                <div className="bg-slate-950/60 border border-slate-900 p-2.5 rounded-lg flex items-center gap-2 select-none shrink-0 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <p className="text-[12px] font-mono text-slate-500 text-center">Kampala Operations coordinates are secure. Standard non-disclosure acts apply strictly.</p>
                </div>

              </motion.div>
            )}

            {/* ====== 5. REDESIGNED TECH LOG JOURNAL VIEW (DOCK LEDGER INTERFACE) ====== */}
            {activeTab === 'blog' && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
              >
                
                {/* LEFT LIST LEDGER OF POSTS */}
                <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
                  <div className="space-y-1.5 select-none shrink-0">
                    <span className="text-[13.5px] font-mono uppercase tracking-widest text-[#ff0000] font-bold">// INTELLECTUAL OUTPUTS</span>
                    <h2 className="text-2xl font-bold text-white font-sans tracking-tight leading-none">The Technical Log</h2>
                    <p className="text-[13px] text-slate-300 font-normal leading-snug">Read papers, architectural formulas, and notes straight from production.</p>
                  </div>

                  <div className="flex-1 space-y-2 md:overflow-y-auto pr-1">
                    {blogPostsData.map((post) => {
                      const isSelected = post.id === selectedPostId;
                      return (
                        <button
                          key={post.id}
                          onClick={() => setSelectedPostId(post.id)}
                          className={`w-full p-4 rounded-xl border text-left flex flex-col gap-2 transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-brand-red/35 shadow-lg shadow-brand-red/2 shadow-[0_0_12px_rgba(255,0,0,0.03)]'
                              : 'bg-slate-900/10 border-slate-900 text-slate-400 hover:bg-slate-900/20 hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between select-none w-full text-[13.5px] font-mono text-slate-400">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                          
                          <div className="min-w-0 pr-1 select-none">
                            <h4 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{post.title}</h4>
                            <p className="text-[12px] text-slate-455 truncate leading-snug mt-1 font-normal">{post.summary}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SYSTEM BLUEPRINT BOARD (The reading glass) */}
                <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
                  
                  {/* Article content scroll container only inside this frame */}
                  <div className="flex-1 md:overflow-y-auto pr-1 scrollbar-thin space-y-4">
                    
                    {/* Header values */}
                    <div className="space-y-2 border-b border-slate-900 pb-3">
                      <div className="flex items-center justify-between text-[12.5px] font-mono text-slate-400">
                        <span>POSTED ON: {selectedPost.date}</span>
                        <span>READ INTERVAL: {selectedPost.readTime}</span>
                      </div>
                      
                      <h2 className="text-base sm:text-lg font-bold text-white leading-tight font-sans tracking-tight">
                        {selectedPost.title}
                      </h2>
                      
                      <span className="text-sm font-mono text-[#ff0000] block">Author: Senior systems engineer {selectedPost.author}</span>
                    </div>

                    {/* Paper text */}
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {selectedPost.summary}
                    </p>

                    {/* Styled code container inside document */}
                    <div className="p-4 bg-slate-950/90 border border-slate-900 rounded-lg text-sm leading-relaxed text-slate-300 space-y-3 whitespace-pre-line font-normal font-sans relative">
                      <span className="absolute top-2 right-2.5 text-[13px] font-mono text-slate-650 tracking-widest uppercase">system_log.md</span>
                      
                      {selectedPost.content}
                    </div>

                    {/* Tag index selector */}
                    <div className="flex flex-wrap gap-1 select-none pt-2">
                      {selectedPost.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[13.5px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-850"
                        >
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

              </motion.div>
            )}

            {/* ====== 6. REDESIGNED CONTACT VIEW (COMPACT ADAPTIVE FORM CORE) ====== */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0 justify-center"
              >
                
                {/* Left col: Information Addresses */}
                <div className="w-full md:w-[35%] space-y-4 shrink-0 flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5 select-none text-center md:text-left">
                      <span className="text-[13.5px] font-mono uppercase tracking-widest text-[#ff0000] font-bold">// SECURE REGISTRATION</span>
                      <h1 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Contact Console</h1>
                      <p className="text-sm text-slate-300 font-normal">Connect with our principal advisors in Kampala. Expect responses within 24 hours.</p>
                    </div>

                    {/* Direct lines card */}
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">EMAIL ROUTE:</span>
                          <a href={`mailto:${companyProfile.email}`} className="text-sm font-mono text-white hover:text-brand-red transition break-all select-all leading-tight">
                            {companyProfile.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">TELEPHONE LINE:</span>
                          <a href={`tel:${companyProfile.phone}`} className="text-sm font-mono text-white hover:text-brand-red transition break-all select-all leading-tight">
                            {companyProfile.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-4 h-4 text-[#25D366] mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">WHATSAPP DIRECT:</span>
                          <a href={`https://wa.me/${companyProfile.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-white hover:text-[#25D366] transition break-all select-all leading-tight">
                            {companyProfile.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[13px] font-mono text-slate-500 uppercase block leading-none select-none">KAMPALA OFFICE:</span>
                          <span className="text-sm text-slate-300 leading-tight">
                            {companyProfile.location}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Map Integration */}
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-900 shadow-lg relative">
                    <iframe
                      title="Kampala Office Map"
                      src="https://maps.google.com/maps?q=Haclab%20Company%20Limited,%20Kampala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%) grayscale(20%)' }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                    {/* Subtle inner overlay for blending into the dark UI */}
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/50 rounded-xl mix-blend-overlay"></div>
                  </div>

                  {/* Developers tip */}
                  <div className="p-3 bg-red-950/5 border border-red-900/10 rounded-xl select-none text-center hidden md:block">
                    <span className="text-[13.5px] font-mono text-brand-red block mb-1 font-bold">DEVELOPER CHEATSHEET</span>
                    <p className="text-[12.5px] text-slate-450 leading-relaxed font-mono">
                      Execute <span className="text-white hover:underline cursor-pointer">run Contact_Config.sh</span> under the IDE Workspace mode to stream client parameters directly.
                    </p>
                  </div>

                </div>

                {/* Right col: Form element (compact to fit screen height comfortably) */}
                <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-2xl p-5 flex flex-col justify-center md:overflow-y-auto relative shadow-2xl h-auto md:h-full">
                  
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form 
                        key="contact-form"
                        onSubmit={handleContactSubmit} 
                        className="space-y-3"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Your Name *</label>
                            <input 
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              type="text" 
                              required
                              disabled={loading}
                              placeholder="Douglas Were"
                              className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Email Address *</label>
                            <input 
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              type="email" 
                              required
                              disabled={loading}
                              placeholder="douglas@haclab.net"
                              className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Inquiry Subject</label>
                          <input 
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            type="text" 
                            disabled={loading}
                            placeholder="Custom ERP platform specifications"
                            className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-mono text-slate-450 uppercase font-bold">Project Scope *</label>
                          <textarea 
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                            disabled={loading}
                            rows={3}
                            placeholder="Describe your transaction targets, timelines, and software requirements..."
                            className="w-full bg-slate-950 border border-slate-900 focus:border-brand-red/35 px-3 py-2 rounded text-sm text-white font-medium placeholder-slate-800 outline-none transition resize-none leading-relaxed"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-mono font-bold text-sm rounded transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none shadow-lg shadow-brand-red/10 border border-transparent"
                        >
                          <span>{loading ? 'Submitting secure session...' : 'Send Message Stream'}</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="success-form"
                        className="py-6 flex flex-col items-center justify-center text-center space-y-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red shadow-md">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="space-y-1.5 min-w-0 p-1">
                          <h3 className="text-white text-sm font-bold">Secure Delivery Confirmed</h3>
                          <p className="text-sm text-slate-400 max-w-xs leading-relaxed mx-auto font-normal">
                            Your correspondence has been submitted securely to the Haclab master node. Our technical advisory squad will review and reply shortly.
                          </p>
                        </div>
                        <span className="text-[12px] font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded inline-block select-all leading-none border border-slate-900">
                          status: transaction_hashed_ok
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
          
        </div>
      </div>

      {/* Footer copyright - sized down slightly to save space */}
      <footer className="border-t border-slate-900/60 bg-slate-950 shrink-0 select-none text-center p-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[13.5px] font-mono text-slate-550">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {companyProfile.fullName}.</span>
            <span className="text-brand-red font-bold">Kampala, Uganda.</span>
          </div>
          <div>
            <span>Synthesized in Cloud Container</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/${companyProfile.phone.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:-translate-y-1 transition-transform duration-300 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[13px] font-mono px-3 py-2 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl flex items-center">
          Chat with us
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-[6px] border-transparent border-l-slate-900 border-t-transparent border-b-transparent border-r-0"></span>
        </span>
      </a>
    </div>
  );
}
