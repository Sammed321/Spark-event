export function Footer() {
  const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const LINKS = [
    { label: 'Home',     id: 'home' },
    { label: 'About',    id: 'about' },
    { label: 'Workshop', id: 'workshop' },
    { label: 'Register', id: 'register' },
    { label: 'Contact',  id: 'contact' },
  ];

  return (
    <footer style={{ background: '#030008', borderTop: '1px solid rgba(139,92,246,0.1)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, marginBottom: 64 }}>
          
          <div style={{ maxWidth: 300 }}>
            <h2 className="font-syne" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>ILLUMINATE</h2>
            <p className="font-inter" style={{ fontSize: 14, color: 'rgba(196,181,253,0.6)', lineHeight: 1.6 }}>
              Entrepreneurship Workshop<br />
              by E-Cell, IIT Bombay
            </p>
          </div>

          <div>
            <h4 className="font-grotesk" style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {LINKS.map(link => (
                <button key={link.id} onClick={() => goto(link.id)} style={{
                  background: 'none', border: 'none', color: 'rgba(196,181,253,0.6)', cursor: 'pointer',
                  textAlign: 'left', fontSize: 14, fontFamily: 'Inter, sans-serif', transition: 'color 0.2s', padding: 0
                }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='rgba(196,181,253,0.6)'}>
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)', marginBottom: 32 }} />

        <div style={{ textAlign: 'center', color: 'rgba(196,181,253,0.4)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
          &copy; {new Date().getFullYear()} Entrepreneurship Cell, IIT Bombay. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
