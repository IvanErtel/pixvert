import type { Metadata } from 'next';
import MortgageCalculatorTool from '@/app/tools/mortgage-calculator/MortgageCalculatorTool';
import ToolSEOContent from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocaleOverride from '@/components/LocaleOverride';
import { BASE_URL } from '@/lib/seo-conversions';
import { seoEs, metaEs } from '@/app/tools/mortgage-calculator/seo';

export const metadata: Metadata = {
  title: metaEs.title,
  description: metaEs.description,
  openGraph: { title: 'Calculadora de Hipoteca — Pixvert', type: 'website' },
  alternates: {
    canonical: '/es/tools/mortgage-calculator',
    languages: {
      en: `${BASE_URL}/tools/mortgage-calculator`,
      es: `${BASE_URL}/es/tools/mortgage-calculator`,
      'x-default': `${BASE_URL}/tools/mortgage-calculator`,
    },
  },
};

export default function MortgageCalculatorPageEs() {
  return (
    <LocaleOverride locale="es">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/tools' },
          { label: 'Calculadora de Hipoteca' },
        ]}
      />
      <MortgageCalculatorTool />
      <ToolSEOContent {...seoEs} />
      <SchemaMarkup
        name={seoEs.toolName}
        url="https://pixvert-one.vercel.app/es/tools/mortgage-calculator"
        description={metaEs.description}
        features={['Cálculo de cuota mensual', 'Desglose de intereses totales', 'Fórmula de amortización', 'Procesamiento local']}
        howToName={seoEs.howToHeading}
        howToSteps={seoEs.howToSteps}
        faqs={seoEs.faqs}
      />
    </LocaleOverride>
  );
}
