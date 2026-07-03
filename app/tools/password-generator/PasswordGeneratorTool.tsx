'use client';

import { useState, useCallback } from 'react';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

interface PasswordContent {
  heroTitle: string;
  heroSubtitle: string;
  lengthLabel: string;
  generateLabel: string;
  generateButton: string;
  strengthLabel: string;
  copyButton: string;
  copiedButton: string;
  strengthLabels: { weak: string; fair: string; good: string; strong: string };
  passwordWord: { singular: string; plural: string };
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, PasswordContent>> = {
  en: {
    heroTitle: 'Password Generator — Free',
    heroSubtitle: 'Create strong, secure passwords with custom length and character sets. Uses cryptographic randomness.',
    lengthLabel: 'Length',
    generateLabel: 'Generate',
    generateButton: 'Generate',
    strengthLabel: 'Strength',
    copyButton: 'Copy',
    copiedButton: 'Copied!',
    strengthLabels: { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' },
    passwordWord: { singular: 'password', plural: 'passwords' },
    features: [
      { icon: '🔐', title: 'Cryptographic random', description: 'Uses the Web Crypto API — the same randomness as your OS provides.' },
      { icon: '⚙️', title: 'Fully customizable', description: 'Mix uppercase, lowercase, digits, and symbols as needed.' },
      { icon: '🔒', title: 'Fully private', description: 'Generated locally in your browser. Passwords never leave your device.' },
    ],
  },
  es: {
    heroTitle: 'Generador de Contraseñas — Gratis',
    heroSubtitle: 'Crea contraseñas fuertes y seguras con longitud y conjuntos de caracteres personalizados. Usa aleatoriedad criptográfica.',
    lengthLabel: 'Longitud',
    generateLabel: 'Generar',
    generateButton: 'Generar',
    strengthLabel: 'Fortaleza',
    copyButton: 'Copiar',
    copiedButton: '¡Copiado!',
    strengthLabels: { weak: 'Débil', fair: 'Aceptable', good: 'Buena', strong: 'Fuerte' },
    passwordWord: { singular: 'contraseña', plural: 'contraseñas' },
    features: [
      { icon: '🔐', title: 'Aleatoriedad criptográfica', description: 'Usa la Web Crypto API — la misma aleatoriedad que proporciona tu sistema operativo.' },
      { icon: '⚙️', title: 'Totalmente personalizable', description: 'Combina mayúsculas, minúsculas, números y símbolos según necesites.' },
      { icon: '🔒', title: 'Totalmente privado', description: 'Generado localmente en tu navegador. Las contraseñas nunca salen de tu dispositivo.' },
    ],
  },
};

function generatePassword(
  length: number,
  opts: { upper: boolean; lower: boolean; digits: boolean; symbols: boolean }
): string {
  let pool = '';
  if (opts.upper) pool += CHARS.upper;
  if (opts.lower) pool += CHARS.lower;
  if (opts.digits) pool += CHARS.digits;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) return '';

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => pool[n % pool.length]).join('');
}

function strength(pwd: string, labels: PasswordContent['strengthLabels']): { label: string; color: string; pct: number } {
  if (pwd.length === 0) return { label: '', color: '', pct: 0 };
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: labels.weak, color: 'bg-red-500', pct: 25 };
  if (score <= 3) return { label: labels.fair, color: 'bg-orange-400', pct: 50 };
  if (score <= 4) return { label: labels.good, color: 'bg-yellow-400', pct: 75 };
  return { label: labels.strong, color: 'bg-emerald-500', pct: 100 };
}

export default function PasswordGeneratorTool() {
  const c = useLocalizedContent(content);
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = useCallback(() => {
    const list = Array.from({ length: count }, () => generatePassword(length, opts));
    setPasswords(list);
    setCopied(null);
  }, [length, opts, count]);

  async function copy(pwd: string, idx: number) {
    await navigator.clipboard.writeText(pwd);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  function toggle(key: keyof typeof opts) {
    const next = { ...opts, [key]: !opts[key] };
    if (!Object.values(next).some(Boolean)) return;
    setOpts(next);
  }

  const str = passwords[0] ? strength(passwords[0], c.strengthLabels) : null;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          {c.heroTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 space-y-5">
        {/* Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {c.lengthLabel}
            </label>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>6</span><span>64</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(CHARS) as Array<keyof typeof CHARS>).map((k) => (
            <button
              key={k}
              onClick={() => toggle(k)}
              className={`rounded-xl border py-2 text-sm font-medium transition-colors ${
                opts[k]
                  ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              {k === 'upper' ? 'ABC' : k === 'lower' ? 'abc' : k === 'digits' ? '123' : '!@#'}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 shrink-0">
            {c.generateLabel}
          </label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {[1, 5, 10, 20].map((n) => (
              <option key={n} value={n}>{n} {n > 1 ? c.passwordWord.plural : c.passwordWord.singular}</option>
            ))}
          </select>
          <button
            onClick={generate}
            className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
          >
            {c.generateButton}
          </button>
        </div>
      </div>

      {/* Results */}
      {passwords.length > 0 && (
        <div className="mt-6 space-y-2">
          {str && passwords.length === 1 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">{c.strengthLabel}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{str.label}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div className={`h-2 rounded-full transition-all ${str.color}`} style={{ width: `${str.pct}%` }} />
              </div>
            </div>
          )}
          {passwords.map((pwd, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3"
            >
              <span className="flex-1 font-mono text-sm text-slate-800 dark:text-slate-200 break-all select-all">
                {pwd}
              </span>
              <button
                onClick={() => copy(pwd, i)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-300 transition-colors"
              >
                {copied === i ? c.copiedButton : c.copyButton}
              </button>
            </div>
          ))}
        </div>
      )}

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        {c.features.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{f.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
