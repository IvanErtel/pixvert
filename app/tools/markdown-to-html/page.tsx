import type { Metadata } from 'next';
import MarkdownToHtmlTool from './MarkdownToHtmlTool';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter Free Online | Pixvert',
  description:
    'Convert Markdown to clean HTML instantly. Live preview, syntax support for headings, bold, code blocks, tables, and links.',
  openGraph: { title: 'Markdown to HTML — Pixvert', type: 'website' },
};

export default function MarkdownToHtmlPage() {
  return <MarkdownToHtmlTool />;
}
