import type { Metadata } from 'next';
import WordFrequencyTool from './WordFrequencyTool';

export const metadata: Metadata = {
  title: 'Word Frequency Counter Online Free — Pixvert',
  description:
    'Count how many times each word appears in a text. Sort by frequency or alphabetically. Free and private.',
  openGraph: { title: 'Word Frequency Counter — Pixvert', type: 'website' },
};

export default function WordFrequencyPage() {
  return <WordFrequencyTool />;
}
