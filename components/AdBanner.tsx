'use client';

import { useSubscription } from '@/lib/subscription';

export default function AdBanner() {
  const { isPro } = useSubscription();
  if (isPro) return null;

  return (
    <div className="h-[50px] flex items-center justify-center bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <span className="text-xs text-slate-400">Ad</span>
    </div>
  );
}
