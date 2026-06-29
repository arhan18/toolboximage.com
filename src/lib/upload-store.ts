/**
 * UploadStore — owns the in-memory queue of selected files for the Compressor.
 *
 * Responsibilities:
 *   - Accept File[] from drop / browse / paste / folder-pick
 *   - Validate (must be an image; per-file size cap; total cap)
 *   - Track per-item status: pending | thumbnailing | ready | error
 *   - Support remove, reorder, clear
 *   - Generate object-URL previews on demand
 *   - Subscribe API so any UI can react to changes
 *
 * No compression. SESSION 4 wires the worker pipeline into `ready` items.
 */

export type UploadStatus = 'pending' | 'thumbnailing' | 'ready' | 'error';

export interface UploadItem {
  /** Stable id (uuid-ish). */
  id: string;
  /** Source File — keep alive for the actual compression step. */
  file: File;
  /** Relative path inside the picked folder, if any. */
  path?: string;
  /** Object URL for preview thumbnail. */
  previewUrl: string;
  status: UploadStatus;
  /** Human-readable error if status === 'error'. */
  error?: string;
  /** Bytes. */
  size: number;
  /** Image natural width/height once decoded; undefined until `ready`. */
  width?: number;
  height?: number;
}

export interface UploadLimits {
  /** Max bytes per file. */
  maxFileBytes: number;
  /** Max bytes total across the queue. */
  maxTotalBytes: number;
  /** Max items in the queue. */
  maxItems: number;
}

export interface ValidationError {
  fileName: string;
  reason:
    | 'not-image'
    | 'too-large'
    | 'queue-full'
    | 'duplicate'
    | 'decode-failed';
  detail?: string;
}

export interface AddResult {
  added: UploadItem[];
  errors: ValidationError[];
}

const DEFAULT_LIMITS: UploadLimits = {
  maxFileBytes: 100 * 1024 * 1024, // 100 MB / file
  maxTotalBytes: 500 * 1024 * 1024, // 500 MB total
  maxItems: 200,
};

const ACCEPTED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
  'image/heic',
  'image/heif',
]);

const ACCEPTED_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg', 'heic', 'heif']);

function isImageFile(file: File): boolean {
  if (file.type && ACCEPTED_MIME.has(file.type)) return true;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  return ACCEPTED_EXT.has(ext);
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export type Listener = (items: ReadonlyArray<UploadItem>) => void;

export class UploadStore {
  private items: UploadItem[] = [];
  private listeners = new Set<Listener>();
  private limits: UploadLimits;

  constructor(limits: Partial<UploadLimits> = {}) {
    this.limits = { ...DEFAULT_LIMITS, ...limits };
  }

  // ---------- Subscription -------------------------------------------------

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    // Emit current snapshot immediately so consumers can hydrate.
    fn(this.snapshot());
    return () => this.listeners.delete(fn);
  }

  snapshot(): ReadonlyArray<UploadItem> {
    return this.items;
  }

  private emit() {
    const snap = this.snapshot();
    for (const fn of this.listeners) fn(snap);
  }

  // ---------- Queries ------------------------------------------------------

  get count(): number {
    return this.items.length;
  }

  get totalBytes(): number {
    return this.items.reduce((sum, i) => sum + i.size, 0);
  }

  // ---------- Mutations ----------------------------------------------------

  /**
   * Add a batch of files. Validates, dedupes (same name + size), and starts
   * thumbnail generation. Returns a summary of what was added / rejected.
   */
  async add(files: FileLike[], folderPaths?: Map<string, string>): Promise<AddResult> {
    const errors: ValidationError[] = [];
    const added: UploadItem[] = [];

    const existing = new Set(this.items.map((i) => `${i.file.name}:${i.file.size}`));

    for (const file of files) {
      if (this.items.length + added.length >= this.limits.maxItems) {
        errors.push({ fileName: file.name, reason: 'queue-full' });
        break;
      }

      if (!isImageFile(file)) {
        errors.push({ fileName: file.name, reason: 'not-image' });
        continue;
      }

      if (file.size > this.limits.maxFileBytes) {
        errors.push({
          fileName: file.name,
          reason: 'too-large',
          detail: `${formatBytes(file.size)} exceeds ${formatBytes(this.limits.maxFileBytes)}`,
        });
        continue;
      }

      if (this.totalBytes + file.size > this.limits.maxTotalBytes) {
        errors.push({ fileName: file.name, reason: 'too-large', detail: 'Queue size limit reached' });
        continue;
      }

      const key = `${file.name}:${file.size}`;
      if (existing.has(key)) {
        errors.push({ fileName: file.name, reason: 'duplicate' });
        continue;
      }
      existing.add(key);

      const item: UploadItem = {
        id: genId(),
        file,
        path: folderPaths?.get(file.name),
        previewUrl: URL.createObjectURL(file),
        status: 'thumbnailing',
        size: file.size,
      };
      added.push(item);
    }

    if (added.length) {
      this.items.push(...added);
      this.emit();
      // Decode thumbnails async — no await so the UI updates immediately.
      this.decodeBatch(added);
    }

    return { added, errors };
  }

  private async decodeBatch(items: UploadItem[]) {
    await Promise.allSettled(items.map((i) => this.decodeItem(i)));
    this.emit();
  }

  private async decodeItem(item: UploadItem): Promise<void> {
    if (item.file.type === 'image/svg+xml') {
      // SVG dimensions are intrinsic but optional — leave undefined.
      item.status = 'ready';
      return;
    }
    try {
      const dims = await readImageDimensions(item.previewUrl);
      item.width = dims.width;
      item.height = dims.height;
      item.status = 'ready';
    } catch (e) {
      item.status = 'error';
      item.error = e instanceof Error ? e.message : 'Could not read image';
    }
  }

  remove(id: string): void {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const [item] = this.items.splice(idx, 1);
    if (item) URL.revokeObjectURL(item.previewUrl);
    this.emit();
  }

  reorder(id: string, direction: 'up' | 'down'): void {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= this.items.length) return;
    const [item] = this.items.splice(idx, 1);
    if (!item) return;
    this.items.splice(target, 0, item);
    this.emit();
  }

  /** Move `id` so it sits adjacent to `targetId`. */
  moveBefore(id: string, targetId: string): void {
    const from = this.items.findIndex((i) => i.id === id);
    const to = this.items.findIndex((i) => i.id === targetId);
    if (from === -1 || to === -1 || from === to) return;
    const [item] = this.items.splice(from, 1);
    if (!item) return;
    // After splice, `to` may have shifted if `from < to`.
    const insertAt = from < to ? to - 1 : to;
    this.items.splice(insertAt, 0, item);
    this.emit();
  }

  clear(): void {
    for (const item of this.items) URL.revokeObjectURL(item.previewUrl);
    this.items = [];
    this.emit();
  }

  destroy(): void {
    this.clear();
    this.listeners.clear();
  }

  // ---------- Folder-pick helper ------------------------------------------

  /**
   * Recursively expand a DataTransferItemList into a flat File[].
   * Used for folder uploads via `webkitGetAsEntry`.
   */
  static async expandDataTransfer(dt: DataTransfer): Promise<{ files: File[]; paths: Map<string, string> }> {
    const files: File[] = [];
    const paths = new Map<string, string>();
    const items = dt.items;
    if (!items) return { files, paths };

    const entries: FileSystemEntry[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item) continue;
      const entry =
        typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null;
      if (entry) entries.push(entry);
      else {
        const f = item.getAsFile();
        if (f) files.push(f);
      }
    }

    await Promise.all(entries.map((e) => walkEntry(e, '', files, paths)));
    return { files, paths };
  }
}

// ---------- helpers ---------------------------------------------------------

interface FileLike {
  name: string;
  size: number;
  type: string;
}

interface FileSystemEntry {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
  fullPath: string;
}

interface FileSystemFileEntry extends FileSystemEntry {
  isFile: true;
  file: (cb: (file: File) => void, err?: (e: Error) => void) => void;
}

interface FileSystemDirectoryEntry extends FileSystemEntry {
  isDirectory: true;
  createReader: () => FileSystemDirectoryReader;
}

interface FileSystemDirectoryReader {
  readEntries: (
    cb: (entries: FileSystemEntry[]) => void,
    err?: (e: Error) => void
  ) => void;
}

function walkEntry(
  entry: FileSystemEntry,
  prefix: string,
  out: File[],
  paths: Map<string, string>
): Promise<void> {
  return new Promise((resolve) => {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;
      fileEntry.file(
        (file) => {
          const path = prefix + entry.name;
          out.push(file);
          paths.set(file.name, path);
          resolve();
        },
        () => resolve()
      );
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const reader = dirEntry.createReader();
      const subPath = prefix + entry.name + '/';
      const all: FileSystemEntry[] = [];
      const readBatch = () => {
        reader.readEntries(
          (entries) => {
            if (!entries.length) {
              Promise.all(all.map((e) => walkEntry(e, subPath, out, paths))).then(() =>
                resolve()
              );
              return;
            }
            all.push(...entries);
            readBatch();
          },
          () => resolve()
        );
      };
      readBatch();
    } else {
      resolve();
    }
  });
}

function readImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Decode failed'));
    img.src = url;
  });
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  const decimals = n >= 100 || i === 0 ? 0 : n >= 10 ? 1 : 2;
  return `${n.toFixed(decimals)} ${units[i]}`;
}