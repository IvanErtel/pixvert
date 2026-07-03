'use client';

import { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

function formatEur(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
}

interface MortgageContent {
  heroTitle: string;
  heroSubtitle: string;
  loanAmountLabel: string;
  interestRateLabel: string;
  loanTermLabel: string;
  yearsSuffix: string;
  resultsLabel: string;
  copyButton: string;
  copiedButton: string;
  monthlyPaymentLabel: string;
  totalPaidLabel: string;
  totalInterestLabel: string;
  breakdownLabel: string;
  principalWord: string;
  interestWord: string;
  emptyState: string;
  copyText: (principal: string, rate: string, years: string, monthly: string, total: string, interest: string) => string;
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, MortgageContent>> = {
  en: {
    heroTitle: 'Mortgage Calculator — Free',
    heroSubtitle: 'Calculate your monthly mortgage payment, total cost, and total interest in seconds.',
    loanAmountLabel: 'Loan amount',
    interestRateLabel: 'Annual interest rate',
    loanTermLabel: 'Loan term',
    yearsSuffix: 'years',
    resultsLabel: 'Results',
    copyButton: 'Copy',
    copiedButton: '✓ Copied!',
    monthlyPaymentLabel: 'Monthly payment',
    totalPaidLabel: 'Total paid',
    totalInterestLabel: 'Total interest',
    breakdownLabel: 'Principal vs interest breakdown',
    principalWord: 'Principal',
    interestWord: 'Interest',
    emptyState: 'Enter valid values above to see results',
    copyText: (principal, rate, years, monthly, total, interest) =>
      `Mortgage: ${principal} EUR at ${rate}% for ${years} years\nMonthly: ${monthly}\nTotal: ${total}\nTotal Interest: ${interest}`,
    features: [
      { icon: '📐', title: 'Standard formula', description: 'Uses the standard amortization formula: M = P × r(1+r)ⁿ / ((1+r)ⁿ−1).' },
      { icon: '📊', title: 'Visual breakdown', description: 'See at a glance how much of your total payment goes to interest vs principal.' },
      { icon: '🔒', title: 'Fully private', description: 'All calculations run in your browser. No data is sent anywhere.' },
    ],
  },
  es: {
    heroTitle: 'Calculadora de Hipoteca — Gratis',
    heroSubtitle: 'Calcula tu cuota mensual de hipoteca, coste total e intereses totales en segundos.',
    loanAmountLabel: 'Importe del préstamo',
    interestRateLabel: 'Tipo de interés anual',
    loanTermLabel: 'Plazo del préstamo',
    yearsSuffix: 'años',
    resultsLabel: 'Resultados',
    copyButton: 'Copiar',
    copiedButton: '✓ ¡Copiado!',
    monthlyPaymentLabel: 'Cuota mensual',
    totalPaidLabel: 'Total pagado',
    totalInterestLabel: 'Intereses totales',
    breakdownLabel: 'Desglose de capital frente a intereses',
    principalWord: 'Capital',
    interestWord: 'Intereses',
    emptyState: 'Introduce valores válidos arriba para ver resultados',
    copyText: (principal, rate, years, monthly, total, interest) =>
      `Hipoteca: ${principal} EUR al ${rate}% durante ${years} años\nCuota mensual: ${monthly}\nTotal: ${total}\nIntereses totales: ${interest}`,
    features: [
      { icon: '📐', title: 'Fórmula estándar', description: 'Usa la fórmula estándar de amortización: M = P × r(1+r)ⁿ / ((1+r)ⁿ−1).' },
      { icon: '📊', title: 'Desglose visual', description: 'Ve de un vistazo cuánto de tu pago total va a intereses frente a capital.' },
      { icon: '🔒', title: 'Totalmente privado', description: 'Todos los cálculos ocurren en tu navegador. No se envía ningún dato a ningún sitio.' },
    ],
  },
};

export default function MortgageCalculatorTool() {
  const c = useLocalizedContent(content);
  const [principal, setPrincipal] = useState('250000');
  const [rate, setRate] = useState('3.5');
  const [years, setYears] = useState('30');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const n = parseInt(years) * 12;
    if (!P || !annualRate || !n || P <= 0 || annualRate <= 0 || n <= 0) return null;
    const r = annualRate / 100 / 12;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - P;
    return { monthly, total, interest };
  }, [principal, rate, years]);

  const copy = async () => {
    if (!result) return;
    const text = c.copyText(principal, rate, years, formatEur(result.monthly), formatEur(result.total), formatEur(result.interest));
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Field = ({ label, value, onChange, prefix, suffix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
      <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
        {prefix && <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-r border-slate-300 dark:border-slate-600">{prefix}</span>}
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-none" />
        {suffix && <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-l border-slate-300 dark:border-slate-600">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{c.heroTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        <Field label={c.loanAmountLabel} value={principal} onChange={setPrincipal} prefix="€" />
        <Field label={c.interestRateLabel} value={rate} onChange={setRate} suffix="%" />
        <Field label={c.loanTermLabel} value={years} onChange={setYears} suffix={c.yearsSuffix} />
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{c.resultsLabel}</p>
            <button onClick={copy} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
              {copied ? c.copiedButton : c.copyButton}
            </button>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{c.monthlyPaymentLabel}</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{formatEur(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-200 dark:border-indigo-700">
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{c.totalPaidLabel}</p>
              <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">{formatEur(result.total)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{c.totalInterestLabel}</p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">{formatEur(result.interest)}</p>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-xs text-slate-400 mb-1">{c.breakdownLabel}</p>
            <div className="w-full h-3 rounded-full overflow-hidden bg-red-200 dark:bg-red-900/40">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(parseFloat(principal) / result.total * 100).toFixed(1)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{c.principalWord} {(parseFloat(principal) / result.total * 100).toFixed(0)}%</span>
              <span>{c.interestWord} {(result.interest / result.total * 100).toFixed(0)}%</span>
            </div>
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
