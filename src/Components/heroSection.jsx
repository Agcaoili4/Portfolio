export const HeroSection = () => {
  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="glow-blob w-[700px] h-[700px] bg-indigo-600/20 top-1/2 right-0 -translate-y-1/2 translate-x-1/4" />
      <div className="glow-blob w-[500px] h-[500px] bg-purple-700/10 top-1/3 left-0 -translate-x-1/4" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-5xl">
        <div className="flex flex-col gap-3">
          <h1 className="text-[clamp(4rem,12vw,10rem)] font-black text-white tracking-tighter leading-none">
            Jansen
          </h1>
          <p className="text-xl md:text-3xl font-light text-slate-400 tracking-tight">
            Software Developer
          </p>
        </div>

        <a href="#projects" className="cta-btn mt-4">
          View My Work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};
