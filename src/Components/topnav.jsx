import { useState, useEffect } from 'react';

export const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const ids = ['contact', 'projects', 'experience', 'about', 'home'];
      const trigger = window.innerHeight * 0.35;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= trigger) {
          setActive(id);
          return;
        }
      }

      setActive('home');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">
      <nav
        className={`glass-nav w-full rounded-2xl px-6 py-3 flex items-center justify-center transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/50' : ''
        }`}
        style={{ maxWidth: '820px' }}
      >

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`nav-link${active === link.toLowerCase() ? ' active' : ''}`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="glass-nav w-full mt-2 rounded-2xl px-5 py-4 flex flex-col gap-3 md:hidden" style={{ maxWidth: '820px' }}>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors py-1 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
