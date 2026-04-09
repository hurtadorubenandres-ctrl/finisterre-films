const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Absolute paths — resolves correctly regardless of process.cwd()
  content: [
    path.join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── A24-exact palette ─────────────────────────────
        'a24-black':         '#000000',
        'a24-white':         '#ffffff',
        'a24-off-white':     '#f1f1f1',
        'a24-gray-light':    '#cacaca',
        'a24-gray-mid':      '#888888',
        'a24-gray-dark':     '#555555',
        'a24-section-light': '#eeeeee',
        'a24-section-dark':  '#222222',
        'a24-green':         '#b0e9ac',
        'a24-orange':        '#f95936',
        'a24-blue':          '#3860be',
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'hero':    ['clamp(2.5rem, 8vw, 6.5rem)', { lineHeight: '0.93', letterSpacing: '-0.015em' }],
        'display': ['clamp(2rem, 5vw, 4rem)',     { lineHeight: '1.0',  letterSpacing: '-0.01em'  }],
        'heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.005em' }],
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in':   'scaleIn 0.3s ease-out',
        'reveal':     'reveal 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:   { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        reveal:    { '0%': { transform: 'translateY(32px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-overlay':      'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)',
        'spotlight-overlay': 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.05) 100%)',
        'card-overlay':      'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
