import { useCallback, useEffect, useRef, useState } from 'react';
import enabledTalent from '../assets/enabledTalent.webp';
import affinityMentorship from '../assets/affinityMentorship.webp';
import goodlife from '../assets/goodlife.png';
import bixihomes from '../assets/bixihomes.svg';

const experiences = [
  {
    company: 'Bixi Homes',
    role: 'Full Stack Developer',
    type: 'Contract',
    period: 'Mar 2026 – Present',
    description:
      'Rebuild the Bixi Homes website using modern web technologies to enhance user experience, improve performance, and provide a more engaging platform for showcasing house restoration projects and other services.',
    achievements: [
      'Redevelop and enhance the website using React, JavaScript, and Tailwind CSS, resulting in a more modern and responsive user interface that improved user engagement and satisfaction.',
      'Implemented CI/CD pipleines using GitHub Actions, Vite, and Render, reducing deployment times by 40% and ensuring a more reliable release process.',
      'Applied additional external APIs such as Resend for email notifications and incorporated Google Maps for improved location services, enhancing the overall functionality and user experience of the website.',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vite', 'Render'],
    accentColor: 'rgba(241, 234, 99, 0.12)',
    accentGlow: 'rgba(240, 198, 84, 0.25)',
    initBg: 'linear-gradient(135deg, #f1ba67, #f7e69a)',
    image: bixihomes,
  },
  {
    company: 'Enabled Talent',
    role: 'Full Stack Developer',
    type: 'Co-op',
    period: 'Jan 2026 – Apr 2026',
    description:
      'Working on the development of a centralized dashboard for the Enabled Talent website, providing real-time insights with student profiles, application tracking, and analytics for streamlined recruitment management.',
    achievements: [
      'Led Backend Development: Designed and implemented RESTful APIs using Node.js and PostgreSQL, enabling seamless data flow between the dashboard and the database.',
      'Made significant contributions in keeping documentation in tracking with the evolving codebase, ensuring clarity and maintainability for future developers.',
      'Collaborated closely with the design team to create an intuitive and visually appealing user interface using React, TypeScript, and Tailwind CSS, resulting in a faster deployment cycle.',
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Resend', 'Vite', 'Render'],
    accentColor: 'rgba(241, 99, 99, 0.12)',
    accentGlow: 'rgba(241, 99, 99, 0.25)',
    initBg: 'linear-gradient(135deg, #e96b6b, #ed3a3a)',
    image: enabledTalent,
  },
  {
    company: 'GoodLife Fitness',
    role: 'Personal Trainer',
    type: 'Part-time',
    period: 'Mar 2025 - Present',
    description:
      'Working on a professional environment together with a team of fitness experts to provide personalized training programs, dedicated to their needs and goals. ',
    achievements: [
      'Delivered structured personal training programs while maintaining strong client retention and satisfaction.',
      'Maintained strong communication with clients and management while balancing professional responsibilities with being a software developer.',
      'Evaluated training programs through goal analysis, progress tracking, and clear communication to improve client outcomes.',
    ],
    tech: ['Client Interaction', 'Program Design', 'Fitness Assessment', 'Motivational Coaching'],
    accentColor: 'rgba(255, 1, 1, 0.1)',
    accentGlow: 'rgba(255, 57, 57, 0.22)',
    initBg: 'linear-gradient(135deg, #ec5757, #ff0000)',
    image: goodlife,
  },
  {
    company: 'Affinity Mentorship Foundation',
    role: 'Web Developer/UI/UX Designer',
    type: 'Volunteer',
    period: 'Sept 2024 - Feb 2025',
    description:
      'Redesign and organized the Affinity Mentorship Foundation website to enhance user experience and accessibility, resulting in a more engaging platform for connecting mentors and mentees.',
    achievements: [
      'Built and shipped Led 80% of website redesign using Figma, CSS, HTML, JavaScript, and Squarespace. feature from design to production',
      'Improved site usability and navigation, resulting in positive feedback from board members and increased engagement.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Squarespace'],
    accentColor: 'rgba(229, 229, 229, 0.1)',
    accentGlow: 'rgba(151, 151, 151, 0.22)',
    initBg: 'linear-gradient(135deg, #d7d7d7, #a9abab)',
    image: affinityMentorship,
  },
];

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const AUTOPLAY_MS = 2000;
const SLIDE_MS = 700;
const COLLAPSE_MS = 280;
const SWIPE_THRESHOLD = 50;
const INTERACTION_COOLDOWN_MS = 3000;
const MOBILE_QUERY = '(max-width: 767px)';

const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="7 4 20 12 7 20 7 4" />
  </svg>
);
const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

const ExperienceCard = ({ exp, slot, isActive, isClone, isExpanded, onToggle, isMobile }) => {
  const [hovered, setHovered] = useState(false);

  // Card is clickable only on mobile (desktop shows everything by default).
  const clickable = isMobile && isActive && !isClone;
  // Hover effect triggers on either hover or (mobile) expansion.
  const visuallyActive = (isActive && hovered) || (isMobile && isExpanded);
  const contentId = `exp-content-${slot}`;

  useEffect(() => {
    if (!isActive) setHovered(false);
  }, [isActive]);

  const handleKey = (e) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const handleClick = () => {
    if (clickable) onToggle();
  };

  return (
    <div
      className="exp-slide"
      role="group"
      aria-roledescription="slide"
      aria-label={`${exp.company} — ${exp.role}`}
      aria-hidden={isClone || !isActive}
      style={{
        flex: '0 0 100%',
        minWidth: 0,
        boxSizing: 'border-box',
        padding: '0 0.5rem',
        alignSelf: 'flex-start',
      }}
    >
      <div
        onMouseEnter={() => isActive && !isClone && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        onKeyDown={handleKey}
        tabIndex={clickable ? 0 : -1}
        role={clickable ? 'button' : undefined}
        aria-expanded={isMobile ? isExpanded : undefined}
        aria-controls={isMobile ? contentId : undefined}
        className="exp-card exp-card-carousel"
        style={{
          position: 'relative',
          borderRadius: '1.25rem',
          padding: isMobile ? '1.25rem 1.5rem' : '2rem',
          background: 'var(--bg-card)',
          border: '1px solid',
          borderColor: visuallyActive ? 'var(--border-hover)' : 'var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '0.5rem' : '1.5rem',
          minHeight: isMobile ? 'auto' : '480px',
          cursor: clickable ? 'pointer' : 'default',
          userSelect: 'none',
          transition: `border-color 0.3s ease, box-shadow 0.45s ${EASE}, transform 0.4s ${EASE}, background 0.35s ease`,
          boxShadow: visuallyActive
            ? `var(--card-hover-shadow), 0 0 ${isMobile ? '50px' : '60px'} ${exp.accentGlow}`
            : 'var(--card-shadow)',
          transform: visuallyActive ? 'translateY(-3px)' : 'translateY(0)',
          outline: 'none',
        }}
      >
        {/* Accent wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at top left, ${exp.accentColor}, transparent 65%)`,
            opacity: visuallyActive ? 'var(--exp-accent-wash-opacity)' : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            borderRadius: '1.25rem',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            gap: isMobile ? '0.85rem' : '1rem',
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: 0, flex: '1 1 auto' }}>
            {exp.image ? (
              <img
                src={exp.image}
                alt={`${exp.company} logo`}
                style={{
                  width: isMobile ? '2.5rem' : '2.75rem',
                  height: isMobile ? '2.5rem' : '2.75rem',
                  borderRadius: isMobile ? '0.65rem' : '0.75rem',
                  objectFit: 'cover',
                  flexShrink: 0,
                  transform: visuallyActive ? 'scale(1.08) rotate(-6deg)' : 'scale(1) rotate(0)',
                  boxShadow: visuallyActive
                    ? `0 10px 28px ${exp.accentGlow}, 0 0 0 2px ${exp.accentGlow}`
                    : '0 0 0 0 transparent',
                  transition: `transform 0.55s ${SPRING}, box-shadow 0.45s ${EASE}`,
                  willChange: 'transform',
                }}
              />
            ) : (
              <div
                style={{
                  width: isMobile ? '2.5rem' : '2.75rem',
                  height: isMobile ? '2.5rem' : '2.75rem',
                  borderRadius: isMobile ? '0.65rem' : '0.75rem',
                  background: exp.initBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'Archivo, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  transform: visuallyActive ? 'scale(1.08) rotate(-6deg)' : 'scale(1) rotate(0)',
                  boxShadow: visuallyActive
                    ? `0 10px 28px ${exp.accentGlow}, 0 0 0 2px ${exp.accentGlow}`
                    : '0 0 0 0 transparent',
                  transition: `transform 0.55s ${SPRING}, box-shadow 0.45s ${EASE}`,
                  willChange: 'transform',
                }}
              >
                {exp.initial}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'Archivo, sans-serif',
                  fontWeight: 700,
                  fontSize: isMobile ? '1.05rem' : '1rem',
                  color: 'var(--text)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {exp.company}
              </span>
              {!isMobile && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--text-accent-mid)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {exp.type} · {exp.role}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span
              style={{
                fontSize: isMobile ? '0.72rem' : '0.78rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                background: 'var(--date-bg)',
                border: '1px solid var(--date-border)',
                borderRadius: '9999px',
                padding: isMobile ? '0.28rem 0.75rem' : '0.3rem 0.9rem',
                whiteSpace: 'nowrap',
              }}
            >
              {exp.period}
            </span>
            {isMobile && (
              <span
                aria-hidden="true"
                style={{
                  width: '1.6rem',
                  height: '1.6rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  border: '1px solid var(--date-border)',
                  background: 'var(--date-bg)',
                  color: 'var(--text)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: `transform 0.45s ${SPRING}`,
                  flexShrink: 0,
                }}
              >
                <ChevronDown />
              </span>
            )}
          </div>
        </div>

        {/* Body — mobile: collapsible. desktop: always-visible. */}
        {isMobile ? (
          <div
            id={contentId}
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              transition: `grid-template-rows ${COLLAPSE_MS}ms ${EASE}`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{ overflow: 'hidden', minHeight: 0 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  paddingTop: '0.875rem',
                  opacity: isExpanded ? 1 : 0,
                  transition: `opacity ${COLLAPSE_MS}ms ${EASE}`,
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--text-accent-mid)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {exp.type} · {exp.role}
                </span>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
                  {exp.description}
                </p>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                  {exp.achievements.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--tech-text)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                      <span style={{ marginTop: '0.45rem', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-accent-mid)', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid var(--divider)' }}>
                  {exp.tech.map((t) => (
                    <span key={t} style={{ padding: '0.22rem 0.6rem', borderRadius: '0.375rem', fontSize: '0.72rem', fontWeight: 500, background: 'var(--tech-bg)', color: 'var(--tech-text)', border: '1px solid var(--tech-border)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.7,
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {exp.description}
            </p>

            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingLeft: 0,
                listStyle: 'none',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {exp.achievements.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    color: 'var(--tech-text)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      marginTop: '0.45rem',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: 'var(--text-accent-mid)',
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--divider)',
                marginTop: 'auto',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {exp.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '0.25rem 0.7rem',
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
          </>
        )}
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const interactionTimerRef = useRef(null);
  const collapseTimerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const lockRef = useRef(false);
  const lockTimerRef = useRef(null);
  const expandedSlotRef = useRef(null);

  const N = experiences.length;
  const totalSlots = N + 2;

  const [step, setStep] = useState(1);
  const [transitionOn, setTransitionOn] = useState(true);
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const playing =
    !hoverPaused &&
    !focusPaused &&
    !userPaused &&
    !interactionPaused &&
    !tabHidden &&
    !reduceMotion &&
    expandedSlot === null;

  const visibleIndex = ((step - 1) % N + N) % N;

  useEffect(() => {
    expandedSlotRef.current = expandedSlot;
  }, [expandedSlot]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) headerRef.current?.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Clear any lingering expansion when moving to desktop (content is shown by default there).
  useEffect(() => {
    if (!isMobile) setExpandedSlot(null);
  }, [isMobile]);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (lockRef.current) return;
      const wasExpanded = expandedSlotRef.current !== null;
      const collapseDelay = wasExpanded ? COLLAPSE_MS : 0;

      lockRef.current = true;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
      }, collapseDelay + SLIDE_MS + 50);

      if (wasExpanded) setExpandedSlot(null);

      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = setTimeout(() => {
        setStep((s) => s + 1);
      }, collapseDelay);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (step !== 0 && step !== totalSlots - 1) return;
    const t = trackRef.current;
    if (!t) return;
    const target = step === 0 ? N : 1;
    const onEnd = () => {
      setTransitionOn(false);
      setStep(target);
    };
    t.addEventListener('transitionend', onEnd, { once: true });
    return () => t.removeEventListener('transitionend', onEnd);
  }, [step, N, totalSlots]);

  useEffect(() => {
    if (transitionOn) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionOn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [transitionOn]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onIn = () => setFocusPaused(true);
    const onOut = (e) => {
      if (!el.contains(e.relatedTarget)) setFocusPaused(false);
    };
    el.addEventListener('focusin', onIn);
    el.addEventListener('focusout', onOut);
    return () => {
      el.removeEventListener('focusin', onIn);
      el.removeEventListener('focusout', onOut);
    };
  }, []);

  useEffect(
    () => () => {
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    },
    []
  );

  const triggerCooldown = useCallback(() => {
    setInteractionPaused(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setInteractionPaused(false);
    }, INTERACTION_COOLDOWN_MS);
  }, []);

  const performNavigation = useCallback(
    (advance) => {
      if (lockRef.current) return;
      const wasExpanded = expandedSlotRef.current !== null;
      const collapseDelay = wasExpanded ? COLLAPSE_MS : 0;

      lockRef.current = true;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        lockRef.current = false;
      }, collapseDelay + SLIDE_MS + 50);

      if (wasExpanded) setExpandedSlot(null);

      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = setTimeout(() => {
        advance();
        triggerCooldown();
      }, collapseDelay);
    },
    [triggerCooldown]
  );

  const next = useCallback(() => {
    performNavigation(() => setStep((s) => s + 1));
  }, [performNavigation]);

  const prev = useCallback(() => {
    performNavigation(() => setStep((s) => s - 1));
  }, [performNavigation]);

  const goToIndex = useCallback(
    (idx) => {
      if (idx === visibleIndex) return;
      performNavigation(() => setStep(idx + 1));
    },
    [visibleIndex, performNavigation]
  );

  const togglePause = () => setUserPaused((p) => !p);

  const toggleExpand = useCallback((slot) => {
    setExpandedSlot((prev) => (prev === slot ? null : slot));
  }, []);

  const onTrackKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - touchStartX.current;
    const dy = endY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
  };

  const trackItems = [experiences[N - 1], ...experiences, experiences[0]];

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden section-responsive"
      style={{ padding: '8rem 1.5rem' }}
    >
      <div
        className="glow-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'rgba(124,58,237,0.12)',
          top: '10%',
          right: '-10%',
        }}
      />

      <div
        style={{
          maxWidth: '1152px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
        }}
      >
        <div
          ref={headerRef}
          className="reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <h2 className="section-title">Experience</h2>
          <div
            style={{
              height: '1px',
              width: '3.5rem',
              background:
                'linear-gradient(to right, transparent, var(--section-underline-from), transparent)',
            }}
          />
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              fontWeight: 300,
              maxWidth: '32rem',
              lineHeight: 1.7,
            }}
          >
            Where I've worked and what I've built along the way.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="exp-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Work experience"
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          style={{
            maxWidth: '720px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          <div
            className="exp-carousel-viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              overflow: 'hidden',
              borderRadius: '1.25rem',
              position: 'relative',
            }}
          >
            <div
              ref={trackRef}
              className="exp-carousel-track"
              tabIndex={0}
              onKeyDown={onTrackKeyDown}
              aria-label="Experience carousel — use left and right arrows to navigate"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                transform: `translateX(-${step * 100}%)`,
                transition: transitionOn ? `transform ${SLIDE_MS}ms ${EASE}` : 'none',
                willChange: 'transform',
                outline: 'none',
              }}
            >
              {trackItems.map((exp, slot) => (
                <ExperienceCard
                  key={`slot-${slot}`}
                  exp={exp}
                  slot={slot}
                  isActive={slot === step}
                  isClone={slot === 0 || slot === totalSlots - 1}
                  isExpanded={expandedSlot === slot}
                  onToggle={() => toggleExpand(slot)}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous experience"
              className="exp-arrow exp-arrow-left"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next experience"
              className="exp-arrow exp-arrow-right"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
            }}
          >
            <div
              role="tablist"
              aria-label="Choose experience"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '5.5rem',
                height: '0.5rem',
                flexShrink: 0,
              }}
            >
              {/* Static gray dots — never animate, fully cross-browser stable. */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {experiences.map((exp, i) => {
                  const selected = i === visibleIndex;
                  return (
                    <button
                      key={i}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      aria-label={`Show ${exp.company}, ${exp.role}`}
                      onClick={() => goToIndex(i)}
                      className="exp-dot"
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '9999px',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        background: 'var(--date-border)',
                        opacity: 0.5,
                        flexShrink: 0,
                      }}
                    />
                  );
                })}
              </div>
              {/* Single sliding active pill — only ONE element animates, transform-based for Safari parity. */}
              <span
                aria-hidden="true"
                className="exp-dot-indicator"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '1.25rem',
                  height: '0.5rem',
                  borderRadius: '9999px',
                  background: 'var(--text)',
                  transform: `translate(calc(${visibleIndex - 1.5}rem - 50%), -50%)`,
                  transition: `transform 0.4s ${SPRING}`,
                  pointerEvents: 'none',
                  willChange: 'transform',
                }}
              />
            </div>
            <button
              type="button"
              onClick={togglePause}
              aria-label={userPaused ? 'Resume autoplay' : 'Pause autoplay'}
              aria-pressed={userPaused}
              className="exp-play-btn"
              style={{
                width: '2rem',
                height: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                border: '1px solid var(--date-border)',
                background: 'var(--date-bg)',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                transition: 'border-color 0.3s ease, background 0.3s ease, transform 0.3s ease',
              }}
            >
              {userPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
