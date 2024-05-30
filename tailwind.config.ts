import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        blue: '#1E96A4'
      },
      fontFamily: {
          sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        },
    },
    },
  plugins: [],
} satisfies Config;
