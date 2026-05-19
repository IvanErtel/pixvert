import type { Metadata } from 'next';
import BmiCalculatorTool from './BmiCalculatorTool';

export const metadata: Metadata = {
  title: 'BMI Calculator Online Free — Body Mass Index | Pixvert',
  description:
    'Calculate your BMI (Body Mass Index) with metric or imperial units. Free online BMI calculator with healthy range chart. Results instant.',
  openGraph: { title: 'BMI Calculator — Pixvert', type: 'website' },
};

export default function BmiCalculatorPage() {
  return <BmiCalculatorTool />;
}
