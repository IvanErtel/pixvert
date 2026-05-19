import type { Metadata } from 'next';
import CaseConverterTool from './CaseConverterTool';

export const metadata: Metadata = {
  title: 'Case Converter Online Free — Pixvert',
  description:
    'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. Free and instant.',
  openGraph: { title: 'Case Converter — Pixvert', type: 'website' },
};

export default function CaseConverterPage() {
  return <CaseConverterTool />;
}
