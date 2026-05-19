import type { Metadata } from 'next';
import WordCounterTool from './WordCounterTool';

export const metadata: Metadata = {
  title: 'Word Counter Online Free — Pixvert',
  description:
    'Count words, characters, sentences, paragraphs, and reading time in real time. Free, private, no upload.',
  openGraph: { title: 'Word Counter — Pixvert', type: 'website' },
};

export default function WordCounterPage() {
  return <WordCounterTool />;
}
