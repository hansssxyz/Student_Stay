const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },

    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'bleed-blue': '#3B82F6',
        'sky-blue': '#4BC9FF',
        'dark-blue': '#100D9F',
        'purple': '#7D7AFF',
        'light-blue': '#A5E4FF',
        'light-pink': '#FFD3F5',
        'light-orange': '#FFE8D7',
        'dark-gray': '#273444',
        'gray': '#666666',
        'light-gray': '#D9D9D9',
      },
      fontFamily: {
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],

      },


    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
