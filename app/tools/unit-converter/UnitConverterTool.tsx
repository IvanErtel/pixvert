'use client';

import { useState, useMemo } from 'react';

interface Unit { label: string; factor: number }
interface Category { name: string; icon: string; units: Unit[] }

const CATEGORIES: Category[] = [
  {
    name: 'Length',
    icon: '📏',
    units: [
      { label: 'Millimeters (mm)', factor: 0.001 },
      { label: 'Centimeters (cm)', factor: 0.01 },
      { label: 'Meters (m)', factor: 1 },
      { label: 'Kilometers (km)', factor: 1000 },
      { label: 'Inches (in)', factor: 0.0254 },
      { label: 'Feet (ft)', factor: 0.3048 },
      { label: 'Yards (yd)', factor: 0.9144 },
      { label: 'Miles (mi)', factor: 1609.344 },
    ],
  },
  {
    name: 'Weight',
    icon: '⚖️',
    units: [
      { label: 'Milligrams (mg)', factor: 0.000001 },
      { label: 'Grams (g)', factor: 0.001 },
      { label: 'Kilograms (kg)', factor: 1 },
      { label: 'Metric tons (t)', factor: 1000 },
      { label: 'Ounces (oz)', factor: 0.0283495 },
      { label: 'Pounds (lb)', factor: 0.453592 },
      { label: 'Stones (st)', factor: 6.35029 },
    ],
  },
  {
    name: 'Temperature',
    icon: '🌡️',
    units: [
      { label: 'Celsius (°C)', factor: 1 },
      { label: 'Fahrenheit (°F)', factor: 1 },
      { label: 'Kelvin (K)', factor: 1 },
    ],
  },
  {
    name: 'Volume',
    icon: '🧪',
    units: [
      { label: 'Milliliters (ml)', factor: 0.001 },
      { label: 'Liters (L)', factor: 1 },
      { label: 'Cubic meters (m³)', factor: 1000 },
      { label: 'US fluid ounces (fl oz)', factor: 0.0295735 },
      { label: 'US cups (cup)', factor: 0.236588 },
      { label: 'US pints (pt)', factor: 0.473176 },
      { label: 'US gallons (gal)', factor: 3.78541 },
    ],
  },
  {
    name: 'Speed',
    icon: '💨',
    units: [
      { label: 'm/s', factor: 1 },
      { label: 'km/h', factor: 1 / 3.6 },
      { label: 'mph', factor: 0.44704 },
      { label: 'knots', factor: 0.514444 },
      { label: 'ft/s', factor: 0.3048 },
    ],
  },
  {
    name: 'Area',
    icon: '🗺️',
    units: [
      { label: 'cm²', factor: 0.0001 },
      { label: 'm²', factor: 1 },
      { label: 'km²', factor: 1_000_000 },
      { label: 'Hectares (ha)', factor: 10_000 },
      { label: 'in²', factor: 0.00064516 },
      { label: 'ft²', factor: 0.092903 },
      { label: 'Acres (ac)', factor: 4046.86 },
    ],
  },
];

function convertTemp(value: number, from: string, to: string): number {
  let celsius: number;
  if (from.includes('°C')) celsius = value;
  else if (from.includes('°F')) celsius = (value - 32) * 5 / 9;
  else celsius = value - 273.15;
  if (to.includes('°C')) return celsius;
  if (to.includes('°F')) return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}

function fmt(n: number) {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 1e9 || abs < 1e-6) return n.toExponential(6);
  return parseFloat(n.toPrecision(8)).toString();
}

export default function UnitConverterTool() {
  const [catIdx, setCatIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(2);
  const [toIdx, setToIdx] = useState(3);
  const [value, setValue] = useState('1');

  const cat = CATEGORIES[catIdx];
  const isTemp = cat.name === 'Temperature';

  const safeFrom = Math.min(fromIdx, cat.units.length - 1);
  const safeTo = Math.min(toIdx, cat.units.length - 1);

  const converted = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return '';
    if (isTemp) return fmt(convertTemp(v, cat.units[safeFrom].label, cat.units[safeTo].label));
    const base = v * cat.units[safeFrom].factor;
    return fmt(base / cat.units[safeTo].factor);
  }, [value, catIdx, safeFrom, safeTo, isTemp, cat]);

  const switchCat = (idx: number) => { setCatIdx(idx); setFromIdx(0); setToIdx(1); setValue('1'); };
  const swap = () => { const tmp = safeFrom; setFromIdx(safeTo); setToIdx(tmp); };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Unit Converter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Convert length, weight, temperature, volume, speed, and area. Instant results.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c, i) => (
          <button key={c.name} onClick={() => switchCat(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              catIdx === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900 space-y-4">
        {/* From */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">From</label>
          <div className="flex gap-2">
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
              className="w-36 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select value={safeFrom} onChange={(e) => setFromIdx(parseInt(e.target.value))}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {cat.units.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="text-center">
          <button onClick={swap} className="text-slate-400 hover:text-indigo-600 transition-colors text-lg" title="Swap units">⇅</button>
        </div>

        {/* To */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">To</label>
          <div className="flex gap-2">
            <div className="w-36 rounded-lg border border-indigo-300 dark:border-indigo-600 px-3 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 truncate">
              {converted || '—'}
            </div>
            <select value={safeTo} onChange={(e) => setToIdx(parseInt(e.target.value))}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {cat.units.map((u, i) => <option key={u.label} value={i}>{u.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {converted && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
          {value} {cat.units[safeFrom].label} = <strong className="text-slate-800 dark:text-slate-200">{converted}</strong> {cat.units[safeTo].label}
        </p>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">6️⃣</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">6 categories</h2>
          <p className="text-slate-500 dark:text-slate-400">Length, weight, temperature, volume, speed, and area in one tool.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⇅</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">One-click swap</h2>
          <p className="text-slate-500 dark:text-slate-400">Swap From and To units instantly without re-entering values.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🌡️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Temperature</h2>
          <p className="text-slate-500 dark:text-slate-400">Converts Celsius, Fahrenheit, and Kelvin using the correct offset formula.</p>
        </div>
      </section>
    </div>
  );
}
