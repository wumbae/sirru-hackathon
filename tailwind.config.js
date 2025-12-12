/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1E1E1E',
        surfaceLight: '#2A2A2A',
        primary: '#00FFE0',
        secondary: '#A855F7',
        sunny: '#FFD93D',
        stormy: '#6366F1',
        text: '#FFFFFF',
        textMuted: '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

