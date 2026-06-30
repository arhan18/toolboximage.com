/**
 * Compression settings — mode presets + per-option flags.
 *
 * The actual encoding is performed by CompressionEngine using the browser's
 * native canvas/toBlob pipeline. Settings describe the user's intent; the
 * engine translates them into encoder options (quality, mime type, etc.).
 *
 * Modes:
 *   - auto       : pick best encoder per source format; balanced quality
 *   - maximum    : most aggressive — smallest file, may show artefacts
 *   - high       : high-quality — visually identical, smaller files
 *   - custom     : user controls quality / size / metadata / resize
 */

export type CompressionMode = 'auto' | 'maximum' | 'high' | 'custom';

export type OutputFormat = 'keep' | 'jpeg' | 'png' | 'webp' | 'avif' | 'gif' | 'svg';

export interface ResizeOptions {
  enabled: boolean;
  /** 'original' | 'width' | 'height' | 'fit' | 'fill' */
  mode: 'original' | 'width' | 'height' | 'fit' | 'fill';
  /** Long-edge target (px). */
  longEdge: number;
  /** When mode === 'fit' / 'fill', background color for letterboxing. */
  background: string;
}

export interface CompressionSettings {
  mode: CompressionMode;
  output: OutputFormat;
  /** 1-100. */
  quality: number;
  /** Target file size in KB; 0 = off. Engine will binary-search quality. */
  targetSizeKb: number;
  resize: ResizeOptions;
  progressiveJpeg: boolean;
  /** PNG: strip ancillary chunks (iTXt, tEXt, etc.). */
  pngOptimize: boolean;
  /** WebP: 1-100. */
  webpQuality: number;
  /** AVIF: 1-100. */
  avifQuality: number;
  /** Strip EXIF / XMP / IPTC / color profile. */
  removeMetadata: boolean;
}

export const DEFAULT_SETTINGS: CompressionSettings = {
  mode: 'auto',
  output: 'keep',
  quality: 75,
  targetSizeKb: 0,
  resize: {
    enabled: false,
    mode: 'original',
    longEdge: 2048,
    background: '#ffffff',
  },
  progressiveJpeg: true,
  pngOptimize: true,
  webpQuality: 75,
  avifQuality: 55,
  removeMetadata: true,
};

// ---------- Mode presets ----------------------------------------------------

export const MODE_PRESETS: Record<CompressionMode, Partial<CompressionSettings>> = {
  auto: {
    mode: 'auto',
    output: 'keep',
    quality: 80,
    targetSizeKb: 0,
    progressiveJpeg: true,
    pngOptimize: true,
    webpQuality: 80,
    avifQuality: 60,
    removeMetadata: true,
  },
  maximum: {
    mode: 'maximum',
    output: 'webp',
    quality: 30,
    targetSizeKb: 0,
    progressiveJpeg: false,
    pngOptimize: true,
    webpQuality: 30,
    avifQuality: 20,
    removeMetadata: true,
  },
  high: {
    mode: 'high',
    output: 'keep',
    quality: 92,
    targetSizeKb: 0,
    progressiveJpeg: true,
    pngOptimize: true,
    webpQuality: 92,
    avifQuality: 80,
    removeMetadata: false,
  },
  custom: {}, // user-controlled
};

// ---------- Source → recommended output mapping ----------------------------

export const SOURCE_MIME: Record<string, OutputFormat> = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

export const OUTPUT_MIME: Record<OutputFormat, string | null> = {
  keep: null,
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

export const OUTPUT_EXT: Record<OutputFormat, string> = {
  keep: '', // decided by source mime
  jpeg: 'jpg',
  png: 'png',
  webp: 'webp',
  avif: 'avif',
  gif: 'gif',
  svg: 'svg',
};

// ---------- Helpers ---------------------------------------------------------

export function resolveOutputFormat(sourceMime: string, output: OutputFormat): OutputFormat {
  if (output !== 'keep') return output;
  return SOURCE_MIME[sourceMime] ?? 'jpeg';
}

export function resolveMime(output: OutputFormat, sourceMime: string): string {
  if (output === 'keep') {
    return sourceMime.startsWith('image/') ? sourceMime : 'image/jpeg';
  }
  return OUTPUT_MIME[output] ?? 'image/jpeg';
}

/** Quality used to encode a given format, given the current settings. */
export function qualityFor(
  settings: CompressionSettings,
  mime: string
): number {
  if (mime === 'image/webp') return clamp(settings.webpQuality, 1, 100);
  if (mime === 'image/avif') return clamp(settings.avifQuality, 1, 100);
  return clamp(settings.quality, 1, 100);
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

/** Human-readable label for the mode. */
export const MODE_LABEL: Record<CompressionMode, string> = {
  auto: 'Auto',
  maximum: 'Maximum',
  high: 'High quality',
  custom: 'Custom',
};

export const MODE_DESCRIPTION: Record<CompressionMode, string> = {
  auto: 'Balanced. Picks the best encoder per image.',
  maximum: 'Smallest possible file. Visual differences may be visible.',
  high: 'Largest savings with no perceptible quality loss.',
  custom: 'Tune every setting yourself.',
};