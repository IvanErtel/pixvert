import type { Metadata } from 'next';
import MortgageCalculatorTool from './MortgageCalculatorTool';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';
import { BASE_URL } from '@/lib/seo-conversions';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import { seoEn, seoEs, metaEn } from './seo';

export const metadata: Metadata = {
  title: metaEn.title,
  description: metaEn.description,
  openGraph: { title: 'Mortgage Calculator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/mortgage-calculator',
    languages: {
      en: `${BASE_URL}/tools/mortgage-calculator`,
      es: `${BASE_URL}/es/tools/mortgage-calculator`,
      'x-default': `${BASE_URL}/tools/mortgage-calculator`,
    },
  },
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function MortgageCalculatorPage() {
  return (
    <>
      <MortgageCalculatorTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/mortgage-calculator"
        description={metaEn.description}
        features={['Monthly payment calculation', 'Total interest breakdown', 'Amortization formula', 'Local processing']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
