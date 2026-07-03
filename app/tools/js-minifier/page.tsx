import type { Metadata } from 'next';
import JsMinifierTool from './JsMinifierTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'JavaScript Minifier Online Free — Pixvert',
  description:
    'Minify JavaScript online. Removes comments and collapses whitespace. See exact byte reduction. Free and private.',
  openGraph: { title: 'JavaScript Minifier — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/js-minifier',
  },
};

const seo: ToolSEOData = {
  toolName: 'JavaScript Minifier',
  whatIsHeading: 'What is a JavaScript minifier?',
  whatIsParagraphs: [
    'A JavaScript minifier removes everything from your code that isn\'t needed for it to run — comments, extra whitespace, and unnecessary line breaks — producing a smaller file that executes identically but downloads and parses faster. Pixvert\'s JavaScript minifier processes your code instantly and shows the exact byte reduction achieved.',
    'JavaScript written for development is formatted for readability: indentation, spacing, descriptive comments explaining logic. None of that affects how the code runs, so stripping it before deployment reduces file size, which matters directly for page load speed, especially on slower mobile connections.',
    'Minifying JavaScript is a core part of most production build pipelines (Webpack, Vite, esbuild all do this automatically), but this tool is useful for quickly minifying a single script, a snippet, or a small project that doesn\'t use a bundler.',
  ],
  howToHeading: 'How to minify JavaScript',
  howToSteps: [
    { title: 'Paste your JavaScript', description: 'drop in your code, formatted however it currently is' },
    { title: 'Minify instantly', description: 'comments and unnecessary whitespace are stripped automatically' },
    { title: 'Check the byte reduction', description: 'see exactly how much smaller the minified version is' },
    { title: 'Copy the result', description: 'copy the minified code with one click and use it in production' },
  ],
  useCasesHeading: 'When to use a JavaScript minifier',
  useCases: [
    { title: 'Preparing scripts for production', description: 'Reduce file size before deploying a script to a live website, speeding up page load.' },
    { title: 'Standalone scripts without a build tool', description: 'Minify a script for a simple project that doesn\'t use Webpack, Vite, or a bundler.' },
    { title: 'Embedding scripts inline', description: 'Minify JavaScript being embedded directly in an HTML `<script>` tag to keep the page lean.' },
    { title: 'Checking savings before adopting a build process', description: 'See exactly how much a specific script would shrink before setting up a full minification pipeline.' },
  ],
  whyHeading: 'Why use Pixvert\'s JavaScript minifier?',
  whyReasons: [
    { title: 'Instant byte reduction stats', description: 'see exactly how much smaller your script becomes' },
    { title: '100% local and private', description: 'your code is processed entirely in your browser' },
    { title: 'No build tool required', description: 'minify a script without setting up a bundler' },
    { title: 'Free, instant, no signup', description: 'minify as many scripts as you need' },
  ],
  faqs: [
    { question: 'Does minifying JavaScript change how it runs?', answer: 'No, minification only removes comments and formatting that don\'t affect execution — the functional behavior of your code stays identical.' },
    { question: 'Is my code sent to a server?', answer: 'No, all minification happens locally in your browser using JavaScript. Your code is never transmitted or stored.' },
    { question: 'How much smaller will my script get?', answer: 'It depends on how many comments and how much whitespace the original has, but a 20-50% reduction is common for typically formatted development code.' },
    { question: 'Does this minifier rename variables like advanced tools do?', answer: 'No, this tool focuses on removing comments and whitespace. Advanced minifiers used in build tools also shorten variable names, which can yield further size reduction but requires more careful handling of scope.' },
    { question: 'Will minifying break my code if it has syntax errors?', answer: 'The minifier expects valid JavaScript input. If your code has a syntax error, fix it first, since minifiers generally can\'t process broken syntax reliably.' },
    { question: 'Is there a file size limit?', answer: 'No hard limit is enforced, though extremely large scripts may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/css-minifier', label: 'CSS Minifier', description: 'Minify CSS for production' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print or minify HTML markup' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format, validate, and minify JSON' },
    { href: '/tools/base64-text', label: 'Base64 Text', description: 'Encode or decode text as Base64' },
  ],
};

export default function JsMinifierPage() {
  return (
    <>
      <JsMinifierTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/js-minifier"
        description={metadata.description as string}
        features={['Removes comments and whitespace', 'Byte reduction stats', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
