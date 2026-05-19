'use client';

import { useState } from 'react';

const CONVERSIONS: { label: string; fn: (s: string) => string }[] = [
  { label: 'UPPERCASE', fn: (s) => s.toUpperCase() },
  { label: 'lowercase', fn: (s) => s.toLowerCase() },
  {
    label: 'Title Case',
    fn: (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    label: 'Sentence case',
    fn: (s) =>
      s
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: 'camelCase',
    fn: (s) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    label: 'PascalCase',
    fn: (s) => {
      const camel = s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    },
  },
  {
    label: 'snake_case',
    fn: (s) =>
      s
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\W+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_'),
  },
  {
    label: 'kebab-case',
    fn: (s) =>
      s
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\W+/g, ' ')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-'),
  },
  {
    label: 'CONSTANT_CASE',
    fn: (s) =>
      s
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\W+/g, ' ')
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '_'),
  },
];

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [active, setActive] = useState('');
  const [copied, setCopied] = useState(false);

  const apply = (label: string, fn: (s: string) => string) => {
    setOutput(fn(input));
    setActive(label);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Case Converter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste text below, then click a conversion. Supports camelCase, PascalCase, snake_case,
          kebab-case, and more.
        </p>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(''); setActive(''); }}
          placeholder="Type or paste your text here…"
          rows={6}
          className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />

        {/* Conversion buttons */}
        <div className="flex flex-wrap gap-2">
          {CONVERSIONS.map(({ label, fn }) => (
            <button
              key={label}
              onClick={() => apply(label, fn)}
              disabled={!input.trim()}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                active === label
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Output */}
        {output && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{active}</span>
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
          <div className="text-2xl mb-2">Aa</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">9 conversions</h2>
          <p className="text-slate-500 dark:text-slate-400">UPPER, lower, Title, Sentence, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Instant</h2>
          <p className="text-slate-500 dark:text-slate-400">One click converts the entire text. Click Copy to get it into your clipboard immediately.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All conversions happen in your browser. No text is ever sent to a server.</p>
        </div>
      </section>
    </div>
  );
}
