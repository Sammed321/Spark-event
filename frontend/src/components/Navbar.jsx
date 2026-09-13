import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { play, setEnabled } from 'cuelume';
import { useScrolled } from '../hooks/useScrolled';
import { unlockScrollAudio } from '../utils/scrollSound';

const LINKS = [
  { label: 'Home',      id: 'home' },
  { label: 'About',     id: 'about' },
  { label: 'Workshop',  id: 'workshop' },
  { label: 'Structure', id: 'timeline' },
  { label: 'Know more', id: 'know-more' },
  { label: 'Contact',   id: 'contact' },
];

const goto = id => {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 68;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('cuelume_sound');
    return saved === null ? true : saved === 'true';
  });

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setEnabled(next);
    localStorage.setItem('cuelume_sound', String(next));
    if (next) {
      unlockScrollAudio();
      play('sparkle', { volume: 0.9 });
    }
  };

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const scrollPosition = window.scrollY + 140;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + window.scrollY >= documentHeight - 60) {
        setActive(LINKS[LINKS.length - 1].id);
        return;
      }

      for (let i = LINKS.length - 1; i >= 0; i--) {
        const link = LINKS[i];
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActive(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const click = id => {
    setActive(id);
    setOpen(false);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => goto(id), 120);
    } else {
      setTimeout(() => goto(id), 40);
    }
  };

  const handleRegisterClick = () => {
    setOpen(false);
    navigate('/register');
  };

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

          {/* Brand & Institution Logos */}
          <div
            onClick={() => click('home')}
            data-cuelume-hover="tick"
            data-cuelume-press="press"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              userSelect: 'none',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') click('home'); }}
            aria-label="Illuminate Home"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* KLS Logo with Estd. 1939 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img
                  src="/kls-logo.png"
                  alt="Karnataka Law Society"
                  title="Karnataka Law Society (KLS)"
                  style={{
                    height: 'clamp(28px, 3.6vw, 36px)',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                  }}
                  className="hover-scale"
                />
                <span
                  className="font-grotesk"
                  style={{
                    fontSize: 'clamp(9px, 1.1vw, 10.5px)',
                    fontWeight: 600,
                    color: '#c4b5fd',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Estd. 1939
                </span>
              </div>

              {/* GIT Logo with Estd. 1979 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <img
                  src="/git-logo.png"
                  alt="KLS Gogte Institute of Technology"
                  title="KLS Gogte Institute of Technology (GIT)"
                  style={{
                    height: 'clamp(28px, 3.6vw, 36px)',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
                  }}
                  className="hover-scale"
                />
                <span
                  className="font-grotesk"
                  style={{
                    fontSize: 'clamp(9px, 1.1vw, 10.5px)',
                    fontWeight: 600,
                    color: '#c4b5fd',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  Estd. 1979
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div
              style={{
                width: 1,
                height: 28,
                background: 'linear-gradient(to bottom, transparent, rgba(167, 139, 250, 0.4), transparent)',
              }}
              aria-hidden="true"
            />

            <img
              src="/logo2.png"
              alt="Illuminate logo"
              style={{
                height: 'clamp(38px, 5.5vw, 48px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 10px rgba(139,92,246,0.3))',
              }}
            />
          </div>

          {/* Desktop Nav */}
          <nav style={{ display:'flex', alignItems:'center', gap: 4 }} className="hidden-mobile">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => click(l.id)}
                data-cuelume-hover="tick"
                data-cuelume-press="tick"
                style={{
                  background: active === l.id ? 'rgba(124,58,237,.22)' : 'transparent',
                  border: active === l.id ? '1px solid rgba(167,139,250,.35)' : '1px solid transparent',
                  boxShadow: active === l.id ? '0 0 14px rgba(124,58,237,.25)' : 'none',
                  cursor: 'pointer',
                  padding: '8px 16px', borderRadius: 10,
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 14,
                  color: active === l.id ? '#e9d5ff' : 'rgba(196,181,253,.7)',
                  transition: 'all .2s ease',
                }}
                onMouseEnter={e => { if (active !== l.id) e.target.style.color = '#e9d5ff'; }}
                onMouseLeave={e => { if (active !== l.id) e.target.style.color = 'rgba(196,181,253,.7)'; }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Controls: Audio Toggle + CTA + Hamburger */}
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              style={{
                background: soundEnabled ? 'rgba(124,58,237,.2)' : 'rgba(255,255,255,.05)',
                border: soundEnabled ? '1px solid rgba(167,139,250,.35)' : '1px solid rgba(255,255,255,.12)',
                borderRadius: 10,
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: soundEnabled ? '#e879f9' : 'rgba(196,181,253,.4)',
                transition: 'all .25s ease',
                boxShadow: soundEnabled ? '0 0 16px rgba(168,85,247,0.25)' : 'none',
              }}
              title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
              aria-label={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            <button
              className="btn btn-primary btn-sm hidden-mobile"
              onClick={handleRegisterClick}
              data-cuelume-hover="tick"
              data-cuelume-press="pulse"
            >
              Register Now
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              data-cuelume-press="toggle"
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
              <button
                key={l.id}
                onClick={() => click(l.id)}
                data-cuelume-hover="tick"
                data-cuelume-press="tick"
                style={{
                  background: active === l.id ? 'rgba(124,58,237,.2)' : 'transparent',
                  border: active === l.id ? '1px solid rgba(139,92,246,.3)' : '1px solid transparent',
                  borderRadius: 12, padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 15,
                  color: active === l.id ? '#e9d5ff' : 'rgba(196,181,253,.75)',
                  transition: 'all .2s',
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            className="btn btn-primary btn-md"
            style={{ marginTop: 24 }}
            onClick={handleRegisterClick}
            data-cuelume-hover="tick"
            data-cuelume-press="pulse"
          >
            Register Now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile-flex { display: flex !important; } }
        @media (min-width: 768px) { .show-mobile-flex { display: none !important; } }
        .hover-scale { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-scale:hover { transform: scale(1.08); }
      `}</style>
    </>
  );
}
