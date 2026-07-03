import type { Metadata } from 'next';
import VatCalculatorTool from './VatCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'VAT Calculator Spain Free — IVA 21% 10% 4% | Pixvert',
  description:
    'Add or extract Spanish VAT (IVA) at 21%, 10%, or 4%. Free online VAT calculator — results update instantly, no signup needed.',
  openGraph: { title: 'VAT Calculator Spain — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/vat-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'VAT Calculator Spain',
  whatIsHeading: 'What is a VAT (IVA) calculator for Spain?',
  whatIsParagraphs: [
    'A VAT calculator adds or removes Spanish value-added tax (IVA — Impuesto sobre el Valor Añadido) from a price. Pixvert\'s VAT calculator supports all three Spanish IVA rates: the general 21% rate applied to most goods and services, the reduced 10% rate for items like hospitality and transport, and the super-reduced 4% rate for basic necessities like bread, milk, and books.',
    'The tool works in both directions: enter a price without VAT to see the total with tax added, or enter a price that already includes VAT to extract the tax amount and the pre-tax base. This second calculation — going from a VAT-inclusive price back to the base — is something people frequently need but is easy to get wrong by hand, since you can\'t simply subtract the percentage from the total.',
    'Freelancers (autónomos), small business owners, and anyone issuing or checking invoices in Spain rely on quick, accurate IVA calculations regularly. This calculator gives instant results without needing to remember the formulas or open a spreadsheet.',
  ],
  howToHeading: 'How to calculate VAT (IVA)',
  howToSteps: [
    { title: 'Enter your price', description: 'type the base price (without VAT) or the total price (with VAT already included)' },
    { title: 'Select the IVA rate', description: 'choose 21% (general), 10% (reduced), or 4% (super-reduced) depending on the product or service' },
    { title: 'Choose the direction', description: 'add VAT to a base price, or extract VAT from a total price' },
    { title: 'Read the breakdown', description: 'see the base amount, the VAT amount, and the total, all calculated instantly' },
  ],
  useCasesHeading: 'When to use a VAT calculator',
  useCases: [
    { title: 'Issuing invoices as an autónomo', description: 'Quickly calculate the IVA to add to a service price before sending an invoice.' },
    { title: 'Checking a receipt or invoice', description: 'Verify that the VAT charged on a purchase matches the correct rate for that product category.' },
    { title: 'Pricing products for sale', description: 'Work out what price to charge including IVA to hit a target pre-tax revenue.' },
    { title: 'Budgeting business expenses', description: 'Extract the VAT-deductible portion from a business expense for accounting purposes.' },
    { title: 'Comparing prices across regions', description: 'Understand how different reduced VAT rates affect the final price of specific goods.' },
  ],
  whyHeading: 'Why use Pixvert\'s VAT calculator?',
  whyReasons: [
    { title: 'All three Spanish IVA rates', description: '21%, 10%, and 4% covered in one tool' },
    { title: 'Works both ways', description: 'add VAT to a base price or extract it from a total price' },
    { title: '100% private and local', description: 'calculations happen in your browser, nothing is sent to a server' },
    { title: 'Free and instant', description: 'no signup, no limits, results update as you type' },
  ],
  faqs: [
    { question: 'What are the current IVA rates in Spain?', answer: 'Spain applies three VAT rates: 21% (general rate, most goods and services), 10% (reduced rate, e.g. hospitality and passenger transport), and 4% (super-reduced rate, e.g. basic food items, books, and medicines).' },
    { question: 'How do I remove VAT from a total price?', answer: 'Divide the total price by 1 plus the VAT rate as a decimal (for example, divide by 1.21 for 21% VAT) to get the base price, then subtract the base from the total to get the VAT amount. This calculator does that automatically.' },
    { question: 'Why can\'t I just subtract 21% from the total to get the base price?', answer: 'Because the 21% was calculated on the base price, not the total. Subtracting 21% of the total overcorrects — you need to divide by 1.21 instead, which is what this calculator does correctly.' },
    { question: 'Is this calculator only for Spain?', answer: 'It\'s built around the specific IVA rates used in Spain (21%, 10%, 4%). For other countries\' VAT or GST rates, you would need a calculator using that country\'s specific percentages.' },
    { question: 'Is my price data sent anywhere?', answer: 'No, all calculations happen locally in your browser. Nothing you enter is transmitted to a server or stored.' },
    { question: 'Which IVA rate applies to my product or service?', answer: 'It depends on the category defined by Spanish tax law — most goods and services fall under the general 21% rate, with reduced rates applying to specific categories. Check the official AEAT guidance if you\'re unsure which rate applies to your case.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Salary Calculator', description: 'Calculate net salary in Spain after IRPF and Social Security' },
    { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payment' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
  ],
};

export default function VatCalculatorPage() {
  return (
    <>
      <VatCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/vat-calculator"
        description={metadata.description as string}
        features={['21%, 10%, 4% IVA rates', 'Add or extract VAT', 'Instant results', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
