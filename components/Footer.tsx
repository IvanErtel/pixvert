'use client';

import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-5xl mx-auto px-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row justify-between gap-6 mb-6">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Tools</p>
            <nav className="flex flex-col gap-1.5">
              <a href="/tools/resize" className="hover:text-[#6366F1] transition-colors">Resize Image</a>
              <a href="/tools/crop" className="hover:text-[#6366F1] transition-colors">Crop Image</a>
              <a href="/tools/remove-background" className="hover:text-[#6366F1] transition-colors">Remove Background</a>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Convert</p>
            <nav className="flex flex-col gap-1.5">
              <a href="/convert/heic-to-jpg" className="hover:text-[#6366F1] transition-colors">HEIC to JPG</a>
              <a href="/convert/png-to-webp" className="hover:text-[#6366F1] transition-colors">PNG to WebP</a>
              <a href="/convert/jpg-to-png" className="hover:text-[#6366F1] transition-colors">JPG to PNG</a>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Company</p>
            <nav className="flex flex-col gap-1.5">
              <a href="/pricing" className="hover:text-[#6366F1] transition-colors">{t('pricing')}</a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">{t('footer_privacy')}</a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">{t('footer_contact')}</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
          © 2025 Pixvert. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
