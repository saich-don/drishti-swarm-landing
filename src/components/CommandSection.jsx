import { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Package, Radio, Cpu, Map, Volume2, Eye, Navigation2, RefreshCw, Shield, Zap } from 'lucide-react';
import { TRIAGE_VICTIMS, ROS_LOGS } from '../data/constants';
import { useInView } from '../hooks/useAnimations';

// ─── Triage Filter Buttons ────────────────────────────────────────────────────
function FilterButton({ label, count, active, onClick, color, id }) {
  const colorMap = {
    all:    'text-slate-400 border-slate-600 bg-slate-800/50 hover:border-slate-500',
    RED:    'text-red-400 border-red-500/40 bg-red-500/10 hover:border-red-400',
    YELLOW: 'text-amber-400 border-amber-500/40 bg-amber-500/10 hover:border-amber-400',
    GREEN:  'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-400',
  };
  const activeMap = {
    all:    'text-white border-slate-400 bg-slate-700 shadow-[0_0_10px_rgba(148,163,184,0.3)]',
    RED:    'text-red-300 border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
    YELLOW: 'text-amber-300 border-amber-500 bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    GREEN:  'text-emerald-300 border-emerald-500 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  };
  return (
    <button
      id={id}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all duration-200 ${
        active ? activeMap[color] || activeMap.all : colorMap[color] || colorMap.all
      } dark:border-opacity-100 light:bg-opacity-80`}
    >
      {label}
      <span className="text-[9px] opacity-70">({count})</span>
    </button>
  );
}

// ─── Victim Card ──────────────────────────────────────────────────────────────
function VictimCard({ victim, dark }) {
  const [actionFired, setActionFired] = useState({ megaphone: false, route: false });

  const codeConfig = {
    RED:    { label: 'CODE RED',    border: 'border-red-500/40',    bg: 'bg-red-500/5',    text: 'text-red-400',    badge: 'bg-red-500/20 border-red-500 text-red-300',    pulse: 'bg-red-500' },
    YELLOW: { label: 'CODE YELLOW', border: 'border-amber-500/40',  bg: 'bg-amber-500/5',  text: 'text-amber-400',  badge: 'bg-amber-500/20 border-amber-500 text-amber-300',  pulse: 'bg-amber-500' },
    GREEN:  { label: 'CODE GREEN',  border: 'border-emerald-500/40',bg: 'bg-emerald-500/5',text: 'text-emerald-400',badge: 'bg-emerald-500/20 border-emerald-500 text-emerald-300',pulse: 'bg-emerald-500' },
  };
  const c = codeConfig[victim.code] || codeConfig.GREEN;

  const fire = (action) => {
    setActionFired(p => ({ ...p, [action]: true }));
    setTimeout(() => setActionFired(p => ({ ...p, [action]: false })), 2000);
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border ${c.border} ${c.bg} dark:bg-slate-900/70 light:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01]`}>
      {/* Scan line */}
      {victim.code === 'RED' && <div className="scan-overlay opacity-20" />}

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {victim.code === 'RED' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.pulse} opacity-75`} />}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${c.pulse}`} />
            </span>
            <span className={`text-xs font-mono font-black ${c.text}`}>
              Victim #{victim.id}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              — Floor {victim.floor}, {victim.location}
            </span>
          </div>
          <div className={`px-2 py-0.5 rounded border text-[9px] font-mono font-black ${c.badge}`}>
            {c.label}
          </div>
        </div>

        {/* Telemetry grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 p-2">
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wide mb-0.5">Thermal</div>
            <div className={`text-sm font-mono font-bold ${c.text}`}>{victim.thermal}</div>
          </div>
          <div className="rounded-lg bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 p-2">
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wide mb-0.5">FMCW Radar</div>
            <div className={`text-sm font-mono font-bold ${c.text}`}>{victim.respiration}</div>
          </div>
          <div className="rounded-lg bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 p-2">
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wide mb-0.5">1kg O₂ Drop</div>
            <div className={`text-sm font-mono font-bold ${victim.o2Dropped ? 'text-emerald-400' : 'text-slate-500'}`}>
              {victim.o2Dropped ? 'DEPLOYED ✓' : 'PENDING'}
            </div>
          </div>
          <div className="rounded-lg bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 p-2">
            <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wide mb-0.5">Drone Node</div>
            <div className="text-sm font-mono font-bold text-cyan-400">{victim.drone}</div>
          </div>
        </div>

        {/* Hazard + Ingress */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-start gap-2">
            <AlertTriangle size={10} className="text-amber-400 mt-0.5 flex-shrink-0" />
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">{victim.hazard}</span>
          </div>
          <div className="flex items-start gap-2">
            <Navigation2 size={10} className="text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">{victim.ingress}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={10} className="text-purple-400 flex-shrink-0" />
            <span className="text-[10px] font-mono text-slate-500">Detected at T+{victim.detected} | Responsive: {victim.responsive ? 'YES' : 'NO'}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            id={`megaphone-${victim.id}`}
            onClick={() => fire('megaphone')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-mono font-semibold transition-all duration-200 flex-1 justify-center ${
              actionFired.megaphone
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10'
            }`}
          >
            <Volume2 size={9} />
            {actionFired.megaphone ? 'BROADCASTING...' : 'Trigger Megaphone'}
          </button>
          <button
            id={`route-${victim.id}`}
            onClick={() => fire('route')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-[10px] font-mono font-semibold transition-all duration-200 flex-1 justify-center ${
              actionFired.route
                ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                : 'border-slate-600 bg-slate-800/40 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            <Map size={9} />
            {actionFired.route ? 'ROUTE ACTIVE' : 'Inspect Ingress Route'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Building Floorplan Map ─────────────────────────────────────────────
function FloorplanMap({ dark }) {
  const floors = [7, 5, 4, 3, 2];
  const dronePositions = [
    { id: 'D-01', x: '30%', y: '65%', color: '#06b6d4', victim: 108 },
    { id: 'D-02', x: '55%', y: '42%', color: '#06b6d4', victim: 104 },
    { id: 'D-03', x: '75%', y: '22%', color: '#10b981', victim: 112 },
  ];

  return (
    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-cyan-500/20 map-grid dark:bg-slate-900 light:bg-slate-100">
      {/* Building outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220">
        {/* Building silhouette */}
        <rect x="60" y="10" width="280" height="200" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" rx="2" />
        {/* Floor lines */}
        {[40, 70, 100, 130, 160, 190].map((y, i) => (
          <line key={i} x1="60" y1={y} x2="340" y2={y} stroke="rgba(6,182,212,0.1)" strokeWidth="1" />
        ))}
        {/* Floor labels */}
        {[7,6,5,4,3,2,1].map((fl, i) => (
          <text key={fl} x="45" y={25 + i * 30} fill="rgba(6,182,212,0.4)" fontSize="8" fontFamily="monospace">F{fl}</text>
        ))}
        {/* Fire indicator floor 3-4 */}
        <rect x="61" y="100" width="100" height="60" fill="rgba(239,68,68,0.08)" />
        <text x="75" y="135" fill="rgba(239,68,68,0.6)" fontSize="7" fontFamily="monospace">FIRE ZONE</text>
        {/* Stairwell B marker */}
        <rect x="300" y="10" width="39" height="200" fill="rgba(6,182,212,0.04)" />
        <text x="305" y="115" fill="rgba(6,182,212,0.3)" fontSize="6" fontFamily="monospace" writingMode="vertical-rl">STAIRWELL B</text>
        {/* Victim markers */}
        <circle cx="170" cy="137" r="5" fill="rgba(239,68,68,0.8)" />
        <text x="177" y="141" fill="#ef4444" fontSize="7" fontFamily="monospace">#104</text>
        <circle cx="130" cy="167" r="5" fill="rgba(245,158,11,0.8)" />
        <text x="137" y="171" fill="#f59e0b" fontSize="7" fontFamily="monospace">#108</text>
        <circle cx="240" cy="25" r="5" fill="rgba(16,185,129,0.8)" />
        <text x="247" y="29" fill="#10b981" fontSize="7" fontFamily="monospace">#112</text>
        {/* Drone nodes */}
        {dronePositions.map((d) => (
          <g key={d.id}>
            <circle cx={d.id === 'D-01' ? 130 : d.id === 'D-02' ? 200 : 270}
                    cy={d.id === 'D-01' ? 160 : d.id === 'D-02' ? 130 : 20}
                    r="6" fill="none" stroke={d.color} strokeWidth="1.5" />
            <circle cx={d.id === 'D-01' ? 130 : d.id === 'D-02' ? 200 : 270}
                    cy={d.id === 'D-01' ? 160 : d.id === 'D-02' ? 130 : 20}
                    r="2.5" fill={d.color} />
            <text x={d.id === 'D-01' ? 138 : d.id === 'D-02' ? 208 : 278}
                  y={d.id === 'D-01' ? 164 : d.id === 'D-02' ? 134 : 24}
                  fill={d.color} fontSize="7" fontFamily="monospace">{d.id}</text>
          </g>
        ))}
        {/* Legend */}
        <circle cx="75" cy="210" r="3" fill="rgba(239,68,68,0.7)" />
        <text x="82" y="213" fill="rgba(239,68,68,0.7)" fontSize="6" fontFamily="monospace">CODE RED</text>
        <circle cx="135" cy="210" r="3" fill="rgba(245,158,11,0.7)" />
        <text x="142" y="213" fill="rgba(245,158,11,0.7)" fontSize="6" fontFamily="monospace">CODE YELLOW</text>
        <circle cx="200" cy="210" r="3" fill="rgba(16,185,129,0.7)" />
        <text x="207" y="213" fill="rgba(16,185,129,0.7)" fontSize="6" fontFamily="monospace">CODE GREEN</text>
        <circle cx="265" cy="210" r="3" fill="rgba(6,182,212,0.7)" stroke="rgba(6,182,212,0.7)" strokeWidth="1" fillOpacity="0" />
        <text x="272" y="213" fill="rgba(6,182,212,0.7)" fontSize="6" fontFamily="monospace">DRONE NODE</text>
      </svg>
    </div>
  );
}

// ─── Scrolling Terminal ───────────────────────────────────────────────────────
function RosTerminal({ dark }) {
  const [logs, setLogs] = useState(ROS_LOGS.slice(0, 12));
  const [running, setRunning] = useState(true);
  const termRef = useRef(null);
  const indexRef = useRef(12);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      const nextLog = ROS_LOGS[indexRef.current % ROS_LOGS.length];
      const newEntry = {
        ...nextLog,
        time: new Date().toISOString().substr(11, 8),
        _id: Date.now(),
      };
      setLogs(prev => [...prev.slice(-20), newEntry]);
      indexRef.current++;
    }, 1500);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [logs]);

  const levelColor = {
    INFO:  'text-cyan-400',
    WARN:  'text-amber-400',
    ERROR: 'text-red-400',
  };
  const levelBg = {
    INFO:  'bg-cyan-500/10 border-cyan-500/20',
    WARN:  'bg-amber-500/10 border-amber-500/20',
    ERROR: 'bg-red-500/10 border-red-500/20',
  };

  return (
    <div className="rounded-xl border border-cyan-500/20 dark:bg-slate-950 light:bg-slate-900 overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/10 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[9px] font-mono text-slate-500 ml-2 tracking-wide">
            /swarm/command_center — ROS 2 Humble Telemetry Feed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[8px] font-mono ${running ? 'text-emerald-400' : 'text-slate-500'}`}>
            {running ? '● LIVE' : '○ PAUSED'}
          </span>
          <button
            id="terminal-toggle"
            onClick={() => setRunning(r => !r)}
            className="p-1 rounded text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label="Pause/resume terminal"
          >
            <RefreshCw size={10} className={running ? 'animate-spin' : ''} style={{ animationDuration: '3s' }} />
          </button>
        </div>
      </div>

      {/* Log output */}
      <div
        ref={termRef}
        className="h-52 overflow-y-auto p-3 space-y-1 scrollbar-thin"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#06b6d4 #0b1329' }}
      >
        {logs.map((log, i) => (
          <div key={log._id || i} className="flex items-start gap-2 font-mono text-[10px] leading-relaxed">
            <span className="text-slate-600 flex-shrink-0">[{log.time}]</span>
            <span className={`px-1 rounded border text-[8px] font-bold flex-shrink-0 ${levelBg[log.level] || levelBg.INFO} ${levelColor[log.level] || levelColor.INFO}`}>
              {log.level}
            </span>
            <span className="text-purple-400 flex-shrink-0 hidden sm:inline">{log.node}</span>
            <span className="text-emerald-300 dark:text-emerald-300 light:text-emerald-600">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── System Status Sidebar ────────────────────────────────────────────────────
function SystemStatus({ dark }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const drones = [
    { id: 'Drone-01', status: 'ACTIVE',    battery: 72, floor: 2, signal: 94 },
    { id: 'Drone-02', status: 'ACTIVE',    battery: 34, floor: 3, signal: 87 },
    { id: 'Drone-03', status: 'ACTIVE',    battery: 88, floor: 7, signal: 96 },
  ];

  return (
    <div className="space-y-3">
      {drones.map(drone => (
        <div key={drone.id} className="rounded-xl border border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 dark:bg-slate-900/60 light:bg-white/70 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" style={{ animationDuration: '2s' }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-xs font-mono font-semibold text-cyan-400">{drone.id}</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
              {drone.status}
            </span>
          </div>

          {/* Battery bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono text-slate-500">BATTERY</span>
              <span className={`text-[9px] font-mono font-bold ${drone.battery < 40 ? 'text-red-400' : 'text-emerald-400'}`}>
                {drone.battery}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${drone.battery < 40 ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: `${drone.battery}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <div className="text-center">
              <div className="text-[8px] font-mono text-slate-500 mb-0.5">FLOOR</div>
              <div className="text-[10px] font-mono font-bold text-cyan-400">F{drone.floor}</div>
            </div>
            <div className="text-center">
              <div className="text-[8px] font-mono text-slate-500 mb-0.5">SIGNAL</div>
              <div className="text-[10px] font-mono font-bold text-cyan-400">{drone.signal}%</div>
            </div>
            <div className="text-center">
              <div className="text-[8px] font-mono text-slate-500 mb-0.5">MESH</div>
              <div className="text-[10px] font-mono font-bold text-emerald-400">LINKED</div>
            </div>
          </div>
        </div>
      ))}

      {/* Swarm stats */}
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/5 light:bg-cyan-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={12} className="text-cyan-400" />
          <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">Swarm Status</span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: 'Drones Active',       value: '3/3',    color: 'text-emerald-400' },
            { label: 'Victims Located',     value: '5',      color: 'text-white dark:text-white light:text-slate-800' },
            { label: 'O₂ Cylinders Dropped',value: '2',      color: 'text-amber-400' },
            { label: 'Telemetry Packets',   value: '247',    color: 'text-cyan-400' },
            { label: 'Cloud Dependency',    value: '0%',     color: 'text-emerald-400' },
            { label: 'Mission Time',        value: '00:12:31', color: 'text-slate-300 dark:text-slate-300 light:text-slate-700' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500 uppercase">{stat.label}</span>
              <span className={`text-[9px] font-mono font-bold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Command HUD Section ─────────────────────────────────────────────────
export default function CommandSection({ dark }) {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView();

  const victims = TRIAGE_VICTIMS.filter(v => filter === 'all' || v.code === filter);
  const counts = {
    all: TRIAGE_VICTIMS.length,
    RED: TRIAGE_VICTIMS.filter(v => v.code === 'RED').length,
    YELLOW: TRIAGE_VICTIMS.filter(v => v.code === 'YELLOW').length,
    GREEN: TRIAGE_VICTIMS.filter(v => v.code === 'GREEN').length,
  };

  return (
    <section
      id="command"
      ref={ref}
      className="relative py-24 overflow-hidden dark:bg-[#0b1329] light:bg-slate-100"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 hex-bg opacity-40 dark:opacity-40 light:opacity-20" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="section-label">Section 05 — Live Interactive HUD</p>
          <h2 className="section-heading dark:text-white light:text-slate-900 mb-4">
            Command Center{' '}
            <span className="gradient-text-cyan">Dashboard & Triage Simulator</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-2xl mx-auto text-sm">
            Interactive mission command panel — simulating a live incident response operation.
            Filter triage codes, trigger megaphone directives, and inspect safe ingress routes.
          </p>

          {/* SIH tag */}
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/5 light:bg-cyan-50">
            <Zap size={10} className="text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest">
              SIMULATED INCIDENT | SIH26177 | TEAM SWARMOPS | OFFLINE MODE: ACTIVE
            </span>
          </div>
        </div>

        <div className={`grid xl:grid-cols-[1fr_340px] gap-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* ── Main panel ── */}
          <div className="space-y-6">
            {/* Floorplan map */}
            <div className="rounded-xl border border-cyan-500/20 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Map size={13} className="text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">Floor Plan — Multi-Story Building Alpha</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </span>
                  <span className="text-[8px] font-mono text-red-400">ACTIVE FIRE ZONE: F3-F4 WEST</span>
                </div>
              </div>
              <FloorplanMap dark={dark} />
            </div>

            {/* Triage filter */}
            <div className="rounded-xl border border-cyan-500/20 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={13} className="text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                    Live Survivor Triage Queue
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <FilterButton id="filter-all"    label="ALL"    count={counts.all}    active={filter === 'all'}    onClick={() => setFilter('all')}    color="all" />
                  <FilterButton id="filter-red"    label="CODE RED"    count={counts.RED}    active={filter === 'RED'}    onClick={() => setFilter('RED')}    color="RED" />
                  <FilterButton id="filter-yellow" label="CODE YELLOW" count={counts.YELLOW} active={filter === 'YELLOW'} onClick={() => setFilter('YELLOW')} color="YELLOW" />
                  <FilterButton id="filter-green"  label="CODE GREEN"  count={counts.GREEN}  active={filter === 'GREEN'}  onClick={() => setFilter('GREEN')}  color="GREEN" />
                </div>
              </div>

              {/* Victim cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {victims.map(victim => (
                  <VictimCard key={victim.id} victim={victim} dark={dark} />
                ))}
                {victims.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-slate-500 font-mono text-xs">
                    No victims in selected triage category.
                  </div>
                )}
              </div>
            </div>

            {/* ROS 2 Terminal */}
            <div className="rounded-xl border border-cyan-500/20 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={13} className="text-purple-400" />
                <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-widest">
                  Simulated ROS 2 Telemetry Terminal
                </span>
              </div>
              <RosTerminal dark={dark} />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Radio size={13} className="text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                Drone Node Status
              </span>
            </div>
            <SystemStatus dark={dark} />
          </div>
        </div>
      </div>
    </section>
  );
}
