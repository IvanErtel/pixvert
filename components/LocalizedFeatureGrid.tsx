'use client';

import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export default function LocalizedFeatureGrid({
  content,
}: {
  content: Partial<Record<Locale, FeatureCard[]>>;
}) {
  const items = useLocalizedContent(content);
  return (
    <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
      {items.map((f, i) => (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">{f.icon}</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{f.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{f.description}</p>
        </div>
      ))}
    </section>
  );
}
