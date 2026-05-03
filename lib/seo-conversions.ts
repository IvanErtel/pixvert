import { ImageFormat } from './formats';

export interface ConversionRoute {
  from: string;
  to: ImageFormat;
  slug: string;
}

export const SEO_CONVERSIONS: ConversionRoute[] = [
  { from: 'png',  to: 'webp', slug: 'png-to-webp'  },
  { from: 'png',  to: 'jpg',  slug: 'png-to-jpg'   },
  { from: 'jpg',  to: 'webp', slug: 'jpg-to-webp'  },
  { from: 'jpg',  to: 'png',  slug: 'jpg-to-png'   },
  { from: 'webp', to: 'png',  slug: 'webp-to-png'  },
  { from: 'webp', to: 'jpg',  slug: 'webp-to-jpg'  },
  { from: 'bmp',  to: 'webp', slug: 'bmp-to-webp'  },
  { from: 'bmp',  to: 'jpg',  slug: 'bmp-to-jpg'   },
  { from: 'bmp',  to: 'png',  slug: 'bmp-to-png'   },
  { from: 'gif',  to: 'webp', slug: 'gif-to-webp'  },
  { from: 'gif',  to: 'png',  slug: 'gif-to-png'   },
  { from: 'gif',  to: 'jpg',  slug: 'gif-to-jpg'   },
  { from: 'avif', to: 'png',  slug: 'avif-to-png'  },
  { from: 'avif', to: 'jpg',  slug: 'avif-to-jpg'  },
  { from: 'avif', to: 'webp', slug: 'avif-to-webp' },
  { from: 'png',  to: 'avif', slug: 'png-to-avif'  },
  { from: 'jpg',  to: 'avif', slug: 'jpg-to-avif'  },
  { from: 'webp', to: 'avif', slug: 'webp-to-avif' },
];

export function getConversionBySlug(slug: string): ConversionRoute | undefined {
  return SEO_CONVERSIONS.find((c) => c.slug === slug);
}

export function formatLabel(ext: string): string {
  return ext.toUpperCase();
}
