import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Online Tools — Images, Text, Code, Colors & More | Pixvert',
  description:
    'Free browser-based tools for images, text, code, colors, and calculations. No upload, no login, no tracking. Everything runs locally in your browser.',
  openGraph: {
    title: 'Free Online Tools — Pixvert',
    description:
      'Image converters, text utilities, color tools, calculators, and generators — all free, all private, all in your browser.',
    type: 'website',
  },
};

type ToolStatus = 'live' | 'building' | 'planned';

interface Tool {
  name: string;
  desc: string;
  href: string;
  status: ToolStatus;
  icon: string;
}

interface Category {
  name: string;
  icon: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    name: 'Image Tools',
    icon: '🖼️',
    tools: [
      { name: 'Image Converter', desc: 'Convert PNG, JPG, WebP, AVIF, BMP, GIF, TIFF, ICO', href: '/', status: 'live', icon: '🔄' },
      { name: 'Image Resizer', desc: 'Set exact pixel dimensions and lock aspect ratio', href: '/tools/resize', status: 'live', icon: '📐' },
      { name: 'Image Compressor', desc: 'Reduce file size with quality control', href: '/compress/image', status: 'live', icon: '🗜️' },
      { name: 'Rotate & Flip', desc: 'Rotate 90°/180° or flip horizontally/vertically', href: '/tools/rotate', status: 'live', icon: '🔃' },
      { name: 'Image to Base64', desc: 'Encode any image as a Base64 data URI', href: '/tools/image-to-base64', status: 'live', icon: '🔡' },
      { name: 'Add Watermark', desc: 'Stamp custom text on your images', href: '/tools/watermark', status: 'live', icon: '💧' },
      { name: 'Image Cropper', desc: 'Crop with preset ratios or exact pixel coordinates', href: '/tools/crop', status: 'building', icon: '✂️' },
      { name: 'Remove Background', desc: 'Remove the background from any photo', href: '/tools/remove-background', status: 'building', icon: '🖼️' },
      { name: 'Image to PDF', desc: 'Pack one or more images into a PDF', href: '#', status: 'planned', icon: '📄' },
      { name: 'Favicon Generator', desc: 'Generate all favicon sizes from any image', href: '#', status: 'planned', icon: '⭐' },
    ],
  },
  {
    name: 'Text Tools',
    icon: '✍️',
    tools: [
      { name: 'Word Counter', desc: 'Count words, characters, sentences, and paragraphs', href: '/tools/word-counter', status: 'live', icon: '🔢' },
      { name: 'Case Converter', desc: 'UPPER, lower, Title Case, camelCase, snake_case', href: '/tools/case-converter', status: 'live', icon: 'Aa' },
      { name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text in seconds', href: '/tools/lorem-ipsum', status: 'live', icon: '📝' },
      { name: 'Text Diff', desc: 'Compare two texts and highlight differences', href: '/tools/text-diff', status: 'live', icon: '↔️' },
      { name: 'URL Encoder / Decoder', desc: 'Encode or decode URL special characters', href: '/tools/url-encoder', status: 'live', icon: '🔗' },
      { name: 'Base64 Text', desc: 'Encode and decode text as Base64', href: '/tools/base64-text', status: 'live', icon: '🔐' },
      { name: 'Text to Slug', desc: 'Convert text to URL-friendly slugs', href: '/tools/text-to-slug', status: 'live', icon: '🐌' },
      { name: 'Remove Accents', desc: 'Strip accents and diacritics from text', href: '/tools/remove-accents', status: 'live', icon: '´→' },
      { name: 'Word Frequency', desc: 'Count how many times each word appears', href: '/tools/word-frequency', status: 'live', icon: '📊' },
      { name: 'Remove Blank Lines', desc: 'Clean up text by removing duplicate line breaks', href: '/tools/remove-blank-lines', status: 'live', icon: '🧹' },
    ],
  },
  {
    name: 'Color Tools',
    icon: '🎨',
    tools: [
      { name: 'Color Picker', desc: 'Pick a color and get HEX, RGB, HSL values', href: '/tools/color-picker', status: 'live', icon: '🎯' },
      { name: 'Color Converter', desc: 'Convert between HEX, RGB, and HSL', href: '/tools/color-converter', status: 'live', icon: '🔄' },
      { name: 'Palette Generator', desc: 'Generate harmonious color palettes', href: '/tools/color-palette', status: 'live', icon: '🌈' },
      { name: 'Gradient Generator', desc: 'Create CSS gradients visually and copy the code', href: '/tools/gradient-generator', status: 'live', icon: '◐' },
      { name: 'Contrast Checker', desc: 'Check WCAG accessibility contrast ratios', href: '/tools/contrast-checker', status: 'live', icon: '♿' },
    ],
  },
  {
    name: 'Developer Tools',
    icon: '💻',
    tools: [
      { name: 'JSON Formatter', desc: 'Format, validate, and minify JSON', href: '/tools/json-formatter', status: 'live', icon: '{ }' },
      { name: 'JSON ↔ CSV', desc: 'Convert JSON to CSV and back', href: '/tools/json-csv', status: 'live', icon: '⇄' },
      { name: 'CSS Minifier', desc: 'Minify CSS to reduce file size', href: '/tools/css-minifier', status: 'live', icon: 'CSS' },
      { name: 'JS Minifier', desc: 'Minify JavaScript to reduce file size', href: '/tools/js-minifier', status: 'live', icon: 'JS' },
      { name: 'HTML Formatter', desc: 'Format and beautify HTML code', href: '/tools/html-formatter', status: 'live', icon: '<>' },
      { name: 'Meta Tags Generator', desc: 'Generate SEO and Open Graph meta tags', href: '/tools/meta-tags', status: 'live', icon: '🏷️' },
      { name: '.htaccess Generator', desc: 'Generate Apache .htaccess rules', href: '/tools/htaccess-generator', status: 'live', icon: '⚙️' },
    ],
  },
  {
    name: 'Calculators',
    icon: '🧮',
    tools: [
      { name: 'Mortgage Calculator', desc: 'Calculate monthly mortgage payments', href: '/tools/mortgage-calculator', status: 'live', icon: '🏠' },
      { name: 'VAT Calculator', desc: 'Spanish VAT: 21%, 10%, 4%', href: '/tools/vat-calculator', status: 'live', icon: '💶' },
      { name: 'Salary Calculator', desc: 'Gross to net salary with IRPF (Spain)', href: '/tools/salary-calculator', status: 'live', icon: '💼' },
      { name: 'Percentage Calculator', desc: 'Calculate percentages and changes', href: '/tools/percentage-calculator', status: 'live', icon: '%' },
      { name: 'BMI Calculator', desc: 'Body Mass Index with healthy range', href: '/tools/bmi-calculator', status: 'live', icon: '⚖️' },
      { name: 'Age Calculator', desc: 'Exact age in years, months, and days', href: '/tools/age-calculator', status: 'live', icon: '🎂' },
      { name: 'Date Difference', desc: 'Calculate days between two dates', href: '/tools/date-difference', status: 'live', icon: '📅' },
      { name: 'Unit Converter', desc: 'Weight, length, temperature, volume', href: '/tools/unit-converter', status: 'live', icon: '📏' },
      { name: 'Tip Calculator', desc: 'Calculate tips and split the bill', href: '/tools/tip-calculator', status: 'live', icon: '🍽️' },
    ],
  },
  {
    name: 'Generators',
    icon: '⚡',
    tools: [
      { name: 'QR Code Generator', desc: 'Generate QR codes for any text or URL', href: '/tools/qr-generator', status: 'live', icon: '▦' },
      { name: 'Password Generator', desc: 'Create strong, secure passwords', href: '/tools/password-generator', status: 'live', icon: '🔑' },
      { name: 'UUID Generator', desc: 'Generate UUIDs v4', href: '/tools/uuid-generator', status: 'live', icon: '🆔' },
      { name: 'Random Numbers', desc: 'Generate random numbers in any range', href: '/tools/random-numbers', status: 'live', icon: '🎲' },
      { name: 'Email Signature', desc: 'Create professional HTML email signatures', href: '/tools/email-signature', status: 'live', icon: '✉️' },
      { name: 'Privacy Policy Generator', desc: 'Generate a GDPR-compliant privacy policy', href: '/tools/privacy-policy', status: 'live', icon: '📜' },
      { name: 'Robots.txt Generator', desc: 'Generate robots.txt for your website', href: '/tools/robots-txt', status: 'live', icon: '🤖' },
    ],
  },
  {
    name: 'File Tools',
    icon: '📁',
    tools: [
      { name: 'PDF Merger', desc: 'Merge multiple PDFs into one document', href: '/tools/pdf-merge', status: 'live', icon: '📑' },
      { name: 'Markdown to HTML', desc: 'Convert Markdown to clean HTML', href: '/tools/markdown-to-html', status: 'live', icon: '📋' },
      { name: 'Excel to CSV', desc: 'Convert Excel spreadsheets to CSV', href: '/tools/excel-to-csv', status: 'live', icon: '📊' },
    ],
  },
];

const STATUS_BADGE: Record<ToolStatus, { label: string; className: string }> = {
  live: {
    label: 'Available',
    className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
  },
  building: {
    label: 'Building',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  planned: {
    label: 'Soon',
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
  },
};

export default function ToolsHubPage() {
  const totalLive = CATEGORIES.flatMap((c) => c.tools).filter((t) => t.status === 'live').length;
  const totalTools = CATEGORIES.flatMap((c) => c.tools).length;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Free Online Tools
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          {totalLive} tools available now. {totalTools} total planned. No upload, no login — everything
          runs locally in your browser.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-5 text-sm">
          {['100% Private', 'No signup', 'Always free', 'Works offline'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => (
          <section key={category.name}>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.tools.map((tool) => {
                const badge = STATUS_BADGE[tool.status];
                const isClickable = tool.status !== 'planned' && tool.href !== '#';

                const card = (
                  <div
                    className={`group rounded-xl border p-4 transition-all ${
                      isClickable
                        ? 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md cursor-pointer bg-white dark:bg-slate-900'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{tool.icon}</span>
                        <span
                          className={`font-semibold text-sm ${
                            isClickable
                              ? 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                              : 'text-slate-500 dark:text-slate-500'
                          }`}
                        >
                          {tool.name}
                        </span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${badge.className}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                );

                return isClickable ? (
                  <Link key={tool.name} href={tool.href}>
                    {card}
                  </Link>
                ) : (
                  <div key={tool.name}>{card}</div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
