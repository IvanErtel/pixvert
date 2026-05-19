'use client';

import { useState, useRef, useCallback } from 'react';

interface SheetResult {
  name: string;
  csv: string;
  rows: number;
  cols: number;
}

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ExcelToCsvTool() {
  const [sheets, setSheets] = useState<SheetResult[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(async (file: File) => {
    setError('');
    setSheets([]);
    setConverting(true);
    setFileName(file.name);
    setFileSize(file.size);
    try {
      const { read, utils } = await import('xlsx');
      const buf = await file.arrayBuffer();
      const wb = read(buf, { type: 'array' });
      const results: SheetResult[] = wb.SheetNames.map((name) => {
        const ws = wb.Sheets[name];
        const csv = utils.sheet_to_csv(ws);
        const range = utils.decode_range(ws['!ref'] ?? 'A1:A1');
        return {
          name,
          csv,
          rows: range.e.r - range.s.r + 1,
          cols: range.e.c - range.s.c + 1,
        };
      });
      setSheets(results);
      setActiveSheet(0);
    } catch {
      setError('Failed to read the file. Make sure it is a valid Excel (.xlsx, .xls) or CSV file.');
    } finally {
      setConverting(false);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) convert(file);
  }, [convert]);

  function download(sheet: SheetResult) {
    const blob = new Blob([sheet.csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const base = fileName.replace(/\.[^.]+$/, '');
    a.download = sheets.length > 1 ? `${base}_${sheet.name}.csv` : `${base}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    sheets.forEach((s) => download(s));
  }

  async function copy() {
    if (!sheets[activeSheet]) return;
    await navigator.clipboard.writeText(sheets[activeSheet].csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const current = sheets[activeSheet];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Excel to CSV Converter — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Convert Excel (.xlsx, .xls) files to CSV. All sheets extracted separately. Nothing is uploaded — runs entirely in your browser.
        </p>
      </div>

      {/* Drop zone */}
      {sheets.length === 0 && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed cursor-pointer transition-colors p-12 text-center ${
            dragging
              ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-slate-900'
          }`}
        >
          <div className="text-4xl mb-3">📊</div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Drop your Excel file here or <span className="text-indigo-600 dark:text-indigo-400">click to browse</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">.xlsx · .xls · .csv</p>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) convert(e.target.files[0]); }}
          />
        </div>
      )}

      {converting && (
        <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-sm">
          Converting…
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {sheets.length > 0 && (
        <>
          {/* File info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📗</span>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{fileName}</p>
                <p className="text-xs text-slate-400">{fmtSize(fileSize)} · {sheets.length} sheet{sheets.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {sheets.length > 1 && (
                <button
                  onClick={downloadAll}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Download all
                </button>
              )}
              <button
                onClick={() => { setSheets([]); setFileName(''); setError(''); if (inputRef.current) inputRef.current.value = ''; }}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                New file
              </button>
            </div>
          </div>

          {/* Sheet tabs */}
          {sheets.length > 1 && (
            <div className="flex gap-1 mb-3 flex-wrap">
              {sheets.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveSheet(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    i === activeSheet
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {current && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {current.rows} rows · {current.cols} columns
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={copy}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy CSV'}
                  </button>
                  <button
                    onClick={() => download(current)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                  >
                    Download .csv
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 max-h-80 overflow-auto">
                <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre select-all">
                  {current.csv.slice(0, 5000)}{current.csv.length > 5000 ? '\n…(truncated for display)' : ''}
                </pre>
              </div>
            </>
          )}
        </>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">100% private</h2>
          <p className="text-slate-500 dark:text-slate-400">Your spreadsheet is processed locally. It never leaves your device.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Multi-sheet</h2>
          <p className="text-slate-500 dark:text-slate-400">All sheets extracted separately. Download them all at once.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📊</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">xlsx & xls</h2>
          <p className="text-slate-500 dark:text-slate-400">Supports all modern Excel formats including legacy .xls files.</p>
        </div>
      </section>
    </div>
  );
}
