import type { Metadata } from 'next';
import HtmlFormatterTool from './HtmlFormatterTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'HTML Formatter & Beautifier Online Free — Pixvert',
  description:
    'Format and beautify HTML code with proper indentation. Also minify HTML for production. Free and private.',
  openGraph: { title: 'HTML Formatter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/html-formatter',
  },
};

const seo: ToolSEOData = {
  toolName: 'HTML Formatter & Beautifier',
  whatIsHeading: 'What is an HTML formatter?',
  whatIsParagraphs: [
    'An HTML formatter takes messy or minified markup — often a single unindented line pulled from a "view source" or copied from a minified production page — and reformats it with consistent indentation and line breaks so the structure of nested tags becomes easy to read. Pixvert\'s HTML formatter also works in reverse, minifying formatted HTML down for production use.',
    'HTML that\'s deeply nested (divs inside divs inside sections) is hard to reason about when it\'s all on one line or inconsistently indented. Proper formatting makes it immediately clear which closing tag belongs to which opening tag, which is invaluable when debugging layout issues or reviewing markup written by someone else.',
    'This tool is commonly used when inspecting a page\'s source code, cleaning up HTML exported from a design tool or CMS, or preparing a finished snippet for a code review where readability matters.',
  ],
  howToHeading: 'How to format HTML',
  howToSteps: [
    { title: 'Paste your HTML', description: 'drop in raw or minified markup' },
    { title: 'Choose format or minify', description: 'select whether you want readable, indented output or a compact single-line version' },
    { title: 'Review the result', description: 'the formatted or minified HTML updates instantly' },
    { title: 'Copy the result', description: 'copy the output with one click' },
  ],
  useCasesHeading: 'When to use an HTML formatter',
  useCases: [
    { title: 'Debugging page structure', description: 'Reformat minified or messy markup pulled from a live site to understand its nesting and structure.' },
    { title: 'Cleaning up CMS or export output', description: 'Beautify HTML exported from a design tool or content management system before editing it by hand.' },
    { title: 'Preparing code for review', description: 'Format a snippet consistently before sharing it with a teammate or including it in documentation.' },
    { title: 'Minifying for production', description: 'Strip whitespace from formatted HTML to reduce page weight before deployment.' },
  ],
  whyHeading: 'Why use Pixvert\'s HTML formatter?',
  whyReasons: [
    { title: 'Format or minify', description: 'switch between readable and compact output in one tool' },
    { title: '100% local and private', description: 'your markup is processed entirely in your browser' },
    { title: 'Correct nested indentation', description: 'clearly see which closing tag matches which opening tag' },
    { title: 'Free, instant, no signup', description: 'format as much HTML as you need' },
  ],
  faqs: [
    { question: 'Is my HTML sent to a server?', answer: 'No, all formatting and minifying happens locally in your browser using JavaScript. Your markup is never transmitted or stored.' },
    { question: 'Will formatting change how my page renders?', answer: 'No, formatting only adds indentation and line breaks for readability — it doesn\'t alter the actual DOM structure or how the browser renders it.' },
    { question: 'What\'s the difference between formatting and minifying?', answer: 'Formatting adds indentation and line breaks for readability. Minifying removes unnecessary whitespace to produce the smallest possible output for production.' },
    { question: 'Does the formatter fix broken or invalid HTML?', answer: 'It formats the structure it\'s given but doesn\'t validate or repair invalid markup — use a dedicated HTML validator if you need to check for syntax errors.' },
    { question: 'Can I format HTML with embedded CSS and JavaScript?', answer: 'Yes, `<style>` and `<script>` blocks are preserved as part of the markup structure, though their internal content isn\'t separately reformatted.' },
    { question: 'Is there a size limit?', answer: 'No hard limit is enforced, though very large HTML documents may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/css-minifier', label: 'CSS Minifier', description: 'Minify CSS for production' },
    { href: '/tools/js-minifier', label: 'JS Minifier', description: 'Minify JavaScript for production' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format, validate, and minify JSON' },
    { href: '/tools/meta-tags', label: 'Meta Tags Generator', description: 'Generate SEO and social meta tags' },
  ],
};

export default function HtmlFormatterPage() {
  return (
    <>
      <HtmlFormatterTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/html-formatter"
        description={metadata.description as string}
        features={['Pretty-print HTML', 'Minify HTML', 'Consistent indentation', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
