/**
 * REGISTRATION SERVICE
 * ─────────────────────────────────────────────────────────────
 * All registration API calls live here.
 * Backend developer: implement the TODOs below.
 * Set VITE_API_BASE in .env:  VITE_API_BASE=https://api.your-backend.com
 */
const _BASE = import.meta.env.VITE_API_BASE ?? '';

/** POST /api/registrations  →  { success, registrationId, message } */
export async function submitRegistration(_data) {
  // TODO: replace with real API call
  // const res = await fetch(`${BASE}/api/registrations`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error((await res.json()).message ?? 'Registration failed');
  // return res.json();
  await delay(700);
  return { success: true, registrationId: null, message: 'Details received.' };
}

const delay = ms => new Promise(r => setTimeout(r, ms));
