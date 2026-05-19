'use client';

import { useState } from 'react';

// ── Color math ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0; const l = (max + min) / 2;
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => Math.round((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255);
  return '#' + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function generatePalette(baseHex: string, scheme: string): { label: string; hex: string }[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const [h, s, l] = rgbToHsl(...rgb);

  const hsl = (dh: number, ds = s, dl = l) => ({ label: hslToHex((h + dh + 360) % 360, ds, dl), hex: hslToHex((h + dh + 360) % 360, ds, dl) });

  switch (scheme) {
    case 'complementary':
      return [
        { label: 'Base', hex: baseHex.toUpperCase() },
        { label: 'Light', hex: hslToHex(h, s, Math.min(95, l + 20)) },
        { label: 'Dark', hex: hslToHex(h, s, Math.max(5, l - 20)) },
        { label: 'Complement', hex: hslToHex((h + 180) % 360, s, l) },
        { label: 'Comp Light', hex: hslToHex((h + 180) % 360, s, Math.min(90, l + 15)) },
      ];
    case 'triadic':
      return [
        { label: 'Base', hex: baseHex.toUpperCase() },
        { label: 'Triadic 1', hex: hslToHex((h + 120) % 360, s, l) },
        { label: 'Triadic 2', hex: hslToHex((h + 240) % 360, s, l) },
        { label: 'Light Base', hex: hslToHex(h, s, Math.min(90, l + 20)) },
        { label: 'Dark Base', hex: hslToHex(h, s, Math.max(5, l - 20)) },
      ];
    case 'analogous':
      return [
        { label: '-60°', hex: hslToHex((h - 60 + 360) % 360, s, l) },
        { label: '-30°', hex: hslToHex((h - 30 + 360) % 360, s, l) },
        { label: 'Base', hex: baseHex.toUpperCase() },
        { label: '+30°', hex: hslToHex((h + 30) % 360, s, l) },
        { label: '+60°', hex: hslToHex((h + 60) % 360, s, l) },
      ];
    case 'split':
      return [
        { label: 'Base', hex: baseHex.toUpperCase() },
        { label: 'Split 1', hex: hslToHex((h + 150) % 360, s, l) },
        { label: 'Split 2', hex: hslToHex((h + 210) % 360, s, l) },
        { label: 'Accent 1', hex: hslToHex((h + 150) % 360, s, Math.min(90, l + 15)) },
        { label: 'Accent 2', hex: hslToHex((h + 210) % 360, s, Math.min(90, l + 15)) },
      ];
    case 'shades':
    default: {
      const steps = [95, 80, 65, 50, 35, 20, 10];
      return steps.map((lightness, i) => ({
        label: `${(i + 1) * 100}`,
        hex: hslToHex(h, s, lightness),
      }));
    }
  }
}

type Scheme = 'complementary' | 'triadic' | 'analogous' | 'split' | 'shades';
const SCHEMES: { value: Scheme; label: string; desc: string }[] = [
  { value: 'complementary', label: 'Complementary', desc: 'Opposite hues for high contrast' },
  { value: 'triadic', label: 'Triadic', desc: '3 evenly spaced hues' },
  { value: 'analogous', label: 'Analogous', desc: 'Adjacent hues, harmonious' },
  { value: 'split', label: 'Split-Comp.', desc: 'Base + two hues flanking complement' },
  { value: 'shades', label: 'Shades', desc: 'Tints and shades of base color' },
];

function isLight(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) > 128;
}

export default function ColorPaletteTool() {
  const [base, setBase] = useState('#6366F1');
  const [scheme, setScheme] = useState<Scheme>('complementary');
  const [copied, setCopied] = useState<string | null>(null);

  const palette = generatePalette(base, scheme);

  const copy = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = async () => {
    const text = palette.map((c) => c.hex).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied('all');
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Color Palette Generator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Pick a base color and generate a harmonious palette. Choose from complementary, triadic,
          analogous, split-complementary, or tonal shades.
        </p>
      </div>

      {/* Base color input */}
      <div className="flex gap-3 items-center mb-5">
        <label className="cursor-pointer">
          <input type="color" value={base} onChange={(e) => setBase(e.target.value)} className="sr-only" />
          <div className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 shadow-sm" style={{ backgroundColor: base }} />
        </label>
        <input
          type="text"
          value={base}
          onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBase(e.target.value); }}
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          maxLength={7}
          placeholder="#6366F1"
        />
      </div>

      {/* Scheme selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SCHEMES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setScheme(value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              scheme === value
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Palette display */}
      {palette.length > 0 && (
        <>
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4">
            <div className="flex h-32">
              {palette.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => copy(c.hex)}
                  title={`Copy ${c.hex}`}
                  className="flex-1 relative group transition-transform hover:scale-105 hover:z-10"
                  style={{ backgroundColor: c.hex }}
                >
                  <span
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded whitespace-nowrap"
                    style={{ color: isLight(c.hex) ? '#000' : '#fff', backgroundColor: isLight(c.hex) ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
                  >
                    {copied === c.hex ? '✓' : c.hex}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color list */}
          <div className="space-y-2 mb-4">
            {palette.map((c) => (
              <div key={c.hex} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 bg-white dark:bg-slate-900">
                <div className="w-8 h-8 rounded-lg shrink-0 border border-slate-200 dark:border-slate-700" style={{ backgroundColor: c.hex }} />
                <span className="text-xs text-slate-500 dark:text-slate-400 w-20">{c.label}</span>
                <span className="font-mono text-sm text-slate-800 dark:text-slate-200 flex-1">{c.hex}</span>
                <button
                  onClick={() => copy(c.hex)}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
                >
                  {copied === c.hex ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={copyAll}
            className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {copied === 'all' ? '✓ Copied all!' : 'Copy all HEX values'}
          </button>
        </>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🌈</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">5 harmony types</h2>
          <p className="text-slate-500 dark:text-slate-400">Complementary, triadic, analogous, split-complementary, and tonal shades.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Visual preview</h2>
          <p className="text-slate-500 dark:text-slate-400">See the palette as a color bar. Hover a swatch to copy its HEX directly.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Copy individually or all</h2>
          <p className="text-slate-500 dark:text-slate-400">Copy each HEX separately, or grab all at once as a newline-separated list.</p>
        </div>
      </section>
    </div>
  );
}
