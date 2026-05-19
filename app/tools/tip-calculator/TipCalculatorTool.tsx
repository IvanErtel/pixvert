'use client';

import { useState, useMemo } from 'react';

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

const PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculatorTool() {
  const [bill, setBill] = useState('50');
  const [tipPct, setTipPct] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('2');
  const [useCustom, setUseCustom] = useState(false);

  const result = useMemo(() => {
    const b = parseFloat(bill);
    const n = parseInt(people);
    const pct = useCustom ? parseFloat(customTip) : tipPct;
    if (!b || b <= 0 || !n || n <= 0 || isNaN(pct)) return null;
    const tipAmount = b * pct / 100;
    const total = b + tipAmount;
    const perPerson = total / n;
    const tipPerPerson = tipAmount / n;
    return { tipAmount, total, perPerson, tipPerPerson };
  }, [bill, tipPct, customTip, people, useCustom]);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Tip Calculator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Calculate the tip and split the bill between any number of people.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        {/* Bill */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Bill amount</label>
          <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
            <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-r border-slate-300 dark:border-slate-600">$</span>
            <input type="number" value={bill} onChange={(e) => setBill(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {/* Tip % */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Tip percentage</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {PRESETS.map((p) => (
              <button key={p} onClick={() => { setTipPct(p); setUseCustom(false); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  !useCustom && tipPct === p ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                {p}%
              </button>
            ))}
            <button onClick={() => setUseCustom(true)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                useCustom ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}>
              Custom
            </button>
          </div>
          {useCustom && (
            <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
              <input type="number" value={customTip} onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter tip %"
                className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">%</span>
            </div>
          )}
        </div>

        {/* People */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Number of people</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setPeople(String(Math.max(1, parseInt(people) - 1)))}
              className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-lg font-bold">−</button>
            <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} min="1"
              className="w-20 text-center rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={() => setPeople(String(parseInt(people) + 1))}
              className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-lg font-bold">+</button>
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 overflow-hidden">
          <div className="px-5 py-4 bg-indigo-600 text-white text-center">
            <p className="text-xs opacity-80 mb-1">Per person</p>
            <p className="text-4xl font-bold">{fmt(result.perPerson)}</p>
            <p className="text-xs opacity-70 mt-1">(incl. {fmt(result.tipPerPerson)} tip)</p>
          </div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-800">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Bill</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{fmt(parseFloat(bill))}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tip ({useCustom ? customTip : tipPct}%)</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{fmt(result.tipAmount)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Total</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{fmt(result.total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Enter a bill amount above to calculate
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🍽️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Tip presets</h2>
          <p className="text-slate-500 dark:text-slate-400">Quick-select 10%, 15%, 18%, 20%, 25% or enter any custom percentage.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">👥</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Bill splitting</h2>
          <p className="text-slate-500 dark:text-slate-400">Divide the total evenly between any number of people in your group.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Instant</h2>
          <p className="text-slate-500 dark:text-slate-400">All results update as you type — no button required.</p>
        </div>
      </section>
    </div>
  );
}
