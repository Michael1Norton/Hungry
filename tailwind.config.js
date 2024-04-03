/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5CCA0",
        secondary: {
          100: "#E48F45",
          200: "#994D1C",
        },
        third: "#6B240C",
        fourth: "#F76E11",
        fifth: "#FF9F45",
        sixth: "#FFBC80",
        seventh: "#F6DA63",
      },
    },
  },
  plugins: [],
};
