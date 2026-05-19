import type { Metadata } from 'next';
import SalaryCalculatorTool from './SalaryCalculatorTool';

export const metadata: Metadata = {
  title: 'Salary Calculator Spain Free — Net Salary IRPF 2024 | Pixvert',
  description:
    'Calculate your net salary in Spain after IRPF and Social Security deductions. Free gross-to-net salary calculator for 2024. 12 or 14 pagas.',
  openGraph: { title: 'Salary Calculator Spain — Pixvert', type: 'website' },
};

export default function SalaryCalculatorPage() {
  return <SalaryCalculatorTool />;
}
