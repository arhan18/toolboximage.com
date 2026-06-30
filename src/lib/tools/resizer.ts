import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  mode: 'exact',
  width: 1920,
  height: 1080,
  maintainAspect: true,
  background: '#ffffff',
};

export const info: ToolInfo = makeStubInfo({
  slug: 'resizer',
  actionLabel: 'Resize',
  processingLabel: 'Resizing images…',
  supportsBatch: true,
});
