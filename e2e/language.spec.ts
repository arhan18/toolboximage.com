import { test, expect } from '@playwright/test';

test.describe('Homepage renders correct language', () => {
  const CHECKS: { path: string; text: string }[] = [
    { path: '/', text: 'Fast, private image tools' },
    { path: '/es/', text: 'Herramientas de imagen rápidas' },
    { path: '/fr/', text: "Des outils d'image rapides" },
    { path: '/de/', text: 'Schnelle, private Bildwerkzeuge' },
    { path: '/hi/', text: 'इमेज टूल्स जो आपकी प्राइवेसी' },
    { path: '/ja/', text: '高速でプライベートな画像ツール' },
    { path: '/ar/', text: 'أدوات صور سريعة وخاصة' },
  ];

  for (const { path, text } of CHECKS) {
    test(`${path} shows translated homepage`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' });
      await expect(page.locator('h1')).toContainText(text, { timeout: 15000 });
    });
  }
});

test.describe('Language-prefixed pages load successfully', () => {
  const PAGES = ['/es/faq/', '/es/about/', '/fr/faq/', '/de/faq/', '/hi/faq/', '/ja/faq/'];

  for (const path of PAGES) {
    test(`${path} loads with 200`, async ({ page }) => {
      const resp = await page.goto(path, { waitUntil: 'load' });
      expect(resp?.status()).toBe(200);
    });
  }
});

test.describe('Tool pages in different languages', () => {
  const CHECKS: { path: string; text: string }[] = [
    { path: '/es/compressor/', text: 'Compresor' },
    { path: '/de/compressor/', text: 'Kompressor' },
    { path: '/hi/compressor/', text: 'कंप्रेसर' },
    { path: '/es/image-tools/', text: 'Herramientas' },
  ];

  for (const { path, text } of CHECKS) {
    test(`${path} shows translated "${text}"`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' });
      await expect(page.locator('body')).toContainText(text, { timeout: 10000 });
    });
  }
});
