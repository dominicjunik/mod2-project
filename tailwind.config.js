/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pixel-grey': "url('./src/assets/noise-background.png')",
      },
      colors: {
        primary: 'rgb(128,0,0)',
        secondary: 'rgb(102,0,0)', 
        page: '#f6a494',
      }
    },
  },
  plugins: [],
}
