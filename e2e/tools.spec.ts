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

  test('preview shows actual image content (not blank)', async ({ page }) => {
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-resizer-result]');

    const hasContent = await page.evaluate(() => {
      const img = document.querySelector('[data-resizer-result]') as HTMLImageElement;
      if (!img || !img.naturalWidth) return false;
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let nonWhite = 0;
      const total = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) nonWhite++;
      }
      return nonWhite / total > 0.05;
    });
    expect(hasContent).toBe(true);
  });

  test('preview updates when dimensions change', async ({ page }) => {
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-resizer-result]');

    const resultImg = page.locator('[data-resizer-result]');
    const firstSrc = await resultImg.evaluate((el: HTMLImageElement) => el.src);

    await page.locator('[data-resizer-width]').fill('400');
    await page.waitForFunction(
      ({ sel, tgtW }: { sel: string; tgtW: number }) => {
        const img = document.querySelector(sel) as HTMLImageElement | null;
        return img && img.naturalWidth > 0 && Math.abs(img.naturalWidth - tgtW) <= 2;
      },
      { sel: '[data-resizer-result]', tgtW: 400 },
      { timeout: 15000 }
    );

    const secondSrc = await resultImg.evaluate((el: HTMLImageElement) => el.src);
    expect(secondSrc).not.toBe(firstSrc);

    const dims = await page.evaluate(() => {
      const img = document.querySelector('[data-resizer-result]') as HTMLImageElement;
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    expect(Math.abs(dims.w - 400)).toBeLessThanOrEqual(2);
  });

  test('fill mode changes preview', async ({ page }) => {
    await page.goto('/tools/resizer/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);
    await waitForImgLoaded(page, '[data-resizer-result]');

    const resultImg = page.locator('[data-resizer-result]');
    const fitSrc = await resultImg.evaluate((el: HTMLImageElement) => el.src);

    await page.locator('[data-resizer-mode="fill"]').click();
    await page.waitForFunction(
      ({ sel, oldSrc }: { sel: string; oldSrc: string }) => {
        const img = document.querySelector(sel) as HTMLImageElement | null;
        return img && img.src && img.src !== oldSrc && img.naturalWidth > 0;
      },
      { sel: '[data-resizer-result]', oldSrc: fitSrc },
      { timeout: 15000 }
    );

    const fillSrc = await resultImg.evaluate((el: HTMLImageElement) => el.src);
    expect(fillSrc).not.toBe(fitSrc);
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

  test.describe('Image Watermark tool', () => {
    test('upload zone visible on load', async ({ page }) => {
      await page.goto('/tools/watermark/', { waitUntil: 'load' });
      await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
    });

    test('no console errors on load', async ({ page }) => {
      const errors = await collectErrors(page);
      await page.goto('/tools/watermark/', { waitUntil: 'load' });
      expect(errors).toEqual([]);
    });

    test('uploads image, applies watermark, and downloads result', async ({ page }) => {
      await page.goto('/tools/watermark/', { waitUntil: 'load' });
      await uploadViaInput(page, TEST_IMAGE);
      await waitForImgLoaded(page, '[data-wm-original-img]');

      const previewArea = page.locator('[data-wm-preview]');
      await expect(previewArea).not.toBeHidden({ timeout: 8000 });

      const applyBtn = page.locator('[data-wm-apply]');
      await expect(applyBtn).toBeVisible();

      // Change watermark text
      const textInput = page.locator('[data-wm-text]');
      await textInput.fill('Test Watermark');

      // Click apply
      await applyBtn.click();

      const downloadSection = page.locator('[data-wm-download]');
      await expect(downloadSection).not.toBeHidden({ timeout: 8000 });

      const { suggestedName, buffer } = await captureDownload(
        page,
        page.locator('button[data-wm-download-btn]')
      );
      expect(suggestedName).toMatch(/demo-before_watermarked\.\w+$/i);
      expect(checkMagic(buffer, 'png')).toBe(true);
      expect(buffer.length).toBeGreaterThan(500);
    });

    test('rejects invalid file type', async ({ page }) => {
      await page.goto('/tools/watermark/', { waitUntil: 'load' });
      await uploadViaInput(page, INVALID_FILE);
      const previewArea = page.locator('[data-wm-preview]');
      await expect(previewArea).toBeHidden();
    });
  });
});

test.describe('Image Metadata Viewer tool', () => {
  test('upload zone visible on load', async ({ page }) => {
    await page.goto('/tools/metadata/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/metadata/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('uploads image and displays metadata results', async ({ page }) => {
    await page.goto('/tools/metadata/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    await expect(page.locator('[data-md-results]')).not.toBeHidden({ timeout: 15000 });

    // File info section should be visible
    const formatVal = page.locator('[data-md-format]');
    await expect(formatVal).not.toBeEmpty({ timeout: 8000 });

    const sizeVal = page.locator('[data-md-size]');
    await expect(sizeVal).not.toBeEmpty({ timeout: 5000 });
  });

  test('shows strip metadata section after upload', async ({ page }) => {
    await page.goto('/tools/metadata/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    await expect(page.locator('[data-md-strip-section]')).not.toBeHidden({ timeout: 15000 });
  });

  test('handles unsupported file type gracefully', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/metadata/', { waitUntil: 'load' });
    await uploadViaInput(page, INVALID_FILE);
    const resultsSection = page.locator('[data-md-results]');
    await expect(resultsSection).toBeHidden({ timeout: 5000 });
    expect(errors).toEqual([]);
  });
});

test.describe('Signature Resizer tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/signature/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/signature/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('preset buttons are visible', async ({ page }) => {
    await page.goto('/tools/signature/', { waitUntil: 'load' });
    const presets = page.locator('[data-sig-preset]');
    await expect(presets).toHaveCount(6);
  });

  test('background buttons are visible', async ({ page }) => {
    await page.goto('/tools/signature/', { waitUntil: 'load' });
    await expect(page.locator('[data-sig-bg]')).toHaveCount(2);
  });
});

test.describe('HEIC Converter tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/heic-converter/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/heic-converter/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('format buttons are visible', async ({ page }) => {
    await page.goto('/tools/heic-converter/', { waitUntil: 'load' });
    const formatBtns = page.locator('[data-heic-format]');
    await expect(formatBtns).toHaveCount(3);
  });

  test('quality slider is visible', async ({ page }) => {
    await page.goto('/tools/heic-converter/', { waitUntil: 'load' });
    await expect(page.locator('[data-heic-quality]')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Image to PDF tool', () => {
  test('upload zone is visible', async ({ page }) => {
    await page.goto('/tools/image-to-pdf/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/image-to-pdf/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('page size options are visible', async ({ page }) => {
    await page.goto('/tools/image-to-pdf/', { waitUntil: 'load' });
    const opts = page.locator('[data-pdf-page-size] [data-pdf-opt]');
    await expect(opts).toHaveCount(3);
  });

  test('uploads image and shows thumbnail', async ({ page }) => {
    await page.goto('/tools/image-to-pdf/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    const thumbGrid = page.locator('[data-pdf-thumb-grid]');
    await expect(thumbGrid).not.toBeHidden({ timeout: 10000 });

    const thumbImg = thumbGrid.locator('img');
    await expect(thumbImg).toHaveCount(1);

    const downloadSection = page.locator('[data-pdf-download]');
    await expect(downloadSection).not.toBeHidden({ timeout: 10000 });
  });

  test('uploads image, generates PDF, and downloads', async ({ page }) => {
    await page.goto('/tools/image-to-pdf/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    await page.locator('[data-pdf-thumb-grid]').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('[data-pdf-download]').waitFor({ state: 'visible', timeout: 15000 });

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-pdf-download-btn]')
    );
    expect(suggestedName).toMatch(/\.pdf$/i);
    // PDF magic bytes: %PDF
    expect(buffer[0]).toBe(0x25);
    expect(buffer[1]).toBe(0x50);
    expect(buffer[2]).toBe(0x44);
    expect(buffer[3]).toBe(0x46);
    expect(buffer.length).toBeGreaterThan(500);
  });
});

test.describe('Passport Photo Maker tool', () => {
  test('upload zone visible on load', async ({ page }) => {
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    await expect(page.locator('[data-tool-upload]')).toBeVisible({ timeout: 10000 });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = await collectErrors(page);
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    expect(errors).toEqual([]);
  });

  test('uploads image and shows crop area', async ({ page }) => {
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    const cropArea = page.locator('[data-passport-preview]');
    await expect(cropArea).not.toBeHidden({ timeout: 15000 });

    const cropWindow = page.locator('[data-passport-window]');
    await expect(cropWindow).toBeVisible({ timeout: 5000 });
  });

  test('generates passport photo and shows result', async ({ page }) => {
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    const generateBtn = page.locator('[data-passport-generate]');
    await expect(generateBtn).toBeVisible({ timeout: 10000 });
    await generateBtn.click();

    const resultSection = page.locator('[data-passport-result]');
    await expect(resultSection).not.toBeHidden({ timeout: 15000 });

    const singleImg = page.locator('[data-passport-single]');
    await expect(singleImg).not.toBeHidden({ timeout: 5000 });
  });

  test('generates and downloads single photo', async ({ page }) => {
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    await page.locator('[data-passport-generate]').click();
    await page.locator('[data-passport-result]').waitFor({ state: 'visible', timeout: 15000 });

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-passport-download]')
    );
    expect(suggestedName).toMatch(/demo-before_passport\.jpe?g$/i);
    expect(checkMagic(buffer, 'jpeg')).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
  });

  test('generates and downloads print layout', async ({ page }) => {
    await page.goto('/tools/passport/', { waitUntil: 'load' });
    await uploadViaInput(page, TEST_IMAGE);

    await page.locator('[data-passport-generate]').click();
    await page.locator('[data-passport-result]').waitFor({ state: 'visible', timeout: 15000 });

    const { suggestedName, buffer } = await captureDownload(
      page,
      page.locator('[data-passport-download-layout]')
    );
    expect(suggestedName).toMatch(/demo-before_passport_layout\.jpe?g$/i);
    expect(checkMagic(buffer, 'jpeg')).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
  });
});
