import type { Theme } from '../types';

const THEME_KEY = 'toolbox-theme';

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(THEME_KEY) as Theme | null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export function applyTheme(theme: Theme): void {
  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.style.colorScheme = resolved;
}

export function initTheme(): Theme {
  const stored = getStoredTheme();
  const theme = stored ?? 'system';
  applyTheme(theme);
  return theme;
}
