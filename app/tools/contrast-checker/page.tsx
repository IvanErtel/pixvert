import type { Metadata } from 'next';
import ContrastCheckerTool from './ContrastCheckerTool';

export const metadata: Metadata = {
  title: 'WCAG Contrast Checker Online Free — Pixvert',
  description:
    'Check the contrast ratio between two colors for WCAG AA and AAA accessibility compliance. Free and instant.',
  openGraph: { title: 'WCAG Contrast Checker — Pixvert', type: 'website' },
};

export default function ContrastCheckerPage() {
  return <ContrastCheckerTool />;
}
