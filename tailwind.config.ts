import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "crimson": {
          50:  "#fff0f0",
          100: "#ffd6d6",
          500: "#c62828",
          600: "#b71c1c",
          700: "#9a1414",
          900: "#5c0000",
        },
        "navy": {
          50:  "#e8eaf6",
          100: "#c5cae9",
          700: "#1a237e",
          800: "#0d1b4b",
          900: "#080e2d",
        },
        "gold": "#c9a84c",
        "cream": "#fdf8f0",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "seigaiha": "url('/patterns/seigaiha.svg')",
        "hero-gradient": "linear-gradient(135deg, #080e2d 0%, #1a237e 50%, #0d1b4b 100%)",
      },
      boxShadow: {
        "card": "0 2px 16px 0 rgba(0,0,0,0.07)",
        "card-hover": "0 8px 32px 0 rgba(0,0,0,0.14)",
        "glow": "0 0 24px rgba(198,40,40,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
