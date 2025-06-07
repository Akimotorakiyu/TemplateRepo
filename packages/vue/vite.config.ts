import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

import nested from 'postcss-nested'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), vue(), jsx()],
  server: {},
  css: {
    postcss: {
      plugins: [nested as any],
    },
  },
})
