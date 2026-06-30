import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  direction: 'horizontal',
};

export const info: ToolInfo = makeStubInfo({
  slug: 'flipper',
  actionLabel: 'Flip',
  processingLabel: 'Flipping images…',
  supportsBatch: true,
});
