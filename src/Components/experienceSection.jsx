import { useEffect, useRef, useState } from 'react';
import enabledTalent from '../assets/enabledTalent.webp';

const experiences = [
  {
    company: 'Enabled Talent',
    role: 'Full Stack Developer',
    type: 'Co-op',
    period: 'Jan 2026 – Present',
    description:
      'Working on the development of a centralized dashboard for the Enabled Talent website, providing real-time insights with student profiles, application tracking, and analytics for streamlined recruitment management.',
    achievements: [
      'Led Backend Development: Designed and implemented RESTful APIs using Node.js and PostgreSQL, enabling seamless data flow between the dashboard and the database.',
      'Made significant contributions in keeping documentation in tracking with the evolving codebase, ensuring clarity and maintainability for future developers.',
      'Collaborated closely with the design team to create an intuitive and visually appealing user interface using React, TypeScript, and Tailwind CSS, resulting in a faster deployment cycle.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    accentColor: 'rgba(241, 99, 99, 0.12)',
    accentGlow: 'rgba(241, 99, 99, 0.25)',
    initBg: 'linear-gradient(135deg, #e96b6b, #ed3a3a)',
    image: enabledTalent,
  },
  {
    company: 'Another Company',
    initial: 'A',
    role: 'Junior Developer',
    type: 'Internship',
    period: 'May 2023 – Dec 2023',
    description:
      'Summarize what you worked on during this role. Mention the team size, tech environment, and any notable contributions you made.',
    achievements: [
      'Built and shipped X feature from design to production',
      'Reduced load time by Y% through optimization',
    ],
    tech: ['C#', '.NET', 'REST APIs', 'SQL Server'],
    accentColor: 'rgba(16,185,129,0.1)',
    accentGlow: 'rgba(16,185,129,0.22)',
    initBg: 'linear-gradient(135deg, #10b981, #059669)',
  },
];

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        padding: '2rem',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: hovered ? `0 0 40px ${exp.accentGlow}` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Hover gradient wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${exp.accentColor}, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          borderRadius: '1.25rem',
        }}
      />

      {/* Top row: company info + date badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          {exp.image ? (
            <img
              src={exp.enabledTalent}
              alt={`${exp.EnabledTalent} logo`}
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '0.75rem',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: '2.75rem',
                height: '2.75rem',
                borderRadius: '0.75rem',
                background: exp.initBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontFamily: 'Archivo, sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              {exp.initial}
            </div>
          )}

          {/* Company name + type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span
              style={{
                fontFamily: 'Archivo, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#fff',
                lineHeight: 1.2,
              }}
            >
              {exp.company}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#818cf8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {exp.type}
            </span>
          </div>
        </div>

        {/* Date badge */}
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 500,
            color: '#64748b',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '9999px',
            padding: '0.3rem 0.9rem',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {exp.period}
        </span>
      </div>

      {/* Role title */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
          }}
        >
          {exp.role}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          color: '#94a3b8',
          fontSize: '0.9rem',
          fontWeight: 300,
          lineHeight: 1.7,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {exp.description}
      </p>

      {/* Achievements */}
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          position: 'relative',
          zIndex: 1,
          paddingLeft: 0,
          listStyle: 'none',
        }}
      >
        {exp.achievements.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.625rem',
              color: '#cbd5e1',
              fontSize: '0.875rem',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                marginTop: '0.45rem',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#818cf8',
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          position: 'relative',
          zIndex: 1,
          marginTop: 'auto',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {exp.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: '0.25rem 0.7rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: 'rgba(255,255,255,0.06)',
              color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) headerRef.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden"
      style={{ padding: '8rem 1.5rem' }}
    >
      {/* Ambient glow */}
      <div
        className="glow-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'rgba(124,58,237,0.12)',
          top: '10%',
          right: '-10%',
        }}
      />

      <div style={{ maxWidth: '1152px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}
        >
          <h2 className="section-title">Experience</h2>
          <div style={{ height: '1px', width: '3.5rem', background: 'linear-gradient(to right, transparent, #6366f1, transparent)' }} />
          <p
            style={{
              color: '#94a3b8',
              fontSize: '1.125rem',
              fontWeight: 300,
              maxWidth: '32rem',
              lineHeight: 1.7,
            }}
          >
            Where I've worked and what I've built along the way.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
