/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-blue-500',
    'bg-red-500',
    'bg-cyan-500',
    'bg-green-500'
  ]
}

