import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'service-worker.js',
      manifest: {
        "name": "Contrefaçon de Twitter",
        "short_name": "Twitter",
        "start_url": ".",
        "icons": [{
            "src": "/icons/icon.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
        }],
        "display": "standalone",
        "id": "2025-faux-twitter"
      },
    })
  ],
})