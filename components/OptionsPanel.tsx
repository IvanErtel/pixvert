'use client';

import { ImageFormat } from '@/lib/formats';
import { useI18n } from '@/lib/i18n';

const LOSSY_FORMATS = new Set<ImageFormat>(['jpg', 'webp', 'avif']);

const FREE_PRESETS = [
  { label: '1920×1080', w: 1920, h: 1080 },
  { label: '1280×720',  w: 1280, h: 720  },
  { label: '1080×1080', w: 1080, h: 1080 },
  { label: '800×600',   w: 800,  h: 600  },
  { label: '640×480',   w: 640,  h: 480  },
  { label: '400×400',   w: 400,  h: 400  },
];

const SOCIAL_PRESETS = [
  { label: 'Instagram Post',   w: 1080, h: 1080 },
  { label: 'Instagram Story',  w: 1080, h: 1920 },
  { label: 'Instagram Reel',   w: 1080, h: 1920 },
  { label: 'Twitter Post',     w: 1200, h: 675  },
  { label: 'Twitter Header',   w: 1500, h: 500  },
  { label: 'LinkedIn Post',    w: 1200, h: 627  },
  { label: 'LinkedIn Cover',   w: 1584, h: 396  },
  { label: 'YouTube Thumb',    w: 1280, h: 720  },
  { label: 'Facebook Post',    w: 1200, h: 630  },
  { label: 'Facebook Cover',   w: 851,  h: 315  },
  { label: 'Pinterest Pin',    w: 1000, h: 1500 },
  { label: 'TikTok Video',     w: 1080, h: 1920 },
];

interface OptionsPanelProps {
  targetFormat: ImageFormat;
  showQuality?: boolean;
  quality: number;
  onQualityChange: (q: number) => void;
  resizeW: string;
  resizeH: string;
  onResizeWChange: (v: string) => void;
  onResizeHChange: (v: string) => void;
  lockRatio: boolean;
  onLockRatioChange: (v: boolean) => void;
  onResizeReset: () => void;
  onPresetSelect: (w: number, h: number) => void;
  isPro?: boolean;
}

export default function OptionsPanel({
  targetFormat,
  showQuality,
  quality,
  onQualityChange,
  resizeW,
  resizeH,
  onResizeWChange,
  onResizeHChange,
  lockRatio,
  onLockRatioChange,
  onResizeReset,
  onPresetSelect,
  isPro = false,
}: OptionsPanelProps) {
  const { t } = useI18n();
  const canShowQuality = showQuality !== false && LOSSY_FORMATS.has(targetFormat);
  const hasResize = resizeW || resizeH;

  return (
    <div className="flex flex-col gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
      {/* Quality slider */}
      {canShowQuality && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap w-24">
            {t('quality')}: <span className="text-slate-700 dark:text-slate-200 font-semibold">{quality}</span>
          </span>
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-36 h-1.5 accent-[#6366F1] cursor-pointer"
            aria-label={t('quality')}
          />
          <span className="text-[10px] text-slate-400 hidden sm:block">1 — 100</span>
        </div>
      )}

      {/* Resize row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap w-24">
          {t('resize')}:
        </span>

        {/* Preset dropdown */}
        <select
          value=""
          onChange={(e) => {
            const all = [...FREE_PRESETS, ...SOCIAL_PRESETS];
            const preset = all.find((p) => p.label === e.target.value);
            if (preset) onPresetSelect(preset.w, preset.h);
          }}
          className="px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
        >
          <option value="" disabled>Presets</option>
          <optgroup label="Common sizes">
            {FREE_PRESETS.map((p) => (
              <option key={p.label} value={p.label}>{p.label}</option>
            ))}
          </optgroup>
          <optgroup label={isPro ? 'Social Media' : 'Social Media (Pro)'}>
            {SOCIAL_PRESETS.map((p) => (
              <option key={p.label} value={isPro ? p.label : ''} disabled={!isPro}>
                {isPro ? p.label : `🔒 ${p.label}`}
              </option>
            ))}
          </optgroup>
        </select>

        {/* Width input */}
        <input
          type="number"
          min={1}
          placeholder="W px"
          value={resizeW}
          onChange={(e) => onResizeWChange(e.target.value)}
          className="w-20 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
        />

        <span className="text-slate-400 dark:text-slate-500 text-xs">×</span>

        {/* Height input */}
        <input
          type="number"
          min={1}
          placeholder="H px"
          value={resizeH}
          onChange={(e) => onResizeHChange(e.target.value)}
          className="w-20 px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent"
        />

        {/* Lock ratio button */}
        <button
          onClick={() => onLockRatioChange(!lockRatio)}
          title={t('maintain_ratio')}
          className={`p-1.5 rounded-lg transition-colors ${
            lockRatio
              ? 'text-[#6366F1] bg-indigo-50 dark:bg-indigo-900/20'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {lockRatio ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          )}
        </button>

        {/* Reset button — only when there's something to reset */}
        {hasResize && (
          <button
            onClick={onResizeReset}
            title="Reset to original size"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
