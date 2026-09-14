# Pixvert

**[pixvert-one.vercel.app](https://pixvert-one.vercel.app)** — free, private, client-side online tools: image conversion (PNG, JPG, WebP, AVIF, GIF, BMP, TIFF, ICO, HEIC), compression, and 40+ text, color, developer, calculator, generator and file tools. Everything runs locally in the browser — no file is ever uploaded to a server.

## Highlights

- **Image converter** — PNG/JPG/WebP/AVIF/GIF/BMP/TIFF/ICO/HEIC, batch conversion, ZIP download, all processing via Canvas API / Web Workers in-browser.
- **40+ free tools** — text, color, developer, calculator, generator, and file tools (see the full list at [/tools](https://pixvert-one.vercel.app/tools)).
- **No uploads, no tracking of your files** — every conversion and calculation happens on-device.
- **Free tier + Pro plan** — 10 conversions/day and 5MB files for free; Pro removes the limits.

## Stack

Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4, Stripe for billing, deployed on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contributing

Issues and pull requests are welcome — see the tool list in [`app/tools`](./app/tools) for the pattern used by existing tools.
