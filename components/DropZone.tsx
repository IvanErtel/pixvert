'use client';

import { useCallback, useRef, useState } from 'react';
import { ACCEPTED_INPUT_TYPES, ACCEPTED_EXTENSIONS, isHeicFile } from '@/lib/formats';
import { useI18n } from '@/lib/i18n';

const FREE_MAX_FILE_SIZE = 5 * 1024 * 1024;   // 5 MB
const PRO_MAX_FILE_SIZE  = 50 * 1024 * 1024;  // 50 MB

interface DropZoneProps {
  onFilesAdded: (files: File[]) => void;
  isPro?: boolean;
}

export default function DropZone({ onFilesAdded, isPro = false }: DropZoneProps) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const maxSize = isPro ? PRO_MAX_FILE_SIZE : FREE_MAX_FILE_SIZE;
      const files = Array.from(fileList);
      const valid: File[] = [];
      const rejected: string[] = [];

      files.forEach((file) => {
        if (!ACCEPTED_INPUT_TYPES.includes(file.type) && !isHeicFile(file)) {
          rejected.push(file.name);
        } else if (file.size > maxSize) {
          rejected.push(file.name);
          setError(t('size_limit'));
        } else {
          valid.push(file);
        }
      });

      if (rejected.length > 0 && valid.length === 0) {
        setError(t('files_rejected', { count: rejected.length }));
      } else {
        setError(null);
      }

      if (valid.length > 0) onFilesAdded(valid);
    },
    [onFilesAdded, isPro, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label={t('drop_text')}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center
          transition-all duration-200 select-none
          ${isDragging
            ? 'border-[#6366F1] bg-[#EEF2FF] dark:bg-[#1e1b4b] scale-[1.01] shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20'
            : 'border-[var(--dropzone-border)] bg-white dark:bg-slate-900/50 hover:border-[#6366F1] hover:bg-[#EEF2FF] dark:hover:bg-slate-800/50'
          }
        `}
      >
        <div className={`flex flex-col items-center gap-4 transition-transform duration-200 ${isDragging ? 'scale-105' : ''}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isDragging ? 'bg-[#6366F1] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              {t('drop_text')}
            </p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              {t('drop_formats')}
            </p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
