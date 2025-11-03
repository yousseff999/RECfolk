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
        primary: "#0A0A0A", // deep black background
        secondary: "#1A1A1A", // dark graphite for sections / cards
        accent: "#D72638", // red accent for buttons, hover states
        light: "#F5F5F5", // soft white for text
        muted: "#A1A1A1", // gray for subtitles, inactive links
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"], // your base font
        inter: ["Inter", "sans-serif"], // alternative for body text
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
