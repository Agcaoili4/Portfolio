import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('in'); // 'in' | 'exit'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    //Animate progress bar
    const start = performance.now();
    const duration = 2000;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    //Minimum display time + wait for page load
    const minDelay = new Promise((res) => setTimeout(res, 2200));
    const pageLoad = new Promise((res) => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', res, { once: true });
    });

    Promise.all([minDelay, pageLoad]).then(() => {
      setPhase('exit');
      setTimeout(onDone, 650);
    });
  }, [onDone]);

  return (
    <div
      aria-live="polite"
      aria-label="Loading portfolio"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.015)' : 'scale(1)',
        transition: 'opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Background grid */}
      <div className="loader-grid" aria-hidden="true" />

      {/* Center mark */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer spinning ring */}
        <div className="loader-ring-outer" aria-hidden="true" />
        {/* Inner pulsing ring */}
        <div className="loader-ring-inner" aria-hidden="true" />

        {/* Initials */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))',
            border: '1px solid rgba(79,70,229,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 900,
              fontSize: '1.75rem',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #fff 30%, rgba(165,180,252,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            J
          </span>
        </div>
      </div>

      {/* Name */}
      <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <span
          className="loader-name"
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          Jansen
        </span>
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(148,163,184,0.5)',
          }}
        >
          Portfolio
        </span>
      </div>

      {/* Progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(280px, 60vw)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              borderRadius: '9999px',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 8px rgba(79,70,229,0.6)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            color: 'rgba(148,163,184,0.35)',
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
};
