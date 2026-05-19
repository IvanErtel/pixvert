import type { Metadata } from 'next';
import ExcelToCsvTool from './ExcelToCsvTool';

export const metadata: Metadata = {
  title: 'Excel to CSV Converter Free Online | Pixvert',
  description:
    'Convert Excel (.xlsx, .xls) files to CSV. All sheets extracted separately. 100% private — your spreadsheet never leaves your browser.',
  openGraph: { title: 'Excel to CSV — Pixvert', type: 'website' },
};

export default function ExcelToCsvPage() {
  return <ExcelToCsvTool />;
}
