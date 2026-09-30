import { useState } from 'react';
import { Compass, Radio, Cpu, Shield, Wifi } from 'lucide-react';

/* ── Tactical Drone Node viewed from SIDE at +45° elevation (looking up from ground into air) ── */
function TacticalDrone({ x, y, scale = 1, delay = 0, isPayload = false, isActive = false, label = '' }) {
  const propSpeed = (0.20 + (delay % 3) * 0.03).toFixed(2);

  return (
    /* Outer G: Anchored firmly at the network mesh junction point */
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Inner G: Smooth forward-surging flight oscillation towards the right */}
      <g
        className="transition-all duration-300 select-none cursor-pointer"
        style={{
          animation: `droneForwardFlight 4.0s ease-in-out ${delay}s infinite alternate`,
          transformOrigin: '0px 0px',
        }}
      >
        {/* Dynamic Radar Ping on active/hover */}
        {isActive && (
          <ellipse
            cx="2"
            cy="0"
            rx="54"
            ry="24"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.6"
            opacity="0.9"
            style={{ animation: 'radarPing 1.8s cubic-bezier(0, 0.2, 0.8, 1) infinite' }}
          />
        )}

        {/* Forward Optical/LIDAR Sensor Cone projecting FORWARD-RIGHT into airspace */}
        <polygon
          points="24,-2 82,-20 82,18 24,4"
          fill="url(#sensorSweepRight)"
          opacity={isActive ? 0.85 : 0.35}
          className="transition-opacity duration-300"
        />

        {/* Twin Aerodynamic Flight Vapor Trails streaming behind (to the Left) */}
        <line x1="-24" y1="-6" x2="-58" y2="-6" stroke="#ea580c" strokeWidth="1.2" opacity="0.45" strokeDasharray="5 3" style={{ animation: 'trailStream 0.6s linear infinite' }} />
        <line x1="-20" y1="8" x2="-50" y2="8" stroke="#ea580c" strokeWidth="1.2" opacity="0.45" strokeDasharray="5 3" style={{ animation: 'trailStream 0.6s linear infinite' }} />

        {/* Rear Thruster / Jet Plume Glow (streaming to Left) */}
        <ellipse cx="-26" cy="1" rx="8" ry="3.5" fill="url(#thrusterGlowGrad)" opacity="0.8" />

        {/* ── LAYER 1: FAR ROTOR ARMS & HORIZONTAL ROTOR DISCS (Higher altitude / Far side) ── */}
        {/* Far-Rear Arm */}
        <line x1="-12" y1="-6" x2="-28" y2="-17" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(-28, -17)">
          {/* Horizontal Rotor Disc seen at +45° elevation */}
          <ellipse rx="13" ry="4" fill="none" stroke="#f97316" strokeWidth="1.2" opacity="0.8" />
          <ellipse rx="11.5" ry="3.2" fill="url(#rotorHaloGrad)" opacity="0.65" />
          <line x1="-11" y1="0" x2="11" y2="0" stroke="#fbbf24" strokeWidth="1.2" opacity="0.95" style={{ animation: `bladeSpinH ${propSpeed}s linear infinite`, transformOrigin: '0 0' }} />
          <circle cx="0" cy="0" r="2" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.8" />
          <circle cx="11" cy="0" r="1.1" fill="#fbbf24" />
        </g>

        {/* Far-Front Arm */}
        <line x1="10" y1="-6" x2="22" y2="-17" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(22, -17)">
          <ellipse rx="13" ry="4" fill="none" stroke="#f97316" strokeWidth="1.2" opacity="0.8" />
          <ellipse rx="11.5" ry="3.2" fill="url(#rotorHaloGrad)" opacity="0.65" />
          <line x1="-11" y1="0" x2="11" y2="0" stroke="#fbbf24" strokeWidth="1.2" opacity="0.95" style={{ animation: `bladeSpinH ${propSpeed}s linear infinite`, transformOrigin: '0 0' }} />
          <circle cx="0" cy="0" r="2" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.8" />
          <circle cx="11" cy="0" r="1.1" fill="#fbbf24" />
        </g>

        {/* ── LAYER 2: 3D FUSELAGE IN SIDE ELEVATION (+45° angle looking up) ── */}
        {/* Underbody Shadow Facet */}
        <polygon
          points="20,3 10,7 -14,7 -22,2 -18,0 8,0"
          fill="#1c0700"
          opacity="0.9"
        />

        {/* Main Fuselage Side Profile (Chassis pod facing right) */}
        <polygon
          points="24,-2 12,-8 -12,-8 -22,-3 -24,2 -14,7 10,7 22,2"
          fill="url(#droneBodyGrad)"
          stroke="#f97316"
          strokeWidth="1.5"
          filter="url(#droneGlow)"
        />

        {/* Top Canopy / Avionics Hatch (Viewed from side-low perspective) */}
        <polygon
          points="14,-4 6,-7 -10,-7 -16,-4 -10,-2 6,-2"
          fill="#2a0c00"
          stroke="#ea580c"
          strokeWidth="0.9"
        />

        {/* Forward FLIR Optical Sensor Turret (Mounted on nose pointing Right) */}
        <rect x="22" y="-3" width="5.5" height="6.5" rx="1.5" fill="#030712" stroke="#06b6d4" strokeWidth="0.9" />
        <circle cx="25.5" cy="0.2" r="1.8" fill="#06b6d4">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="0.9s" repeatCount="indefinite" />
        </circle>

        {/* Central Qualcomm Hexagon NPU Status Indicator */}
        <circle cx="0" cy="-1.5" r="3" fill="#fbbf24" stroke="#7c2d12" strokeWidth="0.8">
          <animate attributeName="r" values="2.5;3.4;2.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="-1.5" r="1.2" fill="#ffffff" />

        {/* Underbody Ventral Carbon Landing Skids (Reinforces the side view looking up) */}
        <path
          d="M-10,7 L-12,17 M10,7 L8,17 M-16,17 L14,17"
          stroke="#b45309"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* ── Underbody 1kg Compact Mini O2 Cylinder Payload (Horizontal mount under belly) ── */}
        {isPayload && (
          <g transform="translate(0, 1)">
            {/* Cylinder Body */}
            <rect x="-11" y="6" width="20" height="8" rx="3.5" fill="url(#cylinderGrad)" stroke="#10b981" strokeWidth="1" />
            {/* Forward Brass Release Valve (facing right) */}
            <rect x="9" y="7.5" width="3.5" height="5" rx="1" fill="#059669" stroke="#34d399" strokeWidth="0.6" />
            {/* Pressure Gauge Dot */}
            <circle cx="-1" cy="10" r="1.5" fill="#10b981" />
            <text x="-1" y="12.6" fill="#ecfdf5" fontSize="4.3" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              O₂
            </text>
          </g>
        )}

        {/* ── LAYER 3: NEAR ROTOR ARMS & HORIZONTAL ROTOR DISCS (Lower altitude / Near side) ── */}
        {/* Near-Rear Arm */}
        <line x1="-10" y1="2" x2="-24" y2="-4" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
        <g transform="translate(-24, -4)">
          {/* Horizontal Rotor Disc seen at +45° elevation */}
          <ellipse rx="15" ry="4.6" fill="none" stroke="#f97316" strokeWidth="1.3" opacity="0.9" />
          <ellipse rx="13.5" ry="3.8" fill="url(#rotorHaloGrad)" opacity="0.75" />
          <line x1="-13" y1="0" x2="13" y2="0" stroke="#fbbf24" strokeWidth="1.3" opacity="0.95" style={{ animation: `bladeSpinH ${propSpeed}s linear infinite`, transformOrigin: '0 0' }} />
          <circle cx="0" cy="0" r="2.4" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.8" />
          <circle cx="13" cy="0" r="1.2" fill="#fbbf24" />
        </g>

        {/* Near-Front Arm */}
        <line x1="8" y1="2" x2="26" y2="-4" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
        <g transform="translate(26, -4)">
          <ellipse rx="15" ry="4.6" fill="none" stroke="#f97316" strokeWidth="1.3" opacity="0.9" />
          <ellipse rx="13.5" ry="3.8" fill="url(#rotorHaloGrad)" opacity="0.75" />
          <line x1="-13" y1="0" x2="13" y2="0" stroke="#fbbf24" strokeWidth="1.3" opacity="0.95" style={{ animation: `bladeSpinH ${propSpeed}s linear infinite`, transformOrigin: '0 0' }} />
          <circle cx="0" cy="0" r="2.4" fill="#7c2d12" stroke="#ea580c" strokeWidth="0.8" />
          <circle cx="13" cy="0" r="1.2" fill="#fbbf24" />
        </g>

        {/* Airframe Label Pill */}
        {label && (
          <g transform="translate(0, 26)">
            <rect x="-24" y="-5.5" width="48" height="11" rx="2.5" fill="rgba(15, 6, 0, 0.9)" stroke="rgba(249, 115, 22, 0.5)" strokeWidth="0.8" />
            <text x="0" y="2" fill="#fdba74" fontSize="6.2" fontFamily="monospace" fontWeight="600" textAnchor="middle">
              {label}
            </text>
          </g>
        )}
      </g>
    </g>
  );
}

export default function HeroSwarmVisual() {
  const [activeBadge, setActiveBadge] = useState(null);

  // Synchronized Drones forming the ACTUAL nodes of the network mesh
  // Organized in a forward wedge echelon flying towards the right
  const drones = [
    { id: 0, x: 460, y: 330, scale: 1.25, delay: 0.0, isPayload: true,  label: 'VANGUARD-01' },
    { id: 1, x: 410, y: 235, scale: 1.05, delay: 0.7, isPayload: false, label: 'SCOUT-02' },
    { id: 2, x: 550, y: 185, scale: 1.00, delay: 1.3, isPayload: false, label: 'SLAM-03' },
    { id: 3, x: 340, y: 155, scale: 0.92, delay: 0.3, isPayload: false, label: 'ROUTER-04' },
    { id: 4, x: 270, y: 375, scale: 1.05, delay: 1.0, isPayload: false, label: 'AI-EDGE-05' },
    { id: 5, x: 580, y: 325, scale: 1.10, delay: 1.6, isPayload: false, label: 'RADAR-06' },
    { id: 6, x: 330, y: 465, scale: 0.96, delay: 0.8, isPayload: true,  label: 'O2-RELAY-07' },
    { id: 7, x: 485, y: 440, scale: 0.92, delay: 1.5, isPayload: false, label: 'ACOUSTIC-08' },
    { id: 8, x: 440, y: 160, scale: 0.90, delay: 0.5, isPayload: false, label: 'HIGH-ALT-09' },
  ];

  // Interconnected Ad-hoc Mesh Edges joining the actual drone nodes
  const meshEdges = [
    [3, 8], [8, 2], [3, 1],
    [1, 2], [1, 0], [2, 5],
    [3, 4], [4, 1], [4, 0],
    [5, 0], [4, 6], [0, 6],
    [0, 7], [5, 7], [6, 7]
  ];

  // 4 Core Functionality Badges tethered directly to designated drone nodes
  const badges = [
    {
      id: 'mesh',
      nodeId: 3,
      anchorX: 190,
      anchorY: 72,
      icon: Radio,
      title: 'SELF-HEALING MESH',
      sub: '900MHz Ad-Hoc Swarm Communication',
      tag: 'pDDL MESH',
      val: '12 / 12 SYNC',
      accent: 'text-orange-500 dark:text-orange-400',
      ringColor: '#f97316',
      badgeClass: 'top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4',
    },
    {
      id: 'slam',
      nodeId: 2,
      anchorX: 610,
      anchorY: 72,
      icon: Compass,
      title: 'GPS-DENIED AUTONOMY',
      sub: 'Geo-Fenced 3D SLAM Navigation',
      tag: 'FAST-LIO2',
      val: '0.04m DRIFT',
      accent: 'text-amber-500 dark:text-amber-400',
      ringColor: '#f59e0b',
      badgeClass: 'top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4',
    },
    {
      id: 'ai',
      nodeId: 4,
      anchorX: 190,
      anchorY: 565,
      icon: Cpu,
      title: '15 TOPS EDGE AI',
      sub: 'Zero Cloud / Hexagon NPU Detection',
      tag: 'YOLOv10-SAR',
      val: '31 FPS @ INT8',
      accent: 'text-cyan-500 dark:text-cyan-400',
      ringColor: '#06b6d4',
      badgeClass: 'bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4',
    },
    {
      id: 'o2',
      nodeId: 0,
      anchorX: 610,
      anchorY: 565,
      icon: Shield,
      title: '1kg O₂ PAYLOAD DELIVERY',
      sub: 'Targeted Asphyxiation Mitigation',
      tag: 'SERVO DROP',
      val: '2 BARS READY',
      accent: 'text-emerald-500 dark:text-emerald-400',
      ringColor: '#10b981',
      badgeClass: 'bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4',
    },
  ];

  return (
    <div className="relative w-full max-w-[640px] aspect-[4/3] sm:aspect-[5/4] md:h-[540px] lg:h-[570px] flex items-center justify-center mx-auto select-none overflow-visible">
      {/* ── Ambient Glow Backdrop ── */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none blur-2xl dark:opacity-100 opacity-60" />

      {/* ── Forward Formation Radar Vector Rings ── */}
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] rounded-full border border-orange-500/10 dark:border-orange-500/15 animate-pulse-glow pointer-events-none" />
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] rounded-full border border-orange-500/15 dark:border-orange-500/20 pointer-events-none" />
      <div className="absolute w-96 h-96 sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-orange-600/20 dark:border-orange-600/25 animate-rotate-slow pointer-events-none" />

      {/* ── Main SVG Swarm Canvas ── */}
      <svg
        viewBox="0 0 800 640"
        className="w-full h-full relative z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="droneBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c2d12" />
            <stop offset="60%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <radialGradient id="rotorHaloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          {/* Forward Sensor Sweep projecting RIGHT */}
          <linearGradient id="sensorSweepRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.65" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>

          {/* Rear Thruster Flame Gradient (streaming LEFT) */}
          <linearGradient id="thrusterGlowGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ea580c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cylinderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          <linearGradient id="meshLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
          </linearGradient>

          {/* Filters */}
          <filter id="droneGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#f97316" floodOpacity="0.35" />
          </filter>

          <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Keyframe Styles for Realistic Rightward Forward Flight */}
          <style>{`
            /* Active forward flight surge toward right with aerodynamic pitch & vertical oscillation */
            @keyframes droneForwardFlight {
              0% {
                transform: translate(0px, 0px) rotate(-1deg);
              }
              30% {
                transform: translate(14px, -7px) rotate(2deg);
              }
              65% {
                transform: translate(18px, 3px) rotate(1.5deg);
              }
              100% {
                transform: translate(3px, -4px) rotate(-1deg);
              }
            }

            /* High speed spinning horizontal rotor blades (foreshortened +45° disc) */
            @keyframes bladeSpinH {
              0% { transform: scaleX(1); opacity: 0.95; }
              25% { transform: scaleX(0.15); opacity: 0.5; }
              50% { transform: scaleX(-1); opacity: 0.95; }
              75% { transform: scaleX(-0.15); opacity: 0.5; }
              100% { transform: scaleX(1); opacity: 0.95; }
            }

            /* High speed spinning props */
            @keyframes propSpinFast {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            /* Radar wave ping */
            @keyframes radarPing {
              0% { rx: 14px; ry: 7px; opacity: 0.95; }
              100% { rx: 72px; ry: 32px; opacity: 0; }
            }

            /* Tether flow */
            @keyframes tetherFlow {
              from { stroke-dashoffset: 28; }
              to { stroke-dashoffset: 0; }
            }

            /* Vapor trail streaming left */
            @keyframes trailStream {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: 16; }
            }

            /* Background wind velocity streaks streaming left */
            @keyframes windStreamLeft {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: 140; }
            }
          `}</style>
        </defs>

        {/* ── Background Rightward Wind / Velocity Streamlines (Subtle Flight Atmosphere) ── */}
        <g opacity="0.3" className="pointer-events-none">
          <line x1="200" y1="120" x2="650" y2="120" stroke="#f97316" strokeWidth="0.8" strokeDasharray="20 40" style={{ animation: 'windStreamLeft 2.2s linear infinite' }} />
          <line x1="160" y1="280" x2="680" y2="280" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="25 45" style={{ animation: 'windStreamLeft 1.8s linear infinite' }} />
          <line x1="220" y1="420" x2="640" y2="420" stroke="#f97316" strokeWidth="0.8" strokeDasharray="30 50" style={{ animation: 'windStreamLeft 2.5s linear infinite' }} />
          <line x1="180" y1="520" x2="600" y2="520" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="18 38" style={{ animation: 'windStreamLeft 2.0s linear infinite' }} />
        </g>

        {/* ── Inter-Drone Vector Mesh Lines (Joining the Drones directly) ── */}
        <g className="mesh-lines">
          {meshEdges.map(([fromIdx, toIdx], i) => {
            const a = drones[fromIdx];
            const b = drones[toIdx];
            const isHighlight = activeBadge !== null && (
              (badges.find(bg => bg.id === activeBadge)?.nodeId === fromIdx) ||
              (badges.find(bg => bg.id === activeBadge)?.nodeId === toIdx)
            );

            return (
              <g key={`edge-${i}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#meshLineGrad)"
                  strokeWidth={isHighlight ? 2.2 : 1.1}
                  strokeDasharray="4 2"
                  opacity={isHighlight ? 1 : 0.5}
                  style={{ animation: 'tetherFlow 1.5s linear infinite' }}
                />
                {/* Active Data Packet Travelling Forward Along Mesh */}
                <circle
                  r={isHighlight ? 3 : 2.2}
                  fill={isHighlight ? '#ffffff' : '#fbbf24'}
                  filter="url(#packetGlow)"
                  opacity={0.9}
                >
                  <animate
                    attributeName="cx"
                    from={a.x}
                    to={b.x}
                    dur={`${1.9 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={a.y}
                    to={b.y}
                    dur={`${1.9 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${1.9 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* ── Glowing HUD Tether Lines (Connecting 4 Badges directly to Swarm Drones) ── */}
        <g className="hud-tethers">
          {badges.map(b => {
            const targetDrone = drones[b.nodeId];
            const isSelected = activeBadge === b.id;

            return (
              <g key={`tether-${b.id}`}>
                <line
                  x1={b.anchorX}
                  y1={b.anchorY}
                  x2={targetDrone.x}
                  y2={targetDrone.y}
                  stroke={isSelected ? b.ringColor : '#f97316'}
                  strokeWidth={isSelected ? 2.4 : 1.3}
                  strokeDasharray="5 3"
                  opacity={isSelected ? 1 : 0.45}
                  style={{ animation: 'tetherFlow 1s linear infinite' }}
                />
                <circle
                  cx={targetDrone.x}
                  cy={targetDrone.y}
                  r={isSelected ? 4.5 : 3}
                  fill={b.ringColor}
                  filter="url(#packetGlow)"
                />
                <circle
                  cx={b.anchorX}
                  cy={b.anchorY}
                  r={isSelected ? 4.5 : 3}
                  fill={b.ringColor}
                  filter="url(#packetGlow)"
                />
              </g>
            );
          })}
        </g>

        {/* ── Swarm Drones Forming the Actual Mesh Nodes (Facing & Flying to the RIGHT) ── */}
        <g className="swarm-drones">
          {drones.map(d => (
            <TacticalDrone
              key={`drone-${d.id}`}
              x={d.x}
              y={d.y}
              scale={d.scale}
              delay={d.delay}
              isPayload={d.isPayload}
              label={d.label}
              isActive={activeBadge !== null && badges.find(b => b.id === activeBadge)?.nodeId === d.id}
            />
          ))}
        </g>
      </svg>

      {/* ── Floating Functionality Badges (4 Core Features Overlay) ── */}
      {badges.map(b => {
        const Icon = b.icon;
        const isHovered = activeBadge === b.id;

        return (
          <div
            key={b.id}
            onMouseEnter={() => setActiveBadge(b.id)}
            onMouseLeave={() => setActiveBadge(null)}
            className={`absolute ${b.badgeClass} z-20 cursor-pointer transition-all duration-300 transform hover:scale-105`}
            style={{ maxWidth: '240px' }}
          >
            <div
              className={`p-2 sm:p-2.5 md:p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                isHovered
                  ? 'bg-white/98 dark:bg-black/95 shadow-[0_0_25px_rgba(249,115,22,0.4)] border-2 border-orange-500'
                  : 'bg-white/95 dark:bg-[#120500]/90 shadow-lg border border-amber-800/20 dark:border-orange-500/25'
              }`}
            >
              {/* Top Row: Icon + Tag + Live Telemetry */}
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-md bg-orange-500/10 ${b.accent}`}>
                    <Icon size={12} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider font-semibold uppercase text-orange-600 dark:text-orange-400">
                    {b.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    {b.val}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-[11px] sm:text-xs md:text-[13px] font-bold tracking-tight text-slate-900 dark:text-orange-50 leading-tight">
                {b.title}
              </h4>

              {/* Subtitle description */}
              <p className="text-[9px] sm:text-[10px] md:text-[11px] leading-tight mt-0.5 text-slate-600 dark:text-orange-200/70 font-sans">
                {b.sub}
              </p>
            </div>
          </div>
        );
      })}

      {/* Central Swarm Status Bar (Center Bottom) */}
      <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-black/85 border border-amber-800/20 dark:border-orange-500/30 backdrop-blur-md shadow-sm whitespace-nowrap">
        <Wifi size={11} className="text-orange-500 dark:text-orange-400 animate-pulse" />
        <span className="text-[10px] font-mono text-slate-700 dark:text-orange-300">
          SWARM MESH ONLINE · 9 AIRFRAMES · ZERO-CLOUD AD-HOC
        </span>
      </div>
    </div>
  );
}
