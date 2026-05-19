'use client';

import { useState } from 'react';

const WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod',
  'tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim',
  'veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea',
  'commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse',
  'cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
  'sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','curabitur',
  'pretium','tincidunt','lacus','nec','purus','facilisis','faucibus','orci','luctus','ultrices',
  'posuere','cubilia','curae','viverra','maecenas','accumsan','mauris','pellentesque','habitant',
  'morbi','tristique','senectus','netus','malesuada','fames','turpis','egestas','integer',
];

const CLASSIC_FIRST = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(wordCount = 10): string {
  const count = wordCount + Math.floor(Math.random() * 6) - 3;
  const words = Array.from({ length: Math.max(5, count) }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function makeParagraph(sentenceCount = 4): string {
  return Array.from({ length: sentenceCount + Math.floor(Math.random() * 3) - 1 }, () =>
    makeSentence(),
  ).join(' ');
}

function generateWords(count: number, classic: boolean): string {
  const words = Array.from({ length: count }, randomWord);
  if (classic) {
    const classicWords = CLASSIC_FIRST.replace(/[.,]/g, '').split(' ');
    for (let i = 0; i < Math.min(classicWords.length, count); i++) {
      words[i] = classicWords[i].toLowerCase();
    }
    words[0] = 'Lorem';
  }
  return words.join(' ');
}

function generateSentences(count: number, classic: boolean): string {
  const sentences = Array.from({ length: count }, () => makeSentence());
  if (classic) sentences[0] = CLASSIC_FIRST;
  return sentences.join(' ');
}

function generateParagraphs(count: number, classic: boolean): string {
  const paras = Array.from({ length: count }, () => makeParagraph());
  if (classic) paras[0] = CLASSIC_FIRST + ' ' + makeParagraph(3);
  return paras.join('\n\n');
}

type Mode = 'paragraphs' | 'sentences' | 'words';

export default function LoremIpsumTool() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [classic, setClassic] = useState(true);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const maxCount = mode === 'paragraphs' ? 20 : mode === 'sentences' ? 50 : 500;

  const generate = () => {
    const n = Math.min(count, maxCount);
    if (mode === 'paragraphs') setResult(generateParagraphs(n, classic));
    else if (mode === 'sentences') setResult(generateSentences(n, classic));
    else setResult(generateWords(n, classic));
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Lorem Ipsum Generator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Generate Lorem Ipsum placeholder text. Choose paragraphs, words, or sentences. Start
          with the classic opening or go fully random.
        </p>
      </div>

      {/* Options */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-5 mb-5">
        {/* Mode */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Generate</p>
          <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
            {(['paragraphs', 'sentences', 'words'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setCount(m === 'paragraphs' ? 3 : m === 'sentences' ? 5 : 50); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  mode === m
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center gap-4">
          <label className="text-sm text-slate-600 dark:text-slate-400 w-24 capitalize">
            {mode}
          </label>
          <input
            type="number"
            min={1}
            max={maxCount}
            value={count}
            onChange={(e) => setCount(Math.min(maxCount, Math.max(1, Number(e.target.value))))}
            className="w-24 rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="range" min={1} max={maxCount} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="flex-1 accent-indigo-600"
          />
        </div>

        {/* Classic toggle */}
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <input
            type="checkbox" checked={classic}
            onChange={(e) => setClassic(e.target.checked)}
            className="accent-indigo-600 w-4 h-4"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Start with &ldquo;Lorem ipsum dolor sit amet…&rdquo;
          </span>
        </label>

        <button
          onClick={generate}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
        >
          Generate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {result.trim().split(/\s+/).length} words
            </span>
            <button
              onClick={copy}
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy all'}
            </button>
          </div>
          <textarea
            readOnly
            value={result}
            rows={10}
            className="w-full px-4 py-3 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 resize-y focus:outline-none"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📝</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Paragraphs, words, sentences</h2>
          <p className="text-slate-500 dark:text-slate-400">Generate exactly the amount of text you need for mockups and prototypes.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📖</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Classic Lorem Ipsum</h2>
          <p className="text-slate-500 dark:text-slate-400">Optionally start with the familiar &ldquo;Lorem ipsum dolor sit amet&rdquo; opening.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Instant copy</h2>
          <p className="text-slate-500 dark:text-slate-400">One click generates, one click copies. Ready for your design tool or code editor.</p>
        </div>
      </section>
    </div>
  );
}
