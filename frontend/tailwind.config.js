/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#AFDA52',
        purple: '#A067F5',
        dark: '#0A041C',
        light: '#FEFEFE',
        box: '#1F2A46',
      },
    },
  },
  plugins: [],
}