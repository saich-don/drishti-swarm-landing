import { useState } from 'react';
import { Flame, Waves, Boxes, Navigation, AlertTriangle, ChevronRight, Zap } from 'lucide-react';
import { DISASTER_SCENARIOS } from '../data/constants';
import { useInView } from '../hooks/useAnimations';

const ICON_MAP = { Flame, Waves, Boxes, Navigation, AlertTriangle };

const COLOR_MAP = {
  red:    { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30',    tab: 'border-b-red-500',    dot: 'bg-red-400' },
  blue:   { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   tab: 'border-b-blue-500',   dot: 'bg-blue-400' },
  amber:  { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  tab: 'border-b-amber-500',  dot: 'bg-amber-400' },
  emerald:{ text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30',tab: 'border-b-emerald-500',dot: 'bg-emerald-400' },
};

export default function DisasterSection({ dark }) {
  const [active, setActive] = useState('fire');
  const { ref, inView } = useInView();

  const scenario = DISASTER_SCENARIOS.find(s => s.id === active);
  const c = COLOR_MAP[scenario.color] || COLOR_MAP.red;
  const ScenarioIcon = ICON_MAP[scenario.icon] || Flame;

  return (
    <section
      id="disasters"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-slate-950 light:bg-slate-50"
    >
      <div className="absolute inset-0 hex-bg opacity-30 dark:opacity-30 light:opacity-20" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 04 — Use Case Deep-Dive</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            Disaster Scenarios{' '}
            <span className="gradient-text-cyan">Matrix</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm">
            Five distinct disaster types — each with unique environmental challenges — all defeated by the same autonomous swarm system.
          </p>
        </div>

        {/* Scenario tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {DISASTER_SCENARIOS.map(s => {
            const sc = COLOR_MAP[s.color] || COLOR_MAP.red;
            const Icon = ICON_MAP[s.icon] || Flame;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                id={`disaster-tab-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? `${sc.text} ${sc.bg} ${sc.border}`
                    : 'text-slate-500 dark:text-slate-500 light:text-slate-500 border-slate-700/50 dark:border-slate-700/50 light:border-slate-300 hover:text-slate-300 dark:hover:text-slate-300 light:hover:text-slate-700'
                }`}
              >
                <Icon size={13} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={scenario.id}
          className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Title bar */}
          <div className={`rounded-t-2xl border-t border-l border-r ${c.border} dark:bg-slate-900/80 light:bg-white/90 p-6 flex items-start gap-4`}>
            <div className={`p-3 rounded-xl border ${c.border} ${c.bg} flex-shrink-0`}>
              <ScenarioIcon size={24} className={c.text} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold dark:text-white light:text-slate-900 mb-1">{scenario.title}</h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-500 light:text-slate-400">{scenario.subtitle}</p>
            </div>
            {/* Stats bar */}
            <div className="hidden md:flex items-center gap-4">
              {scenario.stats.map(stat => (
                <div key={stat.label} className="text-right">
                  <div className={`text-sm font-mono font-bold ${c.text}`}>{stat.value}</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Body grid */}
          <div className={`grid lg:grid-cols-3 border ${c.border} rounded-b-2xl overflow-hidden`}>
            {/* Column 1: Environment */}
            <div className="p-6 dark:bg-slate-900/60 light:bg-white/80 border-r border-slate-800/40 dark:border-slate-800/40 light:border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500">Environmental Challenge</span>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">{scenario.environment}</p>
            </div>

            {/* Column 2: Sensor Synergy */}
            <div className="p-6 dark:bg-slate-900/60 light:bg-white/80 border-r border-slate-800/40 dark:border-slate-800/40 light:border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500">Sensor Synergy</span>
              </div>
              <div className="space-y-3">
                {scenario.sensorSynergy.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight size={11} className={`${c.text} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className={`text-[10px] font-mono font-semibold ${c.text} mb-0.5`}>{s.sensor}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-500">{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Intervention + Extraction */}
            <div className="p-6 dark:bg-slate-900/60 light:bg-white/80">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500">Intervention</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap size={11} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">{scenario.intervention}</p>
                </div>
              </div>
              <div className="border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500">Extraction Protocol</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight size={11} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">{scenario.extraction}</p>
                </div>
              </div>

              {/* Mobile stats */}
              <div className="md:hidden mt-4 flex gap-4 flex-wrap border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 pt-4">
                {scenario.stats.map(stat => (
                  <div key={stat.label}>
                    <div className={`text-sm font-mono font-bold ${c.text}`}>{stat.value}</div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
