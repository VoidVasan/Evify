/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        'primary-dark': '#d97706',
        'primary-light': '#fbbf24',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
