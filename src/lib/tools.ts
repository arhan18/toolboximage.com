import type { ToolConfig, ToolId } from '../types';

export const tools: ToolConfig[] = [
  {
    id: 'compressor',
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: 'compress',
    path: '/compressor',
    available: true,
  },
  {
    id: 'resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension',
    icon: 'resize',
    path: '/resizer',
    available: false,
  },
  {
    id: 'converter',
    name: 'Image Converter',
    description: 'Convert between image formats',
    icon: 'convert',
    path: '/converter',
    available: false,
  },
  {
    id: 'cropper',
    name: 'Image Cropper',
    description: 'Crop images with precision',
    icon: 'crop',
    path: '/cropper',
    available: false,
  },
  {
    id: 'watermark',
    name: 'Watermark',
    description: 'Add watermarks to your images',
    icon: 'watermark',
    path: '/watermark',
    available: false,
  },
];

export function getTool(id: ToolId): ToolConfig | undefined {
  return tools.find((t) => t.id === id);
}

export function getAvailableTools(): ToolConfig[] {
  return tools.filter((t) => t.available);
}
