import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

export const TopNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggle } = useTheme();
  const menuRef = useRef(null);

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

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = ['Home', 'About', 'Experience', 'Projects', 'Contact'];
  const isDark = theme === 'dark';

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
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

          {/* Mobile hamburger — animated 3 bars to X */}
          <button
            className="hamburger md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className={`hamburger-box${menuOpen ? ' is-active' : ''}`}>
              <span className="hamburger-bar hamburger-bar-1" />
              <span className="hamburger-bar hamburger-bar-2" />
              <span className="hamburger-bar hamburger-bar-3" />
            </div>
          </button>
        </nav>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`mobile-menu-backdrop${menuOpen ? ' is-visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-down menu */}
      <div
        ref={menuRef}
        className={`mobile-menu md:hidden${menuOpen ? ' is-open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-inner">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`mobile-menu-link${active === link.toLowerCase() ? ' is-active' : ''}`}
              style={{ transitionDelay: menuOpen ? `${60 + i * 50}ms` : '0ms' }}
              onClick={() => handleNavClick(link)}
            >
              <span className="mobile-menu-link-num">0{i + 1}</span>
              <span className="mobile-menu-link-text">{link}</span>
              <svg
                className="mobile-menu-link-arrow"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          {/* Section label */}
          <div className="mobile-menu-footer">
            <span>Navigation</span>
            <div className="mobile-menu-footer-line" />
          </div>
        </div>
      </div>
    </>
  );
};
