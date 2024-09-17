/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: { colors: {
      'custom-gray': '#808A93', 
      "background":'#FFFFFF',
      "isrental":" #02152680",
      

    },
    fontFamily: {
      'fira-go': ['FiraGO', 'sans-serif'],
    },},
  },
  plugins: [],
}

