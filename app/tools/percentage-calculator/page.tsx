import type { Metadata } from 'next';
import PercentageCalculatorTool from './PercentageCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Percentage Calculator Online Free — 5 Calculators | Pixvert',
  description:
    'Calculate percentages, percentage change, add or subtract a percentage, and more. Free online percentage calculator — 5 modes, instant results.',
  openGraph: { title: 'Percentage Calculator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/percentage-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'Percentage Calculator',
  whatIsHeading: 'What is a percentage calculator?',
  whatIsParagraphs: [
    'A percentage calculator solves the different types of percentage problems people run into daily — what is X% of Y, what percentage is A of B, what is the percentage change between two numbers, and how to add or subtract a percentage from a value. Pixvert\'s percentage calculator covers all five common modes in one tool.',
    'Percentage math looks simple but is easy to get wrong by hand, especially percentage change and reverse percentage calculations, which require dividing by the original value rather than the new one. This calculator removes that risk by handling the formula correctly every time.',
    'Whether you\'re figuring out a discount at checkout, a tip, an exam grade, or how much a value has grown or shrunk over time, this tool gives an instant, accurate answer without needing to remember which formula applies to which situation.',
  ],
  howToHeading: 'How to calculate a percentage',
  howToSteps: [
    { title: 'Choose a calculation mode', description: 'select what X% of Y, X is what % of Y, percentage change, or percentage increase/decrease' },
    { title: 'Enter your numbers', description: 'type the values relevant to the mode you selected' },
    { title: 'Read the instant result', description: 'the answer updates live as you type' },
    { title: 'Switch modes as needed', description: 'reuse the tool for a different type of percentage question without starting over' },
  ],
  useCasesHeading: 'When to use a percentage calculator',
  useCases: [
    { title: 'Calculating discounts', description: 'Find the sale price after a percentage discount, or work out what percentage a sale price represents off the original.' },
    { title: 'Tracking growth or decline', description: 'Calculate the percentage change between two values, like revenue this year versus last year.' },
    { title: 'Grading and scoring', description: 'Convert a raw score out of a total into a percentage grade.' },
    { title: 'Tipping and splitting bills', description: 'Quickly calculate a percentage tip on a bill total.' },
    { title: 'Financial planning', description: 'Work out what percentage of your income a specific expense represents.' },
  ],
  whyHeading: 'Why use Pixvert\'s percentage calculator?',
  whyReasons: [
    { title: 'Five calculation modes', description: 'covers the most common percentage problems in one place' },
    { title: 'Correct formulas built in', description: 'no risk of using the wrong base value for percentage change calculations' },
    { title: '100% private', description: 'calculations run locally in your browser, nothing is sent anywhere' },
    { title: 'Free and instant', description: 'no signup, results update as you type' },
  ],
  faqs: [
    { question: 'How do I calculate what percentage one number is of another?', answer: 'Divide the part by the whole and multiply by 100. For example, 25 out of 200 is (25/200) × 100 = 12.5%. Select that mode and the calculator does this instantly.' },
    { question: 'What is the correct formula for percentage change?', answer: 'Percentage change is (new value − old value) / old value × 100. Using the wrong denominator is the most common mistake when calculating this by hand.' },
    { question: 'How do I add a percentage to a number?', answer: 'Multiply the number by (1 + percentage/100). For example, adding 15% to 200 gives 200 × 1.15 = 230.' },
    { question: 'Is my data sent to a server?', answer: 'No, all calculations happen locally in your browser using JavaScript. Nothing you enter is transmitted or stored.' },
    { question: 'Can I calculate a percentage decrease?', answer: 'Yes, the percentage increase/decrease mode handles both directions — enter a negative change to calculate a decrease.' },
    { question: 'Is there a limit to the numbers I can use?', answer: 'No practical limit — the calculator works with any positive or negative numbers, including decimals.' },
  ],
  relatedTools: [
    { href: '/tools/vat-calculator', label: 'VAT Calculator', description: 'Calculate Spanish IVA at 21%, 10%, or 4%' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
    { href: '/tools/salary-calculator', label: 'Salary Calculator', description: 'Calculate net salary after tax deductions' },
    { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payment' },
  ],
};

export default function PercentageCalculatorPage() {
  return (
    <>
      <PercentageCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/percentage-calculator"
        description={metadata.description as string}
        features={['5 calculation modes', 'Percentage change', 'Increase/decrease', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
