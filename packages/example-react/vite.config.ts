import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import nested from 'postcss-nested'
import { Plugin } from 'postcss'

import WindiCSS from 'vite-plugin-windicss'

import { cert } from '../../cert/cert.cert'
import { key } from '../../cert/cert.key'

export default defineConfig({
  plugins: [WindiCSS(), react()],
  server: {
    https: {
      cert,
      key,
    },
  },
  css: {
    postcss: {
      plugins: [nested as any],
    },
  },
})
