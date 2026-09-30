import { useState } from 'react';
import { Eye, Radio, Volume2, Cpu, Network, ChevronRight } from 'lucide-react';
import { HARDWARE_TABS } from '../data/constants';
import { useInView } from '../hooks/useAnimations';

const ICON_MAP = { Eye, Radio, Volume2, Cpu, Network };

const COLOR_MAP = {
  cyan:   { tab: 'text-cyan-400 border-cyan-500',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   dot: 'bg-cyan-400',   badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  amber:  { tab: 'text-amber-400 border-amber-500',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  dot: 'bg-amber-400',  badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  emerald:{ tab: 'text-emerald-400 border-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', dot: 'bg-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  purple: { tab: 'text-purple-400 border-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30', dot: 'bg-purple-400', badge: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
};

export default function ArchitectureSection({ dark }) {
  const [activeTab, setActiveTab] = useState('vision');
  const { ref, inView } = useInView();

  const active = HARDWARE_TABS.find(t => t.id === activeTab);
  const c = COLOR_MAP[active.color] || COLOR_MAP.cyan;
  const ActiveIcon = ICON_MAP[active.icon] || Cpu;

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-slate-950 light:bg-slate-50"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 dark:opacity-5 light:opacity-10"
        style={{ background: 'radial-gradient(ellipse at right, #06b6d4, transparent 70%)' }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 02 — Hardware Architecture</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            Quintuple Sensor Fusion &{' '}
            <span className="gradient-text-cyan">RB5 AI Stack</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Five independent sensor modalities — all processed concurrently by the Qualcomm Hexagon 698 NPU — delivering
            redundant, cross-validated victim intelligence in zero-visibility disaster environments.
          </p>
        </div>

        {/* Tab selector */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {HARDWARE_TABS.map(tab => {
            const TabIcon = ICON_MAP[tab.icon] || Cpu;
            const tc = COLOR_MAP[tab.color] || COLOR_MAP.cyan;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                id={`hw-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? `${tc.tab} ${tc.bg} border-opacity-60`
                    : 'text-slate-500 dark:text-slate-500 light:text-slate-500 border-slate-700/50 dark:border-slate-700/50 light:border-slate-300 hover:text-slate-300 dark:hover:text-slate-300 light:hover:text-slate-700 hover:border-slate-600'
                }`}
              >
                <TabIcon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={activeTab}
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Left: Description */}
          <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm p-8 ${c.border} dark:bg-slate-900/60 light:bg-white/80`}>
            {/* Top-right scan line effect */}
            <div className="scan-overlay opacity-20" />

            {/* Icon + badge */}
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-xl border ${c.border} ${c.bg}`}>
                <ActiveIcon size={28} className={c.tab.split(' ')[0]} />
              </div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded border ${c.badge}`}>
                {active.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold dark:text-white light:text-slate-900 mb-3">{active.title}</h3>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm leading-relaxed mb-6">
              {active.description}
            </p>

            {/* Learn more pseudo link */}
            <div className={`flex items-center gap-1 text-xs font-semibold cursor-default ${c.tab.split(' ')[0]}`}>
              <span>Qualcomm AI Hub Optimized</span>
              <ChevronRight size={12} />
            </div>
          </div>

          {/* Right: Spec table */}
          <div className="rounded-2xl border dark:border-slate-800/60 light:border-slate-200 dark:bg-slate-900/40 light:bg-white/60 backdrop-blur-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
              <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-widest uppercase">
                Hardware Specifications
              </span>
            </div>

            <div className="space-y-0">
              {active.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-start justify-between py-3 ${
                    i < active.specs.length - 1 ? 'border-b border-slate-800/50 dark:border-slate-800/50 light:border-slate-200' : ''
                  }`}
                >
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-500 light:text-slate-400 uppercase tracking-wide min-w-[110px]">
                    {spec.label}
                  </span>
                  <span className={`text-xs font-mono font-semibold text-right flex-1 ml-4 ${c.tab.split(' ')[0]}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Qualcomm badge */}
            <div className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 border border-slate-700/40 dark:border-slate-700/40 light:border-slate-200">
              <Cpu size={11} className="text-purple-400" />
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-wide">
                QUALCOMM FLIGHT RB5 5G PLATFORM | QRB5165 SOC | HEXAGON 698 NPU
              </span>
            </div>
          </div>
        </div>

        {/* Bottom sensor array visualization */}
        <div className={`mt-12 grid grid-cols-5 gap-3 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {HARDWARE_TABS.map(tab => {
            const TabIcon = ICON_MAP[tab.icon] || Cpu;
            const tc = COLOR_MAP[tab.color] || COLOR_MAP.cyan;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative overflow-hidden rounded-xl border p-4 text-center transition-all duration-300 ${
                  isActive
                    ? `${tc.border} ${tc.bg} glow-cyan`
                    : 'border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 dark:bg-slate-900/30 light:bg-white/50 hover:border-slate-600'
                }`}
              >
                {isActive && <div className="scan-overlay opacity-30" />}
                <TabIcon size={20} className={`mx-auto mb-2 ${isActive ? tc.tab.split(' ')[0] : 'text-slate-600 dark:text-slate-600 light:text-slate-400 group-hover:text-slate-400'}`} />
                <div className={`text-[8px] font-mono uppercase tracking-wide ${isActive ? tc.tab.split(' ')[0] : 'text-slate-600 dark:text-slate-600 light:text-slate-400'}`}>
                  {tab.label.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
