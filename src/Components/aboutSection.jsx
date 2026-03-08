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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="glow-blob w-[500px] h-[500px] opacity-10 bg-indigo-600 -top-20 -left-20" />

      <div className="max-w-6xl mx-auto w-full">
        <div ref={ref} className="reveal flex flex-col md:flex-row items-center gap-16 lg:gap-28">

          {/* Profile photo */}
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-4 rounded-full bg-indigo-600/15 blur-2xl" />
            <div
              className="relative w-60 h-60 md:w-72 md:h-72 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center overflow-hidden"
              aria-label="Profile photo placeholder"
            >
              {/* Swap this div for an <img> tag when you have a photo */}
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(79,70,229,0.4)" strokeWidth="1.2" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-8 text-center md:text-left flex-1">
            <div className="flex flex-col gap-3">
              <h2 className="section-title">About Me</h2>
              <div className="h-px w-14 bg-gradient-to-r from-indigo-500 to-transparent mx-auto md:mx-0" />
            </div>

            <p className="text-slate-400 text-lg font-light leading-[1.75] max-w-xl">
              I'm Jansen, a software developer dedicated to building robust and elegant digital
              solutions. I thrive on translating complex requirements into seamless, high-performance
              applications — always with a sharp focus on clean architecture and intuitive user experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto md:mx-0">
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-card text-center">
                  <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Archivo, sans-serif' }}>{value}</span>
                  <span className="text-slate-500 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
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
