import type { Metadata } from 'next';
import MortgageCalculatorTool from './MortgageCalculatorTool';

export const metadata: Metadata = {
  title: 'Mortgage Calculator Online Free — Monthly Payment | Pixvert',
  description:
    'Calculate your monthly mortgage payment, total cost, and total interest instantly. Free mortgage calculator with amortization breakdown.',
  openGraph: { title: 'Mortgage Calculator — Pixvert', type: 'website' },
};

export default function MortgageCalculatorPage() {
  return <MortgageCalculatorTool />;
}
