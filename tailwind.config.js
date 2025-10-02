/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0D1120',      // Deep, dark navy blue
          text: '#E0E0E0',    // Slightly brighter text for better contrast
          accent: '#818CF8'   // A vibrant, friendly indigo
        },
        'primary-dark': '#171A3A', // A secondary dark color with a hint of purple
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      animation: {
        'fly-to-cart': 'flyToCart 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards'
      },
      keyframes: {
        flyToCart: {
          '0%': { transform: 'scale(1) translate(0, 0)', opacity: '1' },
          '50%': { transform: 'scale(0.8) translate(50px, -30px)', opacity: '0.8' },
          '100%': { transform: 'scale(0.3) translate(200px, -100px)', opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
};