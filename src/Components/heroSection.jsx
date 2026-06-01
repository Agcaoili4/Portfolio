import { useEffect, useRef, useState } from 'react';
import { DottedSurface } from '@/Components/ui/dotted-surface-lazy';

const ACCENT_ROLES = ['backend-leaning full-stack', 'systems thinker', 'API craftsman'];
const EXPLOSION_IDS = ['sphere-1', 'sphere-2', 'sphere-3', 'sphere-4', 'sphere-5', 'float-1', 'float-2', 'float-3'];
const SPARK_OFFSETS = [
  { x: '-56px', y: '-26px', delay: '0ms' },
  { x: '-28px', y: '-54px', delay: '16ms' },
  { x: '8px', y: '-62px', delay: '32ms' },
  { x: '42px', y: '-40px', delay: '48ms' },
  { x: '62px', y: '-8px', delay: '64ms' },
  { x: '50px', y: '34px', delay: '80ms' },
  { x: '16px', y: '58px', delay: '96ms' },
  { x: '-22px', y: '54px', delay: '112ms' },
  { x: '-52px', y: '28px', delay: '128ms' },
  { x: '-64px', y: '-2px', delay: '144ms' },
];

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const frameRef = useRef(null);
  const explosionTimersRef = useRef({});
  const sceneBurstTimerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Refs for direct DOM style mutation (60fps without React renders)
  const cursorRef = useRef(null);
  const auroraOrb1Ref = useRef(null);
  const auroraOrb2Ref = useRef(null);
  const auroraOrb3Ref = useRef(null);
  const auroraOrb4Ref = useRef(null);
  const orbitSceneRef = useRef(null);
  const orbStateRef = useRef({ x: 0, y: 0 });

  const [accentIdx, setAccentIdx] = useState(0);
  const [accentVisible, setAccentVisible] = useState(true);
  const [sceneBurst, setSceneBurst] = useState(false);
  const [explosions, setExplosions] = useState(() =>
    EXPLOSION_IDS.reduce((acc, id) => ({ ...acc, [id]: false }), {})
  );

  useEffect(() => {
    const t = setTimeout(() => contentRef.current?.classList.add('visible'), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setAccentVisible(false);
      setTimeout(() => {
        setAccentIdx((i) => (i + 1) % ACCENT_ROLES.length);
        setAccentVisible(true);
      }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let visible = true;
    const animate = () => {
      const prev = orbStateRef.current;
      const nx = prev.x + (mouseRef.current.x - prev.x) * 0.06;
      const ny = prev.y + (mouseRef.current.y - prev.y) * 0.06;
      if (Math.abs(nx - prev.x) > 0.0001 || Math.abs(ny - prev.y) > 0.0001) {
        orbStateRef.current = { x: nx, y: ny };
        const o1 = auroraOrb1Ref.current;
        const o2 = auroraOrb2Ref.current;
        const o3 = auroraOrb3Ref.current;
        const o4 = auroraOrb4Ref.current;
        const scene = orbitSceneRef.current;
        if (o1) o1.style.transform = `translate(${nx * -32}px, ${ny * -22}px)`;
        if (o2) o2.style.transform = `translate(${nx * 24}px, ${ny * 28}px)`;
        if (o3) o3.style.transform = `translate(${nx * -14}px, ${ny * -18}px)`;
        if (o4) o4.style.transform = `translate(${nx * 20}px, ${ny * 14}px)`;
        if (scene) scene.style.transform = `rotateY(${nx * 12}deg) rotateX(${ny * -12}deg)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(section);

    const onVisibility = () => {
      if (document.hidden || !visible) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(explosionTimersRef.current).forEach((timer) => clearTimeout(timer));
      if (sceneBurstTimerRef.current) clearTimeout(sceneBurstTimerRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    const spotlight = cursorRef.current;
    if (spotlight) {
      spotlight.style.left = `${e.clientX - rect.left}px`;
      spotlight.style.top = `${e.clientY - rect.top}px`;
      spotlight.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
    const spotlight = cursorRef.current;
    if (spotlight) spotlight.style.opacity = '0';
  };

  const triggerExplosion = (id) => {
    if (explosionTimersRef.current[id]) clearTimeout(explosionTimersRef.current[id]);
    if (sceneBurstTimerRef.current) clearTimeout(sceneBurstTimerRef.current);

    setExplosions((prev) => ({ ...prev, [id]: true }));
    setSceneBurst(true);
    sceneBurstTimerRef.current = setTimeout(() => setSceneBurst(false), 280);
    explosionTimersRef.current[id] = setTimeout(() => {
      setExplosions((prev) => ({ ...prev, [id]: false }));
    }, 820);
  };

  const renderSparks = () =>
    (
      <>
        <span className="orbit-impact-core" />
        <span className="orbit-impact-ring" />
        {SPARK_OFFSETS.map((spark, idx) => (
          <span
            key={idx}
            className="orbit-spark"
            style={{ '--spark-x': spark.x, '--spark-y': spark.y, '--spark-delay': spark.delay }}
          />
        ))}
      </>
    );

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Cursor spotlight — mouse-driven via ref, no React state */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-999px',
          top: '-999px',
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, var(--cursor-spotlight) 0%, transparent 65%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Aurora background — mouse parallax via direct style writes in animate() */}
      <div className="aurora-bg" aria-hidden="true">
        <div ref={auroraOrb1Ref} className="aurora-orb aurora-orb-1" />
        <div ref={auroraOrb2Ref} className="aurora-orb aurora-orb-2" />
        <div ref={auroraOrb3Ref} className="aurora-orb aurora-orb-3" />
        <div ref={auroraOrb4Ref} className="aurora-orb aurora-orb-4" />
        <div className="aurora-noise" />
      </div>

      {/* 3D Dotted wave surface (21st.dev) */}
      <DottedSurface className="opacity-60" style={{ zIndex: 0 }} />

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
          ref={orbitSceneRef}
          className={`hero-orbit-scene${sceneBurst ? ' is-burst' : ''}`}
        >
          {/* Central glowing sphere */}
          <div className="orbit-core" />

          {/* Orbit ring 1 — horizontal */}
          <div className="orbit-ring orbit-ring-1">
            <button
              type="button"
              className={`orbit-object-btn orbit-sphere orbit-sphere-1${explosions['sphere-1'] ? ' is-exploding' : ''}`}
              onClick={() => triggerExplosion('sphere-1')}
              aria-label="Trigger orbit pulse effect"
            >
              {renderSparks()}
            </button>
            <button
              type="button"
              className={`orbit-object-btn orbit-sphere orbit-sphere-2${explosions['sphere-2'] ? ' is-exploding' : ''}`}
              onClick={() => triggerExplosion('sphere-2')}
              aria-label="Trigger orbit pulse effect"
            >
              {renderSparks()}
            </button>
          </div>

          {/* Orbit ring 2 — tilted */}
          <div className="orbit-ring orbit-ring-2">
            <button
              type="button"
              className={`orbit-object-btn orbit-sphere orbit-sphere-3${explosions['sphere-3'] ? ' is-exploding' : ''}`}
              onClick={() => triggerExplosion('sphere-3')}
              aria-label="Trigger orbit pulse effect"
            >
              {renderSparks()}
            </button>
            <button
              type="button"
              className={`orbit-object-btn orbit-sphere orbit-sphere-4${explosions['sphere-4'] ? ' is-exploding' : ''}`}
              onClick={() => triggerExplosion('sphere-4')}
              aria-label="Trigger orbit pulse effect"
            >
              {renderSparks()}
            </button>
          </div>

          {/* Orbit ring 3 — perpendicular */}
          <div className="orbit-ring orbit-ring-3">
            <button
              type="button"
              className={`orbit-object-btn orbit-sphere orbit-sphere-5${explosions['sphere-5'] ? ' is-exploding' : ''}`}
              onClick={() => triggerExplosion('sphere-5')}
              aria-label="Trigger orbit pulse effect"
            >
              {renderSparks()}
            </button>
          </div>

          {/* Floating abstract shapes */}
          <button
            type="button"
            className={`orbit-object-btn orbit-float orbit-float-1${explosions['float-1'] ? ' is-exploding' : ''}`}
            onClick={() => triggerExplosion('float-1')}
            aria-label="Trigger floating shape pulse effect"
          >
            {renderSparks()}
          </button>
          <button
            type="button"
            className={`orbit-object-btn orbit-float orbit-float-2${explosions['float-2'] ? ' is-exploding' : ''}`}
            onClick={() => triggerExplosion('float-2')}
            aria-label="Trigger floating shape pulse effect"
          >
            {renderSparks()}
          </button>
          <button
            type="button"
            className={`orbit-object-btn orbit-float orbit-float-3${explosions['float-3'] ? ' is-exploding' : ''}`}
            onClick={() => triggerExplosion('float-3')}
            aria-label="Trigger floating shape pulse effect"
          >
            {renderSparks()}
          </button>
        </div>
      </div>

      {/* Content — full width, left-aligned on desktop */}
      <div
        ref={contentRef}
        className="reveal relative flex flex-col items-center text-center px-6 w-full md:items-start md:text-left"
        style={{ maxWidth: '1200px', zIndex: 2 }}
      >
        {/* Name — the page's real H1 */}
        <h1 className="hero-name">Jansen Agcaoili</h1>

        {/* Role line — single, no rotation */}
        <p className="hero-role">
          Software Developer
          <span aria-hidden="true"> &mdash; </span>
          <span
            className={`hero-role__accent${accentVisible ? '' : ' is-fading'}`}
            aria-live="polite"
          >
            {ACCENT_ROLES[accentIdx]}
          </span>
        </p>

        {/* Tagline */}
        <p className="hero-tagline">
          I build resilient backends and the polished interfaces that sit on top of them.
        </p>

        {/* Location chip */}
        <div className="hero-location" aria-label="Based in Calgary, Alberta">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Calgary, AB</span>
        </div>

        {/* CTAs — primary solid + ghost */}
        <div className="hero-ctas">
          <a href="#projects" className="cta-primary">
            View work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/Jansen-Agcaoili-Resume.pdf"
            download
            className="cta-btn"
            aria-label="Download résumé as PDF"
          >
            Résumé
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
            </svg>
          </a>
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
