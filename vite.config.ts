import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Portfolio'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (moduleId) => {
          if (moduleId.includes('/framer-motion/') || moduleId.includes('\\framer-motion\\')) {
            return 'framer-motion'
          }

          if (moduleId.includes('/ogl/') || moduleId.includes('\\ogl\\')) {
            return 'ogl'
          }
        },
      },
    },
  },
})
