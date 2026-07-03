import type { Metadata } from 'next';
import UuidGeneratorTool from './UuidGeneratorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'UUID Generator Free Online — v4 UUIDs | Pixvert',
  description:
    'Generate version 4 UUIDs instantly. Bulk generation up to 100 at once. Uppercase and no-dash options. Copy all with one click.',
  openGraph: { title: 'UUID Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/uuid-generator',
  },
};

const seo: ToolSEOData = {
  toolName: 'UUID Generator',
  whatIsHeading: 'What is a UUID?',
  whatIsParagraphs: [
    'A UUID (Universally Unique Identifier) is a 128-bit value, usually written as 32 hexadecimal characters split into five groups (like 550e8400-e29b-41d4-a716-446655440000), designed to be unique across systems without any central coordination. Pixvert\'s UUID generator creates version 4 UUIDs — the random-based version most commonly used in software.',
    'Version 4 UUIDs are generated using random or pseudo-random numbers, and the probability of two generated UUIDs colliding is so astronomically low that they\'re treated as guaranteed-unique in practice — used as database primary keys, session identifiers, file names, and request tracking IDs across countless independent systems.',
    'This generator uses `crypto.randomUUID()`, the standard browser API for cryptographically strong UUID generation, and supports bulk generation of up to 100 at once, plus formatting options like uppercase letters or removing the dashes.',
  ],
  howToHeading: 'How to generate a UUID',
  howToSteps: [
    { title: 'Set the quantity', description: 'choose how many UUIDs you need, up to 100 at once' },
    { title: 'Choose formatting options', description: 'toggle uppercase letters or remove dashes if your use case requires it' },
    { title: 'Generate', description: 'UUIDs are created instantly using the browser\'s crypto API' },
    { title: 'Copy all', description: 'copy the full list with one click, ready to paste into code, a database, or a spreadsheet' },
  ],
  useCasesHeading: 'When to use a UUID generator',
  useCases: [
    { title: 'Database primary keys', description: 'Generate unique IDs for records that need to be unique across distributed systems without a central counter.' },
    { title: 'API request tracing', description: 'Create a unique identifier to trace a single request across multiple services or logs.' },
    { title: 'Test data and seed scripts', description: 'Quickly generate a batch of realistic unique IDs for populating a development or test database.' },
    { title: 'File and session naming', description: 'Use a UUID as a unique, collision-free file name or session token.' },
  ],
  whyHeading: 'Why use Pixvert\'s UUID generator?',
  whyReasons: [
    { title: 'Cryptographically random', description: 'built on crypto.randomUUID(), the standard secure browser API' },
    { title: 'Bulk generation', description: 'generate up to 100 UUIDs at once instead of one at a time' },
    { title: 'Formatting options', description: 'uppercase or no-dash variants to match your system\'s requirements' },
    { title: '100% local, free, no signup', description: 'UUIDs are generated in your browser and never logged' },
  ],
  faqs: [
    { question: 'What UUID version does this tool generate?', answer: 'Version 4, which is generated using random numbers rather than being derived from a timestamp or hardware address — the most commonly used version in modern software.' },
    { question: 'How likely is a UUID collision?', answer: 'Extremely unlikely. With 122 random bits, you would need to generate roughly a trillion UUIDs per second for about 85 years before a 50% chance of any collision, per the UUID specification.' },
    { question: 'Are these UUIDs sent to a server or logged?', answer: 'No, generation happens entirely in your browser using the Web Crypto API. Nothing is transmitted or stored.' },
    { question: 'Can I generate UUIDs without dashes?', answer: 'Yes, toggle the no-dash option to get a compact 32-character hexadecimal string instead of the standard dashed format.' },
    { question: 'Can I generate more than 100 at once?', answer: 'The tool caps bulk generation at 100 per batch. For larger volumes, run the generator multiple times or generate UUIDs programmatically in your own code.' },
    { question: 'Are these UUIDs suitable for production use?', answer: 'Yes, they\'re generated using the same cryptographically secure random source browsers use elsewhere, making them suitable for real database keys, tokens, or identifiers.' },
  ],
  relatedTools: [
    { href: '/tools/password-generator', label: 'Password Generator', description: 'Generate strong, random passwords' },
    { href: '/tools/random-numbers', label: 'Random Number Generator', description: 'Generate random integers or floats' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format and validate JSON with generated IDs' },
    { href: '/tools/base64-text', label: 'Base64 Text', description: 'Encode or decode text as Base64' },
  ],
};

export default function UuidGeneratorPage() {
  return (
    <>
      <UuidGeneratorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/uuid-generator"
        description={metadata.description as string}
        features={['UUID v4 generation', 'Bulk up to 100', 'Uppercase / no-dash options', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
