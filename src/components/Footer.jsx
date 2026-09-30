import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Github, ExternalLink } from 'lucide-react';

export default function Footer({ dark }) {
  return (
    <footer className={`border-t transition-colors duration-300 mt-auto ${
      dark
        ? 'border-orange-900/30 bg-brand-950'
        : 'border-amber-900/15 bg-[#fff3e3]'
    }`}>
      <div className="container-xl py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo size={72} />
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Autonomous Edge-AI Swarm for Multi-Modal Search & Rescue in GPS-Denied Disaster Zones.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="badge-brand">SIH26177</span>
              <span className="badge-amber">Team SwarmOps</span>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--amber)' }}>Navigation</h4>
            <ul className="space-y-2">
              {[
                { to: '/',           label: 'Home' },
                { to: '/technology', label: 'Technology' },
                { to: '/mission',    label: 'Mission' },
                { to: '/scenarios',  label: 'Scenarios' },
                { to: '/dashboard',  label: 'Dashboard' },
                { to: '/about',      label: 'About' },
              ].map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className="text-sm transition-colors hover:text-orange-500"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--amber)' }}>Project Info</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>Qualcomm Flight RB5 5G Platform</li>
              <li>15 TOPS Hexagon NPU</li>
              <li>100% Offline Edge Autonomy</li>
              <li>Smart India Hackathon 2026</li>
            </ul>
            <a
              href="https://developer.qualcomm.com/hardware/flight-rb5-5g"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-orange-600 hover:text-orange-500 transition-colors"
            >
              <ExternalLink size={11} /> Qualcomm RB5 Docs
            </a>
          </div>
        </div>

        <div className="brand-divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2026 Team SwarmOps · SIH26177 · Proof-of-Concept Submission
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-orange-500 opacity-60" />
              <span className="relative rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-orange-600">Zero Cloud Dependency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
