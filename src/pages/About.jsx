import { ExternalLink, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

const RISKS = [
  { challenge: 'GPS Unavailability', risk: 'HIGH', mitigation: 'FAST-LIO2 direct LiDAR-inertial odometry — 100% GPS-free localization tested in indoor environments.', status: 'SOLVED' },
  { challenge: 'Battery Life Limitation', risk: 'MEDIUM', mitigation: '28–32 min endurance on 6S 8000mAh LiPo; staged sorties with hot-swap charging at forward base.', status: 'MANAGED' },
  { challenge: 'Obstacle Avoidance in Rubble', risk: 'HIGH', mitigation: 'OctoMap + A* hazard-weighted planner re-plans at 10Hz; 77GHz radar provides backup proximity sensing.', status: 'SOLVED' },
  { challenge: 'AI Model Performance Degradation', risk: 'MEDIUM', mitigation: 'INT8 quantized DLC models validated on Hexagon NPU; no floating-point runtime dependency.', status: 'SOLVED' },
  { challenge: 'Mesh Network Fragmentation', risk: 'MEDIUM', mitigation: 'Microhard pDDL self-healing; SQLite ring-buffer stores 6h of telemetry with zero packet loss.', status: 'MANAGED' },
  { challenge: 'Thermal False Positives', risk: 'LOW', mitigation: 'Multi-modal cross-validation: thermal + visual + micro-Doppler consensus required before triage flag.', status: 'SOLVED' },
  { challenge: 'DGCA Regulatory Compliance', risk: 'HIGH', mitigation: 'Architecture pre-mapped to CAR Part XII; geo-fence enforcement and fail-safe return-to-launch.', status: 'MANAGED' },
  { challenge: 'Dust/Smoke Sensor Interference', risk: 'MEDIUM', mitigation: 'LWIR thermal immune to optical obscurant; LiDAR operates through smoke at reduced range.', status: 'SOLVED' },
];

const CITATIONS = [
  {
    title: 'FAST-LIO2: Fast Direct LiDAR-Inertial Odometry',
    source: 'IEEE Trans. Robotics, Xu et al. 2022',
    url: 'https://ieeexplore.ieee.org/document/9673966',
  },
  {
    title: 'YOLOv10: Real-Time End-to-End Object Detection',
    source: 'arXiv:2405.14458, Wang et al. 2024',
    url: 'https://arxiv.org/abs/2405.14458',
  },
  {
    title: 'Qualcomm Flight RB5 5G Platform Developer Guide',
    source: 'Qualcomm Developer Network, 2023',
    url: 'https://developer.qualcomm.com/hardware/flight-rb5-5g',
  },
  {
    title: 'FLIR Boson 640 LWIR Thermal Camera Module',
    source: 'Teledyne FLIR OEM Documentation, 2022',
    url: 'https://www.flir.com/products/boson/',
  },
  {
    title: 'Human Detection via Micro-Doppler Signatures & Deep CNNs',
    source: 'IEEE Geosci. Remote Sens. Lett., Kim & Moon 2016',
    url: 'https://doi.org/10.1109/LGRS.2015.2491329',
  },
  {
    title: 'ROS 2 for Mission-Critical Robotics — Real-Time Benchmarking',
    source: 'ICRA 2021 Workshop / IEEE',
    url: 'https://arxiv.org/abs/2109.09755',
  },
  {
    title: 'Livox Mid-360 LiDAR — Technical Specifications & Downloads',
    source: 'DJI Innovations / Livox Technology, 2023',
    url: 'https://www.livoxtech.com/mid-360',
  },
  {
    title: 'Qualcomm AI Hub — DLC Model Quantization Guide',
    source: 'Qualcomm Developer Docs, 2024',
    url: 'https://aihub.qualcomm.com',
  },
  {
    title: 'OctoMap: An Efficient Probabilistic 3D Mapping Framework',
    source: 'Autonomous Robots, Hornung et al. 2013',
    url: 'https://doi.org/10.1007/s10514-012-9321-0',
  },
];

const RISK_COLOR = {
  HIGH:   { text: 'text-red-400',   bg: 'bg-red-500/10',   border: 'border-red-500/30' },
  MEDIUM: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  LOW:    { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
};

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="warm-orb w-[400px] h-[400px] bg-amber-600/6 top-0 right-0" />

      <div className="container-xl py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto justify-center">Team SwarmOps</div>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            About the <span className="brand-text">Project</span>
          </h1>
          <p className="text-orange-200/50 max-w-xl mx-auto">
            SIH 2026 · Problem Statement SIH26177 · Sponsored by Qualcomm Inc.
          </p>
        </div>

        {/* Project overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Problem Statement', value: 'SIH26177', sub: 'Qualcomm Inc.' },
            { label: 'Team', value: 'SwarmOps', sub: 'Smart India Hackathon 2026' },
            { label: 'Core Tech', value: 'Qualcomm RB5', sub: '15 TOPS Edge AI' },
          ].map((item, i) => (
            <div key={i} className="card text-center">
              <p className="text-xs font-mono text-amber-400/60 mb-1">{item.label}</p>
              <p className="text-2xl font-bold brand-text">{item.value}</p>
              <p className="text-sm text-orange-200/40">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* SWaP-C */}
        <div className="mb-14">
          <div className="section-tag">SWaP-C Analysis</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-6">Size, Weight, Power & Cost</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Payload', value: '~1.2 kg', sub: 'Sensors + 1kg O₂ Mini Cylinder', color: '#f97316' },
              { label: 'Flight Time', value: '28–32 min', sub: '6S 8000mAh LiPo', color: '#d97706' },
              { label: 'AI Power', value: '< 15W', sub: 'Hexagon NPU INT8 DLC', color: '#f59e0b' },
              { label: 'Max Takeoff', value: '3.5 kg', sub: 'IP54 Carbon Fiber Frame', color: '#ea580c' },
            ].map((s, i) => (
              <div key={i} className="card text-center" style={{ borderColor: `${s.color}30`, background: `${s.color}07` }}>
                <p className="text-2xl md:text-3xl font-bold font-mono mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs font-semibold text-orange-200/60 mb-1">{s.label}</p>
                <p className="text-[10px] text-orange-200/35 font-mono">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="mb-14">
          <div className="section-tag">Engineering Risk Mitigation</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-6">Risk Matrix</h2>
          <div className="rounded-2xl border border-orange-900/30 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_90px_4fr_90px] gap-4 px-5 py-3 bg-brand-850/80 border-b border-orange-900/30">
              {['Challenge', 'Risk', 'Mitigation Strategy', 'Status'].map(h => (
                <p key={h} className="text-[9px] font-mono font-bold uppercase tracking-widest text-orange-200/40">{h}</p>
              ))}
            </div>
            {RISKS.map((r, i) => {
              const rc = RISK_COLOR[r.risk];
              return (
                <div
                  key={i}
                  className={`grid grid-cols-[2fr_90px_4fr_90px] gap-4 px-5 py-4 hover:bg-orange-500/3 transition-colors duration-150 ${i < RISKS.length - 1 ? 'border-b border-orange-900/20' : ''}`}
                >
                  <p className="text-sm text-orange-200/70 font-medium">{r.challenge}</p>
                  <div>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border ${rc.text} ${rc.bg} ${rc.border}`}>{r.risk}</span>
                  </div>
                  <p className="text-sm text-orange-200/50 leading-relaxed">{r.mitigation}</p>
                  <div>
                    <span className={`flex items-center gap-1 text-[9px] font-mono font-bold ${r.status === 'SOLVED' ? 'text-green-400' : 'text-amber-400'}`}>
                      {r.status === 'SOLVED' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                      {r.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Citations */}
        <div>
          <div className="section-tag">Research Foundations</div>
          <h2 className="display-heading text-2xl md:text-3xl mb-6">Engineering Citations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CITATIONS.map((c, i) => (
              <a
                key={i}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl border border-orange-900/30 bg-brand-850/40 hover:border-orange-500/40 hover:bg-orange-500/4 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-orange-200/80 group-hover:text-orange-300 transition-colors leading-snug">{c.title}</p>
                  <ExternalLink size={11} className="text-orange-600/50 group-hover:text-orange-400 flex-shrink-0 mt-0.5 transition-colors" />
                </div>
                <p className="text-[10px] font-mono text-orange-200/40">{c.source}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-5 rounded-2xl border border-orange-900/30 bg-brand-850/30">
          <p className="text-[11px] font-mono text-orange-200/30 leading-relaxed text-center">
            SIH 2026 proof-of-concept submission. All hardware specs and performance figures are based on published manufacturer
            datasheets and peer-reviewed literature. Dashboard shows simulated telemetry for demonstration. Real deployment
            requires DGCA CAR Part XII approval. All rights reserved — Team SwarmOps © 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
