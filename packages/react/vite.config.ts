import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import nested from 'postcss-nested'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {},
  css: {
    postcss: {
      plugins: [nested as any],
    },
  },
  esbuild: {
    target: 'es2021',
  },
})
