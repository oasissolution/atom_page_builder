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
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
        '28': 'repeat(28, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
        '9': 'repeat(9, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))',
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
        '28': 'repeat(28, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
