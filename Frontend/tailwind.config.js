/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4d2d',
        hover: '#e64323',
        bg: '#fff9f4',
        border: '#ddd',
      },
    },
  },
  plugins: [],
}
