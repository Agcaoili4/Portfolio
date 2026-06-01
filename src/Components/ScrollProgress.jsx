import { useEffect, useRef } from 'react';

export const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    compute();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden="true" className="scroll-progress-track">
      <div ref={barRef} className="scroll-progress-bar" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
};
