/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'exalmar-blue': '#0B3B8A',
        'exalmar-light': '#f4f6f9',
        'exalmar-accent': '#0073bf',
        'exalmar-green': '#8cc63f',
        'exalmar-dark': '#072559'
      }
    }
  },
  plugins: [],
}
