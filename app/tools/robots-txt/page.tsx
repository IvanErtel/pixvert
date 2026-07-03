import type { Metadata } from 'next';
import RobotsTxtTool from './RobotsTxtTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Robots.txt Generator Free Online | Pixvert',
  description:
    'Generate a robots.txt file for your website. Block AI crawlers (GPTBot, ClaudeBot), set crawl delay, add sitemap URL. Download instantly.',
  openGraph: { title: 'Robots.txt Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/robots-txt',
  },
};

const seo: ToolSEOData = {
  toolName: 'Robots.txt Generator',
  whatIsHeading: 'What is a robots.txt generator?',
  whatIsParagraphs: [
    'A robots.txt file tells search engines and other web crawlers which parts of your site they\'re allowed to access, using a simple text format placed at the root of your domain. Pixvert\'s robots.txt generator builds this file visually, letting you allow or disallow specific paths, set a crawl delay, add your sitemap URL, and block AI crawlers like GPTBot or ClaudeBot with a single toggle.',
    'Every major search engine checks robots.txt before crawling a site, and getting the syntax wrong — a misplaced wildcard, a missing colon, an incorrect user-agent line — can accidentally block search engines from your entire site or fail to block what you intended. This generator produces a syntactically correct file every time.',
    'With AI training crawlers becoming more common, many site owners now want the option to allow search engine indexing while blocking AI models from scraping content for training — this tool includes presets for the most common AI bots so you don\'t need to look up their exact user-agent strings.',
  ],
  howToHeading: 'How to generate a robots.txt file',
  howToSteps: [
    { title: 'Choose a preset or start blank', description: 'select a common configuration (allow all, block all, or block AI bots) as a starting point' },
    { title: 'Set allow/disallow rules', description: 'specify which paths crawlers can or can\'t access' },
    { title: 'Add your sitemap URL', description: 'include a link to your sitemap.xml so crawlers can discover it directly' },
    { title: 'Set a crawl delay if needed', description: 'optionally throttle how frequently bots request pages from your server' },
    { title: 'Copy or download', description: 'copy the text or download the ready-to-use robots.txt file' },
  ],
  useCasesHeading: 'When to use a robots.txt generator',
  useCases: [
    { title: 'Blocking admin or staging areas', description: 'Prevent search engines from indexing login pages, admin panels, or staging environments.' },
    { title: 'Blocking AI training crawlers', description: 'Disallow bots like GPTBot or ClaudeBot from scraping your content for AI model training while still allowing regular search indexing.' },
    { title: 'Pointing crawlers to your sitemap', description: 'Add a sitemap directive so search engines discover all your pages efficiently.' },
    { title: 'Managing crawl load', description: 'Set a crawl delay to reduce server load from aggressive bots on a resource-constrained server.' },
    { title: 'Launching a new site', description: 'Temporarily block all crawlers while a site is still in development, then update the file once ready to launch.' },
  ],
  whyHeading: 'Why use Pixvert\'s robots.txt generator?',
  whyReasons: [
    { title: 'Correct syntax every time', description: 'no risk of a typo accidentally blocking your entire site from search engines' },
    { title: 'AI bot presets included', description: 'block GPTBot, ClaudeBot, and other AI crawlers with a single toggle' },
    { title: '100% local and private', description: 'your configuration is generated entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'generate as many robots.txt files as you need' },
  ],
  faqs: [
    { question: 'Where do I put the robots.txt file?', answer: 'It must be placed at the root of your domain, accessible at yoursite.com/robots.txt — it won\'t be recognized anywhere else.' },
    { question: 'Does robots.txt guarantee my pages won\'t appear in search results?', answer: 'Not entirely — it prevents crawling, but a disallowed page can still be indexed (without content) if other pages link to it. Use a noindex meta tag for a stronger guarantee.' },
    { question: 'Can I block specific AI crawlers only?', answer: 'Yes, the generator lets you selectively block bots like GPTBot, ClaudeBot, CCBot, and others individually, or all of them at once.' },
    { question: 'Is my data sent to a server?', answer: 'No, the file is built entirely in your browser based on your selections. Nothing is transmitted or stored.' },
    { question: 'Does blocking a crawler in robots.txt actually stop it?', answer: 'It works for crawlers that respect the robots exclusion standard, which includes all major search engines and most reputable AI companies, but malicious bots may ignore it entirely.' },
    { question: 'Should every website have a robots.txt file?', answer: 'It\'s not strictly required, but having one — even a simple "allow all, here\'s my sitemap" file — gives you explicit control instead of relying on default crawler behavior.' },
  ],
  relatedTools: [
    { href: '/tools/htaccess-generator', label: '.htaccess Generator', description: 'Generate Apache server configuration rules' },
    { href: '/tools/meta-tags', label: 'Meta Tags Generator', description: 'Generate SEO and social meta tags for your pages' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print and clean up HTML markup' },
    { href: '/tools/privacy-policy', label: 'Privacy Policy Generator', description: 'Generate a GDPR-compliant privacy policy' },
  ],
};

export default function RobotsTxtPage() {
  return (
    <>
      <RobotsTxtTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/robots-txt"
        description={metadata.description as string}
        features={['Block AI crawlers', 'Crawl delay', 'Sitemap directive', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
