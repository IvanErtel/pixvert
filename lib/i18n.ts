'use client';

import { createContext, useContext } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import pt from '../locales/pt.json';
import it from '../locales/it.json';
import ja from '../locales/ja.json';
import ko from '../locales/ko.json';
import zh from '../locales/zh.json';

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'zh';

export type TranslationKeys = keyof typeof en;

const translations: Record<Locale, typeof en> = { en, es, fr, de, pt, it, ja, ko, zh };

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('locale') as Locale | null;
    if (saved && translations[saved]) return saved;
    const browserLang = navigator.language.slice(0, 2) as Locale;
    return translations[browserLang] ? browserLang : 'en';
  } catch {
    return 'en';
  }
}

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys, vars?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function useI18n() {
  return useContext(I18nContext);
}
