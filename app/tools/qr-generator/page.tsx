import type { Metadata } from 'next';
import QrGeneratorTool from './QrGeneratorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'QR Code Generator Free Online — Pixvert',
  description:
    'Generate QR codes for any URL, text, email, or phone number. Custom colors, sizes, and error correction. Download as PNG instantly.',
  openGraph: { title: 'QR Code Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/qr-generator',
  },
};

const seo: ToolSEOData = {
  toolName: 'QR Code Generator',
  whatIsHeading: 'What is a QR code generator?',
  whatIsParagraphs: [
    "A QR code generator turns a piece of text — a URL, a Wi-Fi password, an email address, a phone number — into a scannable square barcode that any smartphone camera can read instantly. Pixvert's QR code generator creates these codes directly in your browser, with no data sent to a server and no account needed.",
    'Beyond the basic black-and-white square, this QR code generator lets you customize the foreground and background colors, adjust the size in pixels, and choose the error correction level, which determines how much of the code can be damaged or obscured while still scanning correctly. Higher error correction is useful if you plan to print the QR code small or add a logo on top.',
    'QR codes are used everywhere today: restaurant menus, product packaging, business cards, event tickets, and payment links. Generating one online for free means you can create as many as you need — for personal or commercial use — without paying for a subscription or dealing with usage limits.',
  ],
  howToHeading: 'How to generate a QR code',
  howToSteps: [
    { title: 'Enter your content', description: 'type or paste the URL, text, email, or phone number you want the QR code to link to' },
    { title: 'Customize the appearance', description: 'pick the foreground and background colors and set the size in pixels' },
    { title: 'Set the error correction level', description: 'choose higher correction if the code will be printed small or combined with a logo' },
    { title: 'Preview and download', description: 'the QR code updates live — download it as a PNG when it looks right' },
  ],
  useCasesHeading: 'When to use a QR code',
  useCases: [
    { title: 'Restaurant menus', description: 'Link a table tent or sticker to your digital menu instead of printing new paper menus every time prices change.' },
    { title: 'Business cards and flyers', description: 'Let people scan straight to your website, portfolio, or contact details instead of typing a URL.' },
    { title: 'Wi-Fi sharing', description: 'Generate a code guests can scan to join your Wi-Fi network without typing a password.' },
    { title: 'Event tickets and check-ins', description: 'Encode a unique link or ID for fast scanning at entrances.' },
    { title: 'Product packaging', description: 'Point customers to instructions, warranty registration, or your online store.' },
  ],
  whyHeading: 'Why use Pixvert to create QR codes?',
  whyReasons: [
    { title: '100% local generation', description: 'your content is encoded directly in your browser — nothing is sent to a server or logged' },
    { title: 'Custom colors and sizes', description: 'match your brand instead of using a generic black-and-white square' },
    { title: 'No signup, no limits', description: 'generate as many QR codes as you need, for free, without an account' },
    { title: 'Instant PNG download', description: 'get a ready-to-use image file for print or digital use in seconds' },
  ],
  faqs: [
    { question: 'Do these QR codes expire?', answer: 'No. Since the content is encoded directly into the code itself (not a redirect link Pixvert hosts), the QR code works for as long as the underlying content — like the URL — remains valid.' },
    { question: 'Can I use these QR codes commercially?', answer: 'Yes, there are no restrictions. You can use the generated QR codes on products, marketing materials, or any commercial project.' },
    { question: 'What is error correction level and which should I choose?', answer: 'Error correction lets a QR code still scan even if part of it is damaged or covered. Use a higher level if you plan to print small or add a logo on top; use a lower level for maximum data capacity.' },
    { question: 'Is my data safe when generating a QR code here?', answer: 'Yes. The QR code is generated entirely in your browser — the text or URL you enter is never sent to or stored on any server.' },
    { question: 'What can I encode in a QR code?', answer: 'URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, and more — anything that fits within the QR code data capacity limits.' },
    { question: 'Why won\'t my QR code scan?', answer: 'This is usually caused by too little contrast between the foreground and background colors, or a size too small for the amount of data encoded. Try increasing the size or using higher-contrast colors.' },
  ],
  relatedTools: [
    { href: '/tools/password-generator', label: 'Password Generator', description: 'Generate strong, random passwords with Web Crypto API' },
    { href: '/tools/uuid-generator', label: 'UUID Generator', description: 'Generate unique identifiers (UUID v4)' },
    { href: '/tools/url-encoder', label: 'URL Encoder', description: 'Encode or decode URLs before putting them in a QR code' },
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode an image as a data URI' },
  ],
};

export default function QrGeneratorPage() {
  return (
    <>
      <QrGeneratorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/qr-generator"
        description={metadata.description as string}
        features={['Custom colors', 'Custom size', 'Error correction levels', 'Local generation', 'PNG download']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
