import type { Metadata } from 'next';
import HtmlFormatterTool from './HtmlFormatterTool';

export const metadata: Metadata = {
  title: 'HTML Formatter & Beautifier Online Free — Pixvert',
  description:
    'Format and beautify HTML code with proper indentation. Also minify HTML for production. Free and private.',
  openGraph: { title: 'HTML Formatter — Pixvert', type: 'website' },
};

export default function HtmlFormatterPage() {
  return <HtmlFormatterTool />;
}
