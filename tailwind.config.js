/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#070200',
          900: '#0d0400',
          850: '#130600',
          800: '#1a0800',
          750: '#220b00',
          700: '#2d1000',
          600: '#431500',
          500: '#7c2d12',
          400: '#c2410c',
          300: '#ea580c',
          200: '#f97316',
          100: '#fb923c',
          50:  '#fed7aa',
        },
        ember: {
          600: '#b45309',
          500: '#d97706',
          400: '#f59e0b',
          300: '#fbbf24',
          200: '#fde68a',
          100: '#fef3c7',
        },
      },
      fontFamily: {
        sans:    ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
        'ping-slow':   'ping 3s cubic-bezier(0,0,.2,1) infinite',
        'slide-up':    'slideUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'draw-line':   'drawLine 1.5s ease-out forwards',
        'node-pulse':  'nodePulse 2s ease-in-out infinite',
      },
      keyframes: {
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulseGlow: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.45 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        drawLine:  { from: { strokeDashoffset: 1000 }, to: { strokeDashoffset: 0 } },
        nodePulse: { '0%,100%': { r: 4 }, '50%': { r: 6 } },
      },
      backgroundImage: {
        'brand-gradient':  'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #b45309 100%)',
        'brand-radial':    'radial-gradient(ellipse at center, #f97316 0%, #ea580c 60%, transparent 100%)',
        'warm-dark':       'radial-gradient(ellipse at 30% 20%, #1a0800 0%, #0d0400 60%, #070200 100%)',
      },
      boxShadow: {
        'brand-sm': '0 0 12px rgba(249,115,22,0.25)',
        'brand-md': '0 0 24px rgba(249,115,22,0.35)',
        'brand-lg': '0 0 50px rgba(249,115,22,0.30)',
        'ember':    '0 0 20px rgba(245,158,11,0.3)',
        'inner-brand': 'inset 0 0 30px rgba(249,115,22,0.05)',
      },
    },
  },
  plugins: [
    function({ addVariant }) { addVariant('light', ':is(.light &)'); },
  ],
}
