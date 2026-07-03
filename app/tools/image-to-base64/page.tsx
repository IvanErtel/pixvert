import type { Metadata } from 'next';
import ImageToBase64Tool from './ImageToBase64Tool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter Online Free — Pixvert',
  description:
    'Convert any image to Base64 data URI. Get ready-to-use HTML, CSS, and JSON snippets. Decode Base64 back to image. 100% local — no upload required.',
  openGraph: {
    title: 'Image to Base64 Converter — Pixvert',
    description: 'Encode images to Base64 data URIs and decode them back. Free, private, instant.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/image-to-base64',
  },
};

const seo: ToolSEOData = {
  toolName: 'Image to Base64 Converter',
  whatIsHeading: 'What is Base64 image encoding?',
  whatIsParagraphs: [
    'Base64 is an encoding scheme that converts binary data (like images) into a text string using only ASCII characters. When you convert an image to Base64, you get a long string of letters and numbers that represents your image, which can be embedded directly into HTML, CSS, JSON, or any text-based format.',
    'The Base64 image converter transforms PNG, JPG, WebP, GIF, and other image formats into a Base64 data URI that you can copy and paste anywhere in your code. This eliminates the need to host image files separately on a server, making it ideal for small icons, inline emails, or single-file HTML documents.',
    'Base64 encoding is widely used in web development, email systems, and APIs where transmitting binary data as text is required. However, keep in mind that Base64 increases the file size by approximately 33% compared to the original binary format.',
  ],
  howToHeading: 'How to convert an image to Base64',
  howToSteps: [
    { title: 'Upload your image', description: 'drag it into the drop zone or click to browse your files' },
    { title: 'Wait for the conversion', description: 'the tool processes everything locally in your browser using the FileReader API' },
    { title: 'Choose your output format', description: 'raw Base64 string, complete data URI, HTML <img> tag, or CSS background-image declaration' },
    { title: 'Copy the result', description: 'copy with a single click and paste it wherever you need it' },
  ],
  useCasesHeading: 'When to use Base64 for images',
  useCases: [
    { title: 'Small icons in CSS', description: 'Embed favicons, sprite icons, or small UI decorations directly in your stylesheet to reduce HTTP requests.' },
    { title: 'HTML emails', description: 'Include images inline so recipients see them without external hosting or blocked resources.' },
    { title: 'JSON APIs', description: 'Transmit images as part of a JSON payload when your API doesn\'t support multipart uploads.' },
    { title: 'Single-file HTML', description: 'Create fully self-contained HTML documents with all images embedded for offline distribution or archiving.' },
    { title: 'Data URIs in bookmarklets', description: 'Include small graphics in JavaScript bookmarklets without external dependencies.' },
  ],
  whyHeading: 'Why use Pixvert\'s Base64 converter?',
  whyReasons: [
    { title: '100% private', description: 'all encoding happens in your browser — your images never leave your device' },
    { title: 'No signup', description: 'use the tool immediately without creating an account or providing personal information' },
    { title: 'Multiple output formats', description: 'get the raw Base64, complete data URI, HTML tag, or CSS snippet — whatever you need' },
    { title: 'Any image format', description: 'supports PNG, JPG, WebP, GIF, BMP, and more' },
  ],
  faqs: [
    { question: 'Is it safe to convert my images here?', answer: 'Yes, completely safe. The encoding happens entirely in your browser using the FileReader API. Your image never leaves your device and is not uploaded to any server.' },
    { question: 'What\'s the maximum file size I can convert?', answer: 'There\'s no hard limit set by Pixvert, but browsers may struggle with images larger than 10-20 MB. For best performance, use images under 5 MB.' },
    { question: 'Does Base64 increase the image size?', answer: 'Yes, Base64 encoding increases the file size by approximately 33% compared to the original binary. This is a fundamental property of Base64 encoding due to how it maps binary data to ASCII characters.' },
    { question: 'When should I NOT use Base64 for images?', answer: 'Avoid Base64 for large images or images used multiple times across your site. Base64-encoded images can\'t be cached separately by the browser, and the larger size can slow down page loads.' },
    { question: 'Can I decode a Base64 string back to an image?', answer: 'Yes, our tool includes a decoder. Paste your Base64 string or data URI, and the tool will convert it back to a downloadable image file.' },
    { question: 'What image formats are supported?', answer: 'PNG, JPG/JPEG, WebP, GIF, BMP, SVG, and most other standard image formats.' },
    { question: 'Do you save my images or the Base64 output?', answer: 'No, nothing is saved or stored. Everything is processed and displayed only in your browser session.' },
  ],
  relatedTools: [
    { href: '/compress/image', label: 'Image Compressor', description: 'Reduce image file size before encoding to Base64' },
    { href: '/tools/resize', label: 'Image Resizer', description: 'Resize images to specific pixel dimensions' },
    { href: '/tools/base64-text', label: 'Base64 Text', description: 'Encode and decode plain text as Base64' },
    { href: '/tools/watermark', label: 'Watermark Tool', description: 'Add a text watermark before encoding your image' },
  ],
};

export default function ImageToBase64Page() {
  return (
    <>
      <ImageToBase64Tool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/image-to-base64"
        description={metadata.description as string}
        features={['Image to Base64 encoding', 'Base64 to image decoding', 'HTML/CSS snippet output', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
