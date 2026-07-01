# ToolBox Image

[![Astro](https://img.shields.io/badge/Astro-7.0-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare)](https://toolboximage.com)

**Browser-based image compression. No uploads. No limits. Private by design.**

ToolBox Image is a privacy-first image compression tool that runs entirely in your browser. Files never leave your device — all processing happens locally using Web APIs. Supports batch compression for JPG, PNG, WebP, AVIF, GIF, and SVG.

**[→ toolboximage.com](https://toolboximage.com)**

---

## Features

- **100% client-side** — images never leave your device. No server uploads, no data collection.
- **Batch processing** — compress multiple images at once.
- **Side-by-side preview** — compare original vs compressed before downloading.
- **Clipboard paste** — paste images directly from your clipboard.
- **Format support** — JPG, PNG, WebP, AVIF, GIF, SVG.
- **Quality control** — fine-tune compression level per image.
- **No sign-up** — no accounts, no limits, completely free.
- **Drag & drop** — intuitive upload interface.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 7](https://astro.build) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| CSS Minifier | Lightning CSS |
| Icons | SVG inline |
| Deployment | Cloudflare Pages |
| Analytics | Cloudflare Web Analytics |

## Getting Started

```bash
git clone https://github.com/arhan18/toolboximage.com.git
cd toolboximage.com
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build + deploy to Cloudflare Pages |

## Project Structure

```
src/
├── components/    # Reusable UI components
├── layouts/       # Page layouts
├── lib/           # Core compression logic & utilities
├── pages/         # Route pages (Astro)
│   ├── compressor.astro  # Main compression tool
│   ├── about.astro
│   ├── faq.astro
│   └── blog/      # SEO articles & guides
├── styles/        # Global styles
└── types/         # TypeScript definitions
```

## How It Works

1. User uploads or drags images into the browser
2. Images are read via the File API — **never transmitted to a server**
3. Compression happens client-side using Canvas API / WebAssembly
4. User previews results side-by-side and downloads
5. No data is stored, logged, or transmitted at any point

## Design

The UI follows a Vercel-inspired design system —[see `DESIGN.md`](./DESIGN.md) for the full design tokens, component specs, and layout philosophy.

## License

MIT
