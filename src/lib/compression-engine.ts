/**
 * CompressionEngine — browser-native image encoding.
 *
 * Strategy:
 *   - JPEG / PNG / WebP / AVIF / GIF: decode → canvas → toBlob('mime', quality)
 *   - SVG: passthrough (text re-serialization with optional metadata strip)
 *   - Resize: pre-resize canvas before encoding
 *   - Metadata: when removeMetadata is true we rely on the canvas pipeline,
 *     which never re-attaches EXIF/XMP. For SVG we strip <metadata> elements.
 *
 * This is intentionally canvas-based so the page works without bundling
 * WASM encoders in this milestone. Future milestone can swap in a
 * wasm encoder for formats/options the browser doesn't expose.
 */

import {
  type CompressionSettings,
  qualityFor,
  resolveMime,
  resolveOutputFormat,
} from './compression-settings';

export interface EncodeOptions {
  source: { mime: string; url: string; bytes: number };
  settings: CompressionSettings;
}

export interface EncodeResult {
  blob: Blob;
  mime: string;
  outputExt: string;
  /** Encoded bytes. */
  bytes: number;
  /** Encode wall-time in ms. */
  durationMs: number;
}

const MAX_CANVAS_DIMENSION = 16384;

export class CompressionEngine {
  /**
   * Encode a single image according to the supplied settings.
   * Throws on unrecoverable failure.
   */
  async encode(opts: EncodeOptions): Promise<EncodeResult> {
    const t0 = performance.now();
    const { source, settings } = opts;

    const outFormat = resolveOutputFormat(source.mime, settings.output);
    const mime = resolveMime(outFormat, source.mime);

    // SVG passthrough.
    if (mime === 'image/svg+xml') {
      return this.encodeSvg(opts, mime, t0);
    }

    // Raster → canvas → toBlob.
    const { canvas, naturalWidth, naturalHeight } = await loadCanvas(source.url, source.mime);

    let { width, height } = { width: naturalWidth, height: naturalHeight };
    if (settings.resize.enabled && settings.resize.mode !== 'original') {
      ({ width, height } = computeResize(width, height, settings.resize));
    }

    width = Math.min(MAX_CANVAS_DIMENSION, Math.max(1, Math.round(width)));
    height = Math.min(MAX_CANVAS_DIMENSION, Math.max(1, Math.round(height)));

    if (canvas.width !== width || canvas.height !== height) {
      const resized = drawResized(canvas, width, height, settings.resize.background);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(resized, 0, 0);
    }

    // Flatten alpha onto white for output formats that don't support
    // transparency (JPEG). This prevents transparent canvas pixels
    // (rgba(0,0,0,0)) from becoming visible black in the encoded output.
    if (mime === 'image/jpeg') {
      flattenAlpha(canvas, '#ffffff');
    }

    const quality = qualityFor(settings, mime) / 100;

    // Target-size binary search (best-effort, up to 6 iterations).
    let blob = await canvasToBlob(canvas, mime, quality);
    if (settings.targetSizeKb > 0 && mime !== 'image/png') {
      blob = await binarySearchTargetSize(
        canvas,
        mime,
        settings.targetSizeKb * 1024,
        blob.size
      );
    }

    return {
      blob,
      mime,
      outputExt: extFor(mime),
      bytes: blob.size,
      durationMs: performance.now() - t0,
    };
  }
}

async function encodeSvg(
  opts: EncodeOptions,
  mime: string,
  t0: number
): Promise<EncodeResult> {
  const res = await fetch(opts.source.url);
  let text = await res.text();

  if (opts.settings.removeMetadata) {
    // Strip <metadata>…</metadata> and XML processing instructions.
    text = text.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
    text = text.replace(/<\?xml[^?]*\?>/g, '');
    // Strip xmlns:xlink / sodipodi / inkscape namespaces' elements (best-effort).
    text = text.replace(/<sodipodi:[^>]*>[\s\S]*?<\/sodipodi:[^>]*>/gi, '');
  }

  const blob = new Blob([text], { type: mime });
  return {
    blob,
    mime,
    outputExt: 'svg',
    bytes: blob.size,
    durationMs: performance.now() - t0,
  };
}

// ---------- Canvas helpers -------------------------------------------------

async function loadCanvas(url: string, mime: string): Promise<{
  canvas: HTMLCanvasElement | OffscreenCanvas;
  naturalWidth: number;
  naturalHeight: number;
}> {
  if (mime === 'image/svg+xml') {
    throw new Error('SVG should not enter raster pipeline');
  }

  const isOffscreen = typeof OffscreenCanvas !== 'undefined';

  if (isOffscreen) {
    const blob = await (await fetch(url)).blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();
    return { canvas, naturalWidth: bitmap.width, naturalHeight: bitmap.height };
  }

  // Fallback: HTMLCanvasElement.
  const img = await loadImage(url);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(img, 0, 0);
  return { canvas, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image decode failed'));
    img.src = url;
  });
}

function drawResized(
  src: HTMLCanvasElement | OffscreenCanvas,
  width: number,
  height: number,
  background: string
): HTMLCanvasElement | OffscreenCanvas {
  const isOffscreen = typeof OffscreenCanvas !== 'undefined' && src instanceof OffscreenCanvas;
  const dest = isOffscreen
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), { width, height });
  const ctx = dest.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.fillStyle = background || '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(src as CanvasImageSource, 0, 0, width, height);
  return dest;
}

function canvasToBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: string,
  quality: number
): Promise<Blob> {
  if ('convertToBlob' in canvas) {
    return (canvas as OffscreenCanvas).convertToBlob({ type: mime, quality });
  }
  return new Promise((resolve, reject) => {
    (canvas as HTMLCanvasElement).toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Encode failed'))),
      mime,
      quality
    );
  });
}

/**
 * Composite the canvas content onto a solid background color.
 * This prevents transparent pixels from becoming black when
 * encoded to a format without alpha (e.g. JPEG).
 */
function flattenAlpha(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  bg: string
): void {
  const isOffscreen = typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas;
  const w = canvas.width;
  const h = canvas.height;
  const dest = isOffscreen
    ? new OffscreenCanvas(w, h)
    : Object.assign(document.createElement('canvas'), { width: w, height: h });
  const ctx = dest.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!ctx) return;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(canvas as CanvasImageSource, 0, 0);
  // Replace the original canvas content.
  const srcCtx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!srcCtx) return;
  srcCtx.clearRect(0, 0, w, h);
  srcCtx.drawImage(dest as CanvasImageSource, 0, 0);
}

async function binarySearchTargetSize(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: string,
  target: number,
  startingSize: number
): Promise<Blob> {
  // Already small enough.
  if (startingSize <= target) {
    return canvasToBlob(canvas, mime, 0.75);
  }
  let lo = 0.1;
  let hi = 0.95;
  let best: Blob | null = null;
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    if (!best) best = blob;
    if (blob.size <= target) {
      lo = mid;
      best = blob;
    } else {
      hi = mid;
    }
  }
  return best ?? (await canvasToBlob(canvas, mime, lo));
}

// ---------- Resize ----------------------------------------------------------

function computeResize(
  width: number,
  height: number,
  resize: CompressionSettings['resize']
): { width: number; height: number } {
  const target = Math.max(1, resize.longEdge);

  if (resize.mode === 'width') {
    const ratio = width / Math.max(1, width);
    const newW = Math.min(width, target);
    return { width: newW, height: Math.round((height * newW) / Math.max(1, width)) };
  }

  if (resize.mode === 'height') {
    const newH = Math.min(height, target);
    return { width: Math.round((width * newH) / Math.max(1, height)), height: newH };
  }

  // 'fit' / 'fill' — scale to fit long edge.
  const scale = Math.min(target / width, target / height, 1);
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

function extFor(mime: string): string {
  switch (mime) {
    case 'image/jpeg': return 'jpg';
    case 'image/png': return 'png';
    case 'image/webp': return 'webp';
    case 'image/avif': return 'avif';
    case 'image/gif': return 'gif';
    case 'image/svg+xml': return 'svg';
    default: return 'bin';
  }
}