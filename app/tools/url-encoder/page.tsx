import type { Metadata } from 'next';
import UrlEncoderTool from './UrlEncoderTool';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder Online Free — Pixvert',
  description:
    'Encode and decode URLs and query strings. Converts spaces to %20, special characters to percent-encoding, and back. Free and instant.',
  openGraph: { title: 'URL Encoder / Decoder — Pixvert', type: 'website' },
};

export default function UrlEncoderPage() {
  return <UrlEncoderTool />;
}
