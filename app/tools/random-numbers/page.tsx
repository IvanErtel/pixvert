import type { Metadata } from 'next';
import RandomNumbersTool from './RandomNumbersTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Random Number Generator Free Online | Pixvert',
  description:
    'Generate random integers or floats in any range. Unique numbers, bulk generation up to 1000, sorted output, and live statistics.',
  openGraph: { title: 'Random Number Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/random-numbers',
  },
};

const seo: ToolSEOData = {
  toolName: 'Random Number Generator',
  whatIsHeading: 'What is a random number generator?',
  whatIsParagraphs: [
    'A random number generator produces one or more numbers within a range you specify, with no predictable pattern. Pixvert\'s random number generator supports both integers and decimals, lets you generate up to 1,000 numbers at once, and includes an option to guarantee every number in a batch is unique — useful for anything from picking a raffle winner to generating test data.',
    'Beyond a single random pick, this tool is built for bulk use cases: generating a large sample of test values, drawing multiple unique winners from a range of ticket numbers, or producing a randomized dataset for a simulation or statistics exercise.',
    'The generator also shows live statistics for your batch — minimum, maximum, average, and sum — so you can immediately sanity-check the distribution of a generated set without pasting it into a separate calculator.',
  ],
  howToHeading: 'How to generate random numbers',
  howToSteps: [
    { title: 'Set the range', description: 'enter the minimum and maximum values' },
    { title: 'Choose integer or float', description: 'select whole numbers or decimals with your preferred precision' },
    { title: 'Set the quantity', description: 'generate a single number or up to 1,000 at once' },
    { title: 'Enable uniqueness if needed', description: 'toggle the option to avoid duplicate numbers in the batch' },
    { title: 'Generate and copy', description: 'view the results, sort them if needed, and copy the list' },
  ],
  useCasesHeading: 'When to use a random number generator',
  useCases: [
    { title: 'Raffles and giveaways', description: 'Draw one or more unique winning numbers from a range of ticket numbers.' },
    { title: 'Test and sample data', description: 'Generate a bulk set of random values to populate a test database or spreadsheet.' },
    { title: 'Statistics and probability exercises', description: 'Produce a randomized dataset for classroom exercises or simulations.' },
    { title: 'Games and decision-making', description: 'Roll a random number to settle a decision or add randomness to a game.' },
    { title: 'Sampling from a dataset', description: 'Generate unique random indices to pick a representative sample from a larger list.' },
  ],
  whyHeading: 'Why use Pixvert\'s random number generator?',
  whyReasons: [
    { title: 'Bulk generation up to 1,000', description: 'generate large batches in a single pass instead of one at a time' },
    { title: 'Guaranteed uniqueness option', description: 'avoid duplicate numbers when you need distinct values' },
    { title: 'Live statistics', description: 'see min, max, average, and sum for the generated batch instantly' },
    { title: '100% private, free, no signup', description: 'numbers are generated entirely in your browser' },
  ],
  faqs: [
    { question: 'Are these numbers truly random?', answer: 'The generator uses your browser\'s random number source, which is suitable for everyday use like raffles, sampling, and testing. For cryptographic purposes, use a tool built specifically on the Web Crypto API.' },
    { question: 'Can I generate numbers without duplicates?', answer: 'Yes, enable the unique numbers option to ensure every value in a batch is distinct — useful for raffles or sampling without repetition.' },
    { question: 'What\'s the maximum quantity I can generate at once?', answer: 'Up to 1,000 numbers in a single batch. For larger volumes, run the generator multiple times.' },
    { question: 'Is my data sent to a server?', answer: 'No, all generation happens locally in your browser using JavaScript. Nothing is transmitted or stored.' },
    { question: 'Can I generate decimal numbers, not just integers?', answer: 'Yes, switch to float mode and the generator produces decimal numbers within your specified range and precision.' },
    { question: 'Can I sort the generated numbers?', answer: 'Yes, the results can be sorted ascending or descending after generation.' },
  ],
  relatedTools: [
    { href: '/tools/uuid-generator', label: 'UUID Generator', description: 'Generate unique identifiers (UUID v4)' },
    { href: '/tools/password-generator', label: 'Password Generator', description: 'Generate strong, cryptographically random passwords' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages and percentage change' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
  ],
};

export default function RandomNumbersPage() {
  return (
    <>
      <RandomNumbersTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/random-numbers"
        description={metadata.description as string}
        features={['Integer or float', 'Bulk generation up to 1000', 'Unique numbers option', 'Live statistics']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
