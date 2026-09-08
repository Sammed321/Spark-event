import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { WorkshopIntroSection } from './sections/WorkshopIntroSection';
import { WorkshopTimelineSection } from './sections/WorkshopTimelineSection';
import { RegistrationSection } from './sections/RegistrationSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Dynamic Cursor Ambient Spotlight */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 99,
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(168, 85, 247, 0.08), transparent 80%)`,
          transition: 'background 0.05s ease-out',
        }}
      />

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkshopIntroSection />
        <WorkshopTimelineSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
