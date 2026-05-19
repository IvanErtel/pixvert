'use client';

import { useState } from 'react';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hexToHsl(hex: string) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
}

function luminance(r: number, g: number, b: number): number {
  const f = (v: number) => { const n = v / 255; return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(hex: string): { white: string; black: string } {
  const rgb = hexToRgb(hex);
  if (!rgb) return { white: '-', black: '-' };
  const lum = luminance(rgb.r, rgb.g, rgb.b);
  const white = ((1.05) / (lum + 0.05)).toFixed(2);
  const black = ((lum + 0.05) / 0.05).toFixed(2);
  return { white, black };
}

const PRESETS = [
  '#6366F1','#8B5CF6','#EC4899','#EF4444','#F97316',
  '#EAB308','#22C55E','#14B8A6','#3B82F6','#0EA5E9',
  '#000000','#374151','#6B7280','#D1D5DB','#FFFFFF',
];

export default function ColorPickerTool() {
  const [color, setColor] = useState('#6366F1');
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  const contrast = contrastRatio(color);
  const textColor = hsl && hsl.l < 50 ? '#ffffff' : '#000000';

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formats = rgb && hsl ? [
    { key: 'hex', label: 'HEX', value: color.toUpperCase() },
    { key: 'rgb', label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { key: 'hsl', label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { key: 'rgba', label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { key: 'hsla', label: 'HSLA', value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` },
    { key: 'css', label: 'CSS var', value: `--color: ${color.toUpperCase()};` },
  ] : [];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Color Picker — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Pick any color and get its HEX, RGB, HSL, and CSS values instantly. Copy any format
          with one click.
        </p>
      </div>

      {/* Color preview + picker */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
        {/* Large preview */}
        <div
          className="h-40 flex items-center justify-center gap-4 transition-colors"
          style={{ backgroundColor: color }}
        >
          <span className="text-2xl font-bold font-mono" style={{ color: textColor }}>
            {color.toUpperCase()}
          </span>
          <label className="cursor-pointer">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="sr-only"
            />
            <span
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
              style={{ color: textColor, borderColor: textColor + '60', backgroundColor: textColor + '20' }}
            >
              Pick color
            </span>
          </label>
        </div>

        {/* Hex input */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-600 shrink-0" style={{ backgroundColor: color }} />
          <input
            type="text"
            value={color}
            onChange={(e) => {
              const v = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v.length === 7 ? v : color);
              if (v.length === 7 && /^#[0-9a-fA-F]{6}$/.test(v)) setColor(v);
            }}
            className="flex-1 font-mono text-sm text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none"
            maxLength={7}
          />
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setColor(p)}
            title={p}
            className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${color.toLowerCase() === p.toLowerCase() ? 'border-indigo-500 scale-110' : 'border-slate-200 dark:border-slate-700'}`}
            style={{ backgroundColor: p }}
          />
        ))}
      </div>

      {/* Format outputs */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {formats.map(({ key, label, value }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900"
          >
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">{label}</div>
              <div className="text-sm font-mono text-slate-800 dark:text-slate-200">{value}</div>
            </div>
            <button
              onClick={() => copy(value, key)}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors ml-3 shrink-0"
            >
              {copied === key ? '✓' : 'Copy'}
            </button>
          </div>
        ))}
      </div>

      {/* Contrast info */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">WCAG Contrast</p>
        <div className="flex gap-6 text-sm">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">vs White</div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">{contrast.white}:1</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${Number(contrast.white) >= 4.5 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {Number(contrast.white) >= 4.5 ? 'AA ✓' : Number(contrast.white) >= 3 ? 'AA Large' : 'Fail'}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">vs Black</div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">{contrast.black}:1</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${Number(contrast.black) >= 4.5 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {Number(contrast.black) >= 4.5 ? 'AA ✓' : Number(contrast.black) >= 3 ? 'AA Large' : 'Fail'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎯</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">6 formats</h2>
          <p className="text-slate-500 dark:text-slate-400">HEX, RGB, HSL, RGBA, HSLA, CSS variable — copy any with one click.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">♿</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">WCAG contrast</h2>
          <p className="text-slate-500 dark:text-slate-400">See the contrast ratio against white and black and whether it passes WCAG AA.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Quick presets</h2>
          <p className="text-slate-500 dark:text-slate-400">15 preset swatches for quick access. Type any HEX directly in the input field.</p>
        </div>
      </section>
    </div>
  );
}
