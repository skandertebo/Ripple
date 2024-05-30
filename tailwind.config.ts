import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      primary: "#1E96A4",
      secondary: "rgba(118,118,118,0.6)",
      third: "#AEAEAE",
      black: "#000000",
      white: "#FFFFFF",
    },
    extend: {
      colors: {
        primary: "#1E96A4",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        moveUpDown1: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-600px)" },
          "50%": { transform: "translateY(100px)" },
        },
        moveUpDown2: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(100px)" },
          "50%": { transform: "translateY(-300px)" },
        },
        moveUpDown3: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(100px)" },
          "50%": { transform: "translateY(-100px)" },
        },
        moveUpDown4: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-250px)" },
          "50%": { transform: "translateY(150px)" },
        },
        moveUpDown5: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-150px)" },
          "50%": { transform: "translateY(100px)" },
        },
        moveUpDown6: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(250px)" },
          "50%": { transform: "translateY(-250px)" },
        },
        moveUpDown7: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-500px)" },
          "100%": { transform: "translateY(0)" },
        },
        moveUpDown8: {
          "0%,100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(300px)" },
          "50%": { transform: "translateY(-400px)" },
        },
      },
      animation: {
        moveUpDown1: "moveUpDown1 4s",
        moveUpDown2: "moveUpDown2 4s",
        moveUpDown3: "moveUpDown3 4s",
        moveUpDown4: "moveUpDown4 4s",
        moveUpDown5: "moveUpDown5 4s",
        moveUpDown6: "moveUpDown6 4s",
        moveUpDown7: "moveUpDown7 4s",
        moveUpDown8: "moveUpDown8 4s",
      },
    },
  },
  plugins: [],
} satisfies Config;
