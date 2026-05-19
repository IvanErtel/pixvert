'use client';

import { useState, useMemo } from 'react';

export default function DateDifferenceTool() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [exclude, setExclude] = useState(false);

  const result = useMemo(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const swapped = d2 < d1;

    const totalMs = end.getTime() - start.getTime();
    let totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));

    // Count weekends between start and end
    if (exclude) {
      let weekendDays = 0;
      const cur = new Date(start);
      while (cur < end) {
        const day = cur.getDay();
        if (day === 0 || day === 6) weekendDays++;
        cur.setDate(cur.getDate() + 1);
      }
      totalDays -= weekendDays;
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; const prev = new Date(end.getFullYear(), end.getMonth(), 0); days += prev.getDate(); }
    if (months < 0) { years--; months += 12; }

    return { totalDays, weeks, remainingDays, years, months, days, swapped };
  }, [date1, date2, exclude]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Date Difference Calculator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Calculate the number of days between two dates. Optionally exclude weekends.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Start date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">End date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => { setDate1(today); setDate2(''); }} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Use today as start</button>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer ml-auto">
            <input type="checkbox" checked={exclude} onChange={(e) => setExclude(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            Exclude weekends
          </label>
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          {result.swapped && (
            <p className="text-xs text-amber-600 dark:text-amber-400 text-center">Dates were swapped — showing absolute difference.</p>
          )}
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6 text-center">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">{exclude ? 'Business days' : 'Total days'}</p>
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{result.totalDays.toLocaleString()}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              = {result.weeks} week{result.weeks !== 1 ? 's' : ''}{result.remainingDays > 0 ? ` + ${result.remainingDays} day${result.remainingDays !== 1 ? 's' : ''}` : ''}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900 text-center">
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wide">In years, months & days</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {result.years > 0 && <>{result.years} yr{result.years !== 1 ? 's' : ''} </>}
              {result.months > 0 && <>{result.months} mo </>}
              {result.days} day{result.days !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Select two dates above to calculate the difference
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📅</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Days between dates</h2>
          <p className="text-slate-500 dark:text-slate-400">Calculates exact calendar days between any two dates — past, present, or future.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">💼</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Business days</h2>
          <p className="text-slate-500 dark:text-slate-400">Toggle to exclude weekends and count only working days between dates.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔄</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Both directions</h2>
          <p className="text-slate-500 dark:text-slate-400">Works regardless of which date you enter first — always shows the absolute difference.</p>
        </div>
      </section>
    </div>
  );
}
