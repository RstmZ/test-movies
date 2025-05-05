// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // if using app directorypages directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-one': ['64px', { lineHeight: '80px' }],
        'heading-two': ['48px', { lineHeight: '56px' }],
        'heading-three': ['32px', { lineHeight: '40px' }],
        'heading-four': ['24px', { lineHeight: '32px' }],
        'heading-five': ['20px', { lineHeight: '24px' }],
        'heading-six': ['16px', { lineHeight: '24px' }],
        'body-large': ['20px', { lineHeight: '32px' }],
        'body-regular': ['16px', { lineHeight: '24px' }],
        'body-small': ['14px', { lineHeight: '24px' }],
        'body-xs': ['12px', { lineHeight: '24px' }],
        caption: ['14px', { lineHeight: '16px' }],
      },
    },
  },
};
