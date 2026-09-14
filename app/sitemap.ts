import { MetadataRoute } from 'next';
import { SEO_CONVERSIONS, SEO_COMPRESS } from '@/lib/seo-conversions';

const BASE_URL = 'https://pixvert-one.vercel.app';

const TOOL_ROUTES = [
  // Image Tools
  '/tools/resize',
  '/tools/rotate',
  '/tools/image-to-base64',
  '/tools/watermark',
  '/tools/crop',
  '/tools/remove-background',
  '/compress/image',
  // Text Tools
  '/tools/word-counter',
  '/tools/case-converter',
  '/tools/lorem-ipsum',
  '/tools/text-diff',
  '/tools/url-encoder',
  '/tools/base64-text',
  '/tools/text-to-slug',
  '/tools/remove-accents',
  '/tools/word-frequency',
  '/tools/remove-blank-lines',
  // Color Tools
  '/tools/color-picker',
  '/tools/color-converter',
  '/tools/color-palette',
  '/tools/gradient-generator',
  '/tools/contrast-checker',
  // Developer Tools
  '/tools/json-formatter',
  '/tools/json-csv',
  '/tools/css-minifier',
  '/tools/js-minifier',
  '/tools/html-formatter',
  '/tools/meta-tags',
  '/tools/htaccess-generator',
  // Calculators
  '/tools/mortgage-calculator',
  '/tools/vat-calculator',
  '/tools/salary-calculator',
  '/tools/percentage-calculator',
  '/tools/bmi-calculator',
  '/tools/age-calculator',
  '/tools/date-difference',
  '/tools/unit-converter',
  '/tools/tip-calculator',
  // Generators
  '/tools/qr-generator',
  '/tools/password-generator',
  '/tools/uuid-generator',
  '/tools/random-numbers',
  '/tools/email-signature',
  '/tools/privacy-policy',
  '/tools/robots-txt',
  // File Tools
  '/tools/pdf-merge',
  '/tools/markdown-to-html',
  '/tools/excel-to-csv',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tools`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = TOOL_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path.startsWith('/compress') ? 0.8 : 0.7,
    ...(path === '/tools/salary-calculator'
      ? {
          alternates: {
            languages: {
              en: `${BASE_URL}/tools/salary-calculator`,
              es: `${BASE_URL}/es/tools/salary-calculator`,
            },
          },
        }
      : {}),
  }));

  // Localized tool pages (SSR'd in a language other than English) — pilot: salary-calculator/es
  const localizedToolRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/es/tools/salary-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}/tools/salary-calculator`,
          es: `${BASE_URL}/es/tools/salary-calculator`,
        },
      },
    },
  ];

  const conversionRoutes: MetadataRoute.Sitemap = SEO_CONVERSIONS.map((c) => ({
    url: `${BASE_URL}/convert/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const compressRoutes: MetadataRoute.Sitemap = SEO_COMPRESS
    .filter((c) => c.format !== 'image')
    .map((c) => ({
      url: `${BASE_URL}/compress/${c.format}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...toolRoutes, ...localizedToolRoutes, ...conversionRoutes, ...compressRoutes];
}
