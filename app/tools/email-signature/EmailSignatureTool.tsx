'use client';

import { useState } from 'react';

const TEMPLATES = ['classic', 'modern', 'minimal'] as const;
type Template = typeof TEMPLATES[number];

interface Fields {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  color: string;
}

function buildSignature(f: Fields, tmpl: Template): string {
  const websiteDisplay = f.website.replace(/^https?:\/\//, '');

  if (tmpl === 'classic') {
    return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333;border-collapse:collapse;">
  <tr>
    <td style="border-left:3px solid ${f.color};padding-left:12px;">
      <strong style="font-size:16px;color:${f.color};">${f.name}</strong><br>
      ${f.title ? `<span style="color:#555;">${f.title}</span>` : ''}${f.company ? (f.title ? ` · ${f.company}` : f.company) : ''}<br>
      ${f.email ? `<a href="mailto:${f.email}" style="color:${f.color};text-decoration:none;">${f.email}</a>` : ''}${f.phone ? ` · ${f.phone}` : ''}<br>
      ${f.website ? `<a href="${f.website}" style="color:${f.color};text-decoration:none;">${websiteDisplay}</a>` : ''}
    </td>
  </tr>
</table>`;
  }

  if (tmpl === 'modern') {
    return `<table cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#444;border-collapse:collapse;">
  <tr>
    <td style="padding:0 0 4px;">
      <span style="font-size:17px;font-weight:700;color:#111;">${f.name}</span>
    </td>
  </tr>
  ${f.title || f.company ? `<tr><td style="color:#888;font-size:12px;padding-bottom:6px;">${[f.title, f.company].filter(Boolean).join(' — ')}</td></tr>` : ''}
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0"><tr>
        ${f.email ? `<td style="padding-right:12px;"><a href="mailto:${f.email}" style="color:${f.color};text-decoration:none;font-size:12px;">${f.email}</a></td>` : ''}
        ${f.phone ? `<td style="padding-right:12px;font-size:12px;color:#666;">${f.phone}</td>` : ''}
        ${f.website ? `<td><a href="${f.website}" style="color:${f.color};text-decoration:none;font-size:12px;">${websiteDisplay}</a></td>` : ''}
      </tr></table>
    </td>
  </tr>
  <tr><td style="padding-top:8px;"><div style="width:40px;height:3px;background:${f.color};border-radius:2px;"></div></td></tr>
</table>`;
  }

  // minimal
  return `<p style="font-family:Arial,sans-serif;font-size:13px;color:#555;margin:0;line-height:1.6;">
  <strong style="color:#111;">${f.name}</strong>${f.title ? ` · ${f.title}` : ''}${f.company ? ` · ${f.company}` : ''}<br>
  ${[
    f.email ? `<a href="mailto:${f.email}" style="color:${f.color};text-decoration:none;">${f.email}</a>` : '',
    f.phone,
    f.website ? `<a href="${f.website}" style="color:${f.color};text-decoration:none;">${websiteDisplay}</a>` : '',
  ].filter(Boolean).join(' · ')}
</p>`;
}

export default function EmailSignatureTool() {
  const [fields, setFields] = useState<Fields>({
    name: 'Jane Smith',
    title: 'Senior Designer',
    company: 'Acme Corp',
    email: 'jane@acme.com',
    phone: '+1 555 000 1234',
    website: 'https://acme.com',
    color: '#4f46e5',
  });
  const [template, setTemplate] = useState<Template>('classic');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'preview' | 'html'>('preview');

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  const html = buildSignature(fields, template);

  async function copy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Email Signature Generator — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Create a professional HTML email signature in seconds. Copy the HTML and paste it into Gmail, Outlook, or Apple Mail.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-3">
          {/* Template */}
          <div className="flex gap-2 mb-4">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`flex-1 py-2 rounded-xl border text-sm font-medium capitalize transition-colors ${
                  template === t
                    ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {(
            [
              { key: 'name', label: 'Full Name', placeholder: 'Jane Smith' },
              { key: 'title', label: 'Job Title', placeholder: 'Senior Designer' },
              { key: 'company', label: 'Company', placeholder: 'Acme Corp' },
              { key: 'email', label: 'Email', placeholder: 'jane@acme.com' },
              { key: 'phone', label: 'Phone', placeholder: '+1 555 000 1234' },
              { key: 'website', label: 'Website', placeholder: 'https://acme.com' },
            ] as const
          ).map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</label>
              <input
                type="text"
                value={fields[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Accent Color</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900">
              <input
                type="color"
                value={fields.color}
                onChange={set('color')}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{fields.color}</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col">
          <div className="flex gap-1 mb-3">
            {(['preview', 'html'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === t
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                }`}
              >
                {t === 'preview' ? 'Preview' : 'HTML'}
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 min-h-48">
            {tab === 'preview' ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-all select-all font-mono">
                {html}
              </pre>
            )}
          </div>

          <button
            onClick={copy}
            className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
          >
            {copied ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">✉️</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Works everywhere</h2>
          <p className="text-slate-500 dark:text-slate-400">Table-based HTML compatible with Gmail, Outlook, and Apple Mail.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🎨</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">3 templates</h2>
          <p className="text-slate-500 dark:text-slate-400">Classic, Modern, and Minimal — all with customizable accent color.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">All generation happens in your browser. Nothing is stored or sent.</p>
        </div>
      </section>
    </div>
  );
}
