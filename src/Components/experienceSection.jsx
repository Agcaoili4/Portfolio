import { useEffect, useRef, useState } from 'react';
import enabledTalent from '../assets/enabledTalent.webp';
import affinityMentorship from '../assets/affinityMentorship.webp';
import goodlife from '../assets/goodlife.png';

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
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vite', 'Render'],
    accentColor: 'rgba(241, 99, 99, 0.12)',
    accentGlow: 'rgba(241, 99, 99, 0.25)',
    initBg: 'linear-gradient(135deg, #e96b6b, #ed3a3a)',
    image: enabledTalent,
  },
  {
    company: 'GoodLife Fitness',
    role: 'Personal Trainer',
    type: 'Part-time',
    period: 'Mar 2025 - Present',
    description:
      'Working on a professional environment together with a team of fitness experts to provide personalized training programs, dedicated to their needs and goals. ',
    achievements: [
      'Delivered structured personal training programs while maintaining strong client retention and satisfaction.',
      'Maintained strong communication with clients and management while balancing professional responsibilities with being a software developer.',
      'Evaluated training programs through goal analysis, progress tracking, and clear communication to improve client outcomes.',
    ],
    tech: ['Client Interaction', 'Program Design', 'Fitness Assessment', 'Motivational Coaching'],
    accentColor: 'rgba(255, 1, 1, 0.1)',
    accentGlow: 'rgba(255, 57, 57, 0.22)',
    initBg: 'linear-gradient(135deg, #ec5757, #ff0000)',
    image: goodlife,
  },
  {
    company: 'Affinity Mentorship Foundation',
    role: 'Web Developer/UI/UX Designer',
    type: 'Volunteer',
    period: 'Sept 2024 - Feb 2025',
    description:
      'Redesign and organized the Affinity Mentorship Foundation website to enhance user experience and accessibility, resulting in a more engaging platform for connecting mentors and mentees.',
    achievements: [
      'Built and shipped Led 80% of website redesign using Figma, CSS, HTML, JavaScript, and Squarespace. feature from design to production',
      'Improved site usability and navigation, resulting in positive feedback from board members and increased engagement.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Squarespace'],
    accentColor: 'rgba(229, 229, 229, 0.1)',
    accentGlow: 'rgba(151, 151, 151, 0.22)',
    initBg: 'linear-gradient(135deg, #d7d7d7, #a9abab)',
    image: affinityMentorship,
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
      className="reveal exp-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        padding: '2rem',
        background: 'var(--bg-card)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease, background 0.35s ease',
        boxShadow: hovered ? `var(--card-hover-shadow), 0 0 40px ${exp.accentGlow}` : 'var(--card-shadow)',
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
          opacity: hovered ? 'var(--exp-accent-wash-opacity)' : 0,
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
              src={exp.image}
              alt={`${exp.company} logo`}
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
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              {exp.company}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--text-accent-mid)',
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
            color: 'var(--text-muted)',
            background: 'var(--date-bg)',
            border: '1px solid var(--date-border)',
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
            color: 'var(--text)',
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
          color: 'var(--text-secondary)',
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
              color: 'var(--tech-text)',
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
                background: 'var(--text-accent-mid)',
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
          borderTop: '1px solid var(--divider)',
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
              background: 'var(--tech-bg)',
              color: 'var(--tech-text)',
              border: '1px solid var(--tech-border)',
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
      className="relative w-full overflow-hidden section-responsive"
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
          <div style={{ height: '1px', width: '3.5rem', background: `linear-gradient(to right, transparent, var(--section-underline-from), transparent)` }} />
          <p
            style={{
              color: 'var(--text-secondary)',
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
          className="exp-grid"
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
