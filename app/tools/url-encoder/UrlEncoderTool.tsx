'use client';

import { useState } from 'react';

type Tab = 'encode' | 'decode';
type Mode = 'component' | 'full';

export default function UrlEncoderTool() {
  const [tab, setTab] = useState<Tab>('encode');
  const [mode, setMode] = useState<Mode>('component');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = (() => {
    if (!input) return '';
    try {
      if (tab === 'encode') {
        return mode === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        return mode === 'component' ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch {
      return '⚠️ Invalid input for decoding';
    }
  })();

  const copy = async () => {
    if (!output || output.startsWith('⚠️')) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setInput(output.startsWith('⚠️') ? '' : output);
    setTab((t) => (t === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">URL Encoder / Decoder — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Encode special characters to percent-encoding (%20, %2F…) or decode them back.
          Updates in real time as you type.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-5 w-fit mx-auto">
        {(['encode', 'decode'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setInput(''); }}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t === 'encode' ? 'Encode →' : '← Decode'}
          </button>
        ))}
      </div>

      {/* Mode */}
      <div className="flex gap-2 mb-4 items-center">
        <span className="text-xs text-slate-500 dark:text-slate-400">Mode:</span>
        {([
          { value: 'component' as Mode, label: 'encodeURIComponent', hint: 'encodes everything including / ? & =' },
          { value: 'full' as Mode, label: 'encodeURI', hint: 'preserves / ? & = and other URL chars' },
        ]).map(({ value, label, hint }) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            title={hint}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              mode === value
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            {tab === 'encode' ? 'Plain text / URL' : 'Encoded URL'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tab === 'encode' ? 'Hello World / path?q=search&lang=en' : 'Hello%20World%20%2F%20path%3Fq%3Dsearch%26lang%3Den'}
            rows={4}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        {output && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {tab === 'encode' ? 'Encoded' : 'Decoded'}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={swap}
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
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
              rows={4}
              className={`w-full px-4 py-3 text-sm font-mono bg-white dark:bg-slate-900 resize-y focus:outline-none ${
                output.startsWith('⚠️') ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'
              }`}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔗</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time encoding</h2>
          <p className="text-slate-500 dark:text-slate-400">Results update instantly as you type. No button to press.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚙️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Two modes</h2>
          <p className="text-slate-500 dark:text-slate-400">encodeURIComponent for query values, encodeURI to encode a full URL preserving structure.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything runs in your browser using the standard JS Web API. No server involved.</p>
        </div>
      </section>
    </div>
  );
}
