const projects = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    name: 'E-commerce Platform',
    desc: 'A scalable full-stack e-commerce solution with real-time inventory, advanced search, and secure payment integration.',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    name: 'Analytics Dashboard',
    desc: 'A comprehensive dashboard for tracking metrics across platforms with interactive data visualizations.',
    tech: ['Vue.js', 'Express', 'PostgreSQL'],
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    name: 'Task Management App',
    desc: 'An intuitive productivity app with drag-and-drop Kanban boards, real-time collaboration, and automated reminders.',
    tech: ['React Native', 'Firebase', 'Tailwind'],
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-slate-400 text-lg font-light max-w-xl">
            A selection of my recent work, focusing on scalable solutions and intuitive user experiences.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.name} className="glass-card rounded-2xl p-6 flex flex-col gap-5 group cursor-pointer relative overflow-hidden">
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center relative z-10">
                {project.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 relative z-10">
                <h3 className="text-white font-bold text-lg leading-tight">{project.name}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{project.desc}</p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="flex justify-end mt-auto relative z-10">
                <a href="#" className="text-sm font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                  View Project
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
