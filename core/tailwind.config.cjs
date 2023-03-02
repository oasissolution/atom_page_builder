/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'production',
  ///mode and purge are settings for just-in-time experience
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue,svelte}',
  ],
  ///below are standard setting
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
