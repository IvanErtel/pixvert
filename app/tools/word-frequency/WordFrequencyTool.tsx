'use client';

import { useState, useMemo } from 'react';

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','was','are','were','be','been','being','have','has','had','do',
  'does','did','will','would','could','should','may','might','shall','can',
  'it','its','this','that','these','those','i','me','my','we','our','you',
  'your','he','she','him','her','they','them','their','what','which','who',
  'whom','how','when','where','why','not','no','so','as','if','then','than',
  'there','here','up','out','about','into','over','after','de','la','el','en',
  'que','se','lo','un','una','su','con','por','es','le','del','al',
]);

type SortOrder = 'freq' | 'alpha';

function computeFrequency(text: string, caseSensitive: boolean, filterStops: boolean) {
  const words = text
    .replace(/[^\p{L}'-]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const map = new Map<string, number>();
  for (const raw of words) {
    const word = caseSensitive ? raw : raw.toLowerCase();
    if (!word) continue;
    if (filterStops && STOP_WORDS.has(word.toLowerCase())) continue;
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

export default function WordFrequencyTool() {
  const [text, setText] = useState('');
  const [sort, setSort] = useState<SortOrder>('freq');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [filterStops, setFilterStops] = useState(false);
  const [limit, setLimit] = useState(50);

  const freqMap = useMemo(
    () => computeFrequency(text, caseSensitive, filterStops),
    [text, caseSensitive, filterStops],
  );

  const entries = useMemo(() => {
    const arr = [...freqMap.entries()];
    if (sort === 'freq') arr.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    else arr.sort((a, b) => a[0].localeCompare(b[0]));
    return arr.slice(0, limit);
  }, [freqMap, sort, limit]);

  const maxCount = entries[0]?.[1] ?? 1;
  const totalUnique = freqMap.size;

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Word Frequency Counter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste text to see how many times each word appears. Sort by frequency or
          alphabetically. Optionally filter common stop words.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here…"
        rows={6}
        className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y mb-4"
      />

      {/* Options */}
      {text && (
        <>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Sort */}
            <div className="flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
              {([['freq', 'By frequency'], ['alpha', 'A–Z']] as [SortOrder, string][]).map(([s, label]) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    sort === s
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="accent-indigo-600" />
              Case sensitive
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={filterStops} onChange={(e) => setFilterStops(e.target.checked)} className="accent-indigo-600" />
              Filter stop words
            </label>
          </div>

          {/* Stats */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {totalUnique} unique words · showing top {Math.min(limit, totalUnique)}
          </p>

          {/* Table */}
          {entries.length > 0 ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide w-8">#</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Word</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Count</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(([word, count], i) => (
                    <tr key={word} className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'}`}>
                      <td className="px-4 py-2 text-xs text-slate-400">{i + 1}</td>
                      <td className="px-4 py-2 font-mono font-medium text-slate-800 dark:text-slate-200">{word}</td>
                      <td className="px-4 py-2 font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">{count}</td>
                      <td className="px-4 py-2 w-40">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 tabular-nums w-10 text-right">
                            {((count / (freqMap.size || 1)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No words found.</p>
          )}

          {totalUnique > limit && (
            <button
              onClick={() => setLimit((l) => l + 50)}
              className="mt-4 w-full py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Show more ({totalUnique - limit} remaining)
            </button>
          )}
        </>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📊</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Visual frequency bars</h2>
          <p className="text-slate-500 dark:text-slate-400">Each word shows a proportional bar so you can spot the most common terms instantly.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🛑</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Stop word filter</h2>
          <p className="text-slate-500 dark:text-slate-400">Filter out common words (the, a, is…) to focus on meaningful content words.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All counting happens locally in your browser. Your text never leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
