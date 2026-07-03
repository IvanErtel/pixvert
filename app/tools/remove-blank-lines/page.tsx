import type { Metadata } from 'next';
import RemoveBlankLinesTool from './RemoveBlankLinesTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Remove Blank Lines Online Free — Pixvert',
  description:
    'Remove all blank lines or collapse multiple blank lines into one. Also trim trailing whitespace. Free and instant.',
  openGraph: { title: 'Remove Blank Lines — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/remove-blank-lines',
  },
};

const seo: ToolSEOData = {
  toolName: 'Remove Blank Lines',
  whatIsHeading: 'What does a blank line remover do?',
  whatIsParagraphs: [
    'A blank line remover cleans up text by deleting empty lines, or collapsing runs of multiple blank lines down to a single one. Pixvert\'s tool also trims trailing whitespace from the end of each line, which is invisible on screen but can cause subtle formatting or version-control issues.',
    'Text pasted from PDFs, emails, spreadsheets, or old documents often ends up with inconsistent spacing — double or triple blank lines between paragraphs, or lines that look empty but actually contain trailing spaces or tabs. This tool normalizes all of that in one pass.',
    'This is especially useful before pasting text into a CMS, a code file, a config file, or any place where extra blank lines create unwanted visual gaps or make a diff harder to read.',
  ],
  howToHeading: 'How to remove blank lines from text',
  howToSteps: [
    { title: 'Paste your text', description: 'drop in the text you want to clean up' },
    { title: 'Choose a mode', description: 'remove all blank lines entirely, or collapse multiple blank lines into one' },
    { title: 'Review the result', description: 'the cleaned text updates instantly' },
    { title: 'Copy the result', description: 'copy the cleaned text with one click' },
  ],
  useCasesHeading: 'When to use a blank line remover',
  useCases: [
    { title: 'Cleaning pasted text', description: 'Fix inconsistent spacing from text copied out of a PDF, email, or document.' },
    { title: 'Preparing code or config files', description: 'Remove unnecessary empty lines before committing a file, keeping diffs clean.' },
    { title: 'Formatting content for a CMS', description: 'Strip extra blank lines that would otherwise create large visual gaps on a published page.' },
    { title: 'Cleaning up exported data', description: 'Remove empty rows left behind after exporting or copying tabular text.' },
  ],
  whyHeading: 'Why use Pixvert\'s blank line remover?',
  whyReasons: [
    { title: 'Two cleanup modes', description: 'remove all blank lines, or just collapse extras down to one' },
    { title: 'Trims trailing whitespace too', description: 'catches invisible spaces and tabs at the end of lines' },
    { title: '100% local and private', description: 'your text is processed entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'clean up as much text as you need' },
  ],
  faqs: [
    { question: 'What\'s the difference between removing and collapsing blank lines?', answer: 'Removing deletes every blank line entirely, joining all content tightly together. Collapsing keeps paragraph breaks but reduces any run of multiple blank lines down to just one.' },
    { question: 'Is my text sent to a server?', answer: 'No, all processing happens locally in your browser using JavaScript. Nothing is transmitted or stored.' },
    { question: 'Does the tool remove trailing spaces on non-blank lines too?', answer: 'Yes, trailing whitespace at the end of every line is trimmed, whether the line is blank or contains text.' },
    { question: 'Will this affect the indentation inside my lines?', answer: 'No, leading whitespace (indentation) within lines that contain text is preserved — only blank lines and trailing whitespace are affected.' },
    { question: 'Can I use this on code files?', answer: 'Yes, it works on any plain text, including code, though be cautious with languages where blank lines carry semantic meaning (rare, but check your specific use case).' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though very large documents may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count words, characters, and reading time' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two texts and highlight differences' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print and clean up HTML markup' },
    { href: '/tools/word-frequency', label: 'Word Frequency', description: 'See which words appear most often in your text' },
  ],
};

export default function RemoveBlankLinesPage() {
  return (
    <>
      <RemoveBlankLinesTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/remove-blank-lines"
        description={metadata.description as string}
        features={['Remove all blank lines', 'Collapse multiple blank lines', 'Trim trailing whitespace', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
