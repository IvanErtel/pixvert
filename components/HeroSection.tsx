'use client';

import { useI18n } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useI18n();

  const title = t('hero_title');
  const words = title.split(' ');
  const lastWord = words.pop();
  const rest = words.join(' ');

  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
        {rest}{' '}
        <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
          {lastWord}
        </span>
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400">
        {t('hero_subtitle')}
      </p>
    </div>
  );
}
