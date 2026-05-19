'use client';

import { useState, useMemo } from 'react';

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState('');
  const [refDate, setRefDate] = useState('');

  const result = useMemo(() => {
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return null;
    const ref = refDate ? new Date(refDate) : new Date();
    if (isNaN(ref.getTime()) || ref < birth) return null;

    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((ref.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= ref) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext };
  }, [dob, refDate]);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Age Calculator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Calculate exact age in years, months, days, weeks, and hours from a date of birth.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Date of birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Age at date (leave blank for today)</label>
          <input type="date" value={refDate} onChange={(e) => setRefDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6 text-center">
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Your age</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.years} <span className="text-2xl">yrs</span>{' '}
              {result.months} <span className="text-2xl">mo</span>{' '}
              {result.days} <span className="text-2xl">d</span>
            </p>
          </div>
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total days', value: result.totalDays.toLocaleString() },
              { label: 'Total weeks', value: result.totalWeeks.toLocaleString() },
              { label: 'Total months', value: result.totalMonths.toLocaleString() },
              { label: 'Total hours', value: result.totalHours.toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900 text-center">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
              </div>
            ))}
          </div>
          {result.daysToNext > 0 && (
            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                🎂 Next birthday in <strong>{result.daysToNext}</strong> day{result.daysToNext !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          Select a date of birth above
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎂</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Exact age</h2>
          <p className="text-slate-500 dark:text-slate-400">Years, months, and days — accounting for month lengths and leap years.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📅</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Custom reference date</h2>
          <p className="text-slate-500 dark:text-slate-400">Calculate age at any past or future date, not just today.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⏱️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Multiple units</h2>
          <p className="text-slate-500 dark:text-slate-400">Also shows total days, weeks, months, and hours for fun trivia.</p>
        </div>
      </section>
    </div>
  );
}
