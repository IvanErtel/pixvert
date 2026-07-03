'use client';

import { useI18n, Locale } from './i18n';

export function useLocalizedContent<T>(content: Partial<Record<Locale, T>>): T {
  const { locale } = useI18n();
  return (content[locale] ?? content.en) as T;
}
