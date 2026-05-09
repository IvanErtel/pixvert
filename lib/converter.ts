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
let workerReady: boolean | null = null;

const NATIVE_FORMATS = new Set<ImageFormat>(['png', 'jpg', 'webp', 'avif']);

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

// ── Main-thread fallback for native formats ──────────────────────────────────

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

// ── Custom format encoders ────────────────────────────────────────────────────

async function getCanvasFromFile(
  file: File,
  onProgress?: (p: number) => void
): Promise<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; imageData: ImageData }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      onProgress?.(30);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { URL.revokeObjectURL(url); reject(new Error('No canvas context')); return; }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      onProgress?.(60);
      resolve({ canvas, ctx, imageData });
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

function encodeBmp(imageData: ImageData): Blob {
  const { width, height, data } = imageData;
  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelDataSize = rowSize * height;
  const fileSize = 54 + pixelDataSize;
  const buf = new ArrayBuffer(fileSize);
  const view = new DataView(buf);

  // File header
  view.setUint8(0, 0x42); view.setUint8(1, 0x4D); // 'BM'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true);

  // DIB header (BITMAPINFOHEADER)
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, -height, true); // negative = top-down
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true); // 24bpp
  view.setUint32(30, 0, true);
  view.setUint32(34, pixelDataSize, true);
  view.setInt32(38, 2835, true); view.setInt32(42, 2835, true);
  view.setUint32(46, 0, true); view.setUint32(50, 0, true);

  // Pixel data (BGR, alpha composited over white)
  let offset = 54;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3] / 255;
      view.setUint8(offset++, Math.round(data[i + 2] * a + 255 * (1 - a))); // B
      view.setUint8(offset++, Math.round(data[i + 1] * a + 255 * (1 - a))); // G
      view.setUint8(offset++, Math.round(data[i]     * a + 255 * (1 - a))); // R
    }
    const padding = rowSize - width * 3;
    for (let p = 0; p < padding; p++) view.setUint8(offset++, 0);
  }

  return new Blob([buf], { type: 'image/bmp' });
}

async function encodeGif(
  imageData: ImageData,
  ctx: CanvasRenderingContext2D
): Promise<Blob> {
  const GIFEncoder = (await import('gif-encoder-2')).default;
  const { width, height } = imageData;
  const encoder = new GIFEncoder(width, height);
  encoder.start();
  encoder.setRepeat(-1);
  encoder.setQuality(10);
  encoder.addFrame(ctx);
  encoder.finish();
  const buffer = encoder.out.getData();
  return new Blob([new Uint8Array(buffer)], { type: 'image/gif' });
}

function encodeTiff(imageData: ImageData): Blob {
  const { width, height, data } = imageData;

  // Convert RGBA → RGB (composite over white)
  const rgbSize = width * height * 3;
  const rgb = new Uint8Array(rgbSize);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    const a = data[i + 3] / 255;
    rgb[j]     = Math.round(data[i]     * a + 255 * (1 - a));
    rgb[j + 1] = Math.round(data[i + 1] * a + 255 * (1 - a));
    rgb[j + 2] = Math.round(data[i + 2] * a + 255 * (1 - a));
  }

  // Layout: header(8) + IFD(150) + extraData(22) + imageData
  const NUM_IFD = 12;
  const IFD_OFFSET = 8;
  const IFD_SIZE = 2 + NUM_IFD * 12 + 4; // 150
  const BPS_OFFSET = IFD_OFFSET + IFD_SIZE; // 158
  const XRES_OFFSET = BPS_OFFSET + 6;       // 164
  const YRES_OFFSET = XRES_OFFSET + 8;      // 172
  const IMG_OFFSET = YRES_OFFSET + 8;       // 180

  const buf = new ArrayBuffer(IMG_OFFSET + rgbSize);
  const v = new DataView(buf);
  const b = new Uint8Array(buf);

  // TIFF header (little-endian)
  v.setUint8(0, 0x49); v.setUint8(1, 0x49);
  v.setUint16(2, 42, true);
  v.setUint32(4, IFD_OFFSET, true);

  // IFD entry count
  v.setUint16(IFD_OFFSET, NUM_IFD, true);

  const entry = (n: number, tag: number, type: number, count: number, val: number) => {
    const off = IFD_OFFSET + 2 + n * 12;
    v.setUint16(off, tag, true);
    v.setUint16(off + 2, type, true);
    v.setUint32(off + 4, count, true);
    v.setUint32(off + 8, val, true);
  };

  entry(0,  256, 4, 1, width);         // ImageWidth
  entry(1,  257, 4, 1, height);        // ImageLength
  entry(2,  258, 3, 3, BPS_OFFSET);    // BitsPerSample (offset)
  entry(3,  259, 3, 1, 1);             // Compression = none
  entry(4,  262, 3, 1, 2);             // PhotometricInterpretation = RGB
  entry(5,  273, 4, 1, IMG_OFFSET);    // StripOffsets
  entry(6,  277, 3, 1, 3);             // SamplesPerPixel
  entry(7,  278, 4, 1, height);        // RowsPerStrip
  entry(8,  279, 4, 1, rgbSize);       // StripByteCounts
  entry(9,  282, 5, 1, XRES_OFFSET);   // XResolution (offset)
  entry(10, 283, 5, 1, YRES_OFFSET);   // YResolution (offset)
  entry(11, 296, 3, 1, 2);             // ResolutionUnit = inch

  // Next IFD = 0
  v.setUint32(IFD_OFFSET + 2 + NUM_IFD * 12, 0, true);

  // BitsPerSample: [8, 8, 8]
  v.setUint16(BPS_OFFSET, 8, true);
  v.setUint16(BPS_OFFSET + 2, 8, true);
  v.setUint16(BPS_OFFSET + 4, 8, true);

  // XResolution: 72/1
  v.setUint32(XRES_OFFSET, 72, true); v.setUint32(XRES_OFFSET + 4, 1, true);

  // YResolution: 72/1
  v.setUint32(YRES_OFFSET, 72, true); v.setUint32(YRES_OFFSET + 4, 1, true);

  // Image data
  b.set(rgb, IMG_OFFSET);

  return new Blob([buf], { type: 'image/tiff' });
}

async function encodeIco(imageData: ImageData): Promise<Blob> {
  const sizes = [16, 32, 48];
  const pngParts: Uint8Array[] = [];

  // Draw the imageData onto a source canvas, then resize to each ICO size
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = imageData.width;
  srcCanvas.height = imageData.height;
  srcCanvas.getContext('2d')!.putImageData(imageData, 0, 0);

  for (const size of sizes) {
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    c.getContext('2d')!.drawImage(srcCanvas, 0, 0, size, size);
    const png = await new Promise<Blob>((res, rej) =>
      c.toBlob((b) => (b ? res(b) : rej(new Error('ICO frame failed'))), 'image/png')
    );
    pngParts.push(new Uint8Array(await png.arrayBuffer()));
  }

  const count = sizes.length;
  const headerSize = 6 + 16 * count;
  const totalSize = headerSize + pngParts.reduce((s, p) => s + p.length, 0);

  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  const bytes = new Uint8Array(buf);

  // ICONDIR
  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true); // type = 1 (ICO)
  view.setUint16(4, count, true);

  let dataOffset = headerSize;
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const png = pngParts[i];
    const e = 6 + i * 16;
    view.setUint8(e, size); view.setUint8(e + 1, size);
    view.setUint8(e + 2, 0); view.setUint8(e + 3, 0);
    view.setUint16(e + 4, 1, true);
    view.setUint16(e + 6, 32, true);
    view.setUint32(e + 8, png.length, true);
    view.setUint32(e + 12, dataOffset, true);
    bytes.set(png, dataOffset);
    dataOffset += png.length;
  }

  return new Blob([buf], { type: 'image/x-icon' });
}

// ── Public API ───────────────────────────────────────────────────────────────

const MIME_TO_FORMAT: Record<string, ImageFormat> = {
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

export async function optimizeImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const format = MIME_TO_FORMAT[file.type];
  if (!format) throw new Error(`Cannot optimize format: ${file.type}`);
  const quality = format === 'png' ? undefined : 0.75;
  const blob = await convertImage(file, format, onProgress, quality);
  // Never return a larger file than the original
  if (blob.size >= file.size) {
    return new Blob([await file.arrayBuffer()], { type: file.type });
  }
  return blob;
}

export async function convertImage(
  file: File,
  targetFormat: ImageFormat,
  onProgress?: (progress: number) => void,
  qualityOverride?: number
): Promise<Blob> {
  // Custom formats: skip worker, use specialized main-thread encoders
  if (!NATIVE_FORMATS.has(targetFormat)) {
    onProgress?.(10);
    const { canvas, ctx, imageData } = await getCanvasFromFile(file, onProgress);
    onProgress?.(70);

    let blob: Blob;
    switch (targetFormat) {
      case 'bmp':  blob = encodeBmp(imageData); break;
      case 'gif':  blob = await encodeGif(imageData, ctx); break;
      case 'tiff': blob = encodeTiff(imageData); break;
      case 'ico':  blob = await encodeIco(imageData); break;
      default: throw new Error(`Unsupported format: ${targetFormat}`);
    }
    // suppress unused warning
    void canvas;
    onProgress?.(100);
    return blob;
  }

  // Native formats: worker pool with main-thread fallback
  const { mimeType } = SUPPORTED_FORMATS[targetFormat];
  const quality = qualityOverride ?? (targetFormat === 'png' ? undefined : 0.92);

  if (workerReady === null) workerReady = workerSupported();

  if (workerReady) {
    try {
      return await convertViaWorker(file, mimeType, quality, onProgress);
    } catch {
      workerReady = false;
      workers = [];
    }
  }

  return convertMainThread(file, mimeType, quality, onProgress);
}
