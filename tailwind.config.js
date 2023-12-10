/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": {
          "from": "#353a65",
          "to": "#333862",
        },
        "login-input": "#282c4f",
        "widget": "#3c416e",
      }
    },
  },
  plugins: [],
}

