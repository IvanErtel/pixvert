'use client';

import { useState } from 'react';

interface Calc {
  id: string;
  label: string;
  formula: (a: number, b: number) => number;
  fields: [string, string];
  resultLabel: (a: number, b: number, r: number) => string;
}

const CALCS: Calc[] = [
  {
    id: 'pct_of',
    label: 'What is X% of Y?',
    fields: ['Percentage (X)', 'Number (Y)'],
    formula: (a, b) => (a / 100) * b,
    resultLabel: (a, b, r) => `${a}% of ${b} = ${r}`,
  },
  {
    id: 'pct_change',
    label: '% change from X to Y',
    fields: ['From value (X)', 'To value (Y)'],
    formula: (a, b) => ((b - a) / Math.abs(a)) * 100,
    resultLabel: (a, b, r) => `Change from ${a} to ${b} = ${r > 0 ? '+' : ''}${r.toFixed(4)}%`,
  },
  {
    id: 'is_what_pct',
    label: 'X is what % of Y?',
    fields: ['Value (X)', 'Total (Y)'],
    formula: (a, b) => (a / b) * 100,
    resultLabel: (a, b, r) => `${a} is ${r.toFixed(4)}% of ${b}`,
  },
  {
    id: 'add_pct',
    label: 'Add X% to Y',
    fields: ['Percentage (X)', 'Base number (Y)'],
    formula: (a, b) => b + (b * a) / 100,
    resultLabel: (a, b, r) => `${b} + ${a}% = ${r}`,
  },
  {
    id: 'sub_pct',
    label: 'Subtract X% from Y',
    fields: ['Percentage (X)', 'Base number (Y)'],
    formula: (a, b) => b - (b * a) / 100,
    resultLabel: (a, b, r) => `${b} − ${a}% = ${r}`,
  },
];

function fmt(n: number) {
  if (!isFinite(n)) return '—';
  return parseFloat(n.toFixed(8)).toString();
}

export default function PercentageCalculatorTool() {
  const [active, setActive] = useState(CALCS[0].id);
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const calc = CALCS.find((c) => c.id === active)!;
  const av = parseFloat(a);
  const bv = parseFloat(b);
  const valid = !isNaN(av) && !isNaN(bv) && bv !== 0;
  const result = valid ? calc.formula(av, bv) : null;

  const handleSwitch = (id: string) => { setActive(id); setA(''); setB(''); };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Percentage Calculator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Five percentage calculators in one: find a percentage, calculate change, add or subtract a percentage.
        </p>
      </div>

      {/* Selector */}
      <div className="space-y-2 mb-6">
        {CALCS.map((c) => (
          <button key={c.id} onClick={() => handleSwitch(c.id)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
              active === c.id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        {calc.fields.map((label, i) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
            <input type="number" value={i === 0 ? a : b} onChange={(e) => i === 0 ? setA(e.target.value) : setB(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        ))}
      </div>

      {/* Result */}
      {result !== null ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6 text-center">
          <p className="text-xs text-slate-400 mb-2">{calc.resultLabel(av, bv, result)}</p>
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(result)}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Enter two values above to calculate
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">5️⃣</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">5 calculators</h2>
          <p className="text-slate-500 dark:text-slate-400">Percentage of, percentage change, X is what % of Y, add/subtract percentage.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Instant</h2>
          <p className="text-slate-500 dark:text-slate-400">Results appear as you type. No button to press.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Private</h2>
          <p className="text-slate-500 dark:text-slate-400">All calculations run locally in your browser. Nothing is sent anywhere.</p>
        </div>
      </section>
    </div>
  );
}
