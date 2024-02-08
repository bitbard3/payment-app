/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AFDA52',
        secondary: '#A067F5',
        dark: '#0A041C',
        light: '#FEFEFE'
      }
    },
  },
  plugins: [],
}