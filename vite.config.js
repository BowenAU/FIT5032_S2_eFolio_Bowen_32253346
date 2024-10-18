import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools()
  ],
  base: mode === 'production' ? '/FIT5032_S2_eFolio_Bowen_32253346/' : '/',
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
}))


 