import { useEffect, useRef, useState } from 'react';
export function useInView(options = {}) {
  const { threshold = 0.12, rootMargin = '0px' } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => {
    return typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, threshold, rootMargin]);

  return [ref, visible];
}
