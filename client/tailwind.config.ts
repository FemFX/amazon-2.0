import type { Config } from "tailwindcss";

const twColors = require("tailwindcss/colors");

const colors = {
  transparent: twColors.transparent,
  black: "#2E3239",
  white: twColors.white,
  red: twColors.red[400],
  primary: "#FF9902",
  secondary: "#161D25",
  "bg-color": "#F2F2F5",
  aqua: "#368697",
  gray: "#CDCDCD",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {
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
