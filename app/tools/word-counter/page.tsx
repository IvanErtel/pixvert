import type { Metadata } from 'next';
import WordCounterTool from './WordCounterTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Word Counter Online Free — Pixvert',
  description:
    'Count words, characters, sentences, paragraphs, and reading time in real time. Free, private, no upload.',
  openGraph: { title: 'Word Counter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/word-counter',
  },
};

const seo: ToolSEOData = {
  toolName: 'Word Counter',
  whatIsHeading: 'What is a word counter?',
  whatIsParagraphs: [
    'A word counter is a tool that instantly tells you how many words, characters, sentences, and paragraphs are in a piece of text, along with an estimated reading time. Pixvert\'s word counter updates all of these numbers live as you type or paste text, so you always know exactly where you stand against a length requirement.',
    'This word counter is built for writers, students, and anyone working under a strict word or character limit — an essay with a maximum word count, a tweet or meta description with a character cap, or a cover letter that needs to fit on one page. Instead of manually counting or guessing, you get precise numbers updated in real time.',
    'Beyond the basic word count, the tool also breaks down character count with and without spaces, sentence count, paragraph count, and average reading time based on typical reading speed — useful context when writing blog posts, scripts, or speeches with a target duration.',
  ],
  howToHeading: 'How to count words in your text',
  howToSteps: [
    { title: 'Paste or type your text', description: 'drop your content directly into the text area' },
    { title: 'Read the live counts', description: 'word, character, sentence, and paragraph counts update automatically as you type' },
    { title: 'Check the estimated reading time', description: 'see roughly how long the text takes to read at an average pace' },
    { title: 'Edit until you hit your target', description: 'trim or expand your text while watching the counts update in real time' },
  ],
  useCasesHeading: 'When to use a word counter',
  useCases: [
    { title: 'Academic essays and assignments', description: 'Stay within a required word count range for school or university submissions.' },
    { title: 'SEO meta descriptions and titles', description: 'Keep page titles and descriptions within the character limits search engines display.' },
    { title: 'Social media posts', description: 'Check that a post fits within a platform\'s character limit before publishing.' },
    { title: 'Cover letters and resumes', description: 'Keep application documents concise and within recommended length guidelines.' },
    { title: 'Scripts and speeches', description: 'Estimate speaking time using the reading time estimate before rehearsing or recording.' },
  ],
  whyHeading: 'Why use Pixvert\'s word counter?',
  whyReasons: [
    { title: 'Real-time results', description: 'every count updates instantly as you type, no button to click' },
    { title: '100% private', description: 'your text is processed locally in your browser and never sent to a server' },
    { title: 'No signup or limits', description: 'count as much text as you want, for free' },
    { title: 'Multiple metrics at once', description: 'words, characters, sentences, paragraphs, and reading time in one place' },
  ],
  faqs: [
    { question: 'Is my text uploaded or stored anywhere?', answer: 'No. All counting happens locally in your browser as you type. Your text is never sent to a server or saved.' },
    { question: 'How is reading time calculated?', answer: 'Reading time is estimated using an average adult reading speed (around 200-250 words per minute) applied to your total word count.' },
    { question: 'Does the counter include spaces in character count?', answer: 'The tool shows both character count with spaces and without spaces, so you can check against either requirement.' },
    { question: 'What counts as a "word"?', answer: 'A word is any sequence of characters separated by whitespace. Punctuation attached to a word (like "don\'t" or "well-known") counts as one word.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though extremely long text (hundreds of thousands of words) may slow down your browser depending on your device.' },
    { question: 'Can I use this for languages other than English?', answer: 'Yes, the counter works with any language using whitespace-separated words, though reading time estimates are calibrated for English reading speeds.' },
  ],
  relatedTools: [
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Convert text between UPPER, lower, Title, and camelCase' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two texts and highlight the differences' },
    { href: '/tools/word-frequency', label: 'Word Frequency', description: 'See which words appear most often in your text' },
    { href: '/tools/lorem-ipsum', label: 'Lorem Ipsum Generator', description: 'Generate placeholder text for design mockups' },
  ],
};

export default function WordCounterPage() {
  return (
    <>
      <WordCounterTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/word-counter"
        description={metadata.description as string}
        features={['Real-time word count', 'Character count', 'Sentence and paragraph count', 'Reading time estimate', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
