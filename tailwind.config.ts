import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Unbounded", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        editorial: {
          bg: "#FFFFFF", // Pure White
          text: "#000000", // Pure Black
          accent: "#000000", // Pure Black for accents
          border: "#E5E7EB", // Clean Light Gray Border (Tailwind gray-200)
          muted: "#4B5563", // Muted Slate Gray for body descriptions (gray-600)
          card: "#F9FAFB", // Very light gray for card backgrounds (gray-50)
        },
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
