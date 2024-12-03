/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        sm: '500px',
      },
      colors: {
        'pgl-blue': '#017CC2',
      },
    },
  },
  plugins: [typography],
}
