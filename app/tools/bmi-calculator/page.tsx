import type { Metadata } from 'next';
import BmiCalculatorTool from './BmiCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'BMI Calculator Online Free — Body Mass Index | Pixvert',
  description:
    'Calculate your BMI (Body Mass Index) with metric or imperial units. Free online BMI calculator with healthy range chart. Results instant.',
  openGraph: { title: 'BMI Calculator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/bmi-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'BMI Calculator',
  whatIsHeading: 'What is a BMI calculator?',
  whatIsParagraphs: [
    'Body Mass Index (BMI) is a simple measure that uses your height and weight to estimate whether you fall within an underweight, healthy, overweight, or obese range. Pixvert\'s BMI calculator works with both metric (kg, cm) and imperial (lb, ft/in) units, so you can use whichever system you\'re used to.',
    'BMI is calculated by dividing weight in kilograms by height in meters squared, and while it doesn\'t account for factors like muscle mass or body composition, it remains one of the most widely used screening tools by doctors and health organizations for a quick, population-level estimate.',
    'This calculator shows your BMI number alongside a visual healthy-range chart, so you can immediately see where your result falls relative to the standard underweight, normal, overweight, and obese thresholds used internationally.',
  ],
  howToHeading: 'How to calculate your BMI',
  howToSteps: [
    { title: 'Choose your unit system', description: 'select metric (kg/cm) or imperial (lb/ft-in)' },
    { title: 'Enter your height', description: 'type your height in the selected unit' },
    { title: 'Enter your weight', description: 'type your current weight in the selected unit' },
    { title: 'Read your BMI and range', description: 'see your BMI number plotted against the healthy range chart instantly' },
  ],
  useCasesHeading: 'When to use a BMI calculator',
  useCases: [
    { title: 'General health screening', description: 'Get a quick estimate of whether your weight falls within a healthy range for your height.' },
    { title: 'Tracking progress over time', description: 'Recalculate periodically to see how your BMI changes alongside a fitness or nutrition plan.' },
    { title: 'Preparing for a doctor visit', description: 'Know your BMI ahead of a checkup where it\'s commonly discussed.' },
    { title: 'Comparing metric and imperial results', description: 'Switch unit systems to double-check a BMI figure quoted in a different measurement system.' },
  ],
  whyHeading: 'Why use Pixvert\'s BMI calculator?',
  whyReasons: [
    { title: 'Metric and imperial support', description: 'use kilograms and centimeters, or pounds and feet/inches' },
    { title: 'Visual healthy range chart', description: 'see exactly where your result falls, not just a number' },
    { title: '100% private', description: 'your height and weight are calculated locally and never sent to a server' },
    { title: 'Free and instant', description: 'no signup, results update as you type' },
  ],
  faqs: [
    { question: 'How is BMI calculated?', answer: 'BMI = weight (kg) / height (m)². For imperial units, the formula is weight (lb) / height (in)² × 703.' },
    { question: 'What BMI range is considered healthy?', answer: 'A BMI between 18.5 and 24.9 is generally considered a healthy range for adults, according to the standard classification used by health organizations.' },
    { question: 'Does BMI account for muscle mass?', answer: 'No, BMI doesn\'t distinguish between muscle and fat, so very muscular individuals may show a higher BMI without being overweight in terms of body fat.' },
    { question: 'Is my data sent to a server?', answer: 'No, all calculations happen locally in your browser using JavaScript. Your height and weight are never transmitted or stored.' },
    { question: 'Is BMI accurate for children?', answer: 'No, this calculator is designed for adults. Children and teenagers require age- and sex-specific growth charts rather than the standard adult BMI formula.' },
    { question: 'Should I make health decisions based only on BMI?', answer: 'No, BMI is a useful screening tool but doesn\'t capture the full picture of health. Consult a healthcare professional for a complete assessment.' },
  ],
  relatedTools: [
    { href: '/tools/age-calculator', label: 'Age Calculator', description: 'Calculate your exact age in years, months, and days' },
    { href: '/tools/unit-converter', label: 'Unit Converter', description: 'Convert between weight, length, and other units' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages and percentage change' },
    { href: '/tools/date-difference', label: 'Date Difference', description: 'Calculate the number of days between two dates' },
  ],
};

export default function BmiCalculatorPage() {
  return (
    <>
      <BmiCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/bmi-calculator"
        description={metadata.description as string}
        features={['Metric and imperial units', 'Healthy range chart', 'Instant results', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
