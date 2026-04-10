/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#374151", // The Slate Teal (Buttons, branding)
        secondary: "#9ca3af", // The Brown (Sub-headers, borders)
        background: "#F7F3EE", // The Off-white (Screen background)
        foreground: "#333333", // The Dark Grey (Primary text)
        success: "#9CAF88",
        accent: "#8C6E5E",
        note: {
          mint: "#B8F2E6", // "Lunch Time" note
          purple: "#D3C9FF", // "Going out with puppy" note
          blue: "#A3E4F8", // "Work on Project" note
          peach: "#FFD8B1", // "Gaming time" note
          pink: "#FFB7B2", // Small accents/pin colors // The Sage (Completed tasks, checks)
        },
      },
    },
  },
  plugins: [],
};
