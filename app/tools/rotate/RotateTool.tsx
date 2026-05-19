'use client';

import { useState, useRef, useEffect, useCallback, DragEvent } from 'react';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

const FORMAT_OPTIONS: { label: string; value: OutputFormat; ext: string }[] = [
  { label: 'PNG', value: 'image/png', ext: 'png' },
  { label: 'JPEG', value: 'image/jpeg', ext: 'jpg' },
  { label: 'WebP', value: 'image/webp', ext: 'webp' },
];

export default function RotateTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState('image');
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState(92);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderCanvas = useCallback(
    (src: string, rot: number, fh: boolean, fv: boolean) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const isSwapped = rot % 180 !== 0;
        canvas.width = isSwapped ? img.height : img.width;
        canvas.height = isSwapped ? img.width : img.height;
        setDimensions({ w: canvas.width, h: canvas.height });
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rot * Math.PI) / 180);
        ctx.scale(fh ? -1 : 1, fv ? -1 : 1);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
      };
      img.src = src;
    },
    [],
  );

  useEffect(() => {
    if (imageSrc) renderCanvas(imageSrc, rotation, flipH, flipV);
  }, [imageSrc, rotation, flipH, flipV, renderCanvas]);

  const loadFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name.replace(/\.[^.]+$/, ''));
    setImageSrc(url);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ext = FORMAT_OPTIONS.find((f) => f.value === outputFormat)?.ext ?? 'png';
    const q = outputFormat === 'image/png' ? undefined : quality / 100;
    const link = document.createElement('a');
    link.download = `${fileName}-rotated.${ext}`;
    link.href = canvas.toDataURL(outputFormat, q);
    link.click();
  };

  const rotateLabel =
    rotation === 0 ? 'Original' :
    rotation === 90 ? '90° clockwise' :
    rotation === 180 ? '180°' : '90° counter-clockwise';

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Rotate & Flip Images — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Rotate by 90°, 180°, or 270°. Flip horizontally or vertically. Download in PNG,
          JPEG, or WebP. 100% local — your files never leave your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Rotate 90°/180°/270°', 'Flip H & V', 'PNG / JPEG / WebP', 'No upload'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {!imageSrc ? (
        <div
          className={`rounded-2xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center py-20 gap-4 ${
            dragging
              ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-slate-50 dark:bg-slate-900/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); }}
          />
          <div className="text-5xl">🔃</div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Drop your image here</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              or click to browse — PNG, JPG, WebP, GIF, AVIF…
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Canvas preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 min-h-48 overflow-hidden">
            <canvas
              ref={canvasRef}
              style={{ maxWidth: '100%', maxHeight: '360px', width: 'auto', height: 'auto', display: 'block', margin: '0 auto' }}
              className="rounded-lg shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>{rotateLabel}{flipH ? ' · Flipped H' : ''}{flipV ? ' · Flipped V' : ''}</span>
            {dimensions.w > 0 && <span>{dimensions.w} × {dimensions.h} px</span>}
          </div>

          {/* Transform controls */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Transform</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '↺ Rotate Left', action: () => setRotation((r) => (r - 90 + 360) % 360) },
                { label: '↻ Rotate Right', action: () => setRotation((r) => (r + 90) % 360) },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => setFlipH((f) => !f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  flipH
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }`}
              >
                ↔ Flip Horizontal
              </button>
              <button
                onClick={() => setFlipV((f) => !f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  flipV
                    ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                }`}
              >
                ↕ Flip Vertical
              </button>
            </div>
          </div>

          {/* Output format */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Output format</p>
            <div className="flex flex-wrap gap-2">
              {FORMAT_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setOutputFormat(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    outputFormat === f.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {outputFormat !== 'image/png' && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 w-16">Quality</span>
                <input
                  type="range" min={60} max={100} value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="flex-1 accent-indigo-600"
                />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-8 text-right">{quality}%</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { setImageSrc(null); setDimensions({ w: 0, h: 0 }); }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Change image
            </button>
            <button
              onClick={download}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Download
            </button>
          </div>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔃</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Any orientation</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Rotate 90°, 180°, or 270°. Combine with horizontal or vertical flip for any result.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live preview</h2>
          <p className="text-slate-500 dark:text-slate-400">
            See every change instantly. Export as PNG (lossless) or JPEG/WebP to keep the file small.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Everything runs in your browser via the Canvas API. No file ever reaches a server.
          </p>
        </div>
      </section>
    </div>
  );
}
