import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    outDir: 'dist',
  },
  define: {
    // This tells Vite to replace 'process.env.API_KEY' in your code
    // with the actual value from the Netlify environment during the build.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
})