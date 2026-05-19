import type { Metadata } from 'next';
import VatCalculatorTool from './VatCalculatorTool';

export const metadata: Metadata = {
  title: 'VAT Calculator Spain Free — IVA 21% 10% 4% | Pixvert',
  description:
    'Add or extract Spanish VAT (IVA) at 21%, 10%, or 4%. Free online VAT calculator — results update instantly, no signup needed.',
  openGraph: { title: 'VAT Calculator Spain — Pixvert', type: 'website' },
};

export default function VatCalculatorPage() {
  return <VatCalculatorTool />;
}
