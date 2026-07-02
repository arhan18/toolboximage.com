import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Image Compressor tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/compressor/', { waitUntil: 'load' });
    await expect(page.locator('#upload-dropzone')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/compressor/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });
});

test.describe('Image Rotator tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });
});

test.describe('Tools directory page', () => {
  test('tabs switch panels', async ({ page }) => {
    await page.goto('/image-tools/', { waitUntil: 'load' });

    const allPanel = page.locator('[data-panel="all"]');
    const compressPanel = page.locator('[data-panel="compress"]');

    await expect(allPanel).toBeVisible({ timeout: 10000 });
    await expect(compressPanel).toBeHidden();

    const compressTab = page.locator('[data-tab="compress"]');
    await compressTab.click();

    await expect(allPanel).toBeHidden();
    await expect(compressPanel).toBeVisible();
  });
});
