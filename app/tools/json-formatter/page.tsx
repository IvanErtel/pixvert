import type { Metadata } from 'next';
import JsonFormatterTool from './JsonFormatterTool';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator Online Free — Pixvert',
  description:
    'Format, validate, and minify JSON online. Pretty-print with 2 or 4 spaces, detect syntax errors, and minify for production. Free and private.',
  openGraph: { title: 'JSON Formatter & Validator — Pixvert', type: 'website' },
};

export default function JsonFormatterPage() {
  return <JsonFormatterTool />;
}
