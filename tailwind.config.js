/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff', // white
        secondary: '#000000', // black
        tertiary: '#38A169', // green-700
        // primary: '#000000', // white
        // secondary: '#ffffff', // black
      },
      fontFamily: {
        sans: ['"YourCustomFont"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
