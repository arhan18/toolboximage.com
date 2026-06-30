/**
 * Tool module registry — maps ToolId → tool module.
 *
 * Each module exports:
 *   - process:  ToolProcessorFn
 *   - defaultSettings: Record<string, unknown>
 *   - info:     ToolInfo
 *
 * Add a new tool by:
 *   1. Creating src/lib/tools/<name>.ts
 *   2. Adding the import + entry below
 *   3. Adding the config to src/lib/tools.ts
 */

import type { ToolId } from '../../types';

type ToolModule = typeof import('./converter');

const registry = new Map<ToolId, () => Promise<ToolModule>>();

function register(id: ToolId, loader: () => Promise<ToolModule>) {
  registry.set(id, loader);
}

register('converter', () => import('./converter'));
register('resizer', () => import('./resizer'));
register('cropper', () => import('./cropper'));
register('rotator', () => import('./rotator'));
register('flipper', () => import('./flipper'));
register('format-viewer', () => import('./format-viewer'));
register('background-remover', () => import('./background'));
register('watermark-remover', () => import('./watermark-remover'));
register('heic-converter', () => import('./heic'));
register('metadata', () => import('./metadata'));
register('blur', () => import('./blur'));

export async function loadToolModule(id: ToolId): Promise<ToolModule> {
  const loader = registry.get(id);
  if (!loader) throw new Error(`No tool module registered for "${id}"`);
  return loader();
}

export function isToolRegistered(id: ToolId): boolean {
  return registry.has(id);
}

export type { ToolInfo, ToolProcessorFn, ToolInput, ToolOutput, ToolProgress } from '../tool-base';
