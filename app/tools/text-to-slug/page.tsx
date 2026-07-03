import type { Metadata } from 'next';
import TextToSlugTool from './TextToSlugTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Text to Slug Converter Online Free — Pixvert',
  description:
    'Convert any text to a URL-friendly slug. Removes accents, spaces, and special characters. Choose separator: hyphen, underscore, or dot. Free and instant.',
  openGraph: { title: 'Text to Slug Converter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/text-to-slug',
  },
};

const seo: ToolSEOData = {
  toolName: 'Text to Slug Converter',
  whatIsHeading: 'What is a slug?',
  whatIsParagraphs: [
    'A slug is the URL-friendly version of a title or phrase — lowercase, no spaces or accents, with words separated by hyphens (or another separator), like turning "My First Blog Post!" into "my-first-blog-post". Pixvert\'s text to slug converter automates this transformation instantly, handling accents, punctuation, and casing correctly.',
    'Slugs are what you see in the URL of most blog posts, product pages, and articles — they need to be readable, keyword-friendly for SEO, and free of characters that could break a URL or require encoding, unlike a raw title that might contain spaces, apostrophes, or accented letters.',
    'Generating a slug manually means stripping accents, replacing spaces, and removing invalid characters correctly for every single title — tedious and error-prone across dozens of pages. This tool handles the conversion consistently and lets you choose the separator style that matches your site\'s convention.',
  ],
  howToHeading: 'How to convert text to a slug',
  howToSteps: [
    { title: 'Paste your text', description: 'enter the title or phrase you want to convert into a slug' },
    { title: 'Choose a separator', description: 'select hyphen, underscore, or dot depending on your URL convention' },
    { title: 'View the generated slug', description: 'the result updates instantly as you type' },
    { title: 'Copy the slug', description: 'copy the result with one click and use it in your URL' },
  ],
  useCasesHeading: 'When to use a slug converter',
  useCases: [
    { title: 'Blog post URLs', description: 'Convert an article title into a clean, SEO-friendly URL slug automatically.' },
    { title: 'Product page URLs', description: 'Generate consistent, readable URLs for e-commerce product listings.' },
    { title: 'File and folder naming', description: 'Turn a descriptive title into a filename-safe string with no spaces or special characters.' },
    { title: 'CMS and static site generators', description: 'Quickly produce the slug field required when publishing content in most content management systems.' },
  ],
  whyHeading: 'Why use Pixvert\'s text to slug converter?',
  whyReasons: [
    { title: 'Handles accents and Unicode', description: 'correctly strips accents and diacritics (é→e, ñ→n) before slugifying' },
    { title: 'Choice of separator', description: 'hyphen, underscore, or dot to match your site\'s convention' },
    { title: '100% local and private', description: 'text is processed entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'convert as many titles as you need' },
  ],
  faqs: [
    { question: 'Why are hyphens preferred over underscores in URL slugs?', answer: 'Search engines treat a hyphen as a word separator but often treat an underscore as joining two words together, which is why hyphens are the standard recommendation for SEO-friendly URLs.' },
    { question: 'Does this tool remove accented characters?', answer: 'Yes, accents and diacritics are automatically converted to their closest plain-letter equivalent (é→e, ñ→n, ü→u) before generating the slug.' },
    { question: 'Is my text sent to a server?', answer: 'No, all conversion happens locally in your browser using JavaScript. Your text is never transmitted or stored.' },
    { question: 'What happens to punctuation and special characters?', answer: 'Punctuation, symbols, and any character that isn\'t a letter, number, or the chosen separator are removed entirely from the output.' },
    { question: 'Can I use this for non-English text?', answer: 'Yes, the tool works with any Unicode text and converts accented or non-Latin characters using their closest plain-letter representation where applicable.' },
    { question: 'Will the slug always be lowercase?', answer: 'Yes, slugs are generated in lowercase by convention, since URLs are case-sensitive on some servers and lowercase avoids ambiguity.' },
  ],
  relatedTools: [
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Convert text between UPPER, lower, and camelCase' },
    { href: '/tools/remove-accents', label: 'Remove Accents', description: 'Strip accents and diacritics from text' },
    { href: '/tools/url-encoder', label: 'URL Encoder', description: 'Encode or decode text for safe use in URLs' },
    { href: '/tools/meta-tags', label: 'Meta Tags Generator', description: 'Generate SEO meta tags for your page' },
  ],
};

export default function TextToSlugPage() {
  return (
    <>
      <TextToSlugTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/text-to-slug"
        description={metadata.description as string}
        features={['Removes accents', 'Custom separator', 'Instant conversion', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
