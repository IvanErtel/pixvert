import type { Metadata } from 'next';
import RotateTool from './RotateTool';

export const metadata: Metadata = {
  title: 'Rotate & Flip Images Online Free — Pixvert',
  description:
    'Rotate images 90°, 180°, or 270°. Flip horizontally or vertically. Download in PNG, JPEG, or WebP. 100% local — your files never leave your browser.',
  openGraph: {
    title: 'Rotate & Flip Images Online Free — Pixvert',
    description: 'Rotate and flip images directly in your browser. Free, private, instant.',
    type: 'website',
  },
};

export default function RotatePage() {
  return <RotateTool />;
}
