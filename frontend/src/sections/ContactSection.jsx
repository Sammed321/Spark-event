import { useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import { CyberCard } from '../components/CyberCard';
import { useGsapFloatingOrbs, useGsapStaggerCards } from '../utils/gsapAnimations';

const CONTACTS = [
  { name: 'Shrihari Chikkodikar', role: 'Student Coordinator', phone: '+91 93804 59314', email: 'shriharichikkodikar@gmail.com' },
  { name: 'Rishabh Kinnal', role: 'Secretary', phone: '+91 80887 12630', email: 'kinnalrish315@gmail.com' },
  { name: 'Rishab Chavadar', role: 'Technical Lead', phone: '+91 63644 33736', email: 'rchavadar@gmail.com' },
];

export function ContactSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useGsapFloatingOrbs(sectionRef);
  useGsapStaggerCards(cardsRef, '.cyber-box', { y: 35, stagger: 0.1 });

  return (
    <section ref={sectionRef} id="contact" className="section" style={{ background: '#060010', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 500, height: 500, top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="orb" style={{ width: 450, height: 450, bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 65%)' }} aria-hidden="true" />
      
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="eyebrow">Get in touch</span>
        <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 48 }}>
          Contact <span className="grad-text">Us</span>
        </h2>

        <div ref={cardsRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, padding: '0 6px 6px 0' }}>
          {CONTACTS.map((contact) => (
            <CyberCard key={contact.name} style={{
              width: '100%', maxWidth: 360, minWidth: 'min(300px, 100%)', textAlign: 'left',
            }} innerStyle={{ padding: '32px' }}>
              <h3 className="font-syne" style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{contact.name}</h3>
              <div className="font-grotesk" style={{ fontSize: 12, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>{contact.role}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href={`tel:${contact.phone.replace(/ /g, '')}`}
                  data-cuelume-hover="tick"
                  data-cuelume-press="tick"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(221,214,254,.8)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(221,214,254,.8)'}
                >
                  <Phone size={18} style={{ color: '#a78bfa', flexShrink: 0 }} />
                  <span className="font-inter" style={{ fontSize: 14 }}>{contact.phone}</span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  data-cuelume-hover="tick"
                  data-cuelume-press="tick"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(221,214,254,.8)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#fff'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(221,214,254,.8)'}
                >
                  <Mail size={18} style={{ color: '#a78bfa', flexShrink: 0 }} />
                  <span className="font-inter" style={{ fontSize: 14, wordBreak: 'break-all' }}>{contact.email}</span>
                </a>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
