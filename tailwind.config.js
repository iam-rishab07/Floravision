/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0d130d',      // Main background
        'brand-card': '#1a221a',      // Card background
        'brand-accent': '#a3e635',    // Lime/Yellow-green highlights
        'brand-gray': '#3a443a',      // Subtle borders/text
      },
      borderRadius: {
        '4xl': '2rem',                
      }
    },
  },
  plugins: [],
}