/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      "dark": "#171823",
      "light": "#FAFAFA",
      "field-dark": "#25273d",
      "field-light": "#ffffff",
      "transparent": "transparent",
      "primary": "#AC2DEB",
      "secondary": "#55DDFF",
      "error": "#F44336",
    },
    extend: {
      backgroundImage: (theme) => ({
        "dark-image": "url('./assets/dark-bg.png')",
      }),
      backgroundColor: {
        "dark-overlay": "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
