// postcss.config.js
module.exports = {
  plugins: [
    'postcss-nested', // Make sure postcss-nested comes before Tailwind CSS
    'tailwindcss',
    // Other PostCSS plugins if you have any
  ],
};
