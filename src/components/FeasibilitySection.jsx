import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { RISK_MATRIX } from '../data/constants';
import { useInView } from '../hooks/useAnimations';

const RISK_COLOR = {
  HIGH:    { text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
  MEDIUM:  { text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' },
  LOW:     { text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30' },
};
const STATUS_COLOR = {
  SOLVED:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle2 },
  MANAGED:  { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   icon: Clock },
};

export default function FeasibilitySection({ dark }) {
  const { ref, inView } = useInView();

  return (
    <section
      id="feasibility"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-slate-950 light:bg-white"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 06 — Engineering Rigor</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            SWaP-C Feasibility &{' '}
            <span className="gradient-text-cyan">Risk Mitigation Matrix</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm">
            Every engineering challenge anticipated. Every failure mode mitigated. Built to succeed when lives are on the line.
          </p>
        </div>

        {/* SWaP-C summary cards */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Total Payload', value: '~1.2 kg', sub: 'Sensors + 1kg Mini O2 Cylinder', color: 'cyan' },
            { label: 'Flight Endurance', value: '28–32 min', sub: '6S 8000mAh LiPo', color: 'amber' },
            { label: 'AI Inference Budget', value: '< 15W', sub: 'Hexagon NPU INT8 DLC', color: 'emerald' },
            { label: 'Max Takeoff Weight', value: '3.5 kg', sub: 'IP54 Carbon Fiber Hex', color: 'cyan' },
          ].map(stat => {
            const c = { cyan: 'text-cyan-400 border-cyan-500/25 bg-cyan-500/5', amber: 'text-amber-400 border-amber-500/25 bg-amber-500/5', emerald: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5' }[stat.color];
            return (
              <div key={stat.label} className={`rounded-xl border p-5 backdrop-blur-sm dark:bg-slate-900/60 light:bg-white/80 ${c}`}>
                <div className={`text-2xl font-mono font-black mb-1 ${c.split(' ')[0]}`}>{stat.value}</div>
                <div className={`text-[9px] font-mono font-bold uppercase tracking-widest mb-1 ${c.split(' ')[0]}`}>{stat.label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-500 light:text-slate-400">{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Risk Matrix Table */}
        <div className={`rounded-2xl border border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 overflow-hidden transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_4fr_1fr] gap-4 px-6 py-3 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border-b border-slate-800/50 dark:border-slate-800/50 light:border-slate-200">
            {['Challenge', 'Risk Level', 'Mitigation Strategy', 'Status'].map(h => (
              <div key={h} className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500">{h}</div>
            ))}
          </div>

          {/* Rows */}
          {RISK_MATRIX.map((row, i) => {
            const rc = RISK_COLOR[row.risk] || RISK_COLOR.LOW;
            const sc = STATUS_COLOR[row.status] || STATUS_COLOR.SOLVED;
            const StatusIcon = sc.icon;
            return (
              <div
                key={row.challenge}
                className={`grid grid-cols-[2fr_1fr_4fr_1fr] gap-4 px-6 py-4 transition-colors duration-200 hover:bg-slate-800/20 dark:hover:bg-slate-800/20 light:hover:bg-slate-50 ${
                  i < RISK_MATRIX.length - 1 ? 'border-b border-slate-800/30 dark:border-slate-800/30 light:border-slate-100' : ''
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start">
                  <span className="text-xs dark:text-slate-300 light:text-slate-700 font-medium leading-snug">{row.challenge}</span>
                </div>
                <div className="flex items-start">
                  <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border ${rc.text} ${rc.bg} ${rc.border}`}>
                    {row.risk}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">{row.mitigation}</p>
                </div>
                <div className="flex items-start">
                  <div className={`flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${sc.text} ${sc.bg} ${sc.border}`}>
                    <StatusIcon size={9} />
                    {row.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
