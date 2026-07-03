// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://toolboximage.com',
  trailingSlash: 'ignore',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Keep vendor chunks lean — no heavy framework deps.
              return 'vendor';
            }
          },
        },
      },
    },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,

      serialize(item) {
        // Higher priority for the homepage and core tool pages.
        if (item.url === 'https://toolboximage.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        if (item.url.includes('compress')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        if (item.url.includes('/blog/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        if (item.url.includes('/legal/')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],
});
