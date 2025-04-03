// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FFD600',       // amarillo principal
        primaryLight: '#FCE96A',  // hover amarillo claro
        darkBg: '#0f0f0f',        // fondo negro oscuro
        textLight: '#D1D5DB',     // gris claro para texto
      },
      fontFamily: {
          sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
          warrior: ['"Bebas Neue"', 'sans-serif'], // nuevo estilo para títulos
        },
    },
  },
  plugins: [],
}
