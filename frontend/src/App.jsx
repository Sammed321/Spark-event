import { useEffect, useState } from 'react';
import { bind, setVolume, setEnabled, play } from 'cuelume';
import { handleScrollSound, unlockScrollAudio } from './utils/scrollSound';
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
    // Initialize Cuelume Web Audio UI sound bindings
    bind();
    const savedSound = localStorage.getItem('cuelume_sound');
    const isEnabled = savedSound === null ? true : savedSound === 'true';
    setEnabled(isEnabled);
    setVolume(0.7);

    // Global first-gesture listener to unlock Web Audio on browsers (Chrome/Safari/Mobile)
    let activated = false;
    const handleFirstGesture = (e) => {
      unlockScrollAudio();

      const currentSaved = localStorage.getItem('cuelume_sound');
      const soundAllowed = currentSaved === null ? true : currentSaved === 'true';

      if (!activated && soundAllowed) {
        activated = true;
        // If user didn't click the mute toggle directly, play arrival sound
        const isToggleBtn = e?.target?.closest?.('button[aria-label*="Sound"]') || e?.target?.closest?.('button[title*="Sound"]');
        if (!isToggleBtn) {
          play('sparkle', { volume: 0.75 });
        }
      }

      window.removeEventListener('pointerdown', handleFirstGesture, true);
      window.removeEventListener('touchstart', handleFirstGesture, true);
      window.removeEventListener('keydown', handleFirstGesture, true);
      window.removeEventListener('click', handleFirstGesture, true);
    };

    window.addEventListener('pointerdown', handleFirstGesture, true);
    window.addEventListener('touchstart', handleFirstGesture, true);
    window.addEventListener('keydown', handleFirstGesture, true);
    window.addEventListener('click', handleFirstGesture, true);

    const handleScroll = () => {
      handleScrollSound(window.scrollY);
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
      window.removeEventListener('pointerdown', handleFirstGesture, true);
      window.removeEventListener('touchstart', handleFirstGesture, true);
      window.removeEventListener('keydown', handleFirstGesture, true);
      window.removeEventListener('click', handleFirstGesture, true);
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
          zIndex: 40,
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
