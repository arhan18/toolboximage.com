import { blogTranslations, type BlogTranslation } from './blog-content';
import type { LangCode } from '../i18n';

export function getTranslatedSlugs(lang: LangCode): BlogPost[] {
  return posts.filter((p) => blogTranslations[p.slug]);
}

export function getTranslatedTitle(slug: string, lang: LangCode): string {
  return blogTranslations[slug]?.title[lang] || blogTranslations[slug]?.title.en || slug;
}

export function getTranslatedDescription(slug: string, lang: LangCode): string {
  return blogTranslations[slug]?.description[lang] || blogTranslations[slug]?.description.en || '';
}

export function getTranslatedTags(slug: string, lang: LangCode): string[] {
  return blogTranslations[slug]?.tags[lang] || blogTranslations[slug]?.tags.en || [];
}

export function getTranslatedBody(slug: string, lang: LangCode): string {
  return blogTranslations[slug]?.body[lang] || blogTranslations[slug]?.body.en || '';
}

export function getTranslatedPost(slug: string, lang: LangCode): (BlogPost & { translation: BlogTranslation }) | undefined {
  const post = posts.find((p) => p.slug === slug);
  const translation = blogTranslations[slug];
  if (!post || !translation) return undefined;
  return { ...post, translation };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: 'guides' | 'tutorials' | 'technology' | 'privacy' | 'general';
  tags: string[];
  readMinutes: number;
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'why-client-side',
    title: 'Why we built ToolBox Image to run entirely in your browser',
    description:
      'A walkthrough of the architecture behind a privacy-first image toolkit — and why the browser turned out to be the right place for it.',
    date: '2026-06-22',
    author: 'ToolBox Image team',
    category: 'technology',
    tags: ['privacy', 'architecture', 'webassembly', 'client-side'],
    readMinutes: 6,
    featured: true,
  },
  {
    slug: 'image-compression-basics',
    title: 'How image compression actually works (in 5 minutes)',
    description:
      'JPEG, WebP, AVIF — what they do, what they trade off, and how to pick the right encoder for the job.',
    date: '2026-06-15',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['compression', 'jpeg', 'webp', 'avif', 'image-formats'],
    readMinutes: 5,
  },
  {
    slug: 'designing-the-compressor',
    title: 'Designing the Compressor: details that mattered',
    description:
      'Notes from the design process — how we made a tool that feels fast and respectful of your files.',
    date: '2026-06-08',
    author: 'ToolBox Image team',
    category: 'general',
    tags: ['design', 'ux', 'interface'],
    readMinutes: 4,
  },
  {
    slug: 'introducing-toolboximage',
    title: 'Introducing ToolBox Image v1.0',
    description:
      'The Compressor is live. Here is what we are building next and why.',
    date: '2026-06-01',
    author: 'ToolBox Image team',
    category: 'general',
    tags: ['announcement', 'product', 'launch'],
    readMinutes: 3,
  },
  {
    slug: 'choose-image-format',
    title: 'How to choose the right image format for your website',
    description:
      'JPEG, PNG, WebP, AVIF — which one should you use? A practical guide to picking the best format for every image on your site.',
    date: '2026-06-28',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['jpeg', 'png', 'webp', 'avif', 'image-formats', 'optimization'],
    readMinutes: 5,
  },
  {
    slug: 'batch-compression-guide',
    title: 'Batch image compression: save hours with parallel processing',
    description:
      'Stop compressing images one by one. Here is how batch processing with parallel workers can save you hours of manual work.',
    date: '2026-07-01',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['batch', 'compression', 'workflow', 'productivity'],
    readMinutes: 4,
  },
  {
    slug: 'image-size-limits-social-email',
    title: 'Image size limits for Discord, WhatsApp, Instagram, and email — how to stay under them',
    description:
      'Every platform has a different file size limit. Here is how to compress your images for Discord, WhatsApp, Instagram, and email so they always go through.',
    date: '2026-07-02',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['social-media', 'email', 'discord', 'whatsapp', 'instagram', 'file-size'],
    readMinutes: 5,
  },
  {
    slug: 'compress-to-exact-file-size',
    title: 'How to compress an image to exactly 100 KB (or any target size)',
    description:
      'Need an image under 100 KB for a form upload, database limit, or platform requirement? Here is how to hit any exact file size with ToolBox Image.',
    date: '2026-07-02',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['compression', 'file-size', 'target-size', 'optimization'],
    readMinutes: 4,
  },
  {
    slug: 'png-vs-webp-vs-avif',
    title: 'PNG vs WebP vs AVIF — which format saves the most space?',
    description:
      'We compare PNG, WebP, and AVIF compression on real images — photographs, screenshots, logos, and graphics — to see which format wins for file size, quality, and compatibility.',
    date: '2026-07-02',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['png', 'webp', 'avif', 'image-formats', 'comparison', 'compression'],
    readMinutes: 5,
    featured: true,
  },
  {
    slug: 'heic-to-jpg-guide',
    title: 'How to convert HEIC photos to JPG on any device',
    description:
      'Apple devices save photos in HEIC format, but not every platform supports it. Here is how to convert HEIC to JPG on Windows, Mac, iPhone, and online — all for free.',
    date: '2026-07-04',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['heic', 'jpg', 'conversion', 'iphone', 'apple'],
    readMinutes: 5,
  },
  {
    slug: 'social-media-image-sizes',
    title: 'The complete guide to social media image sizes in 2026',
    description:
      'Every platform has different dimension requirements. Here is the definitive cheat sheet for Instagram, Facebook, Twitter, LinkedIn, and YouTube image sizes.',
    date: '2026-07-05',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['social-media', 'dimensions', 'instagram', 'facebook', 'linkedin', 'youtube'],
    readMinutes: 6,
  },
  {
    slug: 'image-compression-ecommerce',
    title: 'Image compression for e-commerce: speed up your store without losing quality',
    description:
      'Product images are the heaviest assets on any online store. Learn how to compress them effectively for faster page loads, better SEO, and higher conversion rates.',
    date: '2026-07-06',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['ecommerce', 'image-optimization', 'compression', 'product-photos', 'seo'],
    readMinutes: 5,
  },
  {
    slug: 'privacy-first-image-tools',
    title: 'Why privacy-first image tools matter for your data',
    description:
      'Most online image tools upload your files to remote servers. Here is why browser-based processing is safer, and how ToolBox Image keeps your images entirely on your device.',
    date: '2026-07-07',
    author: 'ToolBox Image team',
    category: 'privacy',
    tags: ['privacy', 'security', 'data-protection', 'client-side', 'browser'],
    readMinutes: 4,
    featured: true,
  },
  {
    slug: 'optimize-images-wordpress',
    title: 'How to optimize images for WordPress without plugins',
    description:
      'Tired of bloated optimization plugins slowing down your WordPress admin? Here is how to compress and serve optimized images without installing anything — straight from your browser.',
    date: '2026-07-08',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['wordpress', 'image-compression', 'web-performance', 'seo', 'optimization'],
    readMinutes: 5,
  },
  {
    slug: 'remove-exif-data-online',
    title: 'Remove hidden EXIF data from photos before sharing online',
    description:
      'Your photos contain hidden metadata — location, camera model, timestamp. Here is how to strip EXIF data from images before sharing them online, protecting your privacy.',
    date: '2026-07-09',
    author: 'ToolBox Image team',
    category: 'privacy',
    tags: ['exif', 'metadata', 'privacy', 'photo-security', 'client-side'],
    readMinutes: 4,
  },
  {
    slug: 'webp-vs-avif-comparison',
    title: 'WebP vs AVIF: which next-gen format saves more space?',
    description:
      'Both WebP and AVIF promise better compression than JPEG. We put them head-to-head on real images to see which format delivers the smallest files without sacrificing quality.',
    date: '2026-07-10',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['webp', 'avif', 'image-formats', 'web-performance', 'comparison', 'compression'],
    readMinutes: 5,
  },
  {
    slug: 'reduce-image-size-without-losing-quality',
    title: 'How to reduce image file size without losing quality',
    description:
      'Five proven techniques to shrink image file sizes while keeping every pixel sharp. From format selection to smart resizing — get the smallest files with zero visible loss.',
    date: '2026-07-11',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['compression', 'optimization', 'file-size', 'quality', 'workflow'],
    readMinutes: 5,
    featured: true,
  },
  {
    slug: 'how-to-convert-images-online',
    title: 'How to Convert Images Online Free — Convert JPG, PNG, WebP & AVIF',
    description:
      'Learn how to convert images between JPG, PNG, WebP, and AVIF formats for free online. No uploads needed — everything runs in your browser.',
    date: '2026-07-12',
    author: 'ToolBox Image team',
    category: 'tutorials',
    tags: ['image-converter', 'image-formats', 'webp', 'jpg', 'png', 'avif', 'conversion'],
    readMinutes: 5,
  },
  {
    slug: 'how-to-resize-images-for-social-media',
    title: 'How to Resize Images for Social Media in 2026 — Complete Size Guide',
    description:
      'A complete guide to social media image sizes for Instagram, Facebook, X/Twitter, LinkedIn, and YouTube in 2026. Free online resizer included.',
    date: '2026-07-13',
    author: 'ToolBox Image team',
    category: 'guides',
    tags: ['social-media', 'resizer', 'instagram', 'facebook', 'image-dimensions', 'linkedin', 'youtube'],
    readMinutes: 6,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}

export function getAllTags(): string[] {
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'all') return posts;
  return posts.filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter((p) => p.featured);
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE',
  it: 'it-IT', pt: 'pt-PT', ru: 'ru-RU', zh: 'zh-CN',
  ja: 'ja-JP', ko: 'ko-KR', ar: 'ar-SA', hi: 'hi-IN', tr: 'tr-TR',
};

export function formatDate(iso: string, lang?: string): string {
  const d = new Date(iso);
  const locale = (lang && LOCALE_MAP[lang]) || 'en-US';
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
