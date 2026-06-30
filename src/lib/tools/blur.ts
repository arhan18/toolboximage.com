import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  method: 'gaussian',
  radius: 10,
  region: null,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'blur',
  actionLabel: 'Blur',
  processingLabel: 'Applying blur…',
  supportsBatch: true,
});
