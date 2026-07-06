import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/western-scholars-and-ideologies/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
