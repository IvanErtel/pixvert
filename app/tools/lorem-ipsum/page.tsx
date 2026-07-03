import type { Metadata } from 'next';
import LoremIpsumTool from './LoremIpsumTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator Online Free — Pixvert',
  description:
    'Generate Lorem Ipsum placeholder text. Choose paragraphs, words, or sentences. Classic or random. Free and instant.',
  openGraph: { title: 'Lorem Ipsum Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/lorem-ipsum',
  },
};

const seo: ToolSEOData = {
  toolName: 'Lorem Ipsum Generator',
  whatIsHeading: 'What is a Lorem Ipsum generator?',
  whatIsParagraphs: [
    'Lorem Ipsum is placeholder text used in design and publishing to fill a layout with realistic-looking content before the final copy is ready. Pixvert\'s Lorem Ipsum generator produces this filler text on demand, letting you choose exactly how many paragraphs, sentences, or words you need.',
    'Designers and developers use Lorem Ipsum because it has a natural distribution of letters and word lengths that mimics real text, without the meaning being distracting — it lets you judge how a font, layout, or spacing looks without being influenced by reading the actual content. This generator supports both the classic Lorem Ipsum passage and randomized variations.',
    'Instead of copying the same fixed block of text from a static webpage, this generator lets you produce exactly the amount you need for a specific mockup — a short two-sentence teaser, a full multi-paragraph article body, or a precise word count to test a character limit.',
  ],
  howToHeading: 'How to generate Lorem Ipsum text',
  howToSteps: [
    { title: 'Choose a unit', description: 'select paragraphs, sentences, or words as your unit of measurement' },
    { title: 'Set the amount', description: 'enter how many paragraphs, sentences, or words you need' },
    { title: 'Pick classic or random', description: 'use the traditional Lorem Ipsum passage or a randomized variation' },
    { title: 'Generate and copy', description: 'copy the result with one click and paste it into your design or document' },
  ],
  useCasesHeading: 'When to use Lorem Ipsum',
  useCases: [
    { title: 'Website and app mockups', description: 'Fill text areas, cards, and articles with realistic-looking content before real copy is written.' },
    { title: 'Testing typography', description: 'Check how a font, line height, or column width looks with a full block of text.' },
    { title: 'Print layout design', description: 'Fill a brochure or flyer template to visualize the final layout before content is finalized.' },
    { title: 'CMS and template testing', description: 'Populate a content management system template to test how it renders with a realistic amount of text.' },
    { title: 'Presentations and wireframes', description: 'Add placeholder paragraphs to a slide or wireframe without spending time writing draft copy.' },
  ],
  whyHeading: 'Why use Pixvert\'s Lorem Ipsum generator?',
  whyReasons: [
    { title: 'Flexible output', description: 'generate by paragraphs, sentences, or an exact word count' },
    { title: 'Classic or random', description: 'use the traditional passage or a randomized version for variety' },
    { title: '100% local and private', description: 'text is generated entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'generate as much placeholder text as you need' },
  ],
  faqs: [
    { question: 'What does Lorem Ipsum text actually mean?', answer: 'It\'s derived from a scrambled passage of a Latin text by Cicero. It has no real meaning today — its value is in mimicking the look of natural language without content that distracts from the design.' },
    { question: 'Why not just use real text as a placeholder?', answer: 'Real text draws attention to its meaning, which can bias feedback on a design. Lorem Ipsum keeps the focus on layout, typography, and spacing instead.' },
    { question: 'Can I generate an exact word count?', answer: 'Yes, select the "words" unit and enter the exact number you need — useful for testing character or word limits in a design.' },
    { question: 'Is this content sent anywhere or logged?', answer: 'No, the text is generated entirely in your browser and never transmitted or stored.' },
    { question: 'What is the difference between classic and random mode?', answer: 'Classic mode always starts from the traditional "Lorem ipsum dolor sit amet..." passage, while random mode shuffles common Lorem Ipsum words into new, varied sentences each time.' },
    { question: 'Can I use Lorem Ipsum text in a final published product?', answer: 'No, it should only be used as a temporary placeholder during design and development — always replace it with real content before publishing.' },
  ],
  relatedTools: [
    { href: '/tools/word-counter', label: 'Word Counter', description: 'Count words and characters in any text' },
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Convert text between different capitalization styles' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print HTML markup for your mockup' },
    { href: '/tools/meta-tags', label: 'Meta Tags Generator', description: 'Generate SEO and social meta tags for your page' },
  ],
};

export default function LoremIpsumPage() {
  return (
    <>
      <LoremIpsumTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/lorem-ipsum"
        description={metadata.description as string}
        features={['Generate by paragraph, sentence, or word', 'Classic or random text', 'Instant copy', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
