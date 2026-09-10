/**
 * PAYMENT SERVICE
 * ─────────────────────────────────────────────────────────────
 * SECURITY: Never put secret keys here. Backend creates orders
 * and verifies signatures. Frontend only opens the gateway UI.
 *
 * Backend developer: implement the TODOs below.
 */
export const WORKSHOP_FEE = 699; // INR
const _BASE = import.meta.env.VITE_API_BASE ?? '';

/**
 * POST /api/payments/create-order
 * Returns: { orderId, amount, currency, keyId }
 * keyId is the PUBLIC key only — never the secret.
 */
export async function createPaymentOrder(_params) {
  // TODO:
  // const res = await fetch(`${BASE}/api/payments/create-order`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(params),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? 'Order creation failed');
  // return res.json(); // { orderId, amount, currency, keyId }
  await delay(1000);
  return { orderId: null, amount: WORKSHOP_FEE * 100, currency: 'INR', keyId: null };
}

/**
 * POST /api/payments/verify
 * Backend must verify HMAC-SHA256 signature — NEVER do this on frontend.
 * Returns: { verified, registrationId, message }
 */
export async function verifyPayment(_data) {
  // TODO:
  // const res = await fetch(`${BASE}/api/payments/verify`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? 'Verification failed');
  // return res.json(); // { verified, registrationId, message }
  await delay(800);
  return { 
    verified: true, 
    registrationId: 'ILLUM-' + Math.random().toString(36).substring(2, 8).toUpperCase(), 
    message: 'Payment verified successfully.' 
  };
}

const delay = ms => new Promise(r => setTimeout(r, ms));
