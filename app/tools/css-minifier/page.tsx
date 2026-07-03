import type { Metadata } from 'next';
import CssMinifierTool from './CssMinifierTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'CSS Minifier Online Free — Pixvert',
  description:
    'Minify CSS online. Removes comments, extra whitespace, and unnecessary characters. See exact byte reduction. Free and private.',
  openGraph: { title: 'CSS Minifier — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/css-minifier',
  },
};

const seo: ToolSEOData = {
  toolName: 'CSS Minifier',
  whatIsHeading: 'What is a CSS minifier?',
  whatIsParagraphs: [
    'A CSS minifier strips out everything from a stylesheet that isn\'t needed for the browser to interpret it correctly — comments, indentation, line breaks, and extra spaces — producing a smaller file that loads faster without changing how the page looks. Pixvert\'s CSS minifier processes your stylesheet instantly and shows the exact byte reduction achieved.',
    'Development CSS is written for humans: indented, commented, and spread across many lines for readability. None of that formatting matters to the browser, so removing it before deployment reduces file size and, in turn, page load time — especially valuable on mobile connections or for large stylesheets.',
    'Minifying CSS is a standard step in most production build pipelines, but it\'s also useful on its own when you need a quick, one-off minified version of a stylesheet without setting up a full build tool.',
  ],
  howToHeading: 'How to minify CSS',
  howToSteps: [
    { title: 'Paste your CSS', description: 'drop in your stylesheet, formatted however it currently is' },
    { title: 'Minify instantly', description: 'comments, whitespace, and unnecessary characters are stripped automatically' },
    { title: 'Check the byte reduction', description: 'see exactly how much smaller the minified version is' },
    { title: 'Copy the result', description: 'copy the minified CSS with one click and use it in production' },
  ],
  useCasesHeading: 'When to use a CSS minifier',
  useCases: [
    { title: 'Preparing CSS for production', description: 'Reduce file size before deploying a stylesheet to a live website, speeding up page load.' },
    { title: 'One-off projects without a build tool', description: 'Minify a stylesheet for a simple static site that doesn\'t use a bundler like Webpack or Vite.' },
    { title: 'Checking savings before committing to a build process', description: 'See exactly how much a specific stylesheet would shrink before investing in a full minification pipeline.' },
    { title: 'Embedding CSS inline', description: 'Minify styles being embedded directly in an HTML `<style>` tag or email template to keep the page lean.' },
  ],
  whyHeading: 'Why use Pixvert\'s CSS minifier?',
  whyReasons: [
    { title: 'Instant byte reduction stats', description: 'see exactly how much smaller your CSS becomes' },
    { title: '100% local and private', description: 'your CSS is processed entirely in your browser' },
    { title: 'No build tool required', description: 'minify a stylesheet without setting up Webpack, Vite, or any bundler' },
    { title: 'Free, instant, no signup', description: 'minify as many stylesheets as you need' },
  ],
  faqs: [
    { question: 'Does minifying CSS change how my page looks?', answer: 'No, minification only removes characters that don\'t affect how the browser interprets the CSS — comments, whitespace, and line breaks — the visual result stays identical.' },
    { question: 'Is my CSS sent to a server?', answer: 'No, all minification happens locally in your browser using JavaScript. Your stylesheet is never transmitted or stored.' },
    { question: 'How much smaller will my CSS file get?', answer: 'It depends on how much whitespace and how many comments the original file has, but 20-60% reduction is common for typically formatted development CSS.' },
    { question: 'Can I un-minify (beautify) CSS with this tool?', answer: 'This tool is for minifying only. If you need to format minified CSS back into a readable structure, look for a CSS beautifier instead.' },
    { question: 'Does minifying break CSS custom properties or media queries?', answer: 'No, the minifier preserves all valid CSS syntax, including custom properties (variables), media queries, and modern selectors — it only removes non-functional characters.' },
    { question: 'Is there a file size limit?', answer: 'No hard limit is enforced, though extremely large stylesheets may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/js-minifier', label: 'JS Minifier', description: 'Minify JavaScript for production' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print or minify HTML markup' },
    { href: '/tools/gradient-generator', label: 'Gradient Generator', description: 'Create CSS gradients and copy ready-to-use code' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format, validate, and minify JSON' },
  ],
};

export default function CssMinifierPage() {
  return (
    <>
      <CssMinifierTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/css-minifier"
        description={metadata.description as string}
        features={['Removes comments and whitespace', 'Byte reduction stats', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
