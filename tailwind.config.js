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
        // Brand palette (updated 2026-01)
        // Gradient: #8EF351 -> #2AFD49
        // Mid: average of the two stops for non-gradient use (borders, text, etc.)
        'brand-start': '#8EF351',
        'brand-end': '#2AFD49',
        'brand-mid': '#5CF84D',

        // Back-compat token used across the app; now points to brand mid.
        'primary-neon': '#5CF84D',
        'primary-dark-gray': '#111111',
        'primary-gray': '#CCCCCC',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #8EF351 0%, #2AFD49 100%)',
      },
      fontFamily: {
        'circular': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 