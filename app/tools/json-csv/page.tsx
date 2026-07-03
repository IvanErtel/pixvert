import type { Metadata } from 'next';
import JsonCsvTool from './JsonCsvTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter Online Free — Pixvert',
  description:
    'Convert JSON arrays to CSV and CSV back to JSON. Handles nested objects, custom delimiters, and headers. Free and private.',
  openGraph: { title: 'JSON ↔ CSV Converter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/json-csv',
  },
};

const seo: ToolSEOData = {
  toolName: 'JSON ↔ CSV Converter',
  whatIsHeading: 'What is a JSON to CSV converter?',
  whatIsParagraphs: [
    'A JSON to CSV converter transforms an array of JSON objects into a spreadsheet-friendly CSV table, with each object becoming a row and each key becoming a column — and it works in reverse too, turning a CSV file back into a JSON array. Pixvert\'s converter handles nested objects, lets you choose a custom delimiter, and correctly generates headers from your data\'s keys.',
    'APIs return data as JSON, but most people analyze, filter, or share data using spreadsheet tools like Excel or Google Sheets, which expect CSV or a similar tabular format. Converting between the two lets developers hand data off to non-technical teammates, or import data into an app that only accepts one format.',
    'Nested JSON — objects within objects, or arrays within objects — doesn\'t map directly onto a flat table, so this tool flattens nested structures into dot-notation or bracket-notation columns so no data is silently lost during conversion.',
  ],
  howToHeading: 'How to convert between JSON and CSV',
  howToSteps: [
    { title: 'Choose a direction', description: 'select JSON to CSV, or CSV to JSON' },
    { title: 'Paste your data', description: 'drop in your JSON array or CSV table' },
    { title: 'Set the delimiter', description: 'choose comma, semicolon, or tab depending on your target application' },
    { title: 'Review the converted output', description: 'the result updates instantly' },
    { title: 'Copy or download', description: 'copy the result or download it as a file' },
  ],
  useCasesHeading: 'When to use a JSON ↔ CSV converter',
  useCases: [
    { title: 'Sharing API data with non-technical teammates', description: 'Convert a JSON API response into a CSV that opens cleanly in Excel or Google Sheets.' },
    { title: 'Importing spreadsheet data into an app', description: 'Convert a CSV export into JSON to feed into a script, database seed, or API request.' },
    { title: 'Data analysis and reporting', description: 'Turn structured JSON logs or records into a table for filtering, sorting, and pivot analysis.' },
    { title: 'Migrating between systems', description: 'Convert data exported in one format into whatever format the destination system requires.' },
  ],
  whyHeading: 'Why use Pixvert\'s JSON ↔ CSV converter?',
  whyReasons: [
    { title: 'Works both directions', description: 'convert JSON to CSV or CSV back to JSON in the same tool' },
    { title: 'Handles nested objects', description: 'flattens nested JSON structures into usable CSV columns' },
    { title: 'Custom delimiters', description: 'choose comma, semicolon, or tab to match your target application' },
    { title: '100% private, free, no signup', description: 'your data is processed entirely in your browser' },
  ],
  faqs: [
    { question: 'Is my data sent to a server?', answer: 'No, all conversion happens locally in your browser using JavaScript. Your JSON or CSV data is never transmitted or stored.' },
    { question: 'How are nested JSON objects handled?', answer: 'Nested objects are flattened into separate columns using dot notation (e.g. address.city), so no data is lost in the CSV output.' },
    { question: 'What delimiter should I use?', answer: 'Comma is the standard CSV delimiter and works with most spreadsheet software. Use semicolon if your data contains commas, or if your target application (common in some European locales) expects it.' },
    { question: 'Does the tool require a specific JSON structure?', answer: 'It expects a JSON array of objects, where each object represents one row. A single object or a differently structured JSON file may need to be adapted first.' },
    { question: 'What happens to arrays inside JSON objects?', answer: 'Arrays within an object are typically serialized into a single column as a delimited string, since CSV has no native way to represent nested lists.' },
    { question: 'Can I convert very large datasets?', answer: 'There is no hard limit set by Pixvert, but very large files depend on your device\'s available memory since processing happens in your browser.' },
  ],
  relatedTools: [
    { href: '/tools/json-formatter', label: 'JSON Formatter', description: 'Format, validate, and minify JSON' },
    { href: '/tools/excel-to-csv', label: 'Excel to CSV', description: 'Convert Excel spreadsheets to CSV' },
    { href: '/tools/word-frequency', label: 'Word Frequency', description: 'Analyze word frequency in a text dataset' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two text or data files' },
  ],
};

export default function JsonCsvPage() {
  return (
    <>
      <JsonCsvTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/json-csv"
        description={metadata.description as string}
        features={['JSON to CSV', 'CSV to JSON', 'Nested object flattening', 'Custom delimiters']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
