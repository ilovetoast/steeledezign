import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname?.includes('images') || url.toString().includes('images')) {
          return new URLSearchParams({ w: '320;640;1024;1600;2000', format: 'webp' })
        }
        return new URLSearchParams()
      },
    }),
  ],
  build: {
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },
})
