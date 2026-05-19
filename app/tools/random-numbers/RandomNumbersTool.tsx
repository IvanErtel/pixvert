'use client';

import { useState } from 'react';

function secureRandInt(min: number, max: number): number {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

function secureRandFloat(min: number, max: number, decimals: number): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const raw = min + (arr[0] / 0xffffffff) * (max - min);
  return parseFloat(raw.toFixed(decimals));
}

export default function RandomNumbersTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [unique, setUnique] = useState(false);
  const [floats, setFloats] = useState(false);
  const [decimals, setDecimals] = useState(2);
  const [sorted, setSorted] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function generate() {
    setError('');
    if (min >= max) { setError('Min must be less than max.'); return; }
    if (unique && !floats && max - min + 1 < count) {
      setError(`Can't generate ${count} unique integers in range [${min}, ${max}].`);
      return;
    }

    let nums: number[] = [];
    if (floats) {
      nums = Array.from({ length: count }, () => secureRandFloat(min, max, decimals));
    } else if (unique) {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = secureRandInt(0, i);
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, count);
    } else {
      nums = Array.from({ length: count }, () => secureRandInt(min, max));
    }

    if (sorted) nums.sort((a, b) => a - b);
    setResults(nums);
    setCopied(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(results.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Random Number Generator — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Generate random integers or floats in any range. Unique, sorted, bulk — fully customizable.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Min</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Max</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Count</label>
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(Math.min(1000, Math.max(1, Number(e.target.value))))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {floats && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Decimal places</label>
              <input
                type="number"
                min={1}
                max={10}
                value={decimals}
                onChange={(e) => setDecimals(Math.min(10, Math.max(1, Number(e.target.value))))}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Floats', value: floats, set: setFloats },
            { label: 'Unique', value: unique, set: setUnique, disabled: floats },
            { label: 'Sorted', value: sorted, set: setSorted },
          ].map(({ label, value, set, disabled }) => (
            <label key={label} className={`flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 dark:text-slate-300 ${disabled ? 'opacity-40' : ''}`}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => !disabled && set(e.target.checked)}
                disabled={disabled}
                className="accent-indigo-600 w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={generate}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
        >
          Generate
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">{results.length} numbers</span>
            <button
              onClick={copy}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy all'}
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 max-h-64 overflow-y-auto">
            <p className="font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap select-all">
              {results.join('\n')}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Min: <strong>{Math.min(...results)}</strong></span>
            <span>Max: <strong>{Math.max(...results)}</strong></span>
            <span>Sum: <strong>{results.reduce((a, b) => a + b, 0).toLocaleString()}</strong></span>
            <span>Avg: <strong>{(results.reduce((a, b) => a + b, 0) / results.length).toFixed(floats ? decimals : 2)}</strong></span>
          </div>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎲</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">True random</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses the Web Crypto API for cryptographically secure randomness.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📦</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Bulk & unique</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate up to 1,000 numbers at once, with or without repeats.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything runs locally in your browser. No data leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
