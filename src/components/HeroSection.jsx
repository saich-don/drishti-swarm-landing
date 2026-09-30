import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Play, Cpu, Zap } from 'lucide-react';
import { TELEMETRY_METRICS } from '../data/constants';

function RadarAnimation({ dark }) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer rings */}
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="absolute rounded-full border border-cyan-500/20"
          style={{ width: i * 70, height: i * 70 }}
        />
      ))}

      {/* Pulsing radar rings */}
      {[1, 2, 3].map(i => (
        <div
          key={`pulse-${i}`}
          className="absolute rounded-full border border-cyan-400/40"
          style={{
            width: 100,
            height: 100,
            animation: `radarPing 3s ease-out ${i * 1}s infinite`,
          }}
        />
      ))}

      {/* Drone icon center */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-slate-900/80 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
        <Zap size={28} className="text-cyan-400" />
      </div>

      {/* Rotating sweep line */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ animation: 'rotateSlow 4s linear infinite' }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom"
          style={{
            background: 'linear-gradient(to top, rgba(6,182,212,0.8), transparent)',
          }}
        />
      </div>

      {/* Corner crosshairs */}
      {[
        { top: 4, left: 4 }, { top: 4, right: 4 }, { bottom: 4, left: 4 }, { bottom: 4, right: 4 }
      ].map((style, i) => (
        <div key={i} className="absolute w-3 h-3 border-cyan-400/60" style={{
          ...style,
          borderTopWidth: style.top !== undefined ? 1.5 : 0,
          borderBottomWidth: style.bottom !== undefined ? 1.5 : 0,
          borderLeftWidth: style.left !== undefined ? 1.5 : 0,
          borderRightWidth: style.right !== undefined ? 1.5 : 0,
          borderStyle: 'solid',
        }} />
      ))}

      {/* Drone nodes */}
      {[
        { angle: 30, dist: 80, label: 'D-01', color: '#10b981' },
        { angle: 150, dist: 100, label: 'D-02', color: '#06b6d4' },
        { angle: 270, dist: 90, label: 'D-03', color: '#f59e0b' },
      ].map(({ angle, dist, label, color }) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        return (
          <div
            key={label}
            className="absolute flex flex-col items-center"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div
              className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            <span className="text-[8px] font-mono mt-0.5" style={{ color }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MetricCard({ metric, index, dark }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numStr = metric.value.replace(/[^0-9.<]/g, '');
          const isFloat = numStr.includes('.');
          const num = parseFloat(numStr);
          if (isNaN(num)) { setDisplayed(metric.value); return; }
          let start = null;
          const dur = 1800 + index * 200;
          const animate = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = eased * num;
            const prefix = metric.value.startsWith('<') ? '< ' : metric.value.startsWith('0') ? '0' : '';
            const suffix = metric.value.endsWith('%') ? '%' : '';
            if (isFloat) {
              setDisplayed(`${prefix}${current.toFixed(1)}${suffix}`);
            } else {
              setDisplayed(`${prefix}${Math.floor(current)}${suffix}`);
            }
            if (p < 1) requestAnimationFrame(animate);
            else setDisplayed(metric.value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [metric, index]);

  const colorMap = {
    cyan: { text: 'text-cyan-400', border: 'border-cyan-500/25', bg: 'bg-cyan-500/5', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]' },
    amber: { text: 'text-amber-400', border: 'border-amber-500/25', bg: 'bg-amber-500/5', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]' },
    emerald: { text: 'text-emerald-400', border: 'border-emerald-500/25', bg: 'bg-emerald-500/5', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' },
    red: { text: 'text-red-400', border: 'border-red-500/25', bg: 'bg-red-500/5', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]' },
  };
  const c = colorMap[metric.color] || colorMap.cyan;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 p-5 ${c.border} ${c.bg} ${c.glow}
        dark:bg-slate-900/60 light:bg-white/70`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Scan overlay */}
      <div className="scan-overlay opacity-30" />

      <div className={`text-3xl md:text-4xl font-black font-mono tracking-tight ${c.text} mb-1`}>
        {displayed}
      </div>
      <div className={`text-xs font-bold font-mono uppercase tracking-widest ${c.text} opacity-80 mb-1`}>
        {metric.unit}
      </div>
      <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 leading-snug">
        {metric.label}
      </div>

      {/* Corner bracket */}
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-b border-r ${c.border} opacity-60`} />
      <div className={`absolute top-2 left-2 w-4 h-4 border-t border-l ${c.border} opacity-60`} />
    </div>
  );
}

export default function HeroSection({ dark }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg pt-16"
    >
      {/* ── Background grid ── */}
      <div className="absolute inset-0 hex-bg opacity-50 dark:opacity-50 light:opacity-30" />

      {/* ── Floating gradient orbs ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text content ── */}
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Tag row */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono font-semibold text-cyan-400 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                SIH 2026 | Problem ID: SIH26177
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/60 border border-slate-600/40 rounded-full text-xs font-mono text-slate-400 tracking-wide dark:bg-slate-800/60 light:bg-slate-100 light:text-slate-500">
                <Cpu size={10} />
                Qualcomm Inc. — Lead Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6">
              <span className="dark:text-white light:text-slate-900">Autonomous</span>
              <br />
              <span className="gradient-text-cyan">Edge-AI Swarm</span>
              <br />
              <span className="dark:text-white light:text-slate-900 text-3xl md:text-4xl xl:text-5xl font-extrabold">
                for Multi-Modal
              </span>
              <br />
              <span className="dark:text-slate-300 light:text-slate-600 text-2xl md:text-3xl xl:text-4xl font-semibold">
                Search & Rescue in GPS-Denied Zones
              </span>
            </h1>

            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Built on the <strong className="text-cyan-400">Qualcomm Flight RB5 5G Platform</strong>.{' '}
              <strong className="dark:text-white light:text-slate-800">100% offline resilience</strong>, quintuple-sensor fusion, and autonomous golden-hour triage —
              deploying compact <strong className="text-amber-400">1kg mini oxygen cylinders</strong> directly to trapped victims when every second counts.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                id="cta-command-sim"
                href="#command"
                className="btn-primary flex items-center gap-2"
              >
                <Play size={14} />
                Launch Live Command Simulator
              </a>
              <a
                id="cta-hardware-stack"
                href="#architecture"
                className="btn-secondary flex items-center gap-2"
              >
                <Cpu size={14} />
                Inspect Qualcomm Hardware Stack
              </a>
            </div>

            {/* Qualcomm badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                Qualcomm Flight RB5 | Hexagon NPU | 15 TOPS | Zero-Cloud Dependency
              </span>
            </div>
          </div>

          {/* ── Right: Radar + Metrics ── */}
          <div className={`transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Radar animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-2xl" />
                <RadarAnimation dark={dark} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Telemetry metric cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {TELEMETRY_METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} dark={dark} />
          ))}
        </div>

        {/* ── Scroll indicator ── */}
        <div className="flex justify-center mt-12">
          <a
            href="#architecture"
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors duration-200 group"
            aria-label="Scroll to architecture section"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Explore System</span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
