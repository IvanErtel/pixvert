'use client';

import { useI18n, Locale } from '@/lib/i18n';
import ToolSEOContent, { type ToolSEOData } from './ToolSEOContent';

export default function LocalizedToolSEO({
  content,
}: {
  content: Partial<Record<Locale, ToolSEOData>>;
}) {
  const { locale } = useI18n();
  const data = content[locale] ?? content.en;
  if (!data) return null;
  return <ToolSEOContent {...data} />;
}
