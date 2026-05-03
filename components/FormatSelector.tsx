'use client';

import { ImageFormat, SUPPORTED_FORMATS } from '@/lib/formats';
import { useI18n } from '@/lib/i18n';

interface FormatSelectorProps {
  value: ImageFormat;
  onChange: (format: ImageFormat) => void;
}

export default function FormatSelector({ value, onChange }: FormatSelectorProps) {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
        {t('convert_to')}:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ImageFormat)}
        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors"
        aria-label={t('convert_to')}
      >
        {(Object.keys(SUPPORTED_FORMATS) as ImageFormat[]).map((format) => (
          <option key={format} value={format}>
            {SUPPORTED_FORMATS[format].label}
          </option>
        ))}
      </select>
    </div>
  );
}
