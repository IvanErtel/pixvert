'use client';

import { useState } from 'react';
import { useSubscription } from '@/lib/subscription';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  priceId?: string;
  highlight?: boolean;
  isCurrent: boolean;
  isFree?: boolean;
  onSubscribe: (priceId: string) => void;
  loading: boolean;
  isPro: boolean;
  email: string | null;
}

function PlanCard({ name, price, period, features, priceId, highlight, isCurrent, isFree, onSubscribe, loading, isPro, email }: PlanCardProps) {
  const router = useRouter();

  const handleManage = async () => {
    if (!email) return;
    const res = await fetch('/api/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.url) router.push(data.url);
  };

  return (
    <div className={`rounded-2xl p-8 bg-white dark:bg-slate-900 relative flex flex-col ${
      highlight
        ? 'border-2 border-[#6366F1] shadow-xl shadow-indigo-100 dark:shadow-indigo-900/20'
        : 'border border-slate-200 dark:border-slate-700'
    }`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366F1] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{name}</h2>
      <div className="mt-3 mb-8">
        <span className="text-5xl font-bold text-slate-900 dark:text-white">{price}</span>
        {period && <span className="text-slate-400 text-sm ml-1">{period}</span>}
      </div>

      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <svg className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {isFree ? (
        <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-400 cursor-default">
          Current Plan
        </button>
      ) : isCurrent && isPro ? (
        <button
          onClick={handleManage}
          className="w-full py-2.5 rounded-xl border-2 border-[#6366F1] text-[#6366F1] text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
        >
          Manage Subscription
        </button>
      ) : (
        <button
          onClick={() => priceId && onSubscribe(priceId)}
          disabled={loading || !priceId}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#6366F1] text-white hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? 'Redirecting...' : 'Get Pro'}
        </button>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { isPro, email } = useSubscription();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          No hidden fees. Cancel anytime.
        </p>
        {isPro && (
          <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold px-4 py-2 rounded-full">
            ✨ You are on the Pro plan
          </div>
        )}
      </div>

      <p className="text-sm text-slate-400 mb-6">
        ¿Ya tienes una suscripción activa?{' '}
        <a href="/activate" className="text-[#6366F1] hover:underline font-medium">
          Activa tu acceso Pro aquí
        </a>
      </p>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <PlanCard
          name="Free"
          price="$0"
          period=""
          features={[
            '10 conversions/day',
            'PNG, JPG, WebP',
            'Up to 5 MB per file',
            'Up to 3 files at once',
          ]}
          isFree
          isCurrent={!isPro}
          onSubscribe={handleSubscribe}
          loading={loading}
          isPro={isPro}
          email={email}
        />
        <PlanCard
          name="Pro"
          price="$3.99"
          period="/month"
          features={[
            'Unlimited conversions',
            'All formats (AVIF included)',
            'Up to 50 MB per file',
            'Unlimited batch size',
            'No ads',
          ]}
          priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID}
          highlight
          isCurrent={isPro}
          onSubscribe={handleSubscribe}
          loading={loading}
          isPro={isPro}
          email={email}
        />
      </div>
    </div>
  );
}
