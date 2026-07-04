---
title: Building a Passport Photo Maker with Canvas — Country Presets, Print Layouts, and DPI
published: false
description: How to build a browser-based passport photo maker with country-specific dimensions, background colors, crop guides, and 4×6 print layouts.
tags: javascript, webdev, tutorial, privacy
canonical_url: https://toolboximage.com/tools/passport/
---

# Building a Passport Photo Maker with Canvas

Government passport photo requirements are surprisingly specific. The US requires 2×2 inches (600×600 px at 300 DPI), the UK requires 35×45 mm (413×531 px), Canada requires 50×70 mm (591×827 px), and getting any of these wrong means your application gets rejected.

Here's how to build a passport photo maker that handles all of this in the browser.

## Country Preset System

Start by defining the specs as data:

```js
const specs = [
  { id: 'us', label: 'US Passport', widthMm: 51, heightMm: 51, widthPx: 600, heightPx: 600, aspect: 1 },
  { id: 'uk', label: 'UK Passport', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, aspect: 35/45 },
  { id: 'canada', label: 'Canada Passport', widthMm: 50, heightMm: 70, widthPx: 591, heightPx: 827, aspect: 50/70 },
  { id: 'china', label: 'China Passport', widthMm: 33, heightMm: 48, widthPx: 390, heightPx: 567, aspect: 33/48 },
  { id: 'japan', label: 'Japan Passport', widthMm: 35, heightMm: 45, widthPx: 413, heightPx: 531, aspect: 35/45 },
];
```

Pixel dimensions at 300 DPI = (mm / 25.4) × 300.

## Interactive Crop with Locked Aspect Ratio

The crop window must maintain the selected country's aspect ratio during resize:

```js
function applyAspect(crop, spec) {
  const cx = crop.x + crop.w / 2;
  const cy = crop.y + crop.h / 2;
  const ratio = spec.aspect;
  
  if (crop.w / crop.h > ratio) {
    crop.w = Math.round(crop.h * ratio);
  } else {
    crop.h = Math.round(crop.w / ratio);
  }
  
  crop.x = Math.round(cx - crop.w / 2);
  crop.y = Math.round(cy - crop.h / 2);
}
```

The crop box uses pointer events with 4 corner handles. When a handle is dragged, the aspect ratio constraint is applied after the resize delta, ensuring the crop always matches the target aspect ratio.

## Generating the Passport Photo

Once the user has positioned the crop, render at the exact spec dimensions:

```js
function generatePhoto(sourceImg, crop, spec, bgColor) {
  const nw = sourceImg.naturalWidth;
  const nh = sourceImg.naturalHeight;
  
  // Crop coordinates in source image space
  const sx = (crop.x / crop.displayW) * nw;
  const sy = (crop.y / crop.displayH) * nh;
  const sw = (crop.w / crop.displayW) * nw;
  const sh = (crop.h / crop.displayH) * nh;
  
  const canvas = document.createElement('canvas');
  canvas.width = spec.widthPx;
  canvas.height = spec.heightPx;
  const ctx = canvas.getContext('2d');
  
  // Fill background color first
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw the cropped region at spec dimensions
  ctx.drawImage(sourceImg, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}
```

## 4×6 Print Layout

Photo kiosks print standard 4×6 inch paper. Fit multiple passport photos on one sheet with cut guides:

```js
function generatePrintLayout(singleCanvas, spec, bgColor) {
  const layoutCanvas = document.createElement('canvas');
  const lw = 1200, lh = 1800; // 4×6 inches at 300 DPI
  layoutCanvas.width = lw;
  layoutCanvas.height = lh;
  const ctx = layoutCanvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, lw, lh);
  
  const pw = spec.widthPx;
  const ph = spec.heightPx;
  const margin = 30, gap = 20;
  const usableW = lw - 2 * margin;
  const usableH = lh - 2 * margin;
  
  const scaleX = (usableW - gap) / (2 * pw);
  const scaleY = (usableH - gap) / (3 * ph);
  const scale = Math.min(scaleX, scaleY, 1);
  const dw = Math.round(pw * scale);
  const dh = Math.round(ph * scale);
  const cols = Math.floor((usableW + gap) / (dw + gap));
  const rows = Math.min(Math.floor((usableH + gap) / (dh + gap)), 4);
  
  const offsetX = Math.round((lw - (cols * dw + (cols - 1) * gap)) / 2);
  const offsetY = Math.round((lh - (rows * dh + (rows - 1) * gap)) / 2);
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = offsetX + c * (dw + gap);
      const y = offsetY + r * (dh + gap);
      // Dotted cut lines
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x - 1, y - 1, dw + 2, dh + 2);
      ctx.setLineDash([]);
      // Photo with background
      ctx.fillStyle = bgColor;
      ctx.fillRect(x, y, dw, dh);
      ctx.drawImage(singleCanvas, 0, 0, pw, ph, x, y, dw, dh);
    }
  }
  
  return layoutCanvas;
}
```

## The Tool

The [ToolBox Image Passport Photo Maker](https://toolboximage.com/tools/passport/) implements all of this with 10 country presets, 4 background colors, arrow key fine positioning, and both single photo + print layout downloads. All client-side, zero uploads.

---

*Try it at [toolboximage.com/tools/passport/](https://toolboximage.com/tools/passport/)*
