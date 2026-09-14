import { createHmac, timingSafeEqual } from 'crypto';

const HEX_RE = /^[0-9a-f]+$/i;

/**
 * The owner-bypass path in /api/verify must never trust a bare email match —
 * OWNER_EMAIL is documented in this repo's own CLAUDE.md, so anyone could set
 * localStorage.pixvert_email to it and get free Pro. This token is only
 * issued by /api/activate after the OWNER_PIN has been checked server-side,
 * so it proves the PIN was verified without storing the PIN itself client-side.
 */
export function signOwnerToken(email: string): string {
  return createHmac('sha256', process.env.OWNER_PIN ?? '').update(email.toLowerCase()).digest('hex');
}

export function verifyOwnerToken(email: string, token: unknown): boolean {
  if (typeof token !== 'string' || !HEX_RE.test(token) || !process.env.OWNER_PIN) return false;
  const expected = Buffer.from(signOwnerToken(email), 'hex');
  const actual = Buffer.from(token, 'hex');
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}
