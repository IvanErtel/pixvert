'use client';

import { useState, useRef, useEffect, useCallback, DragEvent } from 'react';

type Position =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

const POSITIONS: { value: Position; label: string }[] = [
  { value: 'top-left', label: '↖' },
  { value: 'top-center', label: '↑' },
  { value: 'top-right', label: '↗' },
  { value: 'middle-left', label: '←' },
  { value: 'center', label: '·' },
  { value: 'middle-right', label: '→' },
  { value: 'bottom-left', label: '↙' },
  { value: 'bottom-center', label: '↓' },
  { value: 'bottom-right', label: '↘' },
];

const FONTS = ['Arial', 'Georgia', 'Courier New', 'Impact', 'Verdana'];

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

const FORMAT_OPTIONS: { label: string; value: OutputFormat; ext: string }[] = [
  { label: 'PNG', value: 'image/png', ext: 'png' },
  { label: 'JPEG', value: 'image/jpeg', ext: 'jpg' },
  { label: 'WebP', value: 'image/webp', ext: 'webp' },
];

function getTextCoords(
  pos: Position,
  canvasW: number,
  canvasH: number,
  fontSize: number,
  padding: number,
): { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline } {
  const half = canvasW / 2;
  const map: Record<Position, { x: number; y: number; textAlign: CanvasTextAlign; textBaseline: CanvasTextBaseline }> = {
    'top-left':      { x: padding,           y: padding,           textAlign: 'left',   textBaseline: 'top' },
    'top-center':    { x: half,              y: padding,           textAlign: 'center', textBaseline: 'top' },
    'top-right':     { x: canvasW - padding, y: padding,           textAlign: 'right',  textBaseline: 'top' },
    'middle-left':   { x: padding,           y: canvasH / 2,       textAlign: 'left',   textBaseline: 'middle' },
    'center':        { x: half,              y: canvasH / 2,       textAlign: 'center', textBaseline: 'middle' },
    'middle-right':  { x: canvasW - padding, y: canvasH / 2,       textAlign: 'right',  textBaseline: 'middle' },
    'bottom-left':   { x: padding,           y: canvasH - padding, textAlign: 'left',   textBaseline: 'bottom' },
    'bottom-center': { x: half,              y: canvasH - padding, textAlign: 'center', textBaseline: 'bottom' },
    'bottom-right':  { x: canvasW - padding, y: canvasH - padding, textAlign: 'right',  textBaseline: 'bottom' },
  };
  return map[pos];
}

export default function WatermarkTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState('image');
  const [dragging, setDragging] = useState(false);

  const [text, setText] = useState('© Pixvert');
  const [fontSize, setFontSize] = useState(36);
  const [font, setFont] = useState('Arial');
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(80);
  const [position, setPosition] = useState<Position>('bottom-right');
  const [padding, setPadding] = useState(24);
  const [bold, setBold] = useState(false);

  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState(92);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderCanvas = useCallback(
    (src: string, wm: {
      text: string; fontSize: number; font: string; color: string;
      opacity: number; position: Position; padding: number; bold: boolean;
    }) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (wm.text.trim()) {
          const weight = wm.bold ? 'bold' : 'normal';
          ctx.font = `${weight} ${wm.fontSize}px ${wm.font}`;
          ctx.globalAlpha = wm.opacity / 100;
          ctx.shadowColor = 'rgba(0,0,0,0.6)';
          ctx.shadowBlur = 6;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;

          const coords = getTextCoords(wm.position, canvas.width, canvas.height, wm.fontSize, wm.padding);
          ctx.textAlign = coords.textAlign;
          ctx.textBaseline = coords.textBaseline;
          ctx.fillStyle = wm.color;
          ctx.fillText(wm.text, coords.x, coords.y);

          ctx.globalAlpha = 1;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }
      };
      img.src = src;
    },
    [],
  );

  useEffect(() => {
    if (imageSrc) renderCanvas(imageSrc, { text, fontSize, font, color, opacity, position, padding, bold });
  }, [imageSrc, text, fontSize, font, color, opacity, position, padding, bold, renderCanvas]);

  const loadFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name.replace(/\.[^.]+$/, ''));
    setImageSrc(URL.createObjectURL(file));
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
    link.download = `${fileName}-watermark.${ext}`;
    link.href = canvas.toDataURL(outputFormat, q);
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Add Watermark to Images — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Stamp custom text on any image. Choose position, font, size, color, and opacity.
          Download in PNG, JPEG, or WebP. 100% local — your files never leave your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Custom text', '9 positions', 'Font & color', 'No upload'].map((tag) => (
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
          <div className="text-5xl">💧</div>
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
              className="rounded-lg shadow"
            />
          </div>

          {/* Watermark text */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Watermark text</p>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="© Your Name"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Font</label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color" value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-9 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer"
                  />
                  <input
                    type="text" value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {[
              { label: 'Font size', min: 12, max: 120, value: fontSize, onChange: setFontSize, unit: 'px' },
              { label: 'Opacity', min: 10, max: 100, value: opacity, onChange: setOpacity, unit: '%' },
              { label: 'Padding', min: 0, max: 80, value: padding, onChange: setPadding, unit: 'px' },
            ].map(({ label, min, max, value, onChange, unit }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 w-20">{label}</span>
                <input
                  type="range" min={min} max={max} value={value}
                  onChange={(e) => onChange(Number(e.target.value))}
                  className="flex-1 accent-indigo-600"
                />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 w-14 text-right">{value}{unit}</span>
              </div>
            ))}

            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox" checked={bold}
                onChange={(e) => setBold(e.target.checked)}
                className="accent-indigo-600 w-4 h-4"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">Bold</span>
            </label>
          </div>

          {/* Position picker */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Position</p>
            <div className="grid grid-cols-3 gap-1.5 w-fit">
              {POSITIONS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPosition(p.value)}
                  title={p.value.replace(/-/g, ' ')}
                  className={`w-10 h-10 rounded-lg text-lg font-bold transition-colors ${
                    position === p.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                  }`}
                >
                  {p.label}
                </button>
              ))}
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
              onClick={() => setImageSrc(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Change image
            </button>
            <button
              onClick={download}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Download with watermark
            </button>
          </div>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">💧</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Protect your work</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Add your name, website, or copyright notice to prevent unauthorized use of your photos.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully customizable</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Font, size, color, opacity, position, padding. Shadow applied automatically for legibility on any background.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">No upload needed</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Everything happens in your browser with the Canvas API. Your images are never sent to a server.
          </p>
        </div>
      </section>
    </div>
  );
}
