/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Declared in full (not via `extend`) so `xs` lands in ascending
    // order with the defaults instead of being appended after `2xl`.
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
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
        // Fluid ramps: the small end is tuned for a 320px phone, the
        // large end for a 1920px desktop, so no breakpoint jumps.
        hero: 'clamp(1.875rem, 7.2vw, 3.75rem)',
        giant: 'clamp(1.625rem, 6vw, 3.25rem)',
        big: 'clamp(1.5rem, 5vw, 2.5rem)',
        section: 'clamp(1.375rem, 4.2vw, 2rem)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
