/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grey: "#94a3b8",
        indigo2: "#4338ca",
        indigo1:"#4f46e5",
      }
    },
  },
  plugins: [],
}

