import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, Megaphone, Navigation, Activity, Wifi, Flame, Droplets, Mountain, HardHat, AlertTriangle, Users, ShieldAlert, Route } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   SCENARIO METADATA
═══════════════════════════════════════════════════════════ */
const SCENARIO_META = [
  { id: 'fire',      label: 'Urban Fire',        icon: Flame,         color: '#ef4444', droneCount: 2,  dronePrefix: '1' },
  { id: 'flood',     label: 'Flash Flood',        icon: Droplets,      color: '#3b82f6', droneCount: 3,  dronePrefix: '2' },
  { id: 'earthquake',label: 'Earthquake',         icon: Mountain,      color: '#8b5cf6', droneCount: 4,  dronePrefix: '3' },
  { id: 'mining',    label: 'Rat-Hole Mining',    icon: HardHat,       color: '#f59e0b', droneCount: 4,  dronePrefix: '4' },
  { id: 'hazmat',    label: 'Industrial HAZMAT',  icon: AlertTriangle, color: '#10b981', droneCount: 4,  dronePrefix: '5' },
];

/* ═══════════════════════════════════════════════════════════
   OVERLAY MODES
═══════════════════════════════════════════════════════════ */
const OVERLAY_MODES = [
  { key: 'ALL',      label: 'ALL OVERLAYS',       icon: Activity    },
  { key: 'SURVIVORS',label: 'SURVIVORS & VITALS', icon: Users       },
  { key: 'DANGER',   label: 'DANGER ZONES',       icon: ShieldAlert },
  { key: 'SAFE',     label: 'SAFE PATHWAYS',      icon: Route       },
];

/* ═══════════════════════════════════════════════════════════
   PER-SCENARIO VICTIM DATA
═══════════════════════════════════════════════════════════ */
const VICTIMS_BY_SCENARIO = [
  /* 0 — Urban Fire */
  [
    { id:'V-001', name:'Adult Male',   loc:'Floor 3 · Rm 302', status:'CRITICAL',  spo2:72,  hr:42,  o2:false },
    { id:'V-002', name:'Child',        loc:'Floor 3 · Rm 301', status:'CRITICAL',  spo2:78,  hr:55,  o2:true  },
    { id:'V-003', name:'Adult Female', loc:'Floor 2 · Rm 204', status:'IN DANGER', spo2:85,  hr:88,  o2:false },
    { id:'V-004', name:'Elderly Male', loc:'Floor 2 · Rm 210', status:'IN DANGER', spo2:88,  hr:72,  o2:false },
    { id:'V-005', name:'Adult Male',   loc:'Floor 1 · Rm 112', status:'SAFE',      spo2:94,  hr:95,  o2:false },
  ],
  /* 1 — Flash Flood */
  [
    { id:'V-101', name:'Adult Female', loc:'Bldg-A Rooftop',   status:'IN DANGER', spo2:88,  hr:90,  o2:false },
    { id:'V-102', name:'Child',        loc:'Bldg-A Floor 3',   status:'IN DANGER', spo2:85,  hr:78,  o2:false },
    { id:'V-103', name:'Adult Male',   loc:'Bldg-B Rooftop',   status:'CRITICAL',  spo2:76,  hr:48,  o2:false },
    { id:'V-104', name:'Adult Female', loc:'Bldg-B Rooftop',   status:'CRITICAL',  spo2:79,  hr:52,  o2:true  },
    { id:'V-105', name:'Elderly Male', loc:'Bldg-B Rooftop',   status:'IN DANGER', spo2:86,  hr:70,  o2:false },
    { id:'V-106', name:'Adult Female', loc:'Bldg-C Rooftop',   status:'SAFE',      spo2:93,  hr:88,  o2:false },
  ],
  /* 2 — Earthquake */
  [
    { id:'V-201', name:'Adult',        loc:'Bldg-A Void B',    status:'CRITICAL',  spo2:74,  hr:38,  o2:false },
    { id:'V-202', name:'Adult',        loc:'Bldg-A Floor 3',   status:'IN DANGER', spo2:86,  hr:76,  o2:false },
    { id:'V-203', name:'Adult',        loc:'Void Space A',     status:'CRITICAL',  spo2:70,  hr:35,  o2:true  },
    { id:'V-204', name:'Adult',        loc:'Void Space A',     status:'CRITICAL',  spo2:73,  hr:40,  o2:false },
    { id:'V-205', name:'Adult',        loc:'Bldg-B Crevice',   status:'IN DANGER', spo2:84,  hr:72,  o2:false },
    { id:'V-206', name:'Adult',        loc:'Void Space C',     status:'SAFE',      spo2:91,  hr:80,  o2:false },
    { id:'V-207', name:'Adult',        loc:'Bldg-C Floor 2',   status:'IN DANGER', spo2:83,  hr:74,  o2:false },
    { id:'V-208', name:'Ground Surv.', loc:'Open Ground East', status:'SAFE',      spo2:92,  hr:85,  o2:false },
  ],
  /* 3 — Rat-Hole Mining */
  [
    { id:'V-301', name:'Miner Alpha',  loc:'Shaft A-1 (38cm)', status:'CRITICAL',  spo2:68,  hr:30,  o2:false },
    { id:'V-302', name:'Miner Bravo',  loc:'Shaft A-2',        status:'CRITICAL',  spo2:71,  hr:36,  o2:true  },
    { id:'V-303', name:'Miner Charlie',loc:'Gallery B',        status:'IN DANGER', spo2:82,  hr:65,  o2:false },
    { id:'V-304', name:'Miner Delta',  loc:'Junction C',       status:'SAFE',      spo2:90,  hr:78,  o2:false },
  ],
  /* 4 — Industrial HAZMAT */
  [
    { id:'V-401', name:'Worker Alpha', loc:'Catwalk Level 2',  status:'CRITICAL',  spo2:71,  hr:32,  o2:false },
    { id:'V-402', name:'Worker Bravo', loc:'Tank Farm Area',   status:'CRITICAL',  spo2:74,  hr:40,  o2:true  },
    { id:'V-403', name:'Worker Charlie',loc:'Column Base',     status:'IN DANGER', spo2:83,  hr:68,  o2:false },
    { id:'V-404', name:'Worker Delta', loc:'Pipe Junction',    status:'IN DANGER', spo2:85,  hr:72,  o2:false },
    { id:'V-405', name:'Worker Echo',  loc:'Safe Room (Sealed)',status:'SAFE',     spo2:94,  hr:82,  o2:false },
  ],
];

/* ═══════════════════════════════════════════════════════════
   PER-SCENARIO ROS 2 TELEMETRY
═══════════════════════════════════════════════════════════ */
const TELEMETRY_BY_SCENARIO = [
  [
    { text:'$ [FLIR] FLIR Boson 640 LWIR: Thermal blob detected @ Floor 3 NE corner', color:'#fbbf24' },
    { text:'$ [AI] YOLOv10-SAR: Person detected — confidence 0.94 (V-001)', color:'#f97316' },
    { text:'$ [TRIAGE] V-001 scored: CRITICAL — SpO2 72%, asphyxiation imminent', color:'#ef4444' },
    { text:'$ [SERVO] DRONE 1-1 en-route V-002: 1kg mini O\u2082 cylinder armed', color:'#fb923c' },
    { text:'$ [SERVO] 1kg mini O\u2082 cylinder deployed to V-002 \u2014 SUCCESS', color:'#10b981' },
    { text:'$ [FLIR] Heat core: 540\u00b0C \u2014 structural collapse risk ELEVATED', color:'#ef4444' },
    { text:'$ [MESH] pDDL relay: Victim coordinates uploaded to GCU', color:'#fbbf24' },
    { text:'$ [SLAM] FAST-LIO2 OctoMap: Floor 2 mapped \u2014 87% coverage', color:'#f97316' },
    { text:'$ [AUDIO] Acoustic CNN: Distress signal Floor 3 \u00b7 320Hz conf:94%', color:'#fbbf24' },
    { text:'$ [AI] Micro-Doppler: Vital signs confirmed \u2014 2 CRITICAL survivors', color:'#10b981' },
  ],
  [
    { text:'$ [GPR] 77GHz FMCW GPR sub-surface depth: -3.2m \u2014 bathymetry mapped', color:'#38bdf8' },
    { text:'$ [DOPPLER] Micro-Doppler respiration: 16 BPM \u2014 Bldg-C survivor stable', color:'#10b981' },
    { text:'$ [FLIR] FLIR Boson 640: Body heat 37.4\u00b0C \u2014 6 survivors isolated', color:'#fbbf24' },
    { text:'$ [AI] YOLOv10-SAR: Person 0.94 conf \u2014 Bldg-A rooftop detected', color:'#22c55e' },
    { text:'$ [TRIAGE] V-103 scored: CRITICAL \u2014 SpO2 76%, near-drowning imminent', color:'#ef4444' },
    { text:'$ [SERVO] DRONE 2-2 payload armed: 1kg mini O\u2082 cylinder for V-104', color:'#fb923c' },
    { text:'$ [MESH] pDDL relay ZERO LOSS: Bldg-B coordinates \u2192 GCU', color:'#3b82f6' },
    { text:'$ [GPR] Sub-surface bathymetry: Water RISE +12cm/h \u2014 SURGE CRITICAL', color:'#ef4444' },
    { text:'$ [AUDIO] Acoustic Array: Distress voice 380Hz \u00b7 conf 92%', color:'#f59e0b' },
    { text:'$ [FLIR] 6 heat signatures confirmed across 3 flood structures', color:'#10b981' },
  ],
  [
    { text:'$ [SLAM] FAST-LIO2: Void space 4.8m\u00b3 mapped \u2014 air pocket STABLE', color:'#06b6d4' },
    { text:'$ [DOPPLER] Micro-Doppler: Heartbeat 12 BPM through 45cm concrete', color:'#10b981' },
    { text:'$ [AI] YOLOv10-SAR: 8 humans detected (6 building \u00b7 2 ground)', color:'#22c55e' },
    { text:'$ [TRIAGE] V-203 scored: CRITICAL \u2014 SpO2 70%, O\u2082 drop armed', color:'#ef4444' },
    { text:'$ [SERVO] DRONE 3-1 deploying 1kg mini O\u2082 cylinder \u2192 Void Space A', color:'#10b981' },
    { text:'$ [AUDIO] Seismic beamforming: Distant voice 240Hz \u00b7 conf 88%', color:'#f59e0b' },
    { text:'$ [SLAM] OctoMap: Void Space A 4.8m\u00b3 mapped \u2014 structural STABLE', color:'#06b6d4' },
    { text:'$ [FLIR] 8 heat signatures confirmed across collapse zone', color:'#fbbf24' },
    { text:'$ [GPR] 77GHz GPR: Sub-surface scan ACTIVE \u2014 rockfall depth mapped', color:'#f59e0b' },
    { text:'$ [SLAM] DRONE 3-3 FAST-LIO2 odometry converged \u2014 interior mesh ready', color:'#10b981' },
  ],
  [
    { text:'$ [MICRO] DRONE 4-1 narrow-shaft micro-slither clearance: 38cm \u2014 OK', color:'#f59e0b' },
    { text:'$ [AUDIO] SOS wall tapping detected: 420Hz \u00b7 confidence 97%', color:'#fbbf24' },
    { text:'$ [FLIR] FLIR Boson 640: Gas differential thermal detected Shaft A', color:'#fbbf24' },
    { text:'$ [AI] YOLOv10-SAR zero-light NV: Miner detected conf 0.91', color:'#22c55e' },
    { text:'$ [TRIAGE] V-301 scored: CRITICAL \u2014 SpO2 68%, CO asphyxiation', color:'#ef4444' },
    { text:'$ [SERVO] DRONE 4-1 deploying 1kg mini O\u2082 cylinder \u2192 Shaft A-1', color:'#10b981' },
    { text:'$ [SLAM] FAST-LIO2: Tunnel mesh 68% complete \u2014 rockfall mapped', color:'#06b6d4' },
    { text:'$ [CHEM] Gas array: CH4 3.8% LEL \u00b7 CO 820 PPM \u2014 DANGER ZONE', color:'#ef4444' },
    { text:'$ [DOPPLER] Micro-Doppler: Respiration 14 BPM through rock', color:'#10b981' },
    { text:'$ [MESH] pDDL zero-loss relay: Shaft coordinates \u2192 Surface GCU', color:'#f59e0b' },
  ],
  [
    { text:'$ [CHEM] Chemical array: Toxic plume spread 14.2m/s NE direction', color:'#84cc16' },
    { text:'$ [CHEM] Chlorine concentration: 880 PPM at leak source \u2014 LETHAL', color:'#ef4444' },
    { text:'$ [FLIR] FLIR Boson 640: Pipe rupture thermal anomaly @ Tank C-02', color:'#fbbf24' },
    { text:'$ [AI] YOLOv10-SAR: Worker detected conf 0.93 \u2014 Catwalk Level 2', color:'#22c55e' },
    { text:'$ [TRIAGE] V-401 scored: CRITICAL \u2014 SpO2 71%, toxic exposure imminent', color:'#ef4444' },
    { text:'$ [SERVO] DRONE 5-1 en-route V-401: 1kg mini O\u2082 cylinder payload armed', color:'#10b981' },
    { text:'$ [REFUGE] Positive pressure safe point VERIFIED \u2014 V-405 SECURED', color:'#10b981' },
    { text:'$ [AUDIO] Acoustic: Ultrasonic leak hiss 18kHz \u00b7 pipe rupture confirmed', color:'#f59e0b' },
    { text:'$ [DOPPLER] Micro-Doppler: Respiration 16 BPM tracked through chem smoke', color:'#10b981' },
    { text:'$ [SLAM] FAST-LIO2: Plant 3D CAD mesh ready \u2014 evacuation route CLEAR', color:'#06b6d4' },
  ],
];

/* ═══════════════════════════════════════════════════════════
   STATUS STYLING
═══════════════════════════════════════════════════════════ */
const STATUS_STYLE = {
  CRITICAL:   { label:'CODE RED',    dot:'#ef4444', text:'text-red-400',   bg:'bg-red-500/10',   border:'border-red-500/30'   },
  'IN DANGER':{ label:'CODE YELLOW', dot:'#f59e0b', text:'text-amber-400', bg:'bg-amber-500/10', border:'border-amber-500/30' },
  SAFE:       { label:'CODE GREEN',  dot:'#10b981', text:'text-green-400', bg:'bg-green-500/10', border:'border-green-500/30'  },
};

const TRIAGE_FILTERS = [
  { key:'ALL',        label:'ALL',       color:'#f97316' },
  { key:'CRITICAL',   label:'CRITICAL',  color:'#ef4444' },
  { key:'IN DANGER',  label:'IN DANGER', color:'#f59e0b' },
  { key:'SAFE',       label:'SAFE',      color:'#10b981' },
];

/* ═══════════════════════════════════════════════════════════
   DRONE ICON HELPER
═══════════════════════════════════════════════════════════ */
function DroneIcon({ cx, cy, color = '#f97316', size = 1 }) {
  const s = size;
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={-14*s} cy={-6*s} rx={10*s} ry={4*s} stroke={color} strokeWidth={0.8} fill={`${color}22`} strokeDasharray="2 2" />
      <ellipse cx={ 14*s} cy={-6*s} rx={10*s} ry={4*s} stroke={color} strokeWidth={0.8} fill={`${color}22`} strokeDasharray="2 2" />
      <ellipse cx={-14*s} cy={ 6*s} rx={10*s} ry={4*s} stroke={color} strokeWidth={0.8} fill={`${color}22`} strokeDasharray="2 2" />
      <ellipse cx={ 14*s} cy={ 6*s} rx={10*s} ry={4*s} stroke={color} strokeWidth={0.8} fill={`${color}22`} strokeDasharray="2 2" />
      <rect x={-6*s} y={-5*s} width={12*s} height={10*s} rx={2} fill="#09090b" stroke={color} strokeWidth={1} />
      <circle cx={0} cy={0} r={2*s} fill="#10b981">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════
   SURVIVOR MARKER — full vitals callout
   showVitals: show SpO2/HR callout bubble (SURVIVORS / ALL mode)
═══════════════════════════════════════════════════════════ */
function SurvivorMarker({ cx, cy, victim, showVitals, hudBg, hudText }) {
  const dot = STATUS_STYLE[victim.status]?.dot ?? '#f97316';
  // offset callout so it doesn't overlap the dot
  const offX = cx > 500 ? -108 : 10;
  const offY = cy < 60  ?  8   : -42;

  return (
    <g>
      {/* Outer pulse ring */}
      <circle cx={cx} cy={cy} r={14} fill={`${dot}15`} stroke={dot} strokeWidth={1}>
        <animate attributeName="r" values="12;18;12" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.2s" repeatCount="indefinite" />
      </circle>
      {/* Inner dot */}
      <circle cx={cx} cy={cy} r={5} fill={dot} stroke="#09090b" strokeWidth={0.8} />
      {/* O₂ delivered badge */}
      {victim.o2 && (
        <g transform={`translate(${cx+4},${cy-8})`}>
          <rect x={0} y={0} width={22} height={9} rx={2} fill="#10b981" />
          <text x={2} y={7} fill="#fff" fontSize="5.5" fontWeight="800">O₂ ✓</text>
        </g>
      )}
      {/* Vitals callout (only in SURVIVORS/ALL mode) */}
      {showVitals && (
        <g transform={`translate(${cx + offX},${cy + offY})`}>
          <rect x={0} y={0} width={98} height={38} rx={4} fill={hudBg ?? 'rgba(9,9,11,0.94)'} stroke={dot} strokeWidth={1} />
          {/* Connector line */}
          <line
            x1={offX > 0 ? 0 : 98}
            y1={offY > 0 ? 0 : 38}
            x2={offX > 0 ? -5 : 103}
            y2={offY > 0 ? -5 : 43}
            stroke={dot} strokeWidth={0.8}
          />
          <circle cx={4} cy={10} r={3} fill={dot}>
            <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x={11} y={12.5} fill={dot} fontSize="7" fontWeight="800">{victim.id}</text>
          <text x={4}  y={23}   fill={hudText ?? '#f5f5f5'} fontSize="7" fontWeight="700">SpO₂: {victim.spo2}% · HR: {victim.hr}</text>
          <text x={4}  y={33}   fill={victim.o2 ? '#10b981' : dot} fontSize="6.5" fontWeight="600">
            {victim.o2 ? '1kg O₂ CYLINDER DELIVERED' : STATUS_STYLE[victim.status]?.label}
          </text>
        </g>
      )}
      {/* Compact label in non-vitals mode */}
      {!showVitals && (
        <text x={cx + 8} y={cy + 3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{victim.id}</text>
      )}
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════
   HUD 1 — URBAN FIRE
═══════════════════════════════════════════════════════════ */
function UrbanFireHUD({ isDark, victims, filter, overlayMode }) {
  const shown = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const showS = overlayMode === 'ALL' || overlayMode === 'SURVIVORS';
  const showD = overlayMode === 'ALL' || overlayMode === 'DANGER';
  const showP = overlayMode === 'ALL' || overlayMode === 'SAFE';

  const t = isDark ? {
    bg:'#0a0300', wallL:'#1a0801', wallR:'#1a0700', slab:'#160500', slabEdge:'#321003',
    border:'rgba(249,115,22,0.4)', subBorder:'rgba(249,115,22,0.2)', pillar:'#220c02',
    hudBg:'rgba(18,5,1,0.94)', hudText:'#fff7ed', hudSub:'#fed7aa',
    steel:'#78350f', rebar:'#ea580c',
  } : {
    bg:'#fffaf4', wallL:'#faede0', wallR:'#f5e0ce', slab:'#fbf0e4', slabEdge:'#e5ccb4',
    border:'rgba(180,83,9,0.4)', subBorder:'rgba(180,83,9,0.2)', pillar:'#faebe0',
    hudBg:'rgba(255,255,255,0.96)', hudText:'#1c0800', hudSub:'#591d08',
    steel:'#b45309', rebar:'#c2410c',
  };

  const POSITIONS = {
    'V-001': [490, 108], 'V-002': [160, 90],
    'V-003': [340, 185], 'V-004': [490, 200], 'V-005': [175, 295],
  };

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.subBorder, background: t.bg }}>
      <svg viewBox="0 0 680 420" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <defs>
          <linearGradient id="duf-fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#f97316" /><stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="duf-glow"><feGaussianBlur stdDeviation="4" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="duf-blur"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>

        <text x="20" y="20" fill={isDark?'rgba(253,186,116,0.6)':'rgba(120,53,15,0.7)'} fontSize="8" fontWeight="600">URBAN FIRE · SECTOR 4A · COMMAND HUD</text>
        <text x="660" y="20" textAnchor="end" fill="#10b981" fontSize="8" fontWeight="700">● ZERO-CLOUD · QUALCOMM RB5</text>

        {/* ── STRUCTURE ── */}
        <polygon points="90,340 310,420 310,410 90,330" fill={t.slabEdge} stroke={t.border} strokeWidth="0.8" />
        <polygon points="310,420 580,340 580,330 310,410" fill={t.slabEdge} stroke={t.border} strokeWidth="0.8" />
        <polygon points="310,250 90,340 310,420 580,340" fill={t.slab} stroke={t.border} strokeWidth="1.2" />
        <polygon points="90,340 90,120 310,40 310,250" fill={t.wallL} stroke={t.border} strokeWidth="1.2" />
        <polygon points="200,300 200,88 215,82 215,294" fill={t.pillar} stroke={t.border} strokeWidth="0.8" />
        <polygon points="100,195 100,250 130,240 130,185" fill={isDark?'#080200':'#eed8c5'} stroke={t.subBorder} strokeWidth="0.8" />
        <polygon points="310,250 310,40 580,120 580,340" fill={t.wallR} stroke={t.border} strokeWidth="1.2" />
        <path d="M 400 160 Q 445 130 510 145 Q 530 200 465 225 Z" fill={isDark?'#120300':'#ded0c2'} opacity="0.65" />
        <polygon points="90,240 90,232 310,145 380,168 380,238 280,280 90,240" fill={t.slab} stroke={t.border} strokeWidth="1" />
        <polygon points="90,240 280,280 280,288 90,248" fill={t.slabEdge} stroke={t.border} strokeWidth="0.8" />
        <polygon points="280,280 380,238 380,246 280,288" fill={t.slabEdge} stroke={t.border} strokeWidth="0.8" />
        <line x1="150" y1="255" x2="145" y2="260" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="220" y1="268" x2="215" y2="273" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round"/>
        <polygon points="380,168 540,270 520,335 380,238" fill={t.slab} stroke={t.border} strokeWidth="1.2" />
        <polygon points="380,238 520,335 520,345 380,246" fill={t.slabEdge} stroke={t.border} strokeWidth="0.8" />
        <polygon points="90,120 90,112 310,40 360,56 260,98 90,120" fill={t.slab} stroke={t.border} strokeWidth="1" />
        <line x1="310" y1="40" x2="460" y2="95" stroke={t.steel} strokeWidth="3" strokeLinecap="round" />
        <line x1="360" y1="56" x2="505" y2="110" stroke={t.steel} strokeWidth="3" strokeLinecap="round" />
        {/* Floor labels */}
        <text x="95" y="110" fill={isDark?'rgba(253,186,116,0.4)':'rgba(120,53,15,0.4)'} fontSize="7">FLOOR 3</text>
        <text x="95" y="210" fill={isDark?'rgba(253,186,116,0.4)':'rgba(120,53,15,0.4)'} fontSize="7">FLOOR 2</text>
        <text x="95" y="308" fill={isDark?'rgba(253,186,116,0.4)':'rgba(120,53,15,0.4)'} fontSize="7">FLOOR 1</text>

        {/* Drones always visible */}
        <DroneIcon cx={290} cy={220} color="#f97316" size={1} />
        <g transform="translate(130,210)">
          <line x1="130" y1="12" x2="148" y2="10" stroke="#f97316" strokeWidth="0.8" strokeDasharray="2 2"/>
          <rect x="0" y="0" width="130" height="26" rx="4" fill={t.hudBg} stroke="#f97316" strokeWidth="0.9"/>
          <circle cx="7" cy="10" r="2.5" fill="#10b981"/>
          <text x="15" y="12" fill="#f97316" fontSize="7.5" fontWeight="700">DRONE 1-1: SCANNING</text>
          <text x="7" y="21" fill={t.hudSub} fontSize="7" fontWeight="600">1kg O₂ PAYLOAD READY</text>
        </g>
        <DroneIcon cx={450} cy={60} color="#f97316" size={0.9} />
        <g transform="translate(340,36)">
          <rect x="0" y="0" width="100" height="22" rx="4" fill={t.hudBg} stroke="#f97316" strokeWidth="0.9"/>
          <text x="5" y="10" fill="#f97316" fontSize="7.5" fontWeight="700">DRONE 1-2: RELAY</text>
          <text x="5" y="19" fill={t.hudSub} fontSize="7" fontWeight="600">900MHz MESH ACTIVE</text>
        </g>

        {/* ── OVERLAY: DANGER ZONE ── */}
        {showD && (
          <g>
            {/* Pulsing danger halo */}
            <ellipse cx="470" cy="155" rx="95" ry="70" fill="#ef444418" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="rx" values="90;100;90" dur="1.8s" repeatCount="indefinite" />
            </ellipse>
            <g filter="url(#duf-blur)">
              <ellipse cx="480" cy="155" rx="80" ry="55" fill="#ef444435" />
            </g>
            <g filter="url(#duf-glow)">
              <path d="M 450 185 Q 435 145 450 115 Q 465 145 460 185 Z" fill="url(#duf-fireGrad)" opacity="0.9" />
              <path d="M 475 180 Q 465 135 480 108 Q 495 140 485 180 Z" fill="url(#duf-fireGrad)" opacity="0.85" />
              <path d="M 500 192 Q 490 152 505 128 Q 520 158 510 192 Z" fill="url(#duf-fireGrad)" opacity="0.9" />
            </g>
            {/* Danger callout */}
            <g transform="translate(492,55)">
              <rect x="0" y="0" width="162" height="52" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5" />
              <circle cx="10" cy="13" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></circle>
              <text x="20" y="15" fill="#ef4444" fontSize="8.5" fontWeight="800">DANGER ZONE</text>
              <text x="8" y="28" fill={t.hudText} fontSize="8" fontWeight="700">540°C HEAT CORE ACTIVE</text>
              <text x="8" y="39" fill="#fbbf24" fontSize="7" fontWeight="600">STRUCTURAL COLLAPSE RISK</text>
              <text x="8" y="49" fill="#f97316" fontSize="6.5" fontWeight="600">HAZMAT · SMOKE DENSITY HIGH</text>
            </g>
            {/* Cross-hair brackets */}
            {[[ 430,125],[510,125],[430,190],[510,190]].map(([x,y],i)=>(
              <path key={i} d={
                x<470 && y<160 ? `M${x},${y+6} L${x},${y} L${x+6},${y}` :
                x>470 && y<160 ? `M${x-6},${y} L${x},${y} L${x},${y+6}` :
                x<470          ? `M${x},${y-6} L${x},${y} L${x+6},${y}` :
                                 `M${x-6},${y} L${x},${y} L${x},${y-6}`
              } stroke="#ef4444" strokeWidth="2" fill="none" />
            ))}
          </g>
        )}

        {/* ── OVERLAY: SAFE PATHWAYS ── */}
        {showP && (
          <g>
            {/* Illuminated safe corridor floor 1 → exit */}
            <rect x="92" y="268" width="88" height="22" rx="3" fill="#10b98112" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 2" />
            <text x="96" y="279" fill="#10b981" fontSize="6" fontWeight="700">CLEAR CORRIDOR</text>
            <text x="96" y="287" fill="#10b981" fontSize="5.5">→ STAIRWELL A</text>
            {/* Animated flow arrow */}
            <line x1="175" y1="295" x2="52" y2="345" stroke="#10b981" strokeWidth="2.5" strokeDasharray="7 3">
              <animate attributeName="strokeDashoffset" values="0;20" dur="0.9s" repeatCount="indefinite" />
            </line>
            <polygon points="43,350 52,340 58,352" fill="#10b981" />
            {/* Assembly point */}
            <circle cx="35" cy="370" r="16" fill="#10b98118" stroke="#10b981" strokeWidth="2">
              <animate attributeName="r" values="14;18;14" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <text x="35" y="367" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="800">SAFE</text>
            <text x="35" y="376" textAnchor="middle" fill="#10b981" fontSize="5.5" fontWeight="700">POINT</text>
            {/* Safe pathway callout */}
            <g transform="translate(58,345)">
              <rect x="0" y="0" width="120" height="38" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2" />
              <text x="6" y="11" fill="#10b981" fontSize="7.5" fontWeight="800">SAFE EGRESS ROUTE</text>
              <text x="6" y="22" fill={t.hudText} fontSize="7" fontWeight="600">FLOOR 1 → STAIRWELL</text>
              <text x="6" y="33" fill="#10b981" fontSize="6.5" fontWeight="600">EXTERIOR ASSEMBLY PT ✓</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SURVIVORS ── */}
        {showS && shown.map(v => {
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return <SurvivorMarker key={v.id} cx={cx} cy={cy} victim={v} showVitals={true} hudBg={t.hudBg} hudText={t.hudText} />;
        })}
        {/* Non-overlay mode: still show dots without vitals callouts but using triage filter */}
        {!showS && shown.map(v => {
          const dot = STATUS_STYLE[v.status]?.dot ?? '#f97316';
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return (
            <g key={v.id}>
              <circle cx={cx} cy={cy} r={6} fill={`${dot}25`} stroke={dot} strokeWidth={1.2}>
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r={3} fill={dot} />
              <text x={cx+7} y={cy+3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{v.id}</text>
            </g>
          );
        })}

        <text x="20" y="414" fill={isDark?'rgba(253,186,116,0.35)':'rgba(120,53,15,0.35)'} fontSize="7">
          FAST-LIO2 · YOLOv10-SAR · 1kg MINI O₂ CYLINDER SERVO · SIH26177 · TEAM SWARMOPS
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HUD 2 — FLASH FLOOD
═══════════════════════════════════════════════════════════ */
function FlashFloodHUD({ isDark, victims, filter, overlayMode }) {
  const shown = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const showS = overlayMode === 'ALL' || overlayMode === 'SURVIVORS';
  const showD = overlayMode === 'ALL' || overlayMode === 'DANGER';
  const showP = overlayMode === 'ALL' || overlayMode === 'SAFE';

  const t = isDark ? {
    bg:'#040d18', bldgA:'#0d1f33', bldgB:'#13283f', bldgC:'#0f2338',
    border:'rgba(56,189,248,0.35)', subBorder:'rgba(56,189,248,0.2)',
    underWater:'#081726', waterTop:'rgba(7,89,133,0.65)', waterBorder:'#38bdf8',
    hudBg:'rgba(4,15,26,0.94)', hudText:'#f0f9ff', hudSub:'#93c5fd',
  } : {
    bg:'#f0f7ff', bldgA:'#e2e8f0', bldgB:'#cbd5e1', bldgC:'#dbeafe',
    border:'rgba(3,105,161,0.35)', subBorder:'rgba(3,105,161,0.2)',
    underWater:'#94a3b8', waterTop:'rgba(186,230,253,0.7)', waterBorder:'#0284c7',
    hudBg:'rgba(255,255,255,0.96)', hudText:'#082f49', hudSub:'#0369a1',
  };

  const POSITIONS = {
    'V-101': [148,155], 'V-102': [148,220], 'V-103': [348,125],
    'V-104': [368,128], 'V-105': [383,138], 'V-106': [568,228],
  };

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.subBorder, background: t.bg }}>
      <svg viewBox="0 0 720 460" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <defs>
          <linearGradient id="dff-wD" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#082f49" stopOpacity="0.7"/><stop offset="100%" stopColor="#0369a1" stopOpacity="0.95"/>
          </linearGradient>
          <linearGradient id="dff-wL" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6"/><stop offset="100%" stopColor="#0284c7" stopOpacity="0.9"/>
          </linearGradient>
          <filter id="dff-glow"><feGaussianBlur stdDeviation="5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <text x="22" y="20" fill={isDark?'rgba(147,197,253,0.7)':'rgba(3,105,161,0.8)'} fontSize="8" fontWeight="600">FLOOD SECTOR BRAVO · 3-STRUCTURE HUD · BATHYMETRY ACTIVE</text>
        <text x="698" y="20" textAnchor="end" fill="#38bdf8" fontSize="8" fontWeight="700">● 77GHz FMCW GPR · OFFLINE</text>

        {/* ── STRUCTURES ── */}
        {/* Building A */}
        <polygon points="55,330 175,270 225,300 105,360" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="55,330 105,360 105,420 55,390" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="105,360 225,300 225,360 105,420" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="55,260 175,200 225,230 105,290" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="55,260 105,290 105,350 55,320" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="105,290 225,230 225,290 105,350" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="55,190 175,130 225,160 105,220" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="55,190 105,220 105,280 55,250" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="105,220 225,160 225,220 105,280" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
        <polygon points="55,185 175,125 225,155 105,215" fill={t.bldgA} stroke={t.border} strokeWidth="1.2"/>
        {/* Building B */}
        <polygon points="255,355 375,295 435,325 315,385" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="255,355 315,385 315,445 255,415" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="315,385 435,325 435,385 315,445" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="255,285 375,225 435,255 315,315" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,285 315,315 315,375 255,345" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="315,315 435,255 435,315 315,375" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,215 375,155 435,185 315,245" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,215 315,245 315,305 255,275" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="315,245 435,185 435,245 315,305" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,145 375,85 435,115 315,175" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,145 315,175 315,235 255,205" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="315,175 435,115 435,175 315,235" fill={t.bldgB} stroke={t.border} strokeWidth="1"/>
        <polygon points="255,140 375,80 435,110 315,170" fill={t.bldgB} stroke={t.border} strokeWidth="1.2"/>
        {/* Building C */}
        <polygon points="475,345 595,285 655,315 535,375" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="475,345 535,375 535,435 475,405" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="535,375 655,315 655,375 535,435" fill={t.underWater} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="475,275 595,215 655,245 535,305" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="475,275 535,305 535,365 475,335" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="535,305 655,245 655,305 535,365" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="475,275 535,235 655,205 595,245" fill={isDark?'#172d47':'#cbd5e1'} stroke={t.border} strokeWidth="1"/>
        <polygon points="475,275 535,305 535,235" fill={isDark?'#0f2035':'#94a3b8'} stroke={t.border} strokeWidth="1"/>
        {/* Flood water */}
        <polygon points="20,330 700,330 700,460 20,460" fill={isDark?'url(#dff-wD)':'url(#dff-wL)'} />
        <polygon points="20,330 240,290 700,325 480,365" fill={t.waterTop} stroke={t.waterBorder} strokeWidth="1" opacity="0.6"/>
        <path d="M 40 340 Q 70 335 100 340 T 160 340 T 220 340" stroke={t.waterBorder} strokeWidth="1.2" fill="none" opacity="0.55"/>
        <path d="M 330 355 Q 370 350 410 355 T 490 355 T 570 355" stroke={t.waterBorder} strokeWidth="1.2" fill="none" opacity="0.55"/>
        {/* Drones */}
        <DroneIcon cx={148} cy={170} color="#38bdf8" size={0.9}/>
        <DroneIcon cx={408} cy={65} color="#f97316" size={1}/>
        <DroneIcon cx={460} cy={265} color="#06b6d4" size={0.9}/>
        {[['2-1','#38bdf8',172,150,'INTERIOR SLAM'],['2-2','#f97316',438,44,'1kg O₂ PAYLOAD'],['2-3','#06b6d4',560,250,'GPR SCAN']].map(([id,col,tx,ty,sub])=>(
          <g key={id} transform={`translate(${tx},${ty})`}>
            <rect x="0" y="0" width="115" height="22" rx="3" fill={t.hudBg} stroke={col} strokeWidth="0.8"/>
            <text x="4" y="10" fill={col} fontSize="7" fontWeight="700">DRONE {id}</text>
            <text x="4" y="18" fill={t.hudSub} fontSize="6.5" fontWeight="600">{sub}</text>
          </g>
        ))}

        {/* ── OVERLAY: DANGER ZONE ── */}
        {showD && (
          <g>
            {/* Surge zone halo */}
            <ellipse cx="360" cy="355" rx="200" ry="42" fill="#3b82f618" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3">
              <animate attributeName="rx" values="195;210;195" dur="2.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite"/>
            </ellipse>
            {/* Depth badge */}
            <g transform="translate(28,398)">
              <rect x="0" y="0" width="152" height="32" rx="5" fill={t.hudBg} stroke="#38bdf8" strokeWidth="0.9"/>
              <text x="7" y="12" fill="#38bdf8" fontSize="7.5" fontWeight="700">▲ FLOOD SURGE LEVEL</text>
              <text x="7" y="24" fill={t.hudText} fontSize="7.5" fontWeight="600">DEPTH: -3.2M · +12cm/h</text>
            </g>
            {/* Danger callout */}
            <g transform="translate(225,358)">
              <rect x="0" y="0" width="240" height="40" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5"/>
              <circle cx="10" cy="14" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></circle>
              <text x="20" y="16" fill="#ef4444" fontSize="8.5" fontWeight="800">DANGER ZONE: RAPID WATER SURGE</text>
              <text x="8" y="29" fill={t.hudText} fontSize="7.5" fontWeight="700">DEPTH: -3.2M · RISE +12cm/h · VICTIM ISOLATION</text>
              <text x="8" y="39" fill="#38bdf8" fontSize="6.5" fontWeight="600">GPR SUB-SURFACE SWEEP ACTIVE · 77GHz FMCW</text>
            </g>
            {/* Current flow arrows */}
            {[[100,340],[200,345],[300,342],[450,348],[560,344]].map(([x,y],i)=>(
              <path key={i} d={`M${x},${y} L${x+20},${y+4}`} stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.6">
                <animate attributeName="strokeDashoffset" values="0;12" dur={`${0.8+i*0.1}s`} repeatCount="indefinite"/>
              </path>
            ))}
          </g>
        )}

        {/* ── OVERLAY: SAFE PATHWAYS ── */}
        {showP && (
          <g>
            {/* Bldg-A terrace safe spot */}
            <circle cx="140" cy="175" r="18" fill="#10b98115" stroke="#10b981" strokeWidth="1.5">
              <animate attributeName="r" values="16;22;16" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <text x="140" y="172" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="800">SAFE</text>
            <text x="140" y="181" textAnchor="middle" fill="#10b981" fontSize="5.5">BLDG-A</text>
            {/* Bldg-C ridge safe spot */}
            <circle cx="568" cy="210" r="16" fill="#10b98115" stroke="#10b981" strokeWidth="1.5">
              <animate attributeName="r" values="14;19;14" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <text x="568" y="207" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="800">SAFE</text>
            <text x="568" y="216" textAnchor="middle" fill="#10b981" fontSize="5.5">BLDG-C</text>
            {/* Evac flow: Bldg-A terrace → helo point */}
            <line x1="60" y1="175" x2="22" y2="155" stroke="#10b981" strokeWidth="2.5" strokeDasharray="7 3">
              <animate attributeName="strokeDashoffset" values="0;20" dur="1s" repeatCount="indefinite"/>
            </line>
            <polygon points="16,148 22,158 28,148" fill="#10b981"/>
            {/* Safe pathway callout */}
            <g transform="translate(22,100)">
              <rect x="0" y="0" width="140" height="46" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2"/>
              <text x="6" y="13" fill="#10b981" fontSize="7.5" fontWeight="800">SAFE EVACUATION</text>
              <text x="6" y="24" fill={t.hudText} fontSize="7" fontWeight="700">BLDG-A TERRACE → HELO</text>
              <text x="6" y="34" fill={t.hudText} fontSize="7" fontWeight="600">BLDG-C RIDGE HIGH GROUND</text>
              <text x="6" y="44" fill="#10b981" fontSize="6.5" fontWeight="600">BOTH POINTS VERIFIED SAFE ✓</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SURVIVORS ── */}
        {showS && shown.map(v => {
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return <SurvivorMarker key={v.id} cx={cx} cy={cy} victim={v} showVitals={true} hudBg={t.hudBg} hudText={t.hudText} />;
        })}
        {!showS && shown.map(v => {
          const dot = STATUS_STYLE[v.status]?.dot ?? '#38bdf8';
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return (
            <g key={v.id}>
              <circle cx={cx} cy={cy} r={6} fill={`${dot}25`} stroke={dot} strokeWidth={1.2}>
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx={cx} cy={cy} r={3} fill={dot}/>
              <text x={cx+7} y={cy+3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{v.id}</text>
            </g>
          );
        })}

        <text x="22" y="452" fill={isDark?'rgba(147,197,253,0.35)':'rgba(3,105,161,0.35)'} fontSize="7">
          77GHz FMCW GPR · FLIR BOSON 640 · MICRO-DOPPLER · YOLOv10-SAR · SIH26177 · TEAM SWARMOPS
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HUD 3 — EARTHQUAKE
═══════════════════════════════════════════════════════════ */
function EarthquakeHUD({ isDark, victims, filter, overlayMode }) {
  const shown = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const showS = overlayMode === 'ALL' || overlayMode === 'SURVIVORS';
  const showD = overlayMode === 'ALL' || overlayMode === 'DANGER';
  const showP = overlayMode === 'ALL' || overlayMode === 'SAFE';

  const t = isDark ? {
    bg:'#08060f', bldgA:'#151124', bldgB:'#1e1735', bldgC:'#1a1330',
    slab:'#2a2245', border:'rgba(167,139,250,0.4)', subBorder:'rgba(139,92,246,0.25)',
    ground:'#120d22', groundB:'#1c1636', crack:'#ea580c', fissure:'#05020a',
    rebar:'#f97316', hudBg:'rgba(15,10,26,0.94)', hudText:'#f5f3ff', hudSub:'#c4b5fd',
  } : {
    bg:'#faf5ff', bldgA:'#f3e8ff', bldgB:'#e9d5ff', bldgC:'#f5d0fe',
    slab:'#ddd6fe', border:'rgba(124,58,237,0.4)', subBorder:'rgba(109,40,217,0.25)',
    ground:'#e2e8f0', groundB:'#f1f5f9', crack:'#c2410c', fissure:'#1e293b',
    rebar:'#ea580c', hudBg:'rgba(255,255,255,0.96)', hudText:'#2e1065', hudSub:'#6d28d9',
  };

  const POSITIONS = {
    'V-201': [138,245], 'V-202': [172,165], 'V-203': [348,318], 'V-204': [368,320],
    'V-205': [388,228], 'V-206': [578,338], 'V-207': [592,238], 'V-208': [438,385],
  };

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.subBorder, background: t.bg }}>
      <svg viewBox="0 0 720 460" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <defs>
          <linearGradient id="deq-fiss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.95"/>
            <stop offset="100%" stopColor={t.fissure} stopOpacity="1"/>
          </linearGradient>
        </defs>

        <text x="22" y="20" fill={isDark?'rgba(196,181,253,0.7)':'rgba(109,40,217,0.8)'} fontSize="8" fontWeight="600">SECTOR FOXTROT · COLLAPSE ANALYSIS · VOID SPACE HUD</text>
        <text x="698" y="20" textAnchor="end" fill="#8b5cf6" fontSize="8" fontWeight="700">● ZERO-CLOUD AUTONOMY · OFFLINE EDGE</text>

        {/* Ground */}
        <polygon points="20,320 700,320 700,460 20,460" fill={t.ground}/>
        <polygon points="20,320 180,320 170,390 20,390" fill={t.groundB} opacity="0.8"/>
        <polygon points="180,320 370,320 350,390 170,390" fill={t.ground} opacity="0.8"/>
        <polygon points="370,320 540,320 520,390 350,390" fill={t.groundB} opacity="0.8"/>
        <polygon points="540,320 700,320 700,390 520,390" fill={t.ground} opacity="0.8"/>
        {/* Fissure 1 */}
        <polygon points="175,328 245,352 230,388 255,408 240,455 224,455 210,410 218,382 165,345" fill="url(#deq-fiss)"/>
        <path d="M 175 328 L 245 352 L 230 388 L 255 408 L 240 455" stroke={t.crack} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M 165 345 L 218 382 L 210 410 L 224 455" stroke={t.crack} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <line x1="200" y1="370" x2="235" y2="362" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="215" y1="402" x2="246" y2="398" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round"/>
        {/* Fissure 2 */}
        <polygon points="485,345 540,370 530,398 560,418 545,455 530,455 512,418 518,392 473,362" fill="url(#deq-fiss)"/>
        <path d="M 485 345 L 540 370 L 530 398 L 560 418 L 545 455" stroke={t.crack} strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        {/* Building A */}
        <g transform="rotate(-5, 135, 340)">
          <polygon points="48,320 168,270 218,300 98,350" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
          <polygon points="48,250 168,200 218,230 98,280" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
          <polygon points="48,250 98,280 98,350 48,320" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
          <polygon points="98,280 218,230 218,300 98,350" fill={t.bldgA} stroke={t.border} strokeWidth="1"/>
          <path d="M 62 265 L 82 310 L 76 335" stroke={t.crack} strokeWidth="1.8" fill="none"/>
          <polygon points="112,225 192,188 192,242 112,278" fill={isDark?'#080410':'#ddd6fe'} stroke={t.border} strokeWidth="0.8"/>
          <polygon points="116,215 184,185 188,195 120,225" fill={t.slab} stroke={t.border} strokeWidth="1"/>
          <polygon points="48,180 168,130 218,160 98,210" fill={t.bldgA} stroke={t.border} strokeWidth="1.2"/>
        </g>
        {/* Building B */}
        <polygon points="258,350 378,300 438,325 318,375" fill={t.bldgB} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="258,350 318,375 318,420 258,395" fill={t.bldgB} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="318,375 438,325 438,370 318,420" fill={t.bldgB} stroke={t.border} strokeWidth="0.8"/>
        <polygon points="308,325 383,280 393,330 308,332" fill={isDark?'#040208':'#c4b5fd'} stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2"/>
        <polygon points="293,300 413,250 453,275 333,325" fill={t.slab} stroke={t.border} strokeWidth="1.4"/>
        <line x1="293" y1="300" x2="278" y2="315" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="333" y1="325" x2="326" y2="348" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round"/>
        <polygon points="273,250 388,200 433,225 318,275" fill={t.slab} stroke={t.border} strokeWidth="1.2"/>
        {/* Building C */}
        <polygon points="488,340 608,285 668,315 548,370" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="488,340 548,370 548,425 488,395" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="548,370 668,315 668,370 548,425" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="488,260 608,205 668,235 548,290" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="488,260 548,290 548,350 488,320" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="548,290 668,235 668,295 548,350" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="488,180 608,125 668,155 548,210" fill={t.bldgC} stroke={t.border} strokeWidth="1.2"/>
        <polygon points="488,180 548,210 548,270 488,240" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <polygon points="548,210 668,155 668,215 548,270" fill={t.bldgC} stroke={t.border} strokeWidth="1"/>
        <path d="M 504 195 L 540 260 M 540 195 L 504 260" stroke={t.crack} strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
        <polygon points="553,315 603,290 603,335 553,360" fill={isDark?'#06030c':'#ddd6fe'} stroke="#10b981" strokeWidth="1" strokeDasharray="3 2"/>
        {/* Drones */}
        <DroneIcon cx={265} cy={210} color="#8b5cf6" size={0.9}/>
        <DroneIcon cx={158} cy={188} color="#f97316" size={0.9}/>
        <DroneIcon cx={455} cy={248} color="#f59e0b" size={0.9}/>
        <DroneIcon cx={540} cy={168} color="#06b6d4" size={0.9}/>
        {[['3-1','#8b5cf6',268,172,'VOID SCAN'],['3-2','#f97316',100,170,'PAYLOAD'],['3-3','#f59e0b',460,218,'GPR'],['3-4','#06b6d4',545,142,'SLAM']].map(([id,col,tx,ty,sub])=>(
          <g key={id} transform={`translate(${tx},${ty})`}>
            <rect x="0" y="0" width="80" height="20" rx="3" fill={t.hudBg} stroke={col} strokeWidth="0.8"/>
            <text x="4" y="9" fill={col} fontSize="6.5" fontWeight="700">DRONE {id}</text>
            <text x="4" y="17" fill={t.hudSub} fontSize="6">{sub}</text>
          </g>
        ))}

        {/* ── OVERLAY: DANGER ZONES ── */}
        {showD && (
          <g>
            {/* Void Space A danger halo */}
            <ellipse cx="348" cy="308" rx="75" ry="55" fill="#ef444415" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="rx" values="72;80;72" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            {/* Structural collapse zone */}
            <ellipse cx="348" cy="280" rx="100" ry="72" fill="#8b5cf615" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8">
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            {/* Danger callout */}
            <g transform="translate(438,185)">
              <rect x="0" y="0" width="188" height="52" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5"/>
              <circle cx="10" cy="13" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></circle>
              <text x="20" y="15" fill="#ef4444" fontSize="8.5" fontWeight="800">DANGER ZONE</text>
              <text x="8" y="28" fill={t.hudText} fontSize="8" fontWeight="700">VOID SPACE A · PANCAKE COLLAPSE</text>
              <text x="8" y="39" fill="#fbbf24" fontSize="7" fontWeight="600">AIR POCKET: 4.8m³ · STRUCTURAL RISK</text>
              <text x="8" y="50" fill="#8b5cf6" fontSize="6.5" fontWeight="600">SEISMIC FISSURE ZONE ACTIVE</text>
            </g>
            <line x1="438" y1="210" x2="393" y2="310" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 2"/>
          </g>
        )}

        {/* ── OVERLAY: SAFE PATHWAYS ── */}
        {showP && (
          <g>
            {/* Ground corridor east */}
            <rect x="440" y="362" width="240" height="22" rx="4" fill="#10b98112" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2"/>
            <text x="448" y="374" fill="#10b981" fontSize="6.5" fontWeight="700">SAFE CORRIDOR → NDRF RALLY POINT</text>
            <line x1="680" y1="373" x2="698" y2="365" stroke="#10b981" strokeWidth="2.5">
              <animate attributeName="strokeDashoffset" values="0;18" dur="0.9s" repeatCount="indefinite"/>
            </line>
            <polygon points="695,359 698,368 702,360" fill="#10b981"/>
            {/* Void C sealed refuge */}
            <circle cx="578" cy="335" r="18" fill="#10b98115" stroke="#10b981" strokeWidth="1.5">
              <animate attributeName="r" values="16;21;16" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <text x="578" y="332" textAnchor="middle" fill="#10b981" fontSize="6" fontWeight="800">VOID C</text>
            <text x="578" y="341" textAnchor="middle" fill="#10b981" fontSize="5.5">SEALED</text>
            {/* Safe callout */}
            <g transform="translate(22,392)">
              <rect x="0" y="0" width="165" height="46" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2"/>
              <text x="6" y="13" fill="#10b981" fontSize="7.5" fontWeight="800">SAFE PATHWAYS</text>
              <text x="6" y="25" fill={t.hudText} fontSize="7" fontWeight="700">VOID C: SEALED AIR POCKET ✓</text>
              <text x="6" y="36" fill={t.hudText} fontSize="7" fontWeight="600">GROUND CORRIDOR → EAST</text>
              <text x="6" y="45" fill="#10b981" fontSize="6.5" fontWeight="600">NDRF RALLY POINT: VERIFIED ✓</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SURVIVORS ── */}
        {showS && shown.map(v => {
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return <SurvivorMarker key={v.id} cx={cx} cy={cy} victim={v} showVitals={true} hudBg={t.hudBg} hudText={t.hudText}/>;
        })}
        {!showS && shown.map(v => {
          const dot = STATUS_STYLE[v.status]?.dot ?? '#8b5cf6';
          const [cx, cy] = POSITIONS[v.id] ?? [200, 200];
          return (
            <g key={v.id}>
              <circle cx={cx} cy={cy} r={6} fill={`${dot}25`} stroke={dot} strokeWidth={1.2}>
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx={cx} cy={cy} r={3} fill={dot}/>
              <text x={cx+7} y={cy+3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{v.id}</text>
            </g>
          );
        })}

        <text x="22" y="452" fill={isDark?'rgba(196,181,253,0.35)':'rgba(109,40,217,0.35)'} fontSize="7">
          LIVOX LIDAR · FLIR BOSON 640 · 77GHz FMCW GPR · MICRO-DOPPLER · YOLOv10-SAR · SIH26177 · TEAM SWARMOPS
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HUD 4 — RAT-HOLE MINING
═══════════════════════════════════════════════════════════ */
function RatHoleMiningHUD({ isDark, victims, filter, overlayMode }) {
  const shown = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const showS = overlayMode === 'ALL' || overlayMode === 'SURVIVORS';
  const showD = overlayMode === 'ALL' || overlayMode === 'DANGER';
  const showP = overlayMode === 'ALL' || overlayMode === 'SAFE';

  const t = isDark ? {
    bg:'#080502', surface:'#2b1809', s1:'#221206', s2:'#180c03', s3:'#100701', s4:'#080301',
    border:'rgba(245,158,11,0.4)', subBorder:'rgba(245,158,11,0.22)',
    tunnel:'#040201', tunnelBorder:'rgba(245,158,11,0.5)',
    rockfall:'#2d1607', rockfallL:'#42220c', rockBorder:'rgba(245,158,11,0.4)',
    timber:'#78350f', gasCloud:'rgba(22,163,74,0.22)', gasBorder:'rgba(34,197,94,0.4)',
    hudBg:'rgba(15,8,2,0.94)', hudText:'#fef3c7', hudSub:'#fde68a', crack:'#f97316',
  } : {
    bg:'#fffbf0', surface:'#eedbc5', s1:'#dfc6a0', s2:'#d0b082', s3:'#c09a68', s4:'#b08450',
    border:'rgba(180,83,9,0.4)', subBorder:'rgba(180,83,9,0.22)',
    tunnel:'#fdf8f0', tunnelBorder:'rgba(180,83,9,0.5)',
    rockfall:'#d4a373', rockfallL:'#faedcd', rockBorder:'rgba(180,83,9,0.4)',
    timber:'#92400e', gasCloud:'rgba(22,163,74,0.18)', gasBorder:'rgba(21,128,61,0.4)',
    hudBg:'rgba(255,255,255,0.96)', hudText:'#451a03', hudSub:'#78350f', crack:'#c2410c',
  };

  const POSITIONS = {
    'V-301': [155,272], 'V-302': [252,342], 'V-303': [422,278], 'V-304': [542,380],
  };

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.subBorder, background: t.bg }}>
      <svg viewBox="0 0 720 460" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>

        <text x="22" y="20" fill={isDark?'rgba(253,230,138,0.7)':'rgba(120,53,15,0.7)'} fontSize="8" fontWeight="600">RAT-HOLE MINE · SUBTERRANEAN CROSS-SECTION · MICRO-DRONE HUD</text>
        <text x="698" y="20" textAnchor="end" fill="#f59e0b" fontSize="8" fontWeight="700">● ZERO-CLOUD · OFFLINE AUTONOMY</text>

        {/* Strata */}
        <polygon points="20,40 700,40 700,88 20,88" fill={t.surface} stroke={t.border} strokeWidth="0.8"/>
        <text x="30" y="68" fill={isDark?'rgba(253,186,116,0.45)':'rgba(120,53,15,0.4)'} fontSize="7.5">SURFACE GROUND · LATERITE SOIL</text>
        <polygon points="20,88 700,88 700,168 20,168" fill={t.s1} stroke={t.border} strokeWidth="0.6"/>
        <text x="30" y="132" fill={isDark?'rgba(245,158,11,0.4)':'rgba(120,53,15,0.38)'} fontSize="7">STRATA 1 · COMPACT CLAY · 2-4M DEPTH</text>
        <polygon points="20,168 700,168 700,260 20,260" fill={t.s2} stroke={t.border} strokeWidth="0.6"/>
        <text x="30" y="218" fill={isDark?'rgba(245,158,11,0.4)':'rgba(120,53,15,0.38)'} fontSize="7">STRATA 2 · COAL SEAM · 4-8M DEPTH</text>
        <polygon points="20,260 700,260 700,360 20,360" fill={t.s3} stroke={t.border} strokeWidth="0.6"/>
        <text x="30" y="315" fill={isDark?'rgba(245,158,11,0.38)':'rgba(120,53,15,0.36)'} fontSize="7">STRATA 3 · SHALE ROCK · 8-14M DEPTH</text>
        <polygon points="20,360 700,360 700,445 20,445" fill={t.s4} stroke={t.border} strokeWidth="0.6"/>
        <text x="30" y="405" fill={isDark?'rgba(245,158,11,0.32)':'rgba(120,53,15,0.32)'} fontSize="7">STRATA 4 · BEDROCK · 14M+ DEPTH</text>
        {/* Main shaft */}
        <polygon points="120,40 160,40 160,320 120,320" fill={t.tunnel} stroke={t.tunnelBorder} strokeWidth="1.2"/>
        {/* Shaft A-1 */}
        <polygon points="120,260 380,260 380,290 120,290" fill={t.tunnel} stroke={t.tunnelBorder} strokeWidth="1.2"/>
        {/* Rockfall */}
        <polygon points="200,260 270,260 250,290 180,290" fill={t.rockfall} stroke={t.rockBorder} strokeWidth="0.8"/>
        <polygon points="220,260 255,250 265,265 230,270" fill={t.rockfallL} stroke={t.rockBorder} strokeWidth="0.6"/>
        <text x="213" y="280" fill="#ef4444" fontSize="6.5" fontWeight="800">ROCKFALL</text>
        {/* Shaft A-2 */}
        <polygon points="120,330 420,330 420,358 120,358" fill={t.tunnel} stroke={t.tunnelBorder} strokeWidth="1.2"/>
        {/* Gallery B */}
        <polygon points="380,245 620,245 620,310 380,310" fill={t.tunnel} stroke={t.tunnelBorder} strokeWidth="1.2"/>
        {/* Timber props */}
        {[425,488,551].map(x=>(
          <g key={x}>
            <rect x={x} y={248} width={5} height={60} fill={t.timber} stroke={isDark?'#92400e':'#78350f'} strokeWidth="0.8"/>
          </g>
        ))}
        <rect x="424" y="246" width="58" height="6" fill={t.timber} stroke={isDark?'#92400e':'#78350f'} strokeWidth="0.8"/>
        <rect x="487" y="246" width="68" height="6" fill={t.timber} stroke={isDark?'#92400e':'#78350f'} strokeWidth="0.8"/>
        {/* Junction C */}
        <polygon points="420,355 660,355 660,410 420,410" fill={t.tunnel} stroke="#10b981" strokeWidth="1.5"/>
        <rect x="422" y="357" width="236" height="51" fill="#10b98112"/>
        <text x="500" y="376" fill="#10b981" fontSize="8" fontWeight="800">JUNCTION C</text>
        <text x="460" y="390" fill="#10b981" fontSize="7" fontWeight="700">GAS POCKET CLEARED · STRUCTURALLY SAFE</text>
        {/* Vent shaft */}
        <line x1="580" y1="355" x2="580" y2="40" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 3">
          <animate attributeName="strokeDashoffset" values="0;16" dur="1s" repeatCount="indefinite"/>
        </line>
        <text x="588" y="60" fill="#10b981" fontSize="7" fontWeight="700">VENT SHAFT → SURFACE</text>
        {/* Micro-drones */}
        {[[155,272,'#f59e0b'],[250,341,'#06b6d4'],[420,275,'#f97316'],[540,378,'#10b981']].map(([x,y,col],i)=>(
          <g key={i} transform={`translate(${x},${y})`}>
            <ellipse cx={-8} cy={-3} rx={5} ry={2} stroke={col} strokeWidth={0.7} fill={`${col}22`} strokeDasharray="2 1"/>
            <ellipse cx={ 8} cy={-3} rx={5} ry={2} stroke={col} strokeWidth={0.7} fill={`${col}22`} strokeDasharray="2 1"/>
            <rect x={-4} y={-3} width={8} height={6} rx={1.5} fill="#09090b" stroke={col} strokeWidth={0.8}/>
            <circle cx={0} cy={0} r={1.5} fill="#10b981"><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/></circle>
          </g>
        ))}
        {[['4-1','#f59e0b',85,264,'SHAFT A-1'],['4-2','#06b6d4',80,334,'SHAFT A-2'],['4-3','#f97316',310,264,'GALLERY B'],['4-4','#10b981',600,371,'JUNCTION C']].map(([id,col,tx,ty,loc])=>(
          <g key={id} transform={`translate(${tx},${ty})`}>
            <rect x="0" y="0" width="80" height="20" rx="2" fill={t.hudBg} stroke={col} strokeWidth="0.7"/>
            <text x="3" y="9" fill={col} fontSize="6.5" fontWeight="700">DRONE {id}</text>
            <text x="3" y="17" fill={t.hudSub} fontSize="6">{loc}</text>
          </g>
        ))}
        {/* Depth scale */}
        <line x1="695" y1="40" x2="695" y2="445" stroke={isDark?'rgba(245,158,11,0.3)':'rgba(180,83,9,0.3)'} strokeWidth="0.8"/>
        {[[40,'0M'],[88,'2M'],[168,'4M'],[260,'8M'],[360,'14M'],[445,'20M+']].map(([y,lbl])=>(
          <g key={lbl}>
            <line x1="690" y1={y} x2="700" y2={y} stroke={isDark?'rgba(245,158,11,0.4)':'rgba(180,83,9,0.4)'} strokeWidth="0.8"/>
            <text x="688" y={y+3} textAnchor="end" fill={isDark?'rgba(245,158,11,0.5)':'rgba(120,53,15,0.5)'} fontSize="6.5">{lbl}</text>
          </g>
        ))}

        {/* ── OVERLAY: DANGER ZONES ── */}
        {showD && (
          <g>
            {/* Gas accumulation pocket — animated halo */}
            <ellipse cx="308" cy="210" rx="92" ry="50" fill={t.gasCloud} stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="rx" values="88;100;88" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            {/* Rockfall danger */}
            <rect x="185" y="256" width="92" height="38" rx="4" fill="#ef444418" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>
            </rect>
            {/* Danger callout */}
            <g transform="translate(185,160)">
              <rect x="0" y="0" width="210" height="52" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5"/>
              <circle cx="10" cy="14" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></circle>
              <text x="20" y="16" fill="#ef4444" fontSize="8.5" fontWeight="800">DANGER ZONE</text>
              <text x="8" y="29" fill={t.hudText} fontSize="8" fontWeight="700">GAS ACCUMULATION POCKET</text>
              <text x="8" y="40" fill="#fbbf24" fontSize="7" fontWeight="600">CH4 3.8% LEL · CO 820 PPM · LETHAL</text>
              <text x="8" y="50" fill="#f97316" fontSize="6.5" fontWeight="600">ROCKFALL BLOCKADE · SHAFT A-1</text>
            </g>
            <line x1="305" y1="212" x2="305" y2="210" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 1"/>
          </g>
        )}

        {/* ── OVERLAY: SAFE PATHWAYS ── */}
        {showP && (
          <g>
            {/* Gallery B → Junction C → Vent shaft */}
            <line x1="420" y1="278" x2="382" y2="278" stroke="#10b981" strokeWidth="2.5" strokeDasharray="7 3">
              <animate attributeName="strokeDashoffset" values="0;20" dur="1s" repeatCount="indefinite"/>
            </line>
            <line x1="580" y1="355" x2="580" y2="90" stroke="#10b981" strokeWidth="2" strokeDasharray="6 3" opacity="0.7">
              <animate attributeName="strokeDashoffset" values="0;18" dur="0.9s" repeatCount="indefinite"/>
            </line>
            {/* Junction C refuge glow */}
            <rect x="420" y="355" width="240" height="55" rx="4" fill="#10b98115" stroke="#10b981" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
            </rect>
            {/* Safe callout */}
            <g transform="translate(230,228)">
              <rect x="0" y="0" width="168" height="46" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2"/>
              <text x="6" y="13" fill="#10b981" fontSize="7.5" fontWeight="800">SAFE EGRESS ROUTE</text>
              <text x="6" y="25" fill={t.hudText} fontSize="7" fontWeight="700">GALLERY B → JUNCTION C</text>
              <text x="6" y="36" fill={t.hudText} fontSize="7" fontWeight="600">→ VENT SHAFT → SURFACE</text>
              <text x="6" y="45" fill="#10b981" fontSize="6.5" fontWeight="600">GAS CLEARED · STRUCTURALLY SAFE ✓</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SURVIVORS ── */}
        {showS && shown.map(v => {
          const [cx, cy] = POSITIONS[v.id] ?? [200, 300];
          return <SurvivorMarker key={v.id} cx={cx} cy={cy} victim={v} showVitals={true} hudBg={t.hudBg} hudText={t.hudText}/>;
        })}
        {!showS && shown.map(v => {
          const dot = STATUS_STYLE[v.status]?.dot ?? '#f59e0b';
          const [cx, cy] = POSITIONS[v.id] ?? [200, 300];
          return (
            <g key={v.id}>
              <circle cx={cx} cy={cy} r={6} fill={`${dot}25`} stroke={dot} strokeWidth={1.2}>
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx={cx} cy={cy} r={3} fill={dot}/>
              <text x={cx+7} y={cy+3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{v.id}</text>
            </g>
          );
        })}

        <text x="22" y="452" fill={isDark?'rgba(253,230,138,0.35)':'rgba(120,53,15,0.35)'} fontSize="7">
          LIVOX LIDAR · FLIR BOSON 640 · 77GHz FMCW GPR · MICRO-DOPPLER · YOLOv10-SAR · SIH26177 · TEAM SWARMOPS
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HUD 5 — INDUSTRIAL HAZMAT
═══════════════════════════════════════════════════════════ */
function IndustrialHazmatHUD({ isDark, victims, filter, overlayMode }) {
  const shown = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const showS = overlayMode === 'ALL' || overlayMode === 'SURVIVORS';
  const showD = overlayMode === 'ALL' || overlayMode === 'DANGER';
  const showP = overlayMode === 'ALL' || overlayMode === 'SAFE';

  const t = isDark ? {
    bg:'#020b08', steel:'#052219', steelBorder:'rgba(16,185,129,0.45)',
    tank:'#0a382b', tankBorder:'rgba(16,185,129,0.4)',
    pipe:'#0f766e', pipeBorder:'rgba(20,184,166,0.5)',
    catwalk:'#06281e', catwalkBorder:'rgba(16,185,129,0.35)', railing:'#10b981',
    refuge:'#041d14', refugeBorder:'#10b981',
    ground:'#04140e', groundBorder:'rgba(16,185,129,0.3)',
    hudBg:'rgba(2,20,14,0.94)', hudText:'#ecfdf5', hudSub:'#a7f3d0',
    subBorder:'rgba(16,185,129,0.22)',
  } : {
    bg:'#f0fdf4', steel:'#d1fae5', steelBorder:'rgba(5,150,105,0.45)',
    tank:'#a7f3d0', tankBorder:'rgba(5,150,105,0.4)',
    pipe:'#14b8a6', pipeBorder:'rgba(13,148,136,0.5)',
    catwalk:'#e6f4ea', catwalkBorder:'rgba(5,150,105,0.35)', railing:'#059669',
    refuge:'#dcfce7', refugeBorder:'#059669',
    ground:'#e2e8f0', groundBorder:'rgba(100,116,139,0.45)',
    hudBg:'rgba(255,255,255,0.96)', hudText:'#064e3b', hudSub:'#047857',
    subBorder:'rgba(5,150,105,0.22)',
  };

  const POSITIONS = {
    'V-401': [310,168], 'V-402': [175,205], 'V-403': [420,268],
    'V-404': [510,215], 'V-405': [628,268],
  };

  return (
    <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.subBorder, background: t.bg }}>
      <svg viewBox="0 0 720 460" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <defs>
          <radialGradient id="dhz-plume" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.6"/>
            <stop offset="75%" stopColor="#84cc16" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
          </radialGradient>
          <filter id="dhz-blur"><feGaussianBlur stdDeviation="6"/></filter>
          <filter id="dhz-glow"><feGaussianBlur stdDeviation="4" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <text x="22" y="20" fill={isDark?'rgba(167,243,208,0.7)':'rgba(4,120,87,0.8)'} fontSize="8" fontWeight="600">INDUSTRIAL HAZMAT · CHEMICAL PLANT HUD · ZERO-CLOUD AUTONOMY</text>
        <text x="698" y="20" textAnchor="end" fill="#10b981" fontSize="8" fontWeight="700">● 880 PPM Cl₂ · SWARMOPS ACTIVE</text>

        {/* Ground */}
        <polygon points="20,360 700,360 700,445 20,445" fill={t.ground} stroke={t.groundBorder} strokeWidth="0.8"/>
        {/* Structural columns */}
        {[100,250,400,550].map(x=>(
          <polygon key={x} points={`${x},60 ${x+22},60 ${x+22},360 ${x},360`} fill={t.steel} stroke={t.steelBorder} strokeWidth="1"/>
        ))}
        {/* Tank A */}
        <ellipse cx="168" cy="180" rx="55" ry="28" fill={t.tank} stroke={t.tankBorder} strokeWidth="1.5"/>
        <rect x="113" y="180" width="110" height="155" fill={t.tank} stroke={t.tankBorder} strokeWidth="1.5"/>
        <ellipse cx="168" cy="335" rx="55" ry="18" fill={isDark?'#072e20':'#6ee7b7'} stroke={t.tankBorder} strokeWidth="1"/>
        <text x="168" y="262" textAnchor="middle" fill={t.railing} fontSize="9" fontWeight="700">TANK A</text>
        <text x="168" y="274" textAnchor="middle" fill={isDark?'rgba(167,243,208,0.55)':'rgba(4,120,87,0.65)'} fontSize="7">CHLORINE</text>
        {/* Tank B */}
        <ellipse cx="358" cy="215" rx="42" ry="22" fill={t.tank} stroke={t.tankBorder} strokeWidth="1.5"/>
        <rect x="316" y="215" width="84" height="125" fill={t.tank} stroke={t.tankBorder} strokeWidth="1.5"/>
        <ellipse cx="358" cy="340" rx="42" ry="14" fill={isDark?'#072e20':'#6ee7b7'} stroke={t.tankBorder} strokeWidth="1"/>
        <text x="358" y="278" textAnchor="middle" fill={t.railing} fontSize="9" fontWeight="700">TANK B</text>
        {/* Sphere */}
        <circle cx="508" cy="278" r="52" fill={t.tank} stroke={t.tankBorder} strokeWidth="1.5"/>
        <text x="508" y="282" textAnchor="middle" fill={t.railing} fontSize="9" fontWeight="700">SPHERE</text>
        <text x="508" y="294" textAnchor="middle" fill={isDark?'rgba(167,243,208,0.55)':'rgba(4,120,87,0.65)'} fontSize="7">PRESSURIZED</text>
        <line x1="480" y1="328" x2="468" y2="360" stroke={t.steelBorder} strokeWidth="3" strokeLinecap="round"/>
        <line x1="536" y1="328" x2="548" y2="360" stroke={t.steelBorder} strokeWidth="3" strokeLinecap="round"/>
        {/* Pipe network */}
        <rect x="115" y="152" width="355" height="12" rx="6" fill={t.pipe} stroke={t.pipeBorder} strokeWidth="1"/>
        <rect x="158" y="80" width="12" height="72" rx="3" fill={t.pipe} stroke={t.pipeBorder} strokeWidth="0.8"/>
        <rect x="348" y="110" width="12" height="42" rx="3" fill={t.pipe} stroke={t.pipeBorder} strokeWidth="0.8"/>
        {/* Leak point on pipe */}
        <circle cx="285" cy="158" r="5" fill="#ef444488" stroke="#ef4444" strokeWidth="1.5">
          <animate attributeName="r" values="4;7;4" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        {/* Catwalk */}
        <rect x="100" y="128" width="430" height="12" rx="2" fill={t.catwalk} stroke={t.catwalkBorder} strokeWidth="1"/>
        {[120,170,220,270,320,370,420,470].map(x=>(
          <line key={x} x1={x} y1="128" x2={x} y2="95" stroke={t.railing} strokeWidth="0.8" opacity="0.7"/>
        ))}
        <line x1="100" y1="95" x2="530" y2="95" stroke={t.railing} strokeWidth="1" opacity="0.7"/>
        <text x="115" y="116" fill={isDark?'rgba(167,243,208,0.45)':'rgba(4,120,87,0.45)'} fontSize="7">CATWALK LEVEL 2</text>
        {/* Positive Pressure Safe Room */}
        <rect x="575" y="235" width="110" height="125" rx="6" fill={t.refuge} stroke={t.refugeBorder} strokeWidth="2"/>
        <ellipse cx="630" cy="235" rx="55" ry="18" fill={t.refuge} stroke={t.refugeBorder} strokeWidth="1.5"/>
        <rect x="576" y="247" width="108" height="8" fill={isDark?'rgba(16,185,129,0.2)':'rgba(5,150,105,0.15)'}/>
        <text x="630" y="285" textAnchor="middle" fill="#10b981" fontSize="8.5" fontWeight="800">SAFE ROOM</text>
        <text x="630" y="298" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700">POSITIVE PRESSURE</text>
        <text x="630" y="310" textAnchor="middle" fill="#10b981" fontSize="6.5" fontWeight="700">AIR SEALED</text>
        {/* Drones */}
        <DroneIcon cx={310} cy={100} color="#10b981" size={0.9}/>
        <DroneIcon cx={175} cy={145} color="#f97316" size={0.9}/>
        <DroneIcon cx={460} cy={145} color="#06b6d4" size={0.9}/>
        <DroneIcon cx={630} cy={185} color="#10b981" size={0.9}/>
        {[['5-1','#10b981',245,82,'CATWALK SCAN'],['5-2','#f97316',100,132,'TANK AREA'],['5-3','#06b6d4',465,118,'PIPE SURVEY'],['5-4','#10b981',540,172,'SAFE ESCORT']].map(([id,col,tx,ty,sub])=>(
          <g key={id} transform={`translate(${tx},${ty})`}>
            <rect x="0" y="0" width="100" height="20" rx="3" fill={t.hudBg} stroke={col} strokeWidth="0.8"/>
            <text x="4" y="9" fill={col} fontSize="6.5" fontWeight="700">DRONE {id}</text>
            <text x="4" y="17" fill={t.hudSub} fontSize="6">{sub}</text>
          </g>
        ))}

        {/* ── OVERLAY: DANGER ZONES ── */}
        {showD && (
          <g>
            {/* Plume blob */}
            <g filter="url(#dhz-blur)">
              <ellipse cx="285" cy="155" rx="65" ry="45" fill="url(#dhz-plume)"/>
            </g>
            <ellipse cx="285" cy="148" rx="130" ry="65" fill="url(#dhz-plume)" opacity="0.5">
              <animate attributeName="rx" values="120;140;120" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0.65;0.4" dur="3s" repeatCount="indefinite"/>
            </ellipse>
            {/* Plume direction arrow NE */}
            <line x1="320" y1="130" x2="458" y2="72" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="7 3" opacity="0.9">
              <animate attributeName="strokeDashoffset" values="0;20" dur="0.8s" repeatCount="indefinite"/>
            </line>
            <polygon points="458,72 444,80 446,66" fill="#ef4444"/>
            {/* Explosive atmosphere zone */}
            <ellipse cx="285" cy="200" rx="145" ry="80" fill="#ef444410" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7">
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            {/* Danger callout */}
            <g transform="translate(195,38)">
              <rect x="0" y="0" width="240" height="58" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5"/>
              <circle cx="10" cy="14" r="4" fill="#ef4444"><animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite"/></circle>
              <text x="20" y="16" fill="#ef4444" fontSize="8.5" fontWeight="800">DANGER ZONE: TOXIC Cl₂ LEAK</text>
              <text x="8" y="29" fill={t.hudText} fontSize="8" fontWeight="700">SOURCE: 880 PPM — LETHAL THRESHOLD</text>
              <text x="8" y="40" fill="#fbbf24" fontSize="7" fontWeight="600">PLUME SPREAD: 14.2m/s NE DIRECTION</text>
              <text x="8" y="51" fill="#f97316" fontSize="6.5" fontWeight="600">EXPLOSIVE ATMOSPHERE · NO IGNITION SOURCES</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SAFE PATHWAYS ── */}
        {showP && (
          <g>
            {/* Escape vector arrow → safe room */}
            <line x1="420" y1="265" x2="573" y2="265" stroke="#10b981" strokeWidth="3" strokeDasharray="8 3">
              <animate attributeName="strokeDashoffset" values="0;22" dur="0.9s" repeatCount="indefinite"/>
            </line>
            <polygon points="571,259 575,265 571,271" fill="#10b981"/>
            {/* Safe room pulsing glow */}
            <rect x="573" y="233" width="116" height="129" rx="7" fill="none" stroke="#10b981" strokeWidth="2.5">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </rect>
            {/* Catwalk clear corridor */}
            <rect x="102" y="130" width="428" height="8" rx="3" fill="#10b98115" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.7"/>
            {/* Safe callout */}
            <g transform="translate(418,235)">
              <rect x="0" y="0" width="148" height="46" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2"/>
              <text x="6" y="13" fill="#10b981" fontSize="7.5" fontWeight="800">SAFE EGRESS VECTOR</text>
              <text x="6" y="25" fill={t.hudText} fontSize="7" fontWeight="700">→ POSITIVE PRESSURE SAFE PT</text>
              <text x="6" y="36" fill={t.hudText} fontSize="7" fontWeight="600">AIR SEALED · BREATHABLE</text>
              <text x="6" y="45" fill="#10b981" fontSize="6.5" fontWeight="600">V-405 SECURED INSIDE ✓</text>
            </g>
          </g>
        )}

        {/* ── OVERLAY: SURVIVORS ── */}
        {showS && shown.map(v => {
          const [cx, cy] = POSITIONS[v.id] ?? [300, 200];
          return <SurvivorMarker key={v.id} cx={cx} cy={cy} victim={v} showVitals={true} hudBg={t.hudBg} hudText={t.hudText}/>;
        })}
        {!showS && shown.map(v => {
          const dot = STATUS_STYLE[v.status]?.dot ?? '#10b981';
          const [cx, cy] = POSITIONS[v.id] ?? [300, 200];
          return (
            <g key={v.id}>
              <circle cx={cx} cy={cy} r={6} fill={`${dot}25`} stroke={dot} strokeWidth={1.2}>
                <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx={cx} cy={cy} r={3} fill={dot}/>
              <text x={cx+7} y={cy+3} fill={dot} fontSize="6" fontFamily="monospace" fontWeight="700">{v.id}</text>
            </g>
          );
        })}

        <text x="22" y="452" fill={isDark?'rgba(167,243,208,0.35)':'rgba(4,120,87,0.35)'} fontSize="7">
          CHEMICAL ARRAY · FLIR BOSON 640 · ACOUSTIC CNN · LIVOX LIDAR · YOLOv10-SAR · SIH26177 · TEAM SWARMOPS
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════════════════ */
const HUD_MAP = [UrbanFireHUD, FlashFloodHUD, EarthquakeHUD, RatHoleMiningHUD, IndustrialHazmatHUD];

export default function Dashboard({ dark }) {
  const outlet = useOutletContext();
  const isDark = dark ?? outlet?.dark ?? true;

  const [activeScenario, setActiveScenario] = useState(0);
  const [filter, setFilter] = useState('ALL');
  const [overlayMode, setOverlayMode] = useState('ALL');
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(true);
  const termRef = useRef(null);
  const timerRef = useRef(null);
  const logIdxRef = useRef(0);

  const victims = VICTIMS_BY_SCENARIO[activeScenario];
  const telemetry = TELEMETRY_BY_SCENARIO[activeScenario];
  const meta = SCENARIO_META[activeScenario];
  const ActiveHUD = HUD_MAP[activeScenario];

  /* ── Telemetry stream ── */
  useEffect(() => {
    logIdxRef.current = 0;
    setLogs([]);
  }, [activeScenario]);

  useEffect(() => {
    if (!running) { clearTimeout(timerRef.current); return; }
    const advance = () => {
      const idx = logIdxRef.current;
      logIdxRef.current = idx + 1;
      setLogs(prev => [...prev.slice(-22), telemetry[idx % telemetry.length]]);
      timerRef.current = setTimeout(advance, 850 + Math.random() * 400);
    };
    timerRef.current = setTimeout(advance, 200);
    return () => clearTimeout(timerRef.current);
  }, [running, activeScenario, telemetry]);

  useEffect(() => {
    if (running && termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [logs, running]);

  useEffect(() => { setFilter('ALL'); setOverlayMode('ALL'); }, [activeScenario]);

  const filtered = filter === 'ALL' ? victims : victims.filter(v => v.status === filter);
  const criticalCount = victims.filter(v => v.status === 'CRITICAL').length;
  const dangerCount   = victims.filter(v => v.status === 'IN DANGER').length;
  const o2Count       = victims.filter(v => v.o2).length;

  const cardBase = isDark
    ? 'rounded-xl border border-orange-900/30 bg-brand-850/50'
    : 'rounded-xl border bg-white/80';
  const cardBorderStyle = isDark ? {} : { borderColor: 'rgba(180,83,9,0.18)' };

  return (
    <div className="page-wrapper">
      <div className="container-xl py-8">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="section-tag">Command Center</div>
            <h1 className="display-heading text-3xl md:text-4xl">Interactive Mission HUD</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={`${cardBase} flex items-center gap-2 px-3 py-2`} style={cardBorderStyle}>
              <Wifi size={13} className="text-green-400" />
              <span className="text-xs font-mono text-green-400">MESH ACTIVE</span>
            </div>
            <div className={`${cardBase} flex items-center gap-2 px-3 py-2`} style={cardBorderStyle}>
              <Activity size={13} className="text-orange-400" />
              <span className="text-xs font-mono text-orange-400">{meta.droneCount} / {meta.droneCount} DRONES</span>
            </div>
          </div>
        </div>

        {/* ── Scenario Tabs ── */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {SCENARIO_META.map((s, i) => {
            const SIcon = s.icon;
            return (
              <button
                key={s.id}
                id={`dashboard-tab-${s.id}`}
                onClick={() => setActiveScenario(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: activeScenario === i ? s.color : (isDark ? 'rgba(249,115,22,0.2)' : 'rgba(180,83,9,0.2)'),
                  background:  activeScenario === i ? `${s.color}18` : 'transparent',
                  color:       activeScenario === i ? s.color : (isDark ? 'rgba(253,186,116,0.6)' : 'rgba(120,53,15,0.7)'),
                }}
              >
                <SIcon size={14} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* ── Main 2-panel layout ── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-5">

          {/* ── Left: HUD Map + Terminal ── */}
          <div className="space-y-4">

            {/* HUD card */}
            <div className={`${cardBase} p-4`} style={cardBorderStyle}>
              {/* HUD header row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-orange-400" />
                  <span className="text-xs font-mono text-orange-400">
                    {meta.label.toUpperCase()} · MISSION HUD
                  </span>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  {[['#ef4444','CRITICAL'],['#f59e0b','IN DANGER'],['#10b981','SAFE'],['#f97316','DRONE']].map(([col,lbl])=>(
                    <span key={lbl} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: col }} />
                      <span style={{ color: isDark ? 'rgba(253,186,116,0.55)' : 'rgba(120,53,15,0.55)' }}>{lbl}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ── OVERLAY MODE SWITCHER ── */}
              <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b" style={{ borderColor: isDark ? 'rgba(249,115,22,0.12)' : 'rgba(180,83,9,0.12)' }}>
                {OVERLAY_MODES.map(om => {
                  const OIcon = om.icon;
                  const active = overlayMode === om.key;
                  const accent = meta.color;
                  return (
                    <button
                      key={om.key}
                      id={`overlay-${om.key.toLowerCase()}`}
                      onClick={() => setOverlayMode(om.key)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor: active ? accent : (isDark ? 'rgba(249,115,22,0.2)' : 'rgba(180,83,9,0.2)'),
                        background:  active ? `${accent}18` : 'transparent',
                        color:       active ? accent : (isDark ? 'rgba(253,186,116,0.55)' : 'rgba(120,53,15,0.6)'),
                      }}
                    >
                      <OIcon size={11} />
                      {om.label}
                    </button>
                  );
                })}
              </div>

              {/* Active overlay description */}
              <p className="text-[10px] font-mono mb-3" style={{ color: isDark ? 'rgba(253,186,116,0.4)' : 'rgba(120,53,15,0.45)' }}>
                {overlayMode === 'ALL'       && 'Showing: Survivor vitals · Danger zones · Safe pathways & refuge points'}
                {overlayMode === 'SURVIVORS' && 'Showing: Survivor & victim markers with SpO₂, HR, and O₂ delivery status'}
                {overlayMode === 'DANGER'    && 'Showing: Hazard origin zones, danger perimeters & active threat callouts'}
                {overlayMode === 'SAFE'      && 'Showing: Safe egress vectors, refuge chambers & evacuation corridors'}
              </p>

              <ActiveHUD isDark={isDark} victims={victims} filter={filter} overlayMode={overlayMode} />
            </div>

            {/* Terminal */}
            <div className="terminal">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] ml-2" style={{ color: 'rgba(249,115,22,0.7)' }}>
                  ROS 2 TELEMETRY — {meta.label.toUpperCase()}
                </span>
                <button
                  id="terminal-pause-resume"
                  onClick={() => setRunning(r => !r)}
                  className="ml-auto text-[10px] font-mono px-2.5 py-0.5 rounded border transition-colors"
                  style={{
                    borderColor: running ? 'rgba(249,115,22,0.4)' : 'rgba(16,185,129,0.5)',
                    color:       running ? 'rgba(249,115,22,0.8)' : '#10b981',
                  }}
                >
                  {running ? '⏸ PAUSE' : '▶ RESUME'}
                </button>
              </div>
              <div ref={termRef} className="p-3 h-44 overflow-y-auto space-y-1">
                {logs.map((l, i) => (
                  <p key={i} className="text-[11px] leading-relaxed" style={{ color: l.color }}>{l.text}</p>
                ))}
                {running && <span className="inline-block w-2 h-3.5 bg-orange-500 animate-pulse" />}
                {!running && <p className="text-[10px] font-mono" style={{ color: 'rgba(249,115,22,0.4)' }}>— FEED PAUSED —</p>}
              </div>
            </div>
          </div>

          {/* ── Right: Triage Queue ── */}
          <div className="space-y-4">

            {/* Triage filters */}
            <div className="grid grid-cols-2 gap-2">
              {TRIAGE_FILTERS.map(f => (
                <button
                  key={f.key}
                  id={`triage-filter-${f.key.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setFilter(f.key)}
                  className="py-2.5 rounded-lg text-[10px] font-mono font-bold border transition-all duration-200"
                  style={{
                    borderColor: filter === f.key ? f.color : (isDark ? 'rgba(249,115,22,0.2)' : 'rgba(180,83,9,0.2)'),
                    background:  filter === f.key ? `${f.color}18` : 'transparent',
                    color:       filter === f.key ? f.color : (isDark ? 'rgba(253,186,116,0.5)' : 'rgba(120,53,15,0.55)'),
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="text-[10px] font-mono px-1" style={{ color: isDark ? 'rgba(253,186,116,0.4)' : 'rgba(120,53,15,0.45)' }}>
              {filtered.length} victim{filtered.length !== 1 ? 's' : ''} shown · {meta.label}
            </div>

            {/* Victim cards */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map(v => {
                const st = STATUS_STYLE[v.status];
                return (
                  <div key={v.id} className={`rounded-xl border p-4 ${st.bg} ${st.border}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-mono font-bold" style={{ color: isDark ? 'rgba(253,186,116,0.8)' : 'rgba(120,53,15,0.8)' }}>{v.id}</p>
                        <p className="text-sm font-semibold" style={{ color: isDark ? '#fff7ed' : '#1c0800' }}>{v.name}</p>
                      </div>
                      <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border ${st.text} ${st.border} ${st.bg}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono mb-2" style={{ color: isDark ? 'rgba(253,186,116,0.5)' : 'rgba(120,53,15,0.55)' }}>{v.loc}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-[11px] font-mono font-bold ${st.text}`}>SpO₂: {v.spo2}% · HR: {v.hr}</span>
                        {v.o2 && <span className="block text-[10px] font-mono text-green-400 mt-0.5">✓ 1kg O₂ Cylinder Delivered</span>}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg border transition-colors"
                          style={{ borderColor: isDark ? 'rgba(249,115,22,0.3)' : 'rgba(180,83,9,0.3)', color: isDark ? 'rgba(249,115,22,0.6)' : 'rgba(120,53,15,0.6)' }}>
                          <Megaphone size={11} />
                        </button>
                        <button className="p-1.5 rounded-lg border transition-colors"
                          style={{ borderColor: isDark ? 'rgba(249,115,22,0.3)' : 'rgba(180,83,9,0.3)', color: isDark ? 'rgba(249,115,22,0.6)' : 'rgba(120,53,15,0.6)' }}>
                          <Navigation size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label:'CRITICAL', count:criticalCount, color:'#ef4444' },
                { label:'IN DANGER', count:dangerCount,  color:'#f59e0b' },
                { label:'O₂ SENT',  count:o2Count,      color:'#10b981' },
              ].map(s => (
                <div key={s.label} className={`${cardBase} p-3 text-center`} style={cardBorderStyle}>
                  <p className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.count}</p>
                  <p className="text-[9px] font-mono" style={{ color: isDark ? 'rgba(253,186,116,0.4)' : 'rgba(120,53,15,0.45)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Scenario info */}
            <div className="rounded-xl border p-3" style={{
              borderColor: isDark ? `${meta.color}35` : `${meta.color}40`,
              background:  isDark ? `${meta.color}0d` : `${meta.color}08`,
            }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: meta.color }}>Active Scenario</p>
              <p className="text-xs font-semibold mb-0.5" style={{ color: meta.color }}>{meta.label}</p>
              <p className="text-[10px] font-mono" style={{ color: isDark ? 'rgba(253,186,116,0.5)' : 'rgba(120,53,15,0.55)' }}>
                {meta.droneCount} Drones Active · SIH26177 · Team SwarmOps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
