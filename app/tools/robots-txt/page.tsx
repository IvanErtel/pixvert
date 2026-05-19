import type { Metadata } from 'next';
import RobotsTxtTool from './RobotsTxtTool';

export const metadata: Metadata = {
  title: 'Robots.txt Generator Free Online | Pixvert',
  description:
    'Generate a robots.txt file for your website. Block AI crawlers (GPTBot, ClaudeBot), set crawl delay, add sitemap URL. Download instantly.',
  openGraph: { title: 'Robots.txt Generator — Pixvert', type: 'website' },
};

export default function RobotsTxtPage() {
  return <RobotsTxtTool />;
}
