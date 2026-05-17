import type { Metadata } from 'next';
import Converter from '@/components/Converter';

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
};

export default function ResizePage() {
  return (
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
  );
}
