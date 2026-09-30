import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Eye, Radio, Shield, ChevronDown } from 'lucide-react';
import HeroSwarmVisual from '../components/HeroSwarmVisual';

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
        else setVal(target);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="stat-number">{val}{suffix}</span>;
}

const FEATURES = [
  {
    icon: Eye,
    title: 'Multi-Modal Sensing',
    desc: 'Thermal + Visual + LiDAR + Radar + Acoustic fusion for victim detection in zero-visibility environments.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/5',
    border: 'border-orange-500/20',
  },
  {
    icon: Zap,
    title: 'Edge AI @ 15 TOPS',
    desc: 'YOLOv10-SAR + FAST-LIO2 SLAM running on Qualcomm Hexagon NPU — no cloud, no internet required.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/20',
  },
  {
    icon: Radio,
    title: 'Self-Healing Mesh',
    desc: '900 MHz Microhard pDDL ad-hoc network ensures zero communication loss across the entire swarm.',
    color: 'text-orange-300',
    bg: 'bg-orange-400/5',
    border: 'border-orange-400/20',
  },
  {
    icon: Shield,
    title: '1kg O₂ Payload',
    desc: 'Compact 1kg mini oxygen cylinder deployed directly to asphyxiating victims in inaccessible zones.',
    color: 'text-amber-300',
    bg: 'bg-amber-400/5',
    border: 'border-amber-400/20',
  },
];

const STATS = [
  { target: 30, suffix: 's', label: 'Victim Detection', sub: 'Time to first contact' },
  { target: 100, suffix: '%', label: 'Offline Operation', sub: 'Zero cloud dependency' },
  { target: 5,  suffix: 'km', label: 'Swarm Coverage', sub: 'Multi-zone radius' },
  { target: 15, suffix: 'W', label: 'AI Power Budget', sub: 'Hexagon NPU @ INT8' },
];

export default function Home() {
  return (
    <div className="page-wrapper overflow-hidden">
      {/* ── Warm background orbs ── */}
      <div className="warm-orb w-[600px] h-[600px] bg-orange-600/8 top-0 right-0" />
      <div className="warm-orb w-[400px] h-[400px] bg-amber-600/6 top-40 left-0" />

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="min-h-[calc(100vh-80px)] flex items-center relative">
        <div className="container-xl grid lg:grid-cols-2 gap-16 items-center py-20">
          {/* Text side */}
          <div className="animate-slide-up">
            <div className="section-tag">Team SwarmOps · SIH26177</div>
            <h1 className="display-heading text-5xl md:text-6xl lg:text-7xl mb-6">
              Search.<br />
              <span className="brand-text">Rescue.</span><br />
              Survive.
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-lg" style={{ color: 'var(--text-2)' }}>
              Autonomous drone swarm that dives into disaster zones, detects survivors through smoke and rubble,
              and delivers life-saving oxygen — with <strong className="font-semibold text-orange-500">zero cloud dependency</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/technology" className="btn-brand">
                Explore Technology <ArrowRight size={16} />
              </Link>
              <Link to="/dashboard" className="btn-outline">
                Live Demo HUD
              </Link>
            </div>
            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {['Qualcomm RB5 5G', 'FLIR Boson 640', 'Livox Mid-360', 'FAST-LIO2 SLAM', 'YOLOv10-SAR'].map(t => (
                <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-orange-800/40 text-orange-400/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed 2D/3D animated hero graphic of an active autonomous drone swarm in formation */}
          <div className="relative flex items-center justify-center w-full">
            <HeroSwarmVisual />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] font-mono text-orange-400">SCROLL</span>
          <ChevronDown size={14} className="text-orange-400 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════ HERO IMAGE ══════════════════════════════ */}
      <section className="section">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden h-64 md:h-96">
            <img
              src="/hero.png"
              alt="Drone swarm over disaster zone"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <p className="text-xs font-mono text-orange-400/70 mb-1">LIVE OPERATION</p>
              <h3 className="text-xl md:text-3xl font-bold text-white">
                When seconds mean lives,<br className="hidden md:block" />
                <span className="brand-text">Drishti never stops flying.</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ STATS ══════════════════════════════ */}
      <section className="section">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="card-glow text-center py-8">
                <div className="text-4xl md:text-5xl font-bold font-sans mb-1">
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <p className="text-sm font-semibold text-orange-200/70 mb-1">{s.label}</p>
                <p className="text-xs text-orange-200/40 font-mono">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURES ══════════════════════════════ */}
      <section className="section">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="section-tag mx-auto justify-center">Core Capabilities</div>
            <h2 className="display-heading text-3xl md:text-4xl">
              Built for the <span className="brand-text">Impossible</span>
            </h2>
            <p className="mt-4 text-orange-200/50 max-w-xl mx-auto">
              Every capability engineered specifically for GPS-denied, smoke-filled, structurally unstable disaster environments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`card group ${f.bg} ${f.border} border`}>
                  <div className={`p-3 rounded-xl ${f.bg} border ${f.border} w-fit mb-4`}>
                    <Icon size={22} className={f.color} />
                  </div>
                  <h3 className="font-semibold brand-text mb-2">{f.title}</h3>
                  <p className="text-sm text-orange-200/50 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA STRIP ══════════════════════════════ */}
      <section className="section">
        <div className="container-lg">
          <div className="cta-banner relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="warm-orb w-64 h-64 bg-orange-600/15 -top-20 left-1/2 -translate-x-1/2" />
            <div className="relative">
              <p className="cta-banner-tag text-xs font-mono uppercase tracking-widest mb-4">Problem Statement SIH26177 · Qualcomm Inc.</p>
              <h2 className="display-heading text-3xl md:text-4xl mb-5">
                Ready to see it in action?
              </h2>
              <p className="cta-banner-subtext mb-8 max-w-lg mx-auto">
                Explore the full technology stack, operational mission flow, and interactive command simulator.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/technology" className="btn-brand">
                  Technology Deep Dive <ArrowRight size={15} />
                </Link>
                <Link to="/mission" className="btn-outline">
                  Mission Flowchart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
