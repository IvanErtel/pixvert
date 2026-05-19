'use client';

import { useState, useMemo } from 'react';

type Tab = 'format' | 'minify';

const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const INLINE_TAGS = new Set(['a','abbr','acronym','b','bdo','big','br','button','cite','code','dfn','em','i','img','input','kbd','label','map','object','output','q','s','samp','select','small','span','strong','sub','sup','textarea','time','tt','u','var']);

function formatHtml(html: string, indentSize: number): string {
  const indent = ' '.repeat(indentSize);
  let level = 0;
  let result = '';
  let i = 0;

  const pad = () => indent.repeat(level);

  while (i < html.length) {
    // Skip whitespace between tags
    if (/\s/.test(html[i])) {
      // Collapse but keep one space for inline content
      while (i < html.length && /\s/.test(html[i])) i++;
      if (result.length && !result.endsWith('\n')) result += ' ';
      continue;
    }

    // Comment
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      const comment = html.slice(i, end === -1 ? html.length : end + 3);
      result += pad() + comment.trim() + '\n';
      i = end === -1 ? html.length : end + 3;
      continue;
    }

    // DOCTYPE
    if (html.startsWith('<!', i)) {
      const end = html.indexOf('>', i);
      result += html.slice(i, end + 1) + '\n';
      i = end + 1;
      continue;
    }

    // Closing tag
    if (html[i] === '<' && html[i + 1] === '/') {
      const end = html.indexOf('>', i);
      const tag = html.slice(i + 2, end).trim().split(/\s/)[0].toLowerCase();
      level = Math.max(0, level - 1);
      const lastLine = result.split('\n').at(-2) ?? '';
      // If last line was content (not a tag), don't add newline before closing
      if (lastLine.trimStart().startsWith('<') || result.endsWith('\n')) {
        result += pad();
      }
      result += html.slice(i, end + 1) + '\n';
      i = end + 1;
      continue;
    }

    // Opening/self-closing tag
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      if (end === -1) { result += html.slice(i); break; }
      const tagContent = html.slice(i + 1, end);
      const tag = tagContent.split(/[\s/>]/)[0].toLowerCase();
      const isSelfClose = tagContent.endsWith('/') || VOID_TAGS.has(tag);
      const isInline = INLINE_TAGS.has(tag);

      if (!isInline) result += pad();
      result += html.slice(i, end + 1);
      if (!isInline) result += '\n';
      i = end + 1;

      if (!isSelfClose && !VOID_TAGS.has(tag)) level++;
      continue;
    }

    // Text node — read until next tag
    let text = '';
    while (i < html.length && html[i] !== '<') text += html[i++];
    result += text.trim();
    continue;
  }

  return result.replace(/\n\s*\n+/g, '\n').trim();
}

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')     // remove comments
    .replace(/>\s+</g, '><')             // remove whitespace between tags
    .replace(/\s{2,}/g, ' ')            // collapse whitespace
    .trim();
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

const SAMPLE = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Hello World</title><link rel="stylesheet" href="style.css"></head><body><header><nav><a href="/">Home</a><a href="/about">About</a></nav></header><main><h1>Hello, World!</h1><p>This is a sample HTML document.</p><ul><li>Item one</li><li>Item two</li><li>Item three</li></ul></main><footer><p>Copyright 2025</p></footer></body></html>`;

export default function HtmlFormatterTool() {
  const [input, setInput] = useState('');
  const [tab, setTab] = useState<Tab>('format');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return tab === 'format' ? formatHtml(input, indentSize) : minifyHtml(input);
  }, [input, tab, indentSize]);

  const savings = tab === 'minify' && output && input
    ? Math.round((1 - output.length / input.length) * 100) : 0;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">HTML Formatter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Beautify HTML with proper indentation, or minify it for production. Handles comments,
          void elements, and inline tags. 100% private.
        </p>
      </div>

      {/* Tabs + options */}
      <div className="flex flex-wrap gap-3 items-center mb-5">
        <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          {(['format', 'minify'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                tab === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                           : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}>
              {t}
            </button>
          ))}
        </div>
        {tab === 'format' && (
          <div className="flex gap-1">
            {[2, 4].map((n) => (
              <button key={n} onClick={() => setIndentSize(n)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  indentSize === n ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}>
                {n}sp
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setInput(SAMPLE)} className="ml-auto text-xs text-slate-500 hover:text-indigo-600 transition-colors">
          Load sample
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Input HTML</span>
            {input && <span className="text-xs text-slate-400">{formatBytes(input.length)}</span>}
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Paste HTML here…" rows={20}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {tab === 'format' ? 'Formatted HTML' : 'Minified HTML'}
            </span>
            <div className="flex items-center gap-3">
              {savings > 0 && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{formatBytes(output.length)} · -{savings}%</span>}
              {output && (
                <button onClick={copy} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 whitespace-pre overflow-auto" style={{ minHeight: '20rem' }}>
            {output}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">&lt;&gt;</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Smart indentation</h2>
          <p className="text-slate-500 dark:text-slate-400">Block elements get new lines and indentation. Inline elements stay on the same line.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🗜️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Minify mode</h2>
          <p className="text-slate-500 dark:text-slate-400">Removes HTML comments and collapses whitespace between tags for production builds.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All formatting runs in your browser. Your HTML never leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
