import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  method: 'content-aware',
  region: null,
};

export const info: ToolInfo = makeStubInfo({
  slug: 'watermark-remover',
  actionLabel: 'Erase',
  processingLabel: 'Removing watermarks…',
  supportsBatch: true,
  requiresWasm: true,
});
