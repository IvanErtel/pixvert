import type { Metadata } from 'next';
import TextDiffTool from './TextDiffTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Text Diff Checker Online Free — Pixvert',
  description:
    'Compare two texts and highlight the differences. Line-by-line diff with added and removed lines clearly marked. Free and private.',
  openGraph: { title: 'Text Diff Checker — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/text-diff',
  },
};

const seo: ToolSEOData = {
  toolName: 'Text Diff Checker',
  whatIsHeading: 'What is a text diff checker?',
  whatIsParagraphs: [
    'A text diff checker compares two blocks of text and highlights exactly what changed between them — lines added, lines removed, and lines that stayed the same — instead of making you scan both versions manually to spot differences. Pixvert\'s text diff tool performs this comparison line by line, color-coding additions and deletions clearly.',
    'Spotting the difference between two similar paragraphs, contracts, code snippets, or configuration files by eye is slow and error-prone, especially when the changes are small but important — a single word, a changed number, a missing line. A diff tool makes every change immediately visible.',
    'This tool is useful anywhere two versions of text need to be compared: reviewing an edited document against its original, checking what changed between two drafts of an article, or comparing two versions of a config file or code snippet without needing a full version control setup.',
  ],
  howToHeading: 'How to compare two texts',
  howToSteps: [
    { title: 'Paste the original text', description: 'enter the first version in the left panel' },
    { title: 'Paste the modified text', description: 'enter the second version in the right panel' },
    { title: 'Review the highlighted diff', description: 'added and removed lines are color-coded automatically' },
    { title: 'Scan for the specific changes', description: 'quickly identify exactly what was added, removed, or kept the same' },
  ],
  useCasesHeading: 'When to use a text diff checker',
  useCases: [
    { title: 'Reviewing document edits', description: 'Compare an edited contract, article, or report against its original version to see exactly what changed.' },
    { title: 'Comparing code or config snippets', description: 'Spot differences between two versions of a script or configuration file without a full Git setup.' },
    { title: 'Checking translation or localization changes', description: 'Compare two versions of translated text to verify what content was updated.' },
    { title: 'Auditing copy changes', description: 'Verify that only the intended changes were made to a piece of marketing or legal copy.' },
  ],
  whyHeading: 'Why use Pixvert\'s text diff checker?',
  whyReasons: [
    { title: 'Clear, color-coded diff', description: 'added and removed lines are immediately visible' },
    { title: '100% local and private', description: 'both texts are compared entirely in your browser' },
    { title: 'No signup, no limits', description: 'compare as much text as you need' },
    { title: 'Works with any plain text', description: 'documents, code, config files, or any text content' },
  ],
  faqs: [
    { question: 'Is my text sent to a server?', answer: 'No, the comparison happens entirely in your browser using JavaScript. Neither text is transmitted or stored.' },
    { question: 'Does the tool compare word by word or line by line?', answer: 'The comparison is line-by-line, showing which lines were added, removed, or unchanged between the two versions.' },
    { question: 'Can I compare code with this tool?', answer: 'Yes, it works with any plain text, including code, configuration files, and structured data, though it doesn\'t apply language-specific syntax highlighting.' },
    { question: 'Does capitalization or whitespace affect the diff?', answer: 'Yes, the comparison is exact by default, so differences in capitalization, spacing, or line endings will be flagged as changes.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though very large documents may take a moment to process depending on your device.' },
    { question: 'Can I use this to compare two files instead of pasted text?', answer: 'Currently the tool works with pasted text — open your files in a text editor, copy the contents, and paste them into each panel.' },
  ],
  relatedTools: [
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count words, characters, and reading time' },
    { href: '/tools/remove-blank-lines', label: 'Remove Blank Lines', description: 'Clean up text before comparing it' },
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Normalize text case before comparing' },
    { href: '/tools/word-frequency', label: 'Word Frequency', description: 'See which words appear most often in a text' },
  ],
};

export default function TextDiffPage() {
  return (
    <>
      <TextDiffTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/text-diff"
        description={metadata.description as string}
        features={['Line-by-line diff', 'Color-coded changes', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
