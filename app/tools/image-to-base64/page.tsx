import type { Metadata } from 'next';
import ImageToBase64Tool from './ImageToBase64Tool';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter Online Free — Pixvert',
  description:
    'Convert any image to Base64 data URI. Get ready-to-use HTML, CSS, and JSON snippets. Decode Base64 back to image. 100% local — no upload required.',
  openGraph: {
    title: 'Image to Base64 Converter — Pixvert',
    description: 'Encode images to Base64 data URIs and decode them back. Free, private, instant.',
    type: 'website',
  },
};

export default function ImageToBase64Page() {
  return <ImageToBase64Tool />;
}
