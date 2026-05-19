import type { Metadata } from 'next';
import WatermarkTool from './WatermarkTool';

export const metadata: Metadata = {
  title: 'Add Watermark to Images Online Free — Pixvert',
  description:
    'Add custom text watermarks to your images. Choose position, font, size, color, and opacity. Download in PNG, JPEG, or WebP. 100% local — no upload required.',
  openGraph: {
    title: 'Add Watermark to Images — Pixvert',
    description: 'Stamp text on images with full control over style and position. Free, private, instant.',
    type: 'website',
  },
};

export default function WatermarkPage() {
  return <WatermarkTool />;
}
