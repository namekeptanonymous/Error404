/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          discord_blue: "#295DE7",
          discord_blurple: "#7289da",
          discord_purple: "#5865f2",
          discord_green: "#3ba55c",
        },
    },
  },
  plugins: [],
}

