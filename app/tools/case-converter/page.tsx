import type { Metadata } from 'next';
import CaseConverterTool from './CaseConverterTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Case Converter Online Free — Pixvert',
  description:
    'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Free and instant.',
  openGraph: { title: 'Case Converter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/case-converter',
  },
};

const seo: ToolSEOData = {
  toolName: 'Case Converter',
  whatIsHeading: 'What is a text case converter?',
  whatIsParagraphs: [
    'A case converter changes the capitalization style of text without altering the words themselves. Pixvert\'s case converter supports UPPERCASE, lowercase, Title Case, Sentence case, and the programming-specific styles camelCase, PascalCase, snake_case, and kebab-case — all generated instantly from the same input.',
    'This tool is useful for two very different audiences: writers who need consistent capitalization in headlines or documents, and developers who need to convert a variable or file name between naming conventions, such as turning "user_first_name" into "userFirstName" for JavaScript or "user-first-name" for a URL slug.',
    'Manually retyping text in a different case is slow and error-prone, especially for longer strings or when converting between programming naming conventions where word boundaries need to be tracked precisely. This tool handles all the conversions live as you type.',
  ],
  howToHeading: 'How to convert text case',
  howToSteps: [
    { title: 'Paste or type your text', description: 'enter the text you want to convert into the input box' },
    { title: 'Pick a case style', description: 'choose UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case' },
    { title: 'View the converted result', description: 'the output updates instantly for the selected style' },
    { title: 'Copy the result', description: 'copy the converted text with one click' },
  ],
  useCasesHeading: 'When to use a case converter',
  useCases: [
    { title: 'Writing headlines', description: 'Convert a sentence to Title Case for a blog post title or Sentence case for a subheading.' },
    { title: 'Renaming variables', description: 'Convert a variable name from snake_case to camelCase when moving code between languages with different conventions.' },
    { title: 'Creating URL slugs', description: 'Convert a page title to kebab-case for use in a clean, readable URL.' },
    { title: 'Formatting class names', description: 'Convert a name to PascalCase for a component or class name in object-oriented code.' },
    { title: 'Cleaning up pasted text', description: 'Fix text pasted from a source with inconsistent or all-caps formatting.' },
  ],
  whyHeading: 'Why use Pixvert\'s case converter?',
  whyReasons: [
    { title: 'Eight case styles in one tool', description: 'covers both writing styles and programming naming conventions' },
    { title: '100% local', description: 'your text is processed entirely in your browser and never sent to a server' },
    { title: 'Instant, live conversion', description: 'no button to click — results update as you type' },
    { title: 'Free, no signup', description: 'convert as much text as you need at no cost' },
  ],
  faqs: [
    { question: 'Is my text sent to a server?', answer: 'No, all case conversion happens locally in your browser using JavaScript. Nothing is transmitted or stored.' },
    { question: 'What\'s the difference between camelCase and PascalCase?', answer: 'camelCase starts with a lowercase letter (userName), while PascalCase starts with an uppercase letter (UserName). Both remove spaces and capitalize each subsequent word.' },
    { question: 'How does Title Case handle small words like "and" or "the"?', answer: 'The tool capitalizes the first letter of every word by default. For style guides that lowercase certain small words, you may need to adjust those manually after conversion.' },
    { question: 'Can I convert code variable names with this tool?', answer: 'Yes, snake_case, camelCase, PascalCase, and kebab-case are all commonly used in programming, and this tool converts between them directly.' },
    { question: 'Does the tool handle punctuation and numbers correctly?', answer: 'Yes, punctuation is preserved for writing case styles (UPPERCASE, lowercase, Title Case, Sentence case), while programming case styles strip spaces and special characters to form valid identifiers.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though very large amounts of text may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/text-to-slug', label: 'Text to Slug', description: 'Convert text into a clean, URL-safe slug' },
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count words, characters, and reading time' },
    { href: '/tools/remove-accents', label: 'Remove Accents', description: 'Strip accents and diacritics from text' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two texts and highlight differences' },
  ],
};

export default function CaseConverterPage() {
  return (
    <>
      <CaseConverterTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/case-converter"
        description={metadata.description as string}
        features={['UPPERCASE / lowercase', 'Title & Sentence case', 'camelCase / PascalCase', 'snake_case / kebab-case', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
