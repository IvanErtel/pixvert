import type { Metadata } from 'next';
import RemoveAccentsTool from './RemoveAccentsTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Remove Accents Online Free — Pixvert',
  description:
    'Remove accents and diacritics from text. Converts é→e, ñ→n, ü→u, ç→c, and all Unicode diacritics. Free and instant.',
  openGraph: { title: 'Remove Accents — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/remove-accents',
  },
};

const seo: ToolSEOData = {
  toolName: 'Remove Accents',
  whatIsHeading: 'What does removing accents from text do?',
  whatIsParagraphs: [
    'Removing accents converts letters with diacritical marks — é, ñ, ü, ç, and similar characters from Spanish, French, Portuguese, German, and other languages — into their plain ASCII equivalent (e, n, u, c). Pixvert\'s accent remover handles the full range of Unicode diacritics automatically, instantly stripping them from any text you paste in.',
    'Accented characters are essential for correct spelling and reading, but they can cause problems in systems that expect plain ASCII text: older databases, certain file naming conventions, URL slugs, or search systems that don\'t normalize accents consistently. In those contexts, converting "café" to "cafe" avoids encoding errors or mismatched search results.',
    'This tool is especially useful for generating clean filenames, database keys, or usernames from text originally written in a language with accented characters, without manually retyping every word.',
  ],
  howToHeading: 'How to remove accents from text',
  howToSteps: [
    { title: 'Paste your text', description: 'enter text containing accented characters or diacritics' },
    { title: 'View the converted result', description: 'accents are stripped instantly, replaced with their plain letter equivalent' },
    { title: 'Copy the result', description: 'copy the accent-free text with one click' },
  ],
  useCasesHeading: 'When to remove accents from text',
  useCases: [
    { title: 'Generating filenames or slugs', description: 'Create clean, ASCII-safe filenames or URL slugs from titles that contain accented characters.' },
    { title: 'Database keys and usernames', description: 'Normalize text for systems that expect plain ASCII identifiers without diacritics.' },
    { title: 'Fixing search and sorting issues', description: 'Standardize text so accented and unaccented versions of the same word match consistently.' },
    { title: 'Legacy system compatibility', description: 'Prepare text for older software or file formats that don\'t handle Unicode diacritics correctly.' },
  ],
  whyHeading: 'Why use Pixvert\'s accent remover?',
  whyReasons: [
    { title: 'Full Unicode diacritic support', description: 'handles accented characters from Spanish, French, Portuguese, German, and more' },
    { title: 'Instant conversion', description: 'no button to click — results update as you type' },
    { title: '100% local and private', description: 'your text is processed entirely in your browser' },
    { title: 'Free, no signup', description: 'convert as much text as you need' },
  ],
  faqs: [
    { question: 'Is my text sent to a server?', answer: 'No, all conversion happens locally in your browser using JavaScript. Nothing is transmitted or stored.' },
    { question: 'Which languages\' accents does this tool handle?', answer: 'It covers the full range of Unicode diacritics, including characters common in Spanish, French, Portuguese, German, Italian, and many other languages using the Latin alphabet.' },
    { question: 'Does removing accents change the meaning of words?', answer: 'It can, since accents sometimes distinguish words (like "sí" meaning "yes" versus "si" meaning "if" in Spanish). Use this tool when ASCII compatibility matters more than preserving that distinction.' },
    { question: 'Will this convert non-Latin scripts like Cyrillic or Arabic?', answer: 'No, this tool specifically strips diacritical marks from Latin-based accented characters. Non-Latin scripts require a different kind of transliteration.' },
    { question: 'Can I use this for generating URL slugs?', answer: 'Yes, removing accents is often the first step before slugifying text — for a complete URL-ready slug with separators, use Pixvert\'s dedicated Text to Slug tool.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though very long text may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/text-to-slug', label: 'Text to Slug', description: 'Convert text into a clean, URL-safe slug' },
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Convert text between different capitalization styles' },
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count words, characters, and reading time' },
    { href: '/tools/url-encoder', label: 'URL Encoder', description: 'Encode or decode text for safe use in URLs' },
  ],
};

export default function RemoveAccentsPage() {
  return (
    <>
      <RemoveAccentsTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/remove-accents"
        description={metadata.description as string}
        features={['Removes diacritics', 'Full Unicode support', 'Instant conversion', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
