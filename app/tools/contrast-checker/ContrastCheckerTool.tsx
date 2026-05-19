'use client';

import { useState } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const f = (v: number) => { const n = v / 255; return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const r1 = hexToRgb(hex1), r2 = hexToRgb(hex2);
  if (!r1 || !r2) return null;
  const l1 = relativeLuminance(...r1), l2 = relativeLuminance(...r2);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface WcagResult {
  ratio: number;
  aaSmall: boolean;
  aaLarge: boolean;
  aaaSmall: boolean;
  aaaLarge: boolean;
}

function evaluate(fg: string, bg: string): WcagResult | null {
  const ratio = contrastRatio(fg, bg);
  if (!ratio) return null;
  return {
    ratio,
    aaSmall: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaSmall: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

function Badge({ pass }: { pass: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
      pass ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
           : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    }`}>
      {pass ? '✓ Pass' : '✗ Fail'}
    </span>
  );
}

const SAMPLE_PAIRS = [
  { fg: '#FFFFFF', bg: '#6366F1', label: 'White on Indigo' },
  { fg: '#1E293B', bg: '#F1F5F9', label: 'Dark on Light' },
  { fg: '#6B7280', bg: '#FFFFFF', label: 'Gray on White' },
  { fg: '#FBBF24', bg: '#000000', label: 'Yellow on Black' },
];

export default function ContrastCheckerTool() {
  const [fg, setFg] = useState('#FFFFFF');
  const [bg, setBg] = useState('#6366F1');

  const result = evaluate(fg, bg);
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">WCAG Contrast Checker — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Check the contrast ratio between a text color and a background color. See instantly if
          it meets WCAG AA and AAA accessibility standards.
        </p>
      </div>

      {/* Preview */}
      {bgRgb && fgRgb && (
        <div
          className="rounded-2xl border border-slate-200 dark:border-slate-700 h-36 flex flex-col items-center justify-center gap-2 mb-6 transition-colors"
          style={{ backgroundColor: bg }}
        >
          <p className="text-3xl font-bold" style={{ color: fg }}>Aa</p>
          <p className="text-sm" style={{ color: fg }}>Sample text on this background</p>
        </div>
      )}

      {/* Color pickers */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Text color (foreground)', value: fg, onChange: setFg },
          { label: 'Background color', value: bg, onChange: setBg },
        ].map(({ label, value, onChange }) => (
          <div key={label}>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{label}</p>
            <div className="flex gap-2 items-center">
              <label className="cursor-pointer">
                <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="sr-only" />
                <div className="w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-600 shadow-sm shrink-0" style={{ backgroundColor: value }} />
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) onChange(e.target.value); }}
                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={7}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick swap */}
      <div className="text-center mb-6">
        <button
          onClick={() => { setFg(bg); setBg(fg); }}
          className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          ⇄ Swap colors
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
          {/* Ratio */}
          <div className="px-6 py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Contrast Ratio</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">{result.ratio.toFixed(2)}<span className="text-xl text-slate-400">:1</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Overall</p>
              <p className={`text-lg font-bold ${result.aaSmall ? 'text-emerald-600 dark:text-emerald-400' : result.aaLarge ? 'text-amber-600 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>
                {result.aaSmall ? 'Good' : result.aaLarge ? 'Large only' : 'Poor'}
              </p>
            </div>
          </div>

          {/* WCAG table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Level</th>
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Normal text</th>
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Large text (18pt+)</th>
                <th className="text-left px-6 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300">WCAG AA</td>
                <td className="px-6 py-3"><Badge pass={result.aaSmall} /></td>
                <td className="px-6 py-3"><Badge pass={result.aaLarge} /></td>
                <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">4.5:1 / 3:1</td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300">WCAG AAA</td>
                <td className="px-6 py-3"><Badge pass={result.aaaSmall} /></td>
                <td className="px-6 py-3"><Badge pass={result.aaaLarge} /></td>
                <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">7:1 / 4.5:1</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Sample pairs */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">Quick examples</p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PAIRS.map(({ fg: f, bg: b, label }) => (
            <button
              key={label}
              onClick={() => { setFg(f); setBg(b); }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
            >
              <span className="flex gap-1">
                <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: f }} />
                <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: b }} />
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">♿</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">WCAG 2.1 compliance</h2>
          <p className="text-slate-500 dark:text-slate-400">Tests against AA (4.5:1) and AAA (7:1) for normal text, and AA (3:1) for large text.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">👁️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live preview</h2>
          <p className="text-slate-500 dark:text-slate-400">See exactly how text looks on the background as you pick colors.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">Ratio and pass/fail update instantly. No button to press.</p>
        </div>
      </section>
    </div>
  );
}
