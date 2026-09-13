import { useRef } from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { CyberCard } from '../components/CyberCard';
import { useGsapFloatingOrbs, useGsapStaggerCards } from '../utils/gsapAnimations';

const FACULTY_MEMBERS = [
  {
    name: 'Dr. Pavan Kunchur',
    role: 'Faculty Coordinator',
    institution: 'KLS Gogte Institute of Technology',
    image: '/faculty/dr-pavan-kunchur.png',
  },
  {
    name: 'Prof. Pavan K. Korlahalli',
    role: 'Faculty Coordinator',
    institution: 'KLS Gogte Institute of Technology',
    image: '/faculty/prof-pavan-korlahalli.png',
  },
  {
    name: 'Prof. Prasad Mathapati',
    role: 'Faculty Coordinator',
    institution: 'KLS Gogte Institute of Technology',
    image: '/faculty/prof-prasad-mathapati.png',
  },
];

export function FacultySection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useGsapFloatingOrbs(sectionRef);
  useGsapStaggerCards(cardsRef, '.cyber-box', { y: 35, stagger: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="know-more"
      className="section"
      style={{
        background: 'linear-gradient(180deg, #0a0010 0%, #060010 50%, #080016 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0',
        scrollMarginTop: 80,
      }}
    >
      {/* Cyber Grid Background */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Glowing Orbs */}
      <div
        className="orb"
        style={{
          width: 580,
          height: 580,
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb"
        style={{
          width: 540,
          height: 540,
          bottom: '-12%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(232, 121, 249, 0.13) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb"
        style={{
          width: 420,
          height: 420,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <span className="eyebrow">Mentorship & Leadership</span>
          <h2
            className="font-syne"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Faculty <span className="grad-text">Coordinators</span>
          </h2>
          <p
            className="font-inter"
            style={{
              fontSize: 16,
              color: 'rgba(196, 181, 253, 0.72)',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Distinguished faculty members driving entrepreneurial guidance, innovation, and leadership at KLS Gogte Institute of Technology.
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 32,
            padding: '0 6px 12px 0',
          }}
        >
          {FACULTY_MEMBERS.map((faculty, idx) => (
            <CyberCard
              key={idx}
              className="faculty-cyber-card"
              style={{
                width: '100%',
                maxWidth: 340,
                minWidth: 'min(300px, 100%)',
                textAlign: 'left',
              }}
              innerStyle={{
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Portrait Stage */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 310,
                  overflow: 'hidden',
                  background: 'radial-gradient(ellipse at 50% 35%, rgba(139, 92, 246, 0.22) 0%, rgba(9, 2, 24, 0.6) 75%, transparent 100%)',
                  borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                {/* Tech halo glow behind portrait */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                    width: 210,
                    height: 210,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                    filter: 'blur(22px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* KLS GIT Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    zIndex: 3,
                    background: 'rgba(6, 0, 16, 0.82)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(167, 139, 250, 0.35)',
                    borderRadius: 20,
                    padding: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#a855f7',
                      boxShadow: '0 0 8px #a855f7',
                    }}
                  />
                  <span
                    className="font-grotesk"
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#e9d5ff',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    KLS GIT
                  </span>
                </div>

                {/* Faculty Cutout Photo */}
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  style={{
                    height: '100%',
                    width: 'auto',
                    maxHeight: 295,
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.65))',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="faculty-card-img"
                  loading="lazy"
                />

                {/* Bottom smooth dark blend */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 38,
                    background: 'linear-gradient(to top, rgba(9, 2, 24, 0.98), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Information */}
              <div
                style={{
                  padding: '24px 24px 28px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <div
                  className="font-grotesk"
                  style={{
                    fontSize: 12,
                    color: '#a78bfa',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    marginBottom: 8,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <GraduationCap size={15} color="#c084fc" />
                  <span>{faculty.role}</span>
                </div>

                <h3
                  className="font-syne"
                  style={{
                    fontSize: 21,
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: 8,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {faculty.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    color: 'rgba(196, 181, 253, 0.75)',
                    fontSize: 13.5,
                  }}
                  className="font-inter"
                >
                  <Award size={14} color="#a855f7" style={{ flexShrink: 0 }} />
                  <span>{faculty.institution}</span>
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>

      <style>{`
        .faculty-cyber-card:hover .faculty-card-img {
          transform: scale(1.05) translateY(-4px);
        }
      `}</style>
    </section>
  );
}

export default FacultySection;
