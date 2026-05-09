import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CompressorPreset from '@/components/CompressorPreset';
import { SEO_COMPRESS, getCompressByFormat } from '@/lib/seo-conversions';

interface Props {
  params: Promise<{ format: string }>;
}

export async function generateStaticParams() {
  return SEO_COMPRESS.map((c) => ({ format: c.format }));
}

const META: Record<string, { title: string; description: string }> = {
  image: {
    title: 'Compress Image Online Free — Pixvert',
    description:
      'Compress any image online for free. Supports JPG, PNG, WebP. Reduce file sizes by up to 60% — 100% local processing, no upload required.',
  },
  jpg: {
    title: 'Compress JPG Online Free — Pixvert',
    description:
      'Reduce JPG file size online for free. Up to 60% smaller files with no visible quality loss. 100% local — your images never leave your browser.',
  },
  png: {
    title: 'Compress PNG Online Free — Pixvert',
    description:
      'Compress PNG images online for free. Fast, private, 100% browser-based. No upload needed — your files stay on your device.',
  },
  webp: {
    title: 'Compress WebP Online Free — Pixvert',
    description:
      'Compress WebP images online for free. Keep quality high while reducing file size. 100% local processing — instant and private.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { format } = await params;
  const route = getCompressByFormat(format);
  if (!route) return {};
  const meta = META[format] ?? META['image'];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `/compress/${format}`,
    },
  };
}

const BENEFITS: Record<string, string> = {
  image:
    'Compressing images reduces page load times, saves storage space, and improves user experience. Our tool processes everything locally — your files never leave your browser.',
  jpg:
    'JPG compression reduces file size significantly while preserving visual quality. Smaller JPGs load faster on web pages and take less space in emails and cloud storage.',
  png:
    'PNG compression removes redundant data to shrink file size while keeping the lossless quality PNG is known for. Ideal for icons, logos, and graphics.',
  webp:
    'WebP is already efficient, but further compression helps when you need the smallest possible files for web delivery — without changing format.',
};

export default async function CompressPage({ params }: Props) {
  const { format } = await params;
  const route = getCompressByFormat(format);
  if (!route) notFound();

  const isGeneric = format === 'image';
  const headline = isGeneric ? 'Compress Image Online' : `Compress ${route.label} Online`;
  const benefit = BENEFITS[format] ?? BENEFITS['image'];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          <svg className="w-4 h-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span>Reduce file size — keep quality</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
          {isGeneric ? (
            <>
              Compress{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Image
              </span>{' '}
              Online
            </>
          ) : (
            <>
              Compress{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {route.label}
              </span>{' '}
              Online
            </>
          )}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Free, instant, and private. Up to 60% smaller files — no upload required.
        </p>
      </div>

      {/* Privacy badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-[#10B981] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 self-center mb-6 w-fit mx-auto">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        100% Local Processing — Your files never leave your browser
      </div>

      <CompressorPreset />

      {/* SEO content */}
      <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
          How to compress {isGeneric ? 'images' : `${route.label} images`} online
        </h2>
        <ol className="space-y-2 text-slate-600 dark:text-slate-400 text-sm list-decimal list-inside">
          <li>Drop your {isGeneric ? 'images' : `${route.label} files`} in the box above (or click to select them)</li>
          <li>Click <strong>Compress All</strong> — compression happens instantly in your browser</li>
          <li>Download each file individually or all at once as a ZIP</li>
        </ol>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
          Why compress {isGeneric ? 'images' : `${route.label} files`}?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{benefit}</p>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
          Is it safe?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Completely. Pixvert processes everything locally in your browser using the Web Canvas API.
          Your images are never uploaded to any server — they never leave your device.
        </p>
      </div>
    </div>
  );
}
