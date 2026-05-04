export type ImageFormat = 'png' | 'jpg' | 'webp' | 'avif' | 'bmp' | 'gif' | 'tiff' | 'ico';

export interface FormatInfo {
  label: string;
  mimeType: string;
  extension: string;
}

export const SUPPORTED_FORMATS: Record<ImageFormat, FormatInfo> = {
  png:  { label: 'PNG',  mimeType: 'image/png',     extension: 'png'  },
  jpg:  { label: 'JPG',  mimeType: 'image/jpeg',    extension: 'jpg'  },
  webp: { label: 'WebP', mimeType: 'image/webp',    extension: 'webp' },
  avif: { label: 'AVIF', mimeType: 'image/avif',    extension: 'avif' },
  bmp:  { label: 'BMP',  mimeType: 'image/bmp',     extension: 'bmp'  },
  gif:  { label: 'GIF',  mimeType: 'image/gif',     extension: 'gif'  },
  tiff: { label: 'TIFF', mimeType: 'image/tiff',    extension: 'tiff' },
  ico:  { label: 'ICO',  mimeType: 'image/x-icon',  extension: 'ico'  },
};

export const ACCEPTED_INPUT_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/avif',
  'image/tiff',
];

export const ACCEPTED_EXTENSIONS = '.png,.jpg,.jpeg,.webp,.gif,.bmp,.avif,.tiff,.tif';

export function getOutputFilename(originalName: string, targetFormat: ImageFormat): string {
  const dotIndex = originalName.lastIndexOf('.');
  const baseName = dotIndex > -1 ? originalName.slice(0, dotIndex) : originalName;
  return `${baseName}.${SUPPORTED_FORMATS[targetFormat].extension}`;
}

// Detect AVIF output support at runtime (Chrome 94+, Firefox 93+, Safari 16+)
let avifSupported: boolean | null = null;
export async function isAvifSupported(): Promise<boolean> {
  if (avifSupported !== null) return avifSupported;
  if (typeof document === 'undefined') return false;
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.toBlob((blob) => {
      avifSupported = blob !== null && blob.size > 0;
      resolve(avifSupported);
    }, 'image/avif');
  });
}
