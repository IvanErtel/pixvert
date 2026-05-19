import type { Metadata } from 'next';
import UnitConverterTool from './UnitConverterTool';

export const metadata: Metadata = {
  title: 'Unit Converter Online Free — Length Weight Temperature Volume | Pixvert',
  description:
    'Convert units of length, weight, temperature, volume, speed, and area. Free online unit converter with instant results. No signup needed.',
  openGraph: { title: 'Unit Converter — Pixvert', type: 'website' },
};

export default function UnitConverterPage() {
  return <UnitConverterTool />;
}
