import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { verifyOwnerToken } from '@/lib/ownerToken';

export async function POST(req: NextRequest) {
  try {
    const { email, ownerToken } = await req.json();
    if (!email || typeof email !== 'string') return NextResponse.json({ pro: false });

    // Owner bypass — requires the signed token issued by /api/activate after
    // a correct PIN check, not just a matching email (see lib/ownerToken.ts).
    if (email.toLowerCase() === process.env.OWNER_EMAIL?.toLowerCase() && verifyOwnerToken(email, ownerToken)) {
      return NextResponse.json({ pro: true, plan: 'pro' });
    }

    const customers = await stripe.customers.list({ email: email.toLowerCase(), limit: 1 });
    if (customers.data.length === 0) return NextResponse.json({ pro: false });

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) return NextResponse.json({ pro: false });

    return NextResponse.json({ pro: true, plan: 'pro' });
  } catch {
    return NextResponse.json({ pro: false });
  }
}
