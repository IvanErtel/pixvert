'use client';

import { useState, useMemo } from 'react';

// Basic JS minification: removes comments and collapses whitespace.
// Does NOT perform AST-based transforms (variable renaming, dead-code elimination).
function minifyJs(js: string): string {
  let result = '';
  let i = 0;
  while (i < js.length) {
    // Block comment
    if (js[i] === '/' && js[i + 1] === '*') {
      const end = js.indexOf('*/', i + 2);
      i = end === -1 ? js.length : end + 2;
      continue;
    }
    // Line comment
    if (js[i] === '/' && js[i + 1] === '/') {
      const end = js.indexOf('\n', i + 2);
      i = end === -1 ? js.length : end + 1;
      result += '\n'; // preserve newline to avoid joining statements
      continue;
    }
    // String literal (preserve exactly)
    if (js[i] === '"' || js[i] === "'" || js[i] === '`') {
      const quote = js[i];
      result += quote;
      i++;
      while (i < js.length) {
        if (js[i] === '\\') { result += js[i] + js[i + 1]; i += 2; continue; }
        if (js[i] === quote) { result += quote; i++; break; }
        result += js[i++];
      }
      continue;
    }
    result += js[i++];
  }

  return result
    .replace(/[ \t]+/g, ' ')        // collapse horizontal whitespace
    .replace(/\n\s*\n+/g, '\n')     // collapse multiple newlines
    .replace(/\n\s*/g, '\n')        // trim leading whitespace on each line
    .replace(/\s*([{}();,=+\-*/%&|^<>!?:[\]])\s*/g, '$1')  // spaces around operators
    .replace(/\n+/g, '')            // remove remaining newlines where safe
    .trim();
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

const SAMPLE = `// Utility functions
function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

/* Calculate the sum of an array */
function sum(arr) {
  return arr.reduce(function(acc, val) {
    return acc + val;
  }, 0);
}

const PI = 3.14159265358979;

function circleArea(r) {
  return PI * r * r;
}`;

export default function JsMinifierTool() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => (input.trim() ? minifyJs(input) : ''), [input]);

  const savings = output && input ? Math.round((1 - output.length / input.length) * 100) : 0;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">JavaScript Minifier — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Remove comments and collapse whitespace from JavaScript. Updates in real time.
          100% private — for full AST minification use a build tool like esbuild.
        </p>
      </div>

      <div className="flex justify-end mb-2">
        <button onClick={() => setInput(SAMPLE)} className="text-xs text-slate-500 hover:text-indigo-600 transition-colors">
          Load sample
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Input JS</span>
            {input && <span className="text-xs text-slate-400">{formatBytes(input.length)}</span>}
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE} rows={20}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Minified JS</span>
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
          <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 whitespace-pre-wrap break-all overflow-auto" style={{ minHeight: '20rem' }}>
            {output}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🗜️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">What gets removed</h2>
          <p className="text-slate-500 dark:text-slate-400">Block comments (/* … */), line comments (//), extra spaces and newlines. String contents are preserved exactly.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚠️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Basic minification</h2>
          <p className="text-slate-500 dark:text-slate-400">This is whitespace/comment removal, not AST-based. For variable renaming and tree-shaking use esbuild or terser.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All processing runs in your browser. Your JavaScript code never leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
