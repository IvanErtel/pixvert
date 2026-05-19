'use client';

import { useState } from 'react';

interface Fields {
  company: string;
  website: string;
  email: string;
  country: string;
  cookies: boolean;
  analytics: boolean;
  thirdParty: boolean;
  children: boolean;
  gdpr: boolean;
}

function buildPolicy(f: Fields): string {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const domain = f.website.replace(/^https?:\/\//, '').replace(/\/$/, '');

  let policy = `Privacy Policy

Last updated: ${today}

1. Introduction

${f.company || 'We'} ("we", "our", or "us") operate${f.company ? 's' : ''} the website ${domain || 'this website'} (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.

2. Information We Collect

We may collect information about you in a variety of ways, including:

- **Personal Data**: Voluntarily provided information such as your name and email address.
- **Derivative Data**: Information our servers automatically collect when you access the Service, such as your IP address, browser type, operating system, access times, and pages visited.
`;

  if (f.cookies) {
    policy += `
3. Cookies

We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our Service may not function properly.

Types of cookies we use:
- **Essential cookies**: Required for the website to function properly.
- **Preference cookies**: Allow the website to remember your preferences.
`;
  }

  if (f.analytics) {
    policy += `
${f.cookies ? '4' : '3'}. Analytics

We may use third-party Service Providers to monitor and analyze the use of our Service. These analytics services collect information about your use of the website, including pages visited, time spent, and links clicked.

The information gathered is used to compile reports and improve our Service. These third parties may combine the information with other information they have collected from your use of their services.
`;
  }

  if (f.thirdParty) {
    const section = 3 + (f.cookies ? 1 : 0) + (f.analytics ? 1 : 0);
    policy += `
${section}. Third-Party Services

We may use third-party vendors and service providers that collect, use, and disclose information about you in connection with their services. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.

We encourage you to review the privacy policies of any third-party services you access through our website.
`;
  }

  if (f.children) {
    const section = 3 + (f.cookies ? 1 : 0) + (f.analytics ? 1 : 0) + (f.thirdParty ? 1 : 0);
    policy += `
${section}. Children's Privacy

Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us so that we can take necessary actions.
`;
  }

  if (f.gdpr) {
    const section = 3 + (f.cookies ? 1 : 0) + (f.analytics ? 1 : 0) + (f.thirdParty ? 1 : 0) + (f.children ? 1 : 0);
    policy += `
${section}. GDPR Rights (European Users)

If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR):

- The right to access, update, or delete your personal information.
- The right of rectification — to have inaccurate data corrected.
- The right to object to processing of your personal data.
- The right to data portability.
- The right to withdraw consent at any time.

To exercise any of these rights, please contact us at ${f.email || 'the email address below'}.
`;
  }

  const lastSection = 3 + (f.cookies ? 1 : 0) + (f.analytics ? 1 : 0) + (f.thirdParty ? 1 : 0) + (f.children ? 1 : 0) + (f.gdpr ? 1 : 0);

  policy += `
${lastSection}. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically.

${lastSection + 1}. Contact Us

If you have any questions about this Privacy Policy, please contact us:

${f.company ? `Company: ${f.company}\n` : ''}${f.website ? `Website: ${f.website}\n` : ''}${f.email ? `Email: ${f.email}` : ''}
`;

  return policy.trim();
}

export default function PrivacyPolicyTool() {
  const [fields, setFields] = useState<Fields>({
    company: '',
    website: '',
    email: '',
    country: 'United States',
    cookies: true,
    analytics: true,
    thirdParty: false,
    gdpr: false,
    children: false,
  });
  const [copied, setCopied] = useState(false);

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFields((f) => ({ ...f, [key]: val }));
    };
  }

  const policy = buildPolicy(fields);

  async function copy() {
    await navigator.clipboard.writeText(policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function download() {
    const blob = new Blob([policy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'privacy-policy.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Privacy Policy Generator — Free
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Generate a privacy policy for your website in seconds. Fill in your details and check the options that apply.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Form */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Your Info</h2>
            {(
              [
                { key: 'company', label: 'Company / App Name', placeholder: 'Acme Inc.' },
                { key: 'website', label: 'Website URL', placeholder: 'https://acme.com' },
                { key: 'email', label: 'Contact Email', placeholder: 'privacy@acme.com' },
                { key: 'country', label: 'Country / Jurisdiction', placeholder: 'United States' },
              ] as const
            ).map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</label>
                <input
                  type="text"
                  value={fields[key] as string}
                  onChange={set(key)}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Sections to Include</h2>
            {(
              [
                { key: 'cookies', label: 'Cookies' },
                { key: 'analytics', label: 'Analytics (Google Analytics etc.)' },
                { key: 'thirdParty', label: 'Third-party services' },
                { key: 'gdpr', label: 'GDPR rights (EU users)' },
                { key: 'children', label: "Children's privacy" },
              ] as const
            ).map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={fields[key] as boolean}
                  onChange={set(key)}
                  className="accent-indigo-600 w-4 h-4"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="md:col-span-3 flex flex-col">
          <div className="flex gap-2 mb-3">
            <button
              onClick={copy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
            <button
              onClick={download}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
            >
              Download .txt
            </button>
          </div>
          <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 overflow-y-auto max-h-[600px]">
            <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {policy}
            </pre>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-400 text-center">
        This generator creates a general-purpose privacy policy template. It is not legal advice. Consult a lawyer for compliance with specific regulations.
      </p>

      <section className="mt-10 grid sm:grid-cols-3 gap-6 text-sm">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">⚡</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Instant generation</h2>
          <p className="text-slate-500 dark:text-slate-400">Policy updates in real time as you fill in your details.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🌍</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">GDPR ready</h2>
          <p className="text-slate-500 dark:text-slate-400">Optional GDPR section for websites serving European users.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="text-2xl mb-2">🔒</div>
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Fully private</h2>
          <p className="text-slate-500 dark:text-slate-400">Generated entirely in your browser. Nothing is stored or transmitted.</p>
        </div>
      </section>
    </div>
  );
}
