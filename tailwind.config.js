/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#010201',
          900: '#040806',
          800: '#08110B',
        },
        accent: {
          blue: '#4DFF00',
          cyan: '#00D84A',
          light: '#D7FF2F',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2rem, 4.5vw, 3.75rem)',
        'giant': 'clamp(1.875rem, 4.5vw, 3.25rem)',
        'big': 'clamp(1.625rem, 3.5vw, 2.5rem)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
