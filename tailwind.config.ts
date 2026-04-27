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
        primary: {
          50: '#EEF0FF',
          100: '#DDE1FF',
          200: '#BBC3FF',
          300: '#99A5FF',
          400: '#7782FC',
          500: '#595FF7',
          600: '#4B51E8',
          700: '#3D43D0',
          800: '#2F35A8',
          900: '#1F2375',
        },
        secondary: {
          500: '#8EC9DC',
          600: '#5AA3BA',
          700: '#407A8F',
        },
        highlight: {
          500: '#F7C159',
          600: '#E5A93F',
        },
        danger: {
          500: '#FC354D',
          600: '#E0243B',
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
        card: '1.125rem',
        chip: '1.5rem',
        '3xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.06)',
        'card-dark': '0 8px 32px rgba(0,0,0,0.35)',
        'card-hover': '0 12px 40px rgba(89,95,247,0.15)',
        glow: '0 0 0 2px rgba(89,95,247,0.2)',
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
