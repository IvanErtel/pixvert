import type { Metadata } from 'next';
import WordFrequencyTool from './WordFrequencyTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Word Frequency Counter Online Free — Pixvert',
  description:
    'Count how many times each word appears in a text. Sort by frequency or alphabetically. Free and private.',
  openGraph: { title: 'Word Frequency Counter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/word-frequency',
  },
};

const seo: ToolSEOData = {
  toolName: 'Word Frequency Counter',
  whatIsHeading: 'What is a word frequency counter?',
  whatIsParagraphs: [
    'A word frequency counter analyzes a piece of text and counts how many times each unique word appears, then lets you sort the results by frequency (most-used first) or alphabetically. Pixvert\'s word frequency tool processes any length of text instantly, giving a clear breakdown of which words dominate the content.',
    'Word frequency analysis is a common technique in content review, keyword research, and even basic linguistic or plagiarism-adjacent checks — spotting overused words in a draft, checking whether a target keyword appears often enough for SEO purposes, or analyzing repeated phrases in a script or speech.',
    'This is more precise than eyeballing a document for repetition, especially for longer texts where a word repeated a dozen times across several pages is easy to miss just by reading.',
  ],
  howToHeading: 'How to check word frequency',
  howToSteps: [
    { title: 'Paste your text', description: 'drop in the article, script, or document you want to analyze' },
    { title: 'Review the frequency list', description: 'see every unique word with its count' },
    { title: 'Sort the results', description: 'switch between sorting by frequency (highest first) or alphabetically' },
    { title: 'Identify overused or key terms', description: 'spot words that appear more or less often than expected' },
  ],
  useCasesHeading: 'When to use a word frequency counter',
  useCases: [
    { title: 'Editing and proofreading', description: 'Catch words you\'ve unintentionally overused throughout a piece of writing.' },
    { title: 'SEO keyword density checks', description: 'Verify how often a target keyword appears in a page\'s content relative to its total length.' },
    { title: 'Analyzing speeches or scripts', description: 'See which words or phrases are repeated most in a transcript or script.' },
    { title: 'Studying text and language patterns', description: 'Explore vocabulary usage in a document for linguistic analysis or research.' },
  ],
  whyHeading: 'Why use Pixvert\'s word frequency counter?',
  whyReasons: [
    { title: 'Instant, accurate counts', description: 'no manual counting or guessing, every word is tallied precisely' },
    { title: 'Flexible sorting', description: 'view results by frequency or alphabetically' },
    { title: '100% local and private', description: 'your text is analyzed entirely in your browser' },
    { title: 'Free, no signup, no limits', description: 'analyze as much text as you need' },
  ],
  faqs: [
    { question: 'Is my text sent to a server?', answer: 'No, all analysis happens locally in your browser using JavaScript. Your text is never transmitted or stored.' },
    { question: 'Does the tool count common words like "the" or "and"?', answer: 'Yes, every word is counted as it appears. If you want to focus on meaningful keywords, mentally filter out common function words from the results, or look further down the frequency list.' },
    { question: 'Is the count case-sensitive?', answer: 'No, the counter typically treats words the same regardless of capitalization, so "Word" and "word" are counted together.' },
    { question: 'Does punctuation affect word counting?', answer: 'Punctuation is stripped before counting, so "word," and "word" are treated as the same word.' },
    { question: 'Can I use this for keyword density in SEO?', answer: 'Yes, paste your page content to see how many times a specific keyword appears relative to the total word count, useful for avoiding both under- and over-optimization.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though very long documents may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count total words, characters, and reading time' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two texts and highlight differences' },
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Normalize text case before analysis' },
    { href: '/tools/remove-blank-lines', label: 'Remove Blank Lines', description: 'Clean up text before analyzing it' },
  ],
};

export default function WordFrequencyPage() {
  return (
    <>
      <WordFrequencyTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/word-frequency"
        description={metadata.description as string}
        features={['Word frequency count', 'Sort by frequency or alphabetically', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
