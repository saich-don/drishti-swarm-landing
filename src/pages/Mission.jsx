import { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const PHASES = [
  {
    num: '01',
    label: 'Geo-Mapping',
    actor: 'Mother Drone',
    color: '#b45309',
    duration: '0–3 min',
    icon: '🛸',
    title: 'Exterior Perimeter Mapping',
    desc: 'The single Mother Drone performs a rapid exterior sweep of the structure, building a geo-referenced 3D point cloud using Livox Mid-360 LiDAR and 77 GHz FMCW radar to identify structural damage, safe entry points, and fire/hazard zones.',
    outputs: ['3D OctoMap of building', 'Entry point ranking', 'Hazard zone overlay', 'GPS-free coordinate frame'],
    tech: ['Livox Mid-360', '77GHz Radar', 'FAST-LIO2', 'OctoMap'],
  },
  {
    num: '02',
    label: 'Swarm Ingress',
    actor: 'Swarm Drones',
    color: '#d97706',
    duration: '3–6 min',
    icon: '🚁',
    title: 'Interior Autonomous Navigation',
    desc: 'The swarm of micro-drones ingresses through ranked entry points. Each drone builds a local map incrementally, shares it over the mesh network, and navigates around debris using A* hazard-weighted path planning.',
    outputs: ['Interior floor-by-floor 3D map', 'Mesh network topology', 'Collision-free paths', 'Thermal anomaly zones'],
    tech: ['ROS 2 Humble', 'Micro-ROS', 'A* Planner', 'Microhard pDDL'],
  },
  {
    num: '03',
    label: 'Victim Detection',
    actor: 'Swarm Drones',
    color: '#f97316',
    duration: '6–20 min',
    icon: '🔍',
    title: 'Multi-Modal Survivor Detection',
    desc: 'All five sensor modalities work in parallel: thermal blob detection at 35–38°C, YOLOv10-SAR visual detection, micro-Doppler vital sign classification, acoustic distress CNN, and LiDAR shape classification — cross-validated to eliminate false positives.',
    outputs: ['Victim GPS-denied coordinates', 'Triage score (Red/Yellow/Green)', 'Vitals estimate', 'Confidence score'],
    tech: ['YOLOv10-SAR', 'Thermal CNN', 'Doppler Classifier', 'Acoustic CNN'],
  },
  {
    num: '04',
    label: 'O₂ Delivery',
    actor: 'Closest Swarm Drone',
    color: '#ea580c',
    duration: '< 2 min',
    icon: '💊',
    title: '1kg Mini O₂ Cylinder Drop',
    desc: 'The nearest available drone navigates to the victim\'s coordinates and deploys the compact 1kg mini oxygen cylinder via precision servo mechanism. A secondary drone audibly guides the victim on usage via pre-recorded instructions.',
    outputs: ['O₂ cylinder deployed', 'Victim acknowledged', 'Telemetry log updated', 'Drone redeployed'],
    tech: ['Servo Actuator', 'Precision Hover', 'Audio Guidance', 'SQLite Log'],
  },
  {
    num: '05',
    label: 'Telemetry Relay',
    actor: 'Entire Swarm',
    color: '#fbbf24',
    duration: 'Continuous',
    icon: '📡',
    title: 'Real-Time Situational Awareness',
    desc: 'All telemetry — victim coordinates, triage scores, O₂ status, and 3D maps — are continuously streamed to the Ground Command Unit via the self-healing 900 MHz mesh. Zero data loss even when individual drones lose line-of-sight.',
    outputs: ['Live triage dashboard', 'NDRF extraction guidance', 'Complete mission log', 'Zero-packet-loss relay'],
    tech: ['Microhard pDDL', 'SQLite Ring Buffer', 'ROS 2 Bridge', 'GCU Dashboard'],
  },
];

/* ── Vertical flowchart ── */
function MissionFlowSVG() {
  return (
    <svg viewBox="0 0 120 560" className="w-16 md:w-20 flex-shrink-0 mt-4" xmlns="http://www.w3.org/2000/svg">
      {PHASES.map((ph, i) => (
        <g key={i}>
          <circle cx="60" cy={40 + i * 104} r="18" fill={`${ph.color}22`} stroke={ph.color} strokeWidth="2" />
          <text x="60" y={45 + i * 104} textAnchor="middle" fill={ph.color} fontSize="11" fontWeight="700">{ph.num}</text>
          {i < PHASES.length - 1 && (
            <line x1="60" y1={58 + i * 104} x2="60" y2={22 + (i + 1) * 104}
              stroke={`${ph.color}60`} strokeWidth="1.5" strokeDasharray="4 3" />
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Mission() {
  const [open, setOpen] = useState(0);

  return (
    <div className="page-wrapper">
      <div className="warm-orb w-[400px] h-[400px] bg-amber-600/8 top-0 right-0" />

      <div className="container-xl py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto justify-center">5-Phase Operational Flow</div>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            The <span className="brand-text">Mission Pipeline</span>
          </h1>
          <p className="text-orange-200/50 max-w-xl mx-auto">
            From first alert to victim extraction — a precisely choreographed sequence of Mother Drone
            mapping and swarm-level autonomous rescue.
          </p>
        </div>

        {/* Top-level overview diagram */}
        <div className="mb-20 card-glow p-6 md:p-10 overflow-x-auto">
          <div className="section-tag mb-6">Mission Overview</div>
          <div className="flex items-start gap-0 min-w-[600px]">
            {PHASES.map((ph, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl mb-3"
                  style={{ borderColor: ph.color, background: `${ph.color}15` }}>
                  {ph.icon}
                </div>
                <p className="text-[11px] font-mono font-bold text-center mb-1" style={{ color: ph.color }}>{ph.label}</p>
                <p className="text-[9px] font-mono text-orange-200/40 text-center">{ph.duration}</p>
                {i < PHASES.length - 1 && (
                  <div className="absolute" style={{ left: `${(i + 1) * 20}%`, top: '28px' }}>→</div>
                )}
              </div>
            ))}
          </div>
          {/* Connector arrows */}
          <div className="flex items-center mt-2 min-w-[600px]">
            {PHASES.map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${PHASES[i].color}60, ${PHASES[Math.min(i+1,4)].color}60)` }} />
                {i < PHASES.length - 1 && <div className="text-orange-500/40 text-xs">▶</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed phase accordion */}
        <div className="grid md:grid-cols-[80px_1fr] gap-6 items-start">
          {/* SVG flowline - desktop */}
          <div className="hidden md:block sticky top-24">
            <MissionFlowSVG />
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {PHASES.map((ph, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: open === i ? ph.color : `${ph.color}30`,
                  background: open === i ? `${ph.color}08` : 'var(--bg-card)',
                }}>
                {/* Header */}
                <button
                  id={`phase-${i}`}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg flex-shrink-0"
                    style={{ borderColor: ph.color, background: `${ph.color}15` }}>
                    {ph.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="text-[10px] font-mono font-bold" style={{ color: ph.color }}>PHASE {ph.num}</span>
                      <span className="text-[10px] font-mono text-orange-200/40">{ph.duration}</span>
                      <span className="text-[10px] font-mono text-orange-200/30">· {ph.actor}</span>
                    </div>
                    <h3 className="font-semibold text-orange-100">{ph.title}</h3>
                  </div>
                  <ChevronDown
                    size={16} style={{ color: ph.color }}
                    className={`transition-transform duration-300 flex-shrink-0 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Body */}
                {open === i && (
                  <div className="px-5 pb-6 border-t border-orange-900/20">
                    <p className="text-sm text-orange-200/60 leading-relaxed mt-4 mb-5">{ph.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Outputs */}
                      <div>
                        <p className="text-[10px] font-mono font-bold text-amber-400/70 uppercase tracking-widest mb-3">Outputs</p>
                        <ul className="space-y-2">
                          {ph.outputs.map((o, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-orange-200/60">
                              <CheckCircle2 size={13} style={{ color: ph.color }} className="mt-0.5 flex-shrink-0" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Tech */}
                      <div>
                        <p className="text-[10px] font-mono font-bold text-amber-400/70 uppercase tracking-widest mb-3">Key Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {ph.tech.map((t, j) => (
                            <span key={j} className="text-[11px] font-mono px-2.5 py-1 rounded-full border"
                              style={{ borderColor: `${ph.color}50`, color: ph.color, background: `${ph.color}10` }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
