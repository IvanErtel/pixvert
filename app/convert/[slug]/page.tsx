import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ConverterPreset from '@/components/ConverterPreset';
import ToolSEOContent, { type ToolFAQ, type ToolUseCase } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
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

const BENEFITS: Record<string, string> = {
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

interface FormatInfo {
  description: string;
  detail: string;
  lossy: boolean;
  transparency: boolean;
  useCase: string;
}

const FORMAT_INFO: Record<string, FormatInfo> = {
  png: {
    description: 'a lossless raster format that preserves every pixel exactly, including transparency',
    detail: 'PNG uses lossless compression, so zero image data is discarded, which makes it the standard choice for logos, icons, screenshots, and graphics with sharp edges or transparency. The tradeoff is larger file sizes for photographic content compared to lossy formats.',
    lossy: false,
    transparency: true,
    useCase: 'logos, icons, and graphics with transparency',
  },
  jpg: {
    description: 'a lossy format optimized for photographs',
    detail: 'JPG uses lossy compression tuned to how the human eye perceives detail, producing much smaller files than PNG for photographic content. It doesn\'t support transparency, and repeated re-saving can introduce visible compression artifacts over time.',
    lossy: true,
    transparency: false,
    useCase: 'photographs and web images where file size matters',
  },
  jpeg: {
    description: 'a lossy format optimized for photographs (identical to JPG)',
    detail: 'JPEG — the same format as JPG under a different file extension — uses lossy compression tuned to human perception, producing small files ideal for photographs at the cost of some fine detail and no transparency support.',
    lossy: true,
    transparency: false,
    useCase: 'photographs and web images where file size matters',
  },
  webp: {
    description: 'a modern format developed by Google that combines strong compression with wide browser support',
    detail: 'WebP supports both lossy and lossless compression plus transparency and animation in a single format, typically producing files 25-35% smaller than JPG or PNG at equivalent visual quality. It\'s supported by all major modern browsers.',
    lossy: true,
    transparency: true,
    useCase: 'fast-loading websites and modern web apps',
  },
  avif: {
    description: 'a next-generation format based on the AV1 video codec offering the best compression of any mainstream image format',
    detail: 'AVIF routinely produces files 50% smaller than JPG at the same visual quality, and supports transparency and a wide color range. Browser support is strong in all current major browsers, though very old software may not display it.',
    lossy: true,
    transparency: true,
    useCase: 'high-performance websites that need the smallest possible images',
  },
  gif: {
    description: 'an animation-capable format limited to a 256-color palette',
    detail: 'GIF is best known for short looping animations, but its 256-color limit makes it a poor choice for photographic stills — solid colors and simple graphics compress far better than gradients or photos.',
    lossy: true,
    transparency: true,
    useCase: 'simple animations and graphics with flat colors',
  },
  bmp: {
    description: 'an uncompressed raster format that stores every pixel with no compression at all',
    detail: 'BMP files are typically 10-20 times larger than an equivalent JPG or PNG because no compression algorithm is applied. It remains common in Windows-native applications and legacy software.',
    lossy: false,
    transparency: false,
    useCase: 'legacy Windows applications that require raw, uncompressed pixel data',
  },
  tiff: {
    description: 'a high-fidelity format widely used in professional photography and print production',
    detail: 'TIFF supports lossless storage, making it the standard for archival photography and print workflows, at the cost of very large file sizes unsuitable for everyday web use.',
    lossy: false,
    transparency: true,
    useCase: 'print production, archiving, and professional photo editing',
  },
  ico: {
    description: 'a container format for small multi-resolution icons used as favicons and desktop shortcuts',
    detail: 'ICO files bundle multiple resolutions (16×16, 32×32, and 48×48) of the same image into a single file, which is why browsers and operating systems use it specifically for favicons and application icons.',
    lossy: false,
    transparency: true,
    useCase: 'browser favicons and desktop application icons',
  },
  heic: {
    description: 'the default photo format used by iPhones since iOS 11, based on the HEIF container',
    detail: 'HEIC achieves excellent compression — roughly half the size of an equivalent JPG — but has limited compatibility outside Apple\'s ecosystem, which is why converting to a more universal format is often necessary.',
    lossy: true,
    transparency: false,
    useCase: 'storing photos on iPhone before sharing them more broadly',
  },
};

/** Extra FAQ genuinely specific to this format pair — avoids identical boilerplate across every page. */
function buildSpecialFaq(from: string, to: string): ToolFAQ | null {
  if (from === 'gif' && to !== 'gif') {
    return to === 'webp'
      ? { question: 'Will my GIF animation still play after converting to WebP?', answer: 'Yes — WebP supports animation, so all frames and timing from your GIF are preserved in the output file.' }
      : { question: `Will my GIF animation still play after converting to ${formatLabel(to)}?`, answer: `No — ${formatLabel(to)} is a static image format, so only the first frame of the GIF is kept in the output. If you need to keep the animation, convert to WebP instead.` };
  }
  if (to === 'gif' && from !== 'gif') {
    return { question: 'Will the resulting GIF be animated?', answer: `No, a single ${formatLabel(from)} image converts to a single static GIF frame. GIF only becomes animated when multiple frames are combined, which isn't part of a one-to-one format conversion.` };
  }
  if (from === 'heic') {
    return { question: "Does converting from HEIC keep my photo's original quality?", answer: `The conversion decodes the HEIC file at full resolution before re-encoding it as ${formatLabel(to)}, so no extra quality is lost beyond what the ${formatLabel(to)} format itself introduces.` };
  }
  if (to === 'ico') {
    return { question: 'What sizes are included in the ICO file?', answer: `The output ICO bundles three resolutions — 16×16, 32×32, and 48×48 — generated from your ${formatLabel(from)} source in a single file, ready to use as a favicon or app icon.` };
  }
  if (to === 'tiff') {
    return { question: 'Is this conversion suitable for professional print workflows?', answer: `Yes — the TIFF output is uncompressed and lossless, which makes it suitable for print and archiving, though the file will be considerably larger than your original ${formatLabel(from)}.` };
  }
  if (from === 'tiff') {
    return { question: 'Should I keep my original TIFF file after converting?', answer: `Yes. Converting TIFF to ${formatLabel(to)} is meant for web or everyday use — keep the original TIFF as your archival master copy for print or professional editing.` };
  }
  return null;
}

function buildFaqs(from: string, to: string, fromInfo: FormatInfo, toInfo: FormatInfo): ToolFAQ[] {
  const FROM = formatLabel(from);
  const TO = formatLabel(to);

  const qualityAnswer = toInfo.lossy
    ? `The converter uses a high-quality output setting by default, so any quality loss when converting ${FROM} to ${TO} is minimal and generally not visible to the eye.`
    : `Since ${TO} is a lossless format, no additional quality is lost when converting your ${FROM} file. If the original ${FROM} was already compressed with quality loss, that loss can\'t be recovered, but nothing further is discarded.`;

  const transparencyAnswer = toInfo.transparency
    ? `Yes, ${TO} supports transparency, so any transparent areas in your ${FROM} file are preserved in the converted image.`
    : `No, ${TO} does not support transparency. Any transparent areas in your ${FROM} file will be filled with a solid background (typically white) when converted to ${TO}.`;

  const faqs: ToolFAQ[] = [
    { question: `Will converting ${FROM} to ${TO} reduce image quality?`, answer: qualityAnswer },
    { question: `Does ${TO} support transparency?`, answer: transparencyAnswer },
    { question: `Is it safe to convert ${FROM} files to ${TO} here?`, answer: `Yes. The whole ${FROM} to ${TO} conversion runs locally in your browser using the Canvas API — your ${FROM} files are never uploaded to a server.` },
    { question: `Can I convert several ${FROM} files to ${TO} at once?`, answer: `Yes, drop multiple ${FROM} files at once and click Convert All — each one is converted to ${TO} and can be downloaded individually or as a ZIP.` },
  ];

  const special = buildSpecialFaq(from, to);
  if (special) faqs.push(special);

  faqs.push(
    { question: `Is there a size limit for ${FROM} uploads?`, answer: `There's no hard limit set by Pixvert for ${FROM} files, but very large files depend on your device's available memory to convert smoothly.` },
    { question: `Can I use the ${TO} output commercially after converting?`, answer: `Yes, converting ${FROM} to ${TO} only changes the file format — it doesn't alter your rights over the image or add a watermark.` },
  );

  return faqs;
}

function buildUseCases(from: string, to: string, fromInfo: FormatInfo, toInfo: FormatInfo): ToolUseCase[] {
  const FROM = formatLabel(from);
  const TO = formatLabel(to);
  return [
    { title: `Preparing ${FROM} files for ${toInfo.useCase}`, description: `Convert ${FROM} images to ${TO} when your project specifically calls for ${toInfo.useCase}.` },
    { title: 'Reducing file size', description: `If ${TO} compresses better than ${FROM} for your content, converting can significantly cut storage and bandwidth needs.` },
    { title: 'Improving compatibility', description: `Some platforms and software only accept certain formats — converting to ${TO} ensures your ${FROM} files open everywhere they need to.` },
    { title: 'Batch migrating a library', description: `Convert a whole folder of ${FROM} images to ${TO} at once instead of opening each file individually in an editor.` },
  ];
}

export default async function ConvertPage({ params }: Props) {
  const { slug } = await params;
  const conversion = getConversionBySlug(slug);
  if (!conversion) notFound();

  const from = formatLabel(conversion.from);
  const to = formatLabel(conversion.to);
  const related = getRelatedConversions(conversion);
  const fromInfo = FORMAT_INFO[conversion.from] ?? FORMAT_INFO['png'];
  const toInfo = FORMAT_INFO[conversion.to] ?? FORMAT_INFO['png'];
  const benefit = BENEFITS[`${conversion.from}-${conversion.to}`]
    ?? `Converting ${from} to ${to} is fast and free with Pixvert. All processing happens locally in your browser.`;
  const pageUrl = `https://pixvert-one.vercel.app/convert/${slug}`;

  const faqs = buildFaqs(conversion.from, conversion.to, fromInfo, toInfo);
  const useCases = buildUseCases(conversion.from, conversion.to, fromInfo, toInfo);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: `${from} to ${to}` },
        ]}
      />

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

      <ToolSEOContent
        toolName={`${from} to ${to} Converter`}
        whatIsHeading={`What does converting ${from} to ${to} mean?`}
        whatIsParagraphs={[
          `${from} is ${fromInfo.description}, while ${to} is ${toInfo.description}. ${benefit}`,
          fromInfo.detail,
          toInfo.detail,
        ]}
        howToHeading={`How to convert ${from} to ${to}`}
        howToSteps={[
          { title: `Upload your ${from} files`, description: 'drop them into the box above, or click to browse — batch uploads are supported' },
          { title: 'Click Convert All', description: `conversion to ${to} happens instantly in your browser, no server round-trip involved` },
          { title: 'Preview the result', description: 'check the converted file before downloading' },
          { title: 'Download', description: 'save a single file directly, or download the whole batch as a ZIP' },
        ]}
        useCasesHeading={`When to convert ${from} to ${to}`}
        useCases={useCases}
        whyHeading={`Why use Pixvert to convert ${from} to ${to}?`}
        whyReasons={[
          { title: '100% local processing', description: `the ${from} to ${to} conversion runs entirely in your browser — files are never uploaded anywhere` },
          { title: 'Batch support', description: `convert multiple ${from} files to ${to} in one pass and download them together as a ZIP` },
          { title: 'No signup required', description: 'use the tool immediately without an account or email' },
          { title: 'Free, with no hidden limits', description: `no watermarks, no forced quality caps on your ${to} output` },
        ]}
        faqs={faqs}
        relatedTools={[
          { href: '/compress/image', label: 'Image Compressor', description: `Compress your ${to} files after converting` },
          { href: '/tools/resize', label: 'Image Resizer', description: 'Resize images to exact pixel dimensions' },
          { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode an image as a data URI' },
          { href: '/tools/watermark', label: 'Watermark Tool', description: 'Add a text watermark to your images' },
        ]}
      />

      <SchemaMarkup
        name={`${from} to ${to} Converter`}
        url={pageUrl}
        description={`Convert ${from} to ${to} online for free. 100% local processing, no upload required.`}
        features={['Batch conversion', 'Local browser processing', 'No signup required', 'ZIP download']}
        howToName={`How to convert ${from} to ${to}`}
        howToSteps={[
          { title: `Upload your ${from} files`, description: 'Drop them into the box, or click to browse.' },
          { title: 'Click Convert All', description: `Conversion to ${to} runs instantly in your browser.` },
          { title: 'Preview the result', description: 'Check the converted file before downloading.' },
          { title: 'Download', description: 'Save a single file or the whole batch as a ZIP.' },
        ]}
        faqs={faqs}
      />

      {/* Internal linking */}
      {related.length > 0 && (
        <div className="mt-4 max-w-3xl mx-auto prose prose-slate dark:prose-invert">
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
        </div>
      )}
    </div>
  );
}
