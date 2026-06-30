import type { ToolConfig, ToolWorkflowStep } from '../types';

/**
 * Shared types and interfaces for all tool implementations.
 *
 * Each future tool module (src/lib/tools/*.ts) exports:
 *   - process(): ToolProcessorFn
 *   - defaultSettings: Record<string, unknown>
 *   - info: ToolInfo
 */

/** Minimal input reference passed through the pipeline */
export interface ToolInput {
  id: string;
  file: File;
  previewUrl: string;
  path?: string;
  size: number;
  width?: number;
  height?: number;
}

/** Output produced by a tool processor */
export interface ToolOutput {
  blob: Blob;
  name: string;
  ext: string;
  size: number;
  width?: number;
  height?: number;
}

/** Progress reported during processing */
export interface ToolProgress {
  percent: number;
  current: number;
  total: number;
  currentName?: string;
}

/** Signature every tool processor must implement */
export type ToolProcessorFn = (
  inputs: ToolInput[],
  settings: Record<string, unknown>,
  onProgress?: (p: ToolProgress) => void,
  signal?: AbortSignal,
) => Promise<ToolOutput[]>;

export interface ToolInfo {
  slug: string;
  /** Human-readable label for the "process" action (e.g. "Compress", "Resize", "Convert") */
  actionLabel: string;
  /** Description of what processing does (e.g. "Resizing 5 images…") */
  processingLabel: string;
  /** Icon name for the action button */
  actionIcon?: string;
  /** Whether this tool supports batch processing */
  supportsBatch: boolean;
  /** Whether this tool requires WASM (not yet available client-side) */
  requiresWasm: boolean;
  /** Default settings for this tool */
  defaultSettings: Record<string, unknown>;
}

/** Workflow state machine */
export type WorkflowState = 'idle' | 'uploading' | 'ready' | 'processing' | 'done' | 'error';

/** Standard workflow steps for tool UI */
export const WORKFLOW_STEPS: ToolWorkflowStep[] = ['upload', 'configure', 'process', 'results'];

/** Runtime check for whether WASM tools can run (always false until WASM is bundled) */
export const hasWasmSupport = false;

/** Placeholder processor for tools not yet implemented */
export const stubProcessor: ToolProcessorFn = async () => {
  throw new Error('This tool is not yet available.');
};

export function makeStubInfo(overrides: Partial<ToolInfo>): ToolInfo {
  return {
    slug: '',
    actionLabel: 'Process',
    processingLabel: 'Processing…',
    supportsBatch: true,
    requiresWasm: false,
    defaultSettings: {},
    ...overrides,
  };
}
