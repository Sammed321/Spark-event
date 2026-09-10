import { useInView } from '../hooks/useInView';
import { GraduationCap, Trophy, Gift, BarChart, FileBadge, Handshake } from 'lucide-react';
import { CyberCard } from '../components/CyberCard';

const CARDS = [
  { Icon: GraduationCap, title:'Expert Training',       desc:'Curriculum delivered by seasoned entrepreneurs and professionals.' },
  { Icon: Trophy,        title:'E-Cell Certification',  desc:'Certificates certified and issued by Entrepreneurship Cell, IIT Bombay.' },
  { Icon: Gift,          title:'Exclusive Startup Kit', desc:'Includes Business Model Canvas and curated entrepreneurship resources.' },
  { Icon: BarChart,      title:'BMC Workshop',           desc:'Hands-on Business Model Canvas session — ideate, validate, present.' },
  { Icon: FileBadge,     title:'Coordinator Certs',      desc:'Certificates of Coordination for 5 student coordinators.' },
  { Icon: Handshake,     title:'Faculty Certificate',    desc:'Certificate of Appreciation for the faculty coordinator.' },
];

export function WorkshopIntroSection() {
  const [bannerRef, bannerVis] = useInView();
  const [gridRef, gridVis] = useInView();

  return (
    <section id="workshop" className="section" style={{ background:'#060010' }}>
      <div className="orb" style={{ width:600, height:400, top:'20%', left:'5%',
        background:'radial-gradient(ellipse, rgba(124,58,237,.12) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:.25, pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:2 }}>

        {/* Heading */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <span className="eyebrow">The Workshop</span>
          <h2 className="font-syne" style={{ fontSize:'clamp(28px,4.5vw,46px)', fontWeight:700, color:'#fff', lineHeight:1.15 }}>
            From Ideas to <span className="grad-text">Impact</span>
          </h2>
          <p className="font-inter" style={{ fontSize:16, color:'rgba(196,181,253,.65)', maxWidth:580, margin:'16px auto 0', lineHeight:1.75 }}>
            A full-day immersive workshop covering everything from ideation and team formation to business models and live pitching.
          </p>
        </div>

        {/* Fee Banner */}
        <div ref={bannerRef} style={{
          borderRadius: 24,
          background:'linear-gradient(135deg, rgba(109,40,217,.25) 0%, rgba(124,58,237,.15) 50%, rgba(109,40,217,.25) 100%)',
          border:'1px solid rgba(139,92,246,.35)',
          boxShadow:'0 0 80px rgba(109,40,217,.2)',
          padding:'36px 48px', marginBottom:48,
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:28,
          position:'relative', overflow:'hidden',
          opacity: bannerVis ? 1 : 0, transform: bannerVis ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all .6s ease',
        }} className="fee-banner">
          {/* Top shimmer line */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1,
            background:'linear-gradient(to right, transparent, rgba(167,139,250,.7), transparent)' }} aria-hidden="true" />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1,
            background:'linear-gradient(to right, transparent, rgba(167,139,250,.7), transparent)' }} aria-hidden="true" />

          <div style={{ textAlign: 'left' }}>
            <div className="font-inter" style={{ fontSize: 12, color: 'rgba(196,181,253,.55)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6, textAlign: 'left' }}>All-Inclusive Workshop Fee</div>
            <div className="font-syne grad-text" style={{ fontSize: 'clamp(40px,6vw,68px)', fontWeight: 700, lineHeight: 1, textAlign: 'left' }}>₹699</div>
            <div className="font-inter" style={{ fontSize: 14, color: 'rgba(196,181,253,.6)', marginTop: 4, textAlign: 'left' }}>per student</div>
          </div>

          <div style={{ width: 1, height: 80, background: 'rgba(139,92,246,.25)' }} className="fee-divider" aria-hidden="true" />

          <div style={{ textAlign: 'left', flex: 1, maxWidth: 520 }}>
            <div className="font-grotesk" style={{ fontSize: 13, color: 'rgba(196,181,253,.65)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14, textAlign: 'left' }}>What's Included</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px 24px' }}>
              {['Expert Training','Startup Kit + BMC','E-Cell Certificate','6-Hour Immersive Day','Coordination Certs','Faculty Certificate'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }} />
                  <span className="font-inter" style={{ fontSize: 14, color: 'rgba(221,214,254,.85)', lineHeight: 1.4, textAlign: 'left' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, padding: '0 10px 10px 0' }} className="intro-grid">
          {CARDS.map((c, i) => {
            const IconComponent = c.Icon;
            return (
            <CyberCard
              key={c.title}
              style={{
                opacity: gridVis ? 1 : 0,
                transform: gridVis ? 'translateY(0)' : 'translateY(28px)',
                transition: `all .55s ease ${i * 70}ms`,
              }}
              innerStyle={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                textAlign: 'left',
              }}
            >
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
                color: '#a855f7',
                filter: 'drop-shadow(0 6px 16px rgba(124, 58, 237, 0.3))',
                flexShrink: 0,
              }}>
                <IconComponent size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-grotesk" style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#f3e8ff',
                marginBottom: 8,
                lineHeight: 1.35,
                textAlign: 'left',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}>
                {c.title}
              </h3>
              <p className="font-inter" style={{
                fontSize: 13.5,
                color: 'rgba(196,181,253,.68)',
                lineHeight: 1.65,
                textAlign: 'left',
                margin: 0,
                marginTop: 'auto',
              }}>
                {c.desc}
              </p>
            </CyberCard>
          )})}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px)  { .intro-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .intro-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 700px)  { .fee-banner { flex-direction: column; align-items: flex-start !important; padding: 28px 24px !important; }
                                     .fee-divider { display:none !important; } }
      `}</style>
    </section>
  );
}
