'use client';

import { useState, useEffect } from 'react';

const EXAMPLE = `# Hello World

This is a **bold** word and this is *italic*.

## Features

- Item one
- Item two
- Item three

### Code example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote with some useful information.

[Visit Pixvert](https://pixvert-one.vercel.app)
`;

export default function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState(EXAMPLE);
  const [html, setHtml] = useState('');
  const [tab, setTab] = useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('marked').then(({ marked }) => {
      if (!cancelled) setHtml(marked.parse(markdown) as string);
    });
    return () => { cancelled = true; };
  }, [markdown]);

  async function copy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Markdown to HTML — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Convert Markdown to clean HTML instantly. Live preview and syntax highlighting.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Markdown</span>
            <button
              onClick={() => setMarkdown('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            className="flex-1 min-h-[480px] rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            placeholder="# Your markdown here..."
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-1">
              {(['preview', 'html'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    tab === t
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {t === 'preview' ? 'Preview' : 'HTML'}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
              <button
                onClick={download}
                className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
              >
                Download
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[480px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-auto">
            {tab === 'preview' ? (
              <div
                className="prose prose-slate dark:prose-invert max-w-none p-5 text-sm"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre className="p-4 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-all select-all">
                {html}
              </pre>
            )}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live conversion</h2>
          <p className="text-slate-500 dark:text-slate-400">HTML output updates instantly as you type your Markdown.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">👁️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live preview</h2>
          <p className="text-slate-500 dark:text-slate-400">Switch between rendered preview and raw HTML output.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything runs in your browser. Your text never leaves your device.</p>
        </div>
      </section>
    </div>
  );
}
