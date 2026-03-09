/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:  'var(--color-bg-primary)',
          surface:  'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          hover:    'var(--color-bg-hover)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          bright:  'var(--color-border-bright)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
        },
        accent: {
          amber:      'var(--color-accent-amber)',
          'amber-dim':'var(--color-accent-amber-dim)',
          cyan:       'var(--color-accent-cyan)',
          'cyan-dim': 'var(--color-accent-cyan-dim)',
        },
        status: {
          healthy:  'var(--color-status-healthy)',
          warning:  'var(--color-status-warning)',
          critical: 'var(--color-status-critical)',
          unknown:  'var(--color-status-unknown)',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'amber-glow': 'var(--shadow-amber-glow)',
        'cyan-glow':  'var(--shadow-cyan-glow)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'count-up':  'count-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.25' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
