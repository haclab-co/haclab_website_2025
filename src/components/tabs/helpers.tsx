import React from 'react';
import { BarChart3, FileText, ShoppingCart, GitBranch, Settings, ListChecks } from 'lucide-react';
import type { GeneratedAppDefinition } from '../../data/appCatalog';
import { ModuleDefinition } from '../../types';

export const toWebp = (src: string) => src.replace(/\.(png|jpg|jpeg)(\?.*)?$/i, '.webp');

export const imgOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  const fallback = img.src.replace(/\.webp$/i, '.png');
  if (img.src !== fallback) img.src = fallback;
};

export const formatCount = (value: number, label: string) => `${value} ${label}${value === 1 ? '' : 's'}`;

export const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const isShort = normalized.length === 3;
  const full = isShort ? normalized.split('').map((char) => char + char).join('') : normalized;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const IntegrationBadge: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; tone?: string }> = ({ icon, label, active = true, tone = '#ff0000' }) => (
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

export const AppLogo = ({ app, className = 'w-9 h-9' }: { app: Pick<GeneratedAppDefinition, 'name' | 'color' | 'logoPath'>; className?: string }) => (
  <span
    className={`${className} rounded-lg border border-slate-850 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0`}
    style={{ boxShadow: `inset 0 0 0 1px ${app.color}22` }}
  >
    {app.logoPath ? (
      <img src={toWebp(app.logoPath)} alt={`${app.name} logo`} width="36" height="36" loading="lazy" onError={imgOnError} className="w-full h-full object-contain p-1" />
    ) : (
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: app.color }} />
    )}
  </span>
);

export const ModuleCard: React.FC<{ module: ModuleDefinition }> = ({ module }) => (
  <div className="bg-slate-950/65 border border-slate-900 rounded-xl p-3.5 space-y-3 min-w-0">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-white leading-tight truncate" title={module.name}>{module.name}</h3>
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
            <span key={action} className="text-[12px] font-mono rounded border border-brand-red/10 bg-brand-red/5 text-brand-red-bright px-2 py-0.5">
              {action}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);
