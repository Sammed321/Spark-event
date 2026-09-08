import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';

const LINKS = [
  { label: 'Home',     id: 'home' },
  { label: 'About',    id: 'about' },
  { label: 'Workshop', id: 'workshop' },
  { label: 'Benefits', id: 'benefits' },
  { label: 'Register', id: 'register' },
  { label: 'Contact',  id: 'contact' },
];

const goto = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    LINKS.forEach(l => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const click = id => { setOpen(false); setTimeout(() => goto(id), 80); };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all .4s ease',
        background: scrolled ? 'rgba(6,0,16,.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,92,246,.18)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,.4)' : 'none',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height: 68 }}>

          {/* Logo */}
          <button onClick={() => click('home')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(124,58,237,.6)',
            }}>
              {/* Star icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '0.12em' }}
              className="shimmer">ILLUMINATE</span>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display:'flex', alignItems:'center', gap: 4 }} className="hidden-mobile">
            {LINKS.map(l => (
              <button key={l.id} onClick={() => click(l.id)} style={{
                background: active === l.id ? 'rgba(124,58,237,.18)' : 'transparent',
                border: 'none', cursor: 'pointer',
                padding: '8px 16px', borderRadius: 10,
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 14,
                color: active === l.id ? '#e9d5ff' : 'rgba(196,181,253,.7)',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { if (active !== l.id) e.target.style.color = '#e9d5ff'; }}
              onMouseLeave={e => { if (active !== l.id) e.target.style.color = 'rgba(196,181,253,.7)'; }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
            <button className="btn btn-primary btn-sm hidden-mobile" onClick={() => click('register')}>
              Register Now
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                display: 'none', background: 'rgba(124,58,237,.15)', border: '1px solid rgba(139,92,246,.3)',
                borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#c4b5fd',
              }}
              className="show-mobile-flex"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        pointerEvents: open ? 'auto' : 'none',
      }}>
        <div onClick={() => setOpen(false)} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0, transition: 'opacity .3s',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 280,
          background: 'rgba(8,0,20,.96)', backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(139,92,246,.2)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
          display: 'flex', flexDirection: 'column', padding: '80px 24px 32px',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {LINKS.map(l => (
              <button key={l.id} onClick={() => click(l.id)} style={{
                background: active === l.id ? 'rgba(124,58,237,.2)' : 'transparent',
                border: active === l.id ? '1px solid rgba(139,92,246,.3)' : '1px solid transparent',
                borderRadius: 12, padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 15,
                color: active === l.id ? '#e9d5ff' : 'rgba(196,181,253,.75)',
                transition: 'all .2s',
              }}>
                {l.label}
              </button>
            ))}
          </nav>
          <button className="btn btn-primary btn-md" style={{ marginTop: 24 }} onClick={() => click('register')}>
            Register Now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile-flex { display: flex !important; } }
        @media (min-width: 768px) { .show-mobile-flex { display: none !important; } }
      `}</style>
    </>
  );
}
