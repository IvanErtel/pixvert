import { ImageFormat } from './formats';

export interface ConversionRoute {
  from: string;
  to: ImageFormat;
  slug: string;
}

export const SEO_CONVERSIONS: ConversionRoute[] = [
  // PNG conversions
  { from: 'png',  to: 'webp', slug: 'png-to-webp'  },
  { from: 'png',  to: 'jpg',  slug: 'png-to-jpg'   },
  { from: 'png',  to: 'avif', slug: 'png-to-avif'  },
  { from: 'png',  to: 'bmp',  slug: 'png-to-bmp'   },
  { from: 'png',  to: 'gif',  slug: 'png-to-gif'   },
  { from: 'png',  to: 'tiff', slug: 'png-to-tiff'  },
  { from: 'png',  to: 'ico',  slug: 'png-to-ico'   },
  // JPG conversions
  { from: 'jpg',  to: 'webp', slug: 'jpg-to-webp'  },
  { from: 'jpg',  to: 'png',  slug: 'jpg-to-png'   },
  { from: 'jpg',  to: 'avif', slug: 'jpg-to-avif'  },
  { from: 'jpg',  to: 'bmp',  slug: 'jpg-to-bmp'   },
  { from: 'jpg',  to: 'gif',  slug: 'jpg-to-gif'   },
  { from: 'jpg',  to: 'tiff', slug: 'jpg-to-tiff'  },
  { from: 'jpg',  to: 'ico',  slug: 'jpg-to-ico'   },
  // WebP conversions
  { from: 'webp', to: 'png',  slug: 'webp-to-png'  },
  { from: 'webp', to: 'jpg',  slug: 'webp-to-jpg'  },
  { from: 'webp', to: 'avif', slug: 'webp-to-avif' },
  { from: 'webp', to: 'bmp',  slug: 'webp-to-bmp'  },
  { from: 'webp', to: 'gif',  slug: 'webp-to-gif'  },
  { from: 'webp', to: 'tiff', slug: 'webp-to-tiff' },
  // AVIF conversions
  { from: 'avif', to: 'png',  slug: 'avif-to-png'  },
  { from: 'avif', to: 'jpg',  slug: 'avif-to-jpg'  },
  { from: 'avif', to: 'webp', slug: 'avif-to-webp' },
  // BMP conversions
  { from: 'bmp',  to: 'webp', slug: 'bmp-to-webp'  },
  { from: 'bmp',  to: 'jpg',  slug: 'bmp-to-jpg'   },
  { from: 'bmp',  to: 'png',  slug: 'bmp-to-png'   },
  // GIF conversions
  { from: 'gif',  to: 'webp', slug: 'gif-to-webp'  },
  { from: 'gif',  to: 'png',  slug: 'gif-to-png'   },
  { from: 'gif',  to: 'jpg',  slug: 'gif-to-jpg'   },
  // TIFF conversions
  { from: 'tiff', to: 'jpg',  slug: 'tiff-to-jpg'  },
  { from: 'tiff', to: 'png',  slug: 'tiff-to-png'  },
  { from: 'tiff', to: 'webp', slug: 'tiff-to-webp' },
];

export function getConversionBySlug(slug: string): ConversionRoute | undefined {
  return SEO_CONVERSIONS.find((c) => c.slug === slug);
}

export function formatLabel(ext: string): string {
  return ext.toUpperCase();
}

export interface CompressRoute {
  format: string;
  label: string;
}

export const SEO_COMPRESS: CompressRoute[] = [
  { format: 'image', label: 'Image' },
  { format: 'jpg',   label: 'JPG'   },
  { format: 'png',   label: 'PNG'   },
  { format: 'webp',  label: 'WebP'  },
];

export function getCompressByFormat(format: string): CompressRoute | undefined {
  return SEO_COMPRESS.find((c) => c.format === format);
}
