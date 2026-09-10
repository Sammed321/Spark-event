import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { CyberCard } from '../components/CyberCard';

const INTERVAL_MS = 750;

const SESSIONS = [
  { 
    id: '01', 
    title: 'Introduction', 
    desc: 'Welcome & Ice Breaking Session — set expectations, format overview, and meet fellow changemakers.' 
  },
  { 
    id: '02', 
    title: 'What is Entrepreneurship', 
    desc: 'Understanding the startup mindset, key opportunities, industry disruption, and taking calculated risks.' 
  },
  { 
    id: '03', 
    title: 'Team Formation', 
    desc: 'Building high-performance, multidisciplinary co-founding teams and identifying core complementary skills.' 
  },
  { 
    id: '04', 
    title: 'Idea Generation & Problem Identification', 
    desc: 'Discovering pressing real-world problems, market validation techniques, and ideating scalable solutions.' 
  },
  { 
    id: '05', 
    title: 'Business Model Canvas Workshop', 
    desc: 'Hands-on BMC sprint mapping value propositions, customer segments, distribution channels, and revenue streams.' 
  },
  { 
    id: '06', 
    title: 'Finance for Entrepreneurs', 
    desc: 'Demystifying unit economics, cash runway, pricing models, valuation basics, and modern startup funding.' 
  },
  { 
    id: '07', 
    title: 'Insights Into Startup Development', 
    desc: 'Actionable strategies for early user acquisition, product-market fit, sustainable traction, and scaling.' 
  },
  { 
    id: '08', 
    title: 'Pitching Workshop & Q&A', 
    desc: 'Mastering high-impact elevator pitches, compelling storytelling for investors, mentor feedback, and open Q&A.' 
  },
];

export function WorkshopTimelineSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [visibleCount, setVisibleCount] = useState(0);

  // When the section comes into view, trigger the sequential 1.5s entrance
  useEffect(() => {
    if (!inView) return;

    // Initial card entrance
    const initialTimer = setTimeout(() => {
      setVisibleCount(1);
    }, 60);

    const intervalTimer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < SESSIONS.length) {
          return prev + 1;
        }
        clearInterval(intervalTimer);
        return prev;
      });
    }, INTERVAL_MS);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [inView]);

  return (
    <section id="timeline" className="section" style={{ background: '#0a0010', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />
      
      {/* Background ambient glow */}
      <div className="orb" style={{
        width: 650, height: 650, top: '25%', left: '50%', transform: 'translate(-50%, -20%)',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Agenda</span>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
            Workshop <span className="grad-text">Structure</span>
          </h2>
          <p className="font-inter" style={{ fontSize: 16, color: 'rgba(196,181,253,.65)', maxWidth: 620, margin: '14px auto 0', lineHeight: 1.75 }}>
            A meticulously structured full-day agenda designed to take you from foundational ideation to an investor-ready pitch.
          </p>
        </div>

        {/* Sessions List with Alternating Left/Right Professional Entry */}
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            maxWidth: 820,
            margin: '0 auto',
            padding: '0 10px 10px 0',
          }}
        >
          {SESSIONS.map((session, index) => {
            const isVisible = index < visibleCount;
            // Alternating entry: even index (0, 2, 4, 6) from LEFT, odd index (1, 3, 5, 7) from RIGHT
            const isFromLeft = index % 2 === 0;
            const initialTransform = isFromLeft ? 'translateX(-80px)' : 'translateX(80px)';

            return (
              <div
                key={session.id}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : initialTransform,
                  filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                  transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                <CyberCard
                  className="compact-cyber-card"
                  innerStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                    padding: '18px 36px 18px 24px',
                    textAlign: 'left',
                  }}
                >
                  {/* Number Badge Column: Left side directly beside words */}
                  <div
                    style={{
                      width: 44,
                      minWidth: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(124, 58, 237, 0.14)',
                      border: '1px solid rgba(167, 139, 250, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 3px 12px rgba(124, 58, 237, 0.18)',
                    }}
                  >
                    <span
                      className="font-syne grad-text"
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {session.id}
                    </span>
                  </div>

                  {/* Text Content Column: Perfectly aligned beside the number */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      paddingRight: 12,
                    }}
                  >
                    <h3
                      className="font-grotesk"
                      style={{
                        fontSize: 'clamp(14.5px, 1.8vw, 16.5px)',
                        fontWeight: 600,
                        color: '#f1ebfc',
                        lineHeight: 1.25,
                        margin: '0 0 2px 0',
                        textAlign: 'left',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {session.title}
                    </h3>

                    <p
                      className="font-inter"
                      style={{
                        fontSize: 'clamp(12px, 1.3vw, 13px)',
                        color: 'rgba(196, 181, 253, 0.72)',
                        lineHeight: 1.45,
                        margin: 0,
                        textAlign: 'left',
                      }}
                    >
                      {session.desc}
                    </p>
                  </div>
                </CyberCard>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
