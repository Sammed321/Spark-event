import { Mail, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const CONTACTS = [
  { name: 'Rachit Kumar', phone: '+91 9719362033', email: 'rachit@ecell.in' },
  { name: 'Abhishek Gill', phone: '+91 8619283450', email: 'abhishek@ecell.in' },
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

        <div ref={ref} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
          {CONTACTS.map((contact, index) => (
            <div key={contact.name} className="glass glass-hover" style={{
              padding: '32px', minWidth: 300, textAlign: 'left',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.5s ease ${index * 100}ms`
            }}>
              <h3 className="font-syne" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{contact.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`tel:${contact.phone.replace(/ /g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(221,214,254,.8)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(221,214,254,.8)'}>
                  <Phone size={18} style={{ color: '#a78bfa' }} />
                  <span className="font-inter">{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(221,214,254,.8)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(221,214,254,.8)'}>
                  <Mail size={18} style={{ color: '#a78bfa' }} />
                  <span className="font-inter">{contact.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
