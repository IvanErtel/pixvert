'use client';

import { useState } from 'react';

interface Rule {
  userAgent: string;
  allow: string;
  disallow: string;
}

const PRESETS = {
  allowAll: {
    label: 'Allow all bots',
    rules: [{ userAgent: '*', allow: '/', disallow: '' }],
    sitemap: '',
  },
  blockAll: {
    label: 'Block all bots',
    rules: [{ userAgent: '*', allow: '', disallow: '/' }],
    sitemap: '',
  },
  blockAI: {
    label: 'Block AI crawlers',
    rules: [
      { userAgent: 'GPTBot', allow: '', disallow: '/' },
      { userAgent: 'ChatGPT-User', allow: '', disallow: '/' },
      { userAgent: 'CCBot', allow: '', disallow: '/' },
      { userAgent: 'anthropic-ai', allow: '', disallow: '/' },
      { userAgent: 'ClaudeBot', allow: '', disallow: '/' },
      { userAgent: 'Google-Extended', allow: '', disallow: '/' },
      { userAgent: '*', allow: '/', disallow: '' },
    ],
    sitemap: '',
  },
  standard: {
    label: 'Standard (block /admin)',
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin/' }],
    sitemap: '',
  },
};

function buildRobots(rules: Rule[], sitemap: string, crawlDelay: string): string {
  const lines: string[] = [];

  rules.forEach((r) => {
    lines.push(`User-agent: ${r.userAgent}`);
    if (r.allow) lines.push(`Allow: ${r.allow}`);
    if (r.disallow) lines.push(`Disallow: ${r.disallow}`);
    if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
    lines.push('');
  });

  if (sitemap) lines.push(`Sitemap: ${sitemap}`);

  return lines.join('\n').trim();
}

export default function RobotsTxtTool() {
  const [rules, setRules] = useState<Rule[]>([
    { userAgent: '*', allow: '/', disallow: '/admin/' },
  ]);
  const [sitemap, setSitemap] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [copied, setCopied] = useState(false);

  function applyPreset(key: keyof typeof PRESETS) {
    setRules(PRESETS[key].rules.map((r) => ({ ...r })));
  }

  function updateRule(idx: number, field: keyof Rule, value: string) {
    setRules((prev) => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r));
  }

  function addRule() {
    setRules((prev) => [...prev, { userAgent: '*', allow: '', disallow: '' }]);
  }

  function removeRule(idx: number) {
    setRules((prev) => prev.filter((_, i) => i !== idx));
  }

  const output = buildRobots(rules, sitemap, crawlDelay);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Robots.txt Generator — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Generate a robots.txt file for your website. Control which bots can crawl which pages.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="md:col-span-2 space-y-4">
          {/* Presets */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Quick Presets</h2>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((k) => (
                <button
                  key={k}
                  onClick={() => applyPreset(k)}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-left"
                >
                  {PRESETS[k].label}
                </button>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Rules</h2>
              <button
                onClick={addRule}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
              >
                + Add rule
              </button>
            </div>
            <div className="space-y-4">
              {rules.map((rule, i) => (
                <div key={i} className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Rule {i + 1}</span>
                    {rules.length > 1 && (
                      <button
                        onClick={() => removeRule(i)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {(
                    [
                      { field: 'userAgent', label: 'User-agent', placeholder: '*' },
                      { field: 'allow', label: 'Allow', placeholder: '/' },
                      { field: 'disallow', label: 'Disallow', placeholder: '/admin/' },
                    ] as const
                  ).map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label className="block text-xs text-slate-400 mb-0.5">{label}</label>
                      <input
                        type="text"
                        value={rule[field]}
                        onChange={(e) => updateRule(i, field, e.target.value)}
                        placeholder={placeholder}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3">
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Sitemap URL (optional)</label>
              <input
                type="text"
                value={sitemap}
                onChange={(e) => setSitemap(e.target.value)}
                placeholder="https://example.com/sitemap.xml"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Crawl Delay (seconds, optional)</label>
              <input
                type="number"
                min={0}
                value={crawlDelay}
                onChange={(e) => setCrawlDelay(e.target.value)}
                placeholder="10"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-3 flex flex-col">
          <div className="flex gap-2 mb-3">
            <button
              onClick={copy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={download}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
            >
              Download robots.txt
            </button>
          </div>
          <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <pre className="text-sm text-slate-800 dark:text-slate-200 font-mono whitespace-pre-wrap select-all">
              {output}
            </pre>
          </div>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🤖</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Block AI crawlers</h2>
          <p className="text-slate-500 dark:text-slate-400">One-click preset to block GPTBot, ClaudeBot, CCBot and other AI scrapers.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Live preview</h2>
          <p className="text-slate-500 dark:text-slate-400">Output updates instantly as you change rules or options.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">📥</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Download ready</h2>
          <p className="text-slate-500 dark:text-slate-400">Download the file and place it at the root of your website.</p>
        </div>
      </section>
    </div>
  );
}
