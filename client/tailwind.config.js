/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: "#17263e",
        error: "#ff0000"
      }
    },
  },
  plugins: [],
}