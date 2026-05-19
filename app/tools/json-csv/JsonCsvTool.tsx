'use client';

import { useState } from 'react';

type Tab = 'json-to-csv' | 'csv-to-json';
type Delimiter = ',' | ';' | '\t';

// Escape a value for CSV: wrap in quotes if it contains delimiter, quote, or newline
function csvEscape(value: unknown, delim: string): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (str.includes(delim) || str.includes('"') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function jsonToCsv(json: string, delim: Delimiter): string {
  const data = JSON.parse(json);
  if (!Array.isArray(data)) throw new Error('JSON must be an array of objects ([ {...}, {...} ])');
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => csvEscape(row[h], delim)).join(delim),
  );
  return [headers.map((h) => csvEscape(h, delim)).join(delim), ...rows].join('\n');
}

function parseCSVLine(line: string, delim: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === delim && !inQuotes) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

function csvToJson(csv: string, delim: Delimiter): string {
  const lines = csv.trim().split('\n').filter(Boolean);
  if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row');
  const headers = parseCSVLine(lines[0], delim);
  const rows = lines.slice(1).map((line) => {
    const vals = parseCSVLine(line, delim);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), vals[i]?.trim() ?? '']));
  });
  return JSON.stringify(rows, null, 2);
}

const JSON_SAMPLE = `[
  {"name":"Alice","age":30,"city":"Madrid"},
  {"name":"Bob","age":25,"city":"Barcelona"},
  {"name":"Carlos","age":35,"city":"Seville"}
]`;

const CSV_SAMPLE = `name,age,city\nAlice,30,Madrid\nBob,25,Barcelona\nCarlos,35,Seville`;

export default function JsonCsvTool() {
  const [tab, setTab] = useState<Tab>('json-to-csv');
  const [input, setInput] = useState('');
  const [delim, setDelim] = useState<Delimiter>(',');
  const [copied, setCopied] = useState(false);

  const result = (() => {
    if (!input.trim()) return { output: '', error: null };
    try {
      const output = tab === 'json-to-csv' ? jsonToCsv(input, delim) : csvToJson(input, delim);
      return { output, error: null };
    } catch (e) {
      return { output: '', error: (e as Error).message };
    }
  })();

  const copy = async () => {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!result.output) return;
    const ext = tab === 'json-to-csv' ? 'csv' : 'json';
    const mime = tab === 'json-to-csv' ? 'text/csv' : 'application/json';
    const blob = new Blob([result.output], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const DELIMITERS: { value: Delimiter; label: string }[] = [
    { value: ',', label: 'Comma (,)' },
    { value: ';', label: 'Semicolon (;)' },
    { value: '\t', label: 'Tab (\\t)' },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">JSON ↔ CSV Converter — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Convert JSON arrays to CSV spreadsheets and CSV back to JSON. Handles quoted fields,
          custom delimiters, and special characters.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 items-center mb-5">
        <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          {(['json-to-csv', 'csv-to-json'] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setInput(''); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                           : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}>
              {t === 'json-to-csv' ? 'JSON → CSV' : 'CSV → JSON'}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {DELIMITERS.map(({ value, label }) => (
            <button key={label} onClick={() => setDelim(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                delim === value ? 'bg-indigo-600 text-white'
                               : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-2">
        <button onClick={() => setInput(tab === 'json-to-csv' ? JSON_SAMPLE : CSV_SAMPLE)}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
          Load sample
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5 block">
            {tab === 'json-to-csv' ? 'JSON (array of objects)' : 'CSV'}
          </span>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={tab === 'json-to-csv' ? JSON_SAMPLE : CSV_SAMPLE}
            rows={16}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {tab === 'json-to-csv' ? 'CSV' : 'JSON'}
            </span>
            {result.output && (
              <div className="flex gap-3">
                <button onClick={download} className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors">Download</button>
                <button onClick={copy} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            )}
          </div>
          <div className={`w-full rounded-xl border px-4 py-3 text-sm font-mono min-h-64 whitespace-pre-wrap break-all overflow-auto bg-white dark:bg-slate-900 ${
            result.error ? 'border-red-300 dark:border-red-800 text-red-600 dark:text-red-400'
                         : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
          }`}>
            {result.error ? `✗ ${result.error}` : result.output}
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⇄</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Bidirectional</h2>
          <p className="text-slate-500 dark:text-slate-400">Convert JSON arrays to CSV or parse CSV back into JSON objects. Both directions.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚙️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Custom delimiter</h2>
          <p className="text-slate-500 dark:text-slate-400">Supports comma, semicolon (European Excel), and tab-separated values.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">💾</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Download result</h2>
          <p className="text-slate-500 dark:text-slate-400">Copy to clipboard or download as a .csv or .json file directly from the browser.</p>
        </div>
      </section>
    </div>
  );
}
