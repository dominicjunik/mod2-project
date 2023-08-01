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
        parchment: 'rgba(239, 223, 187, 0.616)',
      },      
      boxShadow: {
        'stone': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        'pop-out': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',        
      },
    },
  },
  plugins: [],
}
