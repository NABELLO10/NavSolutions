/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#05080D',
          900: '#07111F',
          800: '#0A1628',
        },
        accent: {
          blue: '#147DFF',
          cyan: '#00BFFF',
          light: '#55D6FF',
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
