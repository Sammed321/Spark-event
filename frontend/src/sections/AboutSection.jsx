import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const STATS = [
  { n: 18000, suf: '+', label: 'Students Reached' },
  { n: 200, suf: '+', label: 'Workshops Conducted' },
  { n: 15, suf: '+', label: 'States Covered' },
  { n: 1, suf: 'K+', label: 'College Partners' },
];

const PILLARS = [
  { 
    sticker: '/stickers/innovation.png', 
    title: 'Innovation', 
    desc: 'Sparking entrepreneurial thinking and creative problem-solving in students across India.' 
  },
  { 
    sticker: '/stickers/growth.png', 
    title: 'Growth', 
    desc: 'Real startup skills, frameworks and hands-on experience for the next generation.' 
  },
  { 
    sticker: '/stickers/reach.png', 
    title: 'Reach', 
    desc: 'Spreading entrepreneurship culture from IIT Bombay to 15+ states.' 
  },
  { 
    sticker: '/stickers/knowledge.png', 
    title: 'Knowledge', 
    desc: 'Curriculum crafted by entrepreneurs, professionals and IIT Bombay alumni.' 
  },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    const dur = 1800, steps = 60, inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(t);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function AboutSection() {
  const [cardRef, cardVisible] = useInView();
  const [pillarsRef, pillarsVisible] = useInView();

  return (
    <section id="about" className="section" style={{ background: 'linear-gradient(180deg, #060010 0%, #080018 100%)' }}>
      <div className="orb" style={{
        width: 500, height: 500, top: '-10%', right: '-5%',
        background: 'radial-gradient(ellipse, rgba(109,40,217,.15) 0%, transparent 70%)'
      }} aria-hidden="true" />

      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow">Who We Are</span>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15 }}>
            About <span className="grad-text">E-Cell, IIT Bombay X Spark </span>
          </h2>
          <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.65)', maxWidth: 580, margin: '16px auto 0', lineHeight: 1.75 }}>
            One of India's most prominent platforms for nurturing young entrepreneurs — connecting students, startups, professionals and academia.
          </p>
        </div>

        {/* Main grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 52,
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all .7s ease',
        }} ref={cardRef} className="about-grid">

          {/* Left prose card */}
          <div className="glass-strong" style={{ padding: '36px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{ width: 4, height: 52, borderRadius: 4, background: 'linear-gradient(to bottom, #7c3aed, #a855f7)', flexShrink: 0 }} />
              <div>
                <div className="font-syne" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#a78bfa', textTransform: 'uppercase' }}>
                  Entrepreneurship Cell X Spark 
                </div>
                <div className="font-syne" style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>IIT Bombay</div>
              </div>
            </div>
            <p className="font-inter" style={{ fontSize: 15, color: 'rgba(196,181,253,.72)', lineHeight: 1.8, marginBottom: 16 }}>
              E-Cell IIT Bombay has been at the forefront of the Indian startup ecosystem — mentoring students, young entrepreneurs and working professionals through initiatives, workshops, summits and competitions.
            </p>
            <p className="font-inter" style={{ fontSize: 15, color: 'rgba(196,181,253,.72)', lineHeight: 1.8, marginBottom: 28 }}>
              Through Illuminate, E-Cell brings its signature entrepreneurship education directly to college campuses across India — giving students the tools, mindset and certification to build their own ventures.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px',
              borderRadius: 40, border: '1px solid rgba(139,92,246,.25)',
              background: 'rgba(139,92,246,.1)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', animation: 'pulse 2s ease-in-out infinite', display: 'block' }} />
              <span className="font-grotesk" style={{ fontSize: 12, color: '#c4b5fd', letterSpacing: '0.06em' }}>
                Official initiative of E-Cell, IIT Bombay X Spark 
              </span>
            </div>
          </div>

          {/* Right pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} ref={pillarsRef}>
            {PILLARS.map((p, i) => (
              <div key={p.title} className="glass glass-hover" style={{
                padding: '24px 22px',
                opacity: pillarsVisible ? 1 : 0,
                transform: pillarsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all .6s ease ${i * 80}ms`,
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  marginBottom: 16,
                  borderRadius: 16,
                  background: 'rgba(124, 58, 237, 0.12)',
                  border: '1px solid rgba(167, 139, 250, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6,
                  filter: 'drop-shadow(0 6px 16px rgba(124, 58, 237, 0.3))'
                }}>
                  <img src={p.sticker} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="font-grotesk" style={{ fontSize: 15, fontWeight: 600, color: '#e9d5ff', marginBottom: 8 }}>{p.title}</div>
                <p className="font-inter" style={{ fontSize: 13, color: 'rgba(196,181,253,.6)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="eyebrow" style={{ marginBottom: 28 }}>Previous Year Highlights</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="glass-strong" style={{
              padding: '20px 12px', textAlign: 'center',
              border: '1px solid rgba(139,92,246,.22)',
              borderRadius: 20,
            }}>
              <div className="font-syne grad-text" style={{ fontSize: 'clamp(20px,3.5vw,34px)', fontWeight: 700, lineHeight: 1 }}>
                <Counter target={s.n} suffix={s.suf} />
              </div>
              <div className="font-inter" style={{ fontSize: 13, color: 'rgba(196,181,253,.55)', marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
