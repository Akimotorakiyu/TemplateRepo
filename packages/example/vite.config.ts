import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

import nested from 'postcss-nested'

import WindiCSS from 'vite-plugin-windicss'

import { cert } from '../../cert/cert.cert'
import { key } from '../../cert/cert.key'

export default defineConfig({
  plugins: [WindiCSS(), vue(), jsx()],
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
