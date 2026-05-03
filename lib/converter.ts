import { ImageFormat, SUPPORTED_FORMATS } from './formats';

// ── Worker pool ──────────────────────────────────────────────────────────────

interface PendingJob {
  resolve: (blob: Blob) => void;
  reject: (err: Error) => void;
  onProgress?: (p: number) => void;
  mimeType: string;
}

let workers: Worker[] = [];
let workerIndex = 0;
const pending = new Map<string, PendingJob>();
let jobCounter = 0;
let workerReady: boolean | null = null; // null = not tested yet

function workerSupported(): boolean {
  return (
    typeof Worker !== 'undefined' &&
    typeof OffscreenCanvas !== 'undefined'
  );
}

function getWorkers(): Worker[] {
  if (workers.length > 0) return workers;
  const count = Math.min(navigator.hardwareConcurrency || 2, 4);
  for (let i = 0; i < count; i++) {
    const w = new Worker('/converter.worker.js');
    w.onmessage = (e) => {
      const { id, success, buffer, size, error } = e.data as {
        id: string;
        success: boolean;
        buffer?: ArrayBuffer;
        size?: number;
        error?: string;
      };
      const job = pending.get(id);
      if (!job) return;
      pending.delete(id);
      if (success && buffer) {
        job.onProgress?.(100);
        job.resolve(new Blob([buffer], { type: job.mimeType }));
      } else {
        job.reject(new Error(error ?? 'Worker conversion failed'));
      }
    };
    w.onerror = (e) => {
      // Mark workers as unavailable and reject all pending jobs
      workerReady = false;
      workers = [];
      pending.forEach((job) => job.reject(new Error('Worker error')));
      pending.clear();
      console.warn('Converter worker error, falling back to main thread:', e.message);
    };
    workers.push(w);
  }
  return workers;
}

async function convertViaWorker(
  file: File,
  mimeType: string,
  quality: number | undefined,
  onProgress?: (p: number) => void
): Promise<Blob> {
  const pool = getWorkers();
  const worker = pool[workerIndex % pool.length];
  workerIndex++;

  const id = `job-${++jobCounter}`;
  const buffer = await file.arrayBuffer();

  onProgress?.(20);

  return new Promise<Blob>((resolve, reject) => {
    pending.set(id, { resolve, reject, onProgress, mimeType });
    onProgress?.(50);
    worker.postMessage({ id, buffer, mimeType, quality }, [buffer]);
  });
}

// ── Main-thread fallback ─────────────────────────────────────────────────────

function convertMainThread(
  file: File,
  mimeType: string,
  quality: number | undefined,
  onProgress?: (p: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      try {
        onProgress?.(30);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');
        ctx.drawImage(img, 0, 0);
        onProgress?.(70);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error('Conversion failed')); return; }
            onProgress?.(100);
            resolve(blob);
          },
          mimeType,
          quality
        );
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

// ── Public API ───────────────────────────────────────────────────────────────

export async function convertImage(
  file: File,
  targetFormat: ImageFormat,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const { mimeType } = SUPPORTED_FORMATS[targetFormat];
  const quality = targetFormat === 'png' ? undefined : 0.92;

  // First call: probe worker support
  if (workerReady === null) {
    workerReady = workerSupported();
  }

  if (workerReady) {
    try {
      return await convertViaWorker(file, mimeType, quality, onProgress);
    } catch {
      // Worker failed — fall through to main thread
      workerReady = false;
      workers = [];
    }
  }

  return convertMainThread(file, mimeType, quality, onProgress);
}
