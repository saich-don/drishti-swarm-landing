import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Cpu, Radio, WifiOff, Zap } from 'lucide-react';
import { useScrollPosition } from '../hooks/useAnimations';

const NAV_LINKS = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Disaster Matrix', href: '#disasters' },
  { label: 'Command HUD', href: '#command' },
  { label: 'Feasibility', href: '#feasibility' },
  { label: 'Pitch Defense', href: '#pitch' },
];

export default function Header({ dark, setDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollY = useScrollPosition();

  const scrolled = scrollY > 40;

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand Logo ── */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-cyan-500/20 border border-cyan-500/40 group-hover:border-cyan-400/80 transition-all duration-300" />
              <div className="absolute inset-0 rounded-lg animate-ping bg-cyan-500/10" style={{ animationDuration: '3s' }} />
              <Zap size={18} className="relative text-cyan-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tight text-white dark:text-white light:text-slate-900">
                Drishti-<span className="text-cyan-400">Swarm Net</span>
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-mono font-semibold text-cyan-400/70 tracking-widest uppercase">
                  SIH26177
                </span>
                <span className="text-[8px] text-slate-500 dark:text-slate-500 light:text-slate-400">|</span>
                <span className="text-[9px] font-mono font-semibold text-slate-400 dark:text-slate-400 light:text-slate-500 tracking-widest uppercase">
                  Team SwarmOps
                </span>
              </div>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right Status + Controls ── */}
          <div className="flex items-center gap-3">
            {/* Status pill — hidden on mobile */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/80 border border-emerald-500/25 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <div className="flex items-center gap-1.5 text-[9px] font-mono font-semibold text-emerald-400 tracking-wide">
                <Radio size={9} />
                <span>MESH: 900MHz</span>
                <span className="text-slate-600">|</span>
                <WifiOff size={9} />
                <span>OFFLINE: READY</span>
                <span className="text-slate-600">|</span>
                <Cpu size={9} />
                <span>RB5 NPU: 15 TOPS</span>
              </div>
            </div>

            {/* Dark/Light toggle */}
            <button
              id="theme-toggle"
              onClick={() => setDark(d => !d)}
              aria-label="Toggle dark/light mode"
              className={`p-2 rounded-lg border transition-all duration-300 ${
                dark
                  ? 'border-slate-700 bg-slate-800/50 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10'
                  : 'border-slate-300 bg-white/80 text-slate-700 hover:border-cyan-400/50 hover:bg-cyan-50'
              }`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg border border-slate-700 dark:border-slate-700 light:border-slate-300 text-slate-400 dark:text-slate-400 light:text-slate-600"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-cyan-500/15 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            {/* Status on mobile */}
            <div className="mx-4 mt-2 flex items-center gap-2 px-3 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[9px] font-mono text-emerald-400 tracking-wide">RB5 NPU: 15 TOPS ACTIVE | OFFLINE MODE: READY</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
