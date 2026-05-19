'use client';

import { useState, useMemo } from 'react';

interface Range { label: string; min: number; max: number; color: string; bg: string }

const RANGES: Range[] = [
  { label: 'Underweight', min: 0, max: 18.5, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500' },
  { label: 'Normal weight', min: 18.5, max: 25, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500' },
  { label: 'Overweight', min: 25, max: 30, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500' },
  { label: 'Obese', min: 30, max: Infinity, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500' },
];

function getRange(bmi: number) {
  return RANGES.find((r) => bmi >= r.min && bmi < r.max) ?? RANGES[RANGES.length - 1];
}

export default function BmiCalculatorTool() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [weightLbs, setWeightLbs] = useState('154');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const result = useMemo(() => {
    let bmi: number;
    if (unit === 'metric') {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      if (!w || !h || w <= 0 || h <= 0) return null;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt);
      const inch = parseFloat(heightIn);
      const totalInches = ft * 12 + inch;
      if (!w || !totalInches || w <= 0 || totalInches <= 0) return null;
      bmi = (w / (totalInches * totalInches)) * 703;
    }
    return { bmi, range: getRange(bmi) };
  }, [unit, weight, height, weightLbs, heightFt, heightIn]);

  const gaugePos = result ? Math.min(100, Math.max(0, ((result.bmi - 10) / 30) * 100)) : null;

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">BMI Calculator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Calculate your Body Mass Index (BMI) with metric or imperial units and see your healthy weight range.
        </p>
      </div>

      {/* Unit toggle */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6">
        {(['metric', 'imperial'] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              unit === u ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}>
            {u === 'metric' ? 'Metric (kg / cm)' : 'Imperial (lbs / ft)'}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        {unit === 'metric' ? (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Weight</label>
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">kg</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Height</label>
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">cm</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Weight</label>
              <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">lbs</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Height</label>
              <div className="flex gap-2">
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden flex-1">
                  <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">ft</span>
                </div>
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden flex-1">
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">in</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6">
          <div className="text-center mb-4">
            <p className={`text-5xl font-bold mb-1 ${result.range.color}`}>{result.bmi.toFixed(1)}</p>
            <p className={`text-sm font-semibold ${result.range.color}`}>{result.range.label}</p>
          </div>
          {/* Gauge */}
          <div className="relative h-3 rounded-full overflow-hidden mb-1" style={{ background: 'linear-gradient(to right, #3b82f6 0%, #22c55e 35%, #f59e0b 60%, #ef4444 100%)' }}>
            {gaugePos !== null && (
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-slate-700 rounded-full shadow" style={{ left: `${gaugePos}%` }} />
            )}
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1 mb-5">
            <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-center">
            {RANGES.map((r) => (
              <div key={r.label} className={`rounded-lg p-2 ${result.range.label === r.label ? 'ring-2 ring-offset-1 ring-indigo-500' : ''} bg-white dark:bg-slate-800`}>
                <p className="font-semibold text-slate-700 dark:text-slate-300">{r.label}</p>
                <p className="text-slate-400">{r.max === Infinity ? `≥ ${r.min}` : `${r.min} – ${r.max}`}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Enter your weight and height above
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚖️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">WHO formula</h2>
          <p className="text-slate-500 dark:text-slate-400">Uses the standard WHO BMI formula: weight (kg) / height² (m).</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📏</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Metric & imperial</h2>
          <p className="text-slate-500 dark:text-slate-400">Switch between kg/cm and lbs/ft+in without re-entering values.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📊</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Visual gauge</h2>
          <p className="text-slate-500 dark:text-slate-400">Color-coded gauge shows where your BMI falls across all four ranges.</p>
        </div>
      </section>
    </div>
  );
}
