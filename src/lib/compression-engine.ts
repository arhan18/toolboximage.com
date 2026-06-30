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
  bytes: number;
  durationMs: number;
  compressed: boolean;
  note?: string;
}

const MAX_CANVAS_DIMENSION = 16384;
const MIN_BLOB_BYTES = 100;

let formatCache = new Map<string, boolean>();

async function supportsEncode(mime: string): Promise<boolean> {
  if (formatCache.has(mime)) return formatCache.get(mime)!;
  try {
    if (typeof OffscreenCanvas === 'undefined') {
      formatCache.set(mime, false);
      return false;
    }
    const canvas = new OffscreenCanvas(2, 2);
    const ctx = canvas.getContext('2d');
    if (!ctx) { formatCache.set(mime, false); return false; }
    ctx.fillRect(0, 0, 2, 2);
    const blob = await canvas.convertToBlob({ type: mime, quality: 0.5 });
    const ok = blob && blob.size > 0;
    formatCache.set(mime, ok);
    return ok;
  } catch {
    formatCache.set(mime, false);
    return false;
  }
}

function isLossyFormat(mime: string): boolean {
  return mime === 'image/jpeg' || mime === 'image/webp' || mime === 'image/avif';
}

export class CompressionEngine {
  async encode(opts: EncodeOptions): Promise<EncodeResult> {
    const t0 = performance.now();
    const { source, settings } = opts;

    const outFormat = resolveOutputFormat(source.mime, settings.output);
    const mime = resolveMime(outFormat, source.mime);

    if (mime === 'image/svg+xml') {
      return this.encodeSvg(opts, mime, t0);
    }

    if (mime === 'image/gif' && !(await supportsEncode('image/gif'))) {
      return this.encodePassthrough(source, t0);
    }

    if (mime === 'image/avif' && !(await supportsEncode('image/avif'))) {
      const fallbackMime = 'image/webp';
      if (await supportsEncode(fallbackMime)) {
        return this.encodeRaster(source, fallbackMime, settings, t0);
      }
      const jpegMime = 'image/jpeg';
      if (await supportsEncode(jpegMime)) {
        return this.encodeRaster(source, jpegMime, settings, t0);
      }
      return this.encodeRaster(source, 'image/png', settings, t0);
    }

    if (mime === 'image/webp' && !(await supportsEncode('image/webp'))) {
      const jpegMime = 'image/jpeg';
      if (await supportsEncode(jpegMime)) {
        return this.encodeRaster(source, jpegMime, settings, t0);
      }
      return this.encodeRaster(source, 'image/png', settings, t0);
    }

    return this.encodeRaster(source, mime, settings, t0);
  }

  private async encodeRaster(
    source: { mime: string; url: string; bytes: number },
    mime: string,
    settings: CompressionSettings,
    t0: number
  ): Promise<EncodeResult> {
    const { canvas, naturalWidth, naturalHeight } = await loadCanvas(source.url);

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

    const quality = qualityFor(settings, mime) / 100;

    let blob = await canvasToBlob(canvas, mime, quality);
    validateBlob(blob);

    if (settings.targetSizeKb > 0 && !(mime === 'image/png' || mime === 'image/gif')) {
      blob = await binarySearchTargetSize(
        canvas,
        mime,
        quality,
        settings.targetSizeKb * 1024,
        blob.size
      );
      validateBlob(blob);
    }

    const sourceBytes = source.bytes;

    if (blob.size < sourceBytes) {
      return {
        blob,
        mime,
        outputExt: extFor(mime),
        bytes: blob.size,
        durationMs: performance.now() - t0,
        compressed: true,
      };
    }

    if (isLossyFormat(mime)) {
      const better = await tryProgressiveQuality(canvas, mime, quality, sourceBytes);
      if (better) {
        return {
          blob: better,
          mime,
          outputExt: extFor(mime),
          bytes: better.size,
          durationMs: performance.now() - t0,
          compressed: true,
        };
      }
    }

    return this.returnOriginal(source, t0);
  }

  private async returnOriginal(
    source: { url: string; mime: string; bytes: number },
    t0: number
  ): Promise<EncodeResult> {
    const res = await fetch(source.url);
    const blob = await res.blob();
    return {
      blob,
      mime: source.mime,
      outputExt: extFor(source.mime),
      bytes: blob.size,
      durationMs: performance.now() - t0,
      compressed: false,
      note: 'Already optimized — no further compression possible without increasing file size.',
    };
  }

  private async encodePassthrough(
    source: { url: string; mime: string },
    t0: number
  ): Promise<EncodeResult> {
    const res = await fetch(source.url);
    const blob = await res.blob();
    const mime = source.mime.startsWith('image/') ? source.mime : 'image/png';
    return {
      blob,
      mime,
      outputExt: extFor(mime),
      bytes: blob.size,
      durationMs: performance.now() - t0,
      compressed: false,
    };
  }

  private async encodeSvg(
    opts: EncodeOptions,
    mime: string,
    t0: number
  ): Promise<EncodeResult> {
    const res = await fetch(opts.source.url);
    let text = await res.text();

    if (opts.settings.removeMetadata) {
      text = text.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
      text = text.replace(/<\?xml[^?]*\?>/g, '');
      text = text.replace(/<sodipodi:[^>]*>[\s\S]*?<\/sodipodi:[^>]*>/gi, '');
    }

    const blob = new Blob([text], { type: mime });

    const sourceBytes = opts.source.bytes;
    const isSmaller = blob.size < sourceBytes;

    if (isSmaller) {
      return {
        blob,
        mime,
        outputExt: 'svg',
        bytes: blob.size,
        durationMs: performance.now() - t0,
        compressed: true,
      };
    }

    return {
      blob,
      mime,
      outputExt: 'svg',
      bytes: blob.size,
      durationMs: performance.now() - t0,
      compressed: false,
      note: blob.size >= sourceBytes
        ? 'Already optimized — no further compression possible without increasing file size.'
        : undefined,
    };
  }
}

function validateBlob(blob: Blob): void {
  if (!blob) throw new Error('Encode failed: null blob');
  if (blob.size === 0) throw new Error('Encode failed: empty blob');
  if (blob.size < MIN_BLOB_BYTES) {
    console.warn(`[compression] Small blob: ${blob.size} bytes (type=${blob.type})`);
  }
}

async function loadCanvas(url: string): Promise<{
  canvas: HTMLCanvasElement | OffscreenCanvas;
  naturalWidth: number;
  naturalHeight: number;
}> {
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
    img.decoding = 'async';
    img.src = url;
  });
}

function drawResized(
  src: HTMLCanvasElement | OffscreenCanvas,
  width: number,
  height: number,
  background: string
): HTMLCanvasElement | OffscreenCanvas {
  const dest = document.createElement('canvas');
  dest.width = width;
  dest.height = height;
  const ctx = dest.getContext('2d');
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
  if (mime === 'image/jpeg') {
    const w = canvas.width;
    const h = canvas.height;
    const temp = document.createElement('canvas');
    temp.width = w;
    temp.height = h;
    const ctx = temp.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(canvas as CanvasImageSource, 0, 0);
    return new Promise((resolve, reject) => {
      temp.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Encode failed'))),
        mime,
        quality
      );
    });
  }

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

async function binarySearchTargetSize(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: string,
  originalQuality: number,
  target: number,
  startingSize: number
): Promise<Blob> {
  if (startingSize <= target) {
    return canvasToBlob(canvas, mime, originalQuality);
  }
  let lo = 0.1;
  let hi = originalQuality;
  let best: Blob | null = null;
  for (let i = 0; i < 6; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, mime, mid);
    validateBlob(blob);
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

async function tryProgressiveQuality(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: string,
  initialQuality: number,
  sourceBytes: number
): Promise<Blob | null> {
  const scales = [0.85, 0.7, 0.5, 0.3];
  for (const scale of scales) {
    const q = initialQuality * scale;
    if (q < 0.05) break;
    const blob = await canvasToBlob(canvas, mime, q);
    validateBlob(blob);
    if (blob.size < sourceBytes) return blob;
  }
  return null;
}

function computeResize(
  width: number,
  height: number,
  resize: CompressionSettings['resize']
): { width: number; height: number } {
  const target = Math.max(1, resize.longEdge);

  if (resize.mode === 'width') {
    const newW = Math.min(width, target);
    return { width: newW, height: Math.round((height * newW) / Math.max(1, width)) };
  }

  if (resize.mode === 'height') {
    const newH = Math.min(height, target);
    return { width: Math.round((width * newH) / Math.max(1, height)), height: newH };
  }

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
