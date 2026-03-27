import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

export const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggle } = useTheme();

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
  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">
      <nav
        className={`glass-nav w-full rounded-2xl flex items-center transition-all duration-300 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
        style={{
          maxWidth: '820px',
          padding: '0.625rem 1.25rem',
          boxShadow: scrolled ? `0 8px 32px var(--nav-shadow)` : undefined,
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="theme-toggle"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <div className="theme-toggle-icons" aria-hidden="true">
            {/* Sun icon */}
            <svg
              className={`theme-icon theme-icon-sun${isDark ? ' theme-icon-active' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            {/* Moon icon */}
            <svg
              className={`theme-icon theme-icon-moon${!isDark ? ' theme-icon-active' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </button>

        {/* Desktop links — centered with auto margins */}
        <div className="hidden md:flex items-center gap-7" style={{ margin: '0 auto', paddingRight: '36px' }}>
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

        {/* Mobile hamburger — pushed to far right */}
        <button
          className="md:hidden transition-colors cursor-pointer"
          style={{ color: 'var(--text-secondary)', marginLeft: 'auto', padding: '8px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
              className={`nav-link mobile-nav-link py-1${active === link.toLowerCase() ? ' active' : ''}`}
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
