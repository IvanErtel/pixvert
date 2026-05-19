'use client';

import { useState, useMemo } from 'react';

type DiffType = 'same' | 'add' | 'remove';
interface DiffLine { type: DiffType; text: string; lineA?: number; lineB?: number }

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const m = linesA.length;
  const n = linesB.length;

  // LCS DP table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = linesA[i - 1] === linesB[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  let lineA = m, lineB = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.unshift({ type: 'same', text: linesA[i - 1], lineA, lineB });
      i--; j--; lineA--; lineB--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'add', text: linesB[j - 1], lineB });
      j--; lineB--;
    } else {
      result.unshift({ type: 'remove', text: linesA[i - 1], lineA });
      i--; lineA--;
    }
  }
  return result;
}

const LINE_STYLE: Record<DiffType, string> = {
  same: 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300',
  add: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300',
  remove: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 line-through decoration-red-400',
};

const LINE_PREFIX: Record<DiffType, string> = { same: ' ', add: '+', remove: '−' };
const LINE_PREFIX_COLOR: Record<DiffType, string> = {
  same: 'text-slate-400',
  add: 'text-emerald-600 dark:text-emerald-400',
  remove: 'text-red-500 dark:text-red-400',
};

const MAX_LINES = 500;

export default function TextDiffTool() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [compared, setCompared] = useState(false);

  const diff = useMemo(() => {
    if (!compared) return [];
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    if (linesA.length > MAX_LINES || linesB.length > MAX_LINES) return null;
    return computeDiff(textA, textB);
  }, [compared, textA, textB]);

  const stats = useMemo(() => {
    if (!diff) return null;
    const added = diff.filter((l) => l.type === 'add').length;
    const removed = diff.filter((l) => l.type === 'remove').length;
    const same = diff.filter((l) => l.type === 'same').length;
    return { added, removed, same };
  }, [diff]);

  const linesA = textA.split('\n').length;
  const linesB = textB.split('\n').length;
  const tooLarge = linesA > MAX_LINES || linesB > MAX_LINES;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Text Diff — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste two texts and compare them line by line. Added lines are highlighted in green,
          removed lines in red.
        </p>
      </div>

      {/* Two inputs */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { label: 'Original text (A)', value: textA, onChange: setTextA },
          { label: 'Modified text (B)', value: textB, onChange: setTextB },
        ].map(({ label, value, onChange }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">
              {label}
            </label>
            <textarea
              value={value}
              onChange={(e) => { onChange(e.target.value); setCompared(false); }}
              placeholder="Paste text here…"
              rows={10}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>
        ))}
      </div>

      {tooLarge && (
        <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
          Texts are too large (max {MAX_LINES} lines each).
        </p>
      )}

      <button
        onClick={() => setCompared(true)}
        disabled={!textA && !textB}
        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors mb-6"
      >
        Compare texts
      </button>

      {/* Diff result */}
      {compared && diff !== null && stats && (
        <div>
          {/* Stats bar */}
          <div className="flex flex-wrap gap-4 mb-3 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <span className="font-bold">+{stats.added}</span> lines added
            </span>
            <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
              <span className="font-bold">−{stats.removed}</span> lines removed
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="font-bold">{stats.same}</span> unchanged
            </span>
          </div>

          {/* Diff view */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-xs font-mono">
            {diff.length === 0 ? (
              <div className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                The texts are identical.
              </div>
            ) : (
              diff.map((line, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 px-3 py-0.5 ${LINE_STYLE[line.type]}`}
                >
                  <span className={`select-none shrink-0 w-4 text-center ${LINE_PREFIX_COLOR[line.type]}`}>
                    {LINE_PREFIX[line.type]}
                  </span>
                  <span className="whitespace-pre-wrap break-all flex-1">{line.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">↔️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Line-by-line diff</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses LCS algorithm to find the minimal set of changes between two texts.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Color coded</h2>
          <p className="text-slate-500 dark:text-slate-400">Green for added lines, red for removed, white for unchanged. Easy to scan at a glance.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">The diff runs entirely in your browser. Your text never reaches any server.</p>
        </div>
      </section>
    </div>
  );
}
