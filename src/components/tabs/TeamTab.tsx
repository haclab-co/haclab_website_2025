import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import type { TeamMember } from '../../types';
import { toWebp, imgOnError } from './helpers';

interface TeamTabProps {
  teamData: TeamMember[];
}

export default function TeamTab({ teamData }: TeamTabProps) {
  return (
    <motion.div
      key="team"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full h-auto md:h-full flex flex-col gap-5 md:overflow-hidden min-h-0 justify-between"
    >
      <div className="space-y-1 select-none shrink-0 text-center md:text-left">
        <span className="text-[13.5px] font-mono uppercase tracking-widest text-brand-red-bright font-bold">// CORE ENGINEERS</span>
        <h1 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">Kampala Systems Squad</h1>
        <p className="text-sm text-slate-300 font-normal max-w-xl">Our multidisciplinary developers operate locally to construct fast secure systems.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-0 md:overflow-hidden">
        {teamData.map((member, idx) => (
          <div
            key={idx}
            className="bg-slate-900/15 border border-slate-900 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-brand-red/20 transition-all group h-auto md:h-full relative md:overflow-y-auto"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0 select-none relative group sm:mx-0 mx-auto">
              <img
              src={toWebp(member.avatar)}
              alt={member.name}
              width="80" height="80" loading="lazy" onError={imgOnError}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-brand-red/0 group-hover:border-brand-red/30 transition-all" />
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-bold text-white tracking-tight">{member.name}</h2>
                  <span className="text-[13px] font-mono text-emerald-450 bg-emerald-950/10 border border-emerald-900/20 px-1.5 py-0.5 rounded leading-none select-none">
                    ACTIVE
                  </span>
                </div>

                <p className="text-[13px] font-mono text-brand-red-bright font-bold leading-none">{member.role.toUpperCase()}</p>
                <p className="text-[13.5px] text-slate-300 leading-relaxed font-normal pt-1">
                  {member.bio}
                </p>
              </div>

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

      <div className="bg-slate-950/60 border border-slate-900 p-2.5 rounded-lg flex items-center gap-2 select-none shrink-0 justify-center">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
        <p className="text-[12px] font-mono text-slate-500 text-center">Kampala Operations coordinates are secure. Standard non-disclosure acts apply strictly.</p>
      </div>
    </motion.div>
  );
}
