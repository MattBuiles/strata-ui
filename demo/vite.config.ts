import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base de GitHub Pages: https://mattbuiles.github.io/strata-ui/
export default defineConfig({
  root: 'demo',
  base: '/strata-ui/',
  plugins: [react(), tailwindcss()],
  build: { outDir: '../dist-demo', emptyOutDir: true },
})
