'use client';

import { useState, useEffect, ReactNode } from 'react';
import { I18nContext, Locale, detectLocale, getTranslations, TranslationKeys } from '@/lib/i18n';

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

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

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
