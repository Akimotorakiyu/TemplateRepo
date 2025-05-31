import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import nested from 'postcss-nested'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [WindiCSS()],
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
