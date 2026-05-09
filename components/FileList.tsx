'use client';

import { useI18n } from '@/lib/i18n';
import { getOutputFilename, ImageFormat } from '@/lib/formats';

export type FileStatus = 'pending' | 'converting' | 'done' | 'error';

export interface FileItem {
  id: string;
  file: File;
  preview: string;
  status: FileStatus;
  progress: number;
  convertedBlob?: Blob;
  convertedSize?: number;
  outputFilename?: string;
  error?: string;
}

interface FileListProps {
  files: FileItem[];
  targetFormat: ImageFormat;
  onRemove: (id: string) => void;
  onDownload: (item: FileItem) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function StatusIcon({ status, progress }: { status: FileStatus; progress: number }) {
  if (status === 'pending') {
    return <span className="text-slate-400 text-lg" title="Pending">⏳</span>;
  }
  if (status === 'converting') {
    return (
      <div className="relative w-6 h-6">
        <svg className="animate-spin w-6 h-6 text-[#6366F1]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[#6366F1]">
          {progress}%
        </span>
      </div>
    );
  }
  if (status === 'done') {
    return (
      <span className="text-[#10B981] text-lg animate-bounce" title="Done">✅</span>
    );
  }
  return <span className="text-red-400 text-lg" title="Error">❌</span>;
}

export default function FileList({ files, targetFormat, onRemove, onDownload }: FileListProps) {
  const { t } = useI18n();

  if (files.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {files.map((item) => {
          const outputName = item.outputFilename ?? getOutputFilename(item.file.name, targetFormat);
          return (
            <li key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.preview}
                  alt={item.file.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[120px] sm:max-w-xs">
                    {item.file.name}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">→</span>
                  <span className="text-sm text-[#6366F1] font-medium truncate max-w-[120px] sm:max-w-xs">
                    {outputName}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span>{formatBytes(item.file.size)}</span>
                  {item.status === 'done' && item.convertedSize !== undefined && (
                    <>
                      <span>→</span>
                      <span className="text-[#10B981] font-medium">{formatBytes(item.convertedSize)}</span>
                      {item.convertedSize < item.file.size && (
                        <span className="text-[#10B981] font-semibold bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded text-[10px]">
                          -{Math.round((1 - item.convertedSize / item.file.size) * 100)}%
                        </span>
                      )}
                    </>
                  )}
                  {item.status === 'converting' && (
                    <div className="flex-1 max-w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6366F1] transition-all duration-300 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.error && <span className="text-red-400">{item.error}</span>}
                </div>
              </div>

              {/* Status + actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusIcon status={item.status} progress={item.progress} />

                {item.status === 'done' && (
                  <button
                    onClick={() => onDownload(item)}
                    className="p-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 transition-colors"
                    title={t('download')}
                    aria-label={`${t('download')} ${outputName}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </button>
                )}

                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title={t('remove_file')}
                  aria-label={`${t('remove_file')} ${item.file.name}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
