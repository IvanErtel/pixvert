'use client';

import { useState, useMemo } from 'react';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

// Spain IRPF 2024 brackets (simplified general scale)
const BRACKETS = [
  { limit: 12450, rate: 0.19 },
  { limit: 20200, rate: 0.24 },
  { limit: 35200, rate: 0.30 },
  { limit: 60000, rate: 0.37 },
  { limit: 300000, rate: 0.45 },
  { limit: Infinity, rate: 0.47 },
];

// Social Security: employee contribution ~6.35% (general)
const SS_RATE = 0.0635;

function calcIRPF(gross: number): number {
  let tax = 0;
  let prev = 0;
  for (const bracket of BRACKETS) {
    if (gross <= prev) break;
    const taxable = Math.min(gross, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }
  return tax;
}

function fmt(n: number) {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
}

function pct(n: number, total: number) {
  return ((n / total) * 100).toFixed(1) + '%';
}

interface SalaryContent {
  heroTitle: string;
  heroSubtitle: string;
  grossLabel: string;
  pagasLabel: string;
  pagasSuffix: string;
  monthlyNetLabel: (pagas: number) => string;
  grossRowLabel: string;
  ssRowLabel: (rate: string) => string;
  irpfRowLabel: string;
  annualNetLabel: string;
  emptyState: string;
  disclaimer: string;
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, SalaryContent>> = {
  en: {
    heroTitle: 'Salary Calculator Spain — Free',
    heroSubtitle: 'Estimate your net salary after IRPF and Social Security contributions (Spain 2024). Simplified calculation — consult a professional for exact figures.',
    grossLabel: 'Annual gross salary (bruto)',
    pagasLabel: 'Number of payments per year',
    pagasSuffix: 'pagas',
    monthlyNetLabel: (pagas) => `Monthly net (${pagas} pagas)`,
    grossRowLabel: 'Gross (bruto)',
    ssRowLabel: (rate) => `Social Security (${rate}%)`,
    irpfRowLabel: 'IRPF (income tax)',
    annualNetLabel: 'Annual net (neto)',
    emptyState: 'Enter your gross salary above',
    disclaimer: 'Simplified estimate using Spain 2024 general IRPF brackets. Actual deductions vary by personal situation.',
    features: [
      { icon: '🇪🇸', title: 'Spain 2024 brackets', description: 'Uses the 2024 general IRPF progressive scale and 6.35% SS employee rate.' },
      { icon: '📅', title: '12 or 14 pagas', description: 'Toggle between 12 monthly payments or 14 (includes July and December extras).' },
      { icon: '⚠️', title: 'Estimate only', description: 'Actual net depends on personal deductions, family situation, region, etc.' },
    ],
  },
  es: {
    heroTitle: 'Calculadora de Salario España — Gratis',
    heroSubtitle: 'Estima tu salario neto tras las retenciones de IRPF y Seguridad Social (España 2024). Cálculo simplificado — consulta a un profesional para cifras exactas.',
    grossLabel: 'Salario bruto anual',
    pagasLabel: 'Número de pagas al año',
    pagasSuffix: 'pagas',
    monthlyNetLabel: (pagas) => `Neto mensual (${pagas} pagas)`,
    grossRowLabel: 'Bruto',
    ssRowLabel: (rate) => `Seguridad Social (${rate}%)`,
    irpfRowLabel: 'IRPF (retención)',
    annualNetLabel: 'Neto anual',
    emptyState: 'Introduce tu salario bruto arriba',
    disclaimer: 'Estimación simplificada usando los tramos generales de IRPF de España 2024. Las deducciones reales varían según la situación personal.',
    features: [
      { icon: '🇪🇸', title: 'Tramos de España 2024', description: 'Usa la escala progresiva general de IRPF de 2024 y el tipo de Seguridad Social del trabajador del 6,35%.' },
      { icon: '📅', title: '12 o 14 pagas', description: 'Alterna entre 12 pagas mensuales o 14 (incluye las pagas extra de julio y diciembre).' },
      { icon: '⚠️', title: 'Solo una estimación', description: 'El neto real depende de deducciones personales, situación familiar, comunidad autónoma, etc.' },
    ],
  },
};

export default function SalaryCalculatorTool() {
  const c = useLocalizedContent(content);
  const [gross, setGross] = useState('30000');
  const [pagas, setPagas] = useState<12 | 14>(14);

  const result = useMemo(() => {
    const g = parseFloat(gross);
    if (!g || g <= 0) return null;
    const ss = g * SS_RATE;
    const taxBase = g - ss;
    const irpf = calcIRPF(taxBase);
    const net = g - ss - irpf;
    return { gross: g, ss, irpf, net, monthly: net / pagas };
  }, [gross, pagas]);

  return (
    <div className="max-w-lg mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{c.heroTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 bg-white dark:bg-slate-900 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{c.grossLabel}</label>
          <div className="flex rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
            <span className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-sm border-r border-slate-300 dark:border-slate-600">€</span>
            <input type="number" value={gross} onChange={(e) => setGross(e.target.value)}
              className="flex-1 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{c.pagasLabel}</label>
          <div className="flex gap-2">
            {([12, 14] as const).map((p) => (
              <button key={p} onClick={() => setPagas(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  pagas === p ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                {p} {c.pagasSuffix}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 overflow-hidden">
          <div className="px-5 py-4 bg-indigo-600 text-white text-center">
            <p className="text-xs opacity-80 mb-1">{c.monthlyNetLabel(pagas)}</p>
            <p className="text-4xl font-bold">{fmt(result.monthly)}</p>
          </div>
          <div className="divide-y divide-indigo-100 dark:divide-indigo-800">
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">{c.grossRowLabel}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{fmt(result.gross)}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">{c.ssRowLabel((SS_RATE * 100).toFixed(2))}</span>
              <span className="font-semibold text-red-500">−{fmt(result.ss)} <span className="text-xs font-normal opacity-60">({pct(result.ss, result.gross)})</span></span>
            </div>
            <div className="flex justify-between items-center px-5 py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">{c.irpfRowLabel}</span>
              <span className="font-semibold text-red-500">−{fmt(result.irpf)} <span className="text-xs font-normal opacity-60">({pct(result.irpf, result.gross)})</span></span>
            </div>
            <div className="flex justify-between items-center px-5 py-4 bg-indigo-100/50 dark:bg-indigo-900/40">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{c.annualNetLabel}</span>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(result.net)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center text-slate-400 text-sm">
          {c.emptyState}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400 text-center">
        {c.disclaimer}
      </p>

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
