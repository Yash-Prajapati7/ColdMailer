/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors : {
        asterosNavy: '#0071c5', // Asteros Navy
        azure : '#007FFF', // Azure
        customOrange : '#E38E49'
      }
    },
  },
  plugins: [],
}