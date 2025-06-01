import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      // esmodule 模式下，forge.config 不起作用，在 vite.main.config.ts 中配置
      entry: './src/main.ts',
      formats: ['es'],
      fileName: 'main',
    },
  },
})
