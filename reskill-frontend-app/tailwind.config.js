/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'subheading': '#828282'
      },
      screens: {
        'xs': '320px'
      }
    },
  },
  plugins: [],
}

