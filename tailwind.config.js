const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    // https://tailwindcss.com/docs/customizing-colors
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      trueGray: colors.trueGray,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
      lightBlue: colors.lightBlue,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
