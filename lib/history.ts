const STORAGE_KEY = 'pixvert_history';
const MAX_ITEMS = 5;
const THUMB_SIZE = 64;

export async function createThumbnailDataUrl(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = THUMB_SIZE;
      canvas.height = THUMB_SIZE;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, THUMB_SIZE, THUMB_SIZE);
      const ratio = Math.min(THUMB_SIZE / img.naturalWidth, THUMB_SIZE / img.naturalHeight);
      const w = img.naturalWidth * ratio;
      const h = img.naturalHeight * ratio;
      ctx.drawImage(img, (THUMB_SIZE - w) / 2, (THUMB_SIZE - h) / 2, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => resolve('');
    img.src = src;
  });
}

export interface HistoryItem {
  id: string;
  originalName: string;
  outputFormat: string;
  originalSize: number;
  convertedSize: number;
  timestamp: number;
  thumbnailDataUrl: string;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function addToHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const entry: HistoryItem = { ...item, id: crypto.randomUUID(), timestamp: Date.now() };
  const updated = [entry, ...history].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
