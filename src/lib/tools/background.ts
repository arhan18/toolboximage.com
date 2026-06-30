import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {
  outputFormat: 'png',
  backgroundColor: 'transparent',
};

export const info: ToolInfo = makeStubInfo({
  slug: 'background-remover',
  actionLabel: 'Remove',
  processingLabel: 'Removing backgrounds…',
  supportsBatch: true,
  requiresWasm: true,
});
