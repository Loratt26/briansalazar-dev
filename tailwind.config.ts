import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          strong: "var(--muted-strong)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        card: "var(--card)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Scale per spec §3.3 (mobile-first)
        h1: ["clamp(2.25rem, 4vw + 1rem, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 2vw + 1rem, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 1vw + 1rem, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "64rem", // text-heavy pages
        wide: "72rem",    // home
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 400ms ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
