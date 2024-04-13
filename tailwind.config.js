/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F0F1EB',
        accent: '#FBFCFD',
        secondary: '#43809D',
      },
    },
  },
  plugins: [],
};
