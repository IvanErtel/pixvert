import type { Metadata } from 'next';
import MetaTagsTool from './MetaTagsTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Meta Tags Generator Online Free — SEO & Open Graph | Pixvert',
  description:
    'Generate SEO meta tags, Open Graph (Facebook), and Twitter Card tags. Preview how your page looks in search results and social media. Free.',
  openGraph: { title: 'Meta Tags Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/meta-tags',
  },
};

const seo: ToolSEOData = {
  toolName: 'Meta Tags Generator',
  whatIsHeading: 'What is a meta tags generator?',
  whatIsParagraphs: [
    'Meta tags are snippets of HTML in a page\'s `<head>` that tell search engines and social platforms how to display a link — the title and description shown in Google results, and the image, title, and description shown when a link is shared on Facebook, Twitter/X, or LinkedIn. Pixvert\'s meta tags generator builds all of these at once: standard SEO tags, Open Graph tags, and Twitter Card tags.',
    'Getting meta tags right matters because they directly affect click-through rate — a compelling title and description in search results, or an eye-catching preview card on social media, can significantly increase clicks compared to a page with no tags (which falls back to generic, unhelpful defaults chosen by the platform).',
    'This tool includes a live preview so you can see exactly how your page will look in a Google search result and in a social media share card before you ever publish, catching truncated titles or missing images ahead of time.',
  ],
  howToHeading: 'How to generate meta tags',
  howToSteps: [
    { title: 'Enter your page details', description: 'title, description, URL, and a preview image' },
    { title: 'Preview the search result', description: 'see how your title and description will look in Google search results' },
    { title: 'Preview the social card', description: 'check how the Open Graph and Twitter Card previews look for Facebook, Twitter/X, and LinkedIn' },
    { title: 'Copy the generated HTML', description: 'copy all the meta tags and paste them into your page\'s <head>' },
  ],
  useCasesHeading: 'When to use a meta tags generator',
  useCases: [
    { title: 'Launching a new page', description: 'Generate complete, correctly formatted meta tags before a page goes live, avoiding a generic-looking preview.' },
    { title: 'Improving social sharing', description: 'Set a specific Open Graph image and description so shared links look polished on social media.' },
    { title: 'Auditing an existing page', description: 'Check whether current title and description lengths will get truncated in search results.' },
    { title: 'Standardizing tags across a site', description: 'Use the same generator to produce consistent, correctly structured tags for every page on a site.' },
  ],
  whyHeading: 'Why use Pixvert\'s meta tags generator?',
  whyReasons: [
    { title: 'Covers SEO, Open Graph, and Twitter Cards', description: 'generate every tag you need in one pass, not three separate tools' },
    { title: 'Live preview', description: 'see the search result and social card before publishing' },
    { title: '100% local and private', description: 'your page details are processed entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'generate tags for as many pages as you need' },
  ],
  faqs: [
    { question: 'What\'s the ideal length for a meta title and description?', answer: 'A title around 50-60 characters and a description around 150-155 characters avoid being truncated in most Google search results.' },
    { question: 'What is Open Graph and why do I need it?', answer: 'Open Graph is a protocol originally created by Facebook that controls how a link looks when shared on social media — without it, platforms often show a generic or incomplete preview.' },
    { question: 'Do I need separate tags for Twitter/X?', answer: 'Twitter Card tags are a separate but similar set of meta tags. Some platforms fall back to Open Graph tags if Twitter Card tags are missing, but including both ensures the best result.' },
    { question: 'Is my page information sent to a server?', answer: 'No, all tag generation and preview rendering happens locally in your browser. Nothing is transmitted or stored.' },
    { question: 'Where do I paste the generated tags?', answer: 'Inside the `<head>` section of your HTML page, or in your framework\'s metadata configuration if you\'re using Next.js, WordPress, or a similar system.' },
    { question: 'Will these tags improve my search ranking directly?', answer: 'Meta tags don\'t directly boost ranking, but a well-written title and description improve click-through rate from search results, which is a strong indirect SEO signal.' },
  ],
  relatedTools: [
    { href: '/tools/robots-txt', label: 'Robots.txt Generator', description: 'Control how search engines crawl your site' },
    { href: '/tools/htaccess-generator', label: '.htaccess Generator', description: 'Generate Apache server configuration rules' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print and clean up HTML markup' },
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode a small preview image as a data URI' },
  ],
};

export default function MetaTagsPage() {
  return (
    <>
      <MetaTagsTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/meta-tags"
        description={metadata.description as string}
        features={['SEO meta tags', 'Open Graph tags', 'Twitter Card tags', 'Live preview']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
