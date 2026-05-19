import type { Metadata } from 'next';
import HtaccessGeneratorTool from './HtaccessGeneratorTool';

export const metadata: Metadata = {
  title: '.htaccess Generator Online Free — Apache Config | Pixvert',
  description:
    'Generate an Apache .htaccess file with HTTPS redirect, Gzip, browser caching, security headers, custom error pages and 301/302 redirects. Free.',
  openGraph: { title: '.htaccess Generator — Pixvert', type: 'website' },
};

export default function HtaccessGeneratorPage() {
  return <HtaccessGeneratorTool />;
}
