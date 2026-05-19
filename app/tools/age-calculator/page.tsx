import type { Metadata } from 'next';
import AgeCalculatorTool from './AgeCalculatorTool';

export const metadata: Metadata = {
  title: 'Age Calculator Online Free — Exact Age in Years Months Days | Pixvert',
  description:
    'Calculate your exact age in years, months, days, weeks, and hours. Free age calculator with next birthday countdown. Works for any date.',
  openGraph: { title: 'Age Calculator — Pixvert', type: 'website' },
};

export default function AgeCalculatorPage() {
  return <AgeCalculatorTool />;
}
