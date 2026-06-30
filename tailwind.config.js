/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          cyan: '#22d3ee',
          emerald: '#34d399',
        },
      },
      boxShadow: {
        convex:
          '4px 4px 10px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.02)',
        concave:
          'inset 2px 2px 5px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(255,255,255,0.01)',
        glow: '0 0 24px rgba(34, 211, 238, 0.25)',
      },
    },
  },
  plugins: [],
};
