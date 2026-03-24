import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://academiaforit1-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})