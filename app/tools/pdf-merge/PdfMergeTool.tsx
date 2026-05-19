'use client';

import { useState, useRef, useCallback } from 'react';

interface PdfFile {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
}

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PdfMergeTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function readFile(file: File): Promise<PdfFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arr = new Uint8Array(e.target!.result as ArrayBuffer);
        resolve({ id: `${file.name}-${Date.now()}-${Math.random()}`, name: file.name, size: file.size, bytes: arr });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  async function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setError('');
    const pdfs = Array.from(fileList).filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    if (pdfs.length === 0) { setError('Please select PDF files only.'); return; }
    const loaded = await Promise.all(pdfs.map(readFile));
    setFiles((prev) => [...prev, ...loaded]);
  }

  function remove(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }

  function moveDown(idx: number) {
    setFiles((prev) => {
      if (idx === prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }

  const merge = useCallback(async () => {
    if (files.length < 2) { setError('Add at least 2 PDF files to merge.'); return; }
    setMerging(true);
    setError('');
    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      for (const file of files) {
        const doc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to merge PDFs. Make sure the files are valid and not password-protected.');
    } finally {
      setMerging(false);
    }
  }, [files]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          PDF Merger — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Combine multiple PDF files into one. Drag to reorder pages, then download the merged PDF.
          Everything runs in your browser — files never leave your device.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed cursor-pointer transition-colors p-10 text-center mb-5 ${
          dragging
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-slate-300 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-white dark:bg-slate-900'
        }`}
      >
        <div className="text-4xl mb-3">📄</div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Drop PDF files here or <span className="text-indigo-600 dark:text-indigo-400">click to browse</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">You can add multiple files at once</p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2 mb-5">
          {files.map((file, idx) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3"
            >
              <span className="text-red-400 text-lg shrink-0">📕</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{fmtSize(file.size)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs"
                  title="Move up"
                >↑</button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === files.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs"
                  title="Move down"
                >↓</button>
                <button
                  onClick={() => remove(file.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-xs"
                  title="Remove"
                >✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex items-center gap-3">
          <button
            onClick={merge}
            disabled={merging || files.length < 2}
            className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {merging ? 'Merging…' : `Merge ${files.length} PDFs`}
          </button>
          <button
            onClick={() => { setFiles([]); setError(''); }}
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">100% private</h2>
          <p className="text-slate-500 dark:text-slate-400">PDFs are processed entirely in your browser. Nothing is uploaded.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">↕️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Reorder pages</h2>
          <p className="text-slate-500 dark:text-slate-400">Use the arrows to reorder files before merging.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">♾️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">No limit</h2>
          <p className="text-slate-500 dark:text-slate-400">Merge as many PDFs as you need. No account required.</p>
        </div>
      </section>
    </div>
  );
}
