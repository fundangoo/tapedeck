/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        tapeList: 'repeat(auto-fit, minmax(15rem, auto))',
      },
    },
  },
  plugins: [],
};
