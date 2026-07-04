---
title: Reading and Stripping EXIF Metadata in the Browser with exifr
published: false
description: How to parse EXIF, GPS, and XMP metadata from images using the exifr library, and strip it before sharing. All client-side, zero uploads.
tags: javascript, privacy, webdev, tutorial
canonical_url: https://toolboximage.com/tools/metadata/
---

# Reading and Stripping EXIF Metadata in the Browser

Every photo you take with a smartphone contains hidden data — GPS coordinates, camera settings, timestamps, and sometimes even the camera's serial number. When you share that photo online without stripping metadata, you're broadcasting your private information to anyone who knows where to look.

Here's how to read and remove EXIF data entirely in the browser.

## Parsing EXIF with `exifr`

The [exifr](https://github.com/MikeKovarik/exifr) library is the best option for client-side EXIF parsing. It's fast, tree-shakeable, and supports JPEG, TIFF, and HEIC:

```bash
npm install exifr
```

```js
import * as exifr from 'exifr';

async function readMetadata(file) {
  // Parse all available metadata
  const metadata = await exifr.parse(file);
  console.log(metadata);
  
  // Parse specific sections
  const gps = await exifr.gps(file);
  const camera = await exifr.parse(file, ['Make', 'Model', 'ISO', 'FNumber']);
  
  return { metadata, gps, camera };
}
```

## What You Can Extract

```js
// Camera info
{
  Make: 'Canon',
  Model: 'EOS R5',
  ISOSpeedRatings: 800,
  FNumber: 2.8,
  FocalLength: 50,
  ExposureTime: 0.004,  // 1/250s
  LensModel: 'RF 50mm f/1.2L'
}

// GPS data
{
  latitude: 28.6139,
  longitude: 77.2090,
  altitude: 216
}

// Image details
{
  DateTimeOriginal: '2024-03-15T14:30:00.000Z',
  Software: 'Adobe Lightroom',
  ColorSpace: 'sRGB'
}
```

## Stripping Metadata with Canvas

The simplest way to strip all metadata is to re-encode the image through a canvas element. Canvas outputs always strip EXIF/XMP/IPTC data:

```js
async function stripMetadata(file) {
  const img = await loadImage(URL.createObjectURL(file));
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext('2d').drawImage(img, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const clean = new File([blob], file.name, { type: file.type });
      resolve(clean);
    }, file.type, 1.0);
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

**Important caveat:** This re-encodes the image, which is a lossy operation for JPEG. The quality degradation is minimal at 1.0, but it's not pixel-identical to the original. For most use cases (social media, web uploads), this is an acceptable trade-off for privacy.

## Organized Display

Raw EXIF output is a flat object with 80+ fields. Users benefit from categorization:

```js
const categories = {
  'Camera': ['Make', 'Model', 'ISOSpeedRatings', 'FNumber', 'FocalLength', 'ExposureTime', 'Flash'],
  'GPS': ['latitude', 'longitude', 'altitude'],
  'File Info': ['Format', 'FileSize', 'ImageWidth', 'ImageHeight'],
  'Image Details': ['DateTimeOriginal', 'Software', 'ColorSpace', 'ResolutionUnit'],
};
```

## The Production Tool

The [ToolBox Image Metadata Viewer](https://toolboximage.com/tools/metadata/) implements this with organized cards, GPS coordinates with map links, and a one-click "Strip Metadata" button. All processing happens in your browser — your images never leave your device.

---

*Try it at [toolboximage.com/tools/metadata/](https://toolboximage.com/tools/metadata/)*
