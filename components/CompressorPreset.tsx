'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import DropZone from './DropZone';
import FileList, { FileItem, FileStatus } from './FileList';
import { optimizeImage } from '@/lib/converter';
import { getRemainingConversions, incrementDailyCount, hasReachedLimit, FREE_DAILY_LIMIT } from '@/lib/limits';
import { useI18n } from '@/lib/i18n';

let idCounter = 0;
function nextId() { return `file-${++idCounter}`; }

export default function CompressorPreset() {
  const { t } = useI18n();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [remaining, setRemaining] = useState(FREE_DAILY_LIMIT);

  useEffect(() => {
    setRemaining(getRemainingConversions());
  }, []);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  const refreshRemaining = () => setRemaining(getRemainingConversions());

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const items: FileItem[] = newFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      objectUrlsRef.current.add(preview);
      return { id: nextId(), file, preview, status: 'pending' as FileStatus, progress: 0 };
    });
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) { objectUrlsRef.current.delete(item.preview); URL.revokeObjectURL(item.preview); }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const updateFile = (id: string, updates: Partial<FileItem>) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));

  const handleCompressAll = async () => {
    const pending = files.filter((f) => f.status === 'pending');
    if (pending.length === 0 || hasReachedLimit()) return;
    setIsConverting(true);
    for (const item of pending) {
      if (hasReachedLimit()) break;
      updateFile(item.id, { status: 'converting', progress: 0 });
      try {
        const blob = await optimizeImage(item.file, (p) => updateFile(item.id, { progress: p }));
        incrementDailyCount();
        refreshRemaining();
        updateFile(item.id, {
          status: 'done',
          progress: 100,
          convertedBlob: blob,
          convertedSize: blob.size,
          outputFilename: item.file.name,
        });
      } catch {
        updateFile(item.id, { status: 'error', error: 'Compression failed' });
      }
    }
    setIsConverting(false);
  };

  const handleDownload = (item: FileItem) => {
    if (!item.convertedBlob) return;
    const url = URL.createObjectURL(item.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const done = files.filter((f) => f.status === 'done' && f.convertedBlob);
    if (done.length === 0) return;
    const zip = new JSZip();
    done.forEach((item) => { if (item.convertedBlob) zip.file(item.file.name, item.convertedBlob); });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed_images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const limitReached = hasReachedLimit();

  // FileList needs a targetFormat for fallback filename; use 'jpg' as dummy (overridden by outputFilename)
  return (
    <div className="flex flex-col gap-6">
      <DropZone onFilesAdded={handleFilesAdded} />

      {files.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Keeps original format · reduces file size ~40–60%
          </div>
          <button
            onClick={handleCompressAll}
            disabled={isConverting || pendingCount === 0 || limitReached}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center gap-2 ${
              isConverting || pendingCount === 0 || limitReached
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isConverting ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>{t('converting')}</>
            ) : t('compress_all')}
          </button>
        </div>
      )}

      <FileList files={files} targetFormat="jpg" onRemove={handleRemove} onDownload={handleDownload} />

      {doneCount > 1 && (
        <button onClick={handleDownloadAll} className="w-full sm:w-auto self-center px-8 py-3 rounded-xl font-semibold text-sm bg-[#10B981] hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all hover:scale-[1.02] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
          {t('download_all')}
        </button>
      )}
      {doneCount === 1 && (
        <button onClick={() => { const item = files.find((f) => f.status === 'done'); if (item) handleDownload(item); }} className="w-full sm:w-auto self-center px-8 py-3 rounded-xl font-semibold text-sm bg-[#10B981] hover:bg-emerald-600 text-white shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
          {t('download')}
        </button>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        {limitReached ? (
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-sm font-semibold text-red-500">{t('daily_limit_reached')}</span>
            <span className="text-xs text-slate-400">{t('daily_limit_message')}</span>
          </div>
        ) : (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {t('free_counter', { remaining, total: FREE_DAILY_LIMIT })}
          </span>
        )}
        <a href="/pricing" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:opacity-90 transition-opacity whitespace-nowrap">
          🚀 {t('upgrade_cta')}
        </a>
      </div>
    </div>
  );
}
