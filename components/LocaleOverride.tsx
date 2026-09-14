'use client';

import { ReactNode, useMemo } from 'react';
import { I18nContext, Locale, getTranslations, TranslationKeys } from '@/lib/i18n';

/**
 * Pins the i18n context to a fixed locale for a subtree, regardless of the
 * visitor's browser language or saved preference. Used on locale-prefixed
 * routes (e.g. /es/tools/...) so the SSR output — and what Googlebot sees —
 * always matches the URL's language, not a client-side guess.
 */
export default function LocaleOverride({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(() => {
    const t = (key: TranslationKeys, vars?: Record<string, string | number>): string => {
      const translations = getTranslations(locale);
      let text: string = translations[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    };
    return { locale, setLocale: () => {}, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
