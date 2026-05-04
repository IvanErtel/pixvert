import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { email, pin } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'invalid_email' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail === process.env.OWNER_EMAIL?.toLowerCase()) {
      if (!pin) {
        return NextResponse.json({ success: false, pin_required: true });
      }
      if (pin !== process.env.OWNER_PIN) {
        return NextResponse.json({ success: false, error: 'invalid_pin' });
      }
      return NextResponse.json({ success: true, plan: 'pro' });
    }

    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json({ success: false, error: 'no_subscription' });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ success: false, error: 'no_subscription' });
    }

    return NextResponse.json({ success: true, plan: 'pro' });
  } catch {
    return NextResponse.json({ success: false, error: 'server_error' });
  }
}
