'use client';

import { useState, useRef, useCallback, DragEvent } from 'react';

type Tab = 'encode' | 'decode';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageToBase64Tool() {
  const [tab, setTab] = useState<Tab>('encode');

  // Encode
  const [base64, setBase64] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Decode
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeResult, setDecodeResult] = useState<string | null>(null);
  const [decodeError, setDecodeError] = useState('');

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    setMimeType(file.type);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBase64(result.split(',')[1]);
      setCopied(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const dataUri = base64 ? `data:${mimeType};base64,${base64}` : '';
  const b64Size = base64 ? Math.ceil((base64.length * 3) / 4) : 0;

  const handleDecode = () => {
    setDecodeError('');
    setDecodeResult(null);
    const input = decodeInput.trim();
    if (!input) return;
    const uri = input.startsWith('data:') ? input : `data:image/png;base64,${input}`;
    const img = new Image();
    img.onerror = () => setDecodeError('Invalid Base64 string or unsupported format.');
    img.onload = () => setDecodeResult(uri);
    img.src = uri;
  };

  const downloadDecoded = () => {
    if (!decodeResult) return;
    const link = document.createElement('a');
    link.href = decodeResult;
    link.download = 'decoded-image';
    link.click();
  };

  const SNIPPETS = base64
    ? [
        { key: 'raw', label: 'Base64 string (raw)', value: base64 },
        { key: 'uri', label: 'Data URI', value: dataUri },
        { key: 'img', label: 'HTML <img> tag', value: `<img src="${dataUri}" alt="image" />` },
        { key: 'css', label: 'CSS background-image', value: `background-image: url('${dataUri}');` },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Image to Base64 Converter — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Encode any image to a Base64 data URI for HTML, CSS, or JSON. Or decode a Base64
          string back to an image. 100% local — no upload required.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Encode image', 'Decode Base64', 'Ready snippets', 'No upload'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6 w-fit mx-auto">
        {(['encode', 'decode'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t === 'encode' ? 'Image → Base64' : 'Base64 → Image'}
          </button>
        ))}
      </div>

      {tab === 'encode' ? (
        <div className="space-y-5">
          {!base64 ? (
            <div
              className={`rounded-2xl border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center py-20 gap-4 ${
                dragging
                  ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 bg-slate-50 dark:bg-slate-900/50'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]); }}
              />
              <div className="text-5xl">🔡</div>
              <div className="text-center">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Drop your image here</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">or click to browse — any image format</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File info */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">{fileName}</span>
                <span>Original: {formatBytes(fileSize)}</span>
                <span>Base64: {formatBytes(b64Size)} ({Math.round((b64Size / fileSize) * 100)}% of original)</span>
                <span className="uppercase">{mimeType.split('/')[1]}</span>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dataUri} alt="Preview" className="max-h-48 max-w-full rounded object-contain" />
              </div>

              {/* Snippets */}
              {SNIPPETS.map(({ key, label, value }) => (
                <div key={key} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
                    <button
                      onClick={() => copyText(value, key)}
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      {copied === key ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={value}
                    rows={3}
                    className="w-full px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 resize-none focus:outline-none"
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  />
                </div>
              ))}

              <button
                onClick={() => { setBase64(''); setFileName(''); }}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Encode another image
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Paste Base64 string or data URI
              </span>
            </div>
            <textarea
              value={decodeInput}
              onChange={(e) => { setDecodeInput(e.target.value); setDecodeResult(null); setDecodeError(''); }}
              rows={6}
              placeholder="data:image/png;base64,iVBORw0KGgo..."
              className="w-full px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 resize-none focus:outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={handleDecode}
            disabled={!decodeInput.trim()}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            Decode
          </button>
          {decodeError && <p className="text-sm text-red-500 dark:text-red-400">{decodeError}</p>}
          {decodeResult && (
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={decodeResult} alt="Decoded" className="max-h-64 max-w-full rounded object-contain" />
              </div>
              <button
                onClick={downloadDecoded}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                Download image
              </button>
            </div>
          )}
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Embed in code</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Base64 lets you embed images directly in HTML, CSS, or JSON without hosting a separate file.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📋</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Ready-to-use snippets</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Copy the raw Base64, full data URI, HTML img tag, or CSS background-image declaration in one click.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Encoding and decoding happen entirely in your browser with the FileReader API. No data is sent anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
