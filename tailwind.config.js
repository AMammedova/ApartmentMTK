/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F6FAFD",
        backgroundSecond: "#EEF6FB",
        primary: "#514EF3",
        secondary: "#2EC4B6",
        success: "#2DC8A8",
        error: "#FE8084",
        dark: "#092C4C",
        line: "#EAEEF4",
        icon: "#7E92A2",
      },
    },
  },
  plugins: [],
};
