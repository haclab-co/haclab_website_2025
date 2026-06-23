import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Cpu, MapPin } from 'lucide-react';
import type { companyProfile } from '../../data/haclabData';
import { toWebp, imgOnError } from './helpers';

interface HomeTabProps {
  companyProfile: typeof companyProfile;
  selectedRegion: string;
  setSelectedRegion: (reg: string) => void;
  homeRightTab: 'workflow' | 'awards';
  setHomeRightTab: (tab: 'workflow' | 'awards') => void;
  awardsList: { name: string; provider: string; image: string; rating: string }[];
  telemetry: { status: string; latency: string; load: string; security: string; ip: string; activeDevelopers: number };
  onNavigate: (tab: 'portfolio' | 'contact') => void;
}

const REGIONS_TELEMETRY: Record<string, { status: string; latency: string; load: string; security: string; ip: string; activeDevelopers: number }> = {
  Kampala: { status: 'Primary Master Node', latency: '4ms', load: '18%', security: '99.99%', ip: '197.231.14.88', activeDevelopers: 4 },
  Entebbe: { status: 'Secondary Backup Node', latency: '7ms', load: '12%', security: '100%', ip: '197.231.14.90', activeDevelopers: 2 },
  Jinja: { status: 'Industrial Edge Client', latency: '12ms', load: '24%', security: '99.98%', ip: '197.231.15.5', activeDevelopers: 1 },
  Mbarara: { status: 'Western Regional Gateway', latency: '15ms', load: '8%', security: '99.99%', ip: '197.231.16.21', activeDevelopers: 2 },
  Gulu: { status: 'Northern Operations Mesh', latency: '19ms', load: '5%', security: '99.97%', ip: '197.231.18.4', activeDevelopers: 1 }
};

export default function HomeTab({ companyProfile, selectedRegion, setSelectedRegion, homeRightTab, setHomeRightTab, awardsList, telemetry, onNavigate }: HomeTabProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
    >
      <div className="w-full md:w-[45%] flex flex-col justify-between gap-6 md:overflow-hidden min-w-[320px]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/10 border border-brand-red/15 text-brand-red-bright text-[12.5px] font-mono rounded-full tracking-wider uppercase">
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
              onClick={() => onNavigate('portfolio')}
              className="px-4 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white-pure font-semibold font-mono text-[12.5px] tracking-wider rounded-md flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-lg shadow-brand-red/10 border border-transparent"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold font-mono text-[12.5px] tracking-wider rounded-md flex items-center justify-center gap-2 hover:bg-slate-850 transition duration-150 cursor-pointer"
            >
              <span>SCHEDULE CONSULT</span>
            </button>
          </div>
        </div>

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
                    ? 'bg-brand-red/10 border-brand-red text-brand-red-bright font-bold shadow-md shadow-brand-red/5'
                    : 'bg-slate-905 border-slate-850 hover:border-slate-700 text-slate-400'
                }`}
              >
                {reg.toUpperCase()}
              </button>
            ))}
          </div>

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
              <span className="text-brand-red-bright/80 font-bold truncate block" title={telemetry.status}>
                {telemetry.status.split(' ')[0]} {telemetry.status.split(' ')[1] || ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/10 border border-slate-900 rounded-2xl md:h-full flex flex-col overflow-hidden min-h-[300px] md:min-h-0 shadow-2xl relative">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/30 border-b border-slate-900/80 select-none shrink-0">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[12.5px] font-mono uppercase tracking-widest text-slate-400 font-bold">WORKSPACE MATRIX</span>
          </div>

          <div className="flex border border-slate-800 bg-slate-950 p-1.5 rounded-lg" role="tablist" aria-label="Workspace sections">
            <h2
              role="tab"
              aria-selected={homeRightTab === 'workflow'}
              onClick={() => setHomeRightTab('workflow')}
              className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
                homeRightTab === 'workflow'
                ? 'bg-slate-900 text-brand-red-bright'
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              WORKFLOW LOOP
            </h2>
            <h2
              role="tab"
              aria-selected={homeRightTab === 'awards'}
              onClick={() => setHomeRightTab('awards')}
              className={`px-3 py-1 text-[13.5px] font-mono tracking-tight font-semibold rounded cursor-pointer transition ${
                homeRightTab === 'awards'
                  ? 'bg-slate-900 text-brand-red-bright'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              PARTNER BADGES
            </h2>
          </div>
        </div>

        <div className="flex-1 p-4 md:overflow-y-auto pr-2 scrollbar-thin">
          <AnimatePresence mode="wait">
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
                      <span className="text-[12.5px] font-mono text-brand-red-bright font-bold bg-brand-red/5 border border-brand-red/10 px-1.5 py-0.5 rounded">{item.step}. {item.scope}</span>
                      <span className="text-[13.5px] font-mono text-slate-600 group-hover:text-slate-400">ok_status</span>
                    </div>
                    <h3 className="text-white text-sm font-semibold tracking-tight font-sans">{item.name}</h3>
                    <p className="text-[13px] text-slate-400 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

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
                          src={toWebp(award.image)}
                          alt={award.name}
                          width="48" height="48" loading="lazy" onError={imgOnError}
                          className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white text-sm font-bold leading-tight truncate font-sans">{award.name}</h3>
                        <span className="text-[12.5px] font-mono text-slate-450 block truncate">{award.provider}</span>
                        <span className="text-[13.5px] font-mono text-brand-red-bright font-medium block truncate mt-0.5">{award.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-slate-950 px-4 py-2 text-[13.5px] font-mono text-slate-500 border-t border-slate-900/80 flex items-center justify-between select-none">
          <span>HOST CLUSTER: ACCREDITED_COMPUTATION</span>
          <span className="text-brand-red-bright select-none">v3.0.1 ALPHA</span>
        </div>
      </div>
    </motion.div>
  );
}
