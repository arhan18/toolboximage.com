/**
 * Theme resolution, persistence, and application.
 *
 * Storage key: `toolbox-theme` — values: `light` | `dark` | `system`.
 * The actual applied theme (light|dark) lives on <html data-theme="…">;
 * the user's preference lives in localStorage. The Layout's FOUC guard
 * runs the same resolution inline before first paint.
 */

import type { Theme, ResolvedTheme } from '../types';

const THEME_KEY = 'toolbox-theme';

export const THEME_STORAGE_KEY = THEME_KEY;

export const THEMES: readonly Theme[] = ['light', 'dark', 'system'] as const;

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return isTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // localStorage may be unavailable (private mode, quota); ignore.
  }
}

export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

export function applyTheme(theme: Theme): ResolvedTheme {
  const resolved = resolveTheme(theme);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
  }
  return resolved;
}

export function initTheme(): Theme {
  const stored = getStoredTheme();
  const theme: Theme = stored ?? 'system';
  applyTheme(theme);
  return theme;
}

export function nextTheme(current: Theme): Theme {
  const idx = THEMES.indexOf(current);
  return THEMES[(idx + 1) % THEMES.length]!;
}

/**
 * Subscribe to OS theme changes. When the user has chosen `system`,
 * follow the OS; otherwise do nothing.
 *
 * Returns an unsubscribe function.
 */
export function watchSystemTheme(onChange: (next: ResolvedTheme) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => onChange(getSystemTheme());
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * String body for the inline FOUC guard. Kept here so the inline copy
 * in <head> and the runtime module can't drift.
 */
export const FOUC_GUARD_SCRIPT = `(function(){try{var k="${THEME_KEY}";var s=localStorage.getItem(k);var t=s==="light"||s==="dark"||s==="system"?s:"system";var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.setAttribute("data-theme",r);document.documentElement.style.colorScheme=r;}catch(e){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";}})();`;