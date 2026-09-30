import { TrendingUp, Globe, Leaf, Cpu, Camera, WifiOff, Shield, Users, DollarSign, Zap } from 'lucide-react';
import { useInView } from '../hooks/useAnimations';

const QUALCOMM_DIFFERENTIATORS = [
  {
    id: 'hetero-compute',
    num: '01',
    title: 'Heterogeneous Edge Compute Efficiency',
    icon: Cpu,
    color: 'cyan',
    description: 'Kryo CPU + Adreno GPU + Hexagon Tensor NPU running FAST-LIO2 SLAM + multi-model INT8 inference concurrently under 15W. No other commercial drone platform matches this performance-per-watt ratio.',
    specs: ['QRB5165 SoC | 15 TOPS @ < 15W', 'INT8 DLC via Qualcomm AI Hub + QNN SDK', 'Concurrent SLAM + YOLOv10 + Thermal CNN + Doppler'],
  },
  {
    id: 'multicam-concurrency',
    num: '02',
    title: 'Native Multi-Camera ISP Concurrency',
    icon: Camera,
    color: 'purple',
    description: 'Qualcomm Spectra 480 CV-ISP processes 4K visual (Sony IMX577) and FLIR radiometric thermal feeds simultaneously with zero frame drops — enabling real-time cross-validated victim detection.',
    specs: ['Spectra 480 ISP | Concurrent 4K + LWIR', 'RGB + Thermal pixel-aligned fusion', '30+ FPS victim detection in smoke and darkness'],
  },
  {
    id: 'offline-autonomy',
    num: '03',
    title: 'True Network-Resilient Offline Autonomy',
    icon: WifiOff,
    color: 'emerald',
    description: 'On-device INT8 DLC execution with store-and-forward SQLite mesh guarantees mission success when cloud systems, cellular towers, and GPS satellites are all simultaneously destroyed.',
    specs: ['0% cloud dependency — 100% edge inference', 'SQLite ring-buffer: 0 telemetry packets lost', 'Microhard pDDL self-healing ad-hoc mesh'],
  },
];

const IMPACT_METRICS = [
  { icon: Users, label: 'Social Impact', color: 'cyan',
    points: ['70% faster victim discovery in golden hour', 'Zero additional responder fatalities from building entry', 'Direct 1kg mini O2 cylinder lifeline to asphyxiating victims', 'Works in total GPS denial — subterranean, indoors, tunnels'] },
  { icon: DollarSign, label: 'Economic Impact', color: 'amber',
    points: ['10× cheaper per sortie vs. manned helicopter operations', 'Early 3D structural damage mapping reduces reconstruction cost', 'Eliminates need for specialized HAZMAT entry teams', 'Reusable swarm platform across all 5 disaster typologies'] },
  { icon: Leaf, label: 'Environmental Impact', color: 'emerald',
    points: ['Rapid fire containment mapping reduces burn footprint', 'Hazmat plume tracking prevents toxic spread escalation', 'Flood water rise prediction enables proactive dam management', 'Electric propulsion — zero combustion footprint per mission'] },
];

export default function PitchSection({ dark }) {
  const { ref, inView } = useInView();

  return (
    <section
      id="pitch"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-[#0b1329] light:bg-slate-100"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      <div className="absolute inset-0 hex-bg opacity-30 dark:opacity-30 light:opacity-15" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 07 — Pitch Defense</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            Strategic Impact &{' '}
            <span className="gradient-text-cyan">Qualcomm Differentiators</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm">
            Why Drishti-Swarm Net wins — built specifically to showcase Qualcomm's full heterogeneous compute stack
            in the highest-stakes real-world application possible.
          </p>
        </div>

        {/* ── Qualcomm Differentiators ── */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-6">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">3 Qualcomm Differentiators for Judges</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {QUALCOMM_DIFFERENTIATORS.map(d => {
              const DIcon = d.icon;
              const c = {
                cyan:   { border: 'border-cyan-500/30',   bg: 'bg-cyan-500/5',   text: 'text-cyan-400',   iconBg: 'bg-cyan-500/10 border-cyan-500/30' },
                purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400', iconBg: 'bg-purple-500/10 border-purple-500/30' },
                emerald:{ border: 'border-emerald-500/30',bg: 'bg-emerald-500/5',text: 'text-emerald-400',iconBg: 'bg-emerald-500/10 border-emerald-500/30' },
              }[d.color];
              return (
                <div
                  key={d.id}
                  id={`differentiator-${d.id}`}
                  className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] dark:bg-slate-900/60 light:bg-white/80 ${c.border} ${c.bg}`}
                >
                  <div className="scan-overlay opacity-20" />
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${c.iconBg}`}>
                      <DIcon size={20} className={c.text} />
                    </div>
                    <span className={`text-3xl font-black font-mono ${c.text} opacity-20`}>{d.num}</span>
                  </div>
                  <h3 className="font-bold dark:text-white light:text-slate-900 text-base mb-3 leading-snug">{d.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed mb-4">{d.description}</p>
                  <div className="space-y-1.5">
                    {d.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${c.text.replace('text-', 'bg-')}`} />
                        <span className={`text-[10px] font-mono ${c.text}`}>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Triple Impact ── */}
        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-6">
            <Globe size={14} className="text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Triple Impact Metrics</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {IMPACT_METRICS.map(m => {
              const MIcon = m.icon;
              const c = {
                cyan:   { border: 'border-cyan-500/25',   bg: 'bg-cyan-500/5',   text: 'text-cyan-400',   dot: 'bg-cyan-400' },
                amber:  { border: 'border-amber-500/25',  bg: 'bg-amber-500/5',  text: 'text-amber-400',  dot: 'bg-amber-400' },
                emerald:{ border: 'border-emerald-500/25',bg: 'bg-emerald-500/5',text: 'text-emerald-400',dot: 'bg-emerald-400' },
              }[m.color];
              return (
                <div key={m.label} className={`rounded-2xl border p-6 dark:bg-slate-900/50 light:bg-white/80 backdrop-blur-sm ${c.border} ${c.bg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${c.bg} border ${c.border}`}>
                      <MIcon size={16} className={c.text} />
                    </div>
                    <h3 className={`font-bold text-base ${c.text}`}>{m.label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {m.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                        <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Closing CTA ── */}
        <div className={`mt-16 text-center transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex flex-col items-center gap-4 px-10 py-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/5 light:bg-cyan-50">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-cyan-400" />
              <span className="text-xl font-black dark:text-white light:text-slate-900">
                Drishti-Swarm Net × Qualcomm
              </span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg text-center">
              Saving lives where clouds fail, GPS fails, and humans cannot enter —
              <strong className="text-cyan-400"> 100% Offline. 100% Autonomous. 100% Edge.</strong>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#command" className="btn-primary flex items-center gap-2">
                <Zap size={13} />
                Launch Command Simulator
              </a>
              <a href="#architecture" className="btn-secondary flex items-center gap-2">
                <Cpu size={13} />
                Explore RB5 Architecture
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-2">
              <span>SIH26177</span>
              <span>•</span>
              <span>Team SwarmOps</span>
              <span>•</span>
              <span>Qualcomm Inc.</span>
              <span>•</span>
              <span>SIH 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
