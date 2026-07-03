import type { Metadata } from 'next';
import Converter from '@/components/Converter';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Resize Image Online Free — Pixvert',
  description:
    'Resize images online for free. Set exact pixel dimensions, maintain aspect ratio, batch resize multiple files at once. 100% local — your files never leave your browser.',
  openGraph: {
    title: 'Resize Image Online Free — Pixvert',
    description:
      'Resize images to exact pixel dimensions. Batch process, maintain aspect ratio. Free and private — no upload required.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/resize',
  },
};

const seo: ToolSEOData = {
  toolName: 'Image Resizer',
  whatIsHeading: 'What is an image resizer?',
  whatIsParagraphs: [
    "An image resizer changes the pixel dimensions of a photo or graphic — making it wider, narrower, taller, or shorter — without cropping content out of the frame. Pixvert's image resizer lets you type an exact width and height in pixels, or lock the aspect ratio so one dimension scales automatically when you change the other.",
    'This tool is useful whenever an image needs to fit a specific size requirement: a product photo for an online store, a profile picture with fixed dimensions, or a banner that has to match a website layout exactly. Instead of guessing dimensions in a design program, you set the numbers directly and get a pixel-accurate result.',
    'The resizer works entirely with the Canvas API in your browser, which means it can scale one image or an entire batch at once. There is no server processing step, so resizing is nearly instant even for larger files, and the images never leave your device.',
  ],
  howToHeading: 'How to resize an image online',
  howToSteps: [
    { title: 'Upload your image or images', description: 'drag and drop files into the drop zone, or click to browse — batch resizing is supported' },
    { title: 'Enter the target width and height', description: 'type exact pixel values, or lock the aspect ratio so height adjusts automatically as you change width' },
    { title: 'Preview the result', description: 'check the resized dimensions before downloading' },
    { title: 'Download', description: 'save a single image directly, or download the whole batch as a ZIP file' },
  ],
  useCasesHeading: 'When to use an image resizer',
  useCases: [
    { title: 'E-commerce product photos', description: 'Marketplaces like Amazon, Etsy, or Shopify often require specific pixel dimensions for product images — resize a batch to match the requirement before uploading.' },
    { title: 'Social media and profile pictures', description: 'Avatars and cover photos on most platforms need exact square or rectangular dimensions to avoid awkward cropping.' },
    { title: 'Website performance', description: 'Serving an image at its display size instead of its original resolution reduces page weight and speeds up load times.' },
    { title: 'Email attachments', description: 'Shrink large photos to a reasonable size before attaching them to an email to avoid hitting attachment limits.' },
    { title: 'Print and design templates', description: 'Fit a photo into a template with predefined pixel dimensions, like a flyer, thumbnail, or banner ad.' },
  ],
  whyHeading: 'Why use Pixvert to resize images?',
  whyReasons: [
    { title: '100% local processing', description: 'resizing happens in your browser with the Canvas API — files are never uploaded to a server' },
    { title: 'Batch support', description: 'resize multiple images in one pass and download them together as a ZIP' },
    { title: 'No signup required', description: 'use the tool immediately, no account or email needed' },
    { title: 'Works with any common format', description: 'PNG, JPG, WebP, and more are all supported as input and output' },
  ],
  faqs: [
    { question: 'Does resizing reduce image quality?', answer: 'Making an image smaller rarely causes visible quality loss. Making it significantly larger than its original resolution can introduce blur, since the tool has to interpolate new pixels that were not in the source image.' },
    { question: 'Can I resize multiple images at once?', answer: 'Yes. Drop several files into the tool and set the target dimensions once — every image in the batch is resized the same way and can be downloaded together as a ZIP.' },
    { question: 'Will resizing change the aspect ratio and distort my image?', answer: 'Only if you set width and height independently without locking the ratio. Enable the aspect ratio lock to keep proportions correct and avoid stretching.' },
    { question: 'What is the maximum file size I can resize?', answer: 'There is no hard limit enforced by Pixvert, but very large files (above 20-30 MB) may be slow depending on your device, since processing happens locally in your browser.' },
    { question: 'Is my image uploaded anywhere?', answer: 'No. All resizing happens locally using the Canvas API. Your images are never sent to a server.' },
    { question: 'Can I use the resized images commercially?', answer: 'Yes, there are no restrictions on how you use the output. Pixvert only processes the pixels — it does not claim any rights over your images.' },
  ],
  relatedTools: [
    { href: '/compress/image', label: 'Image Compressor', description: 'Reduce file size after resizing your image' },
    { href: '/tools/rotate', label: 'Rotate Image', description: 'Rotate or flip images with the Canvas API' },
    { href: '/tools/watermark', label: 'Watermark Tool', description: 'Add a text watermark to your resized images' },
    { href: '/tools/crop', label: 'Crop Image', description: 'Cut out a specific area of your photo' },
    { href: '/convert/png-to-webp', label: 'PNG to WebP', description: 'Convert format after resizing for smaller files' },
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode your resized image as a data URI' },
  ],
};

export default function ResizePage() {
  return (
    <>
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Resize Images Online — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Set exact pixel dimensions, lock the aspect ratio, and batch resize multiple
          images at once. 100% local processing — your files never leave your device.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Batch resize', 'Lock aspect ratio', 'Any format', 'No upload'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Converter />

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📐</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Exact dimensions</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Enter width and height in pixels. The converter scales precisely to your target size.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Aspect ratio lock</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Enter one dimension and the other adjusts automatically to keep your image proportional.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Batch processing</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Drop multiple images at once and resize them all together. Download as a ZIP file.
          </p>
        </div>
      </section>
    </div>
    <ToolSEOContent {...seo} />
    <SchemaMarkup
      name={seo.toolName}
      url="https://pixvert-one.vercel.app/tools/resize"
      description={metadata.description as string}
      features={['Exact pixel resizing', 'Aspect ratio lock', 'Batch processing', 'Local browser processing', 'No signup required']}
      howToName={seo.howToHeading}
      howToSteps={seo.howToSteps}
      faqs={seo.faqs}
    />
    </>
  );
}
