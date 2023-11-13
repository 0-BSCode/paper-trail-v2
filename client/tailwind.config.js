/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'Tahoma', 'sans-serif'],
      },
      maxWidth: {
        container: '85rem',
        '1/2': '50%',
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        blue: {
          DEFAULT: '#1724dc',
          50: '#e8e9fc',
          100: '#b7bbf4',
          200: '#949aef',
          300: '#646ce8',
          400: '#4550e3',
          500: '#1724dc',
          600: '#1521c8',
          700: '#101a9c',
          800: '#0d1479',
          900: '#0a0f5c',
        },
        white: {
          DEFAULT: '#ffffff',
          50: '#ffffff',
          100: '#fefffe',
          200: '#fefffd',
          300: '#fdfffc',
          400: '#fdfffc',
          500: '#fcfffb',
          600: '#e5e8e4',
          700: '#b3b5b2',
          800: '#8b8c8a',
          900: '#6a6b69',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  corePlugins: {
    preflight: false
  }
};
