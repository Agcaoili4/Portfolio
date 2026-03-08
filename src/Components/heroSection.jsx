import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => ref.current?.classList.add('visible'), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* ── Animated aurora background ── */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
        {/* Noise overlay for film grain texture */}
        <div className="aurora-noise" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="reveal relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-5xl w-full"
      >
        <p className="text-slate-500 text-xs font-semibold tracking-[0.28em] uppercase">
         AJ - Software Developer
        </p>
        <h1 className="hero-name">
          WELCOME
        </h1>

        <p className="text-slate-400 text-lg md:text-xl font-light max-w-md leading-relaxed">
          Building robust and elegant design along with secure and efficient code.
          I thrive with the challenge of tackling the unknown.
        </p>

        <div className="flex items-center gap-4 mt-4 flex-wrap justify-center">
          <a href="#projects" className="cta-btn">
            View My Work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="cta-accent">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  );
};
