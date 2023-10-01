/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '85rem',
        '1/2': '50%',
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

