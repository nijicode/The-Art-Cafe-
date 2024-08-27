/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        menu: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 1s ease-in-out",
      },
      fontFamily: {
        Poppins: ["Poppins, san-serif"],
      },
      backgroundColor: ["active"],
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".rotate-x-180": {
            transform: "rotateX(180deg)",
          },
          ".rotate-y-180": {
            transform: "rotateY(180deg)",
          },
          ".rotate-z-180": {
            transform: "rotateZ(180deg)",
          },
        },
        ["responsive", "hover"] // Optional variants
      );
    },
  ],
};
