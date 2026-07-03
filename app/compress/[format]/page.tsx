import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import CompressorPreset from '@/components/CompressorPreset';
import ToolSEOContent, { type ToolFAQ } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  SEO_COMPRESS,
  getCompressByFormat,
  getRelatedCompress,
  getConversionsFrom,
  formatLabel,
} from '@/lib/seo-conversions';

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
      'Compress any image online for free. Supports JPG, PNG, WebP, HEIC, AVIF, GIF. Reduce file sizes by up to 60% — 100% local processing, no upload required.',
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
  avif: {
    title: 'Compress AVIF Online Free — Pixvert',
    description:
      'Compress AVIF images online for free. Reduce file size while keeping the next-gen quality AVIF is known for. 100% private — no upload required.',
  },
  gif: {
    title: 'Compress GIF Online Free — Pixvert',
    description:
      'Compress GIF images online for free. Reduce file size without changing format. Fast, private, 100% browser-based — your files never leave your device.',
  },
  heic: {
    title: 'Compress HEIC Online Free — Pixvert',
    description:
      'Compress HEIC photos from your iPhone online for free. Reduce file size while keeping the output as JPEG. Fast, private, no upload required.',
  },
  bmp: {
    title: 'Compress BMP Online Free — Pixvert',
    description:
      'Compress oversized BMP files online for free. Reduce file size up to 90% with no visible quality loss. 100% local — no upload required.',
  },
  tiff: {
    title: 'Compress TIFF Online Free — Pixvert',
    description:
      'Compress TIFF images online for free. Reduce large TIFF file sizes for faster sharing while keeping high quality. 100% private processing.',
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
  avif:
    'AVIF achieves extraordinary compression ratios. Even a lightly compressed AVIF is significantly smaller than JPG or WebP at the same perceived quality — ideal for modern web delivery.',
  gif:
    'GIF files can be surprisingly large, especially for animations. Compressing a GIF reduces its color palette and optimizes frame data, keeping it playable while cutting file size.',
  heic:
    'HEIC photos from iPhones are already compressed, but converting to a smaller JPEG makes them universally compatible. This tool converts your HEIC photos to compressed JPEG automatically.',
  bmp:
    'BMP is an uncompressed format — files are often 10–20× larger than necessary. Compressing BMP exports a smaller file in the same visual quality, saving significant disk space and transfer time.',
  tiff:
    'TIFF files used in professional photography and print workflows are notoriously large. Compressing them for digital delivery significantly reduces size while retaining the detail that makes TIFF valuable.',
};

const FORMAT_FACT: Record<string, string> = {
  image:
    'Most image formats carry redundant data — extra color precision, uncompressed pixel blocks, or metadata you never look at. A good compressor identifies exactly how much of that can be discarded before the difference becomes visible.',
  jpg: 'JPG uses lossy compression based on how the human eye perceives color and detail, which is why a well-compressed JPG can be 50-70% smaller than the original with virtually no visible difference.',
  png: 'Because PNG is lossless, compressing it means optimizing the internal encoding — reducing the color palette when possible and eliminating inefficient pixel patterns — rather than discarding image data.',
  webp: 'WebP already outperforms JPG and PNG by 25-35% at similar quality, so compressing an existing WebP file further usually means fine-tuning the quality setting to squeeze out the last bit of unnecessary data.',
  avif: 'AVIF is built on the AV1 video codec and typically produces files 50% smaller than JPG at equivalent visual quality, making it one of the most efficient formats for web delivery today.',
  gif: 'GIF is limited to a 256-color palette, and much of its file size comes from frame-by-frame redundancy in animations — compressing a GIF means optimizing that palette and trimming repeated frame data.',
  heic: 'HEIC (used by default on iPhones since iOS 11) is already efficiently compressed, so this tool converts it to a right-sized JPEG that stays compatible with every device, browser, and app.',
  bmp: 'BMP stores pixels with no compression at all, so files are routinely 10-20 times larger than a JPG or PNG of the same image — compressing a BMP usually means converting it to a modern format that keeps the same visual result in a fraction of the size.',
  tiff: 'TIFF is the standard for print and professional photography because it preserves maximum detail, but that also makes files very large — compression is essential before sharing or publishing TIFF images online.',
};

const FORMAT_FAQS: Record<string, ToolFAQ[]> = {
  image: [
    { question: 'Which image formats can I compress here?', answer: 'JPG, PNG, WebP, AVIF, GIF, HEIC, BMP, and TIFF are all supported. The tool detects the format automatically and applies the right compression strategy.' },
    { question: 'Will compression change the format of my file?', answer: 'No, by default the output keeps the same format as the input. If you want to change format as well as compress, use the Image Converter instead.' },
  ],
  jpg: [
    { question: 'How much smaller will my JPG be?', answer: 'Typically 50-70% smaller, depending on the original quality setting and image content. Photos with lots of detail compress less than simple graphics.' },
    { question: 'Will I see quality loss?', answer: 'At the default quality level, compression is designed to be visually lossless — you would need to zoom in significantly to spot any difference.' },
  ],
  png: [
    { question: 'Can PNG be compressed without losing quality?', answer: 'Yes. PNG compression here is lossless — it re-encodes the file more efficiently without discarding any pixel data, so the image looks identical.' },
    { question: 'Why is my PNG still large after compressing?', answer: 'PNG is best for graphics with flat colors and transparency. Photographic PNGs are inherently large — consider converting to JPG or WebP for further savings.' },
  ],
  webp: [
    { question: 'Is it worth compressing a WebP file further?', answer: 'If it was exported at high quality, yes — re-encoding at a slightly lower quality setting can still shave off 10-20% with minimal visible impact.' },
    { question: 'Does WebP support transparency after compression?', answer: 'Yes, WebP supports an alpha channel just like PNG, and compression preserves transparency.' },
  ],
  avif: [
    { question: 'Is AVIF supported by all browsers?', answer: 'AVIF is supported by all major modern browsers (Chrome, Firefox, Edge, Safari 16+). For older browser support, keep a WebP or JPG fallback.' },
    { question: 'Why compress an already-efficient AVIF file?', answer: 'Camera exports and design tools often use conservative AVIF quality settings — recompressing can still reduce size further for web delivery.' },
  ],
  gif: [
    { question: 'Will compressing a GIF break the animation?', answer: 'No, all frames and timing are preserved. Compression reduces the color palette and optimizes frame data, not the animation itself.' },
    { question: 'Should I convert my GIF to another format instead?', answer: 'If the GIF is not animated, converting to PNG or WebP will usually produce a much smaller file than compressing it as a GIF.' },
  ],
  heic: [
    { question: 'Why convert HEIC instead of just compressing it?', answer: 'HEIC has poor compatibility outside Apple devices. Converting to JPEG guarantees the photo opens correctly everywhere while still reducing file size.' },
    { question: 'Do I lose photo quality converting HEIC to JPEG?', answer: 'The conversion uses a high JPEG quality setting, so the difference is negligible for everyday viewing and sharing.' },
  ],
  bmp: [
    { question: 'Why are BMP files so much larger than JPG?', answer: 'BMP stores every pixel with no compression algorithm at all, while JPG and PNG both use techniques to discard or re-encode redundant data.' },
    { question: 'Will compressing a BMP change its format?', answer: 'The tool keeps the BMP format by default. For maximum size reduction, consider converting to JPG or WebP instead.' },
  ],
  tiff: [
    { question: 'Is compressed TIFF still suitable for print?', answer: 'For professional print workflows requiring maximum fidelity, keep an uncompressed archival copy. The compressed version is better suited for digital sharing and web use.' },
    { question: 'Does compression remove TIFF layers or metadata?', answer: 'This tool works on flattened image data. EXIF and other metadata may be simplified during compression.' },
  ],
};

export default async function CompressPage({ params }: Props) {
  const { format } = await params;
  const route = getCompressByFormat(format);
  if (!route) notFound();

  const isGeneric = format === 'image';
  const headline = isGeneric ? 'Compress Image Online' : `Compress ${route.label} Online`;
  const benefit = BENEFITS[format] ?? BENEFITS['image'];
  const fact = FORMAT_FACT[format] ?? FORMAT_FACT['image'];
  const relatedCompress = getRelatedCompress(format);
  const relatedConversions = isGeneric ? [] : getConversionsFrom(format);
  const label = isGeneric ? 'image' : route!.label;
  const pageUrl = `https://pixvert-one.vercel.app/compress/${format}`;

  const faqs: ToolFAQ[] = [
    ...(FORMAT_FAQS[format] ?? FORMAT_FAQS['image']),
    { question: 'Is it safe to compress my images here?', answer: 'Yes. Everything happens locally in your browser using the Canvas API — your files are never uploaded to a server.' },
    { question: 'Is there a file size limit?', answer: 'There is no hard limit set by Pixvert, but very large files depend on your device’s available memory to process smoothly.' },
    { question: 'Can I compress multiple files at once?', answer: 'Yes, drop several files at once and click Compress All — every file is processed and can be downloaded individually or as a ZIP.' },
    { question: 'Can I use the compressed images commercially?', answer: 'Yes, Pixvert only reduces file size — it does not alter your rights over the image or add any watermark.' },
  ];

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

      <ToolSEOContent
        toolName={`${route.label} Compressor`}
        whatIsHeading={`What is ${isGeneric ? 'image' : label} compression?`}
        whatIsParagraphs={[
          `${isGeneric ? 'Image' : label} compression reduces the file size of a ${isGeneric ? 'picture' : `${label} file`} while keeping it as visually close to the original as possible. Instead of uploading files to a remote server and waiting for processing, Pixvert's ${label} compressor runs the entire operation locally in your browser using the Canvas API, so ${isGeneric ? 'images' : `${label} files`} never leave your device.`,
          fact,
          `${benefit} Whether you're preparing files for a website, an email, or cloud storage, compressing ${isGeneric ? 'images' : `${label} images`} first means faster uploads, less bandwidth used, and quicker load times for anyone who opens them.`,
        ]}
        howToHeading={`How to compress ${isGeneric ? 'images' : `${label} images`} online`}
        howToSteps={[
          { title: 'Upload your files', description: `drop your ${isGeneric ? 'images' : `${label} files`} into the box above, or click to browse — batch uploads are supported` },
          { title: 'Click Compress All', description: 'compression runs instantly in your browser, no server round-trip involved' },
          { title: 'Compare the result', description: 'check the new file size next to the original before downloading' },
          { title: 'Download', description: 'save files individually or grab the whole batch at once as a ZIP' },
        ]}
        useCasesHeading={`When to compress ${isGeneric ? 'images' : `${label} files`}`}
        useCases={[
          { title: 'Faster websites', description: `Smaller ${isGeneric ? 'image' : label} files mean quicker page loads, which improves both user experience and search ranking.` },
          { title: 'Email attachments', description: 'Fit photos under attachment size limits without switching to a file-sharing link.' },
          { title: 'Storage savings', description: `Free up space on your device or cloud drive by shrinking ${isGeneric ? 'image' : label} files you no longer need at full resolution.` },
          { title: 'Faster sharing', description: 'Send files over messaging apps or upload them to forms and marketplaces that enforce size limits.' },
        ]}
        whyHeading={`Why use Pixvert to compress ${isGeneric ? 'images' : label}?`}
        whyReasons={[
          { title: '100% local processing', description: 'compression happens entirely in your browser — files are never uploaded anywhere' },
          { title: 'Batch support', description: 'compress multiple files in one pass and download them together as a ZIP' },
          { title: 'No signup required', description: 'use the tool immediately without an account or email' },
          { title: 'Free, with no hidden limits', description: 'no watermarks, no forced quality caps' },
        ]}
        faqs={faqs}
        relatedTools={[
          { href: '/tools/resize', label: 'Image Resizer', description: 'Resize images to exact pixel dimensions before compressing' },
          { href: '/tools/watermark', label: 'Watermark Tool', description: 'Add a text watermark to your images' },
          { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode a compressed image as a data URI' },
          ...(isGeneric ? [] : [{ href: '/compress/image', label: 'Compress Image', description: 'Compress any image format in one place' }]),
        ]}
      />

      <SchemaMarkup
        name={`${route.label} Compressor`}
        url={pageUrl}
        description={`Compress ${isGeneric ? 'images' : `${label} files`} online for free. 100% local processing, no upload required.`}
        features={['Batch compression', 'Local browser processing', 'No signup required', 'ZIP download']}
        howToName={`How to compress ${isGeneric ? 'images' : `${label} images`} online`}
        howToSteps={[
          { title: 'Upload your files', description: `Drop your ${isGeneric ? 'images' : `${label} files`} into the box, or click to browse.` },
          { title: 'Click Compress All', description: 'Compression runs instantly in your browser.' },
          { title: 'Compare the result', description: 'Check the new file size next to the original.' },
          { title: 'Download', description: 'Save files individually or as a ZIP.' },
        ]}
        faqs={faqs}
      />

      {/* Internal linking */}
      <div className="mt-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        {relatedConversions.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
              Convert {route.label} instead
            </h2>
            <div className="flex flex-wrap gap-2 not-prose">
              {relatedConversions.map((c) => (
                <Link
                  key={c.slug}
                  href={`/convert/${c.slug}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {formatLabel(c.from)} to {formatLabel(c.to)}
                </Link>
              ))}
            </div>
          </>
        )}

        {relatedCompress.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-8">
              Compress other formats
            </h2>
            <div className="flex flex-wrap gap-2 not-prose">
              {relatedCompress.map((c) => (
                <Link
                  key={c.format}
                  href={`/compress/${c.format}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
