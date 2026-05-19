import type { Metadata } from 'next';
import TipCalculatorTool from './TipCalculatorTool';

export const metadata: Metadata = {
  title: 'Tip Calculator Online Free — Split the Bill | Pixvert',
  description:
    'Calculate tip and split the bill between any number of people. Preset tip percentages or enter a custom amount. Free tip calculator.',
  openGraph: { title: 'Tip Calculator — Pixvert', type: 'website' },
};

export default function TipCalculatorPage() {
  return <TipCalculatorTool />;
}
