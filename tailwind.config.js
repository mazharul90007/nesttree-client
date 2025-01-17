import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E94D22", // Your custom primary color
        secondary: "#9333EA", // Your custom secondary color
      },
    },
  },
  plugins: [daisyui],
};
