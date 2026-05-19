import type { Metadata } from 'next';
import MetaTagsTool from './MetaTagsTool';

export const metadata: Metadata = {
  title: 'Meta Tags Generator Online Free — SEO & Open Graph | Pixvert',
  description:
    'Generate SEO meta tags, Open Graph (Facebook), and Twitter Card tags. Preview how your page looks in search results and social media. Free.',
  openGraph: { title: 'Meta Tags Generator — Pixvert', type: 'website' },
};

export default function MetaTagsPage() {
  return <MetaTagsTool />;
}
