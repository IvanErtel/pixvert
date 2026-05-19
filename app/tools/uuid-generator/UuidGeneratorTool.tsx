'use client';

import { useState } from 'react';

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  function generate() {
    let list = Array.from({ length: count }, () => generateUUID());
    if (uppercase) list = list.map((u) => u.toUpperCase());
    if (noDashes) list = list.map((u) => u.replace(/-/g, ''));
    setUuids(list);
    setCopied(null);
    setCopiedAll(false);
  }

  async function copy(uuid: string, idx: number) {
    await navigator.clipboard.writeText(uuid);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  async function copyAll() {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          UUID Generator — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Generate version 4 UUIDs (random) instantly. Bulk generation, copy individually or all at once.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 shrink-0">
              Count
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[1, 5, 10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-indigo-600 w-4 h-4"
            />
            Uppercase
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={noDashes}
              onChange={(e) => setNoDashes(e.target.checked)}
              className="accent-indigo-600 w-4 h-4"
            />
            No dashes
          </label>
        </div>

        <button
          onClick={generate}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
        >
          Generate UUID{count > 1 ? 's' : ''}
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">{uuids.length} UUID{uuids.length > 1 ? 's' : ''} generated</span>
            {uuids.length > 1 && (
              <button
                onClick={copyAll}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {copiedAll ? 'Copied all!' : 'Copy all'}
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((uuid, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3"
              >
                <span className="flex-1 font-mono text-sm text-slate-800 dark:text-slate-200 select-all">
                  {uuid}
                </span>
                <button
                  onClick={() => copy(uuid, i)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {copied === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🆔</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">UUID v4</h2>
          <p className="text-slate-500 dark:text-slate-400">Version 4 UUIDs use random bits, making collisions astronomically unlikely.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📦</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Bulk generation</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate up to 100 UUIDs at once and copy them all in one click.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses the browser&apos;s built-in crypto API. Nothing leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
