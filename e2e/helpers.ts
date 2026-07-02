import * as fs from 'fs';
import * as path from 'path';

export const LANG_CODES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'tr'] as const;
export type LangCode = (typeof LANG_CODES)[number];

export function getLangPrefix(lang: string): string {
  return lang === 'en' ? '' : `/${lang}`;
}

export function langUrl(lang: string, slug: string): string {
  const prefix = getLangPrefix(lang);
  return `${prefix}/${slug}`.replace(/\/+/g, '/');
}

export function getAllUrls(): string[] {
  const sitemapPath = path.resolve('dist/sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('sitemap not found at', sitemapPath);
    return [];
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls: string[] = [];
  const regex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export function getEnglishUrls(): string[] {
  return getAllUrls().filter((u) => {
    const pathname = new URL(u).pathname;
    return !LANG_CODES.some((l) => pathname.startsWith(`/${l}/`));
  });
}

export type PageType = 'home' | 'compressor' | 'tool' | 'blog' | 'blog-post' | 'info';

export function classifyUrl(url: string): PageType {
  const p = new URL(url).pathname;
  const noLang = p.replace(/^\/(?:es|fr|de|it|pt|ru|zh|ja|ko|ar|hi|tr)\//, '/');
  if (noLang === '/' || noLang === '') return 'home';
  if (noLang.startsWith('/compressor') || noLang.startsWith('/compress-') || noLang.startsWith('/bulk-') || noLang.startsWith('/image-compressor') || noLang.startsWith('/jpeg-vs-png')) return 'compressor';
  if (noLang.startsWith('/tools/rotator')) return 'tool';
  if (noLang.startsWith('/blog/')) return 'blog-post';
  if (noLang.startsWith('/blog') || noLang === '/blog') return 'blog';
  return 'info';
}

export const LIVE_TOOL_PAGES = [
  '/compressor/', '/bulk-image-compressor/', '/image-compressor-100kb/',
  '/image-compressor-for-discord/', '/compress-for-email/',
  '/compress-jpeg/', '/compress-png/', '/compress-webp/', '/compress-avif/',
  '/compress-for-instagram/', '/compress-for-whatsapp/',
  '/tools/rotator/',
];

export function isLiveToolPage(pathname: string): boolean {
  return LIVE_TOOL_PAGES.some((t) => pathname.endsWith(t));
}
