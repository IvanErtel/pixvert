'use client';

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { SubscriptionContext, SubscriptionState, Plan } from '@/lib/subscription';

const STORAGE_KEY = 'pixvert_email';
const TOKEN_KEY = 'pixvert_owner_token';

export default function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>({
    isPro: false,
    plan: 'free',
    email: null,
    loading: true,
  });

  const verify = useCallback(async (email: string) => {
    try {
      const ownerToken = localStorage.getItem(TOKEN_KEY) ?? undefined;
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ownerToken }),
      });
      const data = await res.json();
      if (data.pro) {
        setState({ isPro: true, plan: data.plan as Plan, email, loading: false });
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
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

  const activate = useCallback((email: string, ownerToken?: string) => {
    localStorage.setItem(STORAGE_KEY, email);
    if (ownerToken) {
      localStorage.setItem(TOKEN_KEY, ownerToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    verify(email);
  }, [verify]);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setState({ isPro: false, plan: 'free', email: null, loading: false });
  }, []);

  return (
    <SubscriptionContext.Provider value={{ ...state, activate, clear }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
