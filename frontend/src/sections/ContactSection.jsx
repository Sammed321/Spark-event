import { Mail, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { CyberCard } from '../components/CyberCard';

const CONTACTS = [
  { name: 'Shrihari Chikkodikar', role: 'Student Coordinator', phone: '+91 93804 59314', email: 'shriharichikkodikar@gmail.com' },
  { name: 'Rishabh Kinnal', role: 'Student Coordinator', phone: '+91 80887 12630', email: 'kinnalrish315@gmail.com' },
];

export function ContactSection() {
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="section" style={{ background: '#060010' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="eyebrow">Get in touch</span>
        <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 48 }}>
          Contact <span className="grad-text">Us</span>
        </h2>

        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, padding: '0 6px 6px 0' }}>
          {CONTACTS.map((contact, index) => (
            <CyberCard key={contact.name} style={{
              width: '100%', maxWidth: 360, minWidth: 'min(300px, 100%)', textAlign: 'left',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.5s ease ${index * 100}ms`
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
