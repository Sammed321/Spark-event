import { useRef } from 'react';
import { GraduationCap, Award, Crown, ShieldCheck, Code2, Terminal, Palette } from 'lucide-react';
import { CyberCard } from '../components/CyberCard';
import { useGsapFloatingOrbs, useGsapStaggerCards } from '../utils/gsapAnimations';

function LinkedinIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 1 0 1.63-1.63Z" />
    </svg>
  );
}

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

const STUDENT_LEADERS = [
  {
    name: 'Shrihari Chikkodikar',
    role: 'President',
    institution: 'KLS Gogte Institute of Technology',
    image: '/team/shrihari-chikkodikar.png',
    Icon: Crown,
    badgeColor: '#e879f9',
  },
  {
    name: 'Shirish Koratti',
    role: 'Vice President',
    institution: 'KLS Gogte Institute of Technology',
    image: '/team/shirish-koratti.png',
    Icon: ShieldCheck,
    badgeColor: '#a855f7',
  },
];

const TECH_TEAM = [
  {
    name: 'Rishab Chavadar',
    role: 'Tech & Web Lead',
    specialization: 'Backend Developer',
    institution: 'KLS Gogte Institute of Technology',
    image: '/team/rishab-chavadar.png',
    Icon: Terminal,
    accent: '#38bdf8',
    scale: 1.15,
    translateY: '2px',
    linkedin: 'https://www.linkedin.com/in/rishabchavadar20060413/',
  },
  {
    name: 'Sammed Patil',
    role: 'Tech & Web Member',
    specialization: 'Frontend Developer',
    institution: 'KLS Gogte Institute of Technology',
    image: '/team/sammed-patil.png',
    Icon: Code2,
    accent: '#a78bfa',
    scale: 1.24,
    translateY: '6px',
    linkedin: 'https://www.linkedin.com/in/sammed-patil-071752381?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Raghavendra Patil',
    role: 'Tech & Web Member',
    specialization: 'UI/UX Designer',
    institution: 'KLS Gogte Institute of Technology',
    image: '/team/raghavendra-patil.png',
    Icon: Palette,
    accent: '#e879f9',
    scale: 1,
    translateY: '0px',
    linkedin: 'https://www.linkedin.com/in/raghavendra-patil-651a26339?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
];

export function FacultySection() {
  const sectionRef = useRef(null);
  const facultyCardsRef = useRef(null);
  const leadershipCardsRef = useRef(null);
  const techCardsRef = useRef(null);

  useGsapFloatingOrbs(sectionRef);
  useGsapStaggerCards(facultyCardsRef, '.cyber-box', { y: 35, stagger: 0.12 });
  useGsapStaggerCards(leadershipCardsRef, '.cyber-box', { y: 35, stagger: 0.12 });
  useGsapStaggerCards(techCardsRef, '.cyber-box', { y: 35, stagger: 0.12 });

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
          width: 600,
          height: 600,
          top: '-8%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb"
        style={{
          width: 560,
          height: 560,
          bottom: '-10%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(232, 121, 249, 0.14) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb"
        style={{
          width: 450,
          height: 450,
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="orb"
        style={{
          width: 480,
          height: 480,
          top: '72%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        
        {/* =================================================== */}
        {/* 1. FACULTY COORDINATORS                             */}
        {/* =================================================== */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
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
          ref={facultyCardsRef}
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

                <img
                  src={faculty.image}
                  alt={faculty.name}
                  style={{
                    height: '100%',
                    width: 'auto',
                    maxHeight: 295,
                    maxWidth: '92%',
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

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: 500,
            height: 1,
            margin: '80px auto',
            background: 'linear-gradient(to right, transparent, rgba(167, 139, 250, 0.35), transparent)',
          }}
          aria-hidden="true"
        />

        {/* =================================================== */}
        {/* 2. STUDENT LEADERSHIP                               */}
        {/* =================================================== */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="eyebrow">Student Leadership</span>
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
            Student <span className="grad-text">Coordinators</span>
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
            Student executive leadership spearheading event strategy, coordination, and university outreach for Illuminate.
          </p>
        </div>

        {/* Student Leaders Cards (2 items centered) */}
        <div
          ref={leadershipCardsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 32,
            padding: '0 6px 12px 0',
          }}
        >
          {STUDENT_LEADERS.map((leader, idx) => {
            const LeaderIcon = leader.Icon;
            return (
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
                  <div
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '50%',
                      transform: 'translate(-50%, -30%)',
                      width: 210,
                      height: 210,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${leader.badgeColor}33 0%, transparent 70%)`,
                      filter: 'blur(22px)',
                      pointerEvents: 'none',
                    }}
                  />

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
                        background: leader.badgeColor,
                        boxShadow: `0 0 8px ${leader.badgeColor}`,
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

                  <img
                    src={leader.image}
                    alt={leader.name}
                    style={{
                      height: '100%',
                      width: 'auto',
                      maxHeight: 295,
                      maxWidth: '92%',
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
                      color: leader.badgeColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      marginBottom: 8,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <LeaderIcon size={15} color={leader.badgeColor} />
                    <span>{leader.role}</span>
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
                    {leader.name}
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
                    <span>{leader.institution}</span>
                  </div>
                </div>
              </CyberCard>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: 500,
            height: 1,
            margin: '80px auto',
            background: 'linear-gradient(to right, transparent, rgba(167, 139, 250, 0.35), transparent)',
          }}
          aria-hidden="true"
        />

        {/* =================================================== */}
        {/* 3. TECH TEAM (SPECIAL TECH & WEB SECTION)           */}
        {/* =================================================== */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="eyebrow">Tech & Web</span>
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
            Tech <span className="grad-text">Team</span>
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
            The engineering, architecture, and design team behind the Illuminate digital platform and web systems.
          </p>
        </div>

        {/* Tech Team Cards (3 items) */}
        <div
          ref={techCardsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 32,
            padding: '0 6px 12px 0',
          }}
        >
          {TECH_TEAM.map((member, idx) => {
            const TechIcon = member.Icon;
            return (
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
                  <div
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '50%',
                      transform: 'translate(-50%, -30%)',
                      width: 210,
                      height: 210,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${member.accent}33 0%, transparent 70%)`,
                      filter: 'blur(22px)',
                      pointerEvents: 'none',
                    }}
                  />

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
                        background: member.accent,
                        boxShadow: `0 0 8px ${member.accent}`,
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

                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      height: '100%',
                      width: 'auto',
                      maxHeight: 295,
                      maxWidth: member.scale ? `${Math.round(92 * member.scale)}%` : '92%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                      position: 'relative',
                      zIndex: 1,
                      filter: 'drop-shadow(0 10px 22px rgba(0,0,0,0.65))',
                      transform: `scale(${member.scale || 1}) translateY(${member.translateY || '0px'})`,
                      transformOrigin: 'bottom center',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      '--base-scale': member.scale || 1,
                      '--base-ty': member.translateY || '0px',
                    }}
                    className="faculty-card-img"
                    loading="lazy"
                  />

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
                  {/* Primary Role */}
                  <div
                    className="font-grotesk"
                    style={{
                      fontSize: 12,
                      color: member.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      marginBottom: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <TechIcon size={15} color={member.accent} />
                    <span>{member.role}</span>
                  </div>

                  {/* Name */}
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
                    {member.name}
                  </h3>

                  {/* Specialization Pill Badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(124, 58, 237, 0.16)',
                      border: '1px solid rgba(167, 139, 250, 0.3)',
                      borderRadius: 20,
                      padding: '4px 14px',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: member.accent,
                        boxShadow: `0 0 6px ${member.accent}`,
                      }}
                    />
                    <span
                      className="font-grotesk"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#f1ebfc',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {member.specialization}
                    </span>
                  </div>

                  {/* Institution */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      color: 'rgba(196, 181, 253, 0.75)',
                      fontSize: 13,
                    }}
                    className="font-inter"
                  >
                    <Award size={14} color="#a855f7" style={{ flexShrink: 0 }} />
                    <span>{member.institution}</span>
                  </div>

                  {/* LinkedIn Connect Button */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cuelume-hover="tick"
                      data-cuelume-press="tick"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 7,
                        marginTop: 14,
                        padding: '6px 14px',
                        borderRadius: 20,
                        background: 'rgba(124, 58, 237, 0.16)',
                        border: '1px solid rgba(167, 139, 250, 0.32)',
                        color: '#e9d5ff',
                        textDecoration: 'none',
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: 'Space Grotesk, sans-serif',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(124, 58, 237, 0.35)';
                        e.currentTarget.style.borderColor = '#c084fc';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.boxShadow = '0 0 14px rgba(168, 85, 247, 0.4)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(124, 58, 237, 0.16)';
                        e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.32)';
                        e.currentTarget.style.color = '#e9d5ff';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <LinkedinIcon size={14} color="#38bdf8" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </CyberCard>
            );
          })}
        </div>
      </div>

      <style>{`
        .faculty-card-img {
          transform-origin: bottom center;
        }
        .faculty-cyber-card:hover .faculty-card-img {
          transform: scale(calc(var(--base-scale, 1) * 1.05)) translateY(calc(var(--base-ty, 0px) - 4px)) !important;
        }
      `}</style>
    </section>
  );
}

export default FacultySection;
