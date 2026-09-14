'use client';

import { createContext, useContext } from 'react';

export type Plan = 'free' | 'pro' | 'business';

export interface SubscriptionState {
  isPro: boolean;
  plan: Plan;
  email: string | null;
  loading: boolean;
}

export interface SubscriptionContextValue extends SubscriptionState {
  activate: (email: string, ownerToken?: string) => void;
  clear: () => void;
}

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  isPro: false,
  plan: 'free',
  email: null,
  loading: false,
  activate: () => {},
  clear: () => {},
});

export function useSubscription() {
  return useContext(SubscriptionContext);
}
