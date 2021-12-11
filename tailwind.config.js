module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        neutral: {
          // Lower contrast in dark-mode from text-white to neutral-300
          // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js#L1076-L1091
          // https://webaim.org/resources/contrastchecker/
          css: {
            '--tw-prose-invert-body': "#bababa",
            '--tw-prose-invert-headings': theme('colors.neutral.300'),
            '--tw-prose-invert-lead': "#bababa",
            '--tw-prose-invert-links': theme('colors.neutral.300'),
            '--tw-prose-invert-bold': theme('colors.neutral.300'),
            '--tw-prose-invert-counters': "#bababa",
            '--tw-prose-invert-bullets': theme('colors.neutral.600'),
            '--tw-prose-invert-hr': theme('colors.neutral.700'),
            '--tw-prose-invert-quotes': theme('colors.neutral.300'),
            '--tw-prose-invert-quote-borders': theme('colors.neutral.700'),
            '--tw-prose-invert-captions': "#bababa",
            '--tw-prose-invert-code': theme('colors.neutral.300'),
            '--tw-prose-invert-pre-code': theme('colors.neutral.300'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.neutral.600'),
            '--tw-prose-invert-td-borders': theme('colors.neutral.700'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
