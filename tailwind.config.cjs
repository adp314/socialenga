/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist"],
      },
    },
    animation: {
      gradient: "animateGradient 8s ease infinite",
    },
    keyframes: {
      animateGradient: {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "bottom",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "top ",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
