/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Popins: ["Poppins", "sans-serif"],
      },
      colors: {
        black: '#333333',
        white: '#FFFFFF',
        yellowAccent: '#B88E2F',
        redAccent: '#E97171',
        greenAccent: '#2EC1AC',
        bgMain: '#FFF3E3',
        bgNav: '#F9F1E7',
        bgSec: '#FCF8F3',
      },
    },
  },
  plugins: [],
}
