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
- **Blog posts (19 total):** why-client-side, image-compression-basics, designing-the-compressor, introducing-toolboximage, choose-image-format, batch-compression-guide, image-size-limits-social-email, compress-to-exact-file-size, png-vs-webp-vs-avif, heic-to-jpg-guide, social-media-image-sizes, image-compression-ecommerce, privacy-first-image-tools, optimize-images-wordpress, remove-exif-data-online, webp-vs-avif-comparison, reduce-image-size-without-losing-quality, how-to-convert-images-online, how-to-resize-images-for-social-media
- **Blog infrastructure:** Categories (guides/tutorials/technology/privacy/general + "All Posts" filter tabs), multiple tags per post with clickable tag cloud sidebar, featured posts, related posts sidebar, tag-based URL filtering
- **Pending user actions:** Submit to 5 directories (AlternativeTo, FreeForDev, SaasHub, DevHunt, AwesomeList), post Show HN, set GitHub repo description/topics
- **Monetization:** /support page with PayPal.Me (arhanahmadkhan) + UPI (8115033956@ptyes). Next steps: affiliate links, Pro tier. No AdSense (breaks privacy brand)
- **Privacy/FAQ pages:** Updated to honestly disclose Cloudflare Web Analytics
- **Font optimizations:** Only preload Regular (font-display: swap for others)
- **Share buttons:** Added to compressor result page (Twitter/X, Reddit, Email)
- **Competitor reference:** https://imagetoolbox.app — they have 24+ tools (converters, PDF tools, AI tools, passport photo, background remover). User wants to build similar tools directory with working tools under hero section (pattern: "All / Convert / Resize / Edit / Optimize" tabs)
- **Live tools (8):** Image Compressor, Bulk Compressor, Compress JPEG/PNG/WebP/AVIF/GIF/for-Web/for-Ecommerce, 100KB/Email/Discord/WhatsApp/Instagram targets, Rotator, Format Converter, Image Resizer, Cropper
- **Tools directory:** /image-tools/ has tabbed layout (All/Compress/Transform/Convert/Analyze). Homepage now has 12-card tools grid below hero, matching competitor layout
- **Updated this session:** Homepage tools grid added with live/soon status dots, link to /image-tools/, ToolUpload component got live upload handling JS (fixes rotator/tool uploads), rotate tool flip buttons fixed, homepage upload now shows tool picker overlay instead of auto-redirecting to compressor, search bar added above tools grid. Rotator status changed to Live on homepage. Playwright E2E tests added (pages.spec.ts, language.spec.ts, tools.spec.ts, translations.spec.ts). Full tools directory (/image-tools/) now renders correctly in all 13 language pages. Auto-scroll on upload added to all tools (CompressorTool, ToolUpload, RotatorTool). File persistence across language switch added via beforeunload + IndexedDB.
- **i18n system (current session):** Full multi-language support for 13 languages (EN, ES, FR, DE, IT, PT, RU, ZH, JA, KO, AR, HI, TR). Homepage content extracted into `src/components/home/HomeContent.astro` shared component used by both `index.astro` and `[lang].astro`. Catch-all route `[lang]/[...slug].astro` serves translated pages for all tools, blog, FAQ, about, contact, legal pages (678 total pages). Hindi translations rewritten to use conversational/natural Hindi. Language-prefixed links throughout (e.g., `/hi/compressor/` instead of `/compressor/`).
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

1. **Same UI across all languages**: Every page (blog, tools, about, FAQ, etc.) must render the exact same UI in all 13 languages. Never use stripped-down inline HTML for non-English versions — all pages must use shared components. Use `src/components/blog/BlogIndexPage.astro` and `src/components/blog/BlogPostPage.astro` for blog pages in all languages.
2. **Always pass `lang` prop**: Every page-level and tool component must accept an optional `lang` prop (default `'en'`).
3. **Use `useTranslations(lang)`**: In Astro frontmatter, always call `const _ = useTranslations(lang)` and use `_(key)` for all user-facing strings.
4. **JS runtime strings**: For strings displayed by client-side `<script>` code, use `data-i18n="key.name"` attributes on HTML elements and a runtime lookup function:
   ```js
   const i18n = (key) => document.querySelector(`[data-i18n="${key}"]`)?.textContent ?? key;
   ```
5. **New translation keys**: When adding new user-facing text, add `'key.name': 'English value'` to the `en` section of `src/i18n/translations.ts` and provide translations for all 13 languages before shipping.
6. **13 languages**: ES, FR, DE, IT, PT, RU, ZH, JA, KO, AR, HI, TR + EN. Always include ALL languages when adding new keys.
7. **Tool status badges**: Use `_('tools.live')`, `_('tools.soon')`, `_('nav.planned')` rather than hardcoded strings.
8. **Catch-all route**: `[lang]/[...slug].astro` passes `lang={langCode}` to live tool components.
9. **Language switcher**: Uses `translatePath()` which already handles lang-prefixed URLs correctly — never construct lang URLs manually.
10. **Nav/Footer links**: Use `langPath(lang, href)` for all internal links to preserve the current language.
11. **SEO**: Pass `lang` to Layout and use `localeFromLang()` for `og:locale` and Schema.org `inLanguage`.

## Tool Development & Research Rules

### 1. Research Before Building
- Research high-quality open-source implementations on GitHub (multiple repos, not one).
- Study architecture, algorithms, browser APIs, performance, UX, error handling, accessibility, edge cases, memory management, file handling, security.
- Learn from the best implementations, then build an original implementation. Do not copy code.
- Reuse existing shared components.

### 2. Browser First — Zero Budget
- Prefer browser-native processing. **No paid APIs, no paid services, no subscriptions.**
- Every tool must work 100% free, client-side, with no server costs.
- Only use third-party libraries if they're MIT/Apache/BSD licensed and run entirely in the browser.
- Process files locally. Keep images on device. Never upload.
- If a tool requires AI/ML, use browser-compatible ONNX/TF.js models — but only if the model is small enough for practical web use.
- Tools that require paid APIs (remove.bg, Cloudinary, etc.) are automatically deprioritized regardless of search demand.

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

## Bible Directory

This project follows the ToolboxImage Engineering Bible.

When choosing which tool to build next, consult `bible/TOOL_PRIORITY.md` — it ranks tools by search demand, feasibility, and brand fit.

### Before Every Task

1. **Read the Bible README** — understand the project's engineering principles.
2. **Read only the handbook documents relevant to the current task** — don't waste time on unrelated ones.
3. **Never upload, commit, publish, or expose any handbook file.** The Bible is confidential local documentation and is never part of the repository.
4. **Before writing code, inspect the existing project** — reuse components whenever possible. Never duplicate existing code.
5. **Before implementing, explain your plan** — outline what you'll build and how.

### After Implementing

After implementing any feature, do NOT report "Done" immediately.

Instead:
1. Read the relevant handbook documents.
2. Identify the tool category and create a tool-specific validation plan.
3. Test the feature like a real user would.
4. Verify that previews match exported results.
5. Verify calculations and transformations.
6. Test edge cases, mobile/desktop layouts, and major browsers.
7. Run Playwright tests.
8. Fix every issue found before reporting completion.

### Mandatory Validation

Passing compilation is NOT sufficient.

Passing Playwright is NOT sufficient.

Passing unit tests is NOT sufficient.

Every feature must be validated from the perspective of a real user.

AI agents must identify the tool category and perform tool-specific validation before considering any task complete.

**Example — Image Resizer:**
- Verify preview accuracy.
- Verify exported image dimensions.
- Verify aspect ratio preservation.
- Verify mobile layout.
- Verify browser compatibility.
- Verify accessibility.

**Example — Image Compressor:**
- Verify file size reduction.
- Verify visual quality.
- Verify metadata handling.
- Verify target-size compression.
- Verify preview matches download.
- Verify downloads.

**Example — Crop Tool:**
- Verify crop preview accuracy.
- Verify exported crop matches preview.
- Verify preset aspect ratios.
- Verify freeform crop.
- Verify touch/drag support.

Each tool has different validation requirements.

Think about how users will actually use the tool and test those scenarios.

Never assume the preview is correct.

Never assume the exported file is correct.

Never assume calculations are correct.

Verify them.

### Bugs Become Rules

Every bug discovered after implementation must become a permanent handbook rule if it exposes a missing validation step.

If you discover missing handbook guidance, recommend improvements to the handbook itself.

### Definition of Done

A feature is complete only when:

- **Engineering standards pass** — code follows project conventions, builds cleanly.
- **UX validation passes** — workflows are intuitive, no confusing states.
- **Tool-specific validation passes** — the tool works correctly for all intended use cases.
- **Accessibility passes** — keyboard navigation, screen readers, color contrast.
- **Performance passes** — processing is fast, no jank, memory usage is reasonable.
- **Security passes** — no exposed data, no injection vectors.
- **SEO passes** — metadata, structured data, internal links, content.

The objective is not to produce code.

The objective is to produce a reliable product that users trust.

## Testing with Playwright

The project uses Playwright for end-to-end testing. Tests are in `e2e/`.

### Commands
```
npm run test           # Run all tests
npm run test:ui        # Run with interactive UI mode
npm run test:headed    # Run with visible browser (debugging)
```

### Workflow
1. First build: `npm run build` (tests read sitemap from `dist/`)
2. Then preview: `npx astro preview` (serves from `dist/` on port 4321)
3. Then test: `npx playwright test`

Or use the convenience script: `npm run test:full` (builds, waits, then tests).

### What tests exist
- **pages.spec.ts** — Loads every page from the sitemap (678 pages across 13 languages), checks for 200 status and zero console errors. **Runs on Chromium only** by default.
- **language.spec.ts** — Verifies language switcher works, translated content renders on each language's pages, no English fallback leaks. Runs on all browser projects.
- **tools.spec.ts** — Tests Compressor, Rotator, Converter, and Resizer upload flows: zone visibility, file acceptance, preview rendering, no console errors. Runs on all browser projects.
- **translations.spec.ts** — Asserts specific translated strings appear on the correct language pages and English strings don't appear where they shouldn't. Runs on all browser projects.

### Browser Matrix
| Project | Browser | Viewport | pages.spec.ts |
|---------|---------|----------|:---:|
| chromium | Chrome/Edge/Brave | Desktop 1280×720 | ✅ full |
| firefox | Firefox | Desktop 1280×720 | ❌ skipped |
| webkit | Safari | Desktop 1280×720 | ❌ skipped |
| mobile-chrome | Chrome (Pixel 5) | Mobile 393×851 | ❌ skipped |
| mobile-safari | Safari (iPhone 13) | Mobile 390×844 | ❌ skipped |
| tablet | Safari (iPad Pro 11) | Tablet 834×1194 | ❌ skipped |

Non-Chromium projects run tools, translations, and language tests to catch cross-browser JS/CSS bugs where they actually matter.

### Before Deploy
Run the full matrix manually to catch any page-specific issues in Firefox/WebKit:
```
npx playwright test --project=chromium --project=firefox --project=webkit
```
This tests all 678 pages in all three engine families. Takes ~20min.

### Adding new tests
When adding a new tool or page:
1. Add the slug to `e2e/helpers.ts` `LIVE_TOOL_PAGES` array if it's a live tool
2. Add upload + process + download test in `e2e/tools.spec.ts`
3. Add translation checks in `e2e/translations.spec.ts`
4. Run `npm run test:full` to verify everything passes

### Rules
- Always build before running tests (tests parse the sitemap from `dist/`)
- Tests are fully parallel by default (Chromium-only: ~700 tests in ~35s; six projects: ~4200 tests in ~5min)
- Failed tests capture screenshots and traces in `test-results/`
- Do not skip console-error checks — a page with JS errors is a broken page
