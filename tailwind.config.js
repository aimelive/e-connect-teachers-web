/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#005F7E",
        primary: "#E05832",
      },
    },
  },
  plugins: [],
};
