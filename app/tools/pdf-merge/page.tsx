import type { Metadata } from 'next';
import PdfMergeTool from './PdfMergeTool';

export const metadata: Metadata = {
  title: 'PDF Merger Free Online — Combine PDFs | Pixvert',
  description:
    'Merge multiple PDF files into one document. Drag to reorder, download instantly. 100% private — files never leave your browser.',
  openGraph: { title: 'PDF Merger — Pixvert', type: 'website' },
};

export default function PdfMergePage() {
  return <PdfMergeTool />;
}
