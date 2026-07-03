import type { Metadata } from 'next';
import JsonFormatterTool from './JsonFormatterTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator Online Free — Pixvert',
  description:
    'Format, validate, and minify JSON online. Pretty-print with 2 or 4 spaces, detect syntax errors, and minify for production. Free and private.',
  openGraph: { title: 'JSON Formatter & Validator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/json-formatter',
  },
};

const seo: ToolSEOData = {
  toolName: 'JSON Formatter & Validator',
  whatIsHeading: 'What is a JSON formatter?',
  whatIsParagraphs: [
    'A JSON formatter takes raw, unindented JSON — often a single unreadable line returned by an API — and pretty-prints it with proper indentation, line breaks, and spacing so it\'s easy to read and debug. Pixvert\'s JSON formatter also validates the syntax as you go, pointing out exactly where a comma, bracket, or quote is missing.',
    'Working with APIs, config files, or logs almost always means dealing with JSON that\'s either minified for transport or pasted without formatting into a text editor. This tool instantly reformats it with your choice of 2 or 4-space indentation, making nested objects and arrays visually clear.',
    'The same tool works in reverse: minify formatted JSON down to a single compact line to reduce payload size before sending it over a network or embedding it in code — useful once you\'re done editing and need production-ready output.',
  ],
  howToHeading: 'How to format and validate JSON',
  howToSteps: [
    { title: 'Paste your JSON', description: 'drop in raw or minified JSON from an API response, file, or config' },
    { title: 'Choose indentation', description: 'select 2 or 4 spaces for the pretty-printed output' },
    { title: 'Check for errors', description: 'invalid JSON is flagged immediately, with the location of the syntax problem' },
    { title: 'Format or minify', description: 'switch between pretty-printed and minified output depending on what you need' },
    { title: 'Copy the result', description: 'copy the formatted or minified JSON with one click' },
  ],
  useCasesHeading: 'When to use a JSON formatter',
  useCases: [
    { title: 'Debugging API responses', description: 'Paste a raw API response to instantly see its structure and spot missing or malformed fields.' },
    { title: 'Reviewing config files', description: 'Format a minified config file to understand its structure before editing it.' },
    { title: 'Validating hand-written JSON', description: 'Catch syntax errors like trailing commas or unquoted keys before they break a build or deploy.' },
    { title: 'Minifying for production', description: 'Strip whitespace from formatted JSON to reduce payload size before sending it over an API.' },
    { title: 'Learning JSON structure', description: 'See nested objects and arrays laid out clearly when learning how an API or data format is structured.' },
  ],
  whyHeading: 'Why use Pixvert\'s JSON formatter?',
  whyReasons: [
    { title: '100% local processing', description: 'your JSON is never sent to a server — everything runs in your browser' },
    { title: 'Instant validation', description: 'syntax errors are flagged immediately with a clear indication of the problem' },
    { title: 'Format or minify', description: 'switch between pretty-printed and compact output in one tool' },
    { title: 'No signup, no limits', description: 'format as much JSON as you need, for free' },
  ],
  faqs: [
    { question: 'Is my JSON data sent to a server?', answer: 'No. All formatting, validation, and minification happens locally in your browser using JavaScript. Your data is never transmitted.' },
    { question: 'What happens if my JSON is invalid?', answer: 'The tool flags the syntax error and points to roughly where the problem is, such as a missing comma, unclosed bracket, or unquoted key.' },
    { question: 'Can I format very large JSON files?', answer: 'Yes, though extremely large files (several megabytes) may take a moment to process depending on your device, since parsing happens in the browser.' },
    { question: 'What\'s the difference between formatting and minifying?', answer: 'Formatting adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace to produce the smallest possible output, typically used before sending data over a network.' },
    { question: 'Does the tool support JSON5 or JSONC (comments)?', answer: 'No, the tool validates against strict JSON syntax as defined by the JSON specification, which does not allow comments or trailing commas.' },
    { question: 'Can I convert JSON to CSV here?', answer: 'Not on this page, but Pixvert has a dedicated JSON ↔ CSV converter for that.' },
  ],
  relatedTools: [
    { href: '/tools/json-csv', label: 'JSON ↔ CSV', description: 'Convert between JSON and CSV formats' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print and clean up HTML markup' },
    { href: '/tools/css-minifier', label: 'CSS Minifier', description: 'Minify CSS for production' },
    { href: '/tools/js-minifier', label: 'JS Minifier', description: 'Minify JavaScript for production' },
  ],
};

export default function JsonFormatterPage() {
  return (
    <>
      <JsonFormatterTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/json-formatter"
        description={metadata.description as string}
        features={['Pretty-print JSON', 'Syntax validation', 'Minify JSON', '2 or 4-space indentation', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
