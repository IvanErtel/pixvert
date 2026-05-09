import { MetadataRoute } from 'next';
import { SEO_CONVERSIONS, SEO_COMPRESS } from '@/lib/seo-conversions';

const BASE_URL = 'https://pixvert-one.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const conversionRoutes: MetadataRoute.Sitemap = SEO_CONVERSIONS.map((c) => ({
    url: `${BASE_URL}/convert/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const compressRoutes: MetadataRoute.Sitemap = SEO_COMPRESS.map((c) => ({
    url: `${BASE_URL}/compress/${c.format}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...conversionRoutes, ...compressRoutes];
}
