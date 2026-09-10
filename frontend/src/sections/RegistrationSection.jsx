import { useState } from 'react';
import { submitRegistration } from '../services/registrationService';
import { createPaymentOrder, verifyPayment, WORKSHOP_FEE } from '../services/paymentService';
import { CheckCircle, AlertCircle, Loader2, Ticket, Sparkles } from 'lucide-react';

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
    <section id="register" className="section" style={{ background: '#05000e', position: 'relative' }}>
      {/* Decorative Orbs */}
      <div className="orb anim-pulse" style={{ width: 600, height: 600, bottom: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 60%)' }} aria-hidden="true" />
      <div className="orb" style={{ width: 500, height: 500, top: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 60%)' }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} /> Register
          </span>
          <h2 className="font-syne" style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
            Secure Your <span className="grad-text">Spot</span>
          </h2>
          <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.7)', maxWidth: 580, margin: '16px auto 0' }}>
            Cross-college participation is allowed. Minimum 70 participants required. 
            Join the movement of student entrepreneurs today.
          </p>
        </div>

        {/* Layout Grid */}
        <div style={{ display: 'grid', gap: 40 }} className="reg-grid">
          
          {/* Left: Beautiful Ticket / Value Prop */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(88,28,135,0.05) 100%)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: 32,
              padding: 48,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(167,139,250,0.05)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 480
            }} className="glass-spotlight ticket-card">
              
              {/* Holographic shimmer */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 25%, transparent 30%)', backgroundSize: '200% 100%', animation: 'shimmer 4s infinite linear', pointerEvents: 'none' }} />
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.2)', padding: '6px 14px', borderRadius: 20, marginBottom: 32, border: '1px solid rgba(167,139,250,0.3)' }}>
                  <Ticket size={16} color="#e879f9" />
                  <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 600, color: '#e879f9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Official Event Pass</span>
                </div>
                
                <h3 className="font-syne" style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                  Illuminate <br /><span className="grad-text">Workshop '26</span>
                </h3>
                
                <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,0.7)', lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
                  A full-day immersive experience giving you the tools, mindset, and certification to build your own venture.
                </p>
              </div>

              {/* Ticket perforated tear line */}
              <div className="ticket-tear" style={{ borderTop: '2px dashed rgba(167,139,250,0.3)', margin: '0 -48px 32px -48px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -16, left: -16, width: 32, height: 32, borderRadius: '50%', background: '#05000e', borderRight: '2px solid rgba(167,139,250,0.3)' }} />
                <div style={{ position: 'absolute', top: -16, right: -16, width: 32, height: 32, borderRadius: '50%', background: '#05000e', borderLeft: '2px solid rgba(167,139,250,0.3)' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div className="font-grotesk" style={{ fontSize: 12, color: 'rgba(196,181,253,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Venue</div>
                  <div className="font-inter" style={{ fontWeight: 600, color: '#e9d5ff', fontSize: 15 }}>TBA / On-Campus</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-grotesk" style={{ fontSize: 12, color: 'rgba(196,181,253,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Fee per student</div>
                  <div className="font-syne grad-text" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>₹{WORKSHOP_FEE}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="glass-strong neon-card" style={{ padding: '48px', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {step === 1 && (
              <form onSubmit={handleProceedToSummary}>
                <div style={{ marginBottom: 32 }}>
                  <h3 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Participant Details</h3>
                  <p className="font-inter" style={{ fontSize: 14, color: 'rgba(196,181,253,0.6)' }}>Fill in your info to reserve your ticket.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <input className={`field-input ${errors.name ? 'error' : ''}`} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                    {errors.name && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
                  </div>
                  <div>
                    <input className={`field-input ${errors.usn ? 'error' : ''}`} type="text" name="usn" placeholder="USN / Roll Number" value={formData.usn} onChange={handleChange} />
                    {errors.usn && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.usn}</div>}
                  </div>
                  <div>
                    <input className={`field-input ${errors.email ? 'error' : ''}`} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                    {errors.email && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.email}</div>}
                  </div>
                  <div>
                    <input className={`field-input ${errors.college ? 'error' : ''}`} type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} />
                    {errors.college && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.college}</div>}
                  </div>
                  <div>
                    <select className={`field-input ${errors.source ? 'error' : ''}`} name="source" value={formData.source} onChange={handleChange} style={{ color: formData.source ? '#ede9fe' : 'rgba(196,181,253,.35)' }}>
                      <option value="" disabled>How did you hear about us?</option>
                      <option value="College">College</option>
                      <option value="Friend">Friend</option>
                      <option value="Social Media">Social Media</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.source && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.source}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary btn-xl" style={{ width: '100%', marginTop: 24 }}>
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div style={{ textAlign: 'center' }}>
                <h3 className="font-syne" style={{ fontSize: 26, marginBottom: 24 }}>Order Summary</h3>
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 20, padding: 28, textAlign: 'left', marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Event</span>
                    <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>Illuminate Workshop</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Participant</span>
                    <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>{formData.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                    <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>College</span>
                    <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>{formData.college}</span>
                  </div>
                  <div style={{ height: 1, background: 'rgba(139,92,246,0.2)', margin: '0 -28px 24px -28px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-grotesk" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>Total Fee</span>
                    <span className="font-syne grad-text" style={{ fontSize: 28, fontWeight: 700 }}>₹{WORKSHOP_FEE}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button className="btn btn-outline" style={{ flex: 1, padding: '16px' }} onClick={() => setStep(1)}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 2, padding: '16px' }} onClick={handlePayment}>Pay & Register</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <Loader2 size={56} className="anim-spin-slow" style={{ color: '#a855f7', margin: '0 auto 28px' }} />
                <h3 className="font-syne" style={{ fontSize: 26, marginBottom: 14 }}>Processing Payment</h3>
                <p className="font-inter" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Please do not refresh the page or click back.</p>
              </div>
            )}

            {step === 4 && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CheckCircle size={72} style={{ color: '#34d399', margin: '0 auto 28px' }} />
                <h3 className="font-syne" style={{ fontSize: 32, marginBottom: 16 }}>You're In!</h3>
                <p className="font-inter" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 36, fontSize: 16 }}>Welcome to Illuminate, {formData.name}!</p>
                
                <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: 28, textAlign: 'left', marginBottom: 36 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className="font-inter" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Registration ID:</span>
                    <span className="font-grotesk" style={{ fontWeight: 700, color: '#e879f9', letterSpacing: '0.05em' }}>{paymentDetails?.registrationId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="font-inter" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Status:</span>
                    <span className="font-inter" style={{ fontWeight: 600, color: '#34d399' }}>Paid Successfully (₹{WORKSHOP_FEE})</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-xl" style={{ width: '100%' }} onClick={() => window.location.href = '/'}>Back to Home</button>
              </div>
            )}

            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <AlertCircle size={72} style={{ color: '#f87171', margin: '0 auto 28px' }} />
                <h3 className="font-syne" style={{ fontSize: 28, marginBottom: 16 }}>Payment Failed</h3>
                <p className="font-inter" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 36, fontSize: 15, lineHeight: 1.6 }}>{errorMsg}</p>
                <button className="btn btn-primary btn-xl" style={{ width: '100%' }} onClick={() => setStep(2)}>Try Again</button>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        .reg-grid { grid-template-columns: 1fr 1.1fr; }
        @media (max-width: 960px) {
          .reg-grid { grid-template-columns: 1fr; gap: 32px; }
          .reg-grid > div:first-child { max-width: 500px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 580px) {
          .glass-strong.neon-card { padding: 32px 20px !important; border-radius: 24px !important; }
          .ticket-card { padding: 32px 20px !important; border-radius: 24px !important; }
          .ticket-tear { margin: 0 -20px 24px -20px !important; }
        }
      `}</style>
    </section>
  );
}
