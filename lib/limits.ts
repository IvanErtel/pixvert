const STORAGE_KEY = 'img_converter_daily';
export const FREE_DAILY_LIMIT = 10;

interface DailyUsage {
  count: number;
  date: string;
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyUsage(): DailyUsage {
  if (typeof window === 'undefined') return { count: 0, date: getTodayString() };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { count: 0, date: getTodayString() };

    const parsed: DailyUsage = JSON.parse(stored);
    if (parsed.date !== getTodayString()) {
      return { count: 0, date: getTodayString() };
    }
    return parsed;
  } catch {
    return { count: 0, date: getTodayString() };
  }
}

export function incrementDailyCount(): void {
  if (typeof window === 'undefined') return;
  const usage = getDailyUsage();
  const updated: DailyUsage = { count: usage.count + 1, date: getTodayString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRemainingConversions(): number {
  const usage = getDailyUsage();
  return Math.max(0, FREE_DAILY_LIMIT - usage.count);
}

export function hasReachedLimit(): boolean {
  return getRemainingConversions() === 0;
}
