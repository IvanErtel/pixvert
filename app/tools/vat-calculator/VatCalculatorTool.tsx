'use client';

import { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

function fmt(n: number) {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
}

interface VatContent {
  heroTitle: string;
  heroSubtitle: string;
  rates: { label: string; value: number }[];
  addModeLabel: string;
  extractModeLabel: string;
  priceWithoutVatLabel: string;
  priceWithVatLabel: string;
  vatRateLabel: string;
  baseRowLabel: string;
  vatRowLabel: (rate: number) => string;
  totalRowLabel: string;
  emptyState: string;
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, VatContent>> = {
  en: {
    heroTitle: 'VAT Calculator Spain — Free',
    heroSubtitle: 'Add or extract Spanish VAT (IVA) at 21%, 10%, or 4%. Results update instantly.',
    rates: [
      { label: 'General (21%)', value: 21 },
      { label: 'Reduced (10%)', value: 10 },
      { label: 'Super-reduced (4%)', value: 4 },
    ],
    addModeLabel: 'Add VAT',
    extractModeLabel: 'Extract VAT',
    priceWithoutVatLabel: 'Price without VAT',
    priceWithVatLabel: 'Price with VAT (total)',
    vatRateLabel: 'VAT rate',
    baseRowLabel: 'Base (excl. VAT)',
    vatRowLabel: (rate) => `VAT (${rate}%)`,
    totalRowLabel: 'Total (incl. VAT)',
    emptyState: 'Enter an amount above to calculate',
    features: [
      { icon: '💶', title: 'Spain IVA rates', description: 'Covers all three Spanish VAT rates: general (21%), reduced (10%), and super-reduced (4%).' },
      { icon: '↕️', title: 'Add or extract', description: 'Add VAT to a net price or extract it from a total that already includes VAT.' },
      { icon: '⚡', title: 'Instant results', description: 'Results update as you type — no need to press any button.' },
    ],
  },
  es: {
    heroTitle: 'Calculadora de IVA España — Gratis',
    heroSubtitle: 'Suma o extrae el IVA español al 21%, 10% o 4%. Los resultados se actualizan al instante.',
    rates: [
      { label: 'General (21%)', value: 21 },
      { label: 'Reducido (10%)', value: 10 },
      { label: 'Superreducido (4%)', value: 4 },
    ],
    addModeLabel: 'Sumar IVA',
    extractModeLabel: 'Extraer IVA',
    priceWithoutVatLabel: 'Precio sin IVA',
    priceWithVatLabel: 'Precio con IVA (total)',
    vatRateLabel: 'Tipo de IVA',
    baseRowLabel: 'Base (sin IVA)',
    vatRowLabel: (rate) => `IVA (${rate}%)`,
    totalRowLabel: 'Total (con IVA)',
    emptyState: 'Introduce un importe arriba para calcular',
    features: [
      { icon: '💶', title: 'Tipos de IVA España', description: 'Cubre los tres tipos de IVA español: general (21%), reducido (10%) y superreducido (4%).' },
      { icon: '↕️', title: 'Sumar o extraer', description: 'Suma el IVA a un precio neto o extráelo de un total que ya lo incluye.' },
      { icon: '⚡', title: 'Resultados instantáneos', description: 'Los resultados se actualizan mientras escribes — no hace falta pulsar ningún botón.' },
    ],
  },
};

export default function VatCalculatorTool() {
  const c = useLocalizedContent(content);
  const [amount, setAmount] = useState('100');
  const [rate, setRate] = useState(21);
  const [mode, setMode] = useState<'add' | 'extract'>('add');

  const result = useMemo(() => {
    const base = parseFloat(amount);
    if (!base || base <= 0) return null;
    if (mode === 'add') {
      const vatAmount = base * rate / 100;
      return { base, vatAmount, total: base + vatAmount };
    } else {
      const base2 = base / (1 + rate / 100);
      const vatAmount = base - base2;
      return { base: base2, vatAmount, total: base };
    }
  }, [amount, rate, mode]);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{c.heroTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        {/* Mode toggle */}
        <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          {(['add', 'extract'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                mode === m ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}>
              {m === 'add' ? c.addModeLabel : c.extractModeLabel}
            </button>
          ))}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            {mode === 'add' ? c.priceWithoutVatLabel : c.priceWithVatLabel}
          </label>
          <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
            <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-r border-slate-300 dark:border-slate-600">€</span>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {/* Rate */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{c.vatRateLabel}</label>
          <div className="flex gap-2">
            {c.rates.map((r) => (
              <button key={r.value} onClick={() => setRate(r.value)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  rate === r.value
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 divide-y divide-indigo-100 dark:divide-indigo-800">
          <div className="flex justify-between items-center px-5 py-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">{c.baseRowLabel}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{fmt(result.base)}</span>
          </div>
          <div className="flex justify-between items-center px-5 py-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">{c.vatRowLabel(rate)}</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">{fmt(result.vatAmount)}</span>
          </div>
          <div className="flex justify-between items-center px-5 py-4 bg-indigo-100/50 dark:bg-indigo-900/40 rounded-b-xl">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{c.totalRowLabel}</span>
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(result.total)}</span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          {c.emptyState}
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
