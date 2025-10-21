import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,json}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "SF Pro Text",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          primary: "#059669",
          primaryHover: "#047857",
          primarySoft: "#ECFDF5",
          accent: "#f59e0b",
          accentHover: "#d97706",
        },
        surface: {
          base: "#f9fafb",
          raised: "#ffffff",
          subtle: "#f1f5f9",
        },
        text: {
          default: "#0f172a",
          muted: "#4b5563",
          subtle: "#94a3b8",
        },
        border: {
          subtle: "#e2e8f0",
          strong: "#cbd5f5",
        },
      },
      boxShadow: {
        card: "0 12px 24px -12px rgba(15, 23, 42, 0.18)",
        button: "0 10px 20px -10px rgba(5, 150, 105, 0.45)",
      },
      borderRadius: {
        xl: "1.5rem",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
};

export default config;

