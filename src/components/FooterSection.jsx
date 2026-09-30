import { ExternalLink, Github, Shield, Cpu, Radio, BookOpen, FileText, Zap } from 'lucide-react';
import { CITATIONS } from '../data/constants';

export default function FooterSection({ dark }) {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden dark:bg-slate-950 light:bg-white border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200"
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* Background hex */}
      <div className="absolute inset-0 hex-bg opacity-20 dark:opacity-20 light:opacity-10" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── Grid top ── */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">

          {/* Column 1 — Branding */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex items-center justify-center w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-cyan-500/20 border border-cyan-500/40" />
                <Zap size={18} className="relative text-cyan-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black tracking-tight dark:text-white light:text-slate-900">
                  Drishti-<span className="text-cyan-400">Swarm Net</span>
                </span>
                <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase mt-0.5">
                  Autonomous Edge-AI SAR System
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-500 leading-relaxed mb-5 max-w-xs">
              Zero-cloud dependency autonomous drone swarm for multi-modal search and rescue
              in GPS-denied disaster zones. Built on Qualcomm Flight RB5 5G Platform.
            </p>

            {/* Badges */}
            <div className="space-y-2">
              {[
                { icon: Shield, text: 'Problem Statement ID: SIH26177', color: 'text-cyan-400' },
                { icon: Cpu,    text: 'Lead Partner: Qualcomm Inc.',    color: 'text-purple-400' },
                { icon: Radio,  text: 'Team SwarmOps | SIH 2026',      color: 'text-emerald-400' },
              ].map(badge => {
                const BadgeIcon = badge.icon;
                return (
                  <div key={badge.text} className="flex items-center gap-2">
                    <BadgeIcon size={11} className={badge.color} />
                    <span className={`text-[10px] font-mono ${badge.color}`}>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Hardware Stack */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Cpu size={12} className="text-cyan-400" />
              <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                Core Hardware Stack
              </span>
            </div>
            <div className="space-y-2">
              {[
                'Qualcomm Flight RB5 5G Platform (QRB5165)',
                'Hexagon 698 NPU — 15 TOPS INT8 Compute',
                'FLIR Boson 640 LWIR Thermal Camera',
                'Livox Mid-360 3D LiDAR (360° FOV)',
                '77 GHz FMCW Micro-Doppler Radar',
                'Microhard pDDL 900 MHz Ad-Hoc Mesh',
                '4-Mic Beamforming Circular Array',
                '1kg Mini O₂ Cylinder Servo Payload',
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-cyan-500/60 flex-shrink-0" />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 light:text-slate-500">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — Software Stack */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <FileText size={12} className="text-amber-400" />
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                Software & AI Stack
              </span>
            </div>
            <div className="space-y-2">
              {[
                'ROS 2 Humble Hawksbill + Micro-ROS',
                'FAST-LIO2 Direct LiDAR-Inertial Odometry',
                'Qualcomm AI Hub + QNN SDK (DLC)',
                'YOLOv10-SAR INT8 @ 30+ FPS',
                'Thermal-Blob CNN (35–38°C body heat)',
                'Micro-Doppler Vital Sign Classifier',
                'Acoustic Distress Spectrogram CNN',
                'OctoMap + A* Hazard-Weighted Routing',
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500/60 flex-shrink-0" />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 light:text-slate-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Research Citations ── */}
        <div className="border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 pt-10 mb-10">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={13} className="text-emerald-400" />
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Section 08 — Research Citations & Engineering Foundations
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CITATIONS.map((cite, i) => (
              <a
                key={i}
                href={cite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 dark:bg-slate-900/40 light:bg-slate-50 hover:border-cyan-500/30 hover:bg-cyan-500/3 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold dark:text-slate-300 light:text-slate-700 group-hover:text-cyan-400 transition-colors leading-snug flex-1">
                    {cite.title}
                  </span>
                  <ExternalLink size={10} className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <span className="text-[9px] font-mono text-slate-500 leading-snug">{cite.source}</span>
                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">{cite.year}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Disclaimer + Bottom bar ── */}
        <div className="border-t border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 pt-8">
          {/* Disclaimer */}
          <div className="mb-6 p-4 rounded-xl border border-slate-800/40 dark:border-slate-800/40 light:border-slate-200 dark:bg-slate-900/30 light:bg-slate-50">
            <p className="text-[9px] font-mono text-slate-600 dark:text-slate-600 light:text-slate-500 leading-relaxed">
              <span className="text-slate-500 font-semibold">SIH 2026 SUBMISSION DISCLAIMER:</span>{' '}
              This is a proof-of-concept prototype submission for Smart India Hackathon 2026, Problem Statement ID SIH26177,
              sponsored by Qualcomm Inc. All hardware specifications, AI model architectures, and performance figures are
              based on published datasheets, academic literature, and manufacturer documentation. The Command Center HUD
              displays simulated telemetry for demonstration purposes. Real deployment requires DGCA regulatory approval
              under CAR Part XII and field validation by qualified NDRF/SDRF operators.{' '}
              <span className="text-slate-500">All rights reserved — Team SwarmOps © 2026.</span>
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-[9px] font-mono text-slate-600 dark:text-slate-600 light:text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                SIH26177
              </span>
              <span>•</span>
              <span>Team SwarmOps</span>
              <span>•</span>
              <span>Qualcomm Inc. — Lead Partner</span>
              <span>•</span>
              <span>Smart India Hackathon 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[8px] font-mono font-semibold text-emerald-400 tracking-widest uppercase">
                  Zero Cloud Dependency | 100% Offline Edge Autonomy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
