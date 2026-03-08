import { useState, useEffect } from 'react';

export const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Detect active section — iterate bottom-up, first match wins
      const sections = ['contact', 'projects', 'about', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">
      {/* Floating pill nav */}
      <nav
        className={`glass-nav w-full max-w-2xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/50' : ''
        }`}
      >
        <span
          className="font-archivo font-bold text-white text-lg tracking-tight"
          style={{ fontFamily: 'Archivo, sans-serif' }}
        >
          Jansen
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`nav-link ${active === link.toLowerCase() ? 'active' : ''}`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="glass-nav w-full max-w-2xl mt-2 rounded-2xl px-5 py-4 flex flex-col gap-3 md:hidden">
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
