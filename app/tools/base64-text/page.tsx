import type { Metadata } from 'next';
import Base64TextTool from './Base64TextTool';

export const metadata: Metadata = {
  title: 'Base64 Text Encoder / Decoder Online Free — Pixvert',
  description:
    'Encode text to Base64 and decode Base64 back to text. Supports UTF-8 with full Unicode. Free and instant.',
  openGraph: { title: 'Base64 Text Encoder / Decoder — Pixvert', type: 'website' },
};

export default function Base64TextPage() {
  return <Base64TextTool />;
}
