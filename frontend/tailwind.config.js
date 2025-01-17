module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      colors: {
        'primary': 'rgb(36,72,85)',
        'primary-50': 'rgb(172,172,172)',
        'primary-500': 'rgb(17,17,17)',
        'white': 'rgb(255,255,255)',
        'neutral-50': 'rgb(211,217,212)',
        'neutral-200':'rgb(240,240,240)',
        'neutral-300': 'rgb(192,197,193)',
        'neutral-600': 'rgb(84,87,85)',
      },
    },
  },
  plugins: [],
}

