import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { play } from 'cuelume';
import { 
  ArrowLeft, 
  CheckCircle, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  ExternalLink,
  Receipt
} from 'lucide-react';
import { api } from '../services/api';
import { useGsapFloatingOrbs, gsap } from '../utils/gsapAnimations';

export function ConfirmPaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageRef = useRef(null);
  const cardRef = useRef(null);

  const emailParam = searchParams.get('email');

  useEffect(() => {
    // Prevent direct access from website/URL bar without valid registration reroute
    if (!emailParam || !emailParam.trim()) {
      navigate('/register', { replace: true });
    }
  }, [emailParam, navigate]);

  const [email, setEmail] = useState(emailParam || '');
  const [utr, setUtr] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    upi_vpa: 'spark.ecell@upi',
    upi_payee_name: 'SPARK Club',
    amount_rupees: '699.00',
    upi_link: 'upi://pay?pa=spark.ecell%40upi&pn=SPARK%20Club&am=699.00&cu=INR',
    custom_qr_url: '/payment-qr.jpeg',
  });

  useGsapFloatingOrbs(pageRef);

  // Load payment config and optionally check if user already has an attendance pass
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Confirm Payment & Attendance Pass | SPARK × IITB E-Cell";

    // Fetch dynamic payment info from backend if online
    api.getPaymentInfo().then(res => {
      if (res?.data) setPaymentInfo(prev => ({ ...prev, ...res.data }));
    }).catch(() => {});

    // If email provided, check if user already has attendance code
    if (emailParam) {
      api.getStatus(emailParam).then(res => {
        if (res?.data?.attendance_code && res?.data?.attendance_qr_data_url) {
          setAttendanceData({
            name: res.data.name,
            email: res.data.email,
            usn: res.data.usn,
            college: res.data.college,
            utr: res.data.utr,
            attendance_code: res.data.attendance_code,
            attendance_qr_data_url: res.data.attendance_qr_data_url,
          });
        }
      }).catch(() => {});
    }
  }, [emailParam]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [attendanceData]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(paymentInfo.upi_vpa);
    setCopiedUpi(true);
    play('sparkle');
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAttendanceCode = () => {
    if (attendanceData?.attendance_code) {
      navigator.clipboard.writeText(attendanceData.attendance_code);
      setCopiedCode(true);
      play('sparkle');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadQr = () => {
    if (!attendanceData?.attendance_qr_data_url) return;
    const link = document.createElement('a');
    link.href = attendanceData.attendance_qr_data_url;
    link.download = `SPARK-Attendance-Pass-${attendanceData.attendance_code || 'QR'}.png`;
    link.click();
    play('success');
  };

  const handleSubmitUtr = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanUtr = utr.trim().toUpperCase();

    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      setErrorMsg('Please provide a valid registered email address.');
      play('error');
      return;
    }

    if (!cleanUtr || cleanUtr.length < 6) {
      setErrorMsg('Please enter a valid 12-digit UTR / UPI Transaction Reference number.');
      play('error');
      return;
    }

    try {
      setLoading(true);
      play('loading');

      const res = await api.submitUtr({ email: cleanEmail, utr: cleanUtr });

      if (res?.success && res?.data) {
        localStorage.setItem('spark_user_email', cleanEmail);
        play('success');

        // Fetch participant full details for the ticket pass
        let attendeeDetails = {};
        try {
          const profile = await api.getStatus(cleanEmail);
          attendeeDetails = profile?.data || {};
        } catch (_) {}

        setAttendanceData({
          name: attendeeDetails.name || 'Participant',
          email: cleanEmail,
          usn: attendeeDetails.usn || '',
          college: attendeeDetails.college || '',
          utr: cleanUtr,
          attendance_code: res.data.attendance_code,
          attendance_qr_data_url: res.data.attendance_qr_data_url,
        });
      } else {
        throw new Error(res?.message || 'Failed to record UTR.');
      }
    } catch (err) {
      play('error');
      setErrorMsg(err.message || 'An error occurred while logging your payment UTR.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={pageRef} style={{ background: '#05000e', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Orbs */}
      <div className="orb anim-pulse" style={{ width: 650, height: 650, top: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="orb" style={{ width: 550, height: 550, bottom: '0%', left: '-10%', background: 'radial-gradient(circle, rgba(232,121,249,0.12) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      {/* Top Navbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,0,16,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
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
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ padding: '64px 0 96px', position: 'relative', zIndex: 2 }}>
        <div className="container">

          {/* If Attendance Pass Generated: Show Pass */}
          {attendanceData ? (
            <div ref={cardRef} style={{ maxWidth: 680, margin: '0 auto' }}>
              
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 20px', color: '#34d399',
                  boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                }}>
                  <CheckCircle size={40} />
                </div>
                <h1 className="font-syne" style={{ fontSize: 'clamp(32px, 4.5vw, 46px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                  Attendance Pass <span className="grad-text">Generated!</span>
                </h1>
                <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,0.75)', maxWidth: 520, margin: '0 auto' }}>
                  Your UTR has been logged. Present your official Attendance QR Code at the registration desk for check-in.
                </p>
              </div>

              {/* Attendance Pass Holographic Card */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.16) 0%, rgba(20,5,45,0.85) 100%)',
                border: '1px solid rgba(167,139,250,0.4)',
                borderRadius: 32,
                padding: 'clamp(32px, 5vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.6), inset 0 0 24px rgba(167,139,250,0.1)',
                textAlign: 'center',
              }} className="glass-spotlight">
                
                {/* Holographic shimmer */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 25%, transparent 30%)', backgroundSize: '200% 100%', animation: 'shimmer 4s infinite linear', pointerEvents: 'none' }} />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', padding: '6px 16px', borderRadius: 20, marginBottom: 28 }}>
                  <ShieldCheck size={16} color="#34d399" />
                  <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 700, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Seat Reserved &bull; UTR Logged
                  </span>
                </div>

                {/* The Unique Attendance QR Code */}
                {attendanceData.attendance_qr_data_url && (
                  <div style={{ margin: '0 auto 24px', display: 'inline-block' }}>
                    <div style={{
                      background: '#ffffff',
                      padding: 16,
                      borderRadius: 20,
                      boxShadow: '0 10px 36px rgba(0,0,0,0.6)',
                      display: 'inline-block',
                    }}>
                      <img
                        src={attendanceData.attendance_qr_data_url}
                        alt="Attendance QR Code"
                        style={{ width: 230, height: 230, display: 'block', borderRadius: 10 }}
                      />
                    </div>
                  </div>
                )}

                {/* Unique Attendance Code */}
                <div style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(167,139,250,0.25)',
                  borderRadius: 16,
                  padding: '16px 20px',
                  maxWidth: 420,
                  margin: '0 auto 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa', fontWeight: 600 }}>
                      Unique Attendance Code
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#e879f9', letterSpacing: '0.08em', fontFamily: 'monospace', marginTop: 4 }}>
                      {attendanceData.attendance_code}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAttendanceCode}
                    data-cuelume-hover="tick"
                    data-cuelume-press="press"
                    style={{
                      background: copiedCode ? 'rgba(16,185,129,0.2)' : 'rgba(124,58,237,0.25)',
                      border: '1px solid rgba(167,139,250,0.3)',
                      borderRadius: 10,
                      padding: '8px 14px',
                      color: copiedCode ? '#34d399' : '#e9d5ff',
                      cursor: 'pointer',
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Participant Details Table */}
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: 18,
                  padding: '20px 24px',
                  textAlign: 'left',
                  fontSize: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginBottom: 28,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(196,181,253,0.6)' }}>Participant:</span>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{attendanceData.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(196,181,253,0.6)' }}>Email:</span>
                    <span style={{ fontWeight: 500, color: '#e9d5ff' }}>{attendanceData.email}</span>
                  </div>
                  {attendanceData.usn && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(196,181,253,0.6)' }}>USN / Roll No:</span>
                      <span style={{ fontWeight: 500, color: '#e9d5ff' }}>{attendanceData.usn}</span>
                    </div>
                  )}
                  {attendanceData.utr && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'rgba(196,181,253,0.6)' }}>UTR Reference:</span>
                      <span style={{ fontWeight: 600, color: '#a78bfa', fontFamily: 'monospace' }}>{attendanceData.utr}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {attendanceData.attendance_qr_data_url && (
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleDownloadQr}
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      <Download size={18} />
                      <span>Download QR Pass</span>
                    </button>
                  )}
                  <button
                    className="btn btn-outline btn-lg"
                    onClick={() => navigate('/')}
                    data-cuelume-hover="tick"
                    data-cuelume-press="press"
                  >
                    Back to Home
                  </button>
                </div>

                <p style={{ fontSize: 13, color: 'rgba(196,181,253,0.5)', marginTop: 24 }}>
                  ✓ A copy of your Attendance QR Code and Pass has also been dispatched to your email address.
                </p>
              </div>

            </div>
          ) : (
            /* State A: Payment Info & UTR Entry Form */
            <div ref={cardRef}>
              
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} /> Step 2: Payment Confirmation
                </span>
                <h1 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
                  Enter UTR for <span className="grad-text">Confirmation</span>
                </h1>
                <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.7)', maxWidth: 580, margin: '16px auto 0' }}>
                  Pay ₹{paymentInfo.amount_rupees} using the UPI QR code sent to your email or the UPI ID below. Then enter your 12-digit UPI reference (UTR) to confirm your registration.
                </p>
              </div>

              <div style={{ display: 'grid', gap: 40 }} className="confirm-grid">
                
                {/* Left: Payment Summary & Payee Details (NO QR CODE ON WEBSITE) */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(124,58,237,0.14) 0%, rgba(88,28,135,0.06) 100%)',
                  border: '1px solid rgba(167,139,250,0.35)',
                  borderRadius: 32,
                  padding: 'clamp(32px, 5vw, 48px)',
                  textAlign: 'center',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} className="glass-spotlight">
                  
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.25)', padding: '6px 14px', borderRadius: 20, marginBottom: 24, border: '1px solid rgba(167,139,250,0.35)' }}>
                    <Receipt size={16} color="#e879f9" />
                    <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 600, color: '#e879f9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Payment Summary</span>
                  </div>

                  <div className="font-grotesk" style={{ fontSize: 13, color: 'rgba(196,181,253,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Workshop Fee
                  </div>
                  <div className="font-syne grad-text" style={{ fontSize: 44, fontWeight: 800, marginBottom: 20 }}>
                    ₹{paymentInfo.amount_rupees}
                  </div>

                  {/* UPI VPA Copy box */}
                  <div style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(167,139,250,0.25)',
                    borderRadius: 16,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 20,
                    maxWidth: 320,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a78bfa', fontWeight: 600 }}>UPI ID (VPA)</div>
                      <div className="font-inter" style={{ fontSize: 14, color: '#e9d5ff', fontWeight: 600, fontFamily: 'monospace', marginTop: 2 }}>
                        {paymentInfo.upi_vpa}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyUpi}
                      data-cuelume-hover="tick"
                      data-cuelume-press="press"
                      style={{
                        background: copiedUpi ? 'rgba(16,185,129,0.2)' : 'rgba(124,58,237,0.3)',
                        border: 'none',
                        color: copiedUpi ? '#34d399' : '#e9d5ff',
                        borderRadius: 8,
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Mobile Deep Link */}
                  {paymentInfo.upi_link && (
                    <a
                      href={paymentInfo.upi_link}
                      className="btn btn-outline"
                      data-cuelume-hover="tick"
                      data-cuelume-press="pulse"
                      style={{ width: '100%', maxWidth: 320, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}
                    >
                      <span>Pay via UPI App (Mobile)</span>
                      <ExternalLink size={15} />
                    </a>
                  )}

                  <div style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px dashed rgba(167,139,250,0.3)',
                    borderRadius: 14,
                    padding: '12px 16px',
                    maxWidth: 320,
                    width: '100%',
                    textAlign: 'left',
                  }}>
                    <p className="font-inter" style={{ fontSize: 12, color: '#c4b5fd', margin: 0, lineHeight: 1.5 }}>
                      📩 <strong>Payment QR in Email:</strong> Check your inbox for the attached UPI QR image if paying from another device.
                    </p>
                  </div>

                  <p className="font-inter" style={{ fontSize: 12, color: 'rgba(196,181,253,0.5)', marginTop: 16 }}>
                    Supports Google Pay, PhonePe, Paytm, BHIM & all UPI apps.
                  </p>
                </div>

                {/* Right: Enter UTR Confirmation Form */}
                <div className="glass-strong neon-card" style={{
                  padding: 'clamp(32px, 5vw, 48px)',
                  borderRadius: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{ marginBottom: 28 }}>
                    <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                      Log Payment UTR
                    </h2>
                    <p className="font-inter" style={{ fontSize: 14, color: 'rgba(196,181,253,0.65)', lineHeight: 1.6 }}>
                      Once your transaction is successful in your UPI app, find the <strong>12-digit UTR / UPI Ref ID</strong> in the receipt and submit it below to receive your Attendance QR Code.
                    </p>
                  </div>

                  {errorMsg && (
                    <div style={{
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 14,
                      padding: '12px 16px',
                      color: '#fca5a5',
                      fontSize: 13,
                      marginBottom: 20,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitUtr}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#c4b5fd', marginBottom: 8 }}>
                          Registered Email Address
                        </label>
                        <input
                          className="field-input"
                          type="email"
                          placeholder="e.g. your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#c4b5fd', marginBottom: 8 }}>
                          12-Digit UPI Transaction Reference (UTR)
                        </label>
                        <input
                          className="field-input"
                          type="text"
                          placeholder="e.g. 426189021455"
                          value={utr}
                          onChange={(e) => setUtr(e.target.value)}
                          maxLength={30}
                          style={{ letterSpacing: '0.08em', fontWeight: 600 }}
                          required
                        />
                        <span style={{ fontSize: 11, color: 'rgba(196,181,253,0.5)', marginTop: 6, display: 'block' }}>
                          Available in Google Pay / PhonePe / Paytm payment receipt as "UPI Ref No" or "UTR".
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-xl"
                        disabled={loading}
                        style={{ width: '100%', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                        data-cuelume-hover="tick"
                        data-cuelume-press="pulse"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="anim-spin-slow" />
                            <span>Logging UTR & Generating QR...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm & Get Attendance QR</span>
                            <Sparkles size={18} />
                          </>
                        )}
                      </button>

                    </div>
                  </form>

                  <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'rgba(196,181,253,0.5)' }}>
                      Haven't registered yet?{' '}
                      <button
                        onClick={() => navigate('/register')}
                        style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 13 }}
                      >
                        Register details first →
                      </button>
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </main>

      <style>{`
        .confirm-grid { grid-template-columns: 1fr 1.1fr; }
        @media (max-width: 960px) {
          .confirm-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </div>
  );
}

export default ConfirmPaymentPage;
