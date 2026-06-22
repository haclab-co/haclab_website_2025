import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, ShieldCheck, Workflow, Boxes, Package, ListChecks, BarChart3, LayoutGrid,
  AlertCircle, ExternalLink, ShoppingCart, GitBranch, FileText, Settings
} from 'lucide-react';
import type { GeneratedAppDefinition } from '../../data/appCatalog';
import AppProductSchema from '../seo/AppProductSchema';
import { hexToRgba, formatCount, IntegrationBadge, AppLogo, ModuleCard } from './helpers';

interface AppDetailProps {
  app?: GeneratedAppDefinition;
  onBack: () => void;
  onRequestDemo: () => void;
}

export default function AppDetail({ app, onBack, onRequestDemo }: AppDetailProps) {
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
        <button onClick={onBack} className="px-4 py-2 rounded-md text-white-pure font-mono text-sm font-bold cursor-pointer" style={{ backgroundColor: accent }}>
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
                <button onClick={onRequestDemo} className="px-3 py-2 rounded-md text-white-pure font-mono text-[12.5px] font-bold cursor-pointer shrink-0" style={{ backgroundColor: accent }}>
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
                <h3 className="text-sm font-bold text-white">{feature.name}</h3>
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
}
