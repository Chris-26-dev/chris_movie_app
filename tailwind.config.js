/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#001F4D",      // Dark navy blue // #030014
        secondary: "#003366",    // Medium dark blue // #151312
        light: {
          100: "#99CCFF",        // Light sky blue // #D6C7FF
          200: "#66B2FF",        // Soft blue // #A8B5DB
          300: "#3399FF",        // Bright blue // #9CA4AB
        },
        dark: {
          100: "#00264D",        // Darker navy // #221F3D
          200: "#001933",        // Very dark blue // #0F0D23
        },
        accent: "#4DA6FF",       // Bright accent blue // AB8BFF
      },

    },
  },
  plugins: [],
}