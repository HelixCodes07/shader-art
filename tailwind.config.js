/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
module.exports = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    screens,
    fontSize,
    fontFamily: {
      primary: "var(--font-cormorant_upright)",
      secondary: "var(--font-dm_sans)",
      zentry: ["zentry", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "rgba(39, 39, 43, 0.4)",
        secondary: "rgba(250, 250, 250, 0.4)",
        menuWhite: "#f3f2f9",
        menublack: "#606887",
      },
    },
  },
  plugins: [fluid],
};
