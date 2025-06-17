/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-neon': '#B5FF00',
        'primary-dark-gray': '#111111',
      },
      fontFamily: {
        'circular': ['Circular Std', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 