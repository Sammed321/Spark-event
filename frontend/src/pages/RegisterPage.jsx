import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { play } from 'cuelume';
import { api } from '../services/api';
import { WORKSHOP_FEE } from '../services/paymentService';
import { CheckCircle, AlertCircle, Loader2, Ticket, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import FluidOrb from '../components/ui/fluid-orb';
import { gsap } from '../utils/gsapAnimations';
import { useGsapFloatingOrbs } from '../utils/gsapAnimations';

export function RegisterPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const ticketRef = useRef(null);
  const formCardRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Form, 2: Summary, 3: Processing, 5: Error
  const [formData, setFormData] = useState({ name: '', usn: '', email: '', college: '', source: '' });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  // Update title & scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Register | Illuminate Workshop '26";
  }, []);

  // Floating background orbs animation
  useGsapFloatingOrbs(containerRef);

  // GSAP Cyberpunk entrance reveal for ticket and form
  useEffect(() => {
    if (!ticketRef.current || !formCardRef.current) return;

    gsap.fromTo(
      [ticketRef.current, formCardRef.current],
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );
  }, []);

  const validate = () => {
    let err = {};
    if (!formData.name.trim()) err.name = "Name is required (2-100 characters)";
    if (!formData.usn.trim()) err.usn = "USN / Roll Number is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) err.email = "Valid email is required";
    if (!formData.college.trim()) err.college = "College name is required";
    if (!formData.source) err.source = "Please select how you heard about us";
    setErrors(err);
    const isValid = Object.keys(err).length === 0;
    if (!isValid) {
      play('error');
    }
    return isValid;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProceedToSummary = (e) => {
    e.preventDefault();
    if (validate()) {
      play('ready');
      setStep(2);
    }
  };

  const handlePayment = async () => {
    setStep(3); // Processing
    play('loading');
    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const mapSource = (val) => {
        const s = (val || '').toLowerCase();
        if (s.includes('insta') || s.includes('social') || s.includes('whats') || s.includes('spark')) return 'SPARK socials';
        if (s.includes('college')) return 'college notice';
        if (s.includes('friend')) return 'friend';
        if (s.includes('iit') || s.includes('cell')) return 'IITB E-Cell';
        return 'other';
      };

      const payload = {
        name: formData.name.trim(),
        usn: formData.usn.trim(),
        email: cleanEmail,
        college: formData.college.trim(),
        heard_via: mapSource(formData.source),
      };

      try {
        await api.register(payload);
      } catch (regErr) {
        // If conflict 409 (already registered), permit proceeding to enter UTR
        if (regErr.status !== 409) {
          throw regErr;
        }
      }

      localStorage.setItem('spark_user_email', cleanEmail);
      play('success');

      // Navigate to the payment confirmation & UTR entry page
      navigate(`/confirm-payment?email=${encodeURIComponent(cleanEmail)}`);
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred while submitting registration.");
      setStep(5);
      play('error');
    }
  };

  return (
    <div ref={containerRef} style={{ background: '#05000e', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Decorative Cyberpunk Background Orbs */}
      <div className="orb anim-pulse" style={{ width: 650, height: 650, top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="orb" style={{ width: 550, height: 550, bottom: '5%', right: '-8%', background: 'radial-gradient(circle, rgba(232,121,249,0.14) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,0,16,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          
          {/* Brand Logos */}
          <div
            onClick={() => navigate('/')}
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/kls-logo.png" alt="KLS" style={{ height: 36, width: 'auto' }} />
              <img src="/git-logo.png" alt="GIT" style={{ height: 36, width: 'auto' }} />
            </div>
            <div style={{ width: 1, height: 24, background: 'rgba(167,139,250,0.3)' }} aria-hidden="true" />
            <img src="/logo2.png" alt="Illuminate" style={{ height: 40, width: 'auto' }} />
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate('/')}
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(167,139,250,0.35)',
              borderRadius: 12,
              padding: '8px 18px',
              color: '#e9d5ff',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.3)';
              e.currentTarget.style.borderColor = '#c084fc';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
              e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Registration Content */}
      <main style={{ padding: '64px 0 96px', position: 'relative', zIndex: 2 }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={14} /> Workshop Registration
            </span>
            <h1 className="font-syne" style={{ fontSize: 'clamp(36px,5vw,54px)', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
              Claim Your <span className="grad-text">Event Pass</span>
            </h1>
            <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.7)', maxWidth: 580, margin: '16px auto 0' }}>
              Fill in your participant details below to generate your official workshop ticket and confirm your slot.
            </p>
          </div>

          {/* Grid: Ticket Card + Registration Form */}
          <div style={{ display: 'grid', gap: 40 }} className="reg-grid">
            
            {/* Left: Cyberpunk Holographic Ticket */}
            <div ref={ticketRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.14) 0%, rgba(88,28,135,0.06) 100%)',
                border: '1px solid rgba(167,139,250,0.35)',
                borderRadius: 32,
                padding: 48,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(167,139,250,0.06)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 480
              }} className="glass-spotlight ticket-card">
                
                {/* Holographic shimmer */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 25%, transparent 30%)', backgroundSize: '200% 100%', animation: 'shimmer 4s infinite linear', pointerEvents: 'none' }} />
                
                {/* Fluid Orb decoration */}
                <div style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'none', opacity: 0.5, zIndex: 1 }} aria-hidden="true">
                  <FluidOrb size={140} color="#c084fc" />
                </div>

                <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.25)', padding: '6px 14px', borderRadius: 20, marginBottom: 32, border: '1px solid rgba(167,139,250,0.35)' }}>
                    <Ticket size={16} color="#e879f9" />
                    <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 600, color: '#e879f9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Official Event Pass</span>
                  </div>
                  
                  <h2 className="font-syne" style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                    Illuminate <br /><span className="grad-text">Workshop '26</span>
                  </h2>
                  
                  <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,0.7)', lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
                    Certified by Entrepreneurship Cell, IIT Bombay. Hands-on venture building, Startup Kit, and Coordinator awards.
                  </p>
                </div>

                {/* Ticket tear line */}
                <div className="ticket-tear" style={{ borderTop: '2px dashed rgba(167,139,250,0.35)', margin: '0 -48px 32px -48px', position: 'relative', zIndex: 2 }}>
                  <div style={{ position: 'absolute', top: -16, left: -16, width: 32, height: 32, borderRadius: '50%', background: '#05000e', borderRight: '2px solid rgba(167,139,250,0.35)' }} />
                  <div style={{ position: 'absolute', top: -16, right: -16, width: 32, height: 32, borderRadius: '50%', background: '#05000e', borderLeft: '2px solid rgba(167,139,250,0.35)' }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
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

            {/* Right: Registration Multi-Step Form */}
            <div ref={formCardRef} className="glass-strong neon-card" style={{ padding: '48px', borderRadius: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
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
                        <option value="SPARK socials">Instagram / Social Media</option>
                        <option value="college notice">College Notice</option>
                        <option value="friend">Friend / Peer</option>
                        <option value="IITB E-Cell">IITB E-Cell</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.source && <div style={{ color: '#f87171', fontSize: 12, marginTop: 6 }}>{errors.source}</div>}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-xl"
                      style={{ width: '100%', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div style={{ textAlign: 'center' }}>
                  <h3 className="font-syne" style={{ fontSize: 26, marginBottom: 24 }}>Review Details</h3>
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 20, padding: 28, textAlign: 'left', marginBottom: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Event</span>
                      <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>Illuminate Workshop</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Participant</span>
                      <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>{formData.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span className="font-inter" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>USN</span>
                      <span className="font-inter" style={{ fontWeight: 600, fontSize: 15 }}>{formData.usn}</span>
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
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, padding: '16px' }}
                      onClick={() => { play('release'); setStep(1); }}
                      data-cuelume-hover="tick"
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 2, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                      onClick={handlePayment}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ textAlign: 'center', padding: '64px 0' }}>
                  <Loader2 size={56} className="anim-spin-slow" style={{ color: '#a855f7', margin: '0 auto 28px' }} />
                  <h3 className="font-syne" style={{ fontSize: 26, marginBottom: 14 }}>Submitting Registration</h3>
                  <p className="font-inter" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Directing you to the Payment & UTR Confirmation page...</p>
                </div>
              )}

              {step === 5 && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <AlertCircle size={72} style={{ color: '#f87171', margin: '0 auto 28px' }} />
                  <h3 className="font-syne" style={{ fontSize: 28, marginBottom: 16 }}>Registration Error</h3>
                  <p className="font-inter" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 36, fontSize: 15, lineHeight: 1.6 }}>{errorMsg}</p>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1 }}
                      onClick={() => { play('release'); setStep(1); }}
                      data-cuelume-hover="tick"
                    >
                      Edit Info
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => navigate(`/confirm-payment?email=${encodeURIComponent(formData.email)}`)}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      Enter UTR Directly
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
}
export default RegisterPage;
