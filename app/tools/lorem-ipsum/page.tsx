import type { Metadata } from 'next';
import LoremIpsumTool from './LoremIpsumTool';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator Online Free — Pixvert',
  description:
    'Generate Lorem Ipsum placeholder text. Choose paragraphs, words, or sentences. Classic or random. Free and instant.',
  openGraph: { title: 'Lorem Ipsum Generator — Pixvert', type: 'website' },
};

export default function LoremIpsumPage() {
  return <LoremIpsumTool />;
}
