import type { Metadata } from 'next';
import DateDifferenceTool from './DateDifferenceTool';

export const metadata: Metadata = {
  title: 'Date Difference Calculator Online Free — Days Between Dates | Pixvert',
  description:
    'Calculate the number of days, weeks, and months between two dates. Optionally exclude weekends. Free online date difference calculator.',
  openGraph: { title: 'Date Difference Calculator — Pixvert', type: 'website' },
};

export default function DateDifferencePage() {
  return <DateDifferenceTool />;
}
