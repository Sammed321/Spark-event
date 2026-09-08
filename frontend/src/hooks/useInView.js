import { useEffect, useRef, useState } from 'react';
export function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);
  return [ref, visible];
}
