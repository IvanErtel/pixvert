'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSubscription } from '@/lib/subscription';

interface SuccessClientProps {
  email: string | null;
  plan: string | null;
}

export default function SuccessClient({ email, plan }: SuccessClientProps) {
  const { activate } = useSubscription();

  useEffect(() => {
    if (email) activate(email);
  }, [email, activate]);

  const isPro = plan === 'pro' || plan === 'business';

  return (
    <div className="max-w-md mx-auto w-full px-4 py-24 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
        ✨ {plan === 'business' ? 'Business' : 'Pro'} Active
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        {isPro ? 'Welcome to Pro!' : 'Payment confirmed!'}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-2">
        Unlimited conversions, all formats, no daily limits.
      </p>
      {email && (
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
          Subscription linked to <span className="font-medium text-slate-600 dark:text-slate-300">{email}</span>
        </p>
      )}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] text-white font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
        Start Converting
      </Link>
    </div>
  );
}
