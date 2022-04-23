import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import nested from 'postcss-nested'
import { Plugin } from 'postcss'

import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [WindiCSS(), react()],
  css: {
    postcss: {
      plugins: [nested as unknown as Plugin],
    },
  },
})
