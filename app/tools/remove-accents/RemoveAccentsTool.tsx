'use client';

import { useState } from 'react';

function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

const EXAMPLES = [
  { label: 'Spanish', text: 'El niño está más café que ayer. ¿Cómo estás?' },
  { label: 'French', text: "L'été est très agréable à Paris." },
  { label: 'German', text: 'Müller möchte Grüße aus München schicken.' },
  { label: 'Portuguese', text: 'Ação, coração, informação e nação são palavras.' },
];

export default function RemoveAccentsTool() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = removeAccents(input);
  const changed = input.length > 0 && input !== output;
  const removedCount = input.split('').filter((c, i) => removeAccents(c) !== input[i] && removeAccents(c) === '').length;
  const accentChars = [...new Set(input.split('').filter((c) => removeAccents(c) !== c && removeAccents(c) !== ''))];

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Remove Accents — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Strip accents and diacritics from any text. é→e, ñ→n, ü→u, ç→c, and all Unicode
          diacritics. Updates in real time.
        </p>
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2 mb-4">
        {EXAMPLES.map(({ label, text }) => (
          <button
            key={label}
            onClick={() => setInput(text)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
          >
            {label} example
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text with accents here… é, à, ñ, ü, ç…"
          rows={6}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />

        {/* Stats */}
        {input && (
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            {changed ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {removedCount} diacritics removed
                </span>
                {accentChars.length > 0 && (
                  <span>
                    Replaced:{' '}
                    <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                      {accentChars.join(' ')}
                    </span>
                  </span>
                )}
              </>
            ) : (
              <span>No accented characters found</span>
            )}
          </div>
        )}

        {/* Output */}
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
              rows={6}
              className="w-full px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 resize-y focus:outline-none"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">´→a</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">All Unicode diacritics</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses Unicode NFD normalization to handle every accent in every language.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">Results update as you type. Shows which characters were replaced.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All processing is done locally in your browser. Nothing is sent to a server.</p>
        </div>
      </section>
    </div>
  );
}
