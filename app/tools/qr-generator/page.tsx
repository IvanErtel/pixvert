import type { Metadata } from 'next';
import QrGeneratorTool from './QrGeneratorTool';

export const metadata: Metadata = {
  title: 'QR Code Generator Free Online — Pixvert',
  description:
    'Generate QR codes for any URL, text, email, or phone number. Custom colors, sizes, and error correction. Download as PNG instantly.',
  openGraph: { title: 'QR Code Generator — Pixvert', type: 'website' },
};

export default function QrGeneratorPage() {
  return <QrGeneratorTool />;
}
