## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Session Memory

Key facts about this project (read before starting new tasks):

- **Site:** ToolBox Image (toolboximage.com) — privacy-first, browser-based image compression
- **Deploy:** Cloudflare Pages via `npm run deploy` (wrangler). Production branch is `main`
- **Analytics:** Cloudflare Web Analytics (cookieless, no consent banner needed)
- **SEO:** 43 pages, sitemap auto-generated, good SEO meta + JSON-LD on all pages
- **Blog posts (17 total):** why-client-side, image-compression-basics, designing-the-compressor, introducing-toolboximage, choose-image-format, batch-compression-guide, image-size-limits-social-email, compress-to-exact-file-size, png-vs-webp-vs-avif, heic-to-jpg-guide, social-media-image-sizes, image-compression-ecommerce, privacy-first-image-tools, optimize-images-wordpress, remove-exif-data-online, webp-vs-avif-comparison, reduce-image-size-without-losing-quality
- **Blog infrastructure:** Categories (guides/tutorials/technology/privacy/general + "All Posts" filter tabs), multiple tags per post with clickable tag cloud sidebar, featured posts, related posts sidebar, tag-based URL filtering
- **Pending user actions:** Submit to 5 directories (AlternativeTo, FreeForDev, SaasHub, DevHunt, AwesomeList), post Show HN, set GitHub repo description/topics
- **Monetization:** /support page with PayPal.Me (arhanahmadkhan) + UPI (8115033956@ptyes). Next steps: affiliate links, Pro tier. No AdSense (breaks privacy brand)
- **Privacy/FAQ pages:** Updated to honestly disclose Cloudflare Web Analytics
- **Font optimizations:** Only preload Regular (font-display: swap for others)
- **Share buttons:** Added to compressor result page (Twitter/X, Reddit, Email)
- **Competitor reference:** https://imagetoolbox.app — they have 24+ tools (converters, PDF tools, AI tools, passport photo, background remover). User wants to build similar tools directory with working tools under hero section (pattern: "All / Convert / Resize / Edit / Optimize" tabs)
- **Live tools:** Image Compressor, Bulk Compressor, Compress JPEG/PNG/WebP/AVIF, 100KB/Email/Discord target pages, Rotate Image (rotator tool now live), Resize Image & Convert Format (coming soon)
- **Tools directory:** /image-tools/ has tabbed layout (All/Compress/Transform/Convert/Analyze). Homepage now has 12-card tools grid below hero, matching competitor layout
- **Updated this session:** Homepage tools grid added with live/soon status dots, link to /image-tools/, AGENTS.md updated, ToolUpload component got live upload handling JS (fixes rotator/tool uploads), rotate tool flip buttons fixed, homepage upload now shows tool picker overlay instead of auto-redirecting to compressor, search bar added above tools grid. Rotator status changed to Live on homepage.
- **i18n system (current session):** Full multi-language support for 13 languages (EN, ES, FR, DE, IT, PT, RU, ZH, JA, KO, AR, HI, TR). Homepage content extracted into `src/components/home/HomeContent.astro` shared component used by both `index.astro` and `[lang].astro`. Catch-all route `[lang]/[...slug].astro` serves translated pages for all tools, blog, FAQ, about, contact, legal pages (616 total pages). Hindi translations rewritten to use conversational/natural Hindi. Language-prefixed links throughout (e.g., `/hi/compressor/` instead of `/compressor/`).
- **Tool i18n pattern:** Tool components are extracted into `src/components/tools/` (e.g., `CompressorTool.astro`, `RotatorTool.astro`) so they can be reused in both English pages and language routes. When adding a new live tool:
  1. Create a `{ToolName}Tool.astro` component in `src/components/tools/` with the tool's HTML/JS (no Layout/AppShell wrapper)
  2. Reference it in `src/pages/tools/[tool].astro` if appropriate
  3. Add it to `isLiveTool` checks in `src/pages/[lang]/[...slug].astro` and import + render the component
  4. Add the slug to `getStaticPaths()` in the catch-all route

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## i18n Development Rules

1. **Always pass `lang` prop**: Every page-level and tool component must accept an optional `lang` prop (default `'en'`).
2. **Use `useTranslations(lang)`**: In Astro frontmatter, always call `const _ = useTranslations(lang)` and use `_(key)` for all user-facing strings.
3. **JS runtime strings**: For strings displayed by client-side `<script>` code, use `data-i18n="key.name"` attributes on HTML elements and a runtime lookup function:
   ```js
   const i18n = (key) => document.querySelector(`[data-i18n="${key}"]`)?.textContent ?? key;
   ```
4. **New translation keys**: When adding new user-facing text, add `'key.name': 'English value'` to the `en` section of `src/i18n/translations.ts` and provide translations for all 13 languages before shipping.
5. **13 languages**: ES, FR, DE, IT, PT, RU, ZH, JA, KO, AR, HI, TR + EN. Always include ALL languages when adding new keys.
6. **Tool status badges**: Use `_('tools.live')`, `_('tools.soon')`, `_('nav.planned')` rather than hardcoded strings.
7. **Catch-all route**: `[lang]/[...slug].astro` passes `lang={langCode}` to live tool components.
8. **Language switcher**: Uses `translatePath()` which already handles lang-prefixed URLs correctly — never construct lang URLs manually.
9. **Nav/Footer links**: Use `langPath(lang, href)` for all internal links to preserve the current language.
10. **SEO**: Pass `lang` to Layout and use `localeFromLang()` for `og:locale` and Schema.org `inLanguage`.

## Tool Development & Research Rules

### 1. Research Before Building
- Research high-quality open-source implementations on GitHub (multiple repos, not one).
- Study architecture, algorithms, browser APIs, performance, UX, error handling, accessibility, edge cases, memory management, file handling, security.
- Learn from the best implementations, then build an original implementation. Do not copy code.
- Reuse existing shared components.

### 2. Browser First
- Prefer browser-native processing. Avoid paid APIs and third-party services.
- Only use third-party services if free, no hidden limits, improves the product, and doesn't compromise privacy.
- Process files locally. Keep images on device. Avoid uploads.

### 3. Reusable Architecture
Every new tool must reuse shared layouts, components, UI, upload/download systems, and localization. Never duplicate existing code.

### 4. SEO Requirements (Mandatory)

Every new tool must include complete SEO before it is considered finished.

Before building the SEO:
- Research keywords using Ahrefs Free Keyword Generator (or equivalent free tool).
- Identify: primary keyword, secondary keywords, long-tail keywords, question keywords, related searches, low-competition keywords, high-traffic keywords.

Use this research to build a complete SEO ecosystem.

**Tool page:**
- SEO-friendly URL, title tag, meta description, H1, H2/H3 headings
- 600–1000+ words of unique content
- Internal links, related tools
- FAQ + JSON-LD FAQ Schema
- Breadcrumb Schema + SoftwareApplication Schema (when applicable)
- Open Graph tags + Twitter Cards

**Supporting pages:**
Whenever keyword research shows meaningful search demand, create supporting landing pages (format-specific, size-specific, use-case, industry, comparison pages). Each must have unique content and link to the main tool page.

**Blog:**
Whenever keyword research identifies informational search intent, create SEO blog posts targeting one primary keyword each. Link to the relevant tool. Include FAQ and structured data.

**FAQ:**
Automatically expand the website FAQ whenever new high-volume questions are discovered. Answer clearly, target search intent, add to relevant tool pages, include in JSON-LD FAQ Schema.

**Internal linking:**
Whenever new pages are created: link related tools together, link blog posts to tools, link tools to blogs, link FAQs where appropriate.

**Definition of done:**
A new tool is not complete until: the tool works correctly, supporting landing pages are created (when justified), SEO content is complete, relevant blog posts are created, FAQs are updated, structured data is added, internal linking is complete.

### 5. Content
Every tool page needs: overview, features, benefits, step-by-step guide, supported formats, best practices, common use cases, SEO FAQ, CTA, related tools links.

### 6. Quality Assurance
Before marking complete verify: upload, drag & drop, multi-upload, folder upload, clipboard paste, processing, preview, download, output validity, file sizes, statistics, responsive layout, dark mode, accessibility, all languages, SEO metadata, structured data.
