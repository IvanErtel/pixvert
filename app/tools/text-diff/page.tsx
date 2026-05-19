import type { Metadata } from 'next';
import TextDiffTool from './TextDiffTool';

export const metadata: Metadata = {
  title: 'Text Diff Checker Online Free — Pixvert',
  description:
    'Compare two texts and highlight the differences. Line-by-line diff with added and removed lines clearly marked. Free and private.',
  openGraph: { title: 'Text Diff Checker — Pixvert', type: 'website' },
};

export default function TextDiffPage() {
  return <TextDiffTool />;
}
