import type { Metadata } from 'next';
import JsonCsvTool from './JsonCsvTool';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter Online Free — Pixvert',
  description:
    'Convert JSON arrays to CSV and CSV back to JSON. Handles nested objects, custom delimiters, and headers. Free and private.',
  openGraph: { title: 'JSON ↔ CSV Converter — Pixvert', type: 'website' },
};

export default function JsonCsvPage() {
  return <JsonCsvTool />;
}
