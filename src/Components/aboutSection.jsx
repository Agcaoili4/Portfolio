const skills = ['React', 'C#', 'PostgreSQL', 'TypeScript', 'Node.js', 'Tailwind CSS'];

export const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-blob w-[500px] h-[500px] bg-indigo-700/10 -top-20 -left-20" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Profile photo */}
        <div className="flex-shrink-0 relative">
          <div className="absolute -inset-6 rounded-full bg-indigo-600/20 blur-3xl opacity-60" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            {/* Replace src with your actual photo */}
            <span className="text-slate-500 text-sm">Your Photo</span>
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-8 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h2 className="section-title">About Me</h2>
            <div className="h-px w-16 bg-gradient-to-r from-indigo-500 to-purple-500/30 mx-auto md:mx-0" />
          </div>

          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-xl">
            I'm Jansen, a software developer dedicated to building robust and elegant digital solutions.
            I thrive on translating complex requirements into seamless, high-performance applications,
            always maintaining a sharp focus on clean architecture and intuitive user experiences.
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip px-4 py-1.5 rounded-full text-slate-200 text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
