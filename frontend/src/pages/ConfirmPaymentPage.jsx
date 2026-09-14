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

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/Gamx1CoOHWb0tu6PHvd5nW';

function WhatsAppIcon({ size = 20, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.3-.777.98-.953 1.18-.175.2-.35.225-.651.075-.3-.15-1.267-.467-2.414-1.488-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.132-.612.136-.135.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.63-1.027-2.23-.243-.585-.49-.505-.676-.514-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.03-1.053 2.51 0 1.48 1.078 2.91 1.229 3.11.15.2 2.121 3.24 5.138 4.542.718.31 1.278.496 1.716.635.722.23 1.379.197 1.9.12.58-.087 1.78-.727 2.03-1.43.251-.702.251-1.303.176-1.43-.075-.126-.276-.201-.577-.351z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.176L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.163 8.163 0 01-4.167-1.137l-.299-.178-2.96.777.79-2.885-.195-.31A8.168 8.168 0 013.8 12c0-4.522 3.678-8.2 8.2-8.2 4.522 0 8.2 3.678 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z" />
    </svg>
  );
}

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
  const [copiedWaLink, setCopiedWaLink] = useState(false);
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
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            if (cardRef.current) {
              gsap.set(cardRef.current, { clearProps: 'transform' });
            }
          },
        }
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

  const handleCopyWaLink = () => {
    navigator.clipboard.writeText(WHATSAPP_GROUP_URL);
    setCopiedWaLink(true);
    play('sparkle');
    setTimeout(() => setCopiedWaLink(false), 2000);
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
    <div ref={pageRef} className="confirm-page-wrap">
      
      {/* Background Orbs */}
      <div className="orb anim-pulse" style={{ width: 'min(650px, 90vw)', height: 'min(650px, 90vw)', top: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div className="orb" style={{ width: 'min(550px, 80vw)', height: 'min(550px, 80vw)', bottom: '0%', left: '-10%', background: 'radial-gradient(circle, rgba(232,121,249,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      {/* Top Navbar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,0,16,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,92,246,0.2)',
      }}>
        <div className="container confirm-header-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <div
            onClick={() => navigate('/')}
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            className="confirm-logos-wrap"
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img src="/kls-logo.png" alt="KLS" className="logo-kls" style={{ height: 32, width: 'auto' }} />
                <span className="font-grotesk" style={{ fontSize: 7.5, fontWeight: 600, color: '#c4b5fd', letterSpacing: '0.04em', lineHeight: 1 }}>Estd. 1939</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img src="/git-logo.png" alt="GIT" className="logo-git" style={{ height: 32, width: 'auto' }} />
                <span className="font-grotesk" style={{ fontSize: 7.5, fontWeight: 600, color: '#c4b5fd', letterSpacing: '0.04em', lineHeight: 1 }}>Estd. 1979</span>
              </div>
            </div>
            <div style={{ width: 1, height: 26, background: 'rgba(167,139,250,0.3)' }} aria-hidden="true" />
            <img src="/logo2.png" alt="Illuminate" className="logo-illuminate" style={{ height: 40, width: 'auto' }} />
          </div>

          <button
            onClick={() => navigate('/')}
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            className="confirm-back-btn"
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
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={16} />
            <span className="btn-text-desktop">Back to Home</span>
            <span className="btn-text-mobile">Home</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="confirm-main" style={{ padding: '64px 0 96px', position: 'relative', zIndex: 2 }}>
        <div className="container" style={{ maxWidth: 1080 }}>

          {/* If Attendance Pass Generated: Show Pass */}
          {attendanceData ? (
            <div ref={cardRef} style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
              
              <div className="confirm-hero-title" style={{ textAlign: 'center', marginBottom: 36 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 16px', color: '#34d399',
                  boxShadow: '0 0 30px rgba(16,185,129,0.3)',
                }}>
                  <CheckCircle size={36} />
                </div>
                <h1 className="font-syne" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 10 }}>
                  Attendance Pass <span className="grad-text">Generated!</span>
                </h1>
                <p className="font-inter" style={{ fontSize: 15, color: 'rgba(196,181,253,0.75)', maxWidth: 520, margin: '0 auto' }}>
                  Your UTR has been logged. Present your official Attendance QR Code at the registration desk for check-in.
                </p>
              </div>

              {/* Attendance Pass Holographic Card */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(124,58,237,0.16) 0%, rgba(20,5,45,0.85) 100%)',
                border: '1px solid rgba(167,139,250,0.4)',
                borderRadius: 32,
                padding: 'clamp(24px, 5vw, 48px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0,0,0,0.6), inset 0 0 24px rgba(167,139,250,0.1)',
                textAlign: 'center',
                width: '100%',
              }} className="glass-spotlight confirm-card">
                
                {/* Holographic shimmer */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 25%, transparent 30%)', backgroundSize: '200% 100%', animation: 'shimmer 4s infinite linear', pointerEvents: 'none' }} />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', padding: '6px 14px', borderRadius: 20, marginBottom: 24 }}>
                  <ShieldCheck size={16} color="#34d399" />
                  <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 700, color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Seat Reserved &bull; UTR Logged
                  </span>
                </div>

                {/* The Unique Attendance QR Code */}
                {attendanceData.attendance_qr_data_url && (
                  <div style={{ margin: '0 auto 20px', display: 'inline-block', maxWidth: '100%' }}>
                    <div style={{
                      background: '#ffffff',
                      padding: 14,
                      borderRadius: 18,
                      boxShadow: '0 10px 36px rgba(0,0,0,0.6)',
                      display: 'inline-block',
                      maxWidth: '100%',
                    }}>
                      <img
                        src={attendanceData.attendance_qr_data_url}
                        alt="Attendance QR Code"
                        style={{ width: 220, maxWidth: '65vw', height: 'auto', aspectRatio: '1/1', display: 'block', borderRadius: 8 }}
                      />
                    </div>
                  </div>
                )}

                {/* Unique Attendance Code */}
                <div style={{
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(167,139,250,0.25)',
                  borderRadius: 16,
                  padding: '14px 18px',
                  maxWidth: 420,
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa', fontWeight: 600 }}>
                      Unique Attendance Code
                    </div>
                    <div style={{ fontSize: 'clamp(17px, 4.5vw, 20px)', fontWeight: 800, color: '#e879f9', letterSpacing: '0.08em', fontFamily: 'monospace', marginTop: 4, wordBreak: 'break-all' }}>
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
                  padding: '18px 20px',
                  textAlign: 'left',
                  fontSize: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginBottom: 24,
                  overflowWrap: 'anywhere',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ color: 'rgba(196,181,253,0.6)' }}>Participant:</span>
                    <span style={{ fontWeight: 600, color: '#fff', wordBreak: 'break-word' }}>{attendanceData.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ color: 'rgba(196,181,253,0.6)' }}>Email:</span>
                    <span style={{ fontWeight: 500, color: '#e9d5ff', wordBreak: 'break-all' }}>{attendanceData.email}</span>
                  </div>
                  {attendanceData.usn && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ color: 'rgba(196,181,253,0.6)' }}>USN / Roll No:</span>
                      <span style={{ fontWeight: 500, color: '#e9d5ff', wordBreak: 'break-all' }}>{attendanceData.usn}</span>
                    </div>
                  )}
                  {attendanceData.utr && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ color: 'rgba(196,181,253,0.6)' }}>UTR Reference:</span>
                      <span style={{ fontWeight: 600, color: '#a78bfa', fontFamily: 'monospace', wordBreak: 'break-all' }}>{attendanceData.utr}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Community Group Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(16, 185, 129, 0.05) 100%)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  borderRadius: 20,
                  padding: '22px 24px',
                  marginBottom: 24,
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(37, 211, 102, 0.1)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(37, 211, 102, 0.18)',
                      border: '1px solid rgba(37, 211, 102, 0.35)',
                      padding: '5px 12px',
                      borderRadius: 20,
                    }}>
                      <WhatsAppIcon size={16} style={{ color: '#25D366' }} />
                      <span className="font-grotesk" style={{ fontSize: 11, fontWeight: 700, color: '#25D366', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Official Attendee Group
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: '#a7f3d0', fontWeight: 500 }}>
                      ⚡ Required for Announcements
                    </span>
                  </div>

                  <h3 className="font-syne" style={{ fontSize: 19, fontWeight: 700, color: '#ffffff', margin: '0 0 8px' }}>
                    Join the Official Attendees WhatsApp Group
                  </h3>
                  <p className="font-inter" style={{ fontSize: 13.5, color: '#d1fae5', lineHeight: 1.55, margin: '0 0 16px', opacity: 0.9 }}>
                    Stay informed with real-time workshop announcements, session schedule, venue navigation, and workshop materials directly from the organizing team.
                  </p>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={WHATSAPP_GROUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cuelume-hover="tick"
                      data-cuelume-press="press"
                      className="wa-btn-cta"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#25D366',
                        color: '#03200e',
                        fontWeight: 700,
                        fontSize: 14,
                        padding: '11px 22px',
                        borderRadius: 12,
                        textDecoration: 'none',
                        boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <WhatsAppIcon size={18} style={{ color: '#03200e' }} />
                      <span>Join WhatsApp Group</span>
                      <ExternalLink size={15} />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyWaLink}
                      data-cuelume-hover="tick"
                      data-cuelume-press="press"
                      style={{
                        background: copiedWaLink ? 'rgba(37, 211, 102, 0.25)' : 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid rgba(37, 211, 102, 0.35)',
                        borderRadius: 12,
                        padding: '11px 16px',
                        color: copiedWaLink ? '#34d399' : '#a7f3d0',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copiedWaLink ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedWaLink ? 'Invite Copied' : 'Copy Link'}</span>
                    </button>
                  </div>
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
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg wa-btn-secondary"
                    data-cuelume-hover="tick"
                    data-cuelume-press="press"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(37, 211, 102, 0.15)',
                      border: '1px solid rgba(37, 211, 102, 0.45)',
                      color: '#25D366',
                      fontWeight: 600,
                      textDecoration: 'none',
                      padding: '12px 22px',
                      borderRadius: 14,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <WhatsAppIcon size={18} style={{ color: '#25D366' }} />
                    <span>WhatsApp Group</span>
                    <ExternalLink size={15} />
                  </a>
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
              
              <div className="confirm-hero-title" style={{ textAlign: 'center', marginBottom: 44 }}>
                <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} /> Step 2: Payment Confirmation
                </span>
                <h1 className="font-syne" style={{ fontSize: 'clamp(28px, 5vw, 50px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginTop: 12 }}>
                  Enter UTR for <span className="grad-text">Confirmation</span>
                </h1>
                <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.7)', maxWidth: 580, margin: '14px auto 0' }}>
                  Pay ₹{paymentInfo.amount_rupees} using the UPI QR code sent to your email. Then enter your 12-digit UPI reference (UTR) to confirm your registration.
                </p>
              </div>

              <div style={{ display: 'grid', gap: 36 }} className="confirm-grid">
                
                {/* Left: Payment Summary */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(124,58,237,0.14) 0%, rgba(88,28,135,0.06) 100%)',
                  border: '1px solid rgba(167,139,250,0.35)',
                  borderRadius: 32,
                  padding: 'clamp(24px, 5vw, 48px)',
                  textAlign: 'center',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} className="glass-spotlight confirm-card">
                  
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.25)', padding: '6px 14px', borderRadius: 20, marginBottom: 20, border: '1px solid rgba(167,139,250,0.35)' }}>
                    <Receipt size={16} color="#e879f9" />
                    <span className="font-grotesk" style={{ fontSize: 12, fontWeight: 600, color: '#e879f9', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Payment Summary</span>
                  </div>

                  <div className="font-grotesk" style={{ fontSize: 13, color: 'rgba(196,181,253,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Workshop Fee
                  </div>
                  <div className="font-syne grad-text fee-amount" style={{ fontSize: 44, fontWeight: 800, marginBottom: 20 }}>
                    ₹{paymentInfo.amount_rupees}
                  </div>

                  <div className="instructions-box" style={{
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px dashed rgba(167,139,250,0.35)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    maxWidth: 380,
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: 20,
                  }}>
                    <p className="font-inter" style={{ fontSize: 13, color: '#c4b5fd', margin: 0, lineHeight: 1.6 }}>
                      📩 <strong>Payment Instructions:</strong><br />
                      Scan the official UPI payment QR code sent to your registered email to complete your ₹{paymentInfo.amount_rupees} payment.
                    </p>
                  </div>

                  <p className="font-inter" style={{ fontSize: 12, color: 'rgba(196,181,253,0.5)', margin: 0 }}>
                    Supports Google Pay, PhonePe, Paytm, BHIM & all UPI apps.
                  </p>
                </div>

                {/* Right: Enter UTR Confirmation Form */}
                <div className="glass-strong neon-card confirm-card" style={{
                  padding: 'clamp(24px, 5vw, 48px)',
                  borderRadius: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{ marginBottom: 24 }}>
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
                        style={{ width: '100%', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
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

                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
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
        .confirm-page-wrap {
          background: #05000e;
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          width: 100%;
          overflow-x: clip;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }
        .confirm-grid {
          grid-template-columns: 1fr 1.1fr;
        }
        .btn-text-mobile {
          display: none;
        }

        @media (max-width: 960px) {
          .confirm-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 640px) {
          .confirm-header-nav {
            height: 58px !important;
            padding: 0 14px !important;
          }
          .confirm-logos-wrap {
            gap: 8px !important;
          }
          .logo-kls, .logo-git {
            height: 26px !important;
          }
          .logo-illuminate {
            height: 30px !important;
          }
          .confirm-back-btn {
            padding: 6px 12px !important;
            font-size: 13px !important;
            border-radius: 10px !important;
          }
          .btn-text-desktop {
            display: none !important;
          }
          .btn-text-mobile {
            display: inline !important;
          }
          .confirm-main {
            padding: 24px 0 60px !important;
          }
          .confirm-hero-title {
            margin-bottom: 24px !important;
          }
          .confirm-hero-title h1 {
            font-size: 28px !important;
          }
          .confirm-hero-title p {
            font-size: 14px !important;
            margin-top: 8px !important;
          }
          .confirm-card {
            padding: 22px 18px !important;
            border-radius: 22px !important;
          }
          .confirm-grid {
            gap: 20px !important;
          }
          .fee-amount {
            font-size: 36px !important;
            margin-bottom: 16px !important;
          }
          .instructions-box {
            padding: 14px 16px !important;
            border-radius: 12px !important;
          }
        }

        .wa-btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5) !important;
          filter: brightness(1.06);
        }
        .wa-btn-secondary:hover {
          background: rgba(37, 211, 102, 0.25) !important;
          border-color: rgba(37, 211, 102, 0.6) !important;
          color: #34d399 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default ConfirmPaymentPage;
