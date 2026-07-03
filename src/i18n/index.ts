import { t, type LangCode, LANG_CODES, LANG_INFO } from './translations';

export type { LangCode };
export { LANG_CODES, LANG_INFO };

export function getLangFromUrl(url: URL): LangCode {
  const seg = url.pathname.split('/')[1];
  if (LANG_CODES.includes(seg as LangCode)) {
    return seg as LangCode;
  }
  return 'en';
}

export function useTranslations(lang: LangCode) {
  const dict = t[lang] || t.en;
  return (key: string): string => dict[key] || t.en[key] || key;
}

export function removeLangPrefix(path: string): string {
  const seg = path.split('/')[1];
  if (LANG_CODES.includes(seg as LangCode)) {
    return '/' + path.split('/').slice(2).join('/');
  }
  return path;
}

export function langPath(lang: LangCode, path: string): string {
  if (lang === 'en') return path || '/';
  const clean = removeLangPrefix(path || '/');
  return `/${lang}${clean}`;
}

export function translatePath(path: string, fromLang: LangCode, toLang: LangCode): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return `/${toLang}/`;
  }
  
  const firstSeg = segments[0];
  
  if (LANG_CODES.includes(firstSeg as LangCode)) {
    segments.shift();
  }
  
  if (toLang === 'en') {
    return '/' + segments.join('/') + '/';
  }
  
  return '/' + toLang + '/' + segments.join('/') + '/';
}

export function currentLangFromPath(path: string): LangCode {
  const seg = path.split('/')[1];
  if (LANG_CODES.includes(seg as LangCode)) {
    return seg as LangCode;
  }
  return 'en';
}

/** Map LangCode to BCP 47 locale string (e.g., 'en' → 'en-US', 'zh' → 'zh-CN'). */
export function localeFromLang(lang: LangCode): string {
  const map: Partial<Record<LangCode, string>> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    pt: 'pt-PT',
    ru: 'ru-RU',
    zh: 'zh-CN',
    ja: 'ja-JP',
    ko: 'ko-KR',
    ar: 'ar-SA',
    hi: 'hi-IN',
    tr: 'tr-TR',
  };
  return map[lang] || 'en-US';
}

/** Determine text direction for a given language. */
export function dirFromLang(lang: LangCode): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** Map LangCode to `xx_XX` locale for Open Graph (og:locale). */
export function ogLocaleFromLang(lang: LangCode): string {
  const map: Partial<Record<LangCode, string>> = {
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
    pt: 'pt_PT',
    ru: 'ru_RU',
    zh: 'zh_CN',
    ja: 'ja_JP',
    ko: 'ko_KR',
    ar: 'ar_SA',
    hi: 'hi_IN',
    tr: 'tr_TR',
  };
  return map[lang] || 'en_US';
}

/** Prepend language prefix to a path (English gets no prefix). */
export function localizedPath(href: string, lang: LangCode): string {
  if (lang === 'en') return href;
  const clean = href.startsWith('/') ? href : `/${href}`;
  return `/${lang}${clean}`;
}
