/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      spacing: {
        hundrend: "100px",
        sixty: "60px"
      },
      gradientColorStops: {
        "gradient-purple": "#FC04BA",
        "gradient-yellow": "#FFC702",
      },
    },
  },
  plugins: [],
}
