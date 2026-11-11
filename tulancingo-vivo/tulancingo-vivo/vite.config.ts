import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig(({ mode }) => {
  const base = loadEnv(mode, '.', 'BASE_PATH').BASE_PATH || '/'

  return {
    base,
    plugins: [react(), VitePWA({
      registerType: 'prompt',
      includeAssets: ['offline.html', 'icon.svg'],
      manifest: { name: 'Tulancingo Vivo', short_name: 'Tulancingo Vivo', description: 'Descubre Tulancingo, Hidalgo.',
        start_url: base, scope: base, display: 'standalone', lang: 'es-MX', theme_color: '#17324D', background_color: '#F5F1E8',
        icons: [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }] },
      workbox: { cleanupOutdatedCaches: true,
        runtimeCaching: [{ urlPattern: ({ request }) => request.destination === 'image', handler: 'CacheFirst',
          options: { cacheName: 'imagenes', expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 } } }] },
    })],
  }
})
