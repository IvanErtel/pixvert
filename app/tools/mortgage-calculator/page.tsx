import type { Metadata } from 'next';
import MortgageCalculatorTool from './MortgageCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Mortgage Calculator Online Free — Monthly Payment | Pixvert',
  description:
    'Calculate your monthly mortgage payment, total cost, and total interest instantly. Free mortgage calculator with amortization breakdown.',
  openGraph: { title: 'Mortgage Calculator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/mortgage-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'Mortgage Calculator',
  whatIsHeading: 'What is a mortgage calculator?',
  whatIsParagraphs: [
    'A mortgage calculator estimates your monthly loan payment based on the amount you borrow, the interest rate, and the length of the loan. Pixvert\'s mortgage calculator computes your monthly payment instantly, along with the total amount you\'ll pay over the life of the loan and how much of that is interest versus principal.',
    'Buying a home is one of the biggest financial commitments most people make, and small differences in interest rate or loan term can change the monthly payment — and total interest paid — by tens of thousands over 20 or 30 years. This mortgage calculator lets you adjust each variable and see the impact immediately, without needing a spreadsheet or a bank appointment.',
    'The calculator uses the standard amortization formula that lenders use, so the numbers you see here match what you\'d get from a bank\'s own estimate, letting you compare offers or explore "what if" scenarios — a bigger down payment, a shorter term, a different rate — before committing to anything.',
  ],
  howToHeading: 'How to calculate your mortgage payment',
  howToSteps: [
    { title: 'Enter the loan amount', description: 'the total amount you plan to borrow (home price minus down payment)' },
    { title: 'Enter the interest rate', description: 'the annual interest rate offered by your lender' },
    { title: 'Set the loan term', description: 'typically 15, 20, or 30 years' },
    { title: 'Review the results', description: 'see your estimated monthly payment, total cost, and total interest instantly' },
  ],
  useCasesHeading: 'When to use a mortgage calculator',
  useCases: [
    { title: 'Comparing loan offers', description: 'Enter the terms from two different lenders side by side to see which results in a lower total cost.' },
    { title: 'Deciding on a down payment', description: 'See how increasing your down payment lowers the loan amount, monthly payment, and total interest.' },
    { title: 'Choosing a loan term', description: 'Compare a 15-year term against a 30-year term to understand the trade-off between monthly payment and total interest.' },
    { title: 'Budgeting before house hunting', description: 'Estimate what monthly payment you can afford before looking at properties in a given price range.' },
    { title: 'Refinancing decisions', description: 'Compare your current mortgage terms against a potential refinance offer.' },
  ],
  whyHeading: 'Why use Pixvert\'s mortgage calculator?',
  whyReasons: [
    { title: 'Instant results', description: 'monthly payment, total cost, and total interest update as you type' },
    { title: '100% private', description: 'your financial numbers are calculated locally in your browser and never sent anywhere' },
    { title: 'No signup required', description: 'run as many scenarios as you want without creating an account' },
    { title: 'Standard amortization formula', description: 'the same calculation method banks use, so estimates are realistic' },
  ],
  faqs: [
    { question: 'Is my financial information sent anywhere?', answer: 'No. All calculations run locally in your browser using JavaScript. The numbers you enter are never transmitted or stored.' },
    { question: 'Does this calculator include taxes and insurance?', answer: 'No, this calculator estimates principal and interest only. Property taxes, homeowners insurance, and HOA fees would need to be added separately for a full monthly cost estimate.' },
    { question: 'How is the monthly payment calculated?', answer: 'The tool uses the standard fixed-rate amortization formula, which spreads principal and interest across equal monthly payments over the loan term.' },
    { question: 'Why does a shorter loan term have a higher monthly payment but lower total cost?', answer: 'A shorter term spreads the same loan amount over fewer payments, so each one is larger, but you pay much less interest overall since the loan is repaid faster.' },
    { question: 'Can I use this for a car loan or personal loan?', answer: 'The same amortization math applies to any fixed-rate installment loan, so yes, though the tool is labeled and optimized for mortgage scenarios.' },
    { question: 'What interest rate should I enter if I don\'t have an offer yet?', answer: 'Check current average mortgage rates for your country and loan type as a starting estimate, then adjust once you have an actual lender quote.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Salary Calculator', description: 'Estimate your net salary after tax deductions' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/vat-calculator', label: 'VAT Calculator', description: 'Calculate VAT amounts for Spain (21%, 10%, 4%)' },
    { href: '/tools/unit-converter', label: 'Unit Converter', description: 'Convert between weight, length, temperature, and volume units' },
  ],
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <MortgageCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/mortgage-calculator"
        description={metadata.description as string}
        features={['Monthly payment calculation', 'Total interest breakdown', 'Amortization formula', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
