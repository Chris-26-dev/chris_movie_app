/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#001F4D",      // Dark navy blue
        secondary: "#003366",    // Medium dark blue
        light: {
          100: "#99CCFF",        // Light sky blue
          200: "#66B2FF",        // Soft blue
          300: "#3399FF",        // Bright blue
        },
        dark: {
          100: "#00264D",        // Darker navy
          200: "#001933",        // Very dark blue
        },
        accent: "#4DA6FF",       // Bright accent blue
      },

    },
  },
  plugins: [],
}