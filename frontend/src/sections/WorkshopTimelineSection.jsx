import { useInView } from '../hooks/useInView';

const SESSIONS = [
  { id: '01', title: 'Introduction', desc: 'Welcome & Ice Breaking Session' },
  { id: '02', title: 'What is Entrepreneurship', desc: 'Understanding the startup mindset.' },
  { id: '03', title: 'Team Formation', desc: 'Building the right team.' },
  { id: '04', title: 'Idea Generation & Problem Identification', desc: 'Finding real problems.' },
  { id: '05', title: 'Business Model Canvas Workshop', desc: 'Hands-on session on BMC.' },
  { id: '06', title: 'Finance for Entrepreneurs', desc: 'Basics of startup funding.' },
  { id: '07', title: 'Insights Into Startup Development', desc: 'Scaling and growth strategies.' },
  { id: '08', title: 'Pitching Workshop & Q&A', desc: 'Presenting your idea effectively.' },
];

export function WorkshopTimelineSection() {
  const [ref, inView] = useInView();

  return (
    <section id="timeline" className="section" style={{ background: '#0a0010', position: 'relative' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow">Agenda</span>
          <h2 className="font-syne" style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
            Workshop <span className="grad-text">Structure</span>
          </h2>
        </div>

        <div ref={ref} style={{
          display: 'flex', flexDirection: 'column', gap: 24,
          maxWidth: 800, margin: '0 auto',
        }}>
          {SESSIONS.map((session, index) => (
            <div key={session.id} className="glass glass-hover" style={{
              display: 'flex', alignItems: 'center', gap: 24, padding: '24px 32px',
              opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-24px)',
              transition: `all 0.5s ease ${index * 80}ms`
            }}>
              <div className="font-syne grad-text" style={{ fontSize: 36, fontWeight: 800, opacity: 0.8 }}>
                {session.id}
              </div>
              <div>
                <h3 className="font-grotesk" style={{ fontSize: 20, fontWeight: 600, color: '#e9d5ff', marginBottom: 4 }}>
                  {session.title}
                </h3>
                <p className="font-inter" style={{ fontSize: 15, color: 'rgba(196,181,253,0.7)' }}>
                  {session.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
