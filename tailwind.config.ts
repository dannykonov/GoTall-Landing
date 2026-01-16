import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand palette (updated 2026-01)
        // Gradient: #8EF351 -> #2AFD49
        // Mid: average of the two stops for non-gradient use (borders, text, etc.)
        "brand-start": "#8EF351",
        "brand-end": "#2AFD49",
        "brand-mid": "#5CF84D",
        primary: {
          black: '#000000',
          // Back-compat token used across the app; now points to brand mid.
          neon: '#5CF84D',
          gray: '#CCCCCC',
          'dark-gray': '#333333',
        }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #8EF351 0%, #2AFD49 100%)",
      },
      fontFamily: {
        'circular': ['Circular Std', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config; 