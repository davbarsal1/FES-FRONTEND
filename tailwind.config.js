/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // azul marino
        secondary: '#10B981', // verde esmeralda
        grayLight: '#929498',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  }
,
  plugins: [],
}
