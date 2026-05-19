import type { Metadata } from 'next';
import RemoveBlankLinesTool from './RemoveBlankLinesTool';

export const metadata: Metadata = {
  title: 'Remove Blank Lines Online Free — Pixvert',
  description:
    'Remove all blank lines or collapse multiple blank lines into one. Also trim trailing whitespace. Free and instant.',
  openGraph: { title: 'Remove Blank Lines — Pixvert', type: 'website' },
};

export default function RemoveBlankLinesPage() {
  return <RemoveBlankLinesTool />;
}
