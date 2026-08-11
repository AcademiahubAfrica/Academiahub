module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        // 22.5 * 0.25rem = 5.625rem = 90px
        '22.5': '5.625rem',
        // 48.5 * 0.25rem = 12.125rem = 194px
        '48.5': '12.125rem',
      },
      maxWidth: {
        // 263 * 0.25rem = 65.75rem = 1052px
        '263': '65.75rem',
      },
    },
  },
  plugins: [],
};
