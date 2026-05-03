'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { SubscriptionContext, SubscriptionState, Plan } from '@/lib/subscription';

const STORAGE_KEY = 'pixvert_email';

export default function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>({
    isPro: false,
    plan: 'free',
    email: null,
    loading: true,
  });

  const verify = useCallback(async (email: string) => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.pro) {
        setState({ isPro: true, plan: data.plan as Plan, email, loading: false });
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setState({ isPro: false, plan: 'free', email: null, loading: false });
      }
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEY);
    if (!email) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    verify(email);
  }, [verify]);

  const activate = useCallback((email: string) => {
    localStorage.setItem(STORAGE_KEY, email);
    verify(email);
  }, [verify]);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ isPro: false, plan: 'free', email: null, loading: false });
  }, []);

  return (
    <SubscriptionContext.Provider value={{ ...state, activate, clear }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
