import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: 'Alexander-Prado.github.io',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'vite.svg',
        'iapp.png',
        'logo.jpg',
        'taexapp.jpg'
      ],
      manifest: {
        name: 'Registro de Entrega de Equipos',
        short_name: 'EntregaEquipos',
        description: 'Aplicación para registrar entregas y firmas de equipos.',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/iapp.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/taexapp.jpg',
            sizes: '512x512',
            type: 'image/jgp'
          }
        ]
      }
    })
  ],
})


