/**
 * CompressionJobRunner — orchestrates encoding of an UploadStore queue.
 *
 * Features:
 *   - Concurrency (default 4)
 *   - Per-job status: queued | running | done | error | cancelled | retrying
 *   - Per-job progress (0..100)
 *   - Global progress + ETA
 *   - Retry on transient failure (1 automatic retry)
 *   - Cancel all / cancel one
 *
 * Subscriptions:
 *   - subscribeJobs(listener): receives ReadonlyMap<id, Job>
 *   - subscribeProgress(listener): receives AggregateProgress
 */

import { UploadStore, type UploadItem } from './upload-store';
import { CompressionEngine, type EncodeResult } from './compression-engine';
import type { CompressionSettings } from './compression-settings';

export type JobStatus = 'queued' | 'running' | 'done' | 'error' | 'cancelled' | 'retrying';

export interface Job {
  id: string;
  fileName: string;
  status: JobStatus;
  progress: number; // 0..100
  error?: string;
  /** Populated when status === 'done'. */
  result?: EncodeResult;
  /** Auto-retry count. */
  attempts: number;
  /** Source item id (matches UploadItem.id). */
  sourceId: string;
}

export interface AggregateProgress {
  total: number;
  done: number;
  errored: number;
  running: number;
  queued: number;
  /** Bytes saved so far (source bytes - result bytes for done items). */
  savedBytes: number;
  /** Smoothed wall-time per done item, ms. */
  avgMs: number;
  /** Estimated time remaining, ms. */
  etaMs: number;
  /** True if the runner is actively processing. */
  active: boolean;
}

type JobListener = (jobs: ReadonlyMap<string, Job>) => void;
type ProgressListener = (p: AggregateProgress) => void;

export class CompressionJobRunner {
  private store: UploadStore;
  private settings: CompressionSettings;
  private engine: CompressionEngine;

  private jobs = new Map<string, Job>();
  private jobListeners = new Set<JobListener>();
  private progressListeners = new Set<ProgressListener>();

  private concurrency: number;
  private maxAttempts = 2;

  private active = 0;
  private cancelled = false;
  private cancelledIds = new Set<string>();

  private finishedDurations: number[] = [];

  constructor(store: UploadStore, settings: CompressionSettings, concurrency = 4) {
    this.store = store;
    this.settings = settings;
    this.engine = new CompressionEngine();
    this.concurrency = Math.max(1, Math.min(8, concurrency));
  }

  // ---------- Subscription -------------------------------------------------

  subscribeJobs(fn: JobListener): () => void {
    this.jobListeners.add(fn);
    fn(this.jobs);
    return () => this.jobListeners.delete(fn);
  }

  subscribeProgress(fn: ProgressListener): () => void {
    this.progressListeners.add(fn);
    fn(this.aggregate());
    return () => this.progressListeners.delete(fn);
  }

  private emitJobs() {
    const snap = new Map(this.jobs);
    for (const fn of this.jobListeners) fn(snap);
    this.emitProgress();
  }

  private emitProgress() {
    const p = this.aggregate();
    for (const fn of this.progressListeners) fn(p);
  }

  // ---------- Public API ----------------------------------------------------

  /** Queue every ready item currently in the store. */
  startAll({ force = false }: { force?: boolean } = {}): void {
    this.cancelled = false;
    if (force) {
      for (const [id, job] of this.jobs) {
        if (job.status === 'done' || job.status === 'error' || job.status === 'cancelled') {
          this.jobs.delete(id);
        }
      }
    }
    const items = this.store.snapshot();
    for (const item of items) {
      if (item.status !== 'ready') continue;
      if (this.jobs.has(item.id)) continue;
      this.jobs.set(item.id, this.makeJob(item));
    }
    this.emitJobs();
    this.pump();
  }

  /** Queue a single item. */
  startOne(itemId: string): void {
    const item = this.store.snapshot().find((i) => i.id === itemId);
    if (!item || item.status !== 'ready') return;
    if (this.jobs.has(item.id)) return;
    this.cancelledIds.delete(item.id);
    this.jobs.set(item.id, this.makeJob(item));
    this.emitJobs();
    this.pump();
  }

  retry(itemId: string): void {
    const job = this.jobs.get(itemId);
    if (!job) return;
    if (job.status !== 'error' && job.status !== 'cancelled' && job.status !== 'done') return;
    this.cancelledIds.delete(itemId);
    job.status = 'queued';
    job.progress = 0;
    job.error = undefined;
    job.result = undefined;
    this.emitJobs();
    this.pump();
  }

  cancelAll(): void {
    this.cancelled = true;
    for (const job of this.jobs.values()) {
      if (job.status === 'queued' || job.status === 'running' || job.status === 'retrying') {
        job.status = 'cancelled';
      }
    }
    this.emitJobs();
  }

  cancelOne(itemId: string): void {
    this.cancelledIds.add(itemId);
    const job = this.jobs.get(itemId);
    if (!job) return;
    if (job.status === 'queued' || job.status === 'running' || job.status === 'retrying') {
      job.status = 'cancelled';
      this.emitJobs();
    }
  }

  clear(): void {
    this.cancelAll();
    this.jobs.clear();
    this.finishedDurations = [];
    this.emitJobs();
    this.emitProgress();
  }

  destroy(): void {
    this.cancelAll();
    this.jobListeners.clear();
    this.progressListeners.clear();
    this.jobs.clear();
  }

  // ---------- Internals -----------------------------------------------------

  private makeJob(item: UploadItem): Job {
    return {
      id: item.id,
      fileName: item.path ?? item.file.name,
      status: 'queued',
      progress: 0,
      attempts: 0,
      sourceId: item.id,
    };
  }

  private pump(): void {
    if (this.cancelled) return;
    while (this.active < this.concurrency) {
      const next = this.nextQueued();
      if (!next) return;
      this.runOne(next);
    }
  }

  private nextQueued(): Job | undefined {
    for (const job of this.jobs.values()) {
      if (job.status === 'queued') return job;
    }
    return undefined;
  }

  private runOne(job: Job): void {
    if (this.cancelledIds.has(job.sourceId)) {
      job.status = 'cancelled';
      this.emitJobs();
      return;
    }
    job.status = 'running';
    job.attempts++;
    job.progress = 5;
    this.active++;
    this.emitJobs();

    const item = this.store.snapshot().find((i) => i.id === job.sourceId);
    if (!item) {
      this.failJob(job, new Error('Source item not found'));
      return;
    }

    // Drive a fake progress curve while the encode is in flight.
    let progressTick: number | null = null;
    const startProgress = 5;
    const startTime = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startTime;
      // Ease toward 90% during encode; final 90-100% lands when the blob returns.
      const ratio = Math.min(0.9, elapsed / 800);
      job.progress = Math.max(job.progress, startProgress + ratio * 85);
      this.emitProgress();
      progressTick = window.setTimeout(tick, 120);
    };
    progressTick = window.setTimeout(tick, 120);

    this.engine
      .encode({
        source: {
          mime: item.file.type || 'image/jpeg',
          url: item.previewUrl,
          bytes: item.size,
        },
        settings: this.settings,
      })
      .then((result) => {
        if (progressTick !== null) window.clearTimeout(progressTick);
        if (this.cancelledIds.has(job.sourceId) || this.cancelled) {
          job.status = 'cancelled';
          job.progress = 0;
          this.active--;
          this.emitJobs();
          this.pump();
          return;
        }
        job.progress = 100;
        job.status = 'done';
        job.result = result;
        this.finishedDurations.push(result.durationMs);
        if (this.finishedDurations.length > 32) this.finishedDurations.shift();
        this.active--;
        this.emitJobs();
        this.pump();
      })
      .catch((err: unknown) => {
        if (progressTick !== null) window.clearTimeout(progressTick);
        this.failJob(job, err);
      });
  }

  private failJob(job: Job, err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (job.attempts < this.maxAttempts && !this.cancelledIds.has(job.sourceId)) {
      job.status = 'retrying';
      job.error = message;
      this.active--;
      this.emitJobs();
      // Small backoff before re-queuing.
      window.setTimeout(() => {
        if (this.cancelledIds.has(job.sourceId) || this.cancelled) {
          job.status = 'cancelled';
          this.emitJobs();
          return;
        }
        job.status = 'queued';
        this.emitJobs();
        this.pump();
      }, 400);
    } else {
      job.status = 'error';
      job.error = message;
      job.progress = 0;
      this.active--;
      this.emitJobs();
      this.pump();
    }
  }

  private aggregate(): AggregateProgress {
    let done = 0, errored = 0, running = 0, queued = 0;
    let savedBytes = 0;
    const snap = this.store.snapshot();
    for (const job of this.jobs.values()) {
      switch (job.status) {
        case 'queued': queued++; break;
        case 'running':
        case 'retrying': running++; break;
        case 'done':
          done++;
          if (job.result) {
            const item = snap.find((i) => i.id === job.sourceId);
            const origBytes = item?.size ?? 0;
            savedBytes += Math.max(0, origBytes - (job.result.bytes ?? 0));
          }
          break;
        case 'error':
          errored++;
          break;
        // cancelled is intentionally not counted in any progress bucket.
      }
    }
    const avg = this.finishedDurations.length
      ? this.finishedDurations.reduce((a, b) => a + b, 0) / this.finishedDurations.length
      : 0;
    const remaining = queued + running;
    const eta = remaining > 0 && avg > 0
      ? Math.round((remaining * avg) / Math.max(1, this.concurrency))
      : 0;
    return {
      total: this.jobs.size,
      done,
      errored,
      running,
      queued,
      savedBytes,
      avgMs: avg,
      etaMs: eta,
      active: this.active > 0,
    };
  }
}