import type { Metadata } from 'next';
import ColorPaletteTool from './ColorPaletteTool';

export const metadata: Metadata = {
  title: 'Color Palette Generator Online Free — Pixvert',
  description:
    'Generate harmonious color palettes from any base color. Complementary, triadic, analogous, split-complementary, and shades. Free and instant.',
  openGraph: { title: 'Color Palette Generator — Pixvert', type: 'website' },
};

export default function ColorPalettePage() {
  return <ColorPaletteTool />;
}
