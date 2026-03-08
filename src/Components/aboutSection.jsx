import { useEffect, useRef } from 'react';

const skills = ['React', 'C#', 'PostgreSQL', 'TypeScript', 'Node.js', 'Tailwind CSS', '.NET', 'REST APIs'];

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '8+', label: 'Technologies' },
];

export const AboutSection = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ padding: '8rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Ambient glow */}
      <div className="glow-blob w-[500px] h-[500px] opacity-10 bg-indigo-600 -top-20 -left-20" />

      {/* Centered max-width wrapper */}
      <div style={{ maxWidth: '1152px', width: '100%', margin: '0 auto' }}>
        <div
          ref={ref}
          className="reveal"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Profile photo */}
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <div className="absolute -inset-4 rounded-full bg-indigo-600/15 blur-2xl" />
            <div
              style={{
                position: 'relative',
                width: '17rem',
                height: '17rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              aria-label="Profile photo placeholder"
            >
              {/* Rermember to replace with picture */}
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(79,70,229,0.4)" strokeWidth="1.2" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 className="section-title">About Me</h2>
              <div style={{ height: '1px', width: '3.5rem', background: 'linear-gradient(to right, #6366f1, transparent)' }} />
            </div>

            <p className="text-slate-400 text-lg font-light leading-[1.75]" style={{ maxWidth: '34rem' }}>
              A software developer dedicated to building robust and elegant digital solutions. I thrive on translating complex requirements into seamless, high-performance
              applications — always with a sharp focus on clean architecture and intuitive user experience.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: '22rem' }}>
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-card" style={{ textAlign: 'center' }}>
                  <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Archivo, sans-serif' }}>{value}</span>
                  <span className="text-slate-500 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
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
