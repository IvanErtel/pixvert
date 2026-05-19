import type { Metadata } from 'next';
import RemoveAccentsTool from './RemoveAccentsTool';

export const metadata: Metadata = {
  title: 'Remove Accents Online Free — Pixvert',
  description:
    'Remove accents and diacritics from text. Converts é→e, ñ→n, ü→u, ç→c, and all Unicode diacritics. Free and instant.',
  openGraph: { title: 'Remove Accents — Pixvert', type: 'website' },
};

export default function RemoveAccentsPage() {
  return <RemoveAccentsTool />;
}
