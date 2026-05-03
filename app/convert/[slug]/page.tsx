import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ConverterPreset from '@/components/ConverterPreset';
import { SEO_CONVERSIONS, getConversionBySlug, formatLabel } from '@/lib/seo-conversions';

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
      </div>
    </div>
  );
}

function ConversionBenefits({ from, to }: { from: string; to: string }) {
  const benefits: Record<string, string> = {
    'png-webp': 'WebP files are typically 25–35% smaller than PNG with no visible quality loss — ideal for web use.',
    'jpg-webp': 'WebP offers better compression than JPG at the same quality, reducing file sizes by up to 30%.',
    'webp-png': 'PNG is lossless and widely supported. Convert from WebP when you need maximum compatibility.',
    'webp-jpg': 'JPG has near-universal support across apps and devices — perfect when WebP isn\'t accepted.',
    'png-jpg':  'JPG files are much smaller than PNG for photos. Use when file size matters and you don\'t need transparency.',
    'jpg-png':  'PNG preserves full quality with no compression artifacts. Convert when you need lossless editing.',
    'bmp-webp': 'BMP files are uncompressed and huge. WebP reduces them by up to 90% with excellent quality.',
    'bmp-jpg':  'Shrink oversized BMP files into compact JPGs — much faster to share and store.',
    'bmp-png':  'Get a lossless, compressed version of your BMP — smaller file, same image quality.',
    'gif-webp': 'WebP supports animation and is up to 64% smaller than GIF. The modern alternative.',
    'gif-png':  'Convert GIF frames to static PNG for better quality single images.',
    'gif-jpg':  'Turn GIF stills into compact JPGs — better quality, smaller size.',
    'avif-png': 'PNG offers maximum compatibility for your AVIF images across all apps.',
    'avif-jpg': 'Convert AVIF to JPG for universal compatibility on older software and devices.',
    'avif-webp':'WebP is broadly supported and nearly as efficient as AVIF — a safe middle ground.',
    'png-avif': 'AVIF achieves 50% smaller files than PNG at equivalent quality — the next-gen format.',
    'jpg-avif': 'AVIF compresses photos significantly better than JPG with less visible quality loss.',
    'webp-avif':'AVIF pushes compression further — smaller files, same great quality.',
  };

  const key = `${from}-${to}`;
  const text = benefits[key] ?? `Converting ${from.toUpperCase()} to ${to.toUpperCase()} is fast and free with Pixvert. All processing happens locally in your browser.`;

  return <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{text}</p>;
}
