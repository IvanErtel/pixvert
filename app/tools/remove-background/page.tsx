import type { Metadata } from 'next';
import ComingSoonTool from '@/components/ComingSoonTool';

export const metadata: Metadata = {
  title: 'Remove Image Background Free — Pixvert',
  description:
    'Remove backgrounds from images online for free. AI-powered background removal with transparent PNG output. 100% private — your photos never leave your browser.',
  openGraph: {
    title: 'Remove Image Background Free — Pixvert',
    description:
      'Free AI background remover. Transparent PNG output. No upload — 100% browser-based and private.',
    type: 'website',
  },
};

export default function RemoveBackgroundPage() {
  return (
    <ComingSoonTool
      toolKey="remove-background"
      title="Remove Image Background — Free"
      subtitle="AI-powered background removal that runs entirely in your browser. Get a transparent PNG in seconds — no upload, no account required."
      tags={['AI-powered', 'Transparent PNG', 'No upload', 'Free']}
      benefits={[
        {
          icon: '🤖',
          title: 'AI background removal',
          description: 'Machine learning model detects and removes backgrounds automatically — no manual selection needed.',
        },
        {
          icon: '🔍',
          title: 'Hair & detail aware',
          description: 'Preserves fine details like hair strands and transparent edges that simple tools miss.',
        },
        {
          icon: '🔒',
          title: '100% private',
          description: 'The AI model runs entirely in your browser. Your photos never leave your device.',
        },
      ]}
    />
  );
}
