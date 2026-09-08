import { useEffect, useState, useRef } from 'react';
import { Calendar, Clock, Users, ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  w: Math.random() * 3 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 6,
  dur: Math.random() * 4 + 4,
  color: Math.random() > .5 ? 'rgba(168,85,247,.8)' : 'rgba(232,121,249,.7)',
}));

const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export function HeroSection() {
  const [ready, setReady] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setTimeout(() => setReady(true), 80)); }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(109,40,217,.35) 0%, rgba(6,0,16,1) 55%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: 80, paddingBottom: 40,
    }}>

      {/* Grid overlay */}
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:.4, pointerEvents:'none' }} />

      {/* Orbs */}
      <div className="orb" style={{ width:700, height:700, top:'50%', left:'50%', transform:'translate(-50%,-55%)',
        background:'radial-gradient(ellipse, rgba(109,40,217,.28) 0%, transparent 65%)', opacity:.9 }}
        aria-hidden="true" />
      <div className="orb" style={{ width:400, height:400, top:'-10%', left:'-5%',
        background:'radial-gradient(ellipse, rgba(147,51,234,.2) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="orb" style={{ width:500, height:500, bottom:'-15%', right:'-5%',
        background:'radial-gradient(ellipse, rgba(88,28,220,.18) 0%, transparent 70%)' }} aria-hidden="true" />

      {/* Rotating ring */}
      <div className="anim-spin-slow" style={{
        position:'absolute', top:'50%', left:'50%',
        width: 620, height: 620, borderRadius:'50%', marginTop:-310, marginLeft:-310,
        border:'1px solid rgba(139,92,246,.12)', pointerEvents:'none',
      }} aria-hidden="true" />
      <div className="anim-spin-slow" style={{
        position:'absolute', top:'50%', left:'50%',
        width: 820, height: 820, borderRadius:'50%', marginTop:-410, marginLeft:-410,
        border:'1px solid rgba(139,92,246,.07)', pointerEvents:'none',
        animationDirection:'reverse', animationDuration:'35s',
      }} aria-hidden="true" />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="anim-drift" style={{
          position:'absolute', borderRadius:'50%',
          width: p.w, height: p.w,
          left: `${p.x}%`, top: `${p.y}%`,
          background: p.color,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          pointerEvents:'none',
        }} aria-hidden="true" />
      ))}

      {/* ── Content ── */}
      <div className="container" style={{ textAlign:'center', position:'relative', zIndex:10 }}>

        {/* Eyebrow */}
        <div style={{
          opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all .7s ease .1s',
        }}>
          <span className="eyebrow">
            ✦ &nbsp; E-Cell, IIT Bombay X Spark Presents 
          </span>
        </div>

        {/* Big title */}
        <div style={{
          opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all .8s ease .25s',
        }}>
          <h1 className="shimmer font-syncopate" style={{
            fontSize: 'clamp(72px, 14vw, 160px)',
            fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
            marginBottom: 12,
          }}>
            ILLUMINATE
          </h1>
          <p className="font-grotesk" style={{
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            color: 'rgba(196,181,253,.8)', fontWeight: 400, letterSpacing: '0.06em',
            marginBottom: 0,
          }}>
            Entrepreneurship Workshop &nbsp;·&nbsp; E-Cell, IIT Bombay X Spark 
          </p>
        </div>

        {/* Divider */}
        <div style={{
          opacity: ready ? 1 : 0, transition: 'opacity .6s ease .4s',
          display:'flex', alignItems:'center', gap:16, margin:'28px auto',
          maxWidth: 340,
        }}>
          <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(139,92,246,.5))' }} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color:'#a78bfa' }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#a78bfa" />
          </svg>
          <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, rgba(139,92,246,.5))' }} />
        </div>

        {/* Tagline */}
        <div style={{
          opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all .7s ease .45s',
        }}>
          <p className="font-inter" style={{
            fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65,
            color: 'rgba(221,214,254,.65)', maxWidth: 560, margin: '0 auto 36px',
          }}>
            Empowering the Next Generation of{' '}
            <span className="grad-text" style={{ fontWeight: 600 }}>Changemakers</span>
          </p>
        </div>

        {/* CTAs */}
        <div style={{
          opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all .7s ease .55s',
          display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center', marginBottom: 52,
        }}>
          <button className="btn btn-primary btn-xl" onClick={() => goto('register')}>
            Register Now  →
          </button>
          <button className="btn btn-outline btn-xl" onClick={() => goto('workshop')}>
            Explore Workshop
          </button>
        </div>

        {/* Info pills */}
        <div style={{
          opacity: ready ? 1 : 0, transition: 'opacity .7s ease .7s',
          display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center',
        }}>
          {[
            { icon: '₹', label: '₹799', sub: 'Per Student' },
            { icon: null, label: '6 Hours', sub: 'Duration', lucide: Clock },
            { icon: null, label: '70+', sub: 'Participants', lucide: Users },
            { icon: null, label: 'Jul – Oct 2026', sub: 'Date Range', lucide: Calendar },
          ].map(({ label, sub, lucide: Icon }) => (
            <div key={label} style={{
              display:'flex', alignItems:'center', gap:10,
              padding: '12px 20px', borderRadius: 14,
              background:'rgba(255,255,255,.04)',
              border:'1px solid rgba(139,92,246,.22)',
              backdropFilter:'blur(12px)',
            }}>
              {Icon && <Icon size={16} style={{ color:'#a78bfa', flexShrink:0 }} />}
              <div style={{ textAlign:'left' }}>
                <div className="font-grotesk" style={{ fontSize:15, fontWeight:700, color:'#fff', lineHeight:1.2 }}>{label}</div>
                <div className="font-inter" style={{ fontSize:11, color:'rgba(196,181,253,.55)', marginTop:2 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => goto('about')}
        aria-label="Scroll down"
        style={{
          position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
          background:'none', border:'none', cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          color:'rgba(167,139,250,.5)', transition:'color .2s',
          opacity: ready ? 1 : 0, zIndex:10,
        }}
        onMouseEnter={e => e.currentTarget.style.color='rgba(167,139,250,.9)'}
        onMouseLeave={e => e.currentTarget.style.color='rgba(167,139,250,.5)'}
      >
        <span className="font-inter" style={{ fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase' }}>Scroll</span>
        <ChevronDown size={16} style={{ animation:'floatY 2s ease-in-out infinite' }} />
      </button>

      {/* Bottom gradient fade */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:120,
        background:'linear-gradient(to top, #060010, transparent)',
        pointerEvents:'none',
      }} />
    </section>
  );
}
