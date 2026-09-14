import type { Metadata } from 'next';
import SalaryCalculatorTool from '@/app/tools/salary-calculator/SalaryCalculatorTool';
import ToolSEOContent from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocaleOverride from '@/components/LocaleOverride';
import { BASE_URL } from '@/lib/seo-conversions';
import { seoEs, metaEs } from '@/app/tools/salary-calculator/seo';

export const metadata: Metadata = {
  title: metaEs.title,
  description: metaEs.description,
  openGraph: { title: 'Calculadora de Salario España — Pixvert', type: 'website' },
  alternates: {
    canonical: '/es/tools/salary-calculator',
    languages: {
      en: `${BASE_URL}/tools/salary-calculator`,
      es: `${BASE_URL}/es/tools/salary-calculator`,
      'x-default': `${BASE_URL}/tools/salary-calculator`,
    },
  },
};

export default function SalaryCalculatorPageEs() {
  return (
    <LocaleOverride locale="es">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/tools' },
          { label: 'Calculadora de Salario España' },
        ]}
      />
      <SalaryCalculatorTool />
      <ToolSEOContent {...seoEs} />
      <SchemaMarkup
        name={seoEs.toolName}
        url="https://pixvert-one.vercel.app/es/tools/salary-calculator"
        description={metaEs.description}
        features={['Cálculo por tramos de IRPF', 'Deducción de Seguridad Social', 'Soporte para 12 o 14 pagas', 'Procesamiento local']}
        howToName={seoEs.howToHeading}
        howToSteps={seoEs.howToSteps}
        faqs={seoEs.faqs}
      />
    </LocaleOverride>
  );
}
