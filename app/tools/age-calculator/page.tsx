import type { Metadata } from 'next';
import AgeCalculatorTool from './AgeCalculatorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Age Calculator Online Free — Exact Age in Years Months Days | Pixvert',
  description:
    'Calculate your exact age in years, months, days, weeks, and hours. Free age calculator with next birthday countdown. Works for any date.',
  openGraph: { title: 'Age Calculator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/age-calculator',
  },
};

const seo: ToolSEOData = {
  toolName: 'Age Calculator',
  whatIsHeading: 'What is an age calculator?',
  whatIsParagraphs: [
    'An age calculator computes your exact age from a birth date to today, broken down into years, months, days, weeks, and even hours — far more precise than the single "years old" number most people keep in their head. Pixvert\'s age calculator also shows a live countdown to your next birthday.',
    'Calculating exact age by hand is trickier than it looks because months have different lengths and leap years shift the day count. This tool handles all of that automatically, giving an accurate breakdown for any birth date and any reference date, not just today.',
    'Beyond personal curiosity, exact age calculations are needed for eligibility checks, legal and administrative forms, and anniversary or milestone tracking — all situations where "years old" alone isn\'t precise enough.',
  ],
  howToHeading: 'How to calculate exact age',
  howToSteps: [
    { title: 'Enter the birth date', description: 'select the date of birth you want to calculate age from' },
    { title: 'Choose a reference date', description: 'use today\'s date by default, or pick a specific date to calculate age at that point' },
    { title: 'Read the full breakdown', description: 'see age in years, months, days, weeks, and hours' },
    { title: 'Check the birthday countdown', description: 'see exactly how many days remain until the next birthday' },
  ],
  useCasesHeading: 'When to use an age calculator',
  useCases: [
    { title: 'Eligibility checks', description: 'Verify exact age for age-restricted services, school enrollment cutoffs, or legal requirements.' },
    { title: 'Filling out official forms', description: 'Get a precise age in years and months for documents that require it.' },
    { title: 'Tracking milestones', description: 'Find out exactly how many days old someone is for a special "X days" celebration.' },
    { title: 'Countdown to a birthday', description: 'See exactly how many days remain until the next birthday.' },
    { title: 'Calculating age at a past or future date', description: 'Determine how old someone was, or will be, on a specific date rather than today.' },
  ],
  whyHeading: 'Why use Pixvert\'s age calculator?',
  whyReasons: [
    { title: 'Full breakdown', description: 'age shown in years, months, days, weeks, and hours, not just one number' },
    { title: 'Birthday countdown included', description: 'see the days remaining until the next birthday automatically' },
    { title: '100% private', description: 'dates are calculated locally in your browser and never sent anywhere' },
    { title: 'Free and instant', description: 'no signup, results update as you enter a date' },
  ],
  faqs: [
    { question: 'How is exact age calculated?', answer: 'The tool calculates the full calendar difference between the birth date and the reference date, correctly accounting for varying month lengths and leap years.' },
    { question: 'Can I calculate age at a date other than today?', answer: 'Yes, set a custom reference date to calculate how old someone was, or will be, at that specific point in time.' },
    { question: 'Is my birth date data sent to a server?', answer: 'No, all calculations happen locally in your browser using JavaScript. Your date input is never transmitted or stored.' },
    { question: 'Does the calculator account for leap years?', answer: 'Yes, the date math correctly accounts for leap years when calculating the exact number of days.' },
    { question: 'What is the birthday countdown showing exactly?', answer: 'It shows the number of days remaining until the next occurrence of the birth date, based on the reference date you\'ve set.' },
    { question: 'Can I use this to calculate the age of something other than a person?', answer: 'Yes, the same date math works for calculating the age of any object, document, or event, as long as you know its starting date.' },
  ],
  relatedTools: [
    { href: '/tools/date-difference', label: 'Date Difference', description: 'Calculate the number of days between any two dates' },
    { href: '/tools/bmi-calculator', label: 'BMI Calculator', description: 'Calculate your Body Mass Index' },
    { href: '/tools/unit-converter', label: 'Unit Converter', description: 'Convert between weight, length, and other units' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages and percentage change' },
  ],
};

export default function AgeCalculatorPage() {
  return (
    <>
      <AgeCalculatorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/age-calculator"
        description={metadata.description as string}
        features={['Exact age breakdown', 'Birthday countdown', 'Custom reference date', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
