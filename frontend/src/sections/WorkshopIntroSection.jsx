import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import {
  GraduationCap,
  Trophy,
  Gift,
  BarChart,
  FileBadge,
  Handshake,
  ShoppingBag,
  PenTool,
  StickyNote,
  Sparkles,
  BookOpen,
  LayoutGrid,
  Key,
  Image as ImageIcon,
  Book,
  Package,
} from 'lucide-react';
import { CyberCard } from '../components/CyberCard';
import FolderComponent from '../components/ui/folder-component';
import { useGsapFloatingOrbs, useGsapStaggerCards } from '../utils/gsapAnimations';

const STARTUP_KIT_ITEMS = [
  { name: 'Bag', desc: 'Official Kit Bag', Icon: ShoppingBag, color: '#38bdf8' },
  { name: 'Pen', desc: 'Executive Pen', Icon: PenTool, color: '#a855f7' },
  { name: 'Notepad', desc: 'Ideation Notes', Icon: StickyNote, color: '#ec4899' },
  { name: 'Sticker', desc: 'Branded Stickers', Icon: Sparkles, color: '#f59e0b' },
  { name: 'Handout Booklet', desc: 'Workshop Guide', Icon: BookOpen, color: '#10b981' },
  { name: 'BMC', desc: 'Business Model Canvas', Icon: LayoutGrid, color: '#e879f9' },
  { name: 'Keychain', desc: 'Custom Keychain', Icon: Key, color: '#06b6d4' },
  { name: 'Poster', desc: 'Venture Blueprint', Icon: ImageIcon, color: '#8b5cf6' },
  { name: 'Book', desc: 'Startup Playbook', Icon: Book, color: '#f43f5e' },
];

const CARDS = [
  { Icon: GraduationCap, title:'Expert Training',       desc:'Curriculum delivered by seasoned entrepreneurs and professionals.' },
  { Icon: Trophy,        title:'E-Cell Certification',  desc:'Certificates certified and issued by Entrepreneurship Cell, IIT Bombay.' },
  { Icon: Gift,          title:'Exclusive Startup Kit', desc:'Official 9-item physical toolkit: Bag, Pen, Notepad, Sticker, Handout Booklet, BMC, Keychain, Poster & Book.' },
  { Icon: BarChart,      title:'BMC Workshop',           desc:'Hands-on Business Model Canvas session — ideate, validate, present.' },
  { Icon: FileBadge,     title:'Coordinator Certs',      desc:'Certificates of Coordination for 5 student coordinators.' },
  { Icon: Handshake,     title:'Faculty Certificate',    desc:'Certificate of Appreciation for the faculty coordinator.' },
];

export function WorkshopIntroSection() {
  const sectionRef = useRef(null);
  const [bannerRef, bannerVis] = useInView();
  const [gridRef, gridVis] = useInView();

  useGsapFloatingOrbs(sectionRef);
  useGsapStaggerCards(gridRef, '.cyber-box', { y: 35, stagger: 0.08 });

  return (
    <section ref={sectionRef} id="workshop" className="section" style={{ background:'#060010' }}>
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
            A full-day immersive workshop covering everything from ideation and team formation to business models and venture scaling.
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
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, padding: '0 6px 6px 0' }} className="intro-grid">
          {CARDS.map((c, i) => {
            const IconComponent = c.Icon;
            return (
            <CyberCard
              key={c.title}
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

        {/* Rare UI Interactive 3D Folder: Startup Kit & BMC */}
        <div style={{
          marginTop: 64,
          borderRadius: 32,
          background: 'linear-gradient(145deg, rgba(124, 58, 237, 0.1) 0%, rgba(88, 28, 135, 0.05) 100%)',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          padding: '56px 40px 48px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 36,
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }} className="glass-spotlight">
          <div style={{ flex: '1.1 1 420px', textAlign: 'left', minWidth: 280 }}>
            <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
              ✦ Interactive Kit & Goodies
            </span>
            <h3 className="font-copernicus" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
              Exclusive <span className="grad-text">Startup Kit & BMC</span>
            </h3>
            <p className="font-inter" style={{ fontSize: 14.5, color: 'rgba(196, 181, 253, 0.75)', lineHeight: 1.65, marginBottom: 22, maxWidth: 500 }}>
              Every participant receives an official, physical startup toolkit packed with 9 essential founder assets. Hover over the 3D folder to fan out the resources, and click to inspect!
            </p>

            {/* Inclusions Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 14,
              paddingBottom: 8,
              borderBottom: '1px solid rgba(167, 139, 250, 0.2)',
              maxWidth: 500,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                color: '#e879f9',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                <Package size={15} color="#e879f9" />
                <span>Kit Inclusions (9 Items)</span>
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                padding: '2px 8px',
                borderRadius: 20,
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                ✦ Physical Assets
              </span>
            </div>

            {/* 9 Kit Items Grid */}
            <div
              className="kit-items-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                maxWidth: 500,
              }}
            >
              {STARTUP_KIT_ITEMS.map((item) => {
                const ItemIcon = item.Icon;
                return (
                  <div
                    key={item.name}
                    className="kit-item-card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 10px',
                      borderRadius: 10,
                      background: 'rgba(124, 58, 237, 0.12)',
                      border: '1px solid rgba(167, 139, 250, 0.2)',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(124, 58, 237, 0.26)';
                      e.currentTarget.style.borderColor = item.color;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 16px -4px ${item.color}50`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(124, 58, 237, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: item.color,
                    }}>
                      <ItemIcon size={14} strokeWidth={2.2} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#f3e8ff',
                        fontFamily: 'Space Grotesk, sans-serif',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        fontSize: 9.5,
                        color: 'rgba(196, 181, 253, 0.65)',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: 1.1,
                        marginTop: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="folder-wrapper" style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 340, paddingTop: 44, paddingBottom: 16 }}>
            <FolderComponent color="black" size="md" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px)  { .intro-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .intro-grid { grid-template-columns: 1fr !important; }
                                     .glass-spotlight { padding: 36px 18px 28px !important; }
                                     .kit-items-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
                                     .folder-wrapper { transform: scale(0.82); transform-origin: center center; margin: -20px 0 -10px; } }
        @media (max-width: 400px)  { .kit-items-grid { grid-template-columns: 1fr !important; }
                                     .folder-wrapper { transform: scale(0.72); margin: -32px 0 -18px; } }
        @media (max-width: 700px)  { .fee-banner { flex-direction: column; align-items: flex-start !important; padding: 28px 24px !important; }
                                     .fee-divider { display:none !important; } }
      `}</style>
    </section>
  );
}
