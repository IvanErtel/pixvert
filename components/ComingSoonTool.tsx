'use client';

import { useState } from 'react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ComingSoonToolProps {
  toolKey: string;
  title: string;
  subtitle: string;
  tags: string[];
  benefits: Benefit[];
}

const STORAGE_PREFIX = 'pixvert_notify_';

export default function ComingSoonTool({ toolKey, title, subtitle, tags, benefits }: ComingSoonToolProps) {
  const storageKey = STORAGE_PREFIX + toolKey;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Enter a valid email.'); return; }
    setError('');
    localStorage.setItem(storageKey, email);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-10 text-center">
        <span className="inline-block mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          Coming Soon
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-10 text-center bg-slate-50 dark:bg-slate-900/50 mb-10">
        {submitted ? (
          <div className="space-y-2">
            <div className="text-4xl">✅</div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Got it! We&apos;ll let you know.</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We&apos;ll notify you at <strong>{email}</strong> when this tool launches.
            </p>
          </div>
        ) : (
          <>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              This tool is in development. Enter your email and we&apos;ll notify you when it&apos;s ready.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-colors"
              >
                Notify me
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </>
        )}
      </div>

      <section className="grid sm:grid-cols-3 gap-6 text-sm">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="text-2xl mb-2">{b.icon}</div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{b.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{b.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
