/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#EAECF2",
        subMain: "#FFFFFF",
        secondary: "#285694",
        textPrimary: "#151515",
        textGry: "#8B8C91",
        light: "#E2E2E5",
        darkLight: "#DCE0E4",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
