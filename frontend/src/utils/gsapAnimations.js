import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate background glowing orbs with organic floating motion
 */
export function useGsapFloatingOrbs(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;
    const orbs = containerRef.current.querySelectorAll('.orb');
    if (!orbs.length) return;

    const tweens = [];
    orbs.forEach((orb, i) => {
      const xOffset = (i % 2 === 0 ? 1 : -1) * (25 + i * 15);
      const yOffset = (i % 2 === 0 ? -1 : 1) * (30 + i * 10);
      const duration = 5 + i * 2;

      const tween = gsap.to(orb, {
        x: xOffset,
        y: yOffset,
        rotation: (i % 2 === 0 ? 12 : -12),
        scale: 1.12,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach(t => t.kill());
    };
  }, [containerRef]);
}

/**
 * ScrollTrigger staggered entrance for cards
 */
export function useGsapStaggerCards(containerRef, cardSelector = '.cyber-box, .glass-card, .neon-card', options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(cardSelector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options.y ?? 45,
          scale: options.scale ?? 0.94,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: options.duration ?? 0.7,
          stagger: options.stagger ?? 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, cardSelector]);
}

/**
 * High-energy 3D tilt effect on mouse hover
 */
export function addCyberCardTilt(cardEl, maxTilt = 12) {
  if (!cardEl) return () => {};

  const handleMouseMove = (e) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    gsap.to(cardEl, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 900,
      scale: 1.025,
      duration: 0.25,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardEl, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  cardEl.addEventListener('mousemove', handleMouseMove);
  cardEl.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    cardEl.removeEventListener('mousemove', handleMouseMove);
    cardEl.removeEventListener('mouseleave', handleMouseLeave);
  };
}

export { gsap, ScrollTrigger };
