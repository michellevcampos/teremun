/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teremun: {
          dark: '#290101',
          burgundy: '#7B2F41',
          gold: '#A27E44',
          blush: '#D8C1CC',
          wine: '#6A0B21',
          mahogany: '#52151C',
          oxblood: '#3F0102',
        },
      },
    },
  },
  plugins: [],
};
