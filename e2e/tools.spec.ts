import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const TEST_IMAGE = path.resolve('public/images/demo-before.jpg');
const EMPTY_FILE = path.resolve('e2e/fixtures/empty.txt');
const INVALID_FILE = path.resolve('e2e/fixtures/not-an-image.txt');

const MAGIC: Record<string, number[]> = {
  jpeg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
};

function checkMagic(buffer: Buffer, format: string): boolean {
  const expected = MAGIC[format];
  if (!expected) return true;
  return expected.every((b, i) => buffer[i] === b);
}

async function collectErrors(page: any) {
  const errors: string[] = [];
  page.on('console', (msg: any) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err: any) => errors.push(err.message));
  return errors;
}

async function uploadViaInput(page: any, filePath: string) {
  await page.locator('[data-action="file-input"]').setInputFiles(filePath);
}

async function waitForImgLoaded(page: any, selector: string) {
  await page.waitForFunction(
    (sel: string) => {
      const img = document.querySelector(sel) as HTMLImageElement | null;
      return img?.getAttribute('src') && img.naturalWidth > 0 && img.naturalHeight > 0;
    },
    selector,
    { timeout: 15000 }
  );
}

async function waitForImgChanged(page: any, selector: string, origW: number, origH: number) {
  await page.waitForFunction(
    ({ sel, ow, oh }: { sel: string; ow: number; oh: number }) => {
      const img = document.querySelector(sel) as HTMLImageElement | null;
      return img && img.naturalWidth > 0 && (img.naturalWidth !== ow || img.naturalHeight !== oh);
    },
    { sel: selector, ow: origW, oh: origH },
    { timeout: 15000 }
  );
}

async function captureDownload(page: any, triggerLocator: any) {
  const downloadPromise = page.waitForEvent('download');
  await triggerLocator.click();

  const download = await downloadPromise;
  const suggestedName = download.suggestedFilename();
  const filePath = await download.path();
  expect(filePath).toBeTruthy();

  const buffer = fs.readFileSync(filePath!);
  expect(buffer.length).toBeGreaterThan(100);

  return { suggestedName, buffer };
}

test.beforeAll(() => {
  const dir = path.dirname(EMPTY_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(EMPTY_FILE)) fs.writeFileSync(EMPTY_FILE, '');
  if (!fs.existsSync(INVALID_FILE)) fs.writeFileSync(INVALID_FILE, 'this is not an image file');
});

test.describe('Image Compressor tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/compressor/', { waitUntil: 'load' });
    await expect(page.locator('#upload-dropzone')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/compressor/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('image-compressor page renders upload zone', async ({ page }) => {
    await page.goto('/image-compressor/', { waitUntil: 'load' });
    await expect(page.locator('#upload-dropzone')).toBeVisible({ timeout: 10000 });
  });

  test('image-compressor page has no console errors', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/image-compressor/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });
});

test.describe('Image Rotator tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('rotates image 90° and downloads result', async ({ page }) => {
    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-rotator-original-img]');

    const origDims = await page.evaluate(() => {
      const img = document.querySelector('[data-rotator-original-img]') as HTMLImageElement;
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    expect(origDims.w).toBe(1200);
    expect(origDims.h).toBe(800);

    const preset = page.locator('[data-rotator-preset="90"]');
    await preset.click();

    await waitForImgChanged(page, '[data-rotator-result-img]', origDims.w, origDims.h);

    const resultDims = await page.evaluate(() => {
      const img = document.querySelector('[data-rotator-result-img]') as HTMLImageElement;
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    expect(resultDims.w).toBe(800);
    expect(resultDims.h).toBe(1200);

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-rotator-download-btn]')
    );
    expect(suggestedName).toMatch(/demo-before_edited\.(jpg|png)$/i);
    expect(checkMagic(buffer, 'png')).toBe(true);
  });

  test('rejects invalid file upload', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/rotator/', { waitUntil: 'load' });
    await uploadViaInput(page, INVALID_FILE);
    const errorEl = page.locator('[data-tool-errors]');
    await expect(errorEl).not.toBeHidden({ timeout: 5000 });
    expect(errors).toEqual([]);
  });
});

test.describe('Image Converter tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/converter/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/converter/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('converts JPEG to PNG and downloads valid PNG', async ({ page }) => {
    await page.goto('/tools/converter/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-converter-original]');

    const pngBtn = page.locator('[data-converter-format="png"]');
    await pngBtn.click();
    await waitForImgLoaded(page, '[data-converter-result]');

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-converter-download-btn]')
    );
    expect(suggestedName).toMatch(/\.png$/i);
    expect(checkMagic(buffer, 'png')).toBe(true);
  });

  test('rejects invalid file upload', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/converter/', { waitUntil: 'load' });
    await uploadViaInput(page, INVALID_FILE);
    const errorEl = page.locator('[data-tool-errors]');
    await expect(errorEl).not.toBeHidden({ timeout: 5000 });
    expect(errors).toEqual([]);
  });
});

test.describe('Image Resizer tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('resizes image to specific width and downloads valid JPEG', async ({ page }) => {
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-resizer-original]');

    const origDims = await page.evaluate(() => {
      const img = document.querySelector('[data-resizer-original]') as HTMLImageElement;
      return { w: img.naturalWidth, h: img.naturalHeight };
    });

    const targetWidth = 200;
    const expectedHeight = Math.round(targetWidth * (origDims.h / origDims.w));

    const widthInput = page.locator('[data-resizer-width]');
    await widthInput.fill(String(targetWidth));
    await waitForImgLoaded(page, '[data-resizer-result]');

    const resultDims = await page.evaluate(() => {
      const img = document.querySelector('[data-resizer-result]') as HTMLImageElement;
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    expect(Math.abs(resultDims.w - targetWidth)).toBeLessThanOrEqual(2);
    expect(Math.abs(resultDims.h - expectedHeight)).toBeLessThanOrEqual(2);

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-resizer-download-btn]')
    );
    expect(suggestedName).toMatch(/\.jpe?g$/i);
    expect(checkMagic(buffer, 'jpeg')).toBe(true);
  });

  test('rejects invalid file upload', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await uploadViaInput(page, INVALID_FILE);
    const errorEl = page.locator('[data-tool-errors]');
    await expect(errorEl).not.toBeHidden({ timeout: 5000 });
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

test.describe('Image Cropper tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/cropper/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/cropper/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('uploads image, applies crop, and downloads valid result', async ({ page }) => {
    await page.goto('/tools/cropper/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-cropper-image]');

    const cropArea = page.locator('[data-cropper-preview]');
    await expect(cropArea).not.toBeHidden({ timeout: 8000 });

    const cropWindow = page.locator('[data-cropper-window]');
    await expect(cropWindow).toBeVisible({ timeout: 5000 });

    const applyBtn = page.locator('[data-cropper-apply]');
    await expect(applyBtn).toBeVisible();

    await applyBtn.click();

    const resultArea = page.locator('section[data-cropper-result]');
    await expect(resultArea).not.toBeHidden({ timeout: 8000 });

    const downloadSection = page.locator('section[data-cropper-download]');
    await expect(downloadSection).not.toBeHidden({ timeout: 5000 });

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('button[data-cropper-download-btn]')
    );
    expect(suggestedName).toMatch(/demo-before_cropped\.jpe?g$/i);
    expect(checkMagic(buffer, 'jpeg')).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
  });
});
