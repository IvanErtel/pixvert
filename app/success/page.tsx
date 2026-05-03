import { stripe } from '@/lib/stripe';
import SuccessClient from './SuccessClient';

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let plan: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items'],
      });
      email = session.customer_email;
      const priceId = session.line_items?.data[0]?.price?.id ?? null;
      plan = priceId === process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID ? 'business' : 'pro';
    } catch {
      // session_id invalid or expired — still show success
    }
  }

  return <SuccessClient email={email} plan={plan} />;
}
