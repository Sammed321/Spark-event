import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { play } from 'cuelume';
import { api } from '../services/api';
import { WORKSHOP_FEE } from '../services/paymentService';
import { CheckCircle, AlertCircle, Loader2, Ticket, Sparkles, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import FluidOrb from '../components/ui/fluid-orb';
import { gsap } from '../utils/gsapAnimations';
import { useGsapFloatingOrbs } from '../utils/gsapAnimations';

const ALLOWED_EMAIL_DOMAINS = ['gmail.com', 'students.git.edu'];

function isAllowedEmailDomain(email) {
  if (!email) return false;
  const parts = email.trim().toLowerCase().split('@');
  return parts.length === 2 && ALLOWED_EMAIL_DOMAINS.includes(parts[1]);
}

export function RegisterPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const ticketRef = useRef(null);
  const formCardRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Form, 2: OTP & Summary, 3: Processing, 4: Success, 5: Error
  const [formData, setFormData] = useState({ name: '', usn: '', email: '', college: '', source: '' });
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  // Update title & scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Register | Illuminate Workshop '26";
  }, []);

  // Floating background orbs animation
  useGsapFloatingOrbs(containerRef);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

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
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = "Valid email is required";
    } else if (!isAllowedEmailDomain(formData.email)) {
      err.email = "Only personal Gmail (@gmail.com) and official college (@students.git.edu) email addresses are allowed";
    }
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

  const handleProceedToOtpAndSummary = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanEmail = formData.email.trim().toLowerCase();
    try {
      setSendingOtp(true);
      play('loading');
      await api.sendOtp(cleanEmail);
      setResendTimer(60);
      play('ready');
      setStep(2);
    } catch (err) {
      if (err.status === 409) {
        localStorage.setItem('spark_user_email', cleanEmail);
        navigate('/confirm-payment');
        return;
      }
      setErrors({ email: err.message || "Failed to send verification code. Please check your email." });
      play('error');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      await api.sendOtp(cleanEmail);
      setResendTimer(60);
      play('ready');
    } catch (err) {
      setErrorMsg(err.message || "Failed to resend code. Please wait a minute.");
    }
  };

  const handlePayment = async () => {
    if (!otp || !/^\d{6}$/.test(otp.trim())) {
      setErrorMsg("Please enter the valid 6-digit verification code sent to your email.");
      play('error');
      return;
    }

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
        otp: otp.trim(),
      };

      const res = await api.register(payload);
      if (res?.data?.access_token) {
        localStorage.setItem('spark_access_token', res.data.access_token);
      }
      localStorage.setItem('spark_user_email', cleanEmail);
      play('success');
      setStep(4);
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred while submitting registration.");
      setStep(5);
      play('error');
    }
  };

  return (
    <div ref={containerRef} style={{ background: '#05000e', minHeight: '100vh', minHeight: '100dvh', position: 'relative', overflowX: 'clip', width: '100%', touchAction: 'pan-y' }}>

      {/* Decorative Cyberpunk Background Orbs */}
      <div className="orb anim-pulse" style={{ width: 'min(650px, 90vw)', height: 'min(650px, 90vw)', top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div className="orb" style={{ width: 'min(550px, 80vw)', height: 'min(550px, 80vw)', bottom: '5%', right: '-8%', background: 'radial-gradient(circle, rgba(232,121,249,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img src="/kls-logo.png" alt="KLS" style={{ height: 32, width: 'auto' }} />
                <span className="font-grotesk" style={{ fontSize: 7.5, fontWeight: 600, color: '#c4b5fd', letterSpacing: '0.04em', lineHeight: 1 }}>Estd. 1939</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img src="/git-logo.png" alt="GIT" style={{ height: 32, width: 'auto' }} />
                <span className="font-grotesk" style={{ fontSize: 7.5, fontWeight: 600, color: '#c4b5fd', letterSpacing: '0.04em', lineHeight: 1 }}>Estd. 1979</span>
              </div>
            </div>
            <div style={{ width: 1, height: 26, background: 'rgba(167,139,250,0.3)' }} aria-hidden="true" />
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
                <form onSubmit={handleProceedToOtpAndSummary}>
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
                      <input className={`field-input ${errors.email ? 'error' : ''}`} type="email" name="email" placeholder="Email Address (@gmail.com or @students.git.edu)" value={formData.email} onChange={handleChange} />
                      <span style={{ fontSize: 11, color: 'rgba(196,181,253,0.5)', marginTop: 4, display: 'block' }}>
                        Allowed: Personal <strong>@gmail.com</strong> or College <strong>@students.git.edu</strong>
                      </span>
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
                      disabled={sendingOtp}
                      className="btn btn-primary btn-xl"
                      style={{ width: '100%', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      {sendingOtp ? (
                        <>
                          <Loader2 size={18} className="anim-spin-slow" />
                          <span>Sending Verification Code...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify Email & Proceed</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '4px 14px', marginBottom: 16 }}>
                    <ShieldCheck size={16} color="#34d399" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verification Code Sent</span>
                  </div>
                  <h3 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Verify Your Email</h3>
                  <p className="font-inter" style={{ fontSize: 14, color: 'rgba(196,181,253,0.7)', marginBottom: 24 }}>
                    We sent a 6-digit code to <strong style={{ color: '#e9d5ff' }}>{formData.email}</strong>
                  </p>

                  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 20, padding: 24, textAlign: 'left', marginBottom: 24 }}>
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#c4b5fd', marginBottom: 8 }}>
                        6-Digit Verification Code (OTP) *
                      </label>
                      <input
                        className="field-input"
                        type="text"
                        maxLength={6}
                        placeholder="e.g. 849201"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        style={{ letterSpacing: '0.25em', fontWeight: 700, fontSize: 22, textAlign: 'center' }}
                        autoFocus
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 12 }}>
                        <span style={{ color: 'rgba(196,181,253,0.5)' }}>Check inbox / spam</span>
                        <button
                          type="button"
                          disabled={resendTimer > 0}
                          onClick={handleResendOtp}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: resendTimer > 0 ? 'rgba(196,181,253,0.4)' : '#c084fc',
                            cursor: resendTimer > 0 ? 'default' : 'pointer',
                            fontWeight: 600,
                            padding: 0,
                          }}
                        >
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                        </button>
                      </div>
                    </div>

                    <div style={{ height: 1, background: 'rgba(139,92,246,0.2)', margin: '0 -24px 20px -24px' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Participant</span>
                      <span style={{ fontWeight: 600, color: '#ede9fe' }}>{formData.name} ({formData.usn})</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 13 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>College</span>
                      <span style={{ fontWeight: 600, color: '#ede9fe' }}>{formData.college}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-grotesk" style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>Total Fee</span>
                      <span className="font-syne grad-text" style={{ fontSize: 26, fontWeight: 700 }}>₹{WORKSHOP_FEE}</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div style={{ color: '#f87171', fontSize: 13, marginBottom: 18, background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 14 }}>
                    <button
                      className="btn btn-outline"
                      style={{ flex: 1, padding: '14px' }}
                      onClick={() => { play('release'); setErrorMsg(''); setStep(1); }}
                      data-cuelume-hover="tick"
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 2, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                      onClick={handlePayment}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      <span>Confirm & Register</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ textAlign: 'center', padding: '64px 0' }}>
                  <Loader2 size={56} className="anim-spin-slow" style={{ color: '#a855f7', margin: '0 auto 28px' }} />
                  <h3 className="font-syne" style={{ fontSize: 26, marginBottom: 14 }}>Submitting Registration</h3>
                  <p className="font-inter" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>Verifying your code and securing your slot...</p>
                </div>
              )}

              {step === 4 && (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 76,
                    height: 76,
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 30px rgba(16,185,129,0.25)',
                  }}>
                    <CheckCircle size={40} style={{ color: '#34d399' }} />
                  </div>

                  <h3 className="font-syne" style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 10 }}>
                    Registration Confirmed!
                  </h3>

                  <p className="font-inter" style={{ color: 'rgba(196,181,253,0.8)', fontSize: 15, lineHeight: 1.6, maxWidth: 420, margin: '0 auto 24px' }}>
                    Your registration has been verified and registered for: <br />
                    <strong style={{ color: '#e9d5ff', wordBreak: 'break-all' }}>{formData.email}</strong>
                  </p>

                  <div style={{
                    background: 'linear-gradient(145deg, rgba(124,58,237,0.12) 0%, rgba(88,28,135,0.08) 100%)',
                    border: '1px solid rgba(167,139,250,0.25)',
                    borderRadius: 20,
                    padding: 22,
                    textAlign: 'left',
                    marginBottom: 28,
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c084fc', marginBottom: 10 }}>
                      Next Steps to Claim Your Pass:
                    </div>
                    <ol style={{ margin: 0, paddingLeft: 18, color: '#c4b5fd', fontSize: 13, lineHeight: 1.8 }}>
                      <li>Proceed to payment page or scan the <strong>₹{WORKSHOP_FEE} UPI QR</strong>.</li>
                      <li>Complete transaction on GPay / PhonePe / Paytm.</li>
                      <li>Submit your 12-digit UTR to immediately download your Official Attendance QR Pass.</li>
                    </ol>
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', marginBottom: 12 }}
                    onClick={() => navigate('/confirm-payment')}
                    data-cuelume-hover="tick"
                    data-cuelume-press="press"
                  >
                    Proceed to Payment & Enter UTR →
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ width: '100%' }}
                    onClick={() => navigate('/')}
                    data-cuelume-hover="tick"
                  >
                    Return to Home
                  </button>
                </div>
              )}

              {step === 5 && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <AlertCircle size={72} style={{ color: '#f87171', margin: '0 auto 28px' }} />
                  <h3 className="font-syne" style={{ fontSize: 28, marginBottom: 16 }}>Registration Error</h3>
                  <p className="font-inter" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 36, fontSize: 15, lineHeight: 1.6 }}>{errorMsg}</p>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={() => { play('release'); setStep(1); }}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                    >
                      Try Again
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
