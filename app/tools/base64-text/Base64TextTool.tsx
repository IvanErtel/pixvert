'use client';

import { useState } from 'react';

// btoa/atob are ASCII-only; these helpers handle full UTF-8
function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeBase64(b64: string): string {
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

type Tab = 'encode' | 'decode';

export default function Base64TextTool() {
  const [tab, setTab] = useState<Tab>('encode');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const output = (() => {
    if (!input) return '';
    try {
      setError('');
      return tab === 'encode' ? encodeBase64(input) : decodeBase64(input.trim());
    } catch (e) {
      setError((e as Error).message);
      return '';
    }
  })();

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    if (!output) return;
    setInput(output);
    setTab((t) => (t === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Base64 Text Encoder / Decoder — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Encode any text to Base64 or decode Base64 back to readable text. Supports full UTF-8
          including emojis and accented characters. Updates in real time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-5 w-fit mx-auto">
        {(['encode', 'decode'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setInput(''); setError(''); }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t === 'encode' ? 'Text → Base64' : 'Base64 → Text'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            {tab === 'encode' ? 'Plain text' : 'Base64 string'}
          </label>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder={tab === 'encode' ? 'Hello, World! 🌍' : 'SGVsbG8sIFdvcmxkISDwn4yN'}
            rows={5}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

        {output && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {tab === 'encode' ? 'Base64 output' : 'Decoded text'}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={swap}
                  className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  ⇄ Swap
                </button>
                <button
                  onClick={copy}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              rows={5}
              className="w-full px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 resize-y focus:outline-none"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔐</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Full UTF-8 support</h2>
          <p className="text-slate-500 dark:text-slate-400">Handles emojis, accented characters, CJK, and all Unicode — not just ASCII.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time</h2>
          <p className="text-slate-500 dark:text-slate-400">Output updates as you type. Click Swap to reverse the operation instantly.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses the browser's built-in TextEncoder and btoa/atob APIs. No server involved.</p>
        </div>
      </section>
    </div>
  );
}
