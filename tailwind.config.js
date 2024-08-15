/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-image': "url('https://i.gifer.com/35LA.gif')",
        'light-image': "url('https://images.ctfassets.net/adaoj5ok2j3t/4Ls42lyg4wQU426A6QU0WQ/df3b953097c1fd9d0f726bc82e501c0c/tumblr_o6917c6rgq1rkvimbo1_500.gif?fm=webp&w=3000&q=75')",
      }
    },
  },
  plugins: [],
}

