import type { Metadata } from 'next';
import SalaryCalculatorTool from './SalaryCalculatorTool';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import { BASE_URL } from '@/lib/seo-conversions';
import { seoEn, seoEs, metaEn } from './seo';

export const metadata: Metadata = {
  title: metaEn.title,
  description: metaEn.description,
  openGraph: { title: 'Salary Calculator Spain — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/salary-calculator',
    languages: {
      en: `${BASE_URL}/tools/salary-calculator`,
      es: `${BASE_URL}/es/tools/salary-calculator`,
      'x-default': `${BASE_URL}/tools/salary-calculator`,
    },
  },
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function SalaryCalculatorPage() {
  return (
    <>
      <SalaryCalculatorTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/salary-calculator"
        description={metaEn.description}
        features={['IRPF bracket calculation', 'Social Security deduction', '12 or 14 payment support', 'Local processing']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
