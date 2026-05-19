import type { Metadata } from 'next';
import EmailSignatureTool from './EmailSignatureTool';

export const metadata: Metadata = {
  title: 'Email Signature Generator Free Online — HTML | Pixvert',
  description:
    'Create a professional HTML email signature in seconds. Classic, Modern, and Minimal templates. Works with Gmail, Outlook, and Apple Mail.',
  openGraph: { title: 'Email Signature Generator — Pixvert', type: 'website' },
};

export default function EmailSignaturePage() {
  return <EmailSignatureTool />;
}
