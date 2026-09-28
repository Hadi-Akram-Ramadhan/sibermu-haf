import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background-rgb, 250 250 247) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb, 255 255 255) / <alpha-value>)',
        primary: 'rgb(var(--color-primary-rgb, 11 93 59) / <alpha-value>)',
        'primary-hover': 'var(--color-primary-hover)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent-gold': 'var(--color-accent-gold)',
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        body: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      // Skala tipografi dramatis untuk headline
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.25rem, 5.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      // Spacing generous — whitespace sebagai struktur
      spacing: {
        'section': 'clamp(5rem, 10vw, 9rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
      },
    },
  },
  plugins: [],
};

export default config;
