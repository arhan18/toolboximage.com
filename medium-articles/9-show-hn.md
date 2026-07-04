# Show HN: ToolBox Image – 8 Privacy-First Image Tools That Run 100% in Your Browser

I built a set of image processing tools that never upload your files to a server. Everything runs in the browser using Canvas API + Web Workers.

**Tools available:**
- Image Compressor (supports JPEG, PNG, WebP, AVIF, GIF — up to 200 images at once)
- Format Converter (JPEG, PNG, WebP, AVIF, GIF, SVG — batch mode with ZIP download)
- Image Resizer (with social media presets + new crop-before-resize feature)
- Image Cropper (1:1, 4:5, 16:9, 3:2, 4:3, freeform — arrow key nudge + edge snap)
- Image Rotator (90°, 180°, 270°, custom angle, horizontal/vertical flip)
- Image Watermark (custom text, opacity, rotation, position, tile mode)
- Passport Photo Maker (10 country presets — US 2×2, UK/EU/AU/India 35×45, Canada 50×70, China 33×48, Japan 35×45 — 4×6 print layout)
- Metadata Viewer (view and strip EXIF/GPS data, organized cards)

**Why I built this:**

I kept running into the same problems with existing tools:
1. They upload my private photos to servers I don't control
2. They watermark the output unless I pay
3. They limit file sizes unless I subscribe
4. HEIC support is rare in free tools

So I made my own. All 8 tools are free, no sign-up, no uploads, no file size limits (limited by device memory).

**Tech stack:** Astro (static site), TypeScript, HTML5 Canvas API, exifr for metadata parsing, 13 language translations (including Arabic/Hindi/Japanese). Deployed on Cloudflare Pages.

Privacy-first image tools: toolboximage.com

Would love feedback — there are 6 more tools in development (background remover, blur, HEIC converter, etc.)
