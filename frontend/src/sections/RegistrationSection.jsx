import { useState } from 'react';
import { submitRegistration } from '../services/registrationService';
import { createPaymentOrder, verifyPayment, WORKSHOP_FEE } from '../services/paymentService';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function RegistrationSection() {
  const [step, setStep] = useState(1); // 1: Form, 2: Summary, 3: Processing, 4: Success, 5: Error
  const [formData, setFormData] = useState({ name: '', usn: '', email: '', college: '', source: '' });
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    let err = {};
    if (!formData.name) err.name = "Name is required";
    if (!formData.usn) err.usn = "USN is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) err.email = "Valid email is required";
    if (!formData.college) err.college = "College is required";
    if (!formData.source) err.source = "Source is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProceedToSummary = (e) => {
    e.preventDefault();
    if (validate()) setStep(2);
  };

  const handlePayment = async () => {
    setStep(3); // Processing
    try {
      // 1. Backend submits registration
      const regRes = await submitRegistration(formData);
      
      // 2. Create Payment Order
      const order = await createPaymentOrder({ registrationId: regRes.registrationId, amount: WORKSHOP_FEE });
      
      // 3. Verify Payment
      const verifyRes = await verifyPayment({ orderId: order.orderId, registrationId: regRes.registrationId });
      
      if (verifyRes.verified) {
        setPaymentDetails(verifyRes);
        setStep(4); // Success
      } else {
        setErrorMsg(verifyRes.message || "Payment verification failed.");
        setStep(5); // Error
      }
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred.");
      setStep(5);
    }
  };

  return (
    <section id="register" className="section" style={{ background: '#080016', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Register</span>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#fff' }}>
            Secure Your <span className="grad-text">Spot</span>
          </h2>
          <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.65)', marginTop: 16 }}>
            Cross-college participation is allowed. Minimum 70 participants.
          </p>
        </div>

        <div className="glass-strong" style={{ padding: '40px', borderRadius: '24px' }}>
          
          {step === 1 && (
            <form onSubmit={handleProceedToSummary}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <input className={`field-input ${errors.name ? 'error' : ''}`} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                  {errors.name && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
                </div>
                <div>
                  <input className={`field-input ${errors.usn ? 'error' : ''}`} type="text" name="usn" placeholder="USN" value={formData.usn} onChange={handleChange} />
                  {errors.usn && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.usn}</div>}
                </div>
                <div>
                  <input className={`field-input ${errors.email ? 'error' : ''}`} type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} />
                  {errors.email && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
                </div>
                <div>
                  <input className={`field-input ${errors.college ? 'error' : ''}`} type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} />
                  {errors.college && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.college}</div>}
                </div>
                <div>
                  <select className={`field-input ${errors.source ? 'error' : ''}`} name="source" value={formData.source} onChange={handleChange}>
                    <option value="" disabled>How did you get to know about this event?</option>
                    <option value="College">College</option>
                    <option value="Friend">Friend</option>
                    <option value="Social Media">Social Media</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.source && <div style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.source}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-xl" style={{ width: '100%', marginTop: 16 }}>
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center' }}>
              <h3 className="font-syne" style={{ fontSize: 24, marginBottom: 24 }}>Order Summary</h3>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, textAlign: 'left', marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Event:</span>
                  <span style={{ fontWeight: 600 }}>Illuminate Workshop</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Participant:</span>
                  <span style={{ fontWeight: 600 }}>{formData.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>College:</span>
                  <span style={{ fontWeight: 600 }}>{formData.college}</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 -24px 24px -24px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700 }}>
                  <span>Total Fee:</span>
                  <span className="grad-text">₹{WORKSHOP_FEE}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={handlePayment}>Proceed to Payment</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Loader2 size={48} className="anim-spin-slow" style={{ color: '#a78bfa', margin: '0 auto 24px' }} />
              <h3 className="font-syne" style={{ fontSize: 24, marginBottom: 12 }}>Processing Payment</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>Please do not refresh the page.</p>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={64} style={{ color: '#34d399', margin: '0 auto 24px' }} />
              <h3 className="font-syne" style={{ fontSize: 28, marginBottom: 16 }}>Registration Successful</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>Welcome to Illuminate, {formData.name}!</p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 24, textAlign: 'left', marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Registration ID:</span>
                  <span style={{ fontWeight: 700, color: '#e879f9' }}>{paymentDetails?.registrationId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Status:</span>
                  <span style={{ fontWeight: 600, color: '#34d399' }}>Paid (₹{WORKSHOP_FEE})</span>
                </div>
              </div>
              <button className="btn btn-primary btn-xl" style={{ width: '100%' }} onClick={() => window.location.href = '/'}>Back to Home</button>
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <AlertCircle size={64} style={{ color: '#f87171', margin: '0 auto 24px' }} />
              <h3 className="font-syne" style={{ fontSize: 24, marginBottom: 16 }}>Payment Failed</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>{errorMsg}</p>
              <button className="btn btn-primary btn-xl" onClick={() => setStep(2)}>Try Again</button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
