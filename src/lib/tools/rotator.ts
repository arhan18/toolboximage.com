import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  angle: 90,
  autoCrop: true,
  background: '#ffffff',
};

export const info: ToolInfo = makeStubInfo({
  slug: 'rotator',
  actionLabel: 'Rotate',
  processingLabel: 'Rotating images…',
  supportsBatch: true,
});
