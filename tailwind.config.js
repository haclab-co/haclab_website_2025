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
        'haclab-red': '#E41E26',
        'haclab-dark-red': '#C41920',
        'haclab-light-red': '#F04C53',
        'code-bg': '#1E1E1E',
        'code-text': '#D4D4D4',
        'code-comment': '#6A9955',
        'code-keyword': '#569CD6',
        'code-string': '#CE9178',
        'code-function': '#DCDCAA',
        'code-variable': '#9CDCFE',
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-border': '#333333',
        'light-bg': '#F8F9FA',
        'light-surface': '#FFFFFF',
        'light-border': '#E0E0E0',
      },
      fontFamily: {
        'code': ['Fira Code', 'JetBrains Mono', 'monospace'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'circuit-pattern': "url('/images/circuit-pattern.svg')",
        'code-pattern': "url('/images/code-pattern.svg')",
        'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typewriter: {
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(228, 30, 38, 0.5)',
        'glow-sm': '0 0 8px rgba(228, 30, 38, 0.3)',
        'glow-lg': '0 0 30px rgba(228, 30, 38, 0.5)',
        'inner-glow': 'inset 0 0 15px rgba(228, 30, 38, 0.5)',
      },
    },
  },
  plugins: [],
};
