import type { Metadata } from 'next';
import GradientGeneratorTool from './GradientGeneratorTool';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator Online Free — Pixvert',
  description:
    'Create CSS gradients visually. Linear, radial, and conic gradients. Copy the ready-to-use CSS code. Free and private.',
  openGraph: { title: 'CSS Gradient Generator — Pixvert', type: 'website' },
};

export default function GradientGeneratorPage() {
  return <GradientGeneratorTool />;
}
