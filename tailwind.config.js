/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDFCF7',
          100: '#FAF6E6',
          200: '#F5ECBF',
          300: '#EFC548', // Brand Anchor Gold-Yellow
          400: '#E5B730',
          500: '#EFC548',
          600: '#D4A41B',
          700: '#A97F12',
          800: '#7E5D0A',
          900: '#533C05',
        },
        navy: {
          50: '#F4F6FA',
          100: '#E8ECF5',
          200: '#C7D2E7',
          300: '#95A9D0',
          400: '#5E7BB2',
          500: '#38538E',
          600: '#273C6E',
          700: '#1B2A50',
          800: '#131E3A', // Brand Logo Emblem Navy
          900: '#0C1326', // Deep Background Navy
          950: '#060A14',
        },
        trad: {
          terracotta: '#EFC548',
          'terracotta-dark': '#D4A41B',
          'terracotta-light': '#FAF6E6',
          amber: '#EFC548',
          ochre: '#D4A41B',
          ink: '#0C1326',
          charcoal: '#1E293B',
          stone: '#64748B',
          'stone-light': '#94A3B8',
          cream: '#FFFFFF',
          paper: '#F8FAFC',
          'paper-muted': '#F1F5F9',
          border: '#E2E8F0',
          green: '#10B981',
          'green-light': '#ECFDF5',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        serif: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'warm': '0 4px 12px 0 rgba(15, 23, 42, 0.06), 0 2px 4px 0 rgba(15, 23, 42, 0.04)',
        'warm-lg': '0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}
