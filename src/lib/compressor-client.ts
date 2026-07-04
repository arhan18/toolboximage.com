import { UploadStore, formatBytes } from './upload-store';
import type { UploadItem } from './upload-store';
import { retrieveFiles, hasTransfer, clearTransfer } from './file-transfer';
import { DEFAULT_SETTINGS, MODE_PRESETS } from './compression-settings';
import type { CompressionSettings, CompressionMode, OutputFormat } from './compression-settings';
import { CompressionJobRunner, type Job } from './compression-runner';
import { downloadBlob, downloadFiles } from './download';

type FilesDetail = { files: File[]; paths?: Map<string, string> };

export function initCompressor(): void {
  const queuePanel = document.querySelector<HTMLElement>('[data-queue-panel]');
  const queueList = document.querySelector<HTMLUListElement>('[data-queue-list]');
  const queueEmpty = document.querySelector<HTMLElement>('[data-queue-empty]');
  const queueLoading = document.querySelector<HTMLElement>('[data-queue-loading]');
  const queueFooter = document.querySelector<HTMLElement>('[data-queue-footer]');
  const queueStats = document.querySelector<HTMLElement>('[data-queue-stats]');
  const totalSizeEl = document.querySelector<HTMLElement>('[data-total-size]');
  const savedSizeEl = document.querySelector<HTMLElement>('[data-saved-size]');
  const clearBtn = document.querySelector<HTMLButtonElement>('[data-action="clear"]');
  const cancelAllBtn = document.querySelector<HTMLButtonElement>('[data-action="cancel-all"]');
  const addMoreBtn = document.querySelector<HTMLButtonElement>('[data-action="add-more"]');
  const compressBtns = document.querySelectorAll<HTMLButtonElement>('[data-action="compress"]');
  const topCompressWrapper = document.querySelector<HTMLElement>('[data-top-compress]');
  const cancelBtn = document.querySelector<HTMLButtonElement>('.footer-cancel');
  const queueProgressEl = document.querySelector<HTMLElement>('[data-queue-progress]');
  const qpFill = document.querySelector<HTMLElement>('[data-qp-fill]');
  const qpCounts = document.querySelector<HTMLElement>('[data-qp-counts]');
  const qpEta = document.querySelector<HTMLElement>('[data-qp-eta]');
  const qpSaved = document.querySelector<HTMLElement>('[data-qp-saved]');
  const qpErrors = document.querySelector<HTMLElement>('[data-qp-errors]');
  const qpBar = document.querySelector<HTMLElement>('.qp-bar');

  const settingsRoot = document.querySelector<HTMLElement>('[data-settings]');
  const customPanel = document.querySelector<HTMLElement>('[data-custom]');
  const modeBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-mode]'));
  const settingInputs = Array.from(
    document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-setting]')
  );

  const resultsSummary = document.querySelector<HTMLElement>('[data-results-summary]');
  const resultOriginal = document.querySelector<HTMLElement>('[data-result-stat="original"]');
  const resultNew = document.querySelector<HTMLElement>('[data-result-stat="new"]');
  const resultSaved = document.querySelector<HTMLElement>('[data-result-stat="saved"]');
  const resultSavedPct = document.querySelector<HTMLElement>('[data-result-stat="saved-pct"]');
  const resultRatio = document.querySelector<HTMLElement>('[data-result-stat="ratio"]');
  const downloadAllBtn = document.querySelector<HTMLButtonElement>('[data-action="download-all"]');
  const downloadOneBtn = document.querySelector<HTMLButtonElement>('[data-action="download-one"]');
  const resultsBaEl = document.querySelector<HTMLElement>('[data-results-ba]');
  const resultsBaMount = document.querySelector<HTMLElement>('[data-ba-mount]');

  if (!queuePanel || !queueList || !queueEmpty || !queueLoading || !queueFooter || !queueStats) {
    console.warn('Compressor page: queue markup incomplete');
    return;
  }

  let settings: CompressionSettings = { ...DEFAULT_SETTINGS };
  let compressStarted = false;
  let settingsVersion = 0;
  let lastCompressVersion = 0;

  const store = new UploadStore();
  const runner = new CompressionJobRunner(store, settings, 4);

  (async () => {
    if (hasTransfer()) {
      clearTransfer();
      const files = await retrieveFiles();
      if (files.length) {
        await store.add(files);
      }
    }
  })();
  const tpl = document.getElementById('tpl-preview-card') as HTMLTemplateElement | null;
  const cards = new Map<string, HTMLElement>();

  const fillSlider = (input: HTMLInputElement) => {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const val = Number(input.value || 0);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--fill', `${pct}%`);
  };

  const updateDisplay = (key: string, value: unknown) => {
    const displayEl = document.querySelector<HTMLElement>(`[data-display="${key}"]`);
    if (!displayEl) return;
    const mode = document
      .querySelector<HTMLElement>(`[data-display-target="${key}"]`)
      ?.getAttribute('data-display-mode');
    if (mode === 'size') {
      displayEl.textContent = (value as number) > 0 ? `${value} KB` : 'off';
    } else {
      displayEl.textContent = String(value);
    }
  };

  const applySettingFromInput = (input: HTMLInputElement | HTMLSelectElement) => {
    const key = input.dataset.setting!;
    let value: unknown = input.value;
    if (input instanceof HTMLInputElement && input.type === 'checkbox') {
      value = input.checked;
    } else if (input instanceof HTMLInputElement && input.type === 'number') {
      value = Number(input.value);
    } else if (input instanceof HTMLInputElement && input.type === 'range') {
      value = Number(input.value);
    }
    setDeep(settings, key, value);
    if (input instanceof HTMLInputElement && input.type === 'range') {
      fillSlider(input);
      updateDisplay(key, value);
    }
  };

  const setDeep = (obj: any, path: string, value: unknown) => {
    const parts = path.split('.');
    let cur: any = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]!] = { ...cur[parts[i]!] };
      cur = cur[parts[i]!];
    }
    cur[parts[parts.length - 1]!] = value;
  };

  const getDeep = (obj: any, path: string): unknown => {
    return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
  };

  const applyMode = (mode: CompressionMode) => {
    Object.assign(settings, MODE_PRESETS[mode]);
    settingsVersion++;
    settingInputs.forEach((input) => {
      const key = input.dataset.setting!;
      const value = getDeep(settings, key);
      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
        input.checked = Boolean(value);
      } else {
        input.value = String(value ?? '');
      }
      if (input instanceof HTMLInputElement && input.type === 'range') {
        fillSlider(input);
        updateDisplay(key, value);
      }
    });
    modeBtns.forEach((btn) => {
      btn.setAttribute('aria-checked', btn.dataset.mode === mode ? 'true' : 'false');
    });
    if (customPanel) customPanel.hidden = mode !== 'custom';
  };

  settingInputs.forEach((input) => {
    applySettingFromInput(input);
    input.addEventListener('input', () => applySettingFromInput(input));
    input.addEventListener('change', () => {
      applySettingFromInput(input);
      settingsVersion++;
    });
    if (input instanceof HTMLInputElement && input.type === 'range') fillSlider(input);
  });
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyMode(btn.dataset.mode as CompressionMode));
  });

  modeBtns.forEach((btn, idx) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return;
      e.preventDefault();
      let nextIdx = idx;
      if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + modeBtns.length) % modeBtns.length;
      else if (e.key === 'ArrowRight') nextIdx = (idx + 1) % modeBtns.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = modeBtns.length - 1;
      const next = modeBtns[nextIdx];
      if (!next) return;
      modeBtns.forEach((b, i) => b.tabIndex = i === nextIdx ? 0 : -1);
      next.focus();
      applyMode(next.dataset.mode as CompressionMode);
    });
  });
  applyMode('auto');

  // Apply page-level preconfiguration from data attributes on the shell element.
  const shell = document.querySelector<HTMLElement>('[data-compressor-shell]');
  if (shell) {
    const df = shell.dataset.defaultFormat;
    const dts = shell.dataset.defaultTargetSize;
    if (df && df !== 'keep') {
      const select = document.querySelector<HTMLSelectElement>('[data-setting="output"]');
      if (select) {
        select.value = df;
        applySettingFromInput(select);
        settings.output = df as OutputFormat;
      }
      // Switch to custom mode so the format selection is visible.
      applyMode('custom');
    }
    if (dts) {
      const targetKb = Number(dts);
      if (targetKb > 0) {
        const slider = document.querySelector<HTMLInputElement>('[data-setting="targetSizeKb"]');
        if (slider) {
          slider.value = String(targetKb);
          applySettingFromInput(slider);
          settings.targetSizeKb = targetKb;
        }
        applyMode('custom');
      }
    }
  }

  const renderQueue = (items: ReadonlyArray<UploadItem>) => {
    queueEmpty.hidden = items.length > 0;
    queueList.hidden = items.length === 0;
    queueFooter.hidden = items.length === 0;
    queueLoading.hidden = !items.some((i) => i.status === 'thumbnailing');

    if (!queueLoading.hidden) {
      const pending = items.filter((i) => i.status === 'thumbnailing').length;
      const label = queueLoading.querySelector<HTMLElement>('[data-queue-loading-text]');
      if (label) label.textContent = `Generating previews… (${pending} remaining)`;
    }

    if (tpl) {
      const seen = new Set<string>();
      for (const item of items) {
        seen.add(item.id);
        let card = cards.get(item.id);
        if (!card) {
          card = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
          card.dataset.id = item.id;
          bindCard(card);
          queueList.appendChild(card);
          cards.set(item.id, card);
        }
        updateCard(card, item);
      }
      for (const [id, el] of cards) {
        if (!seen.has(id)) { el.remove(); cards.delete(id); }
      }
    }

    const total = items.length;
    const ready = items.filter((i) => i.status === 'ready').length;
    const errored = items.filter((i) => i.status === 'error').length;
    queueStats.textContent = total
      ? `${total} ${total === 1 ? 'image' : 'images'} · ${ready}/${total} ready${errored ? ` · ${errored} skipped` : ''}`
      : 'No images yet';

    const totalSize = items.reduce((s, i) => s + i.size, 0);
    if (totalSizeEl) totalSizeEl.textContent = formatBytes(totalSize);
    if (savedSizeEl) savedSizeEl.textContent = '—';

    if (clearBtn) clearBtn.hidden = total === 0;
    const canCompress = ready > 0;
    compressBtns.forEach((btn) => {
      btn.setAttribute('aria-disabled', canCompress ? 'false' : 'true');
    });
    if (topCompressWrapper) {
      topCompressWrapper.hidden = total === 0;
    }
  };

  const bindCard = (card: HTMLElement) => {
    const id = card.dataset.id!;
    card.querySelector<HTMLButtonElement>('[data-action="up"]')!
      .addEventListener('click', (e) => { e.stopPropagation(); store.reorder(id, 'up'); });
    card.querySelector<HTMLButtonElement>('[data-action="down"]')!
      .addEventListener('click', (e) => { e.stopPropagation(); store.reorder(id, 'down'); });
    card.querySelector<HTMLButtonElement>('[data-action="remove"]')!
      .addEventListener('click', (e) => { e.stopPropagation(); store.remove(id); });
    card.querySelector<HTMLButtonElement>('[data-action="retry"]')!
      .addEventListener('click', (e) => { e.stopPropagation(); runner.retry(id); });
    card.querySelector<HTMLButtonElement>('[data-action="download"]')!
      .addEventListener('click', (e) => { e.stopPropagation(); downloadOne(id); });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && e.altKey) { e.preventDefault(); store.reorder(id, 'up'); }
      else if (e.key === 'ArrowDown' && e.altKey) { e.preventDefault(); store.reorder(id, 'down'); }
      else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); store.remove(id); }
    });

    card.draggable = true;
    card.addEventListener('dragstart', (e) => {
      card.dataset.dragging = 'true';
      e.dataTransfer?.setData('text/plain', id);
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => { delete card.dataset.dragging; });
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    });
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer?.getData('text/plain');
      if (draggedId && draggedId !== id) store.moveBefore(draggedId, id);
    });
  };

  const updateCard = (card: HTMLElement, item: UploadItem) => {
    card.dataset.status = item.status;
    const img = card.querySelector('img') as HTMLImageElement;
    if (img) img.src = item.previewUrl;
    const nameEl = card.querySelector<HTMLElement>('[data-preview-name]');
    if (nameEl) nameEl.textContent = item.path ?? item.file.name;
    const sizeEl = card.querySelector<HTMLElement>('[data-preview-size]');
    if (sizeEl) sizeEl.textContent = formatBytes(item.size);
    const dimsEl = card.querySelector<HTMLElement>('[data-preview-dims]');
    if (dimsEl) {
      dimsEl.textContent = item.width && item.height ? `${item.width} × ${item.height}` : '—';
    }
    const errEl = card.querySelector<HTMLElement>('[data-preview-error]');
    if (errEl) {
      if (item.error) { errEl.textContent = item.error; errEl.hidden = false; }
      else { errEl.hidden = true; }
    }
    const statusEl = card.querySelector<HTMLElement>('[data-preview-status]');
    if (statusEl) statusEl.hidden = item.status !== 'thumbnailing';
  };

  const updateJobUI = (jobs: ReadonlyMap<string, Job>) => {
    const items = store.snapshot();
    let saved = 0;
    let firstDoneId: string | null = null;
    let firstDoneOriginal: Blob | null = null;
    let firstDoneResult: Blob | null = null;
    let firstDoneExt = 'png';

    for (const item of items) {
      const job = jobs.get(item.id);
      const card = cards.get(item.id);
      if (!card) continue;
      if (!job) {
        card.removeAttribute('data-job-status');
        card.querySelector<HTMLElement>('[data-preview-progress]')?.setAttribute('hidden', '');
        card.querySelector<HTMLElement>('[data-preview-stats]')?.setAttribute('hidden', '');
        card.querySelector<HTMLButtonElement>('[data-action="retry"]')?.setAttribute('hidden', '');
        card.querySelector<HTMLButtonElement>('[data-action="download"]')?.setAttribute('hidden', '');
        card.querySelector<HTMLElement>('[data-preview-done]')?.setAttribute('hidden', '');
        continue;
      }
      card.dataset.jobStatus = job.status;

      const progEl = card.querySelector<HTMLElement>('[data-preview-progress]');
      const progBar = card.querySelector<HTMLElement>('[data-preview-progress-bar]');
      if (progEl) {
        if (job.status === 'queued') progEl.setAttribute('hidden', '');
        else progEl.removeAttribute('hidden');
      }
      if (progBar) progBar.style.width = `${Math.round(job.progress)}%`;

      const statsEl = card.querySelector<HTMLElement>('[data-preview-stats]');
      if (job.status === 'done' && job.result) {
        const savedBytes = Math.max(0, item.size - job.result.bytes);
        const pct = item.size > 0 ? Math.round((savedBytes / item.size) * 100) : 0;
        const ratio = item.size > 0 ? (item.size / Math.max(1, job.result.bytes)) : 1;
        saved += savedBytes;

        setStat(card, 'original', formatBytes(item.size));
        setStat(card, 'new', formatBytes(job.result.bytes));
        setStat(card, 'saved', `−${formatBytes(savedBytes)}`);
        setStat(card, 'ratio', `${ratio.toFixed(2)}×`);
        setStat(card, 'dims', item.width && item.height ? `${item.width} × ${item.height}` : '—');
        statsEl?.removeAttribute('hidden');

        const noteEl = card.querySelector<HTMLElement>('[data-stat="note"]');
        if (noteEl) {
          if (job.result.note) {
            noteEl.textContent = job.result.note;
            noteEl.hidden = false;
          } else {
            noteEl.hidden = true;
          }
        }

        if (!firstDoneId) {
          firstDoneId = item.id;
          firstDoneOriginal = item.file;
          firstDoneResult = job.result.blob;
          firstDoneExt = job.result.outputExt;
        }

        card.querySelector<HTMLElement>('[data-preview-done]')?.removeAttribute('hidden');
        card.querySelector<HTMLButtonElement>('[data-action="download"]')?.removeAttribute('hidden');
      } else {
        statsEl?.setAttribute('hidden', '');
        card.querySelector<HTMLElement>('[data-preview-done]')?.setAttribute('hidden', '');
        card.querySelector<HTMLButtonElement>('[data-action="download"]')?.setAttribute('hidden', '');
      }

      const retry = card.querySelector<HTMLButtonElement>('[data-action="retry"]');
      if (retry) {
        if (job.status === 'error' || job.status === 'done') {
          retry.removeAttribute('hidden');
          retry.title = job.status === 'done' ? 'Recompress' : 'Retry';
        } else {
          retry.setAttribute('hidden', '');
        }
      }
    }

    const anyActive = Array.from(jobs.values()).some(
      (j) => j.status === 'running' || j.status === 'retrying'
    );
    queueFooter!.dataset.running = anyActive ? 'true' : 'false';
    if (topCompressWrapper) {
      topCompressWrapper.dataset.running = anyActive ? 'true' : 'false';
    }

    if (savedSizeEl) {
      const totalSource = items.reduce((s, i) => s + i.size, 0);
      if (saved > 0) {
        savedSizeEl.textContent = `−${formatBytes(saved)} (${totalSource > 0 ? Math.round((saved / totalSource) * 100) : 0}%)`;
      } else {
        savedSizeEl.textContent = '—';
      }
    }

    updateResultsSummary(jobs);
    if (firstDoneId && firstDoneOriginal && firstDoneResult) {
      ensureBaMounted(firstDoneOriginal, firstDoneResult);
    }
  };

  const setStat = (card: HTMLElement, key: string, value: string) => {
    const el = card.querySelector<HTMLElement>(`[data-stat="${key}"]`);
    if (el) el.textContent = value;
  };

  const updateResultsSummary = (jobs: ReadonlyMap<string, Job>) => {
    if (!resultsSummary) return;
    const items = store.snapshot();
    const doneJobs = Array.from(jobs.values()).filter(
      (j) => j.status === 'done' && j.result
    );
    const hasAnyDone = doneJobs.length > 0;
    resultsSummary.hidden = !hasAnyDone;

    if (!hasAnyDone) return;

    const doneIds = new Set(doneJobs.map((j) => j.sourceId));
    const totalOriginal = items
      .filter((i) => doneIds.has(i.id))
      .reduce((s, i) => s + i.size, 0);
    const totalNew = doneJobs.reduce((s, j) => s + (j.result?.bytes ?? 0), 0);

    animateStat(resultOriginal, formatBytes(totalOriginal));
    animateStat(resultNew, formatBytes(totalNew));
    const savedTotal = Math.max(0, totalOriginal - totalNew);
    animateStat(resultSaved, formatBytes(savedTotal));
    const savedPct = totalOriginal > 0 ? Math.round((savedTotal / totalOriginal) * 100) : 0;
    if (resultSavedPct) resultSavedPct.textContent = `−${savedPct}%`;
    const ratio = totalNew > 0 ? totalOriginal / totalNew : 1;
    if (resultRatio) resultRatio.textContent = `${ratio.toFixed(2)}×`;

    if (downloadAllBtn) downloadAllBtn.disabled = false;
    if (downloadOneBtn) downloadOneBtn.disabled = false;
  };

  const animateStat = (el: HTMLElement | null, _next: string) => {
    if (!el) return;
    el.textContent = _next;
  };

  let baMounted = false;
  let baBeforeUrl: string | null = null;
  let baAfterUrl: string | null = null;
  const ensureBaMounted = async (original: Blob, after: Blob) => {
    if (baMounted || !resultsBaEl || !resultsBaMount) return;
    baMounted = true;
    resultsBaEl.hidden = false;

    if (baBeforeUrl) URL.revokeObjectURL(baBeforeUrl);
    if (baAfterUrl) URL.revokeObjectURL(baAfterUrl);
    baBeforeUrl = URL.createObjectURL(original);
    baAfterUrl = URL.createObjectURL(after);

    resultsBaMount.innerHTML = `
      <figure class="before-after ba-mode-slider" data-ba data-initial="slider" role="group" aria-label="Before and after comparison" style="margin:0;width:100%;display:flex;flex-direction:column;gap:var(--space-md);">
        <div class="ba-stage ba-stage-slider" data-ba-stage="slider">
          <div class="ba-frame" data-ba-frame style="aspect-ratio:5/3;border-radius:var(--radius-xl);overflow:hidden;position:relative;background:var(--color-canvas-soft);box-shadow:var(--shadow-5);user-select:none;touch-action:none;isolation:isolate;">
            <img class="ba-img ba-before" src="${baBeforeUrl}" alt="" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;display:block;" />
            <div class="ba-after-clip" data-ba-after-clip style="position:absolute;inset:0;clip-path:inset(0 calc(100% - 50%) 0 0);pointer-events:none;z-index:1;">
              <img class="ba-img ba-after" src="${baAfterUrl}" alt="" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;display:block;" />
            </div>
            <span style="position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:color-mix(in srgb,var(--color-primary) 55%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--color-on-primary);text-transform:uppercase;letter-spacing:0.06em;pointer-events:none;font-feature-settings:'tnum';z-index:3;font-size:12px;font-family:var(--font-mono);">
              <span style="width:6px;height:6px;border-radius:999px;background:var(--color-on-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--color-on-primary) 25%,transparent);flex-shrink:0;"></span>
              Before
            </span>
            <span style="position:absolute;bottom:12px;right:12px;display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;background:color-mix(in srgb,var(--color-primary) 55%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--color-on-primary);text-transform:uppercase;letter-spacing:0.06em;pointer-events:none;font-feature-settings:'tnum';z-index:3;font-size:12px;font-family:var(--font-mono);">
              <span style="width:6px;height:6px;border-radius:999px;background:var(--color-cyan);box-shadow:0 0 0 2px color-mix(in srgb,var(--color-cyan) 25%,transparent);flex-shrink:0;"></span>
              After
            </span>
            <div class="ba-divider" data-ba-divider style="position:absolute;top:0;bottom:0;left:calc(50% - 1px);width:2px;background:var(--color-canvas);pointer-events:none;box-shadow:0 0 0 1px rgb(0 0 0 / 0.08);z-index:2;" aria-hidden="true"></div>
            <button type="button" class="ba-handle" data-ba-handle aria-label="Drag to compare before and after" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:999px;border:none;cursor:ew-resize;background:transparent;padding:0;z-index:4;-webkit-tap-highlight-color:transparent;">
              <span style="position:absolute;inset:-4px;border-radius:999px;background:radial-gradient(circle,color-mix(in srgb,var(--color-link) 35%,transparent),transparent 70%);opacity:0;transition:opacity 0.25s ease,transform 0.25s ease;pointer-events:none;" class="ba-handle-halo" aria-hidden="true"></span>
              <span style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:2px;border-radius:999px;background:var(--color-canvas);color:var(--color-ink);box-shadow:var(--shadow-4);transition:transform 0.2s cubic-bezier(0.22,1,0.36,1),box-shadow 0.2s ease;" class="ba-handle-inner" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </button>
            <input type="range" min="0" max="100" value="50" step="1" aria-label="Before/after divider position" data-ba-range style="position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;z-index:3;-webkit-appearance:none;appearance:none;" />
          </div>
        </div>
      </figure>
    `;

    wireSliderBa(resultsBaMount);
  };

  const wireSliderBa = (mount: HTMLElement) => {
    const frame = mount.querySelector<HTMLElement>('[data-ba-frame]')!;
    const afterClip = mount.querySelector<HTMLElement>('[data-ba-after-clip]')!;
    const divider = mount.querySelector<HTMLElement>('[data-ba-divider]')!;
    const handle = mount.querySelector<HTMLButtonElement>('[data-ba-handle]')!;
    const range = mount.querySelector<HTMLInputElement>('input[type="range"]')!;

    const setPos = (pct: number) => {
      const c = Math.max(0, Math.min(100, pct));
      afterClip.style.setProperty('--ba-position', `${c}%`);
      afterClip.style.clipPath = `inset(0 calc(100% - ${c}%) 0 0)`;
      divider.style.left = `calc(${c}% - 1px)`;
      handle.style.left = `${c}%`;
      frame.style.setProperty('--ba-position', `${c}%`);
      range.value = String(c);
    };
    setPos(50);

    range.addEventListener('input', () => setPos(Number(range.value)));

    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 2;
      let next: number | null = null;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Number(range.value) - step;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Number(range.value) + step;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = 100;
      if (next !== null) { e.preventDefault(); setPos(next); }
    });

    let dragging = false;
    const update = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setPos(pct);
    };
    frame.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.dataset.dragging = '1';
      try { frame.setPointerCapture(e.pointerId); } catch {}
      update(e);
    });
    frame.addEventListener('pointermove', (e) => { if (dragging) update(e); });
    frame.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      delete handle.dataset.dragging;
    });
    frame.addEventListener('pointercancel', () => {
      dragging = false;
      delete handle.dataset.dragging;
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(() => setPos(20), 500);
      setTimeout(() => setPos(80), 1300);
      setTimeout(() => setPos(50), 2100);
    }
  };

  const completedJobs = (): Array<{ id: string; job: Job; item: UploadItem }> => {
    const out: Array<{ id: string; job: Job; item: UploadItem }> = [];
    const items = store.snapshot();
    const jobsMap = (runner as any).jobs as Map<string, Job>;
    for (const item of items) {
      const job = jobsMap.get(item.id);
      if (job && job.status === 'done' && job.result) {
        out.push({ id: item.id, job, item });
      }
    }
    return out;
  };

  const downloadOne = (itemId: string) => {
    const jobsMap = (runner as any).jobs as Map<string, Job>;
    const item = store.snapshot().find((i) => i.id === itemId);
    const job = jobsMap.get(itemId);
    if (!item || !job?.result) return;
    const name = outputFilename(item.path ?? item.file.name, job.result.outputExt);
    downloadBlob(job.result.blob, name);
  };

  const downloadAll = async () => {
    const entries = completedJobs().map(({ job, item }) => ({
      name: outputFilename(item.path ?? item.file.name, job.result!.outputExt),
      blob: job.result!.blob,
    }));
    if (entries.length === 0) return;
    if (downloadAllBtn) {
      downloadAllBtn.disabled = true;
      const original = downloadAllBtn.innerHTML;
      downloadAllBtn.innerHTML = 'Zipping…';
      try {
        await downloadFiles(entries, 'toolboximage.zip');
      } finally {
        if (downloadAllBtn) {
          downloadAllBtn.disabled = false;
          downloadAllBtn.innerHTML = original;
        }
      }
    } else {
      await downloadFiles(entries, 'toolboximage.zip');
    }
  };

  const outputFilename = (originalName: string, ext: string): string => {
    const dot = originalName.lastIndexOf('.');
    const base = dot === -1 ? originalName : originalName.slice(0, dot);
    return ext ? `${base}.${ext}` : originalName;
  };

  runner.subscribeJobs(updateJobUI);
  runner.subscribeProgress((p) => {
    if (!queueProgressEl || !qpFill || !qpCounts || !qpEta || !qpSaved) return;
    const hasJobs = p.total > 0;
    const allDone = hasJobs && p.done + p.errored === p.total && !p.active && p.queued === 0;
    queueProgressEl.hidden = !hasJobs || allDone;
    if (!hasJobs || allDone) return;
    const percent = p.total ? Math.round(((p.done + p.errored) / p.total) * 100) : 0;
    qpFill.style.width = `${percent}%`;
    if (qpBar) qpBar.setAttribute('aria-valuenow', String(percent));
    qpCounts.textContent = `${p.done} / ${p.total}`;
    qpEta.textContent = p.active
      ? p.etaMs > 0 ? `~${formatEta(p.etaMs)} remaining` : 'estimating…'
      : p.errored ? 'done with errors' : 'done';
    const totalSourceBytes = store.snapshot().reduce((s, i) => s + i.size, 0);
    qpSaved.textContent = p.savedBytes > 0
      ? `Saved ${formatBytes(p.savedBytes)} of ${formatBytes(totalSourceBytes)}`
      : `${formatBytes(totalSourceBytes)} to compress`;

    if (qpErrors) {
      if (p.errored > 0) { qpErrors.hidden = false; qpErrors.textContent = `${p.errored} failed`; }
      else { qpErrors.hidden = true; }
    }
    if (cancelAllBtn) cancelAllBtn.hidden = !p.active && p.queued === 0;
  });

  store.subscribe(renderQueue);
  window.addEventListener('toolboximage:files', async (e) => {
    const detail = (e as CustomEvent<FilesDetail>).detail;
    if (!detail?.files?.length) return;
    const result = await store.add(detail.files, detail.paths);
    if (result.errors.length) {
      const toast = (window as any).toast;
      if (typeof toast === 'function') {
        toast({
          title: `${result.errors.length} file${result.errors.length === 1 ? '' : 's'} skipped`,
          description: result.errors
            .slice(0, 3)
            .map((er) => `· ${er.fileName}`)
            .join('\n'),
          tone: 'warning',
        });
      }
    }
  });

  clearBtn?.addEventListener('click', () => {
    store.clear(); runner.clear(); baMounted = false;
    if (baBeforeUrl) { URL.revokeObjectURL(baBeforeUrl); baBeforeUrl = null; }
    if (baAfterUrl) { URL.revokeObjectURL(baAfterUrl); baAfterUrl = null; }
    if (resultsBaMount) resultsBaMount.innerHTML = '';
  });
  addMoreBtn?.addEventListener('click', () => {
    document.querySelector<HTMLInputElement>('[data-action="file-input"]')?.click();
  });
  cancelAllBtn?.addEventListener('click', () => runner.cancelAll());
  compressBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.getAttribute('aria-disabled') === 'true') return;
      const force = compressStarted && settingsVersion !== lastCompressVersion;
      lastCompressVersion = settingsVersion;
      compressStarted = true;
      if (force) {
        baMounted = false;
      }
      runner.startAll({ force });
    });
  });
  cancelBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    runner.cancelAll();
  });

  downloadAllBtn?.addEventListener('click', () => downloadAll());
  downloadOneBtn?.addEventListener('click', () => {
    const jobs = completedJobs();
    if (jobs[0]) downloadOne(jobs[0].id);
  });

  function formatEta(ms: number): string {
    if (ms < 1000) return '<1s';
    const s = Math.round(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return rs > 0 ? `${m}m ${rs}s` : `${m}m`;
  }
}
