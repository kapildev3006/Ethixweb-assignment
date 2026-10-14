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
        brand: {
          red: "#C0272D",
          "red-dark": "#8A181C",
          "red-light": "#E51D25",
          "red-glow": "#F2545B",
          "red-soft": "#FEE2E2",
          dark: "#0C0D10",
          charcoal: "#16171B",
          surface: "#F9FAFB",
          muted: "#6B7280",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.07)",
        "card-hover": "0 20px 40px -15px rgba(192, 39, 45, 0.12)",
        glow: "0 0 25px -5px rgba(229, 29, 37, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
