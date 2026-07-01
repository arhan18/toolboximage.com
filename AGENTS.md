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
- **Blog posts (existing):** why-client-side, image-compression-basics, designing-the-compressor, introducing-toolboximage, choose-image-format, batch-compression-guide, image-size-limits-social-email, compress-to-exact-file-size, png-vs-webp-vs-avif
- **Pending user actions:** Submit to 5 directories (AlternativeTo, FreeForDev, SaasHub, DevHunt, AwesomeList), post Show HN, set GitHub repo description/topics
- **Monetization:** /support page with PayPal.Me (arhanahmadkhan) + UPI (8115033956@ptyes). Next steps: affiliate links, Pro tier. No AdSense (breaks privacy brand)
- **Privacy/FAQ pages:** Updated to honestly disclose Cloudflare Web Analytics
- **Font optimizations:** Only preload Regular (font-display: swap for others)
- **Share buttons:** Added to compressor result page (Twitter/X, Reddit, Email)
- **Competitor reference:** https://imagetoolbox.app — they have 24+ tools (converters, PDF tools, AI tools, passport photo, background remover). User wants to build similar tools directory with working tools under hero section (pattern: "All / Convert / Resize / Edit / Optimize" tabs)
- **Live tools:** Image Compressor, Bulk Compressor, Compress JPEG/PNG/WebP/AVIF, 100KB/Email/Discord target pages, Rotate Image (rotator tool now live), Resize Image & Convert Format (coming soon)
- **Tools directory:** /image-tools/ has tabbed layout (All/Compress/Transform/Convert/Analyze). Homepage now has 12-card tools grid below hero, matching competitor layout
- **Updated this session:** Homepage tools grid added with live/soon status dots, link to /image-tools/, AGENTS.md updated, ToolUpload component got live upload handling JS (fixes rotator/tool uploads), rotate tool flip buttons fixed, homepage upload now shows tool picker overlay instead of auto-redirecting to compressor, search bar added above tools grid. Rotator status changed to Live on homepage.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
