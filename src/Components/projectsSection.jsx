import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    icon: (
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>
    ),
    name: 'Enabled Talent Dashboard',
    desc: 'Centralized Dashboard built for Enabled Talent Website. Provides real-time insights with student profiles, application tracking, and analytics for streamlined recruitment management.',
    tech: ['TypeScript', 'Vite', 'Node.js', 'PostgreSQL'],
    accentColor: 'rgba(99,102,241,0.08)',
    link: 'https://github.com/TyLandry/Enabled-Talent-Career-Centre-Dashboard',
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
    link: '#',
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
    link: '#',
  },
      {
    icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
    </svg>
    ),
    name: 'Memory Battle',
    desc: 'A game where players match pairs of cards to improve their memory. The game features multiple levels of difficulty, a timer, and a scoring system to track progress. It also has its own pvp and PvAI modes.',
    tech: ['C#', '.NET framework' ,'SQL Server'],
    accentColor: 'rgba(244,63,94,0.08)',
    link: '#',
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
        background: 'var(--bg-card)',
        border: '1px solid',
        borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
        boxShadow: hovered ? 'var(--card-hover-shadow)' : 'var(--card-shadow)',
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
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
          background: hovered ? 'var(--icon-box-hover)' : 'var(--icon-box-bg)',
          color: 'var(--icon-color)',
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
        <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text)', lineHeight: 1.3 }}>
          {project.name}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>
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
              background: 'var(--tech-bg)',
              color: 'var(--tech-text)',
              border: '1px solid var(--tech-border)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
        <a
          href={project.link}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: hovered ? 'var(--link-hover)' : 'var(--link-color)',
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
      className="w-full section-responsive"
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
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', fontWeight: 300, maxWidth: '32rem', lineHeight: 1.7 }}>
            A selection of my recent work, focused on scalable solutions and intuitive user experiences.
          </p>
        </div>

        {/* Responsive grid */}
        <div
          className="projects-grid"
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
