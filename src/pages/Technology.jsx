import { useState } from 'react';
import { Cpu, Camera, Radio, Wifi, Mic, ChevronRight } from 'lucide-react';

/* ── Hardware Architecture Block Diagram ── */
function ArchDiagram() {
  const [hover, setHover] = useState(null);

  const blocks = [
    { id: 'rb5',   x: 310, y: 160, w: 200, h: 80,  label: 'Qualcomm Flight RB5', sub: 'QRB5165 SoC', color: '#f97316', light: '#fff3e0' },
    { id: 'npu',   x: 120, y: 60,  w: 160, h: 60,  label: 'Hexagon 698 NPU',    sub: '15 TOPS INT8',  color: '#ea580c', light: '#fff3e0' },
    { id: 'cpu',   x: 300, y: 60,  w: 140, h: 60,  label: 'Kryo 585 CPU',       sub: '8-core',       color: '#ea580c', light: '#fff3e0' },
    { id: 'gpu',   x: 455, y: 60,  w: 140, h: 60,  label: 'Adreno 650 GPU',     sub: 'Vision Proc.',  color: '#ea580c', light: '#fff3e0' },
    { id: 'flir',  x: 60,  y: 300, w: 140, h: 60,  label: 'FLIR Boson 640',     sub: 'LWIR Thermal',  color: '#d97706', light: '#fff3e0' },
    { id: 'lidar', x: 215, y: 300, w: 140, h: 60,  label: 'Livox Mid-360',      sub: '3D LiDAR',      color: '#d97706', light: '#fff3e0' },
    { id: 'radar', x: 370, y: 300, w: 140, h: 60,  label: '77GHz Radar',        sub: 'FMCW Doppler',  color: '#d97706', light: '#fff3e0' },
    { id: 'cam',   x: 525, y: 300, w: 140, h: 60,  label: 'Sony IMX577',        sub: '4K RGB Cam',    color: '#d97706', light: '#fff3e0' },
    { id: 'mic',   x: 680, y: 300, w: 140, h: 60,  label: '4-Mic Array',        sub: 'Beamforming',   color: '#d97706', light: '#fff3e0' },
    { id: 'mesh',  x: 200, y: 420, w: 160, h: 60,  label: 'Microhard pDDL',     sub: '900 MHz Mesh',  color: '#b45309', light: '#fff3e0' },
    { id: 'ros',   x: 430, y: 420, w: 160, h: 60,  label: 'ROS 2 Humble',       sub: '+ Micro-ROS',   color: '#b45309', light: '#fff3e0' },
    { id: 'algo',  x: 310, y: 520, w: 200, h: 60,  label: 'FAST-LIO2 SLAM',     sub: '+ YOLOv10-SAR', color: '#92400e', light: '#fff3e0' },
  ];

  const edges = [
    ['rb5','npu'],['rb5','cpu'],['rb5','gpu'],
    ['rb5','flir'],['rb5','lidar'],['rb5','radar'],['rb5','cam'],['rb5','mic'],
    ['rb5','mesh'],['rb5','ros'],['ros','algo'],
  ];

  const getCenter = id => {
    const b = blocks.find(b => b.id === id);
    return b ? [b.x + b.w / 2, b.y + b.h / 2] : [0, 0];
  };

  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 870 620" className="w-full min-w-[640px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(249,115,22,0.5)" />
          </marker>
          <filter id="bGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Edges */}
        {edges.map(([a, b]) => {
          const [x1, y1] = getCenter(a);
          const [x2, y2] = getCenter(b);
          const active = hover === a || hover === b;
          return (
            <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={active ? 'rgba(249,115,22,0.7)' : 'rgba(249,115,22,0.2)'}
              strokeWidth={active ? 1.5 : 1}
              markerEnd="url(#arrow)"
              strokeDasharray={active ? 'none' : '4 3'}
              style={{ transition: 'all 0.2s' }}
            />
          );
        })}

        {/* Blocks */}
        {blocks.map(b => (
          <g key={b.id}
            onMouseEnter={() => setHover(b.id)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={b.x} y={b.y} width={b.w} height={b.h} rx={10}
              fill={hover === b.id ? `${b.color}22` : 'var(--bg-card)'}
              stroke={hover === b.id ? b.color : 'var(--border-hover)'}
              strokeWidth={hover === b.id ? 2 : 1}
              filter={hover === b.id ? 'url(#bGlow)' : 'none'}
              style={{ transition: 'all 0.2s' }}
            />
            <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 6}
              textAnchor="middle" fill={hover === b.id ? b.color : 'var(--text-1)'}
              fontSize="11" fontWeight="600" style={{ transition: 'fill 0.2s' }}>
              {b.label}
            </text>
            <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 12}
              textAnchor="middle" fill="var(--text-muted)"
              fontSize="9">
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── AI Pipeline flowchart ── */
function AIPipeline() {
  const steps = [
    { label: 'RAW SENSORS', sub: 'FLIR · LiDAR · Radar · Cam · Mic', color: '#b45309' },
    { label: 'QNN SDK / DLC', sub: 'INT8 quantized inference', color: '#d97706' },
    { label: 'HEXAGON NPU', sub: '15 TOPS, < 15W', color: '#f97316' },
    { label: 'FAST-LIO2', sub: '3D map + odometry', color: '#ea580c' },
    { label: 'YOLOv10-SAR', sub: 'Victim detection @ 31 FPS', color: '#f97316' },
    { label: 'TRIAGE SCORE', sub: 'Priority ranking → O₂ drop', color: '#fbbf24' },
  ];
  return (
    <div className="flex flex-col md:flex-row items-center gap-0">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col items-center p-4 rounded-2xl border text-center min-w-[130px]"
            style={{ background: `${s.color}0d`, borderColor: `${s.color}40` }}>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: s.color }}>{s.label}</div>
            <div className="text-[10px] text-orange-200/50">{s.sub}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center text-orange-500/40 mx-2 rotate-90 md:rotate-0">
              <ChevronRight size={20} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const SENSORS = [
  {
    icon: Camera, label: 'FLIR Boson 640', role: 'Thermal Vision',
    specs: ['640×512 LWIR', '35–38 °C body heat detection', '30 FPS radiometric'],
    color: '#f97316',
  },
  {
    icon: Radio, label: 'Livox Mid-360', role: '3D LiDAR',
    specs: ['360° FoV', '0.05° angular res.', 'FAST-LIO2 SLAM input'],
    color: '#ea580c',
  },
  {
    icon: Wifi, label: '77 GHz FMCW', role: 'Micro-Doppler Radar',
    specs: ['Vital sign detection', 'Through-wall sensing', 'Motion classification'],
    color: '#d97706',
  },
  {
    icon: Camera, label: 'Sony IMX577', role: 'RGB Camera',
    specs: ['12MP 4K', 'Spectra 480 ISP', 'YOLOv10 input'],
    color: '#b45309',
  },
  {
    icon: Mic, label: '4-Mic Array', role: 'Acoustic Sensing',
    specs: ['Beamforming', 'Distress cry CNN', '120° coverage'],
    color: '#92400e',
  },
];

export default function Technology() {
  return (
    <div className="page-wrapper">
      {/* Orbs */}
      <div className="warm-orb w-[500px] h-[500px] bg-orange-600/8 -top-32 right-0" />

      <div className="container-xl py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto justify-center">Hardware & AI Stack</div>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            Built on <span className="brand-text">Qualcomm Flight RB5</span>
          </h1>
          <p className="text-orange-200/50 max-w-2xl mx-auto">
            The most capable commercial drone compute platform — heterogeneous CPU + GPU + NPU running
            full autonomy at the edge with zero cloud dependency.
          </p>
        </div>

        {/* Hardware image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative rounded-3xl overflow-hidden h-72">
            <img src="/hardware.jpg" alt="Qualcomm RB5 hardware" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-transparent to-transparent" />
          </div>
          <div>
            <div className="section-tag">Core Platform</div>
            <h2 className="display-heading text-2xl md:text-3xl mb-4">
              QRB5165 SoC — 5nm Process
            </h2>
            <div className="space-y-3 mb-6">
              {[
                ['Hexagon 698 Tensor NPU', '15 TOPS INT8 AI Inference'],
                ['Kryo 585 CPU', 'Octa-core, 2.84 GHz'],
                ['Adreno 650 GPU', 'Computer Vision & Rendering'],
                ['Spectra 480 ISP', 'Concurrent 4K + LWIR feeds'],
                ['Qualcomm AI Hub', 'DLC INT8 model deployment'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-3 p-3 rounded-xl border border-orange-800/25 bg-brand-850/50">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-orange-200">{k}</span>
                    <span className="text-sm text-orange-200/50 ml-2">— {v}</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="badge-brand">15 TOPS</span>{' '}
            <span className="badge-amber">&lt; 15W Budget</span>{' '}
            <span className="badge-red">5G Platform</span>
          </div>
        </div>

        {/* Architecture Block Diagram */}
        <div className="mb-20">
          <div className="section-tag">System Architecture</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-8">
            Hardware Block Diagram
          </h2>
          <div className="card-glow p-6 md:p-8">
            <ArchDiagram />
            <p className="text-xs text-center text-orange-200/30 mt-4 font-mono">Hover over blocks to highlight connections</p>
          </div>
        </div>

        {/* Sensors */}
        <div className="mb-20">
          <div className="section-tag">Sensor Array</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-8">
            5-Modality Sensor Fusion
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SENSORS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="card group text-center"
                  style={{ borderColor: `${s.color}30`, background: `${s.color}07` }}>
                  <div className="p-3 rounded-xl mx-auto w-fit mb-3" style={{ background: `${s.color}15`, border: `1px solid ${s.color}40` }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <p className="text-xs font-mono font-bold mb-0.5" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-[11px] text-orange-200/50 mb-3">{s.role}</p>
                  <ul className="space-y-1">
                    {s.specs.map((sp, j) => (
                      <li key={j} className="text-[10px] text-orange-200/40 font-mono">{sp}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Pipeline */}
        <div>
          <div className="section-tag">AI Processing Pipeline</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-8">
            From Sensor to Decision in &lt; 33ms
          </h2>
          <div className="card-glow p-6 md:p-10 overflow-x-auto">
            <AIPipeline />
          </div>
        </div>
      </div>
    </div>
  );
}
