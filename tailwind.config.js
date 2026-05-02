/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06080d',
        graphite: '#101723',
        panel: '#111c2b',
        azure: '#008cff',
        skyglass: '#7dd3fc',
        signal: '#39ffdb',
        coral: '#ff6f61',
        pollen: '#f7c95f',
      },
      boxShadow: {
        glow: '0 0 60px rgba(0, 140, 255, 0.24)',
        line: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
