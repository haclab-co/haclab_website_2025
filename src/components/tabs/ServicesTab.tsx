import React from 'react';
import { motion } from 'motion/react';
import { CodeXml, Activity, LayoutGrid, ShieldCheck, Cpu, Workflow } from 'lucide-react';
import type { Service } from '../../types';

interface ServicesTabProps {
  servicesData: Service[];
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  selectedService: Service;
}

const renderServiceIcon = (iconName: string, className = "w-5 h-5 text-brand-red") => {
  switch (iconName) {
    case 'CodeXml': return <CodeXml className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'LayoutGrid': return <LayoutGrid className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Workflow': return <Workflow className={className} />;
    default: return <CodeXml className={className} />;
  }
};

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
    default: return [];
  }
};

export default function ServicesTab({ servicesData, selectedServiceId, setSelectedServiceId, selectedService }: ServicesTabProps) {
  return (
    <motion.div
      key="services"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
    >
      <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
        <div className="space-y-1.5 select-none shrink-0">
          <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// SYSTEM PILLARS</span>
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
                  isSelected ? 'bg-brand-red/10 border-brand-red/20 text-brand-red-bright' : 'bg-slate-950 border-slate-900 text-slate-400'
                }`}>
                  {renderServiceIcon(s.iconName, "w-4 h-4")}
                </div>
                <div className="min-w-0 pr-1 select-none">
                  <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{s.title}</h3>
                  <p className="text-[12px] text-slate-400 truncate leading-snug mt-1 font-normal">{s.shortDescription}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#090d16_1px,transparent_1px),linear-gradient(to_bottom,#090d16_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_25%_25%_at_50%_50%,#000_100%,transparent_100%)] opacity-35 pointer-events-none" />

        <div className="relative z-10 space-y-3 shrink-0">
          <div className="flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-red/5 border border-brand-red/15 rounded text-[13.5px] font-mono text-brand-red-bright">
              <Cpu className="w-3 h-3 animate-ping" />
              <span>BLUEPRINT MATRIX</span>
            </div>
            <span className="text-[12.5px] font-mono text-slate-400 font-bold select-all">service_class: {selectedService.id}</span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-white tracking-tight">{selectedService.title}</h3>
            <p className="text-sm text-slate-200 font-normal leading-relaxed max-w-2xl">{selectedService.longDescription}</p>
          </div>

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

        <div className="relative z-10 my-4 p-4 bg-slate-950/60 border border-slate-850/60 rounded-xl flex-1 flex flex-col justify-center min-h-[160px] max-h-[220px] select-none overflow-y-auto scrollbar-none">
          <span className="absolute top-2.5 right-2.5 text-[13px] font-mono text-slate-650 tracking-widest">// COMPILATION FLOW</span>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 md:gap-3 px-1 sm:px-4">
            {renderServiceSchematic(selectedService.id).map((node, nIdx, arr) => (
              <React.Fragment key={nIdx}>
                <div className="w-full sm:w-[22%] p-2 rounded border bg-slate-900/40 text-center space-y-0.5 relative hover:border-brand-red/10 transition group">
                  <span className="text-[13px] font-mono text-slate-500">STAGE 0{nIdx + 1}</span>
                  <div className="text-[12.5px] text-white font-bold tracking-tight uppercase truncate block font-sans" title={node.name}>
                    {node.name}
                  </div>
                  <p className="text-[13px] text-slate-420 line-clamp-1 leading-normal font-normal" title={node.desc}>
                    {node.desc}
                  </p>
                </div>

                {nIdx < arr.length - 1 && (
                  <div className="text-slate-700 font-mono text-sm hidden sm:block shrink-0 animate-pulse">
                    ➔
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-3 bg-brand-red/5 border border-brand-red/15 rounded-lg text-[12.5px] font-mono flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 select-none">
          <div className="flex items-center gap-1.5 text-slate-350">
            <span className="font-bold text-brand-red-bright uppercase">DEPLOY ENVIRONMENT:</span>
            <span className="text-slate-300 font-bold">{selectedService.useCase}</span>
          </div>
          <span className="text-slate-500 text-[13.5px]">Uptime guarantee: 99.999%</span>
        </div>
      </div>
    </motion.div>
  );
}
