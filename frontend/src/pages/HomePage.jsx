import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { WorkshopIntroSection } from '../sections/WorkshopIntroSection';
import { WorkshopTimelineSection } from '../sections/WorkshopTimelineSection';
import { FacultySection } from '../sections/FacultySection';
import { ContactSection } from '../sections/ContactSection';
import { Footer } from '../components/Footer';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkshopIntroSection />
        <WorkshopTimelineSection />

        {/* High-Energy Cyberpunk Registration CTA Banner */}
        <section style={{
          background: 'linear-gradient(180deg, #0a0010 0%, #060010 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div className="orb" style={{
            width: 600, height: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.22) 0%, transparent 70%)',
          }} aria-hidden="true" />
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              borderRadius: 32,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.16) 0%, rgba(88, 28, 135, 0.08) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.35)',
              padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 60px)',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(167, 139, 250, 0.08)',
              position: 'relative',
              overflow: 'hidden',
            }} className="glass-spotlight">
              
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(124,58,237,0.2)',
                padding: '6px 16px',
                borderRadius: 20,
                border: '1px solid rgba(167,139,250,0.3)',
                marginBottom: 20,
              }}>
                <Sparkles size={15} color="#e879f9" />
                <span className="font-grotesk" style={{ fontSize: 13, fontWeight: 600, color: '#e879f9', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Limited Seats Available
                </span>
              </div>

              <h2 className="font-syne" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
                Ready to Turn Your Idea into a <span className="grad-text">Venture?</span>
              </h2>

              <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,0.75)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.7 }}>
                Join students across colleges for a full-day immersive workshop with hands-on BMC sprint, startup kits, and official E-Cell IIT Bombay certification.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
                <button
                  className="btn btn-primary btn-xl"
                  onClick={() => navigate('/register')}
                  data-cuelume-hover="tick"
                  data-cuelume-press="pulse"
                  style={{ minWidth: 220, fontSize: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                  <span>Register Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap', opacity: 0.85 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c4b5fd', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                  <Award size={16} color="#a78bfa" />
                  <span>IIT Bombay E-Cell Certificate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c4b5fd', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                  <ShieldCheck size={16} color="#a78bfa" />
                  <span>Verified Registration Pass</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <FacultySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
