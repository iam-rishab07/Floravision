/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Added ts/tsx just in case, and ensured paths are covered
  ],
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
        '5xl': '3rem',                // Extra rounded for that high-end UI look
      },
      backgroundImage: {
        // Great for creating that "glow" effect behind plant images
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'pulse-slower': 'pulse-slower 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1) translate(0px, 0px)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1) translate(30px, -20px)' },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1) translate(0px, 0px)' },
          '50%': { opacity: '0.45', transform: 'scale(1.15) translate(-40px, 30px)' },
        }
      }
    },
  },
  plugins: [],
}