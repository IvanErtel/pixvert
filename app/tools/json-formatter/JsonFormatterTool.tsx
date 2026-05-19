'use client';

import { useState } from 'react';

type Tab = 'format' | 'minify' | 'validate';
type Indent = 2 | 4;

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

const SAMPLE = `{"name":"Pixvert","version":"1.0","features":["convert","resize","watermark"],"pro":{"price":3.99,"currency":"USD"}}`;

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState<Tab>('format');
  const [indent, setIndent] = useState<Indent>(2);
  const [copied, setCopied] = useState(false);

  const result = (() => {
    if (!input.trim()) return { output: '', error: null };
    try {
      const parsed = JSON.parse(input);
      if (tab === 'minify') return { output: JSON.stringify(parsed), error: null };
      if (tab === 'validate') return { output: '✓ Valid JSON', error: null };
      return { output: JSON.stringify(parsed, null, indent), error: null };
    } catch (e) {
      const msg = (e as Error).message;
      if (tab === 'validate') return { output: '', error: msg };
      return { output: '', error: msg };
    }
  })();

  const isValid = !result.error && input.trim() !== '';
  const savings = result.output && tab === 'minify'
    ? Math.round((1 - result.output.length / input.length) * 100)
    : 0;

  const copy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">JSON Formatter & Validator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Format, validate, and minify JSON. Detects syntax errors and shows exact position.
          100% private — nothing leaves your browser.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-5 w-fit">
        {(['format', 'minify', 'validate'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}>
            {t}
          </button>
        ))}
        {tab === 'format' && (
          <div className="flex gap-1 ml-2 border-l border-slate-300 dark:border-slate-600 pl-2">
            {([2, 4] as Indent[]).map((n) => (
              <button key={n} onClick={() => setIndent(n)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  indent === n ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
                }`}>
                {n}sp
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick sample */}
      <div className="flex justify-end mb-2">
        <button onClick={() => setInput(SAMPLE)}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
          Load sample
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Input</span>
            <span className="text-xs text-slate-400">{input ? formatBytes(input.length) : ''}</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'{\n  "key": "value"\n}'}
            rows={18}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Output</span>
            <div className="flex items-center gap-3">
              {tab === 'minify' && savings > 0 && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">-{savings}%</span>
              )}
              {result.output && !result.error && (
                <button onClick={copy}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className={`w-full rounded-xl border px-4 py-3 text-sm font-mono min-h-[18rem] whitespace-pre-wrap break-all bg-white dark:bg-slate-900 resize-y overflow-auto ${
            result.error
              ? 'border-red-300 dark:border-red-800 text-red-600 dark:text-red-400'
              : tab === 'validate' && isValid
              ? 'border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
              : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
          }`}>
            {result.error
              ? `✗ ${result.error}`
              : tab === 'validate' && isValid
              ? result.output
              : result.output}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">{ }</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Format & validate</h2>
          <p className="text-slate-500 dark:text-slate-400">Pretty-print with 2 or 4 spaces. Syntax errors shown with exact message.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🗜️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Minify for production</h2>
          <p className="text-slate-500 dark:text-slate-400">Remove all whitespace and line breaks. See the exact byte reduction percentage.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">JSON.parse and JSON.stringify run in your browser. No data ever leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
