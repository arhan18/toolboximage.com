import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  stripAll: false,
  preserveCopyright: true,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'metadata',
  actionLabel: 'Analyze',
  processingLabel: 'Reading metadata…',
  supportsBatch: false,
});
