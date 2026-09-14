import type { Metadata } from 'next';
import VatCalculatorTool from '@/app/tools/vat-calculator/VatCalculatorTool';
import ToolSEOContent from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocaleOverride from '@/components/LocaleOverride';
import { BASE_URL } from '@/lib/seo-conversions';
import { seoEs, metaEs } from '@/app/tools/vat-calculator/seo';

export const metadata: Metadata = {
  title: metaEs.title,
  description: metaEs.description,
  openGraph: { title: 'Calculadora de IVA España — Pixvert', type: 'website' },
  alternates: {
    canonical: '/es/tools/vat-calculator',
    languages: {
      en: `${BASE_URL}/tools/vat-calculator`,
      es: `${BASE_URL}/es/tools/vat-calculator`,
      'x-default': `${BASE_URL}/tools/vat-calculator`,
    },
  },
};

export default function VatCalculatorPageEs() {
  return (
    <LocaleOverride locale="es">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/tools' },
          { label: 'Calculadora de IVA España' },
        ]}
      />
      <VatCalculatorTool />
      <ToolSEOContent {...seoEs} />
      <SchemaMarkup
        name={seoEs.toolName}
        url="https://pixvert-one.vercel.app/es/tools/vat-calculator"
        description={metaEs.description}
        features={['Tipos de IVA 21%, 10%, 4%', 'Suma o extrae IVA', 'Resultados instantáneos', 'Procesamiento local']}
        howToName={seoEs.howToHeading}
        howToSteps={seoEs.howToSteps}
        faqs={seoEs.faqs}
      />
    </LocaleOverride>
  );
}
