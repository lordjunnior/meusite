import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      includeAssets: ["favicon.svg", "favicon.ico", "og-image.png"],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallbackDenylist: [/^\/~oauth/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              /^\/assets\/.*\.(?:avif|webp|jpe?g|png)$/i.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "local-images-v1",
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: "Lord Junnior — Soberania Individual",
        short_name: "LordJunnior",
        description: "Alfabetização monetária, autocustódia Bitcoin e estratégias de saída do sistema fiat.",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        categories: ["finance", "education"],
        lang: "pt-BR",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ].filter(Boolean),
  build: {
    chunkSizeWarningLimit: 800,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('/gsap/')) return 'vendor-gsap';
          if (id.includes('recharts') || id.includes('/d3-')) return 'vendor-charts';
          if (id.includes('hls.js')) return 'vendor-hls';
          return 'vendor-core';
        },
      },
    },
  },
  logLevel: 'warn',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
