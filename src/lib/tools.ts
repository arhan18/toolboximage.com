import type { ToolConfig, ToolId } from '../types';

export const tools: ToolConfig[] = [
  // ── Live ──────────────────────────────────────────────────────────
  {
    id: 'compressor',
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: 'compress',
    path: '/compressor/',
    category: 'transform',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml', 'image/heic', 'image/heif'],
    outputFormats: ['JPEG', 'PNG', 'WebP', 'AVIF', 'GIF', 'SVG'],
    maxInputs: 200,
    maxFileSize: 100 * 1024 * 1024,
    steps: ['upload', 'configure', 'process', 'results'],
  },

  // ── Coming soon ───────────────────────────────────────────────────
  {
    id: 'converter',
    name: 'Image Converter',
    shortName: 'Converter',
    description: 'Convert images between any format — JPEG, PNG, WebP, AVIF, and more',
    longDescription: 'Batch convert images between formats while preserving quality. Perfect for unifying a mixed-format library or preparing assets for specific platforms.',
    icon: 'convert',
    path: '/tools/converter/',
    category: 'convert',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml', 'image/heic'],
    outputFormats: ['JPEG', 'PNG', 'WebP', 'AVIF', 'GIF', 'SVG'],
    maxInputs: 50,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'resizer',
    name: 'Image Resizer',
    shortName: 'Resizer',
    description: 'Resize images to exact dimensions, aspect ratios, or target file sizes',
    longDescription: 'Resize single images or batches with smart cropping, aspect-ratio lock, and preset dimension profiles for social media, email, and print.',
    icon: 'resize',
    path: '/tools/resizer/',
    category: 'transform',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    maxInputs: 50,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'cropper',
    name: 'Image Cropper',
    shortName: 'Cropper',
    description: 'Crop images with preset ratios or freeform selection',
    longDescription: 'Crop images using common aspect ratios (16:9, 4:3, 1:1, etc.) or draw a custom region. Batch-crop with consistent framing across a set of images.',
    icon: 'crop',
    path: '/tools/cropper/',
    category: 'transform',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    outputFormats: ['JPEG', 'PNG', 'WebP'],
    maxInputs: 20,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'rotator',
    name: 'Image Rotator',
    shortName: 'Rotator',
    description: 'Rotate images 90°, 180°, 270°, or by a custom angle',
    longDescription: 'Rotate single images or batches by preset angles or a custom degree value. Auto-crop to fit after rotation.',
    icon: 'rotate',
    path: '/tools/rotator/',
    category: 'transform',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    outputFormats: ['JPEG', 'PNG', 'WebP', 'AVIF'],
    maxInputs: 50,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'watermark',
    name: 'Image Watermark',
    shortName: 'Watermark',
    description: 'Add text watermarks to images with custom opacity, position, and styling',
    longDescription: 'Add visible text watermarks to protect your images. Customize font, size, color, opacity, rotation, and position. Perfect for branding, copyright notices, and social media content.',
    icon: 'watermark',
    path: '/tools/watermark/',
    category: 'transform',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    outputFormats: ['JPEG', 'PNG', 'WebP'],
    maxInputs: 1,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'flipper',
    name: 'Image Flipper',
    shortName: 'Flipper',
    description: 'Flip images horizontally, vertically, or both',
    longDescription: 'Mirror images horizontally, vertically, or both axes at once. Useful for correcting selfie mirrors or creating symmetrical compositions.',
    icon: 'flip',
    path: '/tools/flipper/',
    category: 'transform',
    status: 'coming-soon',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    maxInputs: 50,
    steps: ['upload', 'configure', 'process', 'results'],
  },
  {
    id: 'format-viewer',
    name: 'Image Format Viewer',
    shortName: 'Format Info',
    description: 'Inspect image format details — color space, bit depth, compression type',
    longDescription: 'View detailed format information: color profile, chroma subsampling, bit depth, compression method, EXIF thumbnail offset, and more. No upload required.',
    icon: 'info',
    path: '/tools/format-viewer/',
    category: 'analyze',
    status: 'coming-soon',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml', 'image/heic'],
    maxInputs: 1,
    steps: ['upload', 'results'],
  },
  {
    id: 'heic-converter',
    name: 'HEIC Converter',
    shortName: 'HEIC',
    description: 'Convert Apple HEIC/HEIF photos to JPEG, PNG, or WebP',
    longDescription: 'Convert Apple HEIC/HEIF photos to universally compatible formats. Essential for Windows, Android, and web upload workflows.',
    icon: 'image',
    path: '/tools/heic-converter/',
    category: 'convert',
    status: 'coming-soon',
    inputFormats: ['image/heic', 'image/heif'],
    outputFormats: ['JPEG', 'PNG', 'WebP'],
    maxInputs: 50,
    steps: ['upload', 'configure', 'process', 'results'],
  },

  // ── Planned ───────────────────────────────────────────────────────
  {
    id: 'background-remover',
    name: 'Background Remover',
    shortName: 'Bg Remover',
    description: 'Remove image backgrounds automatically',
    longDescription: 'AI-powered background removal for portraits, product photos, and more. Uses a client-side segmentation model — no uploads.',
    icon: 'cut',
    path: '/tools/background-remover/',
    category: 'transform',
    status: 'planned',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxInputs: 10,
    steps: ['upload', 'process', 'results'],
    requiresWasm: true,
  },
  {
    id: 'watermark-remover',
    name: 'Watermark Remover',
    shortName: 'Watermark',
    description: 'Remove watermarks and overlays from images',
    longDescription: 'Intelligently erase watermarks, logos, text overlays, and other undesired elements using content-aware fill.',
    icon: 'eraser',
    path: '/tools/watermark-remover/',
    category: 'transform',
    status: 'planned',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxInputs: 10,
    steps: ['upload', 'configure', 'process', 'results'],
    requiresWasm: true,
  },
  {
    id: 'metadata',
    name: 'Metadata Viewer',
    shortName: 'Metadata',
    description: 'View, edit, and strip EXIF / XMP / IPTC metadata',
    longDescription: 'Inspect and edit photo metadata: GPS location, camera settings, dates, copyright. Strip all metadata for privacy-sensitive exports.',
    icon: 'info',
    path: '/tools/metadata/',
    category: 'analyze',
    status: 'live',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/tiff'],
    maxInputs: 1,
    steps: ['upload', 'results'],
  },
  {
    id: 'blur',
    name: 'Blur Tools',
    shortName: 'Blur',
    description: 'Blur faces, license plates, or custom regions',
    longDescription: 'Apply pixelation, Gaussian blur, or mosaic effects to selected regions. Perfect for anonymizing photos before publishing.',
    icon: 'eye-off',
    path: '/tools/blur/',
    category: 'transform',
    status: 'planned',
    inputFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxInputs: 10,
    steps: ['upload', 'configure', 'process', 'results'],
  },
];

/** Convenience lookups */
export function getTool(id: ToolId): ToolConfig | undefined {
  return tools.find((t) => t.id === id);
}

export function getAvailableTools(): ToolConfig[] {
  return tools.filter((t) => t.status === 'live');
}

export function getToolsByCategory(category: string): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}

export function getToolsByStatus(status: string): ToolConfig[] {
  return tools.filter((t) => t.status === status);
}

export function getComingSoonTools(): ToolConfig[] {
  return tools.filter((t) => t.status === 'coming-soon' || t.status === 'beta');
}

export function getPlannedTools(): ToolConfig[] {
  return tools.filter((t) => t.status === 'planned');
}
