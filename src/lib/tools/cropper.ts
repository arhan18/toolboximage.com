import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  aspectRatio: 'free',
  x: 0,
  y: 0,
  width: 800,
  height: 600,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'cropper',
  actionLabel: 'Crop',
  processingLabel: 'Cropping images…',
  supportsBatch: true,
});
