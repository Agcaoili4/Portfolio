import { useEffect, useRef } from 'react';
import profileImg from '../assets/Profile.jpg';

const skills = ['React', 'C#', 'PostgreSQL', 'TypeScript', 'Node.js', 'Tailwind CSS', '.NET', 'REST APIs'];

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '8+', label: 'Technologies' },
];

const useReveal = (options = {}) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: options.threshold ?? 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

export const AboutSection = () => {
  const profileRef = useReveal();
  const bioRef = useReveal({ threshold: 0.15 });
  const skillsRef = useReveal({ threshold: 0.2 });

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden section-responsive"
      style={{ padding: '8rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Ambient glow */}
      <div
        className="glow-blob"
        style={{ width: '500px', height: '500px', background: 'var(--glow-blob-color)', top: '-5rem', left: '-5rem' }}
      />

      {/* Centered max-width wrapper */}
      <div style={{ maxWidth: '1152px', width: '100%', margin: '0 auto' }}>
        <div
          className="about-layout"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Profile photo — reveal from left */}
          <div ref={profileRef} className="reveal-left" style={{ flexShrink: 0, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-1rem',
                borderRadius: '9999px',
                background: 'var(--glow-blob-color)',
                filter: 'blur(24px)',
              }}
            />
            <div
              className="about-profile-ring"
              style={{
                position: 'relative',
                width: '17rem',
                height: '17rem',
                borderRadius: '9999px',
                border: '1px solid var(--profile-border)',
                background: 'var(--profile-bg)',
                overflow: 'hidden',
              }}
            >
              <img
                src={profileImg}
                alt="Jansen Agcaoili profile photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Bio — reveal from bottom */}
          <div ref={bioRef} className="reveal about-bio" style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 className="section-title">About Me</h2>
              <div style={{ height: '1px', width: '3.5rem', background: `linear-gradient(to right, var(--section-underline-from), transparent)` }} />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.75, maxWidth: '34rem' }}>
              A software developer dedicated to building robust and elegant digital solutions. I thrive on translating complex requirements into seamless, high-performance
              applications — always with a sharp focus on clean architecture and intuitive user experience.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: '22rem' }}>
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-card" style={{ textAlign: 'center' }}>
                  <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'Archivo, sans-serif' }}>{value}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Skills — staggered reveal */}
            <div ref={skillsRef} className="reveal-scale reveal-stagger skills-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {skills.map((skill) => (
                <span key={skill} className="skill-chip px-4 py-1.5 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
