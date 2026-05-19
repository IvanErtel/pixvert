import type { Metadata } from 'next';
import UuidGeneratorTool from './UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'UUID Generator Free Online — v4 UUIDs | Pixvert',
  description:
    'Generate version 4 UUIDs instantly. Bulk generation up to 100 at once. Uppercase and no-dash options. Copy all with one click.',
  openGraph: { title: 'UUID Generator — Pixvert', type: 'website' },
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorTool />;
}
