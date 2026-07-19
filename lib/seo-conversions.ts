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
  // HEIC conversions (iPhone photos)
  { from: 'heic', to: 'jpg',  slug: 'heic-to-jpg'  },
  { from: 'heic', to: 'png',  slug: 'heic-to-png'  },
  { from: 'heic', to: 'webp', slug: 'heic-to-webp' },
  { from: 'heic', to: 'avif', slug: 'heic-to-avif' },
  { from: 'heic', to: 'gif',  slug: 'heic-to-gif'  },
  { from: 'heic', to: 'bmp',  slug: 'heic-to-bmp'  },
  { from: 'heic', to: 'tiff', slug: 'heic-to-tiff' },
  // JPEG alias conversions (high search volume for "jpeg" spelling)
  { from: 'jpeg', to: 'jpg',  slug: 'jpeg-to-jpg'  },
  { from: 'jpeg', to: 'png',  slug: 'jpeg-to-png'  },
  { from: 'jpeg', to: 'webp', slug: 'jpeg-to-webp' },
  { from: 'jpeg', to: 'avif', slug: 'jpeg-to-avif' },
  { from: 'jpeg', to: 'gif',  slug: 'jpeg-to-gif'  },
  { from: 'jpeg', to: 'bmp',  slug: 'jpeg-to-bmp'  },
  { from: 'jpeg', to: 'tiff', slug: 'jpeg-to-tiff' },
  // PNG alias
  { from: 'png',  to: 'jpg',  slug: 'png-to-jpeg'  },
  // Complete AVIF set
  { from: 'avif', to: 'gif',  slug: 'avif-to-gif'  },
  { from: 'avif', to: 'bmp',  slug: 'avif-to-bmp'  },
  { from: 'avif', to: 'tiff', slug: 'avif-to-tiff' },
  { from: 'avif', to: 'ico',  slug: 'avif-to-ico'  },
  // Complete GIF set
  { from: 'gif',  to: 'avif', slug: 'gif-to-avif'  },
  { from: 'gif',  to: 'bmp',  slug: 'gif-to-bmp'   },
  { from: 'gif',  to: 'tiff', slug: 'gif-to-tiff'  },
  { from: 'gif',  to: 'ico',  slug: 'gif-to-ico'   },
  // Complete BMP set
  { from: 'bmp',  to: 'avif', slug: 'bmp-to-avif'  },
  { from: 'bmp',  to: 'tiff', slug: 'bmp-to-tiff'  },
  { from: 'bmp',  to: 'gif',  slug: 'bmp-to-gif'   },
  { from: 'bmp',  to: 'ico',  slug: 'bmp-to-ico'   },
  // Complete TIFF set
  { from: 'tiff', to: 'avif', slug: 'tiff-to-avif' },
  { from: 'tiff', to: 'bmp',  slug: 'tiff-to-bmp'  },
  { from: 'tiff', to: 'gif',  slug: 'tiff-to-gif'  },
  { from: 'tiff', to: 'ico',  slug: 'tiff-to-ico'  },
  // WebP missing
  { from: 'webp', to: 'ico',  slug: 'webp-to-ico'  },
];

export function getConversionBySlug(slug: string): ConversionRoute | undefined {
  return SEO_CONVERSIONS.find((c) => c.slug === slug);
}

/** Reverse conversion, other conversions sharing the same source format, then same target format. */
export function getRelatedConversions(current: ConversionRoute, limit = 8): ConversionRoute[] {
  const reverse = SEO_CONVERSIONS.find((c) => c.from === current.to && c.to === current.from);
  const sameFrom = SEO_CONVERSIONS.filter((c) => c.from === current.from && c.slug !== current.slug);
  const sameTo = SEO_CONVERSIONS.filter((c) => c.to === current.to && c.slug !== current.slug);

  const seen = new Set([current.slug]);
  const related: ConversionRoute[] = [];
  for (const c of [...(reverse ? [reverse] : []), ...sameFrom, ...sameTo]) {
    if (!seen.has(c.slug)) {
      seen.add(c.slug);
      related.push(c);
    }
  }
  return related.slice(0, limit);
}

export function formatLabel(ext: string): string {
  return ext.toUpperCase();
}

export const BASE_URL = 'https://pixvert-one.vercel.app';

export interface CompressRoute {
  format: string;
  label: string;
}

export const SEO_COMPRESS: CompressRoute[] = [
  { format: 'image', label: 'Image' },
  { format: 'jpg',   label: 'JPG'   },
  { format: 'png',   label: 'PNG'   },
  { format: 'webp',  label: 'WebP'  },
  { format: 'avif',  label: 'AVIF'  },
  { format: 'gif',   label: 'GIF'   },
  { format: 'heic',  label: 'HEIC'  },
  { format: 'bmp',   label: 'BMP'   },
  { format: 'tiff',  label: 'TIFF'  },
];

export function getCompressByFormat(format: string): CompressRoute | undefined {
  return SEO_COMPRESS.find((c) => c.format === format);
}

/** Other compress-format pages, excluding the current one. */
export function getRelatedCompress(format: string, limit = 8): CompressRoute[] {
  return SEO_COMPRESS.filter((c) => c.format !== format).slice(0, limit);
}

/** Convert routes that start from the given format — used to cross-link compress pages to converters. */
export function getConversionsFrom(format: string, limit = 6): ConversionRoute[] {
  return SEO_CONVERSIONS.filter((c) => c.from === format).slice(0, limit);
}
