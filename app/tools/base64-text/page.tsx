import type { Metadata } from 'next';
import Base64TextTool from './Base64TextTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Base64 Text Encoder / Decoder Online Free — Pixvert',
  description:
    'Encode text to Base64 and decode Base64 back to text. Supports UTF-8 with full Unicode. Free and instant.',
  openGraph: { title: 'Base64 Text Encoder / Decoder — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/base64-text',
  },
};

const seo: ToolSEOData = {
  toolName: 'Base64 Text Encoder / Decoder',
  whatIsHeading: 'What is Base64 text encoding?',
  whatIsParagraphs: [
    'Base64 is an encoding scheme that converts any text or binary data into a string made up only of letters, numbers, and a few symbols (A-Z, a-z, 0-9, +, /). Pixvert\'s Base64 text tool encodes plain text into Base64, and decodes Base64 strings back into readable text, with full UTF-8 support for non-English characters, emoji, and symbols.',
    'Base64 is used whenever binary-safe, ASCII-only text is required — embedding data in URLs, JSON payloads, email headers, or authentication tokens like Basic Auth credentials. It doesn\'t encrypt or compress data; it just re-encodes it into a format safe to transmit through systems that only handle plain text.',
    'A common point of confusion is that Base64 looks like encryption, but it isn\'t — anyone can decode a Base64 string instantly, including with this same tool. It should never be used as a way to hide sensitive information; use proper encryption for that instead.',
  ],
  howToHeading: 'How to encode or decode Base64 text',
  howToSteps: [
    { title: 'Choose encode or decode', description: 'switch modes depending on whether you have plain text or a Base64 string' },
    { title: 'Paste your input', description: 'type or paste the text to encode, or the Base64 string to decode' },
    { title: 'View the result instantly', description: 'the output updates live as you type' },
    { title: 'Copy the result', description: 'copy the encoded or decoded text with one click' },
  ],
  useCasesHeading: 'When to use Base64 text encoding',
  useCases: [
    { title: 'Basic Auth credentials', description: 'Decode the username:password string sent in an HTTP Authorization header to inspect or debug it.' },
    { title: 'Embedding data in URLs', description: 'Encode text so it can safely be included as a URL parameter without special characters causing issues.' },
    { title: 'JWT and token debugging', description: 'Decode the header and payload sections of a JSON Web Token to inspect its claims.' },
    { title: 'Email and API payloads', description: 'Encode text data that needs to travel safely through systems that only accept ASCII text.' },
    { title: 'Learning how Base64 works', description: 'Encode and decode simple strings to understand the encoding before using it in code.' },
  ],
  whyHeading: 'Why use Pixvert\'s Base64 text tool?',
  whyReasons: [
    { title: 'Full Unicode support', description: 'correctly encodes and decodes UTF-8 text, including accents, emoji, and non-Latin scripts' },
    { title: '100% local processing', description: 'your text is encoded or decoded in your browser and never sent to a server' },
    { title: 'Instant, live results', description: 'no button to click — output updates as you type' },
    { title: 'Free, no signup', description: 'use it as often as needed without an account' },
  ],
  faqs: [
    { question: 'Is Base64 encoding the same as encryption?', answer: 'No. Base64 is a reversible encoding, not encryption — anyone can decode a Base64 string instantly. Never use it to hide sensitive data; use real encryption for that.' },
    { question: 'Is my text sent to a server when I encode or decode it?', answer: 'No, everything happens locally in your browser using JavaScript. Nothing is transmitted or stored.' },
    { question: 'Does this tool support special characters and emoji?', answer: 'Yes, the encoder and decoder handle full UTF-8 text, so accented letters, emoji, and non-Latin scripts encode and decode correctly.' },
    { question: 'Why does Base64 output look longer than my original text?', answer: 'Base64 encoding increases the size of the data by approximately 33%, since it represents every 3 bytes of input as 4 ASCII characters.' },
    { question: 'What characters are used in Base64?', answer: 'Standard Base64 uses A-Z, a-z, 0-9, plus "+" and "/", with "=" used for padding at the end when needed.' },
    { question: 'Can I encode an image with this tool?', answer: 'This tool is for plain text. For images, use Pixvert\'s dedicated Image to Base64 converter, which produces a data URI.' },
  ],
  relatedTools: [
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode images as Base64 data URIs' },
    { href: '/tools/url-encoder', label: 'URL Encoder', description: 'Encode or decode text for safe use in URLs' },
    { href: '/tools/password-generator', label: 'Password Generator', description: 'Generate strong, random passwords' },
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format and validate JSON payloads' },
  ],
};

export default function Base64TextPage() {
  return (
    <>
      <Base64TextTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/base64-text"
        description={metadata.description as string}
        features={['Encode text to Base64', 'Decode Base64 to text', 'Full UTF-8 support', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
