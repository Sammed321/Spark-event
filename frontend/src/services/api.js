/**
 * SPARK x IITB E-Cell API Service
 */
const API_BASE = import.meta.env?.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const errorMsg = (data?.errors && data.errors.join(' ')) || data?.message || `HTTP ${res.status}`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.response = data;
      throw err;
    }

    return data;
  } catch (err) {
    if (!err.status && err.name === 'TypeError') {
      err.message = 'Unable to connect to backend server. Please verify network or API URL.';
    }
    throw err;
  }
}

export const api = {
  // Check backend health
  checkHealth: () => request('/health', { method: 'GET' }),

  // Get active pricing and payment details
  getPaymentInfo: () => request('/payment/info', { method: 'GET' }),

  // Request 6-digit email OTP
  sendOtp: (email) => request('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

  // Register participant with verified OTP
  register: (payload) => request('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  // Submit 12-digit UTR
  submitUtr: ({ email, utr }) => request('/payment/submit-utr', {
    method: 'POST',
    body: JSON.stringify({ email, utr }),
  }),

  // Lookup status and attendance code/QR by email or ID
  getStatus: (identifier, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return request(`/registrations/${encodeURIComponent(identifier.trim())}`, {
      method: 'GET',
      headers,
    });
  },
};
