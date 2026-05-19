import type { Metadata } from 'next';
import TextToSlugTool from './TextToSlugTool';

export const metadata: Metadata = {
  title: 'Text to Slug Converter Online Free — Pixvert',
  description:
    'Convert any text to a URL-friendly slug. Removes accents, spaces, and special characters. Choose separator: hyphen, underscore, or dot. Free and instant.',
  openGraph: { title: 'Text to Slug Converter — Pixvert', type: 'website' },
};

export default function TextToSlugPage() {
  return <TextToSlugTool />;
}
