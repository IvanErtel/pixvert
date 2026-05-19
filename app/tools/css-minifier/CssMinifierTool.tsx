'use client';

import { useState, useMemo } from 'react';

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')       // remove block comments
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')   // spaces around operators
    .replace(/\s+/g, ' ')                    // collapse remaining whitespace
    .replace(/;\s*}/g, '}')                  // remove last semicolon before }
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*,\s*/g, ',')
    .trim();
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

const SAMPLE = `/* Main styles */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  color: #333333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Navigation */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

nav a {
  color: #6366F1;
  text-decoration: none;
  font-weight: 600;
}

nav a:hover {
  color: #4F46E5;
}`;

export default function CssMinifierTool() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => (input.trim() ? minifyCss(input) : ''), [input]);

  const savings = output && input
    ? Math.round((1 - output.length / input.length) * 100)
    : 0;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">CSS Minifier — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Minify CSS by removing comments, extra whitespace, and redundant characters. Updates
          in real time. 100% private — nothing leaves your browser.
        </p>
      </div>

      <div className="flex justify-end mb-2">
        <button onClick={() => setInput(SAMPLE)}
          className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
          Load sample
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Input CSS</span>
            {input && <span className="text-xs text-slate-400">{formatBytes(input.length)}</span>}
          </div>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE}
            rows={20}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Minified CSS</span>
            <div className="flex items-center gap-3">
              {savings > 0 && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {formatBytes(output.length)} · -{savings}%
                </span>
              )}
              {output && (
                <button onClick={copy} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 min-h-64 whitespace-pre-wrap break-all overflow-auto" style={{ minHeight: '20rem' }}>
            {output}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🗜️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">What gets removed</h2>
          <p className="text-slate-500 dark:text-slate-400">Block comments, extra whitespace, line breaks, unnecessary semicolons before closing braces.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📊</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Byte reduction</h2>
          <p className="text-slate-500 dark:text-slate-400">See original size, minified size, and percentage saved — updates in real time.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All minification runs in your browser with pure JavaScript regex. No server involved.</p>
        </div>
      </section>
    </div>
  );
}
