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
      },
    },
  },
  plugins: [],
};
