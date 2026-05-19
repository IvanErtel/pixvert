'use client';

import { useState } from 'react';

interface MetaData {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  type: string;
  twitterCard: string;
  twitterSite: string;
  robots: string;
  canonical: string;
}

const DEFAULT: MetaData = {
  title: 'My Awesome Page',
  description: 'A short description of my page, ideally between 120 and 160 characters for best SEO results.',
  url: 'https://example.com/my-page',
  image: 'https://example.com/og-image.jpg',
  siteName: 'My Website',
  type: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@myhandle',
  robots: 'index, follow',
  canonical: 'https://example.com/my-page',
};

function buildTags(d: MetaData): string {
  const lines: string[] = [
    '<!-- Primary Meta Tags -->',
    `<title>${d.title}</title>`,
    `<meta name="title" content="${d.title}" />`,
    `<meta name="description" content="${d.description}" />`,
    `<meta name="robots" content="${d.robots}" />`,
    d.canonical ? `<link rel="canonical" href="${d.canonical}" />` : '',
    '',
    '<!-- Open Graph / Facebook -->',
    `<meta property="og:type" content="${d.type}" />`,
    `<meta property="og:url" content="${d.url}" />`,
    `<meta property="og:title" content="${d.title}" />`,
    `<meta property="og:description" content="${d.description}" />`,
    d.image ? `<meta property="og:image" content="${d.image}" />` : '',
    d.siteName ? `<meta property="og:site_name" content="${d.siteName}" />` : '',
    '',
    '<!-- Twitter -->',
    `<meta property="twitter:card" content="${d.twitterCard}" />`,
    `<meta property="twitter:url" content="${d.url}" />`,
    `<meta property="twitter:title" content="${d.title}" />`,
    `<meta property="twitter:description" content="${d.description}" />`,
    d.image ? `<meta property="twitter:image" content="${d.image}" />` : '',
    d.twitterSite ? `<meta property="twitter:site" content="${d.twitterSite}" />` : '',
  ].filter((l) => l !== '');
  return lines.join('\n');
}

function Field({ label, value, onChange, placeholder, hint, multiline = false }:
  { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; multiline?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      )}
      {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
    </div>
  );
}

export default function MetaTagsTool() {
  const [data, setData] = useState<MetaData>(DEFAULT);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof MetaData) => (v: string) => setData((d) => ({ ...d, [key]: v }));

  const tags = buildTags(data);
  const descLen = data.description.length;
  const titleLen = data.title.length;

  const copy = async () => {
    await navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Meta Tags Generator — Free</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Fill in your page details and get ready-to-paste SEO, Open Graph, and Twitter Card
          meta tags.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Form */}
        <div className="space-y-4">
          <Field label="Title" value={data.title} onChange={set('title')}
            hint={`${titleLen} chars — ideal 50–60`} placeholder="My Awesome Page" />
          <Field label="Description" value={data.description} onChange={set('description')} multiline
            hint={`${descLen} chars — ideal 120–160`} placeholder="A short description…" />
          <Field label="Page URL" value={data.url} onChange={set('url')} placeholder="https://example.com/page" />
          <Field label="Image URL (OG image, 1200×630)" value={data.image} onChange={set('image')} placeholder="https://example.com/og.jpg" />
          <Field label="Site name" value={data.siteName} onChange={set('siteName')} placeholder="My Website" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">OG type</label>
              <select value={data.type} onChange={(e) => set('type')(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['website','article','product','profile'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Twitter card</label>
              <select value={data.twitterCard} onChange={(e) => set('twitterCard')(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['summary_large_image','summary','app','player'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Field label="Twitter @handle" value={data.twitterSite} onChange={set('twitterSite')} placeholder="@myhandle" />
          <Field label="Robots" value={data.robots} onChange={set('robots')} placeholder="index, follow" />
          <Field label="Canonical URL" value={data.canonical} onChange={set('canonical')} placeholder="https://example.com/page" />
        </div>

        {/* Preview */}
        <div className="space-y-4">
          {/* Google preview */}
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Google preview</p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
              <p className="text-xs text-slate-500 truncate">{data.url || 'https://example.com'}</p>
              <p className={`text-base font-medium mt-0.5 ${titleLen > 60 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-700 dark:text-blue-400'}`}>
                {data.title || 'Page Title'}
              </p>
              <p className={`text-xs mt-1 leading-relaxed ${descLen > 160 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {data.description ? (data.description.length > 160 ? data.description.slice(0, 160) + '…' : data.description) : 'Description'}
              </p>
            </div>
          </div>

          {/* Social preview */}
          {data.image && (
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Social card preview</p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                <div className="h-32 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-xs">
                  OG image: {data.image.split('/').pop()}
                </div>
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-400 uppercase">{new URL(data.url || 'https://example.com').hostname}</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{data.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{data.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Generated HTML — paste in your &lt;head&gt;</span>
          <button onClick={copy} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
            {copied ? '✓ Copied!' : 'Copy all'}
          </button>
        </div>
        <pre className="px-4 py-3 text-xs font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 overflow-x-auto whitespace-pre">
          {tags}
        </pre>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🏷️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">SEO + Social</h2>
          <p className="text-slate-500 dark:text-slate-400">Generates primary SEO tags, Open Graph (Facebook/LinkedIn), and Twitter Card tags.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">👁️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live previews</h2>
          <p className="text-slate-500 dark:text-slate-400">See how your page looks in Google search results and social media share cards.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚠️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Length warnings</h2>
          <p className="text-slate-500 dark:text-slate-400">Title and description turn amber when they exceed recommended character limits for SEO.</p>
        </div>
      </section>
    </div>
  );
}
