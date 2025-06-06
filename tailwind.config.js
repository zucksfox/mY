/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f8fafc',
          DEFAULT: '#0a192f',
          dark: '#020617',
        },
        secondary: {
          light: '#22d3ee',
          DEFAULT: '#64ffda',
          dark: '#0891b2',
        },
        textPrimary: {
          light: '#1e293b',
          DEFAULT: '#ccd6f6',
          dark: '#f8fafc',
        },
        textSecondary: {
          light: '#475569',
          DEFAULT: '#8892b0',
          dark: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
} 