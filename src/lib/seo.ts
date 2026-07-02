/**
 * SEO utilities — structured data builders and shared metadata constants.
 */

import { localeFromLang, type LangCode } from '../i18n';

export const SITE_NAME = 'ToolBox Image';
export const SITE_DESCRIPTION =
  'Free online image compressor — compress JPG, PNG, WebP, AVIF, and GIF images directly in your browser. No uploads, no sign-up, unlimited. The best free image compressor online.';
export const SITE_URL = 'https://toolboximage.com';
export const SITE_TWITTER = '@toolboximage';
export const SITE_BASE_IMAGE = '/og-image.png';
export const SITE_LOCALE = 'en_US';

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
}

/** Organization schema (default for all pages). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://github.com/toolboximage',
      'https://twitter.com/toolboximage',
    ],
    foundingDate: '2026-06',
    founder: {
      '@type': 'Person',
      name: 'ToolBox Image Team',
    },
  };
}

/** WebSite schema — enriches search result appearance. */
export function websiteSchema(lang: LangCode = 'en') {
  const locale = localeFromLang(lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: locale,
  };
}

/** FAQ schema — must be an array of { q, a } pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/** Breadcrumb schema — list of { name, href } objects. */
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/** Article schema for blog posts. */
export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/** SoftwareApplication schema for tools. */
export function softwareAppSchema(overrides?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: overrides?.name ?? 'ToolBox Image Compressor',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    description:
      overrides?.description ??
      'Free online image compressor — compress JPG, PNG, WebP, AVIF, GIF, and SVG images entirely in your browser. No uploads, no limits, no sign-up. The best free image compressor.',
    url: overrides?.url ?? `${SITE_URL}/compressor`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript',
  };
}

/** HowTo schema — steps for image compression tasks. */
export function howToSchema(steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compress Images',
    description: 'A step-by-step guide to compressing images using ToolBox Image.',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Render one or more JSON-LD script tags. */
export function renderJsonLd(...schemas: Record<string, unknown>[]) {
  return schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}
