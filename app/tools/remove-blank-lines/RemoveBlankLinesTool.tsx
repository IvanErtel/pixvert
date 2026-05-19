'use client';

import { useState, useMemo } from 'react';

type Mode = 'all' | 'collapse';

function process(text: string, mode: Mode, trim: boolean): string {
  let lines = text.split('\n');
  if (trim) lines = lines.map((l) => l.trimEnd());

  if (mode === 'all') {
    lines = lines.filter((l) => l.trim() !== '');
  } else {
    // collapse: replace 2+ consecutive blank lines with one
    const out: string[] = [];
    let prevBlank = false;
    for (const line of lines) {
      const isBlank = line.trim() === '';
      if (isBlank && prevBlank) continue;
      out.push(line);
      prevBlank = isBlank;
    }
    lines = out;
  }

  return lines.join('\n');
}

export default function RemoveBlankLinesTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('collapse');
  const [trim, setTrim] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => process(input, mode, trim), [input, mode, trim]);

  const inputLines = input.split('\n').length;
  const outputLines = output ? output.split('\n').length : 0;
  const removed = inputLines - outputLines;

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Remove Blank Lines — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Remove all blank lines from text, or collapse multiple blank lines into one. Optionally
          trim trailing whitespace. Updates in real time.
        </p>
      </div>

      {/* Options */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-6 mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Mode</p>
          <div className="flex gap-2">
            {([
              ['collapse', 'Collapse duplicates'],
              ['all', 'Remove all'],
            ] as [Mode, string][]).map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  mode === m
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox" checked={trim}
              onChange={(e) => setTrim(e.target.checked)}
              className="accent-indigo-600 w-4 h-4"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Trim trailing spaces</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with blank lines here…"
          rows={8}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />

        {input && (
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>{inputLines} lines in</span>
            <span>→ {outputLines} lines out</span>
            {removed > 0 && (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {removed} line{removed !== 1 ? 's' : ''} removed
              </span>
            )}
          </div>
        )}

        {input && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Result</span>
              <button
                onClick={copy}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 resize-y focus:outline-none"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🧹</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Two modes</h2>
          <p className="text-slate-500 dark:text-slate-400">Remove all blank lines, or collapse consecutive blanks into a single one to preserve structure.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">✂️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Trim trailing spaces</h2>
          <p className="text-slate-500 dark:text-slate-400">Optionally remove invisible trailing whitespace from each line for cleaner output.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">Output updates instantly. See exactly how many lines were removed before copying.</p>
        </div>
      </section>
    </div>
  );
}
