module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    minHeight: {
      'overflow': '101vh',
    },
    extend: {
      spacing: {
        '100': '23rem',
        '128': '35rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        'fade-out': {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
