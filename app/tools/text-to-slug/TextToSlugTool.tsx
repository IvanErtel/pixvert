'use client';

import { useState } from 'react';

type Sep = '-' | '_' | '.';

function toSlug(text: string, sep: Sep, lowercase: boolean): string {
  let s = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')  // remove diacritics
    .replace(/[^\w\s-]/g, '')          // remove non-word chars
    .trim();
  if (lowercase) s = s.toLowerCase();
  return s.replace(/[\s_-]+/g, sep);
}

const EXAMPLES = [
  'Hola Mundo',
  'Hello World',
  'Título del Artículo',
  'Développement Web',
  'My Blog Post #1',
];

export default function TextToSlugTool() {
  const [input, setInput] = useState('');
  const [sep, setSep] = useState<Sep>('-');
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = input ? toSlug(input, sep, lowercase) : '';

  const copy = async () => {
    if (!slug) return;
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Text to Slug — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Convert any title or text into a clean URL slug. Removes accents, spaces, and special
          characters. Updates in real time.
        </p>
      </div>

      <div className="space-y-4">
        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="My Blog Post Title"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Quick examples */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Options */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Separator</p>
            <div className="flex gap-1">
              {(['-', '_', '.'] as Sep[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSep(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-colors ${
                    sep === s
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {s === '-' ? 'hyphen (-)' : s === '_' ? 'underscore (_)' : 'dot (.)'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox" checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="accent-indigo-600 w-4 h-4"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">Lowercase</span>
            </label>
          </div>
        </div>

        {/* Output */}
        {slug && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Slug</span>
              <button
                onClick={copy}
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="px-4 py-4 font-mono text-lg text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 break-all">
              {slug}
            </div>
          </div>
        )}
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🐌</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">SEO-friendly</h2>
          <p className="text-slate-500 dark:text-slate-400">Generates clean, readable URL slugs that search engines and users both prefer.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">´→a</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Accent removal</h2>
          <p className="text-slate-500 dark:text-slate-400">Automatically strips accents: é→e, ñ→n, ü→u, ç→c, and all Unicode diacritics.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">Slug updates instantly as you type. Switch separator and case with one click.</p>
        </div>
      </section>
    </div>
  );
}
