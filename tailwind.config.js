/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#faf8f5", // Cream/light warm background
          card: "#ffffff",
          text: "#1a1614", // Deep charcoal/warm black
          muted: "#665e5a",
          border: "#e8e4db",
          gold: "#d6a65c",
        },
        warm: {
          50: "#fdfdfd",
          100: "#f9f7f4",
          200: "#f3efe9",
          300: "#e7dfd3",
          400: "#d4c6b2",
          500: "#bda78b",
          600: "#a3886a",
          700: "#876d52",
          800: "#6b543e",
          900: "#4a3828",
        },
        terracotta: {
          50: "#fbf5f2",
          100: "#f7ebe5",
          200: "#eed3c8",
          300: "#e0b19f",
          400: "#cd8469",
          500: "#bf6343",
          600: "#b04f32",
          700: "#923c25",
          800: "#743120",
          900: "#5f291c",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "Source Serif 4", "Georgia", "serif"],
        display: ["Syne", "Cabinet Grotesk", "sans-serif"],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
