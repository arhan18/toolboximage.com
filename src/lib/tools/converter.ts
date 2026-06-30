import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  outputFormat: 'png',
  quality: 85,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'converter',
  actionLabel: 'Convert',
  processingLabel: 'Converting images…',
  supportsBatch: true,
});
