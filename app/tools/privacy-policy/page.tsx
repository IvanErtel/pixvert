import type { Metadata } from 'next';
import PrivacyPolicyTool from './PrivacyPolicyTool';

export const metadata: Metadata = {
  title: 'Privacy Policy Generator Free Online — GDPR | Pixvert',
  description:
    'Generate a privacy policy for your website in seconds. Includes GDPR, cookies, analytics, and third-party sections. Download as .txt.',
  openGraph: { title: 'Privacy Policy Generator — Pixvert', type: 'website' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyTool />;
}
