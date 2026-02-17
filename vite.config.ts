import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['icons/*.png', 'icons/*.svg'],
        manifest: {
          name: 'Grandmaster Chess Clock',
          short_name: 'GM Clock',
          description: 'Professional Chess Clock — install on your home screen.',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          display_override: ['standalone', 'minimal-ui'],
          orientation: 'portrait',
          theme_color: '#000000',
          background_color: '#000000',
          id: 'grandmaster-chess-clock',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
        },
        devOptions: { enabled: true },
      }),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  };
});
