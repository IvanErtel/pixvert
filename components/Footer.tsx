'use client';

import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>© 2025 Pixvert. All rights reserved.</span>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-[#6366F1] transition-colors">{t('footer_privacy')}</a>
          <a href="#" className="hover:text-[#6366F1] transition-colors">{t('footer_terms')}</a>
          <a href="#" className="hover:text-[#6366F1] transition-colors">{t('footer_contact')}</a>
        </nav>
      </div>
    </footer>
  );
}
