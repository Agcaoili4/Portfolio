import { useEffect, useRef, useState } from 'react';

const ROLES = ['Software Developer', 'Full Stack Engineer', 'Creative Problem Solver'];

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [orb, setOrb] = useState({ x: 0, y: 0 });
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const t = setTimeout(() => contentRef.current?.classList.add('visible'), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 380);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const animate = () => {
      setOrb((prev) => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.06,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.06,
      }));
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
    setCursor({ x: -999, y: -999 });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: cursor.x,
          top: cursor.y,
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, var(--cursor-spotlight) 0%, transparent 65%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: cursor.x === -999 ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Aurora background with mouse parallax */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-orb aurora-orb-1" style={{ transform: `translate(${orb.x * -32}px, ${orb.y * -22}px)` }} />
        <div className="aurora-orb aurora-orb-2" style={{ transform: `translate(${orb.x * 24}px, ${orb.y * 28}px)` }} />
        <div className="aurora-orb aurora-orb-3" style={{ transform: `translate(${orb.x * -14}px, ${orb.y * -18}px)` }} />
        <div className="aurora-orb aurora-orb-4" style={{ transform: `translate(${orb.x * 20}px, ${orb.y * 14}px)` }} />
        <div className="aurora-noise" />
      </div>

      {/* Subtle dot-grid overlay */}
      <div className="hero-grid" aria-hidden="true" />

      {/* 3D Orbital scene — absolutely positioned right side */}
      <div
        className="hero-orbit-wrapper"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 8vw, 10rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <div
          className="hero-orbit-scene"
          style={{
            transform: `rotateY(${orb.x * 12}deg) rotateX(${orb.y * -12}deg)`,
          }}
        >
          {/* Central glowing sphere */}
          <div className="orbit-core" />

          {/* Orbit ring 1 — horizontal */}
          <div className="orbit-ring orbit-ring-1">
            <div className="orbit-sphere orbit-sphere-1" />
            <div className="orbit-sphere orbit-sphere-2" />
          </div>

          {/* Orbit ring 2 — tilted */}
          <div className="orbit-ring orbit-ring-2">
            <div className="orbit-sphere orbit-sphere-3" />
            <div className="orbit-sphere orbit-sphere-4" />
          </div>

          {/* Orbit ring 3 — perpendicular */}
          <div className="orbit-ring orbit-ring-3">
            <div className="orbit-sphere orbit-sphere-5" />
          </div>

          {/* Floating abstract shapes */}
          <div className="orbit-float orbit-float-1" />
          <div className="orbit-float orbit-float-2" />
          <div className="orbit-float orbit-float-3" />
        </div>
      </div>

      {/* Content — full width, left-aligned on desktop */}
      <div
        ref={contentRef}
        className="reveal relative flex flex-col items-center text-center gap-6 px-6 w-full md:items-start md:text-left"
        style={{ maxWidth: '1200px', zIndex: 2 }}
      >
        {/* Status badge link */}
        <a
          href="https://www.linkedin.com/in/jansen-agcaoili/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Jansen's LinkedIn profile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--badge-bg)',
            border: '1px solid var(--badge-border)',
            borderRadius: '9999px',
            padding: '0.35rem 1rem',
            textDecoration: 'none',
          }}
        >
          <span className="hero-dot-pulse" />
          <span
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--badge-text)',
            }}
          >
            AJ &mdash; Available for work
          </span>
        </a>

        {/* Hero name */}
        <h1 className="hero-name">WELCOME</h1>

        {/* Typewriter role */}
        <div style={{ height: '1.8rem', display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: 500,
              color: 'var(--text-accent)',
              letterSpacing: '0.02em',
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? 'translateY(0)' : 'translateY(5px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {ROLES[roleIdx]}
          </p>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            fontWeight: 300,
            maxWidth: '34rem',
            lineHeight: 1.8,
          }}
        >
          Building robust and elegant design along with secure and efficient code.
          I thrive with the challenge of tackling the unknown.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
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

        {/* Faint tech tags */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '0.75rem',
            opacity: 0.55,
          }}
        >
          {['React', 'TypeScript', 'Node.js', 'C#', 'PostgreSQL'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--tag-text)',
                background: 'var(--tag-bg)',
                border: '1px solid var(--tag-border)',
                borderRadius: '0.375rem',
                padding: '0.2rem 0.55rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        aria-hidden="true"
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <span />
      </div>
    </section>
  );
};
