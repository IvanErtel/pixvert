import type { Metadata } from 'next';
import JsMinifierTool from './JsMinifierTool';

export const metadata: Metadata = {
  title: 'JavaScript Minifier Online Free — Pixvert',
  description:
    'Minify JavaScript online. Removes comments and collapses whitespace. See exact byte reduction. Free and private.',
  openGraph: { title: 'JavaScript Minifier — Pixvert', type: 'website' },
};

export default function JsMinifierPage() {
  return <JsMinifierTool />;
}
