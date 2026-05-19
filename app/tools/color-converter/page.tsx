import type { Metadata } from 'next';
import ColorConverterTool from './ColorConverterTool';

export const metadata: Metadata = {
  title: 'Color Converter Online Free — HEX RGB HSL | Pixvert',
  description:
    'Convert colors between HEX, RGB, and HSL formats. Paste any value and get all three formats instantly. Free and private.',
  openGraph: { title: 'Color Converter HEX RGB HSL — Pixvert', type: 'website' },
};

export default function ColorConverterPage() {
  return <ColorConverterTool />;
}
