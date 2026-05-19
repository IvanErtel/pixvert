import type { Metadata } from 'next';
import CssMinifierTool from './CssMinifierTool';

export const metadata: Metadata = {
  title: 'CSS Minifier Online Free — Pixvert',
  description:
    'Minify CSS online. Removes comments, extra whitespace, and unnecessary characters. See exact byte reduction. Free and private.',
  openGraph: { title: 'CSS Minifier — Pixvert', type: 'website' },
};

export default function CssMinifierPage() {
  return <CssMinifierTool />;
}
