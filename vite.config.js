import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/movie-reviews-frontend/' : '/',
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  define: {
    __API_URL__: JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'https://movie-reviews-cms-production-ACTUAL-URL.up.railway.app/api' 
      : 'http://localhost:1337')
  }
})
