import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  outputFormat: 'jpeg',
  quality: 85,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'heic-converter',
  actionLabel: 'Convert',
  processingLabel: 'Converting HEIC images…',
  supportsBatch: true,
});
