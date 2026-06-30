import { makeStubInfo, stubProcessor } from '../tool-base';
import type { ToolInfo } from '../tool-base';

export const process = stubProcessor;

export const defaultSettings: Record<string, unknown> = {};

export const info: ToolInfo = makeStubInfo({
  slug: 'format-viewer',
  actionLabel: 'Analyze',
  processingLabel: 'Inspecting format…',
  supportsBatch: false,
});
