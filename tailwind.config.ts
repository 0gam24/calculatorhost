import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2026-07-08 리브랜딩 (docs/bundle.html 시안) — 딥 틸 그린 램프
        primary: {
          50: '#f0f7f5',
          100: '#e2efeb',
          200: '#c5e2da',
          300: '#8fc7ba',
          400: '#2f9b85',
          500: '#1f7d6b',
          600: '#1a6b5c',
          700: '#14584c',
          800: '#103f37',
          900: '#0b2c26',
        },
        secondary: {
          500: '#5f6b76',
          600: '#4a545e',
          700: '#2a3742',
        },
        highlight: {
          500: '#c68b2c',
          600: '#9c6413',
        },
        danger: {
          500: '#dc2626',
          600: '#b23a2f',
        },
        success: {
          500: '#22C55E',
          600: '#16A34A',
        },
        bg: {
          base: 'var(--bg-base)',
          card: 'var(--bg-card)',
          raised: 'var(--bg-raised)',
          sidebar: 'var(--bg-sidebar)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        border: {
          base: 'var(--border-base)',
          subtle: 'var(--border-subtle)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'Menlo', 'monospace'],
      },
      fontSize: {
        hero: ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-xl': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        // bundle.html 시안: --radius .5rem 기조 (카드는 한 단계 여유)
        card: '0.75rem',
        chip: '0.5rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(14,23,32,0.07)',
        'card-dark': '0 8px 32px rgba(0,0,0,0.35)',
        'card-hover': '0 8px 24px rgba(20,88,76,0.14)',
        glow: '0 0 0 2px rgba(31,125,107,0.25)',
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
