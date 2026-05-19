import type { Metadata } from 'next';
import ColorPickerTool from './ColorPickerTool';

export const metadata: Metadata = {
  title: 'Color Picker Online Free — HEX, RGB, HSL | Pixvert',
  description:
    'Pick any color and instantly get its HEX, RGB, and HSL values. Copy each format with one click. Free and private.',
  openGraph: { title: 'Color Picker — Pixvert', type: 'website' },
};

export default function ColorPickerPage() {
  return <ColorPickerTool />;
}
