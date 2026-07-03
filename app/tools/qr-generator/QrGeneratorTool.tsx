'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

interface QrContent {
  heroTitle: string;
  heroSubtitle: string;
  contentLabel: string;
  contentPlaceholder: string;
  sizeLabel: string;
  errorCorrectionLabel: string;
  qrColorLabel: string;
  backgroundLabel: string;
  downloadButton: string;
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, QrContent>> = {
  en: {
    heroTitle: 'QR Code Generator — Free',
    heroSubtitle: 'Generate QR codes for any URL, text, email, or phone number. Download as PNG instantly.',
    contentLabel: 'Content',
    contentPlaceholder: 'Enter URL, text, email, phone…',
    sizeLabel: 'Size',
    errorCorrectionLabel: 'Error Correction',
    qrColorLabel: 'QR Color',
    backgroundLabel: 'Background',
    downloadButton: 'Download PNG',
    features: [
      { icon: '⚡', title: 'Instant preview', description: 'QR code updates in real time as you type or change options.' },
      { icon: '🎨', title: 'Custom colors', description: 'Choose any foreground and background color for your brand.' },
      { icon: '🔒', title: 'Fully private', description: 'Everything runs in your browser. Nothing is sent to any server.' },
    ],
  },
  es: {
    heroTitle: 'Generador de Códigos QR — Gratis',
    heroSubtitle: 'Genera códigos QR para cualquier URL, texto, email o número de teléfono. Descarga como PNG al instante.',
    contentLabel: 'Contenido',
    contentPlaceholder: 'Introduce URL, texto, email, teléfono…',
    sizeLabel: 'Tamaño',
    errorCorrectionLabel: 'Corrección de Errores',
    qrColorLabel: 'Color del QR',
    backgroundLabel: 'Fondo',
    downloadButton: 'Descargar PNG',
    features: [
      { icon: '⚡', title: 'Vista previa instantánea', description: 'El código QR se actualiza en tiempo real mientras escribes o cambias opciones.' },
      { icon: '🎨', title: 'Colores personalizados', description: 'Elige cualquier color de primer plano y de fondo para tu marca.' },
      { icon: '🔒', title: 'Totalmente privado', description: 'Todo ocurre en tu navegador. Nada se envía a ningún servidor.' },
    ],
  },
};

export default function QrGeneratorTool() {
  const c = useLocalizedContent(content);
  const [text, setText] = useState('https://pixvert-one.vercel.app');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text.trim()) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      errorCorrectionLevel: errorLevel,
      color: { dark: fgColor, light: bgColor },
      margin: 2,
    }).catch(() => {});
  }, [text, size, errorLevel, fgColor, bgColor]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          {c.heroTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {c.contentLabel}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={c.contentPlaceholder}
              className="w-full h-28 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {c.sizeLabel}
              </label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[128, 192, 256, 384, 512].map((s) => (
                  <option key={s} value={s}>{s} px</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {c.errorCorrectionLabel}
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="L">L — 7%</option>
                <option value="M">M — 15%</option>
                <option value="Q">Q — 25%</option>
                <option value="H">H — 30%</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {c.qrColorLabel}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-mono">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {c.backgroundLabel}
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 font-mono">{bgColor}</span>
              </div>
            </div>
          </div>

          <button
            onClick={download}
            disabled={!text.trim()}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {c.downloadButton}
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white">
            <canvas ref={canvasRef} className="max-w-full" />
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        {c.features.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{f.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
