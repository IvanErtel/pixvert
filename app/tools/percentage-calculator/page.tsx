import type { Metadata } from 'next';
import PercentageCalculatorTool from './PercentageCalculatorTool';

export const metadata: Metadata = {
  title: 'Percentage Calculator Online Free — 5 Calculators | Pixvert',
  description:
    'Calculate percentages, percentage change, add or subtract a percentage, and more. Free online percentage calculator — 5 modes, instant results.',
  openGraph: { title: 'Percentage Calculator — Pixvert', type: 'website' },
};

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorTool />;
}
