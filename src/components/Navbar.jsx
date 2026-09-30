import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './Logo';

const LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/technology', label: 'Technology' },
  { to: '/mission',    label: 'Mission' },
  { to: '/scenarios',  label: 'Scenarios' },
  { to: '/dashboard',  label: 'Dashboard' },
  { to: '/about',      label: 'About' },
];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? (dark
              ? 'bg-brand-900/95 backdrop-blur-xl border-b border-orange-900/40 shadow-brand-sm'
              : 'bg-[#fffaf4]/95 backdrop-blur-xl border-b border-amber-900/15 shadow-sm')
          : 'bg-transparent'
      }`}
    >
      <nav className="container-xl">
        <div className="flex items-center justify-between min-h-[5rem] md:min-h-[5.75rem] py-1.5">
          {/* Logo */}
          <NavLink to="/" aria-label="Home" className="flex items-center">
            <Logo />
          </NavLink>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
              dark
                ? 'border-orange-800/40 bg-brand-850/50 text-orange-400/80'
                : 'border-amber-700/20 bg-amber-100/70 text-amber-900 font-medium'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-orange-400 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-[10px] font-mono tracking-widest">SIH26177 · OFFLINE READY</span>
            </div>

            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                dark
                  ? 'border-orange-800/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50'
                  : 'border-amber-700/25 text-amber-900 bg-amber-100/60 hover:bg-amber-200/70 hover:border-amber-500/50'
              }`}
            >
              {dark ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-amber-900" />}
            </button>

            {/* Mobile menu */}
            <button
              id="mobile-menu"
              className={`lg:hidden p-2 rounded-lg border transition-colors ${
                dark
                  ? 'border-orange-800/40 text-orange-400'
                  : 'border-amber-700/25 text-amber-900'
              }`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className={`lg:hidden border-t py-3 space-y-1 backdrop-blur-xl transition-colors ${
            dark
              ? 'border-orange-900/40 bg-brand-900/98'
              : 'border-amber-900/15 bg-[#fffaf4]/98'
          }`}>
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-orange-500 bg-orange-500/10 font-semibold'
                      : (dark
                          ? 'text-orange-200/70 hover:text-orange-400 hover:bg-orange-500/5'
                          : 'text-amber-950/70 hover:text-orange-600 hover:bg-orange-500/10')
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
