'use client';

import { useState, useMemo } from 'react';

// Spain IRPF 2024 brackets (simplified general scale)
const BRACKETS = [
  { limit: 12450, rate: 0.19 },
  { limit: 20200, rate: 0.24 },
  { limit: 35200, rate: 0.30 },
  { limit: 60000, rate: 0.37 },
  { limit: 300000, rate: 0.45 },
  { limit: Infinity, rate: 0.47 },
];

// Social Security: employee contribution ~6.35% (general)
const SS_RATE = 0.0635;

function calcIRPF(gross: number): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of BRACKETS) {
    if (gross <= prev) break;
    const taxable = Math.min(gross, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }
  return tax;
}

function fmt(n: number) {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
}

function pct(n: number, total: number) {
  return ((n / total) * 100).toFixed(1) + '%';
}

export default function SalaryCalculatorTool() {
  const [gross, setGross] = useState('30000');
  const [pagas, setPagas] = useState<12 | 14>(14);

  const result = useMemo(() => {
    const g = parseFloat(gross);
    if (!g || g <= 0) return null;
    const ss = g * SS_RATE;
    const taxBase = g - ss;
    const irpf = calcIRPF(taxBase);
    const net = g - ss - irpf;
    return { gross: g, ss, irpf, net, monthly: net / pagas };
  }, [gross, pagas]);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Salary Calculator Spain — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Estimate your net salary after IRPF and Social Security contributions (Spain 2024). Simplified calculation — consult a professional for exact figures.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Annual gross salary (bruto)</label>
          <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
            <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-r border-slate-300 dark:border-slate-600">€</span>
            <input type="number" value={gross} onChange={(e) => setGross(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Number of payments per year</label>
          <div className="flex gap-2">
            {([12, 14] as const).map((p) => (
              <button key={p} onClick={() => setPagas(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  pagas === p ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                {p} pagas
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 overflow-hidden">
          <div className="px-5 py-4 bg-indigo-600 text-white text-center">
            <p className="text-xs opacity-80 mb-1">Monthly net ({pagas} pagas)</p>
            <p className="text-4xl font-bold">{fmt(result.monthly)}</p>
          </div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-800">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Gross (bruto)</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{fmt(result.gross)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Social Security ({(SS_RATE * 100).toFixed(2)}%)</span>
              <span className="font-semibold text-red-500">−{fmt(result.ss)} <span className="text-xs font-normal opacity-60">({pct(result.ss, result.gross)})</span></span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">IRPF (income tax)</span>
              <span className="font-semibold text-red-500">−{fmt(result.irpf)} <span className="text-xs font-normal opacity-60">({pct(result.irpf, result.gross)})</span></span>
            </div>
            <div className="flex justify-between items-center px-5 py-4 bg-indigo-100/50 dark:bg-indigo-900/40">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Annual net (neto)</span>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(result.net)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Enter your gross salary above
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400 text-center">
        Simplified estimate using Spain 2024 general IRPF brackets. Actual deductions vary by personal situation.
      </p>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🇪🇸</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Spain 2024 brackets</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses the 2024 general IRPF progressive scale and 6.35% SS employee rate.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📅</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">12 or 14 pagas</h2>
          <p className="text-slate-500 dark:text-slate-400">Toggle between 12 monthly payments or 14 (includes July and December extras).</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚠️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Estimate only</h2>
          <p className="text-slate-500 dark:text-slate-400">Actual net depends on personal deductions, family situation, region, etc.</p>
        </div>
      </section>
    </div>
  );
}
