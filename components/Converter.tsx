'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import DropZone from './DropZone';
import FileList, { FileItem, FileStatus } from './FileList';
import FormatSelector from './FormatSelector';
import OptionsPanel from './OptionsPanel';
import { ImageFormat, getOutputFilename } from '@/lib/formats';
import { convertImage, optimizeImage, ConvertOptions } from '@/lib/converter';
import { getRemainingConversions, incrementDailyCount, hasReachedLimit, FREE_DAILY_LIMIT } from '@/lib/limits';
import { useI18n } from '@/lib/i18n';
import { useSubscription } from '@/lib/subscription';
import { addToHistory, createThumbnailDataUrl } from '@/lib/history';
import RecentHistory from './RecentHistory';

let idCounter = 0;
function nextId() { return `file-${++idCounter}`; }

export default function Converter() {
  const { t } = useI18n();
  const { isPro, plan } = useSubscription();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('webp');
  const [mode, setMode] = useState<'convert' | 'optimize'>('convert');
  const [quality, setQuality] = useState(85);
  const [resizeW, setResizeW] = useState('');
  const [resizeH, setResizeH] = useState('');
  const [lockRatio, setLockRatio] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [remaining, setRemaining] = useState(FREE_DAILY_LIMIT); // safe SSR default
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const imageRatioRef = useRef<number | null>(null); // W/H ratio of first file, for lock auto-calc

  // Read localStorage only after hydration to avoid SSR mismatch
  useEffect(() => {
    setRemaining(getRemainingConversions());
  }, []);

  const refreshRemaining = () => setRemaining(getRemainingConversions());

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    const items: FileItem[] = newFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      objectUrlsRef.current.add(preview);
      return { id: nextId(), file, preview, status: 'pending' as FileStatus, progress: 0 };
    });
    // Detect ratio from first ever file added for lock auto-calculation
    if (imageRatioRef.current === null && items.length > 0) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          imageRatioRef.current = img.naturalWidth / img.naturalHeight;
        }
      };
      img.src = items[0].preview;
    }
    setFiles((prev) => [...prev, ...items]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) { objectUrlsRef.current.delete(item.preview); URL.revokeObjectURL(item.preview); }
      const next = prev.filter((f) => f.id !== id);
      if (next.length === 0) imageRatioRef.current = null; // reset ratio when all files removed
      return next;
    });
  }, []);

  const handleResizeWChange = useCallback((val: string) => {
    setResizeW(val);
    if (!val) { setResizeH(''); return; }
    if (lockRatio && imageRatioRef.current) {
      setResizeH(String(Math.round(Number(val) / imageRatioRef.current)));
    }
  }, [lockRatio]);

  const handleResizeHChange = useCallback((val: string) => {
    setResizeH(val);
    if (!val) { setResizeW(''); return; }
    if (lockRatio && imageRatioRef.current) {
      setResizeW(String(Math.round(Number(val) * imageRatioRef.current)));
    }
  }, [lockRatio]);

  const handleResizeReset = useCallback(() => {
    setResizeW('');
    setResizeH('');
  }, []);

  const handlePresetSelect = useCallback((w: number, h: number) => {
    setResizeW(String(w));
    setResizeH(String(h));
    setLockRatio(false); // presets define exact dimensions
  }, []);

  const updateFile = (id: string, updates: Partial<FileItem>) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));

  const handleConvertAll = async () => {
    const pending = files.filter((f) => f.status === 'pending');
    if (pending.length === 0) return;
    if (!isPro && hasReachedLimit()) return;

    setIsConverting(true);

    for (const item of pending) {
      if (!isPro && hasReachedLimit()) break;
      updateFile(item.id, { status: 'converting', progress: 0 });
      try {
        const resizeOpts: Pick<ConvertOptions, 'targetWidth' | 'targetHeight' | 'keepAspectRatio'> = {
          targetWidth: resizeW ? Number(resizeW) : undefined,
          targetHeight: resizeH ? Number(resizeH) : undefined,
          keepAspectRatio: lockRatio,
        };
        const blob = mode === 'optimize'
          ? await optimizeImage(item.file, (p) => updateFile(item.id, { progress: p }), resizeOpts)
          : await convertImage(item.file, targetFormat, (p) => updateFile(item.id, { progress: p }), {
              quality: quality / 100,
              ...resizeOpts,
            });
        if (!isPro) { incrementDailyCount(); refreshRemaining(); }
        updateFile(item.id, {
          status: 'done',
          progress: 100,
          convertedBlob: blob,
          convertedSize: blob.size,
          ...(mode === 'optimize' && { outputFilename: item.file.name }),
        });
        createThumbnailDataUrl(item.preview).then((thumbnailDataUrl) => {
          addToHistory({
            originalName: item.file.name,
            outputFormat: mode === 'optimize' ? item.file.name.split('.').pop() ?? '' : targetFormat,
            originalSize: item.file.size,
            convertedSize: blob.size,
            thumbnailDataUrl,
          });
        });
      } catch {
        updateFile(item.id, { status: 'error', error: 'Conversion failed' });
      }
    }
    setIsConverting(false);
  };

  const handleDownload = (item: FileItem) => {
    if (!item.convertedBlob) return;
    const url = URL.createObjectURL(item.convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'optimize' ? item.file.name : getOutputFilename(item.file.name, targetFormat);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const done = files.filter((f) => f.status === 'done' && f.convertedBlob);
    if (done.length === 0) return;
    const zip = new JSZip();
    done.forEach((item) => {
      if (item.convertedBlob) {
        const name = mode === 'optimize' ? item.file.name : getOutputFilename(item.file.name, targetFormat);
        zip.file(name, item.convertedBlob);
      }
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url; a.download = 'converted_images.zip'; a.click();
    URL.revokeObjectURL(url);
  };

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const limitReached = !isPro && hasReachedLimit();

  return (
    <div className="flex flex-col gap-6">
      {/* Mode toggle */}
      <div className="flex items-center justify-center">
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
          <button
            onClick={() => setMode('convert')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              mode === 'convert'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t('mode_convert')}
          </button>
          <button
            onClick={() => setMode('optimize')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
              mode === 'optimize'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {t('mode_optimize')}
          </button>
        </div>
      </div>

      {/* Privacy + EXIF badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-sm text-[#10B981] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          {t('privacy_note')}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {t('exif_stripped')}
        </div>
      </div>

      <DropZone onFilesAdded={handleFilesAdded} isPro={isPro} />

      {files.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {mode === 'convert' ? (
            <FormatSelector value={targetFormat} onChange={setTargetFormat} />
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Keeps original format · reduces file size ~40–60%
            </div>
          )}
          <button
            onClick={handleConvertAll}
            disabled={isConverting || pendingCount === 0 || limitReached}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center gap-2 ${
              isConverting || pendingCount === 0 || limitReached
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-[#6366F1] hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isConverting ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>{t('converting')}</>
            ) : mode === 'optimize' ? t('compress_all') : t('convert_all')}
          </button>
        </div>
      )}

      {files.length > 0 && (
        <OptionsPanel
          targetFormat={targetFormat}
          showQuality={mode === 'convert'}
          quality={quality}
          onQualityChange={setQuality}
          resizeW={resizeW}
          resizeH={resizeH}
          onResizeWChange={handleResizeWChange}
          onResizeHChange={handleResizeHChange}
          lockRatio={lockRatio}
          onLockRatioChange={setLockRatio}
          onResizeReset={handleResizeReset}
          onPresetSelect={handlePresetSelect}
          isPro={isPro}
        />
      )}

      <FileList files={files} targetFormat={targetFormat} onRemove={handleRemove} onDownload={handleDownload} />

      {doneCount > 1 && (
        <button onClick={handleDownloadAll} className="w-full sm:w-auto self-center px-8 py-3 rounded-xl font-semibold text-sm bg-[#10B981] hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 animate-pulse">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
          {t('download_all')}
        </button>
      )}
      {doneCount === 1 && (
        <button onClick={() => { const item = files.find((f) => f.status === 'done'); if (item) handleDownload(item); }} className="w-full sm:w-auto self-center px-8 py-3 rounded-xl font-semibold text-sm bg-[#10B981] hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
          {t('download')}
        </button>
      )}

      {/* Footer bar: Pro badge OR free counter */}
      {isPro ? (
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-100 dark:border-indigo-800">
          <span className="text-sm font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            ✨ {plan === 'business' ? 'Business' : 'Pro'} — Unlimited conversions
          </span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          {limitReached ? (
            <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
              <span className="text-sm font-semibold text-red-500">{t('daily_limit_reached')}</span>
              <span className="text-xs text-slate-400">{t('daily_limit_message')}</span>
            </div>
          ) : (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {t('free_counter', { remaining, total: FREE_DAILY_LIMIT })}
            </span>
          )}
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <a href="/pricing" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:opacity-90 transition-opacity whitespace-nowrap">
              🚀 {t('upgrade_cta')}
            </a>
            <a href="/activate" className="text-xs text-slate-400 hover:text-[#6366F1] transition-colors">
              ¿Ya tienes Pro? Actívalo aquí
            </a>
          </div>
        </div>
      )}

      <RecentHistory />
    </div>
  );
}
