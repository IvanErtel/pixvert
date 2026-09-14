import type { Metadata } from 'next';
import VatCalculatorTool from './VatCalculatorTool';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';
import { BASE_URL } from '@/lib/seo-conversions';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import { seoEn, seoEs, metaEn } from './seo';

export const metadata: Metadata = {
  title: metaEn.title,
  description: metaEn.description,
  openGraph: { title: 'VAT Calculator Spain — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/vat-calculator',
    languages: {
      en: `${BASE_URL}/tools/vat-calculator`,
      es: `${BASE_URL}/es/tools/vat-calculator`,
      'x-default': `${BASE_URL}/tools/vat-calculator`,
    },
  },
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function VatCalculatorPage() {
  return (
    <>
      <VatCalculatorTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/vat-calculator"
        description={metaEn.description}
        features={['21%, 10%, 4% IVA rates', 'Add or extract VAT', 'Instant results', 'Local processing']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
