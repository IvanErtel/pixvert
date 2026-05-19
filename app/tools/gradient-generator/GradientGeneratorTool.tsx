'use client';

import { useState } from 'react';

type GradientType = 'linear' | 'radial' | 'conic';

interface Stop { id: number; color: string; position: number }

let nextId = 3;

function buildCss(type: GradientType, angle: number, stops: Stop[]): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
  if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`;
  return `conic-gradient(from ${angle}deg, ${stopsStr})`;
}

const PRESETS: { label: string; stops: Omit<Stop, 'id'>[]; angle: number; type: GradientType }[] = [
  { label: 'Indigo → Purple', stops: [{ color: '#6366F1', position: 0 }, { color: '#8B5CF6', position: 100 }], angle: 135, type: 'linear' },
  { label: 'Sunset', stops: [{ color: '#F97316', position: 0 }, { color: '#EC4899', position: 50 }, { color: '#8B5CF6', position: 100 }], angle: 135, type: 'linear' },
  { label: 'Ocean', stops: [{ color: '#0EA5E9', position: 0 }, { color: '#14B8A6', position: 100 }], angle: 135, type: 'linear' },
  { label: 'Forest', stops: [{ color: '#22C55E', position: 0 }, { color: '#0EA5E9', position: 100 }], angle: 135, type: 'linear' },
  { label: 'Radial Glow', stops: [{ color: '#6366F1', position: 0 }, { color: '#0F172A', position: 100 }], angle: 0, type: 'radial' },
];

export default function GradientGeneratorTool() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { id: 1, color: '#6366F1', position: 0 },
    { id: 2, color: '#8B5CF6', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = buildCss(type, angle, stops);
  const fullCss = `background: ${css};`;

  const copy = async () => {
    await navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStop = (id: number, field: 'color' | 'position', value: string | number) => {
    setStops((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const addStop = () => {
    const pos = Math.round(stops.reduce((sum, s) => sum + s.position, 0) / stops.length);
    setStops((prev) => [...prev, { id: nextId++, color: '#EC4899', position: pos }]);
  };

  const removeStop = (id: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops.map((s, i) => ({ ...s, id: i + 1 })));
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">CSS Gradient Generator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Create linear, radial, and conic gradients visually. Add color stops, adjust the angle,
          and copy the ready-to-use CSS code.
        </p>
      </div>

      {/* Preview */}
      <div
        className="h-48 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6 transition-all"
        style={{ background: css }}
      />

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Type + angle */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Type</p>
              <div className="flex gap-1">
                {(['linear', 'radial', 'conic'] as GradientType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                      type === t
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {type !== 'radial' && (
              <div className="flex-1 min-w-40">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                  Angle: {angle}°
                </p>
                <input
                  type="range" min={0} max={360} value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Color stops */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Color stops</p>
            <button
              onClick={addStop}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
            >
              + Add stop
            </button>
          </div>
          {stops.map((stop) => (
            <div key={stop.id} className="flex items-center gap-3">
              <input
                type="color" value={stop.color}
                onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
              />
              <input
                type="text" value={stop.color}
                onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                className="w-24 rounded-lg border border-slate-300 dark:border-slate-600 px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="range" min={0} max={100} value={stop.position}
                onChange={(e) => updateStop(stop.id, 'position', Number(e.target.value))}
                className="flex-1 accent-indigo-600"
              />
              <span className="text-xs font-mono text-slate-500 w-8 text-right">{stop.position}%</span>
              <button
                onClick={() => removeStop(stop.id)}
                disabled={stops.length <= 2}
                className="text-slate-400 hover:text-red-500 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* CSS output */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">CSS</span>
            <button
              onClick={copy}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <div className="px-4 py-3 font-mono text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 break-all">
            {fullCss}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">◐</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">3 gradient types</h2>
          <p className="text-slate-500 dark:text-slate-400">Linear, radial, and conic gradients. Unlimited color stops.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">👁️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live preview</h2>
          <p className="text-slate-500 dark:text-slate-400">The gradient preview updates instantly as you adjust colors, positions, or angle.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Ready CSS</h2>
          <p className="text-slate-500 dark:text-slate-400">The generated CSS is ready to paste directly into your stylesheet. One click to copy.</p>
        </div>
      </section>
    </div>
  );
}
