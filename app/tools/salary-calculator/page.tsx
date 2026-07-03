import type { Metadata } from 'next';
import SalaryCalculatorTool from './SalaryCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Salary Calculator Spain Free — Net Salary IRPF 2024 | Pixvert',
  description:
    'Calculate your net salary in Spain after IRPF and Social Security deductions. Free gross-to-net salary calculator for 2024. 12 or 14 pagas.',
  openGraph: { title: 'Salary Calculator Spain — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/salary-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'Salary Calculator Spain',
  whatIsHeading: 'What is a gross-to-net salary calculator for Spain?',
  whatIsParagraphs: [
    'A salary calculator for Spain converts your gross annual or monthly salary ("salario bruto") into the actual amount you take home ("salario neto") after IRPF income tax withholding and Social Security contributions are deducted. Pixvert\'s salary calculator applies the progressive IRPF brackets and standard Social Security employee contribution rate used in Spain.',
    'Job offers in Spain are almost always quoted in gross terms, which can make it hard to know what actually lands in your bank account each month. This calculator handles both the 12-payment and 14-payment ("14 pagas") salary structures common in Spanish employment contracts, and shows the monthly net figure for each.',
    'IRPF withholding in Spain depends on your income level, personal circumstances, and region, so this calculator provides a close estimate based on the standard national brackets rather than an exact payslip figure — useful for comparing job offers or planning a budget before your first payslip arrives.',
  ],
  howToHeading: 'How to calculate your net salary',
  howToSteps: [
    { title: 'Enter your gross annual salary', description: 'the "salario bruto anual" stated in your contract or job offer' },
    { title: 'Choose 12 or 14 payments', description: 'select whether your salary is paid in 12 monthly installments or split with two extra "pagas extra"' },
    { title: 'Review your net salary', description: 'see the estimated annual and monthly net amount after IRPF and Social Security deductions' },
    { title: 'Compare scenarios', description: 'adjust the gross salary to compare different job offers side by side' },
  ],
  useCasesHeading: 'When to use a salary calculator',
  useCases: [
    { title: 'Comparing job offers', description: 'Convert two gross salary offers to net terms to see which one actually pays more per month.' },
    { title: 'Negotiating a raise', description: 'Understand how much a gross salary increase actually translates into extra take-home pay.' },
    { title: 'Budgeting before a new job starts', description: 'Estimate your monthly net income before your first payslip so you can plan expenses accurately.' },
    { title: 'Understanding a payslip', description: 'Sanity-check the IRPF and Social Security deductions shown on your nómina against an independent estimate.' },
    { title: 'Freelancers moving to payroll', description: 'Compare autónomo income against what an equivalent gross salary as an employee would net.' },
  ],
  whyHeading: 'Why use Pixvert\'s salary calculator?',
  whyReasons: [
    { title: 'Spain-specific calculation', description: 'uses IRPF brackets and Social Security rates applicable in Spain, not a generic international formula' },
    { title: '12 or 14 payment support', description: 'matches how Spanish salaries are actually structured and paid' },
    { title: '100% private', description: 'your salary figures are calculated locally in your browser and never transmitted' },
    { title: 'Free, instant, no signup', description: 'get results immediately without creating an account' },
  ],
  faqs: [
    { question: 'Is my salary information sent to a server?', answer: 'No. The entire calculation runs locally in your browser using JavaScript. Your salary figures are never transmitted or stored anywhere.' },
    { question: 'What is the difference between 12 and 14 payments?', answer: 'Many Spanish contracts pay the annual salary in 12 monthly installments, while others split it into 14 payments by adding two "pagas extra" (usually in summer and December), which changes the monthly net amount.' },
    { question: 'Does this calculator match my exact payslip?', answer: 'It provides a close estimate based on standard national IRPF brackets and Social Security rates. Your actual nómina may differ slightly due to personal circumstances, regional variations, or specific deductions.' },
    { question: 'Does the calculator account for children or personal deductions?', answer: 'This version uses standard brackets without personal or family deductions, so individual circumstances like dependents may lower your actual IRPF withholding compared to the estimate shown.' },
    { question: 'Is this calculator updated for the current tax year?', answer: 'Yes, it uses the IRPF brackets and Social Security contribution rates in effect for the current year.' },
    { question: 'Can I use this if I\'m an autónomo (freelancer)?', answer: 'This calculator is designed for salaried employees under a standard contract. Autónomo taxation follows a different structure with quarterly self-assessments and separate Social Security contributions.' },
  ],
  relatedTools: [
    { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payment' },
    { href: '/tools/vat-calculator', label: 'VAT Calculator', description: 'Calculate Spanish IVA at 21%, 10%, or 4%' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
  ],
};

export default function SalaryCalculatorPage() {
  return (
    <>
      <SalaryCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/salary-calculator"
        description={metadata.description as string}
        features={['IRPF bracket calculation', 'Social Security deduction', '12 or 14 payment support', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
