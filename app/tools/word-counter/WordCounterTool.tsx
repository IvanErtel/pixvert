'use client';

import { useState } from 'react';

function getStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const sentences = trimmed === '' ? 0 : (trimmed.match(/[.!?]+/g) ?? []).length;
  const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length || (trimmed ? 1 : 0);
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, lines, sentences, paragraphs, readingTime };
}

const STAT_CARDS = [
  { key: 'words' as const, label: 'Words' },
  { key: 'chars' as const, label: 'Characters' },
  { key: 'charsNoSpaces' as const, label: 'No spaces' },
  { key: 'sentences' as const, label: 'Sentences' },
  { key: 'paragraphs' as const, label: 'Paragraphs' },
  { key: 'lines' as const, label: 'Lines' },
];

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const stats = getStats(text);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Word Counter — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste or type your text below. Word count, character count, and reading time update
          in real time.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
        {STAT_CARDS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-center"
          >
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {stats[key].toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Reading time */}
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span>⏱️</span>
        <span>
          Reading time: <span className="font-semibold text-slate-700 dark:text-slate-300">~{stats.readingTime} min</span>
          {' '}at 200 words/min
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here…"
        className="w-full h-72 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
      />

      <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
        <span>{stats.chars.toLocaleString()} characters</span>
        <button
          onClick={() => setText('')}
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Clear
        </button>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📊</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Real-time stats</h2>
          <p className="text-slate-500 dark:text-slate-400">All counters update instantly as you type. No button to press.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⏱️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Reading time</h2>
          <p className="text-slate-500 dark:text-slate-400">Estimated at 200 words/minute, a standard average reading speed.</p>
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
