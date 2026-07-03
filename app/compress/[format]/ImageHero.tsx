'use client';

import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

interface ImageHeroContent {
  badge: string;
  before: string;
  highlight: string;
  after: string;
  subtitle: string;
  privacy: string;
}

const content: Partial<Record<Locale, ImageHeroContent>> = {
  en: {
    badge: 'Reduce file size — keep quality',
    before: 'Compress',
    highlight: 'Image',
    after: 'Online',
    subtitle: 'Free, instant, and private. Up to 60% smaller files — no upload required.',
    privacy: '100% Local Processing — Your files never leave your browser',
  },
  es: {
    badge: 'Reduce el tamaño — mantén la calidad',
    before: 'Comprimir',
    highlight: 'Imagen',
    after: 'Online',
    subtitle: 'Gratis, instantáneo y privado. Hasta un 60% más ligero — sin necesidad de subir archivos.',
    privacy: '100% Procesamiento Local — Tus archivos nunca salen de tu navegador',
  },
};

export default function ImageHero() {
  const c = useLocalizedContent(content);
  return (
    <>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          <svg className="w-4 h-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span>{c.badge}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
          {c.before}{' '}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            {c.highlight}
          </span>{' '}
          {c.after}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{c.subtitle}</p>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-[#10B981] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5 self-center mb-6 w-fit mx-auto">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        {c.privacy}
      </div>
    </>
  );
}
