import type { Metadata } from 'next';
import PasswordGeneratorTool from './PasswordGeneratorTool';

export const metadata: Metadata = {
  title: 'Password Generator Free Online — Strong & Secure | Pixvert',
  description:
    'Generate strong, secure passwords with custom length and character sets. Uses cryptographic randomness. Bulk generation, strength indicator.',
  openGraph: { title: 'Password Generator — Pixvert', type: 'website' },
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorTool />;
}
