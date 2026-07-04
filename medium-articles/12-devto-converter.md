---
title: Client-Side Image Format Conversion — JPEG, PNG, WebP, AVIF in the Browser
published: false
description: Convert images between formats using nothing but the browser's Canvas API. Batch support, no uploads, HEIC input via browser decoding.
tags: javascript, webdev, performance, tutorial
canonical_url: https://toolboximage.com/tools/converter/
---

# Client-Side Image Format Conversion

Converting an image from one format to another usually means opening Photoshop, GIMP, or uploading to a service. But the browser can do it natively — and it's surprisingly simple.

## The API

The same `canvas.toBlob()` that handles compression also handles format conversion:

```js
async function convertImage(file, targetFormat, quality = 0.92) {
  const mimeMap = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
  };
  
  const img = await loadImage(URL.createObjectURL(file));
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext('2d').drawImage(img, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeMap[targetFormat], quality);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
```

That's the entire conversion logic. The browser handles all the format-specific encoding internally.

## What Happens to Transparency?

When converting PNG (with transparency) to JPEG (no transparency), the transparent areas become white or black depending on the browser. If you need to control this:

```js
const ctx = canvas.getContext('2d');
// Fill with white background first
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0);
```

This is especially important for logos and graphics that rely on transparent backgrounds.

## Detecting Format Support

Not all browsers support all output formats. AVIF is still rolling out. Here's a reliable detection pattern:

```js
async function getSupportedFormats() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 1, 1);
  
  const formats = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  const results = {};
  
  for (const mime of formats) {
    results[mime] = await new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob?.type === mime), mime, 0.5);
    });
  }
  return results;
}
```

## Batch Conversion Flow

For processing multiple files, use a simple queue pattern:

```js
async function batchConvert(files, targetFormat, quality) {
  const results = [];
  for (const file of files) {
    const blob = await convertImage(file, targetFormat, quality);
    const name = file.name.replace(/\.[^.]+$/, '') + '.' + targetFormat;
    results.push({ blob, name });
  }
  return results;
}
```

## Supported Conversion Matrix

| Source | → JPEG | → PNG | → WebP | → AVIF |
|--------|--------|-------|--------|--------|
| JPEG | — | ✓ | ✓ | ✓ |
| PNG | ✓ | — | ✓ | ✓ |
| WebP | ✓ | ✓ | — | ✓ |
| AVIF | ✓ | ✓ | ✓ | — |
| GIF | ✓ | ✓ | ✓ | ✓ |
| SVG | ✓ | ✓ | ✓ | ✓ |

## HEIC/HEIF Input

iPhone photos in HEIC format are trickier — browsers can't decode them natively through `<img>`. The workaround is to use the `image/heic` MIME support detection (growing in Chrome) or decode via a WASM library like `libheif-js`. The [ToolBox Image Converter](https://toolboximage.com/tools/converter/) handles this transparently.

## The Tool

If you'd rather use a ready-made solution, [ToolBox Image Converter](https://toolboximage.com/tools/converter/) does all of this with a drag-drop UI, batch ZIP export, HEIC support, and adjustable quality — all client-side, zero uploads.

---

*Try it at [toolboximage.com/tools/converter/](https://toolboximage.com/tools/converter/)*
