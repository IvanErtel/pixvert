import type { Metadata } from 'next';
import RandomNumbersTool from './RandomNumbersTool';

export const metadata: Metadata = {
  title: 'Random Number Generator Free Online | Pixvert',
  description:
    'Generate random integers or floats in any range. Unique numbers, bulk generation up to 1000, sorted output, and live statistics.',
  openGraph: { title: 'Random Number Generator — Pixvert', type: 'website' },
};

export default function RandomNumbersPage() {
  return <RandomNumbersTool />;
}
