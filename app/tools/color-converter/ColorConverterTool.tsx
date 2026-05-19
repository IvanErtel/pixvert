'use client';

import { useState } from 'react';

// ── Conversion helpers ────────────────────────────────────────────────────────

function clamp(n: number, lo = 0, hi = 255) { return Math.min(hi, Math.max(lo, n)); }

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, '0')).join('').toUpperCase();
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

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function parseRgb(s: string): [number, number, number] | null {
  const m = s.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function parseHsl(s: string): [number, number, number] | null {
  const m = s.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

type InputMode = 'hex' | 'rgb' | 'hsl';

export default function ColorConverterTool() {
  const [mode, setMode] = useState<InputMode>('hex');
  const [input, setInput] = useState('#6366F1');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const resolve = (): [number, number, number] | null => {
    try {
      if (mode === 'hex') return hexToRgb(input);
      if (mode === 'rgb') return parseRgb(input);
      if (mode === 'hsl') { const h = parseHsl(input); return h ? hslToRgb(...h) : null; }
    } catch { return null; }
    return null;
  };

  const rgb = resolve();
  const hex = rgb ? rgbToHex(...rgb) : null;
  const hsl = rgb ? rgbToHsl(...rgb) : null;

  const results = hex && rgb && hsl
    ? [
        { key: 'hex', label: 'HEX', value: hex },
        { key: 'rgb', label: 'RGB', value: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` },
        { key: 'hsl', label: 'HSL', value: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` },
        { key: 'rgba', label: 'RGBA', value: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)` },
        { key: 'hsla', label: 'HSLA', value: `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, 1)` },
      ]
    : [];

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const PLACEHOLDERS: Record<InputMode, string> = {
    hex: '#6366F1 or 6366F1',
    rgb: '99, 102, 241',
    hsl: '239, 84%, 67%',
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Color Converter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste a color in any format — HEX, RGB, or HSL — and instantly get all the others.
          Updates in real time.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-5 w-fit mx-auto">
        {(['hex', 'rgb', 'hsl'] as InputMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(''); setError(''); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium uppercase transition-colors ${
              mode === m
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        {hex && (
          <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0" style={{ backgroundColor: hex }} />
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); }}
          placeholder={PLACEHOLDERS[mode]}
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {/* Results */}
      {results.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {results.map(({ key, label, value }) => (
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
      )}

      {input && !rgb && (
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
          Enter a valid {mode.toUpperCase()} color to see conversions.
        </p>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔄</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Any format in</h2>
          <p className="text-slate-500 dark:text-slate-400">Start from HEX (#6366F1), RGB (99, 102, 241), or HSL (239, 84%, 67%).</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">5 formats out</h2>
          <p className="text-slate-500 dark:text-slate-400">Get HEX, RGB, HSL, RGBA, and HSLA — copy each with one click.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">All formats update as you type. No button to press, no page reload.</p>
        </div>
      </section>
    </div>
  );
}
