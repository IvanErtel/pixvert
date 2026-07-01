import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ConverterPreset from '@/components/ConverterPreset';
import { SEO_CONVERSIONS, getConversionBySlug, getRelatedConversions, formatLabel } from '@/lib/seo-conversions';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_CONVERSIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);
  if (!conversion) return {};

  const from = formatLabel(conversion.from);
  const to = formatLabel(conversion.to);

  return {
    title: `Convert ${from} to ${to} Free Online — Pixvert`,
    description: `Convert ${from} to ${to} online for free. Fast, private, 100% local processing. Your files never leave your browser. No upload needed.`,
    openGraph: {
      title: `Convert ${from} to ${to} Free — Pixvert`,
      description: `Free ${from} to ${to} converter. Instant, private, no upload required.`,
    },
    alternates: {
      canonical: `/convert/${slug}`,
    },
  };
}

export default async function ConvertPage({ params }: Props) {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);
  if (!conversion) notFound();

  const from = formatLabel(conversion.from);
  const to = formatLabel(conversion.to);
  const related = getRelatedConversions(conversion);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      {/* Page-specific hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          <span>{from}</span>
          <svg className="w-4 h-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <span>{to}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
          Convert {from} to{' '}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            {to}
          </span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Free, instant, and private. Your files never leave your browser.
        </p>
      </div>

      {/* Privacy badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-[#10B981] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 self-center mb-6 w-fit mx-auto">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        100% Local Processing — Your files never leave your browser
      </div>

      <ConverterPreset defaultFormat={conversion.to} />

      {/* SEO content */}
      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
          How to convert {from} to {to}
        </h2>
        <ol className="space-y-2 text-slate-600 dark:text-slate-400 text-sm list-decimal list-inside">
          <li>Drop your {from} files in the box above (or click to select them)</li>
          <li>Click <strong>Convert All</strong> — conversion happens instantly in your browser</li>
          <li>Download each file individually or all at once as a ZIP</li>
        </ol>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
          Why convert {from} to {to}?
        </h2>
        <ConversionBenefits from={conversion.from} to={conversion.to} />

        {related.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
              Related conversions
            </h2>
            <div className="flex flex-wrap gap-2 not-prose">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/convert/${r.slug}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {formatLabel(r.from)} to {formatLabel(r.to)}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ConversionBenefits({ from, to }: { from: string; to: string }) {
  const benefits: Record<string, string> = {
    // WebP
    'png-webp':  'WebP files are typically 25–35% smaller than PNG with no visible quality loss — ideal for web use.',
    'jpg-webp':  'WebP offers better compression than JPG at the same quality, reducing file sizes by up to 30%.',
    'webp-png':  'PNG is lossless and widely supported. Convert from WebP when you need maximum compatibility.',
    'webp-jpg':  'JPG has near-universal support across apps and devices — perfect when WebP isn\'t accepted.',
    // JPG / PNG
    'png-jpg':   'JPG files are much smaller than PNG for photos. Use when file size matters and you don\'t need transparency.',
    'jpg-png':   'PNG preserves full quality with no compression artifacts. Convert when you need lossless editing.',
    // AVIF
    'png-avif':  'AVIF achieves 50% smaller files than PNG at equivalent quality — the next-gen format.',
    'jpg-avif':  'AVIF compresses photos significantly better than JPG with less visible quality loss.',
    'webp-avif': 'AVIF pushes compression further — smaller files, same great quality.',
    'avif-png':  'PNG offers maximum compatibility for your AVIF images across all apps.',
    'avif-jpg':  'Convert AVIF to JPG for universal compatibility on older software and devices.',
    'avif-webp': 'WebP is broadly supported and nearly as efficient as AVIF — a safe middle ground.',
    // BMP
    'bmp-webp':  'BMP files are uncompressed and huge. WebP reduces them by up to 90% with excellent quality.',
    'bmp-jpg':   'Shrink oversized BMP files into compact JPGs — much faster to share and store.',
    'bmp-png':   'Get a lossless, compressed version of your BMP — smaller file, same image quality.',
    'png-bmp':   'BMP is uncompressed and compatible with every Windows application and legacy software.',
    'jpg-bmp':   'Convert JPG to BMP for use in applications that require raw, uncompressed image data.',
    'webp-bmp':  'BMP format works everywhere — great for compatibility when WebP isn\'t supported.',
    // GIF
    'gif-webp':  'WebP supports animation and is up to 64% smaller than GIF. The modern alternative.',
    'gif-png':   'Convert GIF frames to static PNG for better quality and transparency support.',
    'gif-jpg':   'Turn GIF stills into compact JPGs — better quality, smaller size.',
    'png-gif':   'GIF is perfect for simple graphics, icons, and logos with limited colors.',
    'jpg-gif':   'Reduce file size and create shareable GIF images from your JPG photos.',
    'webp-gif':  'GIF has universal support — convert when you need the widest compatibility.',
    // TIFF
    'png-tiff':  'TIFF is the standard for print and professional photography — lossless and widely accepted in creative workflows.',
    'jpg-tiff':  'Convert to TIFF for high-quality printing or professional editing without compression artifacts.',
    'webp-tiff': 'TIFF is the go-to format for print production, photo editing, and archiving.',
    'tiff-jpg':  'Convert large TIFF files to compact JPGs for easy sharing and web use.',
    'tiff-png':  'PNG gives you a lossless, web-ready version of your TIFF — perfect for online use.',
    'tiff-webp': 'WebP dramatically reduces TIFF file sizes while maintaining excellent quality for the web.',
    // ICO
    'png-ico':   'Create a favicon from your PNG — ICO format is required for browser tab icons and desktop shortcuts.',
    'jpg-ico':   'Turn any JPG into an ICO file. Get sizes 16×16, 32×32 and 48×48 in a single file — ready for any platform.',
    'avif-ico':  'Turn your next-gen AVIF into a multi-size ICO favicon — perfect for browser tabs and app icons.',
    'gif-ico':   'Convert a GIF frame into a multi-size ICO file for use as a favicon or desktop shortcut icon.',
    'bmp-ico':   'Convert BMP to ICO and get a compact, multi-resolution icon file ready for any platform.',
    'tiff-ico':  'Turn a high-quality TIFF into a multi-size ICO favicon — all resolutions packed into one file.',
    'webp-ico':  'Create an ICO favicon from your WebP image with 16×16, 32×32 and 48×48 sizes embedded.',
    // HEIC complete
    'heic-avif': 'Get the most compact file possible from your iPhone photos — AVIF compresses HEIC conversions further than JPG.',
    'heic-gif':  'Convert iPhone HEIC photos to GIF — great for sharing animated moments or simple stills.',
    'heic-bmp':  'Convert HEIC to BMP for use in Windows applications or legacy software that requires uncompressed images.',
    'heic-tiff': 'Convert iPhone HEIC photos to TIFF for professional editing, print workflows, or archiving.',
    // JPEG aliases
    'jpeg-jpg':  'JPEG and JPG are the same format — this re-exports your file with optimized compression settings.',
    'jpeg-png':  'Convert JPEG to PNG for lossless quality and transparency support. PNG is ideal for graphics and logos.',
    'jpeg-webp': 'WebP offers better compression than JPEG at equivalent quality — reduce file size by up to 30%.',
    'jpeg-avif': 'AVIF achieves even smaller files than WebP or JPEG — the next step up in compression efficiency.',
    'jpeg-gif':  'Convert a JPEG photo to GIF format — reduces colors to 256 but gives universal compatibility.',
    'jpeg-bmp':  'Convert JPEG to BMP for uncompressed output compatible with all Windows apps and legacy software.',
    'jpeg-tiff': 'Convert JPEG to TIFF for lossless quality needed in print production or professional photo editing.',
    // PNG alias
    'png-jpeg':  'JPG files are much smaller than PNG for photos. Use when file size matters and transparency is not needed.',
    // Complete AVIF
    'avif-gif':  'Convert AVIF to GIF for universal compatibility — GIF is supported on every platform and messaging app.',
    'avif-bmp':  'Convert AVIF to BMP for uncompressed output needed by legacy apps or Windows workflows.',
    'avif-tiff': 'Get a high-quality TIFF from your AVIF for use in professional editing or print workflows.',
    // Complete GIF
    'gif-avif':  'AVIF compresses GIF content far more efficiently — great for reducing file size in modern browsers.',
    'gif-bmp':   'Convert GIF to uncompressed BMP for use in software that doesn\'t support animated or compressed formats.',
    'gif-tiff':  'Get a lossless TIFF from your GIF frame — ideal for archiving or professional image editing.',
    // Complete BMP
    'bmp-avif':  'Dramatically shrink oversized BMP files into next-gen AVIF — up to 90% smaller with great quality.',
    'bmp-tiff':  'Convert BMP to TIFF for a lossless, more widely accepted format in professional and print workflows.',
    'bmp-gif':   'Convert BMP to GIF to get a smaller, shareable image with universal compatibility.',
    // Complete TIFF
    'tiff-avif': 'AVIF compresses TIFF content significantly for web delivery while preserving excellent visual quality.',
    'tiff-bmp':  'Convert TIFF to BMP for uncompressed output compatible with all Windows applications.',
    'tiff-gif':  'Convert a TIFF to GIF for a compact, shareable image that works everywhere.',
  };

  const key = `${from}-${to}`;
  const text = benefits[key] ?? `Converting ${from.toUpperCase()} to ${to.toUpperCase()} is fast and free with Pixvert. All processing happens locally in your browser.`;

  return <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{text}</p>;
}
