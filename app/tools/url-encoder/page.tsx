import type { Metadata } from 'next';
import UrlEncoderTool from './UrlEncoderTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder Online Free — Pixvert',
  description:
    'Encode and decode URLs and query strings. Converts spaces to %20, special characters to percent-encoding, and back. Free and instant.',
  openGraph: { title: 'URL Encoder / Decoder — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/url-encoder',
  },
};

const seo: ToolSEOData = {
  toolName: 'URL Encoder / Decoder',
  whatIsHeading: 'What is URL encoding?',
  whatIsParagraphs: [
    'URL encoding (also called percent-encoding) converts characters that aren\'t safe in a URL — spaces, accented letters, symbols like &, ?, or # — into a %XX format that browsers and servers can transmit reliably. Pixvert\'s URL encoder converts text both ways: encoding plain text into a URL-safe string, and decoding an encoded URL back into readable text.',
    'Without encoding, a space becomes %20, an ampersand becomes %26, and a question mark becomes %3F, since those characters have special meaning in URL syntax — a raw & inside a query string parameter, for example, would be misread as separating two different parameters.',
    'This tool is essential for anyone building links with dynamic query parameters, debugging a URL that looks garbled with percent signs, or preparing user-generated text (like a search query or a name) to be safely embedded in a link.',
  ],
  howToHeading: 'How to encode or decode a URL',
  howToSteps: [
    { title: 'Choose encode or decode', description: 'switch modes depending on whether you have plain text or an already-encoded URL' },
    { title: 'Paste your input', description: 'type or paste the text or URL you want to convert' },
    { title: 'View the result instantly', description: 'the output updates live as you type' },
    { title: 'Copy the result', description: 'copy the encoded or decoded string with one click' },
  ],
  useCasesHeading: 'When to use a URL encoder',
  useCases: [
    { title: 'Building query string parameters', description: 'Encode a value (like a search term with spaces or special characters) before appending it to a URL.' },
    { title: 'Debugging a broken link', description: 'Decode a URL full of %XX codes to read what it actually contains.' },
    { title: 'Sharing URLs with special characters', description: 'Make sure accented characters or symbols in a link don\'t break when shared across platforms.' },
    { title: 'Working with APIs', description: 'Encode parameters correctly before sending them in a GET request.' },
  ],
  whyHeading: 'Why use Pixvert\'s URL encoder?',
  whyReasons: [
    { title: '100% local processing', description: 'your text or URL is encoded/decoded entirely in your browser' },
    { title: 'Instant, live conversion', description: 'no button to click — output updates as you type' },
    { title: 'Handles full Unicode', description: 'correctly encodes accented characters and non-Latin scripts' },
    { title: 'Free, no signup', description: 'use it as often as you need' },
  ],
  faqs: [
    { question: 'Is my URL or text sent to a server?', answer: 'No, all encoding and decoding happens locally in your browser using JavaScript. Nothing is transmitted or logged.' },
    { question: 'What characters get encoded?', answer: 'Reserved and unsafe characters like spaces, &, ?, #, %, and non-ASCII characters are converted to their %XX percent-encoded representation.' },
    { question: 'Why does a space become "%20" or sometimes "+"?', answer: '%20 is standard percent-encoding for a space anywhere in a URL. The "+" symbol is a legacy convention specific to encoding form data in a query string, not the general URL encoding standard.' },
    { question: 'Can I decode a URL that\'s already partially readable?', answer: 'Yes, the decoder handles any mix of encoded and plain characters, converting only the percent-encoded sequences back to their original characters.' },
    { question: 'Does this handle full internationalized URLs?', answer: 'Yes, the tool correctly encodes and decodes UTF-8 text, so accented letters and non-Latin scripts convert properly.' },
    { question: 'Is there a length limit on what I can encode?', answer: 'No hard limit is enforced, though extremely long strings may take a moment to process depending on your device.' },
  ],
  relatedTools: [
    { href: '/tools/text-to-slug', label: 'Text to Slug', description: 'Convert text into a clean, URL-safe slug' },
    { href: '/tools/base64-text', label: 'Base64 Text', description: 'Encode or decode text as Base64' },
    { href: '/tools/qr-generator', label: 'QR Code Generator', description: 'Generate a QR code for an encoded URL' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format and validate JSON payloads' },
  ],
};

export default function UrlEncoderPage() {
  return (
    <>
      <UrlEncoderTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/url-encoder"
        description={metadata.description as string}
        features={['URL encode', 'URL decode', 'Full Unicode support', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
