import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy vendor libraries into separate chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          icons: ['react-icons'],
          helmet: ['react-helmet-async'],
        },
      },
    },
    // Increase the warning limit slightly since we have a large tourism asset set
    chunkSizeWarningLimit: 800,
    // Enable source maps for production debugging
    sourcemap: false,
  },
})
