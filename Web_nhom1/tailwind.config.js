/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'media',
    extend: {
      screens: {
        xs: '500px', // Custom breakpoint for 500px
    },
  },
  
    
  plugins: [],
}}