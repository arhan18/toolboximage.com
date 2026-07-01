# ToolBox Image

**Browser-based image compression that respects your privacy. Files never leave your device.**

[![Deployed on Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=fff)](https://toolboximage.com)
[![Astro](https://img.shields.io/badge/Astro-7.0-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

ToolBox Image is a free, privacy-first image compression toolkit. All processing happens in your browser using the Canvas API and WebAssembly — no uploads, no servers, no tracking. Compress, resize, convert, and optimize images locally.

**[→ Use the Compressor](https://toolboximage.com/compressor/)** · **[→ Read the Blog](https://toolboximage.com/blog/)** · **[→ Report a Bug](https://github.com/arhan18/toolboximage.com/issues)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **100% client-side** | Images are processed via Canvas API and WebAssembly — never sent to any server |
| **Batch processing** | Compress up to 200 images at once using parallel Web Workers (all CPU cores) |
| **6 formats** | JPG, PNG, WebP, AVIF, GIF, SVG — convert between any of them |
| **Target-size mode** | Set an exact KB limit; the compressor hits it automatically |
| **Side-by-side preview** | Drag the divider to compare original vs compressed at full resolution |
| **Metadata stripping** | Remove EXIF, XMP, and IPTC data for privacy |
| **Clipboard paste** | Screenshot → ⌘V → compressed — no intermediate files |
| **No sign-up** | No accounts, no limits, free for personal and commercial use |

## 🚀 Quick Start

```bash
git clone https://github.com/arhan18/toolboximage.com.git
cd toolboximage.com
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## 🏗 Architecture

```
User's Browser
│
├─ File API / Clipboard API  ← reads images (never leaves device)
├─ Canvas API                ← decode, resize, preview
├─ Web Workers (× CPU cores) ← parallel compression
├─ WebAssembly               ← mozJPEG, libwebp, libaom-avif codecs
└─ download as Blob          ← ZIP or individual files
```

Every step runs **on the user's device**. There is no backend. The only server requests are for static assets (HTML, CSS, JS, fonts) served from Cloudflare's CDN.

## 📦 Tools

| Tool | Purpose |
|------|---------|
| [Image Compressor](https://toolboximage.com/compressor/) | Main compression tool — all formats, batch, target-size |
| [Compress JPEG](https://toolboximage.com/compress-jpeg/) | JPEG-specific with mozJPEG encoder |
| [Compress PNG](https://toolboximage.com/compress-png/) | PNG compression with lossless option |
| [Compress WebP](https://toolboximage.com/compress-webp/) | WebP output for modern browsers |
| [Compress AVIF](https://toolboximage.com/compress-avif/) | Next-gen AVIF format — 30-50% smaller than WebP |
| [Bulk Compressor](https://toolboximage.com/bulk-image-compressor/) | Batch-process hundreds of images |
| [Compress for Discord](https://toolboximage.com/compress-for-discord/) | Auto-targets Discord's 8 MB limit |
| [Compress for Email](https://toolboximage.com/compress-for-email/) | Stay under 25 MB for Gmail/Outlook |
| [Compress for WhatsApp](https://toolboximage.com/compress-for-whatsapp/) | Pre-compress before WhatsApp re-encodes |
| [Compress for Instagram](https://toolboximage.com/compress-for-instagram/) | Resize to 1080px + compress |
| [Compress to 100 KB](https://toolboximage.com/image-compressor-100kb/) | Exact target size mode |

## 📋 Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy to Cloudflare Pages |

## 🧰 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro 7](https://astro.build) — static-first with island architecture |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via Vite plugin |
| CSS | Lightning CSS for minification |
| Icons | Inline SVG — zero extra requests |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) — global edge CDN |
| Analytics | [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) — cookieless, privacy-first |

## 🧪 Project Structure

```
src/
├── components/      # UI components (upload, compressor, shared)
├── layouts/         # Page layouts (Layout, ToolLayout, CompressorPageLayout)
├── lib/             # Core compression logic, SEO helpers, blog registry
├── pages/           # Routes — 25+ pages including tool landing pages
├── styles/          # Global CSS, fonts
└── types/           # TypeScript definitions
```

## 🤝 Contributing

PRs welcome! If you find a bug or have an idea:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes
4. Open a PR

## 📄 License

MIT — free for personal and commercial use.

---

**[toolboximage.com](https://toolboximage.com)** · [Blog](https://toolboximage.com/blog/) · [FAQ](https://toolboximage.com/faq/) · [Privacy](https://toolboximage.com/legal/privacy/)
