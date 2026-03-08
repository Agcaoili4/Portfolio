import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    name: 'E-commerce Platform',
    desc: 'Scalable full-stack e-commerce with real-time inventory, advanced search, and secure payment integration.',
    tech: ['React', 'Node.js', 'MongoDB'],
    accentColor: 'rgba(99,102,241,0.08)',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    name: 'Analytics Dashboard',
    desc: 'Comprehensive dashboard for tracking metrics across platforms with interactive data visualizations.',
    tech: ['Vue.js', 'Express', 'PostgreSQL'],
    accentColor: 'rgba(16,185,129,0.08)',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    name: 'Task Management App',
    desc: 'Intuitive productivity app with drag-and-drop Kanban boards, real-time collaboration, and automated reminders.',
    tech: ['React Native', 'Firebase', 'Tailwind'],
    accentColor: 'rgba(244,63,94,0.08)',
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
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
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transitionDelay: `${index * 80}ms`,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s ease, background 0.3s ease',
        borderColor: hovered ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Hover gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${project.accentColor}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '1rem',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '0.75rem',
          background: hovered ? 'rgba(79,70,229,0.18)' : 'rgba(79,70,229,0.08)',
          color: '#818cf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          transition: 'background 0.3s ease',
        }}
      >
        {project.icon}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#fff', lineHeight: 1.3 }}>
          {project.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>
          {project.desc}
        </p>
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: '0.25rem 0.625rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: 'rgba(255,255,255,0.07)',
              color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
        <a
          href="#"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: hovered ? '#818cf8' : '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            textDecoration: 'none',
          }}
          aria-label={`View ${project.name}`}
        >
          View Project
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
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
      id="projects"
      className="w-full"
      style={{ padding: '8rem 1.5rem' }}
    >
      <div style={{ maxWidth: '1152px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.125rem', fontWeight: 300, maxWidth: '32rem', lineHeight: 1.7 }}>
            A selection of my recent work, focused on scalable solutions and intuitive user experiences.
          </p>
        </div>

        {/* Responsive grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
