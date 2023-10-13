import { nextui } from '@nextui-org/react'
import { SHARER_COLOR_SAFE_LIST } from "./src/constants/sharer_colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: SHARER_COLOR_SAFE_LIST,
  darkMode: "class",
  plugins: [nextui()],
}

