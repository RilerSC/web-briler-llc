/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000012',
          blue: '#1c2956',
          purple: '#5a0b8f',
          lilac: '#8148ff',
          light: '#5230e7',
          light2: '#1252d0',
          cyan: '#00d2ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
