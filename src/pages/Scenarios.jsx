import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Flame, Droplets, Mountain, HardHat, AlertTriangle } from 'lucide-react';

/* ── Detailed 2D Isometric Building Cross-Section (Urban Fire) ── */
function UrbanFireIsometricIllustration({ isDark }) {
  const [layer, setLayer] = useState('ALL'); // 'ALL' | 'LIDAR' | 'FLIR' | 'ACOUSTIC' | 'RETICLE'

  const showLidar = layer === 'ALL' || layer === 'LIDAR';
  const showFlir = layer === 'ALL' || layer === 'FLIR';
  const showAcoustic = layer === 'ALL' || layer === 'ACOUSTIC';
  const showReticle = layer === 'ALL' || layer === 'RETICLE';

  const t = isDark ? {
    bg: '#0a0300',
    grid: 'rgba(249, 115, 22, 0.12)',
    wallLeft: 'url(#ufWallLeftDark)',
    wallRight: 'url(#ufWallRightDark)',
    wallBorder: 'rgba(249, 115, 22, 0.35)',
    pillar: '#220c02',
    pillarBorder: 'rgba(249, 115, 22, 0.4)',
    slabTop: '#160500',
    slabEdge: '#321003',
    slabBorder: 'rgba(249, 115, 22, 0.45)',
    rebar: '#ea580c',
    rubbleTop: '#4a1b05',
    rubbleSide: '#2c1003',
    rubbleDark: '#1a0801',
    rubbleBorder: 'rgba(249, 115, 22, 0.3)',
    steelBeam: '#78350f',
    hudBg: 'rgba(18, 5, 1, 0.94)',
    hudBorder: 'rgba(249, 115, 22, 0.4)',
    hudText: '#ffffff',
    hudSub: '#fed7aa',
    cardBorder: 'rgba(249, 115, 22, 0.25)',
    smoke1: 'rgba(38, 28, 23, 0.65)',
    smoke2: 'rgba(55, 41, 33, 0.55)',
  } : {
    bg: '#fffaf4',
    grid: 'rgba(180, 83, 9, 0.14)',
    wallLeft: 'url(#ufWallLeftLight)',
    wallRight: 'url(#ufWallRightLight)',
    wallBorder: 'rgba(180, 83, 9, 0.35)',
    pillar: '#faebe0',
    pillarBorder: 'rgba(180, 83, 9, 0.4)',
    slabTop: '#fbf0e4',
    slabEdge: '#e5ccb4',
    slabBorder: 'rgba(180, 83, 9, 0.45)',
    rebar: '#c2410c',
    rubbleTop: '#dfc0a3',
    rubbleSide: '#cca787',
    rubbleDark: '#b88f6c',
    rubbleBorder: 'rgba(180, 83, 9, 0.3)',
    steelBeam: '#b45309',
    hudBg: 'rgba(255, 255, 255, 0.96)',
    hudBorder: 'rgba(180, 83, 9, 0.35)',
    hudText: '#1c0800',
    hudSub: '#591d08',
    cardBorder: 'rgba(180, 83, 9, 0.25)',
    smoke1: 'rgba(70, 55, 46, 0.45)',
    smoke2: 'rgba(95, 76, 64, 0.35)',
  };

  return (
    <div className="space-y-3">
      {/* Sensor Layer Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {[
          { id: 'ALL', label: 'ALL SENSORS', color: '#f97316' },
          { id: 'LIDAR', label: 'LiDAR 3D', color: '#06b6d4' },
          { id: 'FLIR', label: 'FLIR THERMAL', color: '#ef4444' },
          { id: 'ACOUSTIC', label: 'ACOUSTIC CNN', color: '#f59e0b' },
          { id: 'RETICLE', label: 'TARGET LOCK', color: '#ef4444' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setLayer(tab.id)}
            type="button"
            className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer"
            style={{
              border: `1px solid ${layer === tab.id ? tab.color : t.cardBorder}`,
              background: layer === tab.id ? `${tab.color}25` : (isDark ? 'rgba(26,8,0,0.4)' : 'rgba(255,255,255,0.7)'),
              color: layer === tab.id ? tab.color : (isDark ? 'rgba(253,186,116,0.6)' : 'rgba(120,53,15,0.7)'),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.cardBorder, background: t.bg }}>
        <svg viewBox="0 0 680 470" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <defs>
            <linearGradient id="ufWallLeftDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#150601" />
              <stop offset="100%" stopColor="#220a02" />
            </linearGradient>
            <linearGradient id="ufWallLeftLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#faede0" />
              <stop offset="100%" stopColor="#f2ded0" />
            </linearGradient>
            <linearGradient id="ufWallRightDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c0701" />
              <stop offset="100%" stopColor="#2a0d03" />
            </linearGradient>
            <linearGradient id="ufWallRightLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5e0ce" />
              <stop offset="100%" stopColor="#ebd2be" />
            </linearGradient>
            <linearGradient id="ufFireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <radialGradient id="ufFlirHeatBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#f97316" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ufCyanLidarBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
            </linearGradient>

            <filter id="ufHeatBlur"><feGaussianBlur stdDeviation="6" /></filter>
            <filter id="ufSmokeBlur"><feGaussianBlur stdDeviation="8" /></filter>
            <filter id="ufGlow"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {/* Subsurface Grid */}
          <g opacity="0.45">
            {[140, 190, 240, 290, 340, 390, 440, 490, 540].map(x => (
              <line key={`gx-${x}`} x1={x} y1="310" x2={x - 100} y2="450" stroke={t.grid} strokeWidth="0.6" strokeDasharray="3 3" />
            ))}
            {[340, 370, 400, 430].map(y => (
              <line key={`gy-${y}`} x1="80" y1={y - 50} x2="600" y2={y + 30} stroke={t.grid} strokeWidth="0.6" strokeDasharray="3 3" />
            ))}
          </g>

          {/* Status Line */}
          <text x="24" y="24" fill={isDark ? "rgba(253,186,116,0.6)" : "rgba(120,53,15,0.7)"} fontSize="8.5" fontWeight="600">
            SECTOR 4A · 3D ISOMETRIC CAD CUTAWAY · 1:50 SCALE
          </text>
          <text x="656" y="24" textAnchor="end" fill="#10b981" fontSize="8.5" fontWeight="700">
            ● 100% OFFLINE AUTONOMY · QUALCOMM RB5
          </text>

          {/* 3D Isometric Structure */}
          <polygon points="120,360 350,450 350,464 120,374" fill={t.slabEdge} stroke={t.slabBorder} strokeWidth="0.8" />
          <polygon points="350,450 580,360 580,374 350,464" fill={t.slabEdge} stroke={t.slabBorder} strokeWidth="0.8" />
          <polygon points="350,260 120,360 350,450 580,360" fill={t.slabTop} stroke={t.slabBorder} strokeWidth="1.2" />

          {/* Back Left Wall */}
          <polygon points="120,360 120,140 350,45 350,260" fill={t.wallLeft} stroke={t.wallBorder} strokeWidth="1.2" />
          <polygon points="230,312 230,98 245,91 245,305" fill={t.pillar} stroke={t.pillarBorder} strokeWidth="0.8" />
          <polygon points="120,205 120,265 145,254 145,194" fill={isDark ? "#080200" : "#eed8c5"} stroke={t.wallBorder} strokeWidth="0.8" />

          {/* Back Right Wall (Fire / Collapse) */}
          <polygon points="350,260 350,45 580,140 580,360" fill={t.wallRight} stroke={t.wallBorder} strokeWidth="1.2" />
          <path d="M 440 180 Q 480 150 540 160 Q 560 210 500 240 Z" fill={isDark ? "#120300" : "#ded0c2"} opacity="0.65" />
          <path d="M 460 120 Q 520 90 560 110 Q 550 150 490 150 Z" fill={isDark ? "#150400" : "#d8c7b7"} opacity="0.8" />

          {/* Level 2 Slab */}
          <polygon points="120,250 120,242 350,150 400,172 400,245 300,290 120,250" fill={t.slabTop} stroke={t.slabBorder} strokeWidth="1" />
          <polygon points="120,250 300,290 300,298 120,258" fill={t.slabEdge} stroke={t.slabBorder} strokeWidth="0.8" />
          <polygon points="300,290 400,245 400,253 300,298" fill={t.slabEdge} stroke={t.slabBorder} strokeWidth="0.8" />
          <line x1="170" y1="262" x2="165" y2="267" stroke={t.rebar} strokeWidth="2" strokeLinecap="round" />
          <line x1="230" y1="275" x2="225" y2="280" stroke={t.rebar} strokeWidth="2" strokeLinecap="round" />
          <line x1="340" y1="272" x2="343" y2="278" stroke={t.rebar} strokeWidth="2" strokeLinecap="round" />

          {/* Collapsed Section */}
          <polygon points="400,172 545,280 525,345 400,245" fill={t.slabTop} stroke={t.slabBorder} strokeWidth="1.2" />
          <polygon points="400,245 525,345 525,355 400,253" fill={t.slabEdge} stroke={t.slabBorder} strokeWidth="0.8" />
          <path d="M 400 180 Q 418 174 412 195" stroke={t.rebar} strokeWidth="1.8" fill="none" />
          <path d="M 400 215 Q 420 208 414 228" stroke={t.rebar} strokeWidth="1.8" fill="none" />
          <path d="M 400 240 Q 415 248 408 260" stroke={t.rebar} strokeWidth="1.8" fill="none" />

          {/* Floor 1 Partition */}
          <polygon points="350,260 350,175 320,215 320,305" fill={t.wallLeft} stroke={t.wallBorder} strokeWidth="1" />
          <polygon points="340,265 340,215 330,230 330,280" fill={isDark ? "#080200" : "#e0cbb7"} stroke={t.wallBorder} strokeWidth="0.8" />

          {/* Roof & Steel Trusses */}
          <polygon points="120,140 120,132 350,45 385,60 280,105 120,140" fill={t.slabTop} stroke={t.slabBorder} strokeWidth="1" />
          <line x1="350" y1="45" x2="480" y2="102" stroke={t.steelBeam} strokeWidth="3" strokeLinecap="round" />
          <line x1="385" y1="60" x2="515" y2="117" stroke={t.steelBeam} strokeWidth="3" strokeLinecap="round" />
          <line x1="410" y1="71" x2="445" y2="86" stroke={t.steelBeam} strokeWidth="1.5" />
          <line x1="450" y1="89" x2="485" y2="104" stroke={t.steelBeam} strokeWidth="1.5" />

          {/* Rubble Blocks */}
          <g>
            <polygon points="440,360 455,352 470,360 455,368" fill={t.rubbleTop} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="440,360 455,368 455,378 440,370" fill={t.rubbleSide} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="455,368 470,360 470,370 455,378" fill={t.rubbleDark} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="475,375 490,367 505,375 490,383" fill={t.rubbleTop} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="475,375 490,383 490,393 475,385" fill={t.rubbleSide} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="490,383 505,375 505,385 490,393" fill={t.rubbleDark} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="410,380 422,374 434,380 422,386" fill={t.rubbleTop} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="410,380 422,386 422,394 410,388" fill={t.rubbleSide} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="422,386 434,380 434,388 422,394" fill={t.rubbleDark} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="455,395 470,387 485,395 470,403" fill={t.rubbleTop} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="455,395 470,403 470,412 455,404" fill={t.rubbleSide} stroke={t.rubbleBorder} strokeWidth="0.6" />
            <polygon points="470,403 485,395 485,404 470,412" fill={t.rubbleDark} stroke={t.rubbleBorder} strokeWidth="0.6" />
          </g>

          {/* FLIR Layer */}
          {showFlir && (
            <g>
              <ellipse cx="480" cy="165" rx="90" ry="60" fill="url(#ufFlirHeatBlob)" filter="url(#ufHeatBlur)" />
              <ellipse cx="450" cy="220" rx="60" ry="40" fill="url(#ufFlirHeatBlob)" filter="url(#ufHeatBlur)" />
              <circle cx="490" cy="130" r="45" fill={t.smoke1} filter="url(#ufSmokeBlur)" />
              <circle cx="530" cy="110" r="38" fill={t.smoke2} filter="url(#ufSmokeBlur)" />
              <circle cx="470" cy="85" r="40" fill={t.smoke1} filter="url(#ufSmokeBlur)" />
              <circle cx="520" cy="65" r="32" fill={t.smoke2} filter="url(#ufSmokeBlur)" />
              <g filter="url(#ufGlow)">
                <path d="M 450 195 Q 435 155 450 125 Q 465 155 460 195 Z" fill="url(#ufFireGrad)" opacity="0.9" />
                <path d="M 470 190 Q 460 145 475 115 Q 490 145 480 190 Z" fill="url(#ufFireGrad)" opacity="0.85" />
                <path d="M 495 200 Q 485 160 500 135 Q 515 165 505 200 Z" fill="url(#ufFireGrad)" opacity="0.9" />
                <ellipse cx="470" cy="185" rx="20" ry="8" fill="#fbbf24" opacity="0.9" />
              </g>
              <g transform="translate(485, 75)">
                <line x1="0" y1="20" x2="-25" y2="45" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="165" height="46" rx="6" fill={t.hudBg} stroke="#ef4444" strokeWidth="1" />
                <text x="8" y="14" fill="#ef4444" fontSize="8" fontWeight="700">FLIR BOSON 640 LWIR</text>
                <text x="8" y="27" fill={t.hudText} fontSize="9" fontWeight="700">HEAT CORE: 540°C</text>
                <text x="8" y="38" fill="#fbbf24" fontSize="7.5" fontWeight="600">SMOKE PENETRATION: 100%</text>
              </g>
            </g>
          )}

          {/* LiDAR Layer */}
          {showLidar && (
            <g>
              <g stroke="#06b6d4" strokeWidth="0.9" opacity="0.7">
                <line x1="120" y1="310" x2="350" y2="210" />
                <line x1="120" y1="260" x2="350" y2="160" />
                <line x1="120" y1="210" x2="350" y2="110" />
                <line x1="120" y1="160" x2="350" y2="60" />
                <line x1="180" y1="334" x2="180" y2="114" strokeDasharray="3 3" />
                <line x1="235" y1="310" x2="235" y2="90" strokeDasharray="3 3" />
                <line x1="290" y1="286" x2="290" y2="68" strokeDasharray="3 3" />
              </g>
              <g fill="#22d3ee">
                <circle cx="180" cy="284" r="1.6" />
                <circle cx="235" cy="260" r="1.6" />
                <circle cx="290" cy="236" r="1.6" />
                <circle cx="180" cy="234" r="1.6" />
                <circle cx="235" cy="210" r="1.6" />
                <circle cx="290" cy="186" r="1.6" />
              </g>
              <polygon points="315,290 190,340 280,410" fill="url(#ufCyanLidarBeam)" stroke="#06b6d4" strokeWidth="0.7" opacity="0.85" />
              <line x1="315" y1="290" x2="235" y2="375" stroke="#22d3ee" strokeWidth="1.5">
                <animate attributeName="x2" values="190;280;190" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="y2" values="340;410;340" dur="2.5s" repeatCount="indefinite" />
              </line>
              <g transform="translate(60, 85)">
                <line x1="130" y1="45" x2="165" y2="90" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="168" height="46" rx="6" fill={t.hudBg} stroke="#06b6d4" strokeWidth="1" />
                <text x="8" y="14" fill="#06b6d4" fontSize="8" fontWeight="700">LIVOX MID-360 LiDAR</text>
                <text x="8" y="27" fill={t.hudText} fontSize="9" fontWeight="700">3D SCAN: 68% COMPLETE</text>
                <text x="8" y="38" fill="#06b6d4" fontSize="7.5" fontWeight="600">FAST-LIO2 · 24,000 PTS/SEC</text>
              </g>
            </g>
          )}

          {/* Acoustic Layer */}
          {showAcoustic && (
            <g>
              <g transform="translate(440, 360)">
                <ellipse cx="0" cy="0" rx="14" ry="8" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;45;75" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="5;22;37" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="0" cy="0" rx="14" ry="8" stroke="#fbbf24" strokeWidth="1.2" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;45;75" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="5;22;37" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                </ellipse>
              </g>
              <g transform="translate(490, 270)">
                <line x1="0" y1="20" x2="-40" y2="80" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="168" height="46" rx="6" fill={t.hudBg} stroke="#f59e0b" strokeWidth="1" />
                <text x="8" y="14" fill="#f59e0b" fontSize="8" fontWeight="700">ACOUSTIC CNN BEAMFORMER</text>
                <text x="8" y="27" fill={t.hudText} fontSize="9" fontWeight="700">VOICE DETECTED</text>
                <text x="8" y="38" fill="#f59e0b" fontSize="7.5" fontWeight="600">FREQ: 320Hz · CONF: 94%</text>
              </g>
            </g>
          )}

          {/* Reticle Layer */}
          {showReticle && (
            <g>
              <g transform="translate(430, 355)">
                <ellipse cx="0" cy="5" rx="5" ry="7" fill="#ef4444" opacity="0.9" filter="url(#ufHeatBlur)" />
                <circle cx="0" cy="0" r="3" fill="#fbbf24" />
                <ellipse cx="12" cy="7" rx="5" ry="6" fill="#ef4444" opacity="0.9" filter="url(#ufHeatBlur)" />
                <circle cx="12" cy="2" r="2.8" fill="#fbbf24" />
                <ellipse cx="6" cy="14" rx="6" ry="6" fill="#ef4444" opacity="0.85" filter="url(#ufHeatBlur)" />
                <circle cx="6" cy="10" r="2.6" fill="#fbbf24" />
              </g>
              <g stroke="#ef4444" strokeWidth="2" fill="none">
                <path d="M 412 342 L 424 342 M 412 342 L 412 354" />
                <path d="M 468 342 L 456 342 M 468 342 L 468 354" />
                <path d="M 412 378 L 424 378 M 412 378 L 412 366" />
                <path d="M 468 378 L 456 378 M 468 378 L 468 366" />
                <line x1="440" y1="352" x2="440" y2="356" stroke="#ef4444" strokeWidth="1.5" />
                <line x1="440" y1="364" x2="440" y2="368" stroke="#ef4444" strokeWidth="1.5" />
                <line x1="432" y1="360" x2="436" y2="360" stroke="#ef4444" strokeWidth="1.5" />
                <line x1="444" y1="360" x2="448" y2="360" stroke="#ef4444" strokeWidth="1.5" />
              </g>
              <circle cx="440" cy="360" r="20" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.6">
                <animate attributeName="r" values="18;23;18" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <g transform="translate(365, 410)">
                <line x1="50" y1="0" x2="75" y2="-45" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="3 2" />
                <rect x="0" y="0" width="220" height="50" rx="6" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3.5" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="22" y="16" fill="#ef4444" fontSize="9" fontWeight="800">SURVIVOR FOUND: 3 PERSONS</text>
                <text x="10" y="30" fill={t.hudText} fontSize="8.5" fontWeight="700">CODE RED · ASPHYXIATION IMMINENT</text>
                <text x="10" y="42" fill="#f59e0b" fontSize="7.5" fontWeight="600">SERVO DROP ARMED: 1kg MINI O₂ CYLINDER</text>
              </g>
            </g>
          )}

          {/* Drones */}
          <g transform="translate(315, 290)">
            <ellipse cx="-16" cy="-8" rx="11" ry="4.5" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.18)" strokeDasharray="3 2" />
            <ellipse cx="16" cy="-8" rx="11" ry="4.5" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.18)" strokeDasharray="3 2" />
            <ellipse cx="-16" cy="8" rx="11" ry="4.5" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.18)" strokeDasharray="3 2" />
            <ellipse cx="16" cy="8" rx="11" ry="4.5" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.18)" strokeDasharray="3 2" />
            <line x1="-16" y1="-8" x2="16" y2="8" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-16" y1="8" x2="16" y2="-8" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="-6" y="4" width="12" height="6" rx="2" fill="#c2410c" stroke="#f97316" strokeWidth="0.7" />
            <circle cx="7" cy="7" r="1.5" fill="#f59e0b" />
            <rect x="-7" y="-6" width="14" height="12" rx="2.5" fill="#09090b" stroke="#f97316" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#10b981">
              <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="-6" r="3" fill="#06b6d4" opacity="0.9" />
          </g>
          <g transform="translate(155, 230)">
            <line x1="140" y1="30" x2="160" y2="60" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="0" y="0" width="158" height="42" rx="6" fill={t.hudBg} stroke="#f97316" strokeWidth="1" />
            <circle cx="10" cy="12" r="2.5" fill="#10b981" />
            <text x="18" y="14" fill="#f97316" fontSize="8" fontWeight="700">DRONE 1-1: SCANNING</text>
            <text x="10" y="26" fill={t.hudText} fontSize="8.5" fontWeight="700">ALT: 1.6M · FAST-LIO2</text>
            <text x="10" y="36" fill={t.hudSub} fontSize="7.5" fontWeight="600">1kg O₂ PAYLOAD READY</text>
          </g>

          <g transform="translate(470, 65)">
            <ellipse cx="-12" cy="-5" rx="8" ry="3.5" stroke="#f97316" strokeWidth="0.6" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            <ellipse cx="12" cy="-5" rx="8" ry="3.5" stroke="#f97316" strokeWidth="0.6" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            <rect x="-5" y="-4" width="10" height="8" rx="2" fill="#09090b" stroke="#f97316" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.5" fill="#22c55e" />
          </g>
          <g transform="translate(370, 40)">
            <line x1="95" y1="15" x2="100" y2="25" stroke="#f97316" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="125" height="24" rx="4" fill={t.hudBg} stroke="#f97316" strokeWidth="0.8" />
            <text x="6" y="11" fill="#f97316" fontSize="7.5" fontWeight="700">DRONE 1-2: RELAY</text>
            <text x="6" y="20" fill={t.hudSub} fontSize="7" fontWeight="600">900MHz MESH · ZERO LOSS</text>
          </g>

          <text x="24" y="458" fill={isDark ? "rgba(253,186,116,0.4)" : "rgba(120,53,15,0.5)"} fontSize="7.5">
            FAST-LIO2 ODOMETRY · YOLOv10-SAR · COMPACT 1kg MINI O₂ CYLINDER SERVO SYSTEM · SIH26177
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ── Detailed 2D Isometric Multi-Building Scene (Flash Flood) ── */
function FlashFloodIsometricIllustration({ isDark }) {
  const [layer, setLayer] = useState('ALL'); // 'ALL' | 'FLIR' | 'GPR' | 'DOPPLER' | 'YOLO' | 'RETICLE'

  const showFlir = layer === 'ALL' || layer === 'FLIR';
  const showGpr = layer === 'ALL' || layer === 'GPR';
  const showDoppler = layer === 'ALL' || layer === 'DOPPLER';
  const showYolo = layer === 'ALL' || layer === 'YOLO';
  const showReticle = layer === 'ALL' || layer === 'RETICLE';

  const t = isDark ? {
    bg: '#040d18',
    grid: 'rgba(56, 189, 248, 0.12)',
    bldgA: '#0d1f33',
    bldgB: '#13283f',
    bldgC: '#0f2338',
    bldgBorder: 'rgba(56, 189, 248, 0.35)',
    waterTop: 'rgba(7, 89, 133, 0.75)',
    waterDepth: 'url(#ffWaterDepthDark)',
    waterBorder: '#38bdf8',
    underwaterPillars: '#081726',
    hudBg: 'rgba(4, 15, 26, 0.94)',
    hudBorder: 'rgba(56, 189, 248, 0.4)',
    hudText: '#f0f9ff',
    hudSub: '#93c5fd',
    cardBorder: 'rgba(56, 189, 248, 0.25)',
  } : {
    bg: '#f0f7ff',
    grid: 'rgba(3, 105, 161, 0.12)',
    bldgA: '#e2e8f0',
    bldgB: '#cbd5e1',
    bldgC: '#dbeafe',
    bldgBorder: 'rgba(3, 105, 161, 0.35)',
    waterTop: 'rgba(186, 230, 253, 0.8)',
    waterDepth: 'url(#ffWaterDepthLight)',
    waterBorder: '#0284c7',
    underwaterPillars: '#94a3b8',
    hudBg: 'rgba(255, 255, 255, 0.96)',
    hudBorder: 'rgba(3, 105, 161, 0.35)',
    hudText: '#082f49',
    hudSub: '#0369a1',
    cardBorder: 'rgba(3, 105, 161, 0.25)',
  };

  return (
    <div className="space-y-3">
      {/* Sensor Layer Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {[
          { id: 'ALL', label: 'ALL SENSORS', color: '#3b82f6' },
          { id: 'FLIR', label: 'FLIR THERMAL', color: '#ef4444' },
          { id: 'GPR', label: 'GPR SONAR RADAR', color: '#06b6d4' },
          { id: 'DOPPLER', label: 'MICRO-DOPPLER', color: '#10b981' },
          { id: 'YOLO', label: 'YOLO & ACOUSTIC', color: '#f59e0b' },
          { id: 'RETICLE', label: 'TARGET LOCK', color: '#ef4444' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setLayer(tab.id)}
            type="button"
            className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer"
            style={{
              border: `1px solid ${layer === tab.id ? tab.color : t.cardBorder}`,
              background: layer === tab.id ? `${tab.color}25` : (isDark ? 'rgba(3,15,30,0.5)' : 'rgba(255,255,255,0.7)'),
              color: layer === tab.id ? tab.color : (isDark ? 'rgba(147,197,253,0.7)' : 'rgba(3,105,161,0.8)'),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.cardBorder, background: t.bg }}>
        <svg viewBox="0 0 720 500" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <defs>
            <linearGradient id="ffWaterDepthDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="ffWaterDepthLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="ffGprBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
            </linearGradient>
            <radialGradient id="ffHeatGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <filter id="ffBlur"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>

          {/* Subsurface Coordinate Grid */}
          <g opacity="0.35">
            {[100, 180, 260, 340, 420, 500, 580, 660].map(x => (
              <line key={`gx-${x}`} x1={x} y1="330" x2={x - 80} y2="470" stroke={t.grid} strokeWidth="0.6" strokeDasharray="3 3" />
            ))}
          </g>

          {/* Status Line */}
          <text x="24" y="24" fill={isDark ? "rgba(147,197,253,0.7)" : "rgba(3,105,161,0.8)"} fontSize="8.5" fontWeight="600">
            FLOOD SECTOR BRAVO · 3-STRUCTURE CROSS-SECTION · BATHYMETRY & SUB-SURFACE HUD
          </text>
          <text x="696" y="24" textAnchor="end" fill="#38bdf8" fontSize="8.5" fontWeight="700">
            ● 77GHz FMCW GPR · 100% OFFLINE AUTONOMY
          </text>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 1: BUILDING A (LEFT, 3 STOREYS)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Underwater Storey 1 Foundation & Columns */}
            <polygon points="60,340 180,280 230,310 110,370" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="60,340 110,370 110,430 60,400" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="110,370 230,310 230,370 110,430" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            {/* Submerged Column Piers */}
            <line x1="85" y1="370" x2="85" y2="415" stroke={t.bldgBorder} strokeWidth="1.5" />
            <line x1="170" y1="340" x2="170" y2="395" stroke={t.bldgBorder} strokeWidth="1.5" />

            {/* Storey 2 (Partially Submerged Cutaway) */}
            <polygon points="60,270 180,210 230,240 110,300" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="60,270 110,300 110,360 60,330" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="110,300 230,240 230,300 110,360" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            {/* Storey 2 Interior Cutaway Windows */}
            <polygon points="125,290 165,270 165,310 125,330" fill={isDark ? "#061320" : "#dbeafe"} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Storey 3 (Unsubmerged Dry Upper Floor) */}
            <polygon points="60,200 180,140 230,170 110,230" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="60,200 110,230 110,290 60,260" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="110,230 230,170 230,230 110,290" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            {/* Window with trapped victim inside */}
            <polygon points="135,220 175,200 175,240 135,260" fill={isDark ? "#081b2e" : "#bfdbfe"} stroke={t.bldgBorder} strokeWidth="0.8" />
            {/* Victim inside storey 3 */}
            <circle cx="155" cy="235" r="3.5" fill="#f97316" />
            <rect x="152" y="238" width="6" height="8" rx="1.5" fill="#ea580c" />

            {/* Rooftop Parapet (Level 4 Terrace) */}
            <polygon points="60,195 180,135 230,165 110,225" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1.2" />
            <line x1="60" y1="190" x2="110" y2="220" stroke={t.bldgBorder} strokeWidth="1.5" />
            <line x1="110" y1="220" x2="230" y2="160" stroke={t.bldgBorder} strokeWidth="1.5" />

            {/* Building A Rooftop Survivors (2 Persons Waving) */}
            <g transform="translate(145, 160)">
              {/* Person 1 Waving Flag */}
              <circle cx="0" cy="0" r="3.8" fill="#fbbf24" />
              <rect x="-3" y="4" width="6" height="11" rx="2" fill="#ea580c" />
              <line x1="3" y1="6" x2="12" y2="-4" stroke="#fbbf24" strokeWidth="1.5" />
              <polygon points="12,-4 22,-8 18,-1" fill="#f97316" />
              {/* Person 2 Huddled */}
              <circle cx="-14" cy="4" r="3.5" fill="#fbbf24" />
              <rect x="-17" y="7" width="7" height="9" rx="2" fill="#c2410c" />
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 2: BUILDING B (CENTER-REAR, 4 STOREYS TOWER)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Underwater Storey 1 Deep Foundation */}
            <polygon points="260,370 380,310 440,340 320,400" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="260,370 320,400 320,460 260,430" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="320,400 440,340 440,400 320,460" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Storey 2 Submerged Level */}
            <polygon points="260,300 380,240 440,270 320,330" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="260,300 320,330 320,390 260,360" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="320,330 440,270 440,330 320,390" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Storey 3 (Unsubmerged Cutaway with Drone Inside) */}
            <polygon points="260,230 380,170 440,200 320,260" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="260,230 320,260 320,320 260,290" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="320,260 440,200 440,260 320,320" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            {/* Cutaway room opening on Storey 3 */}
            <polygon points="335,255 425,210 425,255 335,300" fill={isDark ? "#061320" : "#dbeafe"} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Storey 4 Upper Penthouse */}
            <polygon points="260,160 380,100 440,130 320,190" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="260,160 320,190 320,250 260,220" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="320,190 440,130 440,190 320,250" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Rooftop Terrace (Level 5 Roof) */}
            <polygon points="260,155 380,95 440,125 320,185" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="1.2" />
            {/* HVAC Box & Antenna */}
            <polygon points="280,140 310,125 330,135 300,150" fill={isDark ? "#1e3a5f" : "#94a3b8"} stroke={t.bldgBorder} strokeWidth="0.7" />
            <line x1="390" y1="100" x2="390" y2="60" stroke={t.bldgBorder} strokeWidth="1.5" />
            <line x1="385" y1="70" x2="395" y2="70" stroke={t.bldgBorder} strokeWidth="1" />

            {/* Building B Rooftop 3 Stranded Victims (Target Event Group) */}
            <g transform="translate(345, 145)">
              <circle cx="-12" cy="0" r="3.8" fill="#fbbf24" />
              <rect x="-15" y="4" width="6" height="10" rx="2" fill="#ef4444" />
              <circle cx="0" cy="2" r="3.5" fill="#fbbf24" />
              <rect x="-3" y="6" width="6" height="10" rx="2" fill="#ea580c" />
              <circle cx="12" cy="4" r="3.2" fill="#fbbf24" />
              <rect x="9" y="8" width="6" height="9" rx="2" fill="#f59e0b" />
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 3: BUILDING C (RIGHT, 2 STOREYS DEPOT)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Underwater Storey 1 */}
            <polygon points="480,360 600,300 660,330 540,390" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="480,360 540,390 540,450 480,420" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="540,390 660,330 660,390 540,450" fill={t.underwaterPillars} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Storey 2 Upper Level */}
            <polygon points="480,290 600,230 660,260 540,320" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="480,290 540,320 540,380 480,350" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="540,320 660,260 660,320 540,380" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Slanted Gabled Roof */}
            <polygon points="480,290 540,250 660,220 600,260" fill={isDark ? "#172d47" : "#cbd5e1"} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="480,290 540,320 540,250" fill={isDark ? "#0f2035" : "#94a3b8"} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Static Victim Huddled on Roof Ridge */}
            <g transform="translate(565, 245)">
              <circle cx="0" cy="0" r="3.6" fill="#fbbf24" />
              <polygon points="-5,4 5,4 7,14 -7,14" fill="#10b981" opacity="0.9" /> {/* Foil thermal poncho */}
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              FLOODWATER BODY & SUB-SURFACE CROSS-SECTION
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Underwater Depth Layer (Semi-transparent overlay covering submerged parts) */}
            <polygon points="20,340 700,340 700,470 20,470" fill={t.waterDepth} />

            {/* Isometric Surface Water Plane */}
            <polygon points="20,340 240,300 700,335 480,375" fill={t.waterTop} stroke={t.waterBorder} strokeWidth="1" opacity="0.65" />

            {/* Water Ripple Waves */}
            <path d="M 40 350 Q 70 345 100 350 T 160 350 T 220 350 T 280 350" stroke={t.waterBorder} strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 330 360 Q 370 355 410 360 T 490 360 T 570 360 T 650 360" stroke={t.waterBorder} strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 120 380 Q 160 375 200 380 T 280 380 T 360 380" stroke={t.waterBorder} strokeWidth="0.8" fill="none" opacity="0.4" />

            {/* Floating Debris */}
            <polygon points="210,355 245,350 240,358 205,363" fill="#78350f" stroke="#b45309" strokeWidth="0.6" /> {/* Timber plank */}
            <ellipse cx="440" cy="365" rx="8" ry="4" fill="#dc2626" stroke="#fca5a5" strokeWidth="0.8" /> {/* Floating barrel */}

            {/* Water Depth Level Indicator Badge */}
            <g transform="translate(30, 420)">
              <rect x="0" y="0" width="155" height="34" rx="5" fill={t.hudBg} stroke={t.waterBorder} strokeWidth="0.9" />
              <text x="8" y="13" fill="#38bdf8" fontSize="8" fontWeight="700">▲ FLOOD SURGE LEVEL</text>
              <text x="8" y="26" fill={t.hudText} fontSize="8" fontWeight="600">DEPTH: -3.2M · RISE +12cm/h</text>
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              OVERLAY 1: FLIR THERMAL HEAT MAP (HUMAN BODY HEAT)
             ═══════════════════════════════════════════════════ */}
          {showFlir && (
            <g>
              {/* Building A Rooftop Heat Blobs */}
              <ellipse cx="145" cy="165" rx="22" ry="15" fill="url(#ffHeatGrad)" filter="url(#ffBlur)" />
              {/* Building A Inside Storey 3 Heat Blob */}
              <ellipse cx="155" cy="235" rx="14" ry="12" fill="url(#ffHeatGrad)" filter="url(#ffBlur)" />
              {/* Building B Rooftop Heat Blobs (3 Persons) */}
              <ellipse cx="345" cy="148" rx="28" ry="16" fill="url(#ffHeatGrad)" filter="url(#ffBlur)" />
              {/* Building C Roof Heat Blob */}
              <ellipse cx="565" cy="248" rx="16" ry="12" fill="url(#ffHeatGrad)" filter="url(#ffBlur)" />

              {/* FLIR HUD Tag (Cleanly positioned in top-left sky, zero overlap) */}
              <g transform="translate(18, 48)">
                <line x1="130" y1="40" x2="145" y2="152" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="145" height="40" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1" />
                <text x="8" y="13" fill="#ef4444" fontSize="8" fontWeight="700">FLIR BOSON 640 LWIR</text>
                <text x="8" y="24" fill={t.hudText} fontSize="8" fontWeight="700">BODY HEAT: 37.4°C</text>
                <text x="8" y="34" fill="#fbbf24" fontSize="7" fontWeight="600">6 SURVIVORS ISOLATED</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 2: ACOUSTIC BEAMFORMING ARRAY
             ═══════════════════════════════════════════════════ */}
          {(showYolo || layer === 'ALL') && (
            <g>
              {/* Concentric Waveform Rings from Building A Waving Survivors */}
              <g transform="translate(145, 160)">
                <ellipse cx="0" cy="0" rx="15" ry="9" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;50;85" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="6;30;50" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="0" cy="0" rx="15" ry="9" stroke="#fbbf24" strokeWidth="1.2" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;50;85" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="6;30;50" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                </ellipse>
              </g>

              {/* Acoustic Callout Tag (Stacked neatly below FLIR, zero overlap with survivors) */}
              <g transform="translate(18, 102)">
                <line x1="120" y1="38" x2="142" y2="155" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="142" height="38" rx="5" fill={t.hudBg} stroke="#f59e0b" strokeWidth="1" />
                <text x="8" y="13" fill="#f59e0b" fontSize="8" fontWeight="700">ACOUSTIC ARRAY</text>
                <text x="8" y="24" fill={t.hudText} fontSize="8" fontWeight="700">VOICE DETECTED (380Hz)</text>
                <text x="8" y="33" fill="#f59e0b" fontSize="7" fontWeight="600">BEAMFORMING CONF: 92%</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 3: VISUAL YOLOv10-SAR BOUNDING BOXES
             ═══════════════════════════════════════════════════ */}
          {showYolo && (
            <g>
              {/* Building A Rooftop Bounding Box */}
              <rect x="125" y="145" width="48" height="35" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
              <rect x="125" y="135" width="85" height="12" rx="2" fill="#22c55e" />
              <text x="128" y="144" fill="#022c22" fontSize="7" fontWeight="800">YOLOv10: PERSON 0.94</text>

              {/* Building C Roof Bounding Box */}
              <rect x="550" y="235" width="30" height="30" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
              <rect x="550" y="225" width="85" height="12" rx="2" fill="#22c55e" />
              <text x="553" y="234" fill="#022c22" fontSize="7" fontWeight="800">YOLOv10: PERSON 0.96</text>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 4: 77 GHz FMCW GPR RADAR (SUB-SURFACE MAPPING)
              DYNAMIC SENSOR PROJECTION WAVES & CONES FROM STATIC DRONE 2-3
             ═══════════════════════════════════════════════════ */}
          {showGpr && (
            <g>
              {/* Drone 2-3 Conical Radar/Sonar Scan Cone penetrating floodwater */}
              <polygon points="460,285 360,450 560,450" fill="url(#ffGprBeam)" stroke="#06b6d4" strokeWidth="0.8">
                <animate attributeName="opacity" values="0.75;0.95;0.75" dur="2.4s" repeatCount="indefinite" />
              </polygon>

              {/* Dynamic Real-time Radar Sector Sweep projecting from static Drone 2-3 (460, 285) */}
              <polygon points="460,285 375,450 415,450" fill="rgba(34,211,238,0.22)" stroke="#22d3ee" strokeWidth="0.9">
                <animate attributeName="points" values="
                  460,285 365,450 405,450;
                  460,285 515,450 555,450;
                  460,285 365,450 405,450"
                  dur="2.6s" repeatCount="indefinite" />
              </polygon>

              {/* Dynamic Real-time Sweeping Scan Ray line from Drone 2-3 */}
              <line x1="460" y1="285" x2="385" y2="450" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9">
                <animate attributeName="x2" values="375;545;375" dur="2.6s" repeatCount="indefinite" />
              </line>

              {/* Real-time Dynamic Downward Bathymetric Wavefront Pulses from static Drone 2-3 */}
              <path d="M 435 315 Q 460 328 485 315" stroke="#22d3ee" strokeWidth="1.6" fill="none">
                <animate attributeName="d" values="
                  M 445 300 Q 460 308 475 300;
                  M 410 360 Q 460 380 510 360;
                  M 370 435 Q 460 465 550 435"
                  dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.95;0.6;0" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="strokeWidth" values="1.8;1.3;0.7" dur="2.4s" repeatCount="indefinite" />
              </path>
              <path d="M 435 315 Q 460 328 485 315" stroke="#06b6d4" strokeWidth="1.6" fill="none">
                <animate attributeName="d" values="
                  M 445 300 Q 460 308 475 300;
                  M 410 360 Q 460 380 510 360;
                  M 370 435 Q 460 465 550 435"
                  dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.95;0.6;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="strokeWidth" values="1.8;1.3;0.7" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
              </path>
              <path d="M 435 315 Q 460 328 485 315" stroke="#0284c7" strokeWidth="1.6" fill="none">
                <animate attributeName="d" values="
                  M 445 300 Q 460 308 475 300;
                  M 410 360 Q 460 380 510 360;
                  M 370 435 Q 460 465 550 435"
                  dur="2.4s" begin="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.95;0.6;0" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
                <animate attributeName="strokeWidth" values="1.8;1.3;0.7" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
              </path>

              {/* Sub-Surface Strata Depth Markers with subtle indicator pings */}
              <g>
                <circle cx="490" cy="338" r="2" fill="#22d3ee">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="496" y="340" fill="#22d3ee" fontSize="7.5" fontWeight="700">-1.2M WATER</text>
                <circle cx="520" cy="388" r="2" fill="#38bdf8">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
                </circle>
                <text x="526" y="390" fill="#38bdf8" fontSize="7.5" fontWeight="700">-2.8M SILT</text>
                <circle cx="544" cy="438" r="2" fill="#0284c7">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
                </circle>
                <text x="550" y="440" fill="#0284c7" fontSize="7.5" fontWeight="700">-4.5M SOLID STRATA</text>
              </g>

              {/* GPR HUD Tag (Positioned cleanly at bottom-right, zero overlap) */}
              <g transform="translate(530, 335)">
                <line x1="0" y1="20" x2="-45" y2="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="172" height="44" rx="5" fill={t.hudBg} stroke="#06b6d4" strokeWidth="1" />
                <text x="8" y="13" fill="#06b6d4" fontSize="8" fontWeight="700">77 GHz FMCW GPR RADAR</text>
                <text x="8" y="25" fill={t.hudText} fontSize="8" fontWeight="700">SUB-SURFACE BATHYMETRY</text>
                <text x="8" y="36" fill="#38bdf8" fontSize="7" fontWeight="600">WATER PENETRATION: 4.5M</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 5: MICRO-DOPPLER RADAR (BREATHING / VITALS)
             ═══════════════════════════════════════════════════ */}
          {showDoppler && (
            <g>
              {/* Sinusoidal Green Vector Lines showing Thoracic Respiration on Building C survivor */}
              <g transform="translate(565, 255)">
                <path d="M -30 0 Q -25 -8 -20 0 T -10 0 T 0 0 T 10 0 T 20 0 T 30 0" stroke="#10b981" strokeWidth="1.8" fill="none">
                  <animate attributeName="d" values="
                    M -30 0 Q -25 -8 -20 0 T -10 0 T 0 0 T 10 0 T 20 0 T 30 0;
                    M -30 0 Q -25 8 -20 0 T -10 0 T 0 0 T 10 0 T 20 0 T 30 0;
                    M -30 0 Q -25 -8 -20 0 T -10 0 T 0 0 T 10 0 T 20 0 T 30 0"
                    dur="1.8s" repeatCount="indefinite" />
                </path>
                <circle cx="0" cy="0" r="14" stroke="#10b981" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
              </g>

              {/* Micro-Doppler HUD Tag (Cleanly positioned at top-right, zero overlap) */}
              <g transform="translate(535, 115)">
                <line x1="35" y1="44" x2="30" y2="125" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="168" height="44" rx="5" fill={t.hudBg} stroke="#10b981" strokeWidth="1" />
                <text x="8" y="13" fill="#10b981" fontSize="8" fontWeight="700">MICRO-DOPPLER VITAL RADAR</text>
                <text x="8" y="25" fill={t.hudText} fontSize="8" fontWeight="700">THORACIC MOTION: ACTIVE</text>
                <text x="8" y="36" fill="#10b981" fontSize="7" fontWeight="600">RESPIRATION: 16 BPM (STABLE)</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 6: DETECTION EVENT (TARGET RETICLE)
             ═══════════════════════════════════════════════════ */}
          {showReticle && (
            <g>
              {/* Targeting Reticle over Building B 3-Person Group (345, 148) */}
              <g stroke="#ef4444" strokeWidth="2" fill="none">
                <path d="M 315 130 L 328 130 M 315 130 L 315 142" />
                <path d="M 375 130 L 362 130 M 375 130 L 375 142" />
                <path d="M 315 170 L 328 170 M 315 170 L 315 158" />
                <path d="M 375 170 L 362 170 M 375 170 L 375 158" />
                <circle cx="345" cy="150" r="22" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2">
                  <animate attributeName="r" values="20;26;20" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Target Event Alert Card (Top center sky, zero overlap with Drone 2-2) */}
              <g transform="translate(195, 36)">
                <line x1="140" y1="46" x2="150" y2="92" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
                <rect x="0" y="0" width="205" height="46" rx="6" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3.5" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="22" y="16" fill="#ef4444" fontSize="8.5" fontWeight="800">
                  VICTIM DETECTED: 3 PERSONS
                </text>
                <text x="10" y="28" fill={t.hudText} fontSize="8" fontWeight="700">
                  CODE YELLOW · HYPOTHERMIA RISK
                </text>
                <text x="10" y="39" fill="#f59e0b" fontSize="7" fontWeight="600">
                  SERVO ARMED: 1kg MINI O₂ & RESCUE PACK
                </text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              DRONES: STATIC POSITIONS LOCKED IN PLACE
              WITH REAL-TIME DYNAMIC SENSOR PROJECTION CONES & BEAMS
             ═══════════════════════════════════════════════════ */}

          {/* ── DRONE 2-1: Building B Interior Cutaway Scan (Position Locked at 350, 275) ── */}
          {/* Dynamic Interior SLAM Sensor Projections from static Drone 2-1 */}
          <g>
            {/* Real-time Dynamic Sweeping LiDAR Frustum Cone */}
            <polygon points="350,275 336,258 336,296" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth="0.8">
              <animate attributeName="points" values="
                350,275 336,258 336,296;
                350,275 405,212 422,246;
                350,275 336,258 336,296"
                dur="3.2s" repeatCount="indefinite" />
            </polygon>
            {/* Real-time Sweeping LiDAR Laser Beam */}
            <line x1="350" y1="275" x2="336" y2="277" stroke="#38bdf8" strokeWidth="1.4">
              <animate attributeName="x2" values="336;414;336" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="y2" values="277;229;277" dur="3.2s" repeatCount="indefinite" />
            </line>
            {/* Laser Contact Reflection Dot */}
            <circle cx="336" cy="277" r="2.2" fill="#38bdf8">
              <animate attributeName="cx" values="336;414;336" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="277;229;277" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="r" values="1.8;3;1.8" dur="0.8s" repeatCount="indefinite" />
            </circle>
            {/* Real-time Odometry SLAM Wave Pulses expanding from Drone 2-1 */}
            <circle cx="350" cy="275" r="10" stroke="#38bdf8" strokeWidth="0.8" fill="none" strokeDasharray="3 2">
              <animate attributeName="r" values="6;22;36" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.85;0.3;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Drone 2-1 Static Icon */}
          <g transform="translate(350, 275)">
            <ellipse cx="-12" cy="-6" rx="9" ry="4" stroke="#38bdf8" strokeWidth="0.8" fill="rgba(56,189,248,0.2)" strokeDasharray="2 2" />
            <ellipse cx="12" cy="-6" rx="9" ry="4" stroke="#38bdf8" strokeWidth="0.8" fill="rgba(56,189,248,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-12" cy="6" rx="9" ry="4" stroke="#38bdf8" strokeWidth="0.8" fill="rgba(56,189,248,0.2)" strokeDasharray="2 2" />
            <ellipse cx="12" cy="6" rx="9" ry="4" stroke="#38bdf8" strokeWidth="0.8" fill="rgba(56,189,248,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#031525" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
          </g>
          {/* Drone 2-1 Tag (Cleanly positioned to the left of the cutaway opening, zero overlap) */}
          <g transform="translate(180, 262)">
            <line x1="124" y1="13" x2="158" y2="13" stroke="#38bdf8" strokeWidth="0.9" strokeDasharray="2 2" />
            <rect x="0" y="0" width="124" height="26" rx="4" fill={t.hudBg} stroke="#38bdf8" strokeWidth="0.9" />
            <text x="6" y="11" fill="#38bdf8" fontSize="7.5" fontWeight="700">DRONE 2-1: SCANNING</text>
            <text x="6" y="21" fill={t.hudSub} fontSize="7" fontWeight="600">INTERIOR SLAM ACTIVE</text>
          </g>

          {/* ── DRONE 2-2: Rooftop Drop Drone (Position Locked at 420, 85) ── */}
          {/* Dynamic Optical Sensor Projection & Drop Guide Beam from static Drone 2-2 */}
          <g>
            {/* Real-time Dynamic Projection Cone */}
            <polygon points="420,85 328,148 362,148" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="0.8" strokeDasharray="3 2">
              <animate attributeName="opacity" values="0.3;0.75;0.3" dur="1.8s" repeatCount="indefinite" />
            </polygon>
            {/* Real-time Dynamic Optical Targeting Laser Guide */}
            <line x1="420" y1="85" x2="345" y2="148" stroke="#f97316" strokeWidth="1.4" strokeDasharray="4 3">
              <animate attributeName="strokeDashoffset" values="0;28" dur="0.9s" repeatCount="indefinite" />
            </line>
            {/* Real-time Descending Telemetry Pulse Packet */}
            <circle cx="420" cy="85" r="2.5" fill="#fbbf24">
              <animate attributeName="cx" values="420;345" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" values="85;148" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Drone 2-2 Static Icon */}
          <g transform="translate(420, 85)">
            <ellipse cx="-14" cy="-6" rx="10" ry="4" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            <ellipse cx="14" cy="-6" rx="10" ry="4" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-14" cy="6" rx="10" ry="4" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            <ellipse cx="14" cy="6" rx="10" ry="4" stroke="#f97316" strokeWidth="0.8" fill="rgba(249,115,22,0.2)" strokeDasharray="2 2" />
            {/* 1kg Mini O2 Cylinder Payload */}
            <rect x="-5" y="4" width="10" height="5" rx="1.5" fill="#c2410c" stroke="#f97316" strokeWidth="0.6" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#031525" stroke="#f97316" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
          </g>
          {/* Drone 2-2 Tag (Positioned to the right in sky, zero overlap) */}
          <g transform="translate(460, 42)">
            <line x1="0" y1="18" x2="-25" y2="38" stroke="#f97316" strokeWidth="0.9" strokeDasharray="2 2" />
            <rect x="0" y="0" width="132" height="26" rx="4" fill={t.hudBg} stroke="#f97316" strokeWidth="0.9" />
            <text x="6" y="11" fill="#f97316" fontSize="7.5" fontWeight="700">DRONE 2-2: PAYLOAD</text>
            <text x="6" y="21" fill={t.hudSub} fontSize="7" fontWeight="600">1kg MINI O₂ CYLINDER</text>
          </g>

          {/* ── DRONE 2-3: GPR Radar Drone over Water Channel (Position Locked at 460, 285) ── */}
          {/* Real-time Sonar Origin Pulse Rings from static Drone 2-3 */}
          <circle cx="460" cy="285" r="12" stroke="#06b6d4" strokeWidth="0.8" fill="none" strokeDasharray="2 2">
            <animate attributeName="r" values="8;20;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.3;0" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Drone 2-3 Static Icon */}
          <g transform="translate(460, 285)">
            <ellipse cx="-14" cy="-6" rx="10" ry="4" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="14" cy="-6" rx="10" ry="4" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-14" cy="6" rx="10" ry="4" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="14" cy="6" rx="10" ry="4" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#031525" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#06b6d4" />
          </g>
          {/* Drone 2-3 Tag (Positioned to the right, zero overlap) */}
          <g transform="translate(565, 260)">
            <line x1="0" y1="13" x2="-85" y2="25" stroke="#06b6d4" strokeWidth="0.9" strokeDasharray="2 2" />
            <rect x="0" y="0" width="135" height="26" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
            <text x="6" y="11" fill="#06b6d4" fontSize="7.5" fontWeight="700">DRONE 2-3: GPR SCAN</text>
            <text x="6" y="21" fill={t.hudSub} fontSize="7" fontWeight="600">77GHz FMCW ACTIVE</text>
          </g>

          {/* Bottom HUD Legend Line */}
          <text x="24" y="488" fill={isDark ? "rgba(147,197,253,0.4)" : "rgba(3,105,161,0.5)"} fontSize="7.5">
            MULTI-MODAL FUSION: FLIR BOSON 640 · 77GHz FMCW GPR · MICRO-DOPPLER RADAR · YOLOv10-SAR · SIH26177
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ── Detailed 2D Isometric Multi-Building Scene (Earthquake Collapse) ── */
function EarthquakeIsometricIllustration({ isDark }) {
  const [layer, setLayer] = useState('ALL'); // 'ALL' | 'LIDAR' | 'FLIR' | 'GPR' | 'DOPPLER' | 'ACOUSTIC' | 'YOLO' | 'RETICLE'

  const showLidar = layer === 'ALL' || layer === 'LIDAR';
  const showFlir = layer === 'ALL' || layer === 'FLIR';
  const showGpr = layer === 'ALL' || layer === 'GPR';
  const showDoppler = layer === 'ALL' || layer === 'DOPPLER';
  const showAcoustic = layer === 'ALL' || layer === 'ACOUSTIC';
  const showYolo = layer === 'ALL' || layer === 'YOLO';
  const showReticle = layer === 'ALL' || layer === 'RETICLE';

  const t = isDark ? {
    bg: '#08060f',
    grid: 'rgba(139, 92, 246, 0.12)',
    bldgA: '#151124',
    bldgB: '#1e1735',
    bldgC: '#1a1330',
    bldgBorder: 'rgba(167, 139, 250, 0.35)',
    slab: '#2a2245',
    slabBorder: 'rgba(196, 181, 253, 0.4)',
    rubble: '#1a1330',
    rebar: '#f97316',
    crack: '#ea580c',
    crackGlow: '#f59e0b',
    ground: '#120d22',
    groundSlabA: '#18132e',
    groundSlabB: '#1c1636',
    groundBorder: '#7c3aed',
    fissureDark: '#05020a',
    dustHaze: 'rgba(245, 158, 11, 0.08)',
    hudBg: 'rgba(15, 10, 26, 0.94)',
    hudBorder: 'rgba(167, 139, 250, 0.4)',
    hudText: '#f5f3ff',
    hudSub: '#c4b5fd',
    cardBorder: 'rgba(139, 92, 246, 0.25)',
  } : {
    bg: '#faf5ff',
    grid: 'rgba(109, 40, 217, 0.12)',
    bldgA: '#f3e8ff',
    bldgB: '#e9d5ff',
    bldgC: '#f5d0fe',
    bldgBorder: 'rgba(124, 58, 237, 0.35)',
    slab: '#ddd6fe',
    slabBorder: 'rgba(109, 40, 217, 0.45)',
    rubble: '#ede9fe',
    rebar: '#ea580c',
    crack: '#c2410c',
    crackGlow: '#d97706',
    ground: '#e2e8f0',
    groundSlabA: '#cbd5e1',
    groundSlabB: '#f1f5f9',
    groundBorder: '#8b5cf6',
    fissureDark: '#1e293b',
    dustHaze: 'rgba(217, 119, 6, 0.05)',
    hudBg: 'rgba(255, 255, 255, 0.96)',
    hudBorder: 'rgba(124, 58, 237, 0.35)',
    hudText: '#2e1065',
    hudSub: '#6d28d9',
    cardBorder: 'rgba(124, 58, 237, 0.25)',
  };

  return (
    <div className="space-y-3">
      {/* Sensor Layer Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {[
          { id: 'ALL', label: 'ALL SENSORS', color: '#8b5cf6' },
          { id: 'LIDAR', label: '3D LIDAR SLAM', color: '#06b6d4' },
          { id: 'FLIR', label: 'FLIR THERMAL', color: '#ef4444' },
          { id: 'GPR', label: '77GHz GPR RADAR', color: '#f59e0b' },
          { id: 'DOPPLER', label: 'MICRO-DOPPLER', color: '#10b981' },
          { id: 'ACOUSTIC', label: 'ACOUSTIC ARRAY', color: '#eab308' },
          { id: 'YOLO', label: 'YOLOv10-SAR VISUAL', color: '#22c55e' },
          { id: 'RETICLE', label: 'TARGET LOCK (VOID A)', color: '#ef4444' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setLayer(tab.id)}
            type="button"
            className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer"
            style={{
              border: `1px solid ${layer === tab.id ? tab.color : t.cardBorder}`,
              background: layer === tab.id ? `${tab.color}25` : (isDark ? 'rgba(20,12,35,0.5)' : 'rgba(255,255,255,0.7)'),
              color: layer === tab.id ? tab.color : (isDark ? 'rgba(196,181,253,0.7)' : 'rgba(109,40,217,0.8)'),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.cardBorder, background: t.bg }}>
        <svg viewBox="0 0 720 500" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <defs>
            <linearGradient id="eqGprBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="eqHeatGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="eqDustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="eqFissureGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#9a3412" stopOpacity="0.9" />
              <stop offset="100%" stopColor={t.fissureDark} stopOpacity="1" />
            </linearGradient>
            <filter id="eqBlur"><feGaussianBlur stdDeviation="3.5" /></filter>
          </defs>

          {/* Subsurface Coordinate Grid */}
          <g opacity="0.25">
            {[90, 170, 250, 330, 410, 490, 570, 650].map(x => (
              <line key={`eq-grid-${x}`} x1={x} y1="330" x2={x - 70} y2="470" stroke={t.grid} strokeWidth="0.6" strokeDasharray="3 3" />
            ))}
          </g>

          {/* Status Line */}
          <text x="24" y="24" fill={isDark ? "rgba(196,181,253,0.7)" : "rgba(109,40,217,0.8)"} fontSize="8.5" fontWeight="600">
            SECTOR FOXTROT · 3-STRUCTURE COLLAPSE ANALYSIS · VOID SPACE & SEISMIC HUD
          </text>
          <text x="696" y="24" textAnchor="end" fill="#8b5cf6" fontSize="8.5" fontWeight="700">
            ● ZERO-CLOUD AUTONOMY · 100% OFFLINE EDGE
          </text>

          {/* ═══════════════════════════════════════════════════
              DISTINCTLY VISIBLE CRACKED CONCRETE GROUND (DUSTY & UNSTABLE)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Base Concrete Ground Plane */}
            <polygon points="20,340 700,340 700,470 20,470" fill={t.ground} stroke={t.groundBorder} strokeWidth="1" />

            {/* Fractured Reinforced Concrete Pavement Slabs with Distinct Seams */}
            <polygon points="20,340 180,340 170,410 20,410" fill={t.groundSlabA} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.8" />
            <polygon points="180,340 370,340 350,410 170,410" fill={t.groundSlabB} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.8" />
            <polygon points="370,340 540,340 520,410 350,410" fill={t.groundSlabA} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.8" />
            <polygon points="540,340 700,340 700,410 520,410" fill={t.groundSlabB} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.8" />

            {/* Lower Pavement Tier (Displaced by Fault Slip / Vertical Heaving) */}
            <polygon points="20,410 260,410 240,470 20,470" fill={t.groundSlabB} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.75" />
            <polygon points="260,410 510,410 490,470 240,470" fill={t.groundSlabA} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.75" />
            <polygon points="510,410 700,410 700,470 490,470" fill={t.groundSlabB} stroke={t.groundBorder} strokeWidth="0.8" opacity="0.75" />

            {/* Expansion Joints Offset by Ground Displacement */}
            <line x1="20" y1="410" x2="700" y2="410" stroke={t.crack} strokeWidth="1.2" strokeDasharray="6 3" opacity="0.8" />

            {/* PRIMARY SEISMIC FAULT CHASM 1 (Center-Left Rupture Trench) */}
            <polygon points="175,348 245,372 230,408 270,432 255,470 238,470 215,432 222,402 165,360" fill="url(#eqFissureGrad)" />
            {/* Jagged Rupture Fault Edges */}
            <path d="M 175 348 L 245 372 L 230 408 L 270 432 L 255 470" stroke={t.crack} strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M 165 360 L 222 402 L 215 432 L 238 470" stroke={t.crack} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Glowing Fissure Depth Core */}
            <path d="M 175 348 L 245 372 L 230 408 L 270 432 L 255 470" stroke={t.crackGlow} strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.9" />

            {/* Exposed Rebar Struts Spanning Across Fissure Chasm */}
            <line x1="202" y1="388" x2="238" y2="380" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="220" y1="422" x2="252" y2="418" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="228" y1="452" x2="260" y2="446" stroke={t.rebar} strokeWidth="1.8" strokeLinecap="round" />

            {/* SECONDARY SEISMIC CRACK 2 (Center-Right Branching Rupture) */}
            <polygon points="485,365 540,390 530,418 565,440 550,470 535,470 515,438 522,412 475,378" fill="url(#eqFissureGrad)" />
            <path d="M 485 365 L 540 390 L 530 418 L 565 440 L 550 470" stroke={t.crack} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M 540 390 L 575 382 L 605 398" stroke={t.crack} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <line x1="510" y1="405" x2="538" y2="398" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round" />

            {/* Concrete Rubble Blocks Along Crack Margins */}
            <polygon points="180,365 200,358 205,370 185,375" fill={t.rubble} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="255,420 275,412 280,424 260,430" fill={t.rubble} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="470,358 495,350 500,362 478,368" fill={t.rubble} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="555,430 575,422 580,434 560,440" fill={t.rubble} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Atmospheric Dust Particles & Haze */}
            <ellipse cx="360" cy="310" rx="320" ry="110" fill="url(#eqDustGrad)" />
            {[
              [110, 310, 1.8], [190, 280, 1.4], [250, 330, 2.2], [380, 290, 1.6],
              [430, 340, 2.0], [510, 315, 1.5], [600, 320, 1.8], [310, 250, 1.2],
              [220, 375, 1.5], [440, 375, 1.5]
            ].map(([dx, dy, dr], idx) => (
              <circle key={`dust-${idx}`} cx={dx} cy={dy} r={dr} fill="#fbbf24" opacity="0.45">
                <animate attributeName="opacity" values="0.2;0.65;0.2" dur={`${2 + idx * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* ── SURVIVORS IN OPEN GROUND AREA ── */}
            {/* Ground Survivor 1 (Near clearing/fissure at 210, 395 - Injured Evacuee Crawling/Signaling) */}
            <g transform="translate(210, 395)">
              <circle cx="0" cy="0" r="3.6" fill="#fbbf24" />
              <polygon points="-6,4 6,4 4,13 -6,13" fill="#ea580c" />
              <line x1="4" y1="6" x2="14" y2="0" stroke="#fbbf24" strokeWidth="1.4" /> {/* Arm reaching to drone */}
            </g>

            {/* Ground Survivor 2 (In open rubble clearing at 440, 390 - Civilian Waving Arms) */}
            <g transform="translate(440, 390)">
              <circle cx="0" cy="0" r="3.8" fill="#fbbf24" />
              <rect x="-3" y="4" width="6" height="11" rx="2" fill="#ef4444" />
              <line x1="-3" y1="6" x2="-10" y2="-4" stroke="#fbbf24" strokeWidth="1.4" /> {/* Arm 1 up */}
              <line x1="3" y1="6" x2="10" y2="-4" stroke="#fbbf24" strokeWidth="1.4" /> {/* Arm 2 up */}
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 1: BUILDING A (LEFT, 3 STOREYS, TILTED & INTERNALLY DAMAGED)
             ═══════════════════════════════════════════════════ */}
          <g transform="rotate(-6, 140, 360)">
            {/* Foundation */}
            <polygon points="50,340 170,290 220,320 100,370" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Storey 1 (Buckled Structural Wall) */}
            <polygon points="50,270 170,220 220,250 100,300" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="50,270 100,300 100,370 50,340" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="100,300 220,250 220,320 100,370" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <path d="M 65 285 L 85 330 L 78 355" stroke={t.crack} strokeWidth="1.8" fill="none" />

            {/* Storey 2 (Interior Cutaway - VOID SPACE B) */}
            <polygon points="50,200 170,150 220,180 100,230" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="50,200 100,230 100,300 50,270" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="100,230 220,180 220,250 100,300" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="115,225 195,190 195,245 115,280" fill={isDark ? "#080410" : "#ddd6fe"} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="120,235 185,205 190,215 125,245" fill={t.slab} stroke={t.slabBorder} strokeWidth="1" />

            {/* Victim 1 Inside Void Space B */}
            <circle cx="145" cy="255" r="3.6" fill="#fbbf24" />
            <rect x="142" y="259" width="6" height="8" rx="1.5" fill="#f97316" />
            <line x1="148" y1="262" x2="158" y2="252" stroke="#fbbf24" strokeWidth="1.2" />

            {/* Storey 3 (Tilted Roof Deck with Trapped Survivor) */}
            <polygon points="50,195 170,145 220,175 100,225" fill={t.bldgA} stroke={t.bldgBorder} strokeWidth="1.2" />
            <line x1="50" y1="190" x2="100" y2="220" stroke={t.bldgBorder} strokeWidth="1.5" />
            <line x1="100" y1="220" x2="220" y2="170" stroke={t.bldgBorder} strokeWidth="1.5" />

            {/* Victim 2 Inside Storey 3 Window/Parapet */}
            <g transform="translate(170, 175)">
              <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
              <rect x="-3" y="4" width="6" height="8" rx="1.5" fill="#ef4444" />
              <line x1="3" y1="5" x2="10" y2="-2" stroke="#fbbf24" strokeWidth="1.2" />
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 2: BUILDING B (CENTER, 4 STOREYS, HALF COLLAPSED / PANCAKE VOID A)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Crushed Lower Stubs */}
            <polygon points="260,370 380,320 440,345 320,395" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="260,370 320,395 320,440 260,415" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="0.8" />
            <polygon points="320,395 440,345 440,390 320,440" fill={t.bldgB} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* VOID SPACE A (Triangle-of-Life survival pocket) */}
            <polygon points="310,345 385,300 395,350 310,350" fill={isDark ? "#040208" : "#c4b5fd"} stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 2" />

            {/* Victims 3 & 4 in Void Space A (Primary Target Event) */}
            <g transform="translate(345, 325)">
              <circle cx="-10" cy="0" r="3.6" fill="#fbbf24" />
              <rect x="-13" y="4" width="6" height="9" rx="2" fill="#ef4444" />
              <circle cx="6" cy="2" r="3.4" fill="#fbbf24" />
              <rect x="3" y="6" width="6" height="8" rx="2" fill="#ea580c" />
            </g>

            {/* Primary Angled Pancake Slab 1 */}
            <polygon points="295,320 415,270 455,295 335,345" fill={t.slab} stroke={t.slabBorder} strokeWidth="1.4" />
            <line x1="295" y1="320" x2="278" y2="335" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="335" y1="345" x2="328" y2="368" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="455" y1="295" x2="475" y2="305" stroke={t.rebar} strokeWidth="1.6" strokeLinecap="round" />

            {/* Upper Collapsed Pancake Slab 2 with Victim 5 Trapped in Crevice */}
            <polygon points="275,270 390,220 435,245 320,295" fill={t.slab} stroke={t.slabBorder} strokeWidth="1.2" />
            <line x1="275" y1="270" x2="260" y2="280" stroke={t.rebar} strokeWidth="1.4" strokeLinecap="round" />

            {/* Victim 5 in Upper Pancake Slab Crevice */}
            <g transform="translate(385, 235)">
              <circle cx="0" cy="0" r="3.4" fill="#fbbf24" />
              <rect x="-3" y="4" width="6" height="7" rx="1.5" fill="#f59e0b" />
              <line x1="2" y1="5" x2="8" y2="0" stroke="#fbbf24" strokeWidth="1.2" />
            </g>
          </g>

          {/* ═══════════════════════════════════════════════════
              STRUCTURE 3: BUILDING C (RIGHT, 3 STOREYS, INTERNALLY DAMAGED)
             ═══════════════════════════════════════════════════ */}
          <g>
            {/* Foundation */}
            <polygon points="490,360 610,305 670,335 550,390" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="490,360 550,390 550,445 490,415" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="550,390 670,335 670,390 550,445" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Storey 2 with Broken Window and Trapped Victim 7 */}
            <polygon points="490,280 610,225 670,255 550,310" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="490,280 550,310 550,370 490,340" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="550,310 670,255 670,315 550,370" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="575,250 605,235 605,265 575,280" fill={isDark ? "#090514" : "#e9d5ff"} stroke={t.bldgBorder} strokeWidth="0.8" />

            {/* Victim 7 Looking Out of Broken Window Storey 2 */}
            <g transform="translate(590, 245)">
              <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
              <rect x="-3" y="4" width="6" height="8" rx="1.5" fill="#ef4444" />
              <line x1="-3" y1="5" x2="-8" y2="0" stroke="#fbbf24" strokeWidth="1.2" />
            </g>

            {/* Storey 3 Roof Level */}
            <polygon points="490,200 610,145 670,175 550,230" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1.2" />
            <polygon points="490,200 550,230 550,290 490,260" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />
            <polygon points="550,230 670,175 670,235 550,290" fill={t.bldgC} stroke={t.bldgBorder} strokeWidth="1" />

            {/* Diagonal X-Shear Cracks */}
            <path d="M 505 215 L 540 280 M 540 215 L 505 280" stroke={t.crack} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
            <path d="M 565 190 L 650 290 M 650 190 L 565 290" stroke={t.crack} strokeWidth="2" strokeLinecap="round" opacity="0.85" />

            {/* Lower Level Basement VOID SPACE C with Victim 6 */}
            <polygon points="555,335 605,310 605,355 555,380" fill={isDark ? "#06030c" : "#ddd6fe"} stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
            <circle cx="575" cy="345" r="3.5" fill="#fbbf24" />
            <rect x="572" y="349" width="6" height="8" rx="1.5" fill="#10b981" opacity="0.9" />
          </g>

          {/* ═══════════════════════════════════════════════════
              OVERLAY 1: FLIR THERMAL (HEAT SIGNATURES ACROSS ALL VICTIMS)
             ═══════════════════════════════════════════════════ */}
          {showFlir && (
            <g>
              {/* Heat Blobs on all 9 survivors */}
              <ellipse cx="145" cy="255" rx="18" ry="13" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="165" cy="180" rx="15" ry="12" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="345" cy="325" rx="26" ry="16" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="385" cy="235" rx="16" ry="12" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="575" cy="345" rx="18" ry="13" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="590" cy="245" rx="16" ry="12" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="210" cy="395" rx="18" ry="12" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />
              <ellipse cx="440" cy="390" rx="18" ry="14" fill="url(#eqHeatGrad)" filter="url(#eqBlur)" />

              {/* FLIR HUD Tag (Clean top-left, zero overlap) */}
              <g transform="translate(18, 42)">
                <line x1="125" y1="40" x2="140" y2="230" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="168" height="40" rx="5" fill={t.hudBg} stroke="#ef4444" strokeWidth="1" />
                <text x="8" y="13" fill="#ef4444" fontSize="8" fontWeight="700">FLIR BOSON 640 LWIR</text>
                <text x="8" y="24" fill={t.hudText} fontSize="7.5" fontWeight="700">FLIR HEATMAP: MINOR FLUTTER DETECTED</text>
                <text x="8" y="33" fill="#fbbf24" fontSize="7" fontWeight="600">8 HEAT SIGNATURES CONFIRMED</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 2: VISUAL YOLOv10-SAR ANIMATED BOUNDING BOXES
             ═══════════════════════════════════════════════════ */}
          {showYolo && (
            <g>
              {/* Helper for YOLO Bounding Box with animated corner brackets */}
              {[
                { x: 330, y: 312, w: 35, h: 28, label: 'YOLOv10: PERSON 0.98' }, // Void Space A
                { x: 135, y: 245, w: 25, h: 26, label: 'YOLOv10: PERSON 0.94' }, // Void Space B
                { x: 155, y: 168, w: 24, h: 24, label: 'YOLOv10: PERSON 0.92' }, // Bldg A Storey 3
                { x: 372, y: 226, w: 26, h: 24, label: 'YOLOv10: PERSON 0.89' }, // Bldg B Crevice
                { x: 565, y: 335, w: 25, h: 26, label: 'YOLOv10: PERSON 0.91' }, // Void Space C
                { x: 578, y: 236, w: 25, h: 25, label: 'YOLOv10: PERSON 0.93' }, // Bldg C Window
                { x: 198, y: 385, w: 26, h: 25, label: 'YOLOv10: PERSON 0.95' }, // Ground Survivor 1
                { x: 428, y: 380, w: 25, h: 26, label: 'YOLOv10: PERSON 0.96' }, // Ground Survivor 2
              ].map((box, bIdx) => (
                <g key={`yolo-box-${bIdx}`}>
                  {/* Outer animated dashed rectangle */}
                  <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="2" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2">
                    <animate attributeName="strokeDashoffset" values="0;12" dur="1s" repeatCount="indefinite" />
                  </rect>
                  {/* Corner Highlighters */}
                  <path d={`M ${box.x} ${box.y + 4} L ${box.x} ${box.y} L ${box.x + 4} ${box.y}`} stroke="#22c55e" strokeWidth="1.8" fill="none" />
                  <path d={`M ${box.x + box.w - 4} ${box.y} L ${box.x + box.w} ${box.y} L ${box.x + box.w} ${box.y + 4}`} stroke="#22c55e" strokeWidth="1.8" fill="none" />
                  <path d={`M ${box.x} ${box.y + box.h - 4} L ${box.x} ${box.y + box.h} L ${box.x + 4} ${box.y + box.h}`} stroke="#22c55e" strokeWidth="1.8" fill="none" />
                  <path d={`M ${box.x + box.w - 4} ${box.y + box.h} L ${box.x + box.w} ${box.y + box.h} L ${box.x + box.w} ${box.y + box.h - 4}`} stroke="#22c55e" strokeWidth="1.8" fill="none" />
                  {/* Label badge */}
                  <rect x={box.x} y={box.y - 9} width={74} height="9" rx="1.5" fill="#22c55e" />
                  <text x={box.x + 2} y={box.y - 2} fill="#022c22" fontSize="6.2" fontWeight="800">{box.label}</text>
                </g>
              ))}

              {/* Dedicated YOLOv10-SAR HUD Tag (Clean left side, zero overlap) */}
              <g transform="translate(18, 90)">
                <line x1="130" y1="42" x2="200" y2="385" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="168" height="42" rx="5" fill={t.hudBg} stroke="#22c55e" strokeWidth="1" />
                <text x="8" y="13" fill="#22c55e" fontSize="8" fontWeight="700">YOLOv10-SAR REAL-TIME AI</text>
                <text x="8" y="24" fill={t.hudText} fontSize="7.5" fontWeight="700">8 HUMANS DETECTED (6 BLDG · 2 GROUND)</text>
                <text x="8" y="34" fill="#86efac" fontSize="7" fontWeight="600">NPU INFERENCE: 12ms · HEXAGON 15 TOPS</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 3: ACOUSTIC BEAMFORMING ARRAY
             ═══════════════════════════════════════════════════ */}
          {(showAcoustic || layer === 'ALL') && (
            <g>
              {/* Concentric Waveform Rings from Void B & Ground Survivors */}
              <g transform="translate(145, 255)">
                <ellipse cx="0" cy="0" rx="14" ry="8" stroke="#f59e0b" strokeWidth="1.3" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;45;75" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="6;26;42" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="0" cy="0" rx="14" ry="8" stroke="#fbbf24" strokeWidth="1.1" fill="none" strokeDasharray="4 2">
                  <animate attributeName="rx" values="10;45;75" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="6;26;42" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                </ellipse>
              </g>

              {/* Acoustic Callout Tag (Bottom-left, zero overlap) */}
              <g transform="translate(18, 415)">
                <line x1="120" y1="0" x2="140" y2="-135" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="165" height="40" rx="5" fill={t.hudBg} stroke="#f59e0b" strokeWidth="1" />
                <text x="8" y="13" fill="#f59e0b" fontSize="8" fontWeight="700">ACOUSTIC BEAMFORMING</text>
                <text x="8" y="24" fill={t.hudText} fontSize="8" fontWeight="700">DISTANT VOICE DETECTED (240Hz)</text>
                <text x="8" y="34" fill="#f59e0b" fontSize="7" fontWeight="600">SEISMIC CONFIDENCE: 88%</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 4: MICRO-DOPPLER RADAR (HEARTBEAT THROUGH CONCRETE)
             ═══════════════════════════════════════════════════ */}
          {showDoppler && (
            <g>
              {/* Cardiac Vector on Building C Survivor */}
              <g transform="translate(575, 345)">
                <path d="M -24 0 Q -18 -6 -14 0 T -6 0 T -2 -14 T 2 12 T 6 0 T 14 0 T 24 0" stroke="#10b981" strokeWidth="1.8" fill="none">
                  <animate attributeName="d" values="
                    M -24 0 Q -18 -6 -14 0 T -6 0 T -2 -14 T 2 12 T 6 0 T 14 0 T 24 0;
                    M -24 0 Q -18 4 -14 0 T -6 0 T -2 -6 T 2 6 T 6 0 T 14 0 T 24 0;
                    M -24 0 Q -18 -6 -14 0 T -6 0 T -2 -14 T 2 12 T 6 0 T 14 0 T 24 0"
                    dur="1.2s" repeatCount="indefinite" />
                </path>
                <circle cx="0" cy="0" r="14" stroke="#10b981" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
              </g>

              {/* Micro-Doppler Dedicated HUD Block (Top-right, zero overlap) */}
              <g transform="translate(530, 85)">
                <line x1="30" y1="42" x2="45" y2="240" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="175" height="42" rx="5" fill={t.hudBg} stroke="#10b981" strokeWidth="1" />
                <text x="8" y="13" fill="#10b981" fontSize="8" fontWeight="700">MICRO-DOPPLER VITAL RADAR</text>
                <text x="8" y="24" fill={t.hudText} fontSize="8" fontWeight="700">HEARTBEAT DETECTED (12 BPM)</text>
                <text x="8" y="34" fill="#10b981" fontSize="7" fontWeight="600">PENETRATING 45cm REINFORCED SLAB</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 5: 3D LIDAR SLAM (VOID SPACE MAPPING)
             ═══════════════════════════════════════════════════ */}
          {showLidar && (
            <g>
              {/* Dynamic Cyan 3D LiDAR Mesh Scan conforming to Void Space A */}
              <polygon points="265,220 310,345 385,300 395,350 310,350" fill="rgba(6,182,212,0.18)" stroke="#06b6d4" strokeWidth="1.2">
                <animate attributeName="opacity" values="0.75;1;0.75" dur="2.2s" repeatCount="indefinite" />
              </polygon>

              {/* Conforming LiDAR Wireframe Lines */}
              <g stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 2">
                <line x1="265" y1="220" x2="310" y2="345">
                  <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1="265" y1="220" x2="385" y2="300">
                  <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1="265" y1="220" x2="350" y2="325">
                  <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1="310" y1="345" x2="385" y2="300" />
              </g>

              {/* Sweeping Laser Beam Ray with Wall Contact Dot from static Drone 3-2 (265, 220) */}
              <line x1="265" y1="220" x2="310" y2="340" stroke="#38bdf8" strokeWidth="1.6">
                <animate attributeName="x2" values="310;385;310" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="y2" values="340;305;340" dur="2.6s" repeatCount="indefinite" />
              </line>
              <circle cx="310" cy="340" r="2.2" fill="#38bdf8">
                <animate attributeName="cx" values="310;385;310" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="cy" values="340;305;340" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="r" values="1.6;3;1.6" dur="0.8s" repeatCount="indefinite" />
              </circle>

              {/* 3D SLAM Callout Badge */}
              <g transform="translate(180, 255)">
                <line x1="120" y1="18" x2="135" y2="40" stroke="#06b6d4" strokeWidth="0.9" strokeDasharray="2 2" />
                <rect x="0" y="0" width="145" height="36" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="1" />
                <text x="6" y="12" fill="#06b6d4" fontSize="7.5" fontWeight="700">3D SLAM SCAN ACTIVE</text>
                <text x="6" y="22" fill={t.hudText} fontSize="8" fontWeight="600">VOID VOLUME: 4.8m³</text>
                <text x="6" y="31" fill="#38bdf8" fontSize="6.5" fontWeight="600">AIR POCKET: STABLE</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 6: 77 GHz FMCW GPR (SUB-SURFACE DEPTH SCAN)
             ═══════════════════════════════════════════════════ */}
          {showGpr && (
            <g>
              {/* Focused Sonar Pulse Cone in Gold/Copper from Drone 3-4 (455, 255) */}
              <polygon points="455,255 375,445 535,445" fill="url(#eqGprBeam)" stroke="#f59e0b" strokeWidth="0.9">
                <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2.4s" repeatCount="indefinite" />
              </polygon>

              {/* Real-time Dynamic Sweeping Radar Sector Beam */}
              <polygon points="455,255 385,445 425,445" fill="rgba(245,158,11,0.25)" stroke="#fbbf24" strokeWidth="1">
                <animate attributeName="points" values="
                  455,255 380,445 420,445;
                  455,255 490,445 530,445;
                  455,255 380,445 420,445"
                  dur="2.8s" repeatCount="indefinite" />
              </polygon>

              {/* Sweeping Center Beam Line */}
              <line x1="455" y1="255" x2="400" y2="445" stroke="#fbbf24" strokeWidth="1.8" opacity="0.9">
                <animate attributeName="x2" values="390;510;390" dur="2.8s" repeatCount="indefinite" />
              </line>

              {/* Downward Propagating Pulse Arcs */}
              <path d="M 430 305 Q 455 318 480 305" stroke="#fbbf24" strokeWidth="1.6" fill="none">
                <animate attributeName="d" values="
                  M 440 280 Q 455 290 470 280;
                  M 410 360 Q 455 380 500 360;
                  M 380 435 Q 455 460 530 435"
                  dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;0" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="strokeWidth" values="1.8;1.3;0.7" dur="2.4s" repeatCount="indefinite" />
              </path>
              <path d="M 430 305 Q 455 318 480 305" stroke="#f59e0b" strokeWidth="1.6" fill="none">
                <animate attributeName="d" values="
                  M 440 280 Q 455 290 470 280;
                  M 410 360 Q 455 380 500 360;
                  M 380 435 Q 455 460 530 435"
                  dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="strokeWidth" values="1.8;1.3;0.7" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
              </path>

              {/* Depth Markers */}
              <g>
                <circle cx="485" cy="330" r="2" fill="#fbbf24" />
                <text x="492" y="332" fill="#fbbf24" fontSize="7.5" fontWeight="700">-1.8M REBAR</text>
                <circle cx="510" cy="385" r="2" fill="#f59e0b" />
                <text x="517" y="387" fill="#f59e0b" fontSize="7.5" fontWeight="700">-3.4M VOID</text>
                <circle cx="528" cy="435" r="2" fill="#d97706" />
                <text x="535" y="437" fill="#d97706" fontSize="7.5" fontWeight="700">-5.1M BEDROCK</text>
              </g>

              {/* GPR Depth Scan HUD Tag (Lower-right, zero overlap) */}
              <g transform="translate(515, 320)">
                <line x1="0" y1="20" x2="-35" y2="40" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="0" y="0" width="185" height="46" rx="5" fill={t.hudBg} stroke="#f59e0b" strokeWidth="1" />
                <text x="8" y="13" fill="#f59e0b" fontSize="8" fontWeight="700">77 GHz FMCW GPR RADAR</text>
                <text x="8" y="25" fill={t.hudText} fontSize="8" fontWeight="700">GPR DEPTH SCAN (SUB-SURFACE MAPPING)</text>
                <text x="8" y="36" fill="#fbbf24" fontSize="7" fontWeight="600">PENETRATION: 5.1M CONCRETE/RUBBLE</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERLAY 7: DETECTION EVENT (TARGET RETICLE VOID A)
             ═══════════════════════════════════════════════════ */}
          {showReticle && (
            <g>
              {/* Highlighted Reticle around Void Space A (345, 325) */}
              <g stroke="#ef4444" strokeWidth="2" fill="none">
                <path d="M 315 305 L 328 305 M 315 305 L 315 318" />
                <path d="M 375 305 L 362 305 M 375 305 L 375 318" />
                <path d="M 315 345 L 328 345 M 315 345 L 315 332" />
                <path d="M 375 345 L 362 345 M 375 345 L 375 332" />
                <circle cx="345" cy="325" r="24" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2">
                  <animate attributeName="r" values="22;28;22" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Target Event Alert Card (Top center sky, zero overlap) */}
              <g transform="translate(190, 36)">
                <line x1="150" y1="46" x2="155" y2="245" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" />
                <rect x="0" y="0" width="215" height="46" rx="6" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3.5" fill="#ef4444">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <text x="22" y="16" fill="#ef4444" fontSize="8.5" fontWeight="800">
                  VICTIM FOUND: 2 PERSONS (VOID SPACE A)
                </text>
                <text x="10" y="27" fill={t.hudText} fontSize="8" fontWeight="700">
                  CODE RED · CRUSH SYNDROME RISK
                </text>
                <text x="10" y="38" fill="#f59e0b" fontSize="7" fontWeight="600">
                  SERVO ARMED: 1kg MINI O₂ CYLINDER
                </text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════
              SPECIALIZED DRONES (STATIONARY ICONS LOCKED IN POSITION)
             ═══════════════════════════════════════════════════ */}

          {/* ── DRONE 3-1: MESH RELAY (High Exterior Relay at 360, 55) ── */}
          <g stroke="#8b5cf6" strokeWidth="0.9" strokeDasharray="4 3" opacity="0.6">
            <line x1="360" y1="55" x2="265" y2="220">
              <animate attributeName="strokeDashoffset" values="0;28" dur="1.4s" repeatCount="indefinite" />
            </line>
            <line x1="360" y1="55" x2="130" y2="175">
              <animate attributeName="strokeDashoffset" values="0;28" dur="1.4s" repeatCount="indefinite" />
            </line>
            <line x1="360" y1="55" x2="455" y2="255">
              <animate attributeName="strokeDashoffset" values="0;28" dur="1.4s" repeatCount="indefinite" />
            </line>
          </g>

          <g transform="translate(360, 55)">
            <ellipse cx="-13" cy="-5" rx="9" ry="3.5" stroke="#8b5cf6" strokeWidth="0.8" fill="rgba(139,92,246,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="-5" rx="9" ry="3.5" stroke="#8b5cf6" strokeWidth="0.8" fill="rgba(139,92,246,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-13" cy="5" rx="9" ry="3.5" stroke="#8b5cf6" strokeWidth="0.8" fill="rgba(139,92,246,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="5" rx="9" ry="3.5" stroke="#8b5cf6" strokeWidth="0.8" fill="rgba(139,92,246,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#140b28" stroke="#8b5cf6" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <line x1="0" y1="-5" x2="0" y2="-12" stroke="#8b5cf6" strokeWidth="1.2" />
            <circle cx="0" cy="-12" r="1.5" fill="#a78bfa" />
          </g>
          {/* Drone 3-1 Tag */}
          <g transform="translate(415, 36)">
            <line x1="0" y1="12" x2="-35" y2="15" stroke="#8b5cf6" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="140" height="24" rx="4" fill={t.hudBg} stroke="#8b5cf6" strokeWidth="0.9" />
            <text x="6" y="10" fill="#8b5cf6" fontSize="7.5" fontWeight="700">DRONE 3-1: MESH RELAY</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="7" fontWeight="600">900MHz MESH · ZERO LOSS</text>
          </g>

          {/* ── DRONE 3-2: LIDAR SLAM (VOID SPACE MAPPING at 265, 220) ── */}
          <g transform="translate(265, 220)">
            <ellipse cx="-13" cy="-5" rx="9" ry="3.5" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="-5" rx="9" ry="3.5" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-13" cy="5" rx="9" ry="3.5" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="5" rx="9" ry="3.5" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#04121e" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <circle cx="0" cy="-3" r="2.8" fill="#06b6d4" opacity="0.9" />
          </g>
          {/* Drone 3-2 Tag */}
          <g transform="translate(180, 195)">
            <line x1="85" y1="24" x2="85" y2="35" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="150" height="24" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
            <text x="6" y="10" fill="#06b6d4" fontSize="7.5" fontWeight="700">DRONE 3-2: LIDAR SLAM</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="7" fontWeight="600">VOID SPACE MAPPING ACTIVE</text>
          </g>

          {/* ── DRONE 3-3: FLIR THERMAL (LIFE SIGN SEARCH at 130, 175) ── */}
          <polygon points="130,175 115,250 165,250" fill="rgba(239,68,68,0.14)" stroke="#ef4444" strokeWidth="0.7" strokeDasharray="3 2">
            <animate attributeName="opacity" values="0.3;0.75;0.3" dur="2s" repeatCount="indefinite" />
          </polygon>
          <line x1="130" y1="175" x2="145" y2="255" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 2">
            <animate attributeName="strokeDashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
          </line>

          <g transform="translate(130, 175)">
            <ellipse cx="-13" cy="-5" rx="9" ry="3.5" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="-5" rx="9" ry="3.5" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-13" cy="5" rx="9" ry="3.5" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="5" rx="9" ry="3.5" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#180404" stroke="#ef4444" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
          </g>
          {/* Drone 3-3 Tag */}
          <g transform="translate(18, 140)">
            <line x1="110" y1="24" x2="110" y2="38" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="145" height="24" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.9" />
            <text x="6" y="10" fill="#ef4444" fontSize="7.5" fontWeight="700">DRONE 3-3: FLIR THERMAL</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="7" fontWeight="600">LIFE SIGN SEARCH ACTIVE</text>
          </g>

          {/* ── DRONE 3-4: GPR SCAN (SUB-SURFACE DEPTH MAPPING at 455, 255) ── */}
          <circle cx="455" cy="255" r="12" stroke="#f59e0b" strokeWidth="0.8" fill="none" strokeDasharray="2 2">
            <animate attributeName="r" values="8;20;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.3;0" dur="2s" repeatCount="indefinite" />
          </circle>

          <g transform="translate(455, 255)">
            <ellipse cx="-13" cy="-5" rx="9" ry="3.5" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="-5" rx="9" ry="3.5" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-13" cy="5" rx="9" ry="3.5" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="13" cy="5" rx="9" ry="3.5" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#1b1202" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <rect x="-5" y="4" width="10" height="5" rx="1.5" fill="#c2410c" stroke="#f97316" strokeWidth="0.6" />
          </g>
          {/* Drone 3-4 Tag */}
          <g transform="translate(535, 230)">
            <line x1="0" y1="12" x2="-55" y2="25" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="150" height="24" rx="4" fill={t.hudBg} stroke="#f59e0b" strokeWidth="0.9" />
            <text x="6" y="10" fill="#f59e0b" fontSize="7.5" fontWeight="700">DRONE 3-4: GPR SCAN</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="7" fontWeight="600">SUB-SURFACE DEPTH MAPPING</text>
          </g>

          {/* Bottom HUD Legend Line */}
          <text x="24" y="488" fill={isDark ? "rgba(196,181,253,0.4)" : "rgba(109,40,217,0.5)"} fontSize="7.5">
            MULTI-MODAL FUSION: LIVIOX LIDAR · FLIR BOSON 640 · 77GHz FMCW GPR · MICRO-DOPPLER · YOLOv10-SAR · SIH26177
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ── Detailed 2D Isometric Subterranean Mine Network (Rat-Hole Mining) ── */
function RatHoleMiningIsometricIllustration({ isDark }) {
  const [layer, setLayer] = useState('ALL'); // 'ALL' | 'LIDAR' | 'FLIR' | 'ACOUSTIC' | 'YOLO' | 'DOPPLER' | 'GPR' | 'RETICLE'

  const showLidar = layer === 'ALL' || layer === 'LIDAR';
  const showFlir = layer === 'ALL' || layer === 'FLIR';
  const showAcoustic = layer === 'ALL' || layer === 'ACOUSTIC';
  const showYolo = layer === 'ALL' || layer === 'YOLO';
  const showDoppler = layer === 'ALL' || layer === 'DOPPLER';
  const showGpr = layer === 'ALL' || layer === 'GPR';
  const showReticle = layer === 'ALL' || layer === 'RETICLE';

  const t = isDark ? {
    bg: '#080502',
    grid: 'rgba(245, 158, 11, 0.12)',
    surfaceGround: 'url(#rhSurfaceDark)',
    strata1: 'url(#rhStrata1Dark)',
    strata2: 'url(#rhStrata2Dark)',
    strata3: 'url(#rhStrata3Dark)',
    strata4: 'url(#rhStrata4Dark)',
    strataBorder: 'rgba(245, 158, 11, 0.3)',
    tunnelVoid: '#040201',
    tunnelBorder: 'rgba(245, 158, 11, 0.45)',
    tunnelMesh: 'rgba(6, 182, 212, 0.55)',
    rockfall: '#2d1607',
    rockfallLight: '#42220c',
    rockfallBorder: 'rgba(245, 158, 11, 0.4)',
    timber: '#78350f',
    timberBorder: '#92400e',
    gasCloud: 'rgba(22, 163, 74, 0.22)',
    gasBorder: 'rgba(34, 197, 94, 0.35)',
    hudBg: 'rgba(15, 8, 2, 0.94)',
    hudBorder: 'rgba(245, 158, 11, 0.45)',
    hudText: '#fef3c7',
    hudSub: '#fde68a',
    cardBorder: 'rgba(245, 158, 11, 0.25)',
    crackLine: '#f97316',
  } : {
    bg: '#fffbf0',
    grid: 'rgba(180, 83, 9, 0.12)',
    surfaceGround: 'url(#rhSurfaceLight)',
    strata1: 'url(#rhStrata1Light)',
    strata2: 'url(#rhStrata2Light)',
    strata3: 'url(#rhStrata3Light)',
    strata4: 'url(#rhStrata4Light)',
    strataBorder: 'rgba(180, 83, 9, 0.35)',
    tunnelVoid: '#fdf8f0',
    tunnelBorder: 'rgba(180, 83, 9, 0.45)',
    tunnelMesh: 'rgba(8, 145, 178, 0.65)',
    rockfall: '#d4a373',
    rockfallLight: '#faedcd',
    rockfallBorder: 'rgba(180, 83, 9, 0.4)',
    timber: '#92400e',
    timberBorder: '#78350f',
    gasCloud: 'rgba(22, 163, 74, 0.18)',
    gasBorder: 'rgba(21, 128, 61, 0.35)',
    hudBg: 'rgba(255, 255, 255, 0.96)',
    hudBorder: 'rgba(180, 83, 9, 0.4)',
    hudText: '#451a03',
    hudSub: '#78350f',
    cardBorder: 'rgba(180, 83, 9, 0.25)',
    crackLine: '#c2410c',
  };

  return (
    <div className="space-y-3">
      {/* Sensor Layer Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {[
          { id: 'ALL', label: 'ALL SENSORS', color: '#f59e0b' },
          { id: 'LIDAR', label: 'LiDAR FAST-LIO2', color: '#06b6d4' },
          { id: 'FLIR', label: 'FLIR THERMAL', color: '#ef4444' },
          { id: 'ACOUSTIC', label: 'ACOUSTIC CNN', color: '#f97316' },
          { id: 'YOLO', label: 'YOLOv10-SAR VISUAL', color: '#22c55e' },
          { id: 'DOPPLER', label: 'MICRO-DOPPLER', color: '#10b981' },
          { id: 'GPR', label: '77GHz GPR RADAR', color: '#eab308' },
          { id: 'RETICLE', label: 'TARGET LOCK', color: '#ef4444' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setLayer(tab.id)}
            type="button"
            className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer"
            style={{
              border: `1px solid ${layer === tab.id ? tab.color : t.cardBorder}`,
              background: layer === tab.id ? `${tab.color}25` : (isDark ? 'rgba(26,14,4,0.4)' : 'rgba(255,255,255,0.7)'),
              color: layer === tab.id ? tab.color : (isDark ? 'rgba(253,230,138,0.65)' : 'rgba(120,53,15,0.7)'),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.cardBorder, background: t.bg }}>
        <svg viewBox="0 0 720 500" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <defs>
            {/* Strata gradients Dark */}
            <linearGradient id="rhSurfaceDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2b1809" />
              <stop offset="100%" stopColor="#1e0f05" />
            </linearGradient>
            <linearGradient id="rhStrata1Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#221206" />
              <stop offset="100%" stopColor="#180c03" />
            </linearGradient>
            <linearGradient id="rhStrata2Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#180c03" />
              <stop offset="100%" stopColor="#100701" />
            </linearGradient>
            <linearGradient id="rhStrata3Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#100701" />
              <stop offset="100%" stopColor="#080301" />
            </linearGradient>
            <linearGradient id="rhStrata4Dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080301" />
              <stop offset="100%" stopColor="#030100" />
            </linearGradient>

            {/* Strata gradients Light */}
            <linearGradient id="rhSurfaceLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eedbc5" />
              <stop offset="100%" stopColor="#dfc3a3" />
            </linearGradient>
            <linearGradient id="rhStrata1Light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dfc3a3" />
              <stop offset="100%" stopColor="#ccaa85" />
            </linearGradient>
            <linearGradient id="rhStrata2Light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ccaa85" />
              <stop offset="100%" stopColor="#b89169" />
            </linearGradient>
            <linearGradient id="rhStrata3Light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#96704b" />
              <stop offset="100%" stopColor="#7a5533" />
            </linearGradient>
            <linearGradient id="rhStrata4Light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#634326" />
              <stop offset="100%" stopColor="#4f331b" />
            </linearGradient>

            {/* Thermal heat flare gradients */}
            <radialGradient id="rhHeatFlare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.65" />
              <stop offset="75%" stopColor="#eab308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            {/* GPR pulse cone gradient */}
            <linearGradient id="rhGprCone" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.05" />
            </linearGradient>

            {/* Toxic Methane/CO Gas Plume */}
            <radialGradient id="rhGasPlume" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#84cc16" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
            </radialGradient>

            {/* Grid Pattern */}
            <pattern id="rhGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke={t.grid} strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="720" height="500" fill="url(#rhGrid)" />

          {/* ═══════════════════════════════════════════════════════════════
              GEOLOGICAL CUTAWAY STRATA LAYERS (Isometric Underground Depth)
             ═══════════════════════════════════════════════════════════════ */}
          {/* Strata Layer 1: Topsoil & Weathered Shale (Depth 0 to -10m) */}
          <path d="M 20,85 Q 240,78 480,82 Q 620,86 700,82 L 700,165 Q 490,175 250,160 L 20,168 Z" fill={t.strata1} stroke={t.strataBorder} strokeWidth="0.8" />
          <text x="32" y="128" fill={isDark ? "rgba(253,230,138,0.3)" : "rgba(120,53,15,0.4)"} fontSize="7.5" fontWeight="700">STRATA 01: TOPSOIL & WEATHERED SHALE (-10M)</text>

          {/* Strata Layer 2: Fractured Sandstone & Siltstone (Depth -10m to -22m) */}
          <path d="M 20,168 Q 250,160 490,175 L 700,165 L 700,270 Q 520,285 240,265 L 20,275 Z" fill={t.strata2} stroke={t.strataBorder} strokeWidth="0.8" />
          <text x="32" y="222" fill={isDark ? "rgba(253,230,138,0.3)" : "rgba(120,53,15,0.4)"} fontSize="7.5" fontWeight="700">STRATA 02: HARD SANDSTONE & SILTSTONE (-22M)</text>

          {/* Strata Layer 3: Bituminous Coal Seam & Methane Stratum (Depth -22m to -35m) */}
          <path d="M 20,275 Q 240,265 520,285 L 700,270 L 700,390 Q 480,405 210,385 L 20,395 Z" fill={t.strata3} stroke={t.strataBorder} strokeWidth="0.8" />
          <text x="32" y="338" fill={isDark ? "rgba(253,230,138,0.3)" : "rgba(120,53,15,0.4)"} fontSize="7.5" fontWeight="700">STRATA 03: BITUMINOUS COAL SEAM / METHANE ZONE (-35M)</text>

          {/* Strata Layer 4: Deep Impermeable Basalt Bedrock (Depth -35m to -48m) */}
          <path d="M 20,395 Q 210,385 480,405 L 700,390 L 700,470 L 20,470 Z" fill={t.strata4} stroke={t.strataBorder} strokeWidth="0.8" />
          <text x="32" y="445" fill={isDark ? "rgba(253,230,138,0.3)" : "rgba(120,53,15,0.4)"} fontSize="7.5" fontWeight="700">STRATA 04: IMPERMEABLE BASALT BEDROCK (-48M)</text>

          {/* Strata Geological Cleavage & Joint Fractures */}
          <path d="M 120,110 L 155,160 L 140,220 L 175,270" stroke={t.crackLine} strokeWidth="0.7" strokeDasharray="3 2" fill="none" opacity="0.6" />
          <path d="M 370,120 L 395,185 L 380,240 L 410,290" stroke={t.crackLine} strokeWidth="0.7" strokeDasharray="3 2" fill="none" opacity="0.6" />
          <path d="M 580,105 L 610,170 L 595,230 L 635,310" stroke={t.crackLine} strokeWidth="0.7" strokeDasharray="3 2" fill="none" opacity="0.6" />

          {/* ═══════════════════════════════════════════════════════════════
              SURFACE PIT HEAD & RAT-HOLE ENTRANCES (y: 35 to 85)
             ═══════════════════════════════════════════════════════════════ */}
          {/* Surface Opencast Ground Plane */}
          <polygon points="20,85 180,48 690,48 700,82 20,85" fill={t.surfaceGround} stroke={t.strataBorder} strokeWidth="1" />

          {/* Surface Winch Tripod Rig over Shaft A (x: 175, y: 50) */}
          <line x1="165" y1="80" x2="185" y2="45" stroke={t.timber} strokeWidth="2.5" />
          <line x1="205" y1="80" x2="185" y2="45" stroke={t.timber} strokeWidth="2.5" />
          <line x1="185" y1="45" x2="185" y2="80" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 1" />
          <circle cx="185" cy="45" r="4" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
          {/* Winch Cable descending down Shaft A */}
          <line x1="185" y1="45" x2="185" y2="195" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

          {/* Surface Relay Base Mast & Antenna (x: 645, y: 48) */}
          <line x1="645" y1="75" x2="645" y2="40" stroke="#06b6d4" strokeWidth="2" />
          <line x1="640" y1="48" x2="650" y2="48" stroke="#06b6d4" strokeWidth="1.2" />
          <line x1="637" y1="44" x2="653" y2="44" stroke="#06b6d4" strokeWidth="1.2" />
          <circle cx="645" cy="38" r="2.5" fill="#10b981">
            <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="610" y="32" fill="#06b6d4" fontSize="7" fontWeight="700">SURFACE RF RELAY</text>

          {/* Shaft A Entrance Collar (Main Infiltration Hole at 185, 80) */}
          <rect x="170" y="74" width="30" height="10" rx="2" fill={t.timber} stroke={t.timberBorder} strokeWidth="1.2" />
          <ellipse cx="185" cy="79" rx="11" ry="3.5" fill="#030100" stroke="#f59e0b" strokeWidth="0.8" />
          <text x="145" y="68" fill="#f59e0b" fontSize="7" fontWeight="700">SHAFT A (MAIN HOLE)</text>

          {/* Shaft B Entrance Collar (Crude Rat-Hole Vent Shaft at 435, 78) */}
          <rect x="422" y="72" width="26" height="8" rx="2" fill={t.timber} stroke={t.timberBorder} strokeWidth="1.2" />
          <ellipse cx="435" cy="76" rx="9" ry="3" fill="#030100" stroke="#ea580c" strokeWidth="0.8" />
          <text x="405" y="66" fill="#ea580c" fontSize="7" fontWeight="700">SHAFT B (RAT-HOLE)</text>

          {/* ═══════════════════════════════════════════════════════════════
              SUBTERRANEAN CLAUSTROPHOBIC TUNNEL NETWORK (The Sub-Surface)
             ═══════════════════════════════════════════════════════════════ */}
          {/* Vertical Shaft A Tunnel Cavity (Plunging down to Depth -18m) */}
          <rect x="172" y="80" width="26" height="120" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.2" />
          {/* Wooden shoring ribs in Shaft A */}
          {[100, 125, 150, 175].map(y => (
            <line key={`shA-${y}`} x1="172" y1={y} x2="198" y2={y} stroke={t.timber} strokeWidth="1.5" />
          ))}

          {/* Level 1 Horizontal Drift (Connecting Shaft A to Central Hub, y: 195 to 235) */}
          <path d="M 172,200 L 198,200 L 375,210 L 375,235 L 172,235 Z" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.2" />
          {/* Timber Props along Level 1 */}
          {[225, 270, 315, 355].map(x => (
            <g key={`tprop-${x}`}>
              <line x1={x} y1={205} x2={x} y2={235} stroke={t.timber} strokeWidth="2.5" />
              <line x1={x-5} y1={205} x2={x+5} y2={205} stroke={t.timber} strokeWidth="3" />
            </g>
          ))}
          {/* Haulage Rails on floor */}
          <line x1="198" y1="232" x2="375" y2="232" stroke="#78350f" strokeWidth="1" strokeDasharray="4 2" />

          {/* ─────────────────────────────────────────────────────────────
              SECTION 1: NARROW VERTICAL SHAFT CUT OFF BY ENTRANCE COLLAPSE
              (Shaft B: x: 420-455, y: 78 to 365)
             ───────────────────────────────────────────────────────────── */}
          {/* Lower Shaft B Chamber (Trapped Miner Pocket, y: 275 to 370) */}
          <rect x="415" y="275" width="45" height="95" rx="3" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.2" />

          {/* The Entrance Tunnel Collapse Blockade (y: 175 to 275) */}
          {/* Upper shaft cavity above collapse */}
          <rect x="422" y="78" width="26" height="100" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.2" />

          {/* Wedged Boulders & Rubble Collapse in Shaft B (Only Micro-Drones can pass!) */}
          <g>
            <polygon points="418,175 448,185 440,210 415,200" fill={t.rockfall} stroke={t.rockfallBorder} strokeWidth="1" />
            <polygon points="428,205 458,215 452,245 425,235" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="1" />
            <polygon points="415,230 438,242 430,270 412,258" fill={t.rockfall} stroke={t.rockfallBorder} strokeWidth="1" />
            <polygon points="432,255 460,268 450,285 426,275" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="1" />
            {/* Splintered shoring timbers crushed in collapse */}
            <line x1="416" y1="190" x2="445" y2="225" stroke="#78350f" strokeWidth="2.5" />
            <line x1="448" y1="210" x2="422" y2="260" stroke="#78350f" strokeWidth="2.5" />

            {/* Narrow 38cm Aperture Bottleneck Indicator */}
            <line x1="438" y1="215" x2="438" y2="255" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <rect x="305" y="235" width="115" height="20" rx="3" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.8" />
            <text x="312" y="244" fill="#ef4444" fontSize="6.8" fontWeight="700">COLLAPSE BOTTLENECK: 38cm</text>
            <text x="312" y="251" fill={t.hudSub} fontSize="6" fontWeight="600">ZERO HUMAN ACCESS POSSIBLE</text>
          </g>

          {/* Toxic Methane Gas Plume Swirling in Shaft B */}
          <ellipse cx="438" cy="310" rx="20" ry="25" fill="url(#rhGasPlume)">
            <animate attributeName="opacity" values="0.4;0.75;0.4" dur="3s" repeatCount="indefinite" />
          </ellipse>

          {/* ─────────────────────────────────────────────────────────────
              SECTION 2: DEEP SUBTERRANEAN CHAMBER CUT OFF BY ROCKFALL
              (Deep Cavity C: x: 550 to 685, y: 325 to 445)
             ───────────────────────────────────────────────────────────── */}
          {/* Deep Void Cavity C Chamber */}
          <path d="M 550,335 Q 610,320 680,330 L 685,440 Q 615,448 550,442 Z" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.5" />

          {/* Massive Internal Rockfall / Debris Avalanche Blockade (x: 495 to 552, y: 300 to 445) */}
          <g>
            <polygon points="495,305 535,295 548,340 505,345" fill={t.rockfall} stroke={t.rockfallBorder} strokeWidth="1.2" />
            <polygon points="502,340 552,330 555,385 508,395" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="1.2" />
            <polygon points="498,390 550,380 552,442 495,445" fill={t.rockfall} stroke={t.rockfallBorder} strokeWidth="1.2" />
            {/* Hanging fractured roof slabs */}
            <polygon points="530,290 560,285 555,315 525,310" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="1" />
            {/* Rubble pile boulders spilling onto drift floor */}
            <circle cx="515" cy="425" r="7" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="0.8" />
            <circle cx="530" cy="435" r="9" fill={t.rockfall} stroke={t.rockfallBorder} strokeWidth="0.8" />
            <circle cx="542" cy="428" r="6" fill={t.rockfallLight} stroke={t.rockfallBorder} strokeWidth="0.8" />

            {/* Blockade Hazard Banner */}
            <line x1="525" y1="365" x2="480" y2="340" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="360" y="325" width="118" height="20" rx="3" fill={t.hudBg} stroke="#f59e0b" strokeWidth="0.8" />
            <text x="366" y="334" fill="#f59e0b" fontSize="6.8" fontWeight="700">INTERNAL ROCKFALL BLOCKADE</text>
            <text x="366" y="341" fill={t.hudSub} fontSize="6" fontWeight="600">SEALED BY 14-TON ROOF COLLAPSE</text>
          </g>

          {/* Lower Connecting Incline Drift (x: 220 to 395, y: 285 to 370) */}
          <path d="M 220,290 L 395,295 L 395,355 L 220,350 Z" fill={t.tunnelVoid} stroke={t.tunnelBorder} strokeWidth="1.2" />
          {[250, 295, 340, 380].map(x => (
            <line key={`lowprop-${x}`} x1={x} y1={292} x2={x} y2={352} stroke={t.timber} strokeWidth="2.5" />
          ))}

          {/* ═══════════════════════════════════════════════════════════════
              TRAPPED MINERS (Victims in Blocked Shaft B & Deep Cavity C)
             ═══════════════════════════════════════════════════════════════ */}
          {/* GROUP 1: TWO MINERS IN BLOCKED SHAFT B (x: 425 & 448, y: 345) */}
          <g>
            {/* Miner 1 (Huddled against left rock face at 426, 345) */}
            <circle cx="426" cy="336" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <path d="M 420,344 Q 426,341 432,344 L 433,358 L 419,358 Z" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
            {/* Hardhat with headlamp */}
            <rect x="422" y="333" width="8" height="3" rx="1.5" fill="#eab308" />
            <circle cx="426" cy="333" r="1.5" fill="#fef08a">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Miner 2 (Crouched beside Miner 1 at 448, 348) */}
            <circle cx="448" cy="338" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <path d="M 442,346 Q 448,343 454,346 L 455,360 L 441,360 Z" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
            {/* Hardhat with headlamp */}
            <rect x="444" y="335" width="8" height="3" rx="1.5" fill="#eab308" />
            <circle cx="448" cy="335" r="1.5" fill="#fef08a">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* GROUP 2: ONE MINER IN DEEP CAVITY C (Tapping SOS at 620, 405) */}
          <g>
            {/* Miner seated against coal face */}
            <circle cx="620" cy="395" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <path d="M 613,403 Q 620,400 627,403 L 628,422 L 612,422 Z" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
            {/* Hardhat */}
            <rect x="616" y="391" width="9" height="3.5" rx="1.5" fill="#eab308" />
            <circle cx="621" cy="391" r="1.6" fill="#fef08a" />
            {/* Iron bar in hand tapping against coal wall */}
            <line x1="626" y1="408" x2="640" y2="402" stroke="#e2e8f0" strokeWidth="2.2" />
            {/* Impact Spark / Acoustic Tapping Source */}
            <circle cx="640" cy="402" r="2.5" fill="#fbbf24">
              <animate attributeName="r" values="2;4;2" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 1: FLIR BOSON 640 LWIR THERMAL & GAS DETECT
             ═══════════════════════════════════════════════════════════════ */}
          {showFlir && (
            <g id="rh-flir-layer">
              {/* Thermal Heat Flares around Miners in Shaft B */}
              <circle cx="437" cy="346" r="28" fill="url(#rhHeatFlare)">
                <animate attributeName="r" values="24;32;24" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Thermal Heat Flare around Miner in Deep Cavity C */}
              <circle cx="620" cy="405" r="30" fill="url(#rhHeatFlare)">
                <animate attributeName="r" values="26;35;26" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.75;1;0.75" dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* Thermal Scanning Cone from Drone 4-3 */}
              <polygon points="575,325 540,430 670,430" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 2">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
              </polygon>

              {/* FLIR HUD Callout Banner */}
              <g transform="translate(485, 260)">
                <rect x="0" y="0" width="195" height="24" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.9" />
                <text x="8" y="10" fill="#ef4444" fontSize="7.2" fontWeight="700">FLIR THERMAL: GAS DIFFERENTIAL & HEAT</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">HEAT SIGNATURE: 36.9°C · CH₄ PLUME ISOLATED</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 2: ACOUSTIC CNN ARRAY (SOS Wall Tapping)
             ═══════════════════════════════════════════════════════════════ */}
          {showAcoustic && (
            <g id="rh-acoustic-layer">
              {/* Concentric Animated Sound Wave Rings from Miner Tapping */}
              {[15, 30, 48, 68].map((r, idx) => (
                <circle key={`sos-ring-${idx}`} cx="640" cy="402" r={r} fill="none" stroke="#f97316" strokeWidth="1.2" strokeDasharray="4 2">
                  <animate attributeName="r" values={`${r};${r+22};${r+45}`} dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.4;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              ))}

              {/* Acoustic Waveform Vector toward Drone 4-3 */}
              <line x1="640" y1="402" x2="575" y2="335" stroke="#f97316" strokeWidth="1.4" strokeDasharray="3 2">
                <animate attributeName="strokeDashoffset" values="0;24" dur="0.8s" repeatCount="indefinite" />
              </line>

              {/* Acoustic CNN HUD Callout */}
              <g transform="translate(495, 448)">
                <rect x="0" y="0" width="195" height="24" rx="4" fill={t.hudBg} stroke="#f97316" strokeWidth="0.9" />
                <text x="8" y="10" fill="#f97316" fontSize="7.2" fontWeight="700">ACOUSTIC CNN: SOS TAPPING DETECTED</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">FREQ: 420Hz · PATTERN: 3 SHORT / 3 LONG</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 3: VISUAL YOLOv10-SAR WITH ANIMATED BOUNDING BOXES
             ═══════════════════════════════════════════════════════════════ */}
          {showYolo && (
            <g id="rh-yolo-layer">
              {/* Miner Group 1 Bounding Box in Shaft B (412 to 460, y: 326 to 365) */}
              <rect x="413" y="326" width="48" height="38" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
              </rect>
              {/* Corner brackets */}
              <path d="M 413,334 L 413,326 L 421,326" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 453,326 L 461,326 L 461,334" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 413,356 L 413,364 L 421,364" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 453,364 L 461,364 L 461,356" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              {/* Tag */}
              <rect x="413" y="316" width="62" height="10" rx="2" fill="#22c55e" />
              <text x="416" y="323" fill="#041208" fontSize="6.5" fontWeight="800">MINER 01-02 96.8%</text>

              {/* Miner Group 2 Bounding Box in Deep Cavity C (605 to 645, y: 386 to 428) */}
              <rect x="606" y="386" width="38" height="42" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
              </rect>
              {/* Corner brackets */}
              <path d="M 606,394 L 606,386 L 614,386" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 636,386 L 644,386 L 644,394" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 606,420 L 606,428 L 614,428" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              <path d="M 636,428 L 644,428 L 644,420" stroke="#22c55e" strokeWidth="2.2" fill="none" />
              {/* Tag */}
              <rect x="606" y="376" width="54" height="10" rx="2" fill="#22c55e" />
              <text x="609" y="383" fill="#041208" fontSize="6.5" fontWeight="800">MINER 03 98.1%</text>

              {/* YOLO Real-Time HUD Status Card (Top-Left) */}
              <g transform="translate(18, 92)">
                <rect x="0" y="0" width="225" height="30" rx="4" fill={t.hudBg} stroke="#22c55e" strokeWidth="0.9" />
                <circle cx="10" cy="11" r="3.2" fill="#22c55e">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                </circle>
                <text x="18" y="12" fill="#22c55e" fontSize="7.5" fontWeight="800">YOLOv10-SAR ZERO-LIGHT NV</text>
                <text x="8" y="24" fill={t.hudSub} fontSize="6.8" fontWeight="600">3 MINERS CLASSIFIED · 12ms @ 15 TOPS NPU</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 4: MICRO-DOPPLER RADAR (Thoracic Respiration)
             ═══════════════════════════════════════════════════════════════ */}
          {showDoppler && (
            <g id="rh-doppler-layer">
              {/* Sinusoidal Respiration Wave through Strata to Shaft B */}
              <path d="M 320,120 Q 345,170 365,220 T 405,280 T 435,335" stroke="#10b981" strokeWidth="1.8" fill="none" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* Pulsing Thoracic Motion Waves at Miner Chests */}
              <circle cx="437" cy="346" r="14" stroke="#10b981" strokeWidth="1.2" fill="none">
                <animate attributeName="r" values="8;18;8" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="620" cy="405" r="14" stroke="#10b981" strokeWidth="1.2" fill="none">
                <animate attributeName="r" values="8;18;8" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.4s" repeatCount="indefinite" />
              </circle>

              {/* Micro-Doppler HUD Callout Banner */}
              <g transform="translate(18, 395)">
                <rect x="0" y="0" width="215" height="26" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="0.9" />
                <text x="8" y="11" fill="#10b981" fontSize="7.2" fontWeight="700">MICRO-DOPPLER: THORACIC RESPIRATION</text>
                <text x="8" y="21" fill={t.hudSub} fontSize="6.8" fontWeight="600">DETECTED (14 BPM) · PENETRATION: 3.8m ROCK</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 5: LIVOX LIDAR / FAST-LIO2 (3D Tunnel Mesh Mapping)
             ═══════════════════════════════════════════════════════════════ */}
          {showLidar && (
            <g id="rh-lidar-layer">
              {/* 360° Rotating Laser Frustum from Drone 4-2 */}
              <polygon points="255,230 175,200 175,235" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 2" />
              <polygon points="255,230 375,210 375,235" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 2" />

              {/* 3D Wireframe Mesh along Tunnel Contours & Rockfall */}
              <path d="M 175,200 L 195,208 L 225,203 L 255,208 L 295,204 L 340,212 L 375,210" stroke="#06b6d4" strokeWidth="1" fill="none" strokeDasharray="2 2" />
              <path d="M 175,235 L 205,230 L 240,233 L 285,228 L 330,232 L 375,235" stroke="#06b6d4" strokeWidth="1" fill="none" strokeDasharray="2 2" />

              {/* Point Cloud Dots on rockfall rubble */}
              {[
                [505,335], [520,320], [538,340], [512,360], [545,370], [522,390], [548,410], [510,430]
              ].map(([px, py], i) => (
                <circle key={`pc-${i}`} cx={px} cy={py} r="1.4" fill="#06b6d4">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* FAST-LIO2 HUD Callout */}
              <g transform="translate(18, 175)">
                <rect x="0" y="0" width="185" height="24" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
                <text x="8" y="10" fill="#06b6d4" fontSize="7.2" fontWeight="700">FAST-LIO2: TUNNEL MESH & BLOCKADE</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">84% VOLUME MAPPED · ZERO DRIFT</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 6: 77GHz GPR (Ground Penetrating Radar Strata Scan)
             ═══════════════════════════════════════════════════════════════ */}
          {showGpr && (
            <g id="rh-gpr-layer">
              {/* Penetrating Copper/Gold Radar Pulse Cones from Drone 4-4 */}
              <polygon points="320,115 190,390 470,390" fill="url(#rhGprCone)" stroke="#eab308" strokeWidth="0.8" strokeDasharray="3 2">
                <animate attributeName="opacity" values="0.35;0.75;0.35" dur="2.4s" repeatCount="indefinite" />
              </polygon>

              {/* Expanding Sub-surface Strata Radar Wavefronts */}
              {[40, 80, 130, 190, 260].map((r, i) => (
                <path key={`gpr-arc-${i}`} d={`M ${320 - r * 0.7},${115 + r} Q 320,${115 + r * 1.08} ${320 + r * 0.7},${115 + r}`} stroke="#eab308" strokeWidth="1.2" fill="none" strokeDasharray="4 2">
                  <animate attributeName="opacity" values="0.9;0.2;0" dur="2s" repeatCount="indefinite" />
                </path>
              ))}

              {/* GPR HUD Callout Banner */}
              <g transform="translate(18, 285)">
                <rect x="0" y="0" width="195" height="24" rx="4" fill={t.hudBg} stroke="#eab308" strokeWidth="0.9" />
                <text x="8" y="10" fill="#eab308" fontSize="7.2" fontWeight="700">GPR SCAN: SUB-SURFACE CAVITY MAPPING</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">DEPTH: -38M · VOID CAVITY DETECTED</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 7: DETECTION EVENT TARGET RETICLES
             ═══════════════════════════════════════════════════════════════ */}
          {showReticle && (
            <g id="rh-reticle-layer">
              {/* Reticle 1 on Blocked Shaft B (437, 346) */}
              <circle cx="437" cy="346" r="18" stroke="#ef4444" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
                <animateTransform attributeName="transform" type="rotate" from="0 437 346" to="360 437 346" dur="6s" repeatCount="indefinite" />
              </circle>
              <line x1="415" y1="346" x2="459" y2="346" stroke="#ef4444" strokeWidth="0.8" />
              <line x1="437" y1="324" x2="437" y2="368" stroke="#ef4444" strokeWidth="0.8" />
              {/* Callout Card 1 */}
              <g transform="translate(245, 365)">
                <line x1="190" y1="0" x2="190" y2="-15" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                <rect x="0" y="0" width="220" height="28" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.1" />
                <text x="8" y="11" fill="#ef4444" fontSize="7.5" fontWeight="800">VICTIM DETECTED: 2 PERSONS (BLOCKED SHAFT B)</text>
                <text x="8" y="22" fill={t.hudSub} fontSize="6.8" fontWeight="600">STATUS: CODE RED · SpO₂: 88% · CH₄ RISK: HIGH</text>
              </g>

              {/* Reticle 2 on Deep Cavity C (620, 405) */}
              <circle cx="620" cy="405" r="20" stroke="#ef4444" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
                <animateTransform attributeName="transform" type="rotate" from="0 620 405" to="-360 620 405" dur="6s" repeatCount="indefinite" />
              </circle>
              <line x1="596" y1="405" x2="644" y2="405" stroke="#ef4444" strokeWidth="0.8" />
              <line x1="620" y1="381" x2="620" y2="429" stroke="#ef4444" strokeWidth="0.8" />
              {/* Callout Card 2 */}
              <g transform="translate(485, 360)">
                <line x1="135" y1="28" x2="135" y2="42" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                <rect x="0" y="0" width="220" height="28" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.1" />
                <text x="8" y="11" fill="#ef4444" fontSize="7.5" fontWeight="800">VICTIM DETECTED: 1 PERSON (DEEP CAVITY C)</text>
                <text x="8" y="22" fill={t.hudSub} fontSize="6.8" fontWeight="600">STATUS: CODE RED · SpO₂: 91% · SOS TAPPING CONVERGED</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SPECIALIZED MICRO-DRONES & CRAWLERS (Locked Static Positions)
             ═══════════════════════════════════════════════════════════════ */}

          {/* ── DRONE 4-1: NARROW-SHAFT EXPLORER (MICRO-SLITHER at 432, 235) ── */}
          {/* Micro-Slither Serpentine Articulated Segments */}
          <g transform="translate(432, 235)">
            {/* Dual High-Beam Search LED illuminating downward */}
            <polygon points="0,5 -30,85 30,85" fill="rgba(254,240,138,0.25)" stroke="#fef08a" strokeWidth="0.6" strokeDasharray="2 2">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
            </polygon>
            {/* Snake Body Segments */}
            <rect x="-4" y="-12" width="8" height="6" rx="2" fill="#180c04" stroke="#f59e0b" strokeWidth="0.8" />
            <rect x="-5" y="-5" width="10" height="7" rx="2" fill="#291508" stroke="#f59e0b" strokeWidth="1" />
            <rect x="-4" y="3" width="8" height="6" rx="2" fill="#180c04" stroke="#f59e0b" strokeWidth="0.8" />
            {/* Head Camera & LED Eye */}
            <circle cx="0" cy="7" r="2" fill="#22c55e" />
            <circle cx="-2" cy="7" r="1.2" fill="#fef08a" />
            <circle cx="2" cy="7" r="1.2" fill="#fef08a" />
            {/* 1kg Mini O2 payload canister attached */}
            <rect x="-2.5" y="-18" width="5" height="6" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
          </g>
          {/* Drone 4-1 Status Tag */}
          <g transform="translate(470, 190)">
            <line x1="0" y1="14" x2="-35" y2="40" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="225" height="24" rx="4" fill={t.hudBg} stroke="#f59e0b" strokeWidth="0.9" />
            <text x="6" y="10" fill="#f59e0b" fontSize="7.2" fontWeight="700">DRONE 4-1: NARROW-SHAFT EXPLORER</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">MICRO-SLITHER · 38cm BOTTLENECK PASSAGE</text>
          </g>

          {/* ── DRONE 4-2: LIVOX LIDAR / FAST-LIO2 (3D TUNNEL MAPPING at 255, 230) ── */}
          <g transform="translate(255, 230)">
            <ellipse cx="-11" cy="-4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="-4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-11" cy="4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#04121e" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <circle cx="0" cy="-3" r="2.8" fill="#06b6d4" opacity="0.9" />
          </g>
          {/* Drone 4-2 Status Tag */}
          <g transform="translate(145, 140)">
            <line x1="75" y1="24" x2="105" y2="85" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="215" height="24" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
            <text x="6" y="10" fill="#06b6d4" fontSize="7.2" fontWeight="700">DRONE 4-2: LIVOX LIDAR / FAST-LIO2</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">3D TUNNEL MAPPING · 84% RECONSTRUCTED</text>
          </g>

          {/* ── DRONE 4-3: FLIR THERMAL & GAS DETECT (LIFE SIGN SEARCH at 575, 335) ── */}
          <g transform="translate(575, 335)">
            <ellipse cx="-11" cy="-4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="-4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-11" cy="4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#180404" stroke="#ef4444" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            {/* Gas Sensor Sniffer Nozzle */}
            <line x1="0" y1="5" x2="0" y2="10" stroke="#f59e0b" strokeWidth="1.2" />
          </g>
          {/* Drone 4-3 Status Tag */}
          <g transform="translate(500, 300)">
            <line x1="75" y1="24" x2="75" y2="34" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="210" height="24" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.9" />
            <text x="6" y="10" fill="#ef4444" fontSize="7.2" fontWeight="700">DRONE 4-3: FLIR THERMAL & GAS DETECT</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">LIFE SIGN SEARCH · CH₄: 2.1% · CO: 180 PPM</text>
          </g>

          {/* ── DRONE 4-4: 77GHz GPR (SUB-SURFACE STRATA SCAN at 320, 115) ── */}
          <g transform="translate(320, 115)">
            {/* Rover Body with All-Terrain Tracks */}
            <rect x="-14" y="4" width="28" height="6" rx="2" fill="#1b1202" stroke="#eab308" strokeWidth="0.8" />
            <circle cx="-10" cy="7" r="2.5" fill="#eab308" />
            <circle cx="0" cy="7" r="2.5" fill="#eab308" />
            <circle cx="10" cy="7" r="2.5" fill="#eab308" />
            <rect x="-10" y="-4" width="20" height="9" rx="2" fill="#2d1c04" stroke="#eab308" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#10b981" />
            {/* Downward FMCW Radar Horn Antenna */}
            <polygon points="-5,5 5,5 8,12 -8,12" fill="#eab308" opacity="0.8" />
          </g>
          {/* Drone 4-4 Status Tag */}
          <g transform="translate(235, 75)">
            <line x1="85" y1="24" x2="85" y2="38" stroke="#eab308" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="215" height="24" rx="4" fill={t.hudBg} stroke="#eab308" strokeWidth="0.9" />
            <text x="6" y="10" fill="#eab308" fontSize="7.2" fontWeight="700">DRONE 4-4: 77GHz GPR</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">SUB-SURFACE STRATA SCAN · VOID CAVITY MAP</text>
          </g>

          {/* Bottom HUD Legend Line */}
          <text x="24" y="488" fill={isDark ? "rgba(253,230,138,0.4)" : "rgba(120,53,15,0.5)"} fontSize="7.5">
            MULTI-MODAL SUBTERRANEAN FUSION: LIVOX LIDAR · FLIR BOSON 640 · 77GHz FMCW GPR · MICRO-DOPPLER · YOLOv10-SAR · SIH26177
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ── Detailed 2D Isometric Industrial Chemical Plant Network (Industrial HAZMAT) ── */
function IndustrialHazmatIsometricIllustration({ isDark }) {
  const [layer, setLayer] = useState('ALL'); // 'ALL' | 'CHEMICAL' | 'FLIR' | 'ACOUSTIC' | 'YOLO' | 'LIDAR' | 'GPR' | 'DOPPLER' | 'RETICLE'

  const showChemical = layer === 'ALL' || layer === 'CHEMICAL';
  const showFlir = layer === 'ALL' || layer === 'FLIR';
  const showAcoustic = layer === 'ALL' || layer === 'ACOUSTIC';
  const showYolo = layer === 'ALL' || layer === 'YOLO';
  const showLidar = layer === 'ALL' || layer === 'LIDAR';
  const showGpr = layer === 'ALL' || layer === 'GPR';
  const showDoppler = layer === 'ALL' || layer === 'DOPPLER';
  const showReticle = layer === 'ALL' || layer === 'RETICLE';

  const t = isDark ? {
    bg: '#020b08',
    grid: 'rgba(16, 185, 129, 0.12)',
    tankGrad: 'url(#hzTankDark)',
    columnGrad: 'url(#hzColumnDark)',
    sphereGrad: 'url(#hzSphereDark)',
    steelStructure: '#052219',
    steelBorder: 'rgba(16, 185, 129, 0.45)',
    pipe: '#0f766e',
    pipeBorder: 'rgba(20, 184, 166, 0.55)',
    catwalk: '#06281e',
    catwalkBorder: 'rgba(16, 185, 129, 0.35)',
    catwalkRailing: '#10b981',
    refugeBg: '#041d14',
    refugeBorder: '#10b981',
    refugeGlow: 'rgba(16, 185, 129, 0.25)',
    ground: '#04140e',
    groundBorder: 'rgba(16, 185, 129, 0.35)',
    subVault: '#020a07',
    subVaultBorder: 'rgba(16, 185, 129, 0.25)',
    hudBg: 'rgba(2, 20, 14, 0.94)',
    hudBorder: 'rgba(16, 185, 129, 0.45)',
    hudText: '#ecfdf5',
    hudSub: '#a7f3d0',
    cardBorder: 'rgba(16, 185, 129, 0.25)',
    leakFlash: '#ef4444',
  } : {
    bg: '#f0fdf4',
    grid: 'rgba(5, 150, 105, 0.12)',
    tankGrad: 'url(#hzTankLight)',
    columnGrad: 'url(#hzColumnLight)',
    sphereGrad: 'url(#hzSphereLight)',
    steelStructure: '#d1fae5',
    steelBorder: 'rgba(5, 150, 105, 0.45)',
    pipe: '#14b8a6',
    pipeBorder: 'rgba(13, 148, 136, 0.55)',
    catwalk: '#e6f4ea',
    catwalkBorder: 'rgba(5, 150, 105, 0.4)',
    catwalkRailing: '#059669',
    refugeBg: '#dcfce7',
    refugeBorder: '#059669',
    refugeGlow: 'rgba(5, 150, 105, 0.2)',
    ground: '#e2e8f0',
    groundBorder: 'rgba(100, 116, 139, 0.45)',
    subVault: '#cbd5e1',
    subVaultBorder: 'rgba(100, 116, 139, 0.35)',
    hudBg: 'rgba(255, 255, 255, 0.96)',
    hudBorder: 'rgba(5, 150, 105, 0.4)',
    hudText: '#064e3b',
    hudSub: '#047857',
    cardBorder: 'rgba(5, 150, 105, 0.25)',
    leakFlash: '#dc2626',
  };

  return (
    <div className="space-y-3">
      {/* Sensor Layer Switcher Bar */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {[
          { id: 'ALL', label: 'ALL SENSORS', color: '#10b981' },
          { id: 'CHEMICAL', label: 'CHEMICAL PLUME', color: '#84cc16' },
          { id: 'FLIR', label: 'FLIR THERMAL', color: '#ef4444' },
          { id: 'ACOUSTIC', label: 'ACOUSTIC ARRAY', color: '#f59e0b' },
          { id: 'LIDAR', label: 'LIDAR FAST-LIO2', color: '#06b6d4' },
          { id: 'YOLO', label: 'YOLOv10-SAR', color: '#22c55e' },
          { id: 'DOPPLER', label: 'MICRO-DOPPLER', color: '#10b981' },
          { id: 'GPR', label: '77GHz GPR RADAR', color: '#eab308' },
          { id: 'RETICLE', label: 'TARGET LOCK', color: '#ef4444' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setLayer(tab.id)}
            type="button"
            className="text-[10px] font-mono px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer"
            style={{
              border: `1px solid ${layer === tab.id ? tab.color : t.cardBorder}`,
              background: layer === tab.id ? `${tab.color}25` : (isDark ? 'rgba(2,20,14,0.4)' : 'rgba(255,255,255,0.7)'),
              color: layer === tab.id ? tab.color : (isDark ? 'rgba(167,243,208,0.65)' : 'rgba(4,120,87,0.7)'),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Container */}
      <div className="relative rounded-xl overflow-hidden border shadow-inner" style={{ borderColor: t.cardBorder, background: t.bg }}>
        <svg viewBox="0 0 720 500" className="w-full h-auto select-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <defs>
            {/* Gradients Dark */}
            <linearGradient id="hzTankDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a382b" />
              <stop offset="100%" stopColor="#041a13" />
            </linearGradient>
            <linearGradient id="hzColumnDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#05241b" />
              <stop offset="50%" stopColor="#0e4435" />
              <stop offset="100%" stopColor="#041a13" />
            </linearGradient>
            <radialGradient id="hzSphereDark" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#145a46" />
              <stop offset="70%" stopColor="#06281e" />
              <stop offset="100%" stopColor="#02130e" />
            </radialGradient>

            {/* Gradients Light */}
            <linearGradient id="hzTankLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
            <linearGradient id="hzColumnLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="50%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
            <radialGradient id="hzSphereLight" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="70%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </radialGradient>

            {/* Chemical Plume Density Gradients */}
            <radialGradient id="hzPlumeCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#84cc16" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hzPlumeExpanding" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>

            {/* Thermal Cryogenic Rupture Gradient */}
            <radialGradient id="hzThermalRupture" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>

            {/* Thermal Body Glow */}
            <radialGradient id="hzBodyHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            {/* GPR Pulse Cone */}
            <linearGradient id="hzGprCone" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.04" />
            </linearGradient>

            {/* Grid Pattern */}
            <pattern id="hzGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke={t.grid} strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="720" height="500" fill="url(#hzGrid)" />

          {/* ═══════════════════════════════════════════════════════════════
              GROUND LEVEL & SUBTERRANEAN UTILITY CONDUITS (y: 355 to 475)
             ═══════════════════════════════════════════════════════════════ */}
          {/* Surface Slab */}
          <polygon points="20,355 360,355 700,355 700,380 20,380" fill={t.ground} stroke={t.groundBorder} strokeWidth="1" />
          <line x1="20" y1="355" x2="700" y2="355" stroke={t.groundBorder} strokeWidth="1.2" />

          {/* Subterranean Geological Strata & Bedrock */}
          <rect x="20" y="380" width="680" height="95" fill={t.subVault} stroke={t.subVaultBorder} strokeWidth="0.8" />
          <text x="32" y="465" fill={isDark ? "rgba(167,243,208,0.3)" : "rgba(4,120,87,0.4)"} fontSize="7.5" fontWeight="700">SUB-SURFACE UTILITY CONDUITS & VAULTS (-12M)</text>

          {/* Underground High-Pressure Pipeline Conduits */}
          <line x1="35" y1="410" x2="435" y2="410" stroke={t.pipe} strokeWidth="4.5" />
          <line x1="35" y1="430" x2="435" y2="430" stroke={t.pipe} strokeWidth="3" />
          <circle cx="120" cy="410" r="4.5" fill="#f59e0b" />
          <circle cx="280" cy="410" r="4.5" fill="#f59e0b" />

          {/* ═══════════════════════════════════════════════════════════════
              LOCATION 2: AIR-SEALED UNDERGROUND REFUGE CHAMBER ("SAFE POINT")
              (x: 455 to 680, y: 365 to 460)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            {/* Reinforced Hermetic Bunker Room */}
            <rect x="455" y="365" width="225" height="95" rx="5" fill={t.refugeBg} stroke={t.refugeBorder} strokeWidth="1.8" />
            {/* Interior Ambient Positive Pressure Glow */}
            <rect x="458" y="368" width="219" height="89" rx="3" fill={t.refugeGlow} />

            {/* Heavy Hermetic Pressure Door */}
            <rect x="460" y="375" width="14" height="75" rx="2" fill="#047857" stroke="#10b981" strokeWidth="1" />
            <circle cx="467" cy="412" r="3" fill="#34d399" />
            <text x="463" y="445" fill="#a7f3d0" fontSize="6" fontWeight="700" transform="rotate(-90 463 445)">HERMETIC SEAL</text>

            {/* Positive Pressure Air Scrubber Unit */}
            <rect x="480" y="375" width="24" height="30" rx="2" fill="#065f46" stroke="#10b981" strokeWidth="0.8" />
            <circle cx="492" cy="390" r="6" stroke="#34d399" strokeWidth="0.8" fill="none" strokeDasharray="2 2">
              <animateTransform attributeName="transform" type="rotate" from="0 492 390" to="360 492 390" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Telemetry & Comms Console */}
            <rect x="515" y="415" width="45" height="24" rx="2" fill="#064e3b" stroke="#34d399" strokeWidth="0.8" />
            <line x1="520" y1="422" x2="550" y2="422" stroke="#34d399" strokeWidth="1" />
            <line x1="520" y1="427" x2="545" y2="427" stroke="#34d399" strokeWidth="1" strokeDasharray="3 1" />

            {/* 3 PERSONNEL IN SAFE POINT (Worker 3, 4, 5) */}
            {/* Worker 3 at console (x: 535, y: 410) */}
            <circle cx="535" cy="402" r="4.5" fill="#34d399" stroke="#064e3b" strokeWidth="0.8" />
            <path d="M 529,409 Q 535,406 541,409 L 542,425 L 528,425 Z" fill="#059669" stroke="#064e3b" strokeWidth="0.8" />
            <rect x="531" y="399" width="8" height="3" rx="1.5" fill="#fef08a" />

            {/* Worker 4 seated on bench (x: 575, y: 418) */}
            <circle cx="575" cy="406" r="4.5" fill="#34d399" stroke="#064e3b" strokeWidth="0.8" />
            <path d="M 569,413 Q 575,410 581,413 L 582,428 L 568,428 Z" fill="#059669" stroke="#064e3b" strokeWidth="0.8" />
            <rect x="571" y="403" width="8" height="3" rx="1.5" fill="#fef08a" />

            {/* Worker 5 standing at observation window (x: 620, y: 410) */}
            <circle cx="620" cy="402" r="4.5" fill="#34d399" stroke="#064e3b" strokeWidth="0.8" />
            <path d="M 614,409 Q 620,406 626,409 L 627,425 L 613,425 Z" fill="#059669" stroke="#064e3b" strokeWidth="0.8" />
            <rect x="616" y="399" width="8" height="3" rx="1.5" fill="#fef08a" />

            {/* Safe Point Status Banner */}
            <rect x="545" y="372" width="130" height="18" rx="3" fill={t.hudBg} stroke="#10b981" strokeWidth="0.9" />
            <circle cx="553" cy="381" r="2.5" fill="#10b981">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <text x="560" y="380" fill="#10b981" fontSize="6.8" fontWeight="800">AIR-SEALED SAFE POINT</text>
            <text x="560" y="387" fill={t.hudSub} fontSize="5.8" fontWeight="600">POSITIVE PRESSURE · O₂: 20.9%</text>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
              CHEMICAL PLANT STRUCTURES (Tanks, Columns, Catwalks, Pipes)
             ═══════════════════════════════════════════════════════════════ */}
          {/* UNIT 1: TALL DISTILLATION / CRACKING COLUMN (x: 55 to 115, y: 70 to 355) */}
          <g>
            {/* Main Column Cylinder */}
            <rect x="58" y="80" width="54" height="275" rx="4" fill={t.columnGrad} stroke={t.steelBorder} strokeWidth="1.2" />
            {/* Top Cap */}
            <path d="M 58,80 Q 85,62 112,80 Z" fill={t.steelStructure} stroke={t.steelBorder} strokeWidth="1.2" />
            {/* Structural Flange Rings */}
            {[110, 150, 190, 230, 270, 310].map(y => (
              <g key={`col-ring-${y}`}>
                <line x1="56" y1={y} x2="114" y2={y} stroke={t.steelBorder} strokeWidth="2.5" />
                <rect x="80" y={y-4} width="10" height="8" rx="1" fill="#0f766e" />
              </g>
            ))}
            {/* Base Support Legs */}
            <line x1="62" y1="355" x2="52" y2="375" stroke={t.steelStructure} strokeWidth="4" />
            <line x1="108" y1="355" x2="118" y2="375" stroke={t.steelStructure} strokeWidth="4" />
            {/* Pressure Relief Vent Valve */}
            <line x1="85" y1="62" x2="85" y2="48" stroke="#10b981" strokeWidth="2" />
            <circle cx="85" cy="46" r="3" fill="#f59e0b" />
          </g>

          {/* UNIT 2: SPHERICAL CHEMICAL PRESSURE TANK (Horton Sphere, x: 145 to 245, y: 140 to 240) */}
          <g>
            {/* Angled Tubular Structural Legs */}
            <line x1="155" y1="210" x2="140" y2="355" stroke={t.steelStructure} strokeWidth="3" />
            <line x1="175" y1="230" x2="170" y2="355" stroke={t.steelStructure} strokeWidth="3" />
            <line x1="215" y1="230" x2="220" y2="355" stroke={t.steelStructure} strokeWidth="3" />
            <line x1="235" y1="210" x2="250" y2="355" stroke={t.steelStructure} strokeWidth="3" />
            {/* Cross-bracing ties */}
            <line x1="140" y1="355" x2="220" y2="355" stroke={t.steelBorder} strokeWidth="1" strokeDasharray="3 2" />
            <line x1="170" y1="355" x2="250" y2="355" stroke={t.steelBorder} strokeWidth="1" strokeDasharray="3 2" />

            {/* Horton Sphere Body */}
            <circle cx="195" cy="190" r="48" fill={t.sphereGrad} stroke={t.steelBorder} strokeWidth="1.5" />
            {/* Equatorial Weld Ring & Latitude Seam */}
            <ellipse cx="195" cy="190" rx="48" ry="12" fill="none" stroke={t.steelBorder} strokeWidth="1" strokeDasharray="4 2" />
            <line x1="195" y1="142" x2="195" y2="238" stroke={t.steelBorder} strokeWidth="0.8" strokeDasharray="3 2" />
            {/* Tank Tag */}
            <rect x="168" y="184" width="54" height="12" rx="2" fill="#041a13" stroke="#10b981" strokeWidth="0.7" />
            <text x="173" y="193" fill="#a7f3d0" fontSize="6.5" fontWeight="700">TK-502 LPG</text>
          </g>

          {/* UNIT 4: SECONDARY SEPARATOR & SCRUBBER RIG (x: 485 to 555, y: 110 to 355) */}
          <g>
            <rect x="495" y="125" width="48" height="230" rx="4" fill={t.columnGrad} stroke={t.steelBorder} strokeWidth="1.2" />
            <path d="M 495,125 Q 519,112 543,125 Z" fill={t.steelStructure} stroke={t.steelBorder} strokeWidth="1" />
            {[170, 220, 270, 315].map(y => (
              <line key={`sep-ring-${y}`} x1="493" y1={y} x2="545" y2={y} stroke={t.steelBorder} strokeWidth="2" />
            ))}
          </g>

          {/* UNIT 3: MULTI-LEVEL PIPE RACKS, CATWALKS & MANIFOLDS (x: 112 to 495) */}
          <g>
            {/* Upper Catwalk Level 2 (y: 195) */}
            <rect x="112" y="195" width="383" height="6" fill={t.catwalk} stroke={t.catwalkBorder} strokeWidth="1" />
            <line x1="112" y1="190" x2="495" y2="190" stroke={t.catwalkRailing} strokeWidth="1.2" />
            {/* Railing pickets */}
            {[140, 180, 220, 260, 300, 340, 380, 420, 460].map(x => (
              <line key={`up-rail-${x}`} x1={x} y1={190} x2={x} y2={195} stroke={t.catwalkRailing} strokeWidth="1" />
            ))}

            {/* Lower Catwalk Level 1 (y: 285) */}
            <rect x="112" y="285" width="383" height="7" fill={t.catwalk} stroke={t.catwalkBorder} strokeWidth="1" />
            <line x1="112" y1="279" x2="495" y2="279" stroke={t.catwalkRailing} strokeWidth="1.2" />
            {[140, 180, 220, 260, 300, 340, 380, 420, 460].map(x => (
              <line key={`low-rail-${x}`} x1={x} y1={279} x2={x} y2={285} stroke={t.catwalkRailing} strokeWidth="1" />
            ))}

            {/* Heavy Structural Steel Uprights */}
            <line x1="270" y1="195" x2="270" y2="355" stroke={t.steelStructure} strokeWidth="4" />
            <line x1="390" y1="195" x2="390" y2="355" stroke={t.steelStructure} strokeWidth="4" />

            {/* Overhead Process Piping Array */}
            <line x1="112" y1="170" x2="495" y2="170" stroke={t.pipe} strokeWidth="4" />
            <line x1="112" y1="155" x2="495" y2="155" stroke={t.pipe} strokeWidth="3" />
            <line x1="112" y1="240" x2="495" y2="240" stroke={t.pipe} strokeWidth="5" />

            {/* Vertical Bypass Pipes & Flanged Manifolds */}
            <line x1="310" y1="170" x2="310" y2="260" stroke={t.pipe} strokeWidth="5.5" />
            <line x1="365" y1="240" x2="365" y2="355" stroke={t.pipe} strokeWidth="4" />

            {/* CRITICAL VALVE PIPE RUPTURE POINT AT (310, 260) */}
            <circle cx="310" cy="260" r="6" fill="#ef4444" stroke="#fef08a" strokeWidth="1.5">
              <animate attributeName="r" values="5;8;5" dur="0.8s" repeatCount="indefinite" />
            </circle>
            {/* High-Pressure Leak Hazard Flash */}
            <polygon points="310,260 335,245 345,268" fill={t.leakFlash} opacity="0.85">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
            </polygon>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
              LOCATION 1: TRAPPED PERSONNEL IN TOXIC DANGER ZONE
              (Worker 1 Collapsed at x: 285, Worker 2 Slumped at x: 340)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            {/* Worker 1: Unconscious / collapsed prone on catwalk at (285, 282) */}
            <ellipse cx="282" cy="281" rx="5" ry="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <rect x="272" y="280" width="18" height="5" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
            {/* Hardhat rolled off */}
            <circle cx="292" cy="283" r="2.5" fill="#eab308" />

            {/* Worker 2: Disoriented / slumped against pipe railing at (342, 342) */}
            <circle cx="342" cy="334" r="4.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <path d="M 336,342 Q 342,339 348,342 L 349,355 L 335,355 Z" fill="#92400e" stroke="#78350f" strokeWidth="0.8" />
            <rect x="338" y="331" width="8" height="3" rx="1.5" fill="#eab308" />
            {/* Oxygen mask held in hand */}
            <circle cx="347" cy="344" r="2" fill="#0284c7" />
          </g>

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 1: CHEMICAL ARRAY (Toxic Plume Dispersion Model)
             ═══════════════════════════════════════════════════════════════ */}
          {showChemical && (
            <g id="hz-chemical-layer">
              {/* Expanding Volumetric Gas Plume Layers from Rupture Point (310, 260) */}
              {/* Core Extreme Toxicity Zone (Red / Orange) */}
              <ellipse cx="325" cy="265" rx="35" ry="24" fill="url(#hzPlumeCore)">
                <animate attributeName="rx" values="32;42;32" dur="2s" repeatCount="indefinite" />
                <animate attributeName="ry" values="22;28;22" dur="2s" repeatCount="indefinite" />
              </ellipse>

              {/* Mid-Level Toxic Vapor Cloud (Lime / Green) */}
              <ellipse cx="345" cy="275" rx="75" ry="48" fill="url(#hzPlumeExpanding)">
                <animate attributeName="rx" values="68;86;68" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0.75;0.45" dur="2.8s" repeatCount="indefinite" />
              </ellipse>

              {/* Lower Dispersal Cloud rolling toward ground */}
              <ellipse cx="330" cy="325" rx="90" ry="40" fill="url(#hzPlumeExpanding)">
                <animate attributeName="rx" values="82;102;82" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0.65;0.35" dur="3.2s" repeatCount="indefinite" />
              </ellipse>

              {/* Color-Coded Dispersion Density Flow Vectors */}
              {[
                [310, 260, 360, 245],
                [320, 270, 390, 275],
                [315, 280, 380, 320],
                [305, 290, 345, 345],
              ].map(([x1, y1, x2, y2], i) => (
                <line key={`vector-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#84cc16" strokeWidth="1.2" strokeDasharray="4 2">
                  <animate attributeName="strokeDashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
                </line>
              ))}

              {/* Chemical Array HUD Callout */}
              <g transform="translate(18, 92)">
                <rect x="0" y="0" width="220" height="26" rx="4" fill={t.hudBg} stroke="#84cc16" strokeWidth="0.9" />
                <text x="8" y="11" fill="#84cc16" fontSize="7.2" fontWeight="700">CHEMICAL ARRAY: TOXIC PLUME DISPERSION</text>
                <text x="8" y="21" fill={t.hudSub} fontSize="6.8" fontWeight="600">CHLORINE/NH₃: 880 PPM · SPREAD: 14.2 m/s</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 2: FLIR THERMAL (Leak Source Localization)
             ═══════════════════════════════════════════════════════════════ */}
          {showFlir && (
            <g id="hz-flir-layer">
              {/* Cryogenic Joule-Thomson Rapid Expansion Cold Zone at Rupture */}
              <circle cx="310" cy="260" r="22" fill="url(#hzThermalRupture)">
                <animate attributeName="r" values="18;26;18" dur="1.8s" repeatCount="indefinite" />
              </circle>

              {/* Body Heat Halos of Trapped Workers */}
              <circle cx="282" cy="281" r="16" fill="url(#hzBodyHeat)">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="342" cy="342" r="18" fill="url(#hzBodyHeat)">
                <animate attributeName="opacity" values="0.75;1;0.75" dur="2.2s" repeatCount="indefinite" />
              </circle>

              {/* FLIR Scanning Laser Vector from Drone 5-3 */}
              <line x1="260" y1="235" x2="310" y2="260" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="3 2">
                <animate attributeName="strokeDashoffset" values="0;20" dur="0.8s" repeatCount="indefinite" />
              </line>

              {/* FLIR HUD Callout */}
              <g transform="translate(18, 175)">
                <rect x="0" y="0" width="205" height="24" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.9" />
                <text x="8" y="10" fill="#ef4444" fontSize="7.2" fontWeight="700">FLIR THERMAL: RUPTURE SOURCE DETECTED</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">DELTA T: 48°C · CRYOGENIC EXPANSION: -24°C</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 3: ACOUSTIC BEAMFORMING ARRAY (Leak Hiss & SOS)
             ═══════════════════════════════════════════════════════════════ */}
          {showAcoustic && (
            <g id="hz-acoustic-layer">
              {/* Concentric Ultrasonic Pressurized Jet Hiss Rings from (310, 260) */}
              {[14, 28, 45, 65].map((r, idx) => (
                <circle key={`leak-hiss-${idx}`} cx="310" cy="260" r={r} fill="none" stroke="#f59e0b" strokeWidth="1.1" strokeDasharray="3 2">
                  <animate attributeName="r" values={`${r};${r+20};${r+40}`} dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.3;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              ))}

              {/* Acoustic Vector Ray to Drone 5-4 */}
              <line x1="310" y1="260" x2="450" y2="220" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />

              {/* Acoustic HUD Callout */}
              <g transform="translate(485, 260)">
                <rect x="0" y="0" width="215" height="24" rx="4" fill={t.hudBg} stroke="#f59e0b" strokeWidth="0.9" />
                <text x="8" y="10" fill="#f59e0b" fontSize="7.2" fontWeight="700">ACOUSTIC ARRAY: LEAK HISS & VOICE</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">PRESSURIZED JET HISS: 18.5kHz · BEARING: 242°</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 4: VISUAL YOLOv10-SAR WITH BOUNDING BOXES
             ═══════════════════════════════════════════════════════════════ */}
          {showYolo && (
            <g id="hz-yolo-layer">
              {/* Bounding Box on Worker 1 (Unconscious) */}
              <rect x="270" y="274" width="28" height="18" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="2 2">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
              </rect>
              <rect x="270" y="265" width="46" height="9" rx="1.5" fill="#ef4444" />
              <text x="272" y="272" fill="#ffffff" fontSize="5.8" fontWeight="800">UNCONSCIOUS 0.96</text>

              {/* Bounding Box on Worker 2 (Exposed) */}
              <rect x="332" y="326" width="22" height="34" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="2 2">
                <animate attributeName="strokeOpacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
              </rect>
              <rect x="332" y="317" width="42" height="9" rx="1.5" fill="#f59e0b" />
              <text x="334" y="324" fill="#02150a" fontSize="5.8" fontWeight="800">EXPOSED 0.94</text>

              {/* Bounding Box on Safe Point Workers Group (460, 390 to 650, 440) */}
              <rect x="522" y="394" width="112" height="42" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="3 2" />
              <rect x="522" y="384" width="70" height="10" rx="2" fill="#22c55e" />
              <text x="525" y="391" fill="#02150a" fontSize="6.2" fontWeight="800">SAFE PERSONNEL 0.98</text>

              {/* YOLO Real-Time HUD Banner */}
              <g transform="translate(18, 130)">
                <rect x="0" y="0" width="225" height="28" rx="4" fill={t.hudBg} stroke="#22c55e" strokeWidth="0.9" />
                <circle cx="10" cy="10" r="3.2" fill="#22c55e">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                </circle>
                <text x="18" y="11" fill="#22c55e" fontSize="7.5" fontWeight="800">YOLOv10-SAR: HUMAN CLASSIFIER</text>
                <text x="8" y="22" fill={t.hudSub} fontSize="6.8" fontWeight="600">5 WORKERS TRACKED · CONFIDENCE 0.96</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 5: LIVOX LIDAR / FAST-LIO2 (3D CAD & EVAC PATH)
             ═══════════════════════════════════════════════════════════════ */}
          {showLidar && (
            <g id="hz-lidar-layer">
              {/* Cyan 3D CAD Wireframe Overlay on structural pipe corridors */}
              <path d="M 112,170 L 270,170 L 310,195 L 390,195 L 495,195" stroke="#06b6d4" strokeWidth="1" fill="none" strokeDasharray="2 2" />
              <path d="M 112,240 L 270,240 L 310,260 L 390,260 L 495,260" stroke="#06b6d4" strokeWidth="1" fill="none" strokeDasharray="2 2" />

              {/* Animated Cyan Frustum Scanning from Drone 5-2 */}
              <polygon points="160,115 110,195 240,195" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 2" />

              {/* Glowing Green Clean Evacuation Pathway Beam */}
              <path d="M 285,285 L 230,285 L 180,355 L 455,355 L 470,390" stroke="#10b981" strokeWidth="2.2" fill="none" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* FAST-LIO2 HUD Callout */}
              <g transform="translate(485, 92)">
                <rect x="0" y="0" width="215" height="24" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
                <text x="8" y="10" fill="#06b6d4" fontSize="7.2" fontWeight="700">FAST-LIO2: 3D PLANT MESH & EVAC</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">PATHWAY CLEAR · STABILITY: 94%</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 6: 77GHz GPR RADAR (Underground Utility Scan)
             ═══════════════════════════════════════════════════════════════ */}
          {showGpr && (
            <g id="hz-gpr-layer">
              {/* Focused GPR Copper/Gold Pulse Cone into Subterranean Vaults */}
              <polygon points="210,355 120,470 340,470" fill="url(#hzGprCone)" stroke="#eab308" strokeWidth="0.8" strokeDasharray="3 2">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
              </polygon>

              {/* Underground GPR Depth Reflections */}
              {[30, 60, 95].map((d, i) => (
                <line key={`gpr-depth-${i}`} x1={150 - i * 15} y1={365 + d} x2={300 + i * 15} y2={365 + d} stroke="#eab308" strokeWidth="1" strokeDasharray="4 2">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.6s" repeatCount="indefinite" />
                </line>
              ))}

              {/* GPR HUD Callout */}
              <g transform="translate(18, 420)">
                <rect x="0" y="0" width="220" height="24" rx="4" fill={t.hudBg} stroke="#eab308" strokeWidth="0.9" />
                <text x="8" y="10" fill="#eab308" fontSize="7.2" fontWeight="700">GPR SCAN: UNDERGROUND INTEGRITY</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">UTILITY CONDUITS INTACT · ZERO SINKHOLE</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 7: MICRO-DOPPLER RADAR (Thoracic Respiration)
             ═══════════════════════════════════════════════════════════════ */}
          {showDoppler && (
            <g id="hz-doppler-layer">
              {/* Pulsating Sinusoidal Wave Traversing Chemical Smoke to Unconscious Worker */}
              <path d="M 345,140 Q 320,180 300,220 T 285,282" stroke="#10b981" strokeWidth="1.6" fill="none" strokeDasharray="4 2">
                <animate attributeName="strokeDashoffset" values="0;24" dur="1s" repeatCount="indefinite" />
              </path>

              {/* Thoracic Respiration Waves on Worker 1 & 2 */}
              <circle cx="282" cy="281" r="12" stroke="#10b981" strokeWidth="1.2" fill="none">
                <animate attributeName="r" values="8;16;8" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="342" cy="342" r="14" stroke="#10b981" strokeWidth="1.2" fill="none">
                <animate attributeName="r" values="8;18;8" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* Micro-Doppler HUD Callout */}
              <g transform="translate(18, 310)">
                <rect x="0" y="0" width="220" height="24" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="0.9" />
                <text x="8" y="10" fill="#10b981" fontSize="7.2" fontWeight="700">MICRO-DOPPLER: THORACIC RESPIRATION</text>
                <text x="8" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">DETECTED (16 BPM) · CRITICAL HYPOXIA RISK</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SENSOR OVERLAY 8: DETECTION EVENT TARGET RETICLES
             ═══════════════════════════════════════════════════════════════ */}
          {showReticle && (
            <g id="hz-reticle-layer">
              {/* Reticle 1 on Toxic Danger Zone (x: 310, y: 310) */}
              <circle cx="310" cy="310" r="32" stroke="#ef4444" strokeWidth="1.4" fill="none" strokeDasharray="6 3">
                <animateTransform attributeName="transform" type="rotate" from="0 310 310" to="360 310 310" dur="6s" repeatCount="indefinite" />
              </circle>
              <line x1="270" y1="310" x2="350" y2="310" stroke="#ef4444" strokeWidth="0.9" />
              <line x1="310" y1="270" x2="310" y2="350" stroke="#ef4444" strokeWidth="0.9" />
              {/* Callout Card 1 */}
              <g transform="translate(165, 370)">
                <line x1="145" y1="0" x2="145" y2="-28" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                <rect x="0" y="0" width="245" height="30" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="1.2" />
                <text x="8" y="11" fill="#ef4444" fontSize="7.5" fontWeight="800">VICTIM DETECTED: 2 WORKERS (TOXIC ZONE)</text>
                <text x="8" y="23" fill={t.hudSub} fontSize="6.8" fontWeight="600">O2 REQ · 1kg MINI CYLINDER PAYLOAD DEPLOYED</text>
              </g>

              {/* Reticle 2 on Safe Point (x: 580, y: 415) */}
              <circle cx="580" cy="415" r="28" stroke="#10b981" strokeWidth="1.4" fill="none" strokeDasharray="6 3">
                <animateTransform attributeName="transform" type="rotate" from="0 580 415" to="-360 580 415" dur="6s" repeatCount="indefinite" />
              </circle>
              {/* Callout Card 2 */}
              <g transform="translate(460, 460)">
                <rect x="0" y="0" width="235" height="26" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="1.2" />
                <text x="8" y="11" fill="#10b981" fontSize="7.5" fontWeight="800">PERSONNEL LOCATED: 3 WORKERS (SAFE POINT)</text>
                <text x="8" y="21" fill={t.hudSub} fontSize="6.8" fontWeight="600">SEALED REFUGE · TELEMETRY STABLE · NO CASUALTY</text>
              </g>
            </g>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              SPECIALIZED INDUSTRIAL HAZMAT DRONES (Locked Static Positions)
             ═══════════════════════════════════════════════════════════════ */}

          {/* ── DRONE 5-1: HAZMAT PLUME ANALYZING (GAS DISPERSION at 345, 140) ── */}
          <g transform="translate(345, 140)">
            {/* Hexacopter Arms & Rotors */}
            {[-16, 0, 16].map(x => (
              <g key={`d51-arm-${x}`}>
                <line x1={x} y1="-5" x2={x} y2="5" stroke="#10b981" strokeWidth="1.2" />
                <ellipse cx={x} cy="-6" rx="7" ry="2.5" stroke="#10b981" strokeWidth="0.8" fill="rgba(16,185,129,0.2)" strokeDasharray="2 1" />
                <ellipse cx={x} cy="6" rx="7" ry="2.5" stroke="#10b981" strokeWidth="0.8" fill="rgba(16,185,129,0.2)" strokeDasharray="2 1" />
              </g>
            ))}
            <rect x="-10" y="-5" width="20" height="10" rx="3" fill="#042016" stroke="#10b981" strokeWidth="1" />
            <circle cx="0" cy="0" r="2.5" fill="#34d399" />
            {/* 1kg Mini O2 payload release latch */}
            <rect x="-3" y="6" width="6" height="5" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
          </g>
          {/* Drone 5-1 Status Tag */}
          <g transform="translate(380, 125)">
            <line x1="0" y1="12" x2="-20" y2="12" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="220" height="24" rx="4" fill={t.hudBg} stroke="#10b981" strokeWidth="0.9" />
            <text x="6" y="10" fill="#10b981" fontSize="7.2" fontWeight="700">DRONE 5-1: HAZMAT PLUME ANALYZING</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">GAS DISPERSION MAPPING · 880 PPM CORE</text>
          </g>

          {/* ── DRONE 5-2: LIVOX LIDAR / FAST-LIO2 (3D CAD & STRUCTURAL MAPPING at 160, 115) ── */}
          <g transform="translate(160, 115)">
            <ellipse cx="-11" cy="-4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="-4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-11" cy="4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="4" rx="8" ry="3" stroke="#06b6d4" strokeWidth="0.8" fill="rgba(6,182,212,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#04121e" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <circle cx="0" cy="-3" r="2.8" fill="#06b6d4" opacity="0.9" />
          </g>
          {/* Drone 5-2 Status Tag */}
          <g transform="translate(18, 55)">
            <line x1="85" y1="24" x2="140" y2="55" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="220" height="24" rx="4" fill={t.hudBg} stroke="#06b6d4" strokeWidth="0.9" />
            <text x="6" y="10" fill="#06b6d4" fontSize="7.2" fontWeight="700">DRONE 5-2: LIVOX LIDAR / FAST-LIO2</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">3D CAD & STRUCTURAL MAPPING ACTIVE</text>
          </g>

          {/* ── DRONE 5-3: FLIR THERMAL (LEAK SOURCE LOCALIZATION at 260, 235) ── */}
          <g transform="translate(260, 235)">
            <ellipse cx="-11" cy="-4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="-4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-11" cy="4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="4" rx="8" ry="3" stroke="#ef4444" strokeWidth="0.8" fill="rgba(239,68,68,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#180404" stroke="#ef4444" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            <circle cx="3" cy="2" r="1.8" fill="#ef4444" />
          </g>
          {/* Drone 5-3 Status Tag */}
          <g transform="translate(18, 220)">
            <line x1="185" y1="12" x2="245" y2="15" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="205" height="24" rx="4" fill={t.hudBg} stroke="#ef4444" strokeWidth="0.9" />
            <text x="6" y="10" fill="#ef4444" fontSize="7.2" fontWeight="700">DRONE 5-3: FLIR THERMAL</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">LEAK SOURCE LOCALIZATION ACTIVE</text>
          </g>

          {/* ── DRONE 5-4: ACOUSTIC BEAMFORMING (HIGH-PRESSURE LEAK & SOS at 450, 220) ── */}
          <g transform="translate(450, 220)">
            <ellipse cx="-11" cy="-4" rx="8" ry="3" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="-4" rx="8" ry="3" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="-11" cy="4" rx="8" ry="3" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <ellipse cx="11" cy="4" rx="8" ry="3" stroke="#f59e0b" strokeWidth="0.8" fill="rgba(245,158,11,0.2)" strokeDasharray="2 2" />
            <rect x="-6" y="-5" width="12" height="10" rx="2" fill="#1b1202" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.8" fill="#10b981" />
            {/* 4-mic Acoustic Beamforming Array cross */}
            <circle cx="-3" cy="-2" r="1" fill="#fef08a" />
            <circle cx="3" cy="-2" r="1" fill="#fef08a" />
            <circle cx="-3" cy="2" r="1" fill="#fef08a" />
            <circle cx="3" cy="2" r="1" fill="#fef08a" />
          </g>
          {/* Drone 5-4 Status Tag */}
          <g transform="translate(485, 205)">
            <line x1="0" y1="12" x2="-25" y2="15" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="0" y="0" width="220" height="24" rx="4" fill={t.hudBg} stroke="#f59e0b" strokeWidth="0.9" />
            <text x="6" y="10" fill="#f59e0b" fontSize="7.2" fontWeight="700">DRONE 5-4: ACOUSTIC BEAMFORMING</text>
            <text x="6" y="19" fill={t.hudSub} fontSize="6.8" fontWeight="600">HIGH-PRESSURE LEAK HISS & SOS</text>
          </g>

          {/* Bottom HUD Legend Line */}
          <text x="24" y="488" fill={isDark ? "rgba(167,243,208,0.4)" : "rgba(4,120,87,0.5)"} fontSize="7.5">
            HAZMAT MULTI-MODAL FUSION: CHEMICAL ARRAY · FLIR BOSON 640 · ACOUSTIC CNN · LIVOX LIDAR · YOLOv10-SAR · SIH26177
          </text>
        </svg>
      </div>
    </div>
  );
}

const SCENARIOS = [
  {
    id: 'fire',
    icon: Flame,
    label: 'Urban Fire',
    color: '#ef4444',
    lightColor: '#fca5a5',
    challenge: 'Smoke renders optical cameras useless. Structural collapse imminent. HAZMAT risk.',
    sensors: [
      'FLIR Boson 640 — Heat mapping through smoke',
      'Livox LiDAR — 3D rubble mapping',
      'Acoustic CNN — Voice through walls',
    ],
    intervention: '1kg mini O₂ cylinder dropped; fire perimeter 3D mapped for suppression teams',
  },
  {
    id: 'flood',
    icon: Droplets,
    label: 'Flash Flood',
    color: '#3b82f6',
    lightColor: '#93c5fd',
    challenge: 'Victims on rooftops in fast-rising water. GPS unreliable due to cloud cover. Night conditions.',
    sensors: [
      'FLIR Boson 640 — Thermal body heat tracking on wet surfaces',
      'Acoustic Beamforming Array — Voice & distress signal detection through water noise',
      'Visual YOLOv10-SAR — Real-time bounding box victim classification',
      '77 GHz FMCW / GPR Radar — Sub-surface mapping through turbid floodwater',
      'Micro-Doppler Radar — Vital signs & thoracic breathing motion detection',
    ],
    intervention: 'Victim coordinates relayed to water rescue teams; life payload & compact 1kg mini O₂ cylinder dropped to stranded survivors',
  },
  {
    id: 'earthquake',
    icon: Mountain,
    label: 'Earthquake',
    color: '#8b5cf6',
    lightColor: '#c4b5fd',
    challenge: 'Victims trapped beneath collapsed slabs. No GPS. Complete darkness. Structural instability.',
    sensors: [
      'FLIR Boson 640 — Thermal heat flares tracking trapped body heat',
      'Livox LiDAR / FAST-LIO2 — 3D mesh & internal void space mapping',
      '77 GHz FMCW GPR — Sub-surface depth mapping through collapsed concrete slabs',
      'Micro-Doppler Radar — Heartbeat (12 BPM) & vital signs through 45cm concrete',
      'Acoustic Beamforming Array — Distant voice & tapping detection through rubble',
      'Visual YOLOv10-SAR — Real-time bounding box human classifier',
    ],
    intervention: '1kg mini O₂ cylinder deployed into detected void space; rescue drill guidance to NDRF',
  },
  {
    id: 'mining',
    icon: HardHat,
    label: 'Rat-Hole Mining',
    color: '#f59e0b',
    lightColor: '#fde68a',
    challenge: 'Tunnels too narrow for humans (<40cm). Explosive methane & CO gas buildup. Total darkness. Zero-GPS.',
    sensors: [
      'FLIR Boson 640 — Gas differential & thermal body heat detected',
      'Livox LiDAR / FAST-LIO2 — 3D tunnel mesh & rockfall blockade mapped',
      '77 GHz FMCW GPR Radar — Sub-surface cavity & deep strata mapping',
      'Micro-Doppler Radar — Thoracic respiration detected (14 BPM) through rock',
      'Acoustic CNN Array — SOS wall tapping detected (Freq: 420Hz)',
      'Visual YOLOv10-SAR — Zero-light night-vision miner classification',
    ],
    intervention: 'Micro-slither drone penetrates 38cm collapsed shaft; compact 1kg mini O₂ cylinder delivered to trapped miners; structural & gas safety map beamed to NDRF',
  },
  {
    id: 'hazmat',
    icon: AlertTriangle,
    label: 'Industrial HAZMAT',
    color: '#10b981',
    lightColor: '#a7f3d0',
    challenge: 'High-pressure toxic chemical plume. Explosive atmosphere. Catwalk collapse risk. Immediate lethal peril to rescuers.',
    sensors: [
      'Chemical Plume Dispersion Array — Real-time toxic gas density & vapor plume modeling',
      'FLIR Boson 640 Thermal — High-pressure pipe rupture point & body heat localization',
      'Acoustic Beamforming Array — Ultrasonic leak hiss & worker distress detection',
      'Livox LiDAR / FAST-LIO2 — 3D plant CAD mesh & safe evacuation routing',
      'Visual YOLOv10-SAR — Autonomous human classifier & toxicity exposure grading',
      '77 GHz FMCW GPR Radar — Subterranean pipe conduit & chemical vault scanning',
      'Micro-Doppler Radar — Thoracic respiration (16 BPM) tracking through chemical smoke',
    ],
    intervention: 'Autonomous drone delivers compact 1kg mini O₂ cylinder into toxic cloud; positive-pressure escape vector beamed to safe point & NDRF HAZMAT unit',
  },
];

export default function Scenarios({ dark }) {
  const outlet = useOutletContext();
  const isDark = dark ?? outlet?.dark ?? true;
  const [active, setActive] = useState(0);
  const sc = SCENARIOS[active];
  const Icon = sc.icon;

  return (
    <div className="page-wrapper">
      <div className="warm-orb w-[400px] h-[400px] bg-orange-600/8 top-0 left-0" />

      <div className="container-xl py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto justify-center">5 Disaster Typologies</div>
          <h1 className="display-heading text-4xl md:text-5xl mb-4">
            Every Disaster. <span className="brand-text">One System.</span>
          </h1>
          <p className="text-orange-200/50 max-w-xl mx-auto">
            Drishti-Swarm Net is designed to operate across all five major disaster scenarios
            faced by NDRF, SDRF, and municipal fire departments in India.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SCENARIOS.map((s, i) => {
            const SIcon = s.icon;
            return (
              <button
                key={s.id}
                id={`scenario-tab-${s.id}`}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: active === i ? s.color : (isDark ? 'rgba(249,115,22,0.2)' : 'rgba(180,83,9,0.2)'),
                  background: active === i ? `${s.color}18` : 'transparent',
                  color: active === i ? (isDark ? s.lightColor : s.color) : (isDark ? 'rgba(253,186,116,0.6)' : 'rgba(120,53,15,0.7)'),
                }}
              >
                <SIcon size={14} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div key={sc.id} className="grid md:grid-cols-2 gap-8 items-start animate-fade-in">
          {/* Illustration Container */}
          <div className="card-glow p-6 md:p-8">
            {/* UI Header of scenario illustration (Preserved as is) */}
            <div className="mb-4 flex items-center gap-3">
              <div className="p-2 rounded-lg border" style={{ borderColor: `${sc.color}50`, background: `${sc.color}15` }}>
                <Icon size={18} style={{ color: sc.color }} />
              </div>
              <div>
                <p className="font-semibold text-orange-100">{sc.label} Response</p>
                <p className="text-xs text-orange-200/40 font-mono">Swarm Deployment Illustration</p>
              </div>
            </div>

            {/* Illustration embedding */}
            {sc.id === 'fire' ? (
              <UrbanFireIsometricIllustration isDark={isDark} />
            ) : sc.id === 'flood' ? (
              <FlashFloodIsometricIllustration isDark={isDark} />
            ) : sc.id === 'earthquake' ? (
              <EarthquakeIsometricIllustration isDark={isDark} />
            ) : sc.id === 'mining' ? (
              <RatHoleMiningIsometricIllustration isDark={isDark} />
            ) : sc.id === 'hazmat' ? (
              <IndustrialHazmatIsometricIllustration isDark={isDark} />
            ) : (
              sc.svg
            )}

            <p className="text-xs font-mono text-orange-200/30 text-center mt-3">Interactive cross-section — Drishti swarm deployment</p>
          </div>

          {/* Info Side Panel */}
          <div className="space-y-6">
            {/* Challenge */}
            <div className="card" style={{ borderColor: `${sc.color}25`, background: `${sc.color}07` }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2" style={{ color: sc.color }}>The Challenge</p>
              <p className="text-sm text-orange-200/65 leading-relaxed">{sc.challenge}</p>
            </div>

            {/* Sensors */}
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400/60 mb-3">Active Sensor Modalities</p>
              <div className="space-y-2">
                {sc.sensors.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-orange-900/30 bg-brand-850/50">
                    <span className="text-xs text-orange-500 font-mono mt-0.5">0{i+1}</span>
                    <p className="text-sm text-orange-200/60">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drone Intervention */}
            <div className="p-4 rounded-xl border" style={{ borderColor: `${sc.color}35`, background: `${sc.color}0d` }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: sc.color }}>Swarm Intervention</p>
              <p className="text-sm font-medium" style={{ color: isDark ? sc.lightColor : sc.color }}>{sc.intervention}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
