'use client';

import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

export interface HeroContent {
  title: string;
  subtitle: string;
  tags?: string[];
}

export default function LocalizedHero({
  content,
}: {
  content: Partial<Record<Locale, HeroContent>>;
}) {
  const data = useLocalizedContent(content);
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{data.title}</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{data.subtitle}</p>
      {data.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
