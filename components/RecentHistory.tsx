'use client';

import { useEffect, useState } from 'react';
import { getHistory, clearHistory, formatRelativeTime, HistoryItem } from '@/lib/history';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function RecentHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(getHistory());
  }, [open]);

  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#6366F1] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent conversions ({items.length})
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => {
              const saved = item.convertedSize < item.originalSize
                ? Math.round((1 - item.convertedSize / item.originalSize) * 100)
                : 0;
              return (
                <li key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900/50">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnailDataUrl}
                      alt={item.originalName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {item.originalName}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {formatBytes(item.originalSize)} → <span className="text-[#10B981]">{formatBytes(item.convertedSize)}</span>
                      {saved > 0 && <span className="ml-1 text-[#10B981] font-semibold">(-{saved}%)</span>}
                      {' · '}{item.outputFormat.toUpperCase()}
                      {' · '}{formatRelativeTime(item.timestamp)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/80 flex justify-end">
            <button
              onClick={() => { clearHistory(); setItems([]); setOpen(false); }}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
