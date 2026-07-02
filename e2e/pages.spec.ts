import { test, expect } from '@playwright/test';
import { getAllUrls } from './helpers';

const urls = getAllUrls();
const CONSOLE_ERRORS: string[] = [];
const HEAVY_PAGES = ['/compressor/', '/bulk-image-compressor/', '/image-compressor-100kb/', '/image-compressor-for-discord/', '/compress-for-email/', '/compress-jpeg/', '/compress-png/', '/compress-webp/', '/compress-avif/', '/compress-for-instagram/', '/compress-for-whatsapp/', '/image-compressor/', '/tools/rotator/'];

test.beforeEach(() => {
  CONSOLE_ERRORS.length = 0;
});

urls.forEach((url) => {
  const pathname = new URL(url).pathname;
  const isHeavy = HEAVY_PAGES.some((p) => pathname.endsWith(p));

  test(`${pathname} loads with status 200`, async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        CONSOLE_ERRORS.push(`${pathname}: ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      CONSOLE_ERRORS.push(`${pathname}: uncaught error: ${err.message}`);
    });

    const resp = await page.goto(pathname, { waitUntil: 'load', timeout: isHeavy ? 30000 : 15000 });
    expect(resp?.status()).toBe(200);

    if (CONSOLE_ERRORS.length) {
      const errors = [...CONSOLE_ERRORS];
      CONSOLE_ERRORS.length = 0;
      expect(errors).toEqual([]);
    }
  });
});

test.afterAll(() => {
  if (CONSOLE_ERRORS.length) {
    console.error('Console errors found:', CONSOLE_ERRORS.join('\n'));
  }
});
