import React from 'react';
import { motion } from 'motion/react';
import { Globe, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../../types';
import { toWebp, imgOnError } from './helpers';

interface PortfolioTabProps {
  projectsData: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  selectedProject: Project;
}

export default function PortfolioTab({ projectsData, selectedProjectId, setSelectedProjectId, selectedProject }: PortfolioTabProps) {
  return (
    <motion.div
      key="portfolio"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col md:flex-row gap-6 md:overflow-hidden min-h-0"
    >
      <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0 md:overflow-hidden pr-1">
        <div className="space-y-1.5 select-none shrink-0">
          <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// STABLE CODE DEPLOYMENTS</span>
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
                   <span className="text-[13.5px] font-mono text-brand-red-bright font-semibold bg-brand-red/5 border border-brand-red/10 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <span className="text-[12.5px] font-mono text-slate-400">{project.year}</span>
                </div>

                <div className="min-w-0 pr-1 select-none">
                  <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>{project.title}</h3>
                  <p className="text-[12px] text-slate-450 truncate leading-snug mt-1 font-normal">{project.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative shadow-2xl md:h-full min-h-[350px]">
        <div className="space-y-4 shrink-0 relative z-10">
          <div className="flex items-center justify-between select-none border-b border-slate-900 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000] animate-pulse" />
              <span className="text-[12.5px] font-mono tracking-widest text-slate-350 font-bold uppercase">CASE ARCHITECTURE</span>
            </div>
            <span className="text-[12.5px] font-mono text-brand-red-bright px-2 py-0.5 bg-brand-red/5 border border-brand-red/10 rounded">
              DEPLOYED: {selectedProject.year}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{selectedProject.title}</h3>
            <p className="text-sm text-slate-250 leading-relaxed font-normal">{selectedProject.fullDetails}</p>
          </div>

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

        {selectedProject.imageUrl && (
          <div className="my-4 relative z-10 flex-1 overflow-hidden rounded-xl border border-slate-800 shadow-xl group">
            <img
              src={toWebp(selectedProject.imageUrl)}
              alt={`${selectedProject.title} Interface Snapshot`}
              width="800" height="450" loading="lazy" onError={imgOnError}
              className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-xl"></div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent h-12 pointer-events-none"></div>
          </div>
        )}

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
  );
}
