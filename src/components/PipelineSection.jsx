import { useState } from 'react';
import { Compass, GitBranch, Crosshair, Package, Map, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { MISSION_PHASES } from '../data/constants';
import { useInView } from '../hooks/useAnimations';

const ICON_MAP = { Compass, GitBranch, Crosshair, Package, Map };

const COLOR_MAP = {
  cyan:   { text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   line: 'bg-cyan-500',   glow: 'shadow-[0_0_15px_rgba(6,182,212,0.35)]' },
  amber:  { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  line: 'bg-amber-500',  glow: 'shadow-[0_0_15px_rgba(245,158,11,0.35)]' },
  red:    { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30',    line: 'bg-red-500',    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.35)]' },
  emerald:{ text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30',line: 'bg-emerald-500',glow: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]' },
};

export default function PipelineSection({ dark }) {
  const [expanded, setExpanded] = useState(0);
  const { ref, inView } = useInView();

  return (
    <section
      id="pipeline"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-[#0b1329] light:bg-slate-100"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full opacity-5"
        style={{ background: 'radial-gradient(ellipse at left, #f59e0b, transparent 60%)' }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 03 — Mission Workflow</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            The 5-Phase{' '}
            <span className="gradient-text-amber">Operational Pipeline</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            From ground deployment to autonomous victim extraction — a fully offline, AI-orchestrated rescue mission
            executed by the swarm without human micromanagement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {MISSION_PHASES.map((phase, idx) => {
            const c = COLOR_MAP[phase.color] || COLOR_MAP.cyan;
            const PhaseIcon = ICON_MAP[phase.icon] || Map;
            const isExpanded = expanded === idx;

            return (
              <div
                key={phase.phase}
                className={`relative transition-all duration-700 ${
                  inView ? 'opacity-100 translate-x-0' : `opacity-0 ${idx % 2 === 0 ? '-translate-x-8' : 'translate-x-8'}`
                }`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                {/* Connector line */}
                {idx < MISSION_PHASES.length - 1 && (
                  <div className={`absolute left-8 top-full w-0.5 h-6 ${c.line} opacity-40 z-10`} />
                )}

                <button
                  id={`phase-${phase.phase}`}
                  className={`w-full text-left mb-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? `${c.border} ${c.bg} ${c.glow} dark:bg-slate-900/80 light:bg-white/90`
                      : 'border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 dark:bg-slate-900/30 light:bg-white/50 hover:border-slate-700 dark:hover:border-slate-700 light:hover:border-slate-300'
                  }`}
                  onClick={() => setExpanded(isExpanded ? -1 : idx)}
                  aria-expanded={isExpanded}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-5">
                    {/* Phase badge */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${c.border} ${c.bg}`}>
                      <PhaseIcon size={18} className={c.text} />
                      <span className={`text-[8px] font-mono font-black mt-1 ${c.text}`}>PHASE</span>
                      <span className={`text-[8px] font-mono font-black ${c.text}`}>{phase.phase}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`text-[9px] font-mono font-semibold uppercase tracking-widest mb-1 ${c.text}`}>
                        Phase {phase.phase}
                      </div>
                      <h3 className="font-bold dark:text-white light:text-slate-900 text-base leading-snug">
                        {phase.title}
                      </h3>
                    </div>

                    {/* Progress indicators */}
                    <div className="flex items-center gap-2">
                      {idx === 0 && <span className="status-cyan">INITIATED</span>}
                      {idx === 1 && <span className="status-amber">ACTIVE</span>}
                      {idx === 2 && <span className="status-red">SCANNING</span>}
                      {idx === 3 && <span className="status-emerald">DEPLOYED</span>}
                      {idx === 4 && <span className="status-cyan">ROUTING</span>}
                      {isExpanded ? <ChevronUp size={16} className={c.text} /> : <ChevronDown size={16} className="text-slate-500" />}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 pt-4">
                      <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed mb-4">
                        {phase.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className={`${c.text} mt-0.5 flex-shrink-0`} />
                            <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className={`mt-12 max-w-4xl mx-auto transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/5 light:bg-cyan-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-1">Zero-Cloud Dependency</div>
              <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                All 5 phases execute autonomously on-device using Qualcomm Hexagon NPU INT8 inference —{' '}
                <strong className="dark:text-white light:text-slate-800">no internet, no cloud, no server required</strong>.
                The swarm operates even when cellular towers are destroyed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
